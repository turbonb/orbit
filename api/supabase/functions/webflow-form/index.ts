import {
  buildSlackMessage,
  mapWebflowSubmission,
  parseJson,
  verifyWebflowSignature,
} from './lib.js';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const WEBFLOW_FORM_SECRET = Deno.env.get('WEBFLOW_FORM_SECRET');
const SLACK_WEBHOOK_URL =
  Deno.env.get('CONTACT_SLACK_WEBHOOK_URL') ?? Deno.env.get('ORBIT_CONTACT_WEBHOOK_URL');
const ADMIN_EMAIL = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') ?? Deno.env.get('ORBIT_ADMIN_EMAIL');
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error('Missing required Supabase environment variables.');
}

const REST_URL = `${SUPABASE_URL}/rest/v1`;
const headersBase = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
};

const serviceTypeCache = new Map<string, number>();

async function fetchServiceTypeId(slug: string | null): Promise<number | null> {
  if (!slug) return null;
  if (serviceTypeCache.has(slug)) {
    return serviceTypeCache.get(slug) ?? null;
  }

  const url = new URL(`${REST_URL}/service_types`);
  url.searchParams.set('select', 'id');
  url.searchParams.set('slug', `eq.${slug}`);

  const response = await fetch(url, { headers: headersBase });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to fetch service type id: ${detail}`);
  }

  const rows: Array<{ id: number }> = await response.json();
  const id = rows[0]?.id ?? null;
  if (id) {
    serviceTypeCache.set(slug, id);
  }
  return id;
}

async function supabaseInsert<T extends Record<string, unknown>>(
  table: string,
  payload: T,
): Promise<Record<string, unknown>> {
  const response = await fetch(`${REST_URL}/${table}`, {
    method: 'POST',
    headers: {
      ...headersBase,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to insert into ${table}: ${detail}`);
  }

  const [record] = (await response.json()) as Array<Record<string, unknown>>;
  return record;
}

async function supabaseUpdate(
  table: string,
  id: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const url = new URL(`${REST_URL}/${table}`);
  url.searchParams.set('id', `eq.${id}`);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...headersBase,
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to update ${table}: ${detail}`);
  }
}

async function dispatchSlackNotification(type: string, record: Record<string, unknown>): Promise<void> {
  if (!SLACK_WEBHOOK_URL) return;
  const message = buildSlackMessage(type as 'inquiry' | 'newsletter' | 'unknown', record);
  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message }),
  });
  if (!response.ok) {
    console.error('Slack webhook responded with non-200 status', response.status);
  }
}

async function dispatchEmailNotification(type: string, record: Record<string, unknown>): Promise<void> {
  if (!RESEND_API_KEY || !ADMIN_EMAIL || !RESEND_FROM_EMAIL) return;

  const subject =
    type === 'inquiry'
      ? `New Silver Lining inquiry from ${record.full_name ?? 'unknown contact'}`
      : type === 'newsletter'
      ? `New Silver Lining newsletter signup`
      : `New Silver Lining form submission`;

  const bodyLines = [
    `<p>Type: <strong>${type}</strong></p>`,
    record.full_name ? `<p>Name: ${record.full_name}</p>` : '',
    record.email ? `<p>Email: ${record.email}</p>` : '',
    record.phone ? `<p>Phone: ${record.phone}</p>` : '',
    record.service_type_slug ? `<p>Service type: ${record.service_type_slug}</p>` : '',
    record.preferred_schedule ? `<p>Preferred schedule: ${record.preferred_schedule}</p>` : '',
    record.message ? `<p>Message:</p><blockquote>${record.message}</blockquote>` : '',
  ].filter(Boolean);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject,
      html: bodyLines.join('\n'),
    }),
  });
  if (!response.ok) {
    console.error('Resend API responded with non-200 status', response.status);
  }
}

type HandlerResponse =
  | { status: number; body: Record<string, unknown> }
  | { status: number; body: Record<string, unknown>; headers?: HeadersInit };

async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawBody = new Uint8Array(await request.arrayBuffer());
  const signatureHeader = request.headers.get('webflow-signature') ?? request.headers.get('x-webflow-signature');
  const signatureValid = await verifyWebflowSignature(WEBFLOW_FORM_SECRET, rawBody, signatureHeader);

  if (!signatureValid) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let payload: Record<string, unknown>;
  try {
    payload = parseJson(rawBody);
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const mapping = mapWebflowSubmission(payload);

  let eventRecord: Record<string, unknown> | null = null;
  try {
    eventRecord = await supabaseInsert('form_events', {
      form_name: mapping?.formName ?? 'unknown',
      source: mapping?.source ?? 'webflow',
      payload,
    });
  } catch (error) {
    console.error('Failed to insert form event log', error);
  }

  if (!mapping || mapping.type === 'unknown') {
    if (eventRecord?.id) {
      await supabaseUpdate('form_events', eventRecord.id as string, { processed: true });
    }
    return new Response(
      JSON.stringify({ success: false, message: 'Form submission ignored: unrecognized form mapping.' }),
      { status: 202, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { type, record } = mapping;
  let supabaseResult: Record<string, unknown> | null = null;

  try {
    if (type === 'inquiry') {
      const serviceTypeId = await fetchServiceTypeId(record.service_type_slug as string | null);
      const formId =
        pickStringField(payload, 'formId') ??
        pickStringField(payload, 'id') ??
        pickStringField(record.metadata as Record<string, unknown>, 'form-id');

      const insertPayload: Record<string, unknown> = {
        full_name: record.full_name,
        email: record.email,
        phone: record.phone,
        message: record.message,
        service_type_id: serviceTypeId,
        preferred_schedule: record.preferred_schedule,
        source: mapping.source,
        form_id: formId,
        utm: record.utm ?? {},
        metadata: record.metadata ?? {},
      };
      supabaseResult = await supabaseInsert('inquiries', insertPayload);
    } else if (type === 'newsletter') {
      const formId =
        pickStringField(payload, 'formId') ??
        pickStringField(payload, 'id') ??
        pickStringField(record.metadata as Record<string, unknown>, 'form-id');
      const insertPayload: Record<string, unknown> = {
        email: record.email,
        full_name: record.full_name,
        source: mapping.source,
        form_id: formId,
        tags: record.tags ?? [],
        utm: record.utm ?? {},
        metadata: record.metadata ?? {},
      };
      supabaseResult = await supabaseInsert('newsletter_signups', insertPayload);
    }
  } catch (error) {
    if (eventRecord?.id) {
      await supabaseUpdate('form_events', eventRecord.id as string, {
        processed: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to process submission.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (eventRecord?.id) {
    await supabaseUpdate('form_events', eventRecord.id as string, {
      processed: true,
      error: null,
    });
  }

  const notifications: Promise<unknown>[] = [];
  notifications.push(dispatchSlackNotification(type, { ...record, id: supabaseResult?.id }));
  notifications.push(dispatchEmailNotification(type, { ...record, id: supabaseResult?.id }));
  await Promise.allSettled(notifications);

  return new Response(
    JSON.stringify({
      success: true,
      type,
      id: supabaseResult?.id ?? null,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
}

Deno.serve(handleRequest);
function pickStringField(record: Record<string, unknown>, key: string): string | null {
  const value = record?.[key];
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim();
  }
  return null;
}
