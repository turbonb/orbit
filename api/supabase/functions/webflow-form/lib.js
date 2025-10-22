const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * Normalize text to slug form.
 * @param {string | null | undefined} value
 * @returns {string | null}
 */
export function normalizeSlug(value) {
  if (!value) return null;
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

/**
 * Normalize service type strings provided by Webflow into the canonical slug.
 * @param {string | null | undefined} value
 * @returns {string | null}
 */
export function normalizeServiceType(value) {
  const slug = normalizeSlug(value);
  if (!slug) return null;

  const mapping = new Map([
    ['routine', 'routine'],
    ['recurring', 'routine'],
    ['routine-care', 'routine'],
    ['weekly', 'routine'],
    ['bi-weekly', 'routine'],
    ['deep', 'deep-clean'],
    ['deep-clean', 'deep-clean'],
    ['deep-cleaning', 'deep-clean'],
    ['one-time-deep-clean', 'deep-clean'],
    ['move', 'move'],
    ['move-clean', 'move'],
    ['move-in', 'move'],
    ['move-in-move-out', 'move'],
    ['move-out', 'move'],
    ['commercial', 'commercial'],
    ['office', 'commercial'],
    ['commercial-suites', 'commercial'],
  ]);

  return mapping.get(slug) ?? slug;
}

/**
 * Extract UTM parameters from a Webflow form submission payload.
 * @param {Record<string, unknown>} data
 * @returns {Record<string, string>}
 */
export function extractUtm(data) {
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer'];
  const result = {};

  for (const key of utmKeys) {
    const value = data?.[key];
    if (typeof value === 'string' && value.trim() !== '') {
      result[key] = value.trim();
    }
  }

  return result;
}

/**
 * Attempt to coerce a phone input into a formatted E.164 string when possible.
 * @param {string | null | undefined} value
 * @returns {string | null}
 */
export function normalizePhone(value) {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return null;

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  if (digits.length >= 11 && value.startsWith('+')) {
    return `+${digits}`;
  }

  return value.trim();
}

/**
 * Parse a preferred schedule field into an ISO date string if valid.
 * @param {string | null | undefined} value
 * @returns {string | null}
 */
export function parsePreferredSchedule(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

/**
 * Transform raw Webflow submission data into structured metadata.
 * @param {Record<string, unknown>} data
 * @param {string[]} knownKeys
 * @returns {Record<string, unknown>}
 */
export function extractMetadata(data, knownKeys) {
  const normalizedKeys = new Set(knownKeys.map((key) => normalizeSlug(key)));
  const metadata = {};
  for (const [key, value] of Object.entries(data ?? {})) {
    const normalizedKey = normalizeSlug(key);
    if (!normalizedKey) continue;
    if (normalizedKeys.has(normalizedKey)) continue;
    if (value === '' || value === null || value === undefined) continue;
    metadata[normalizedKey] = value;
  }
  return metadata;
}

/**
 * Determine form mapping outcome based on payload.
 * @param {Record<string, unknown>} payload
 * @returns {{
 *   type: 'inquiry' | 'newsletter' | 'unknown',
 *   formName: string,
 *   source: string,
 *   record: Record<string, unknown>,
 * }} | null
 */
export function mapWebflowSubmission(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const data = /** @type {Record<string, string>} */ (payload.data ?? {});

  const formNameRaw =
    typeof payload.formName === 'string'
      ? payload.formName
      : typeof payload.name === 'string'
      ? payload.name
      : '';

  const formName = formNameRaw.trim();
  const normalizedForm = normalizeSlug(formName);
  const target = normalizeSlug(data['form-target'] ?? data['form_type'] ?? data['form-name']);

  const isContact =
    normalizedForm?.includes('contact') ||
    normalizedForm?.includes('quote') ||
    target === 'contact' ||
    target === 'quote' ||
    target === 'request-quote';

  const isNewsletter =
    normalizedForm?.includes('newsletter') ||
    normalizedForm?.includes('cta') ||
    target === 'newsletter' ||
    target === 'email-capture';

  const baseSource =
    typeof payload.site?.domain === 'string'
      ? payload.site.domain
      : typeof payload.site?.name === 'string'
      ? payload.site.name
      : 'webflow';

  if (isContact) {
    const record = {
      full_name:
        data['full-name'] ??
        data['full_name'] ??
        data['name'] ??
        data['Full Name'] ??
        data['Full name'] ??
        '',
      email: data['email'] ?? data['Email'] ?? '',
      phone: normalizePhone(data['phone'] ?? data['Phone']),
      message: data['message'] ?? data['Message'] ?? '',
      service_type_slug: normalizeServiceType(data['service-type'] ?? data['Service Type']),
      preferred_schedule: parsePreferredSchedule(data['preferred-date'] ?? data['Preferred Date']),
      utm: extractUtm(data),
      metadata: extractMetadata(data, [
        'full-name',
        'full_name',
        'name',
        'email',
        'phone',
        'message',
        'service-type',
        'service_type',
        'preferred-date',
        'preferred_date',
        'form-target',
        'form_type',
      ]),
    };

    return {
      type: 'inquiry',
      formName: formName || 'contact',
      source: `${baseSource}:contact`,
      record,
    };
  }

  if (isNewsletter) {
    const record = {
      email: data['email'] ?? data['Email'] ?? '',
      full_name:
        data['full-name'] ??
        data['full_name'] ??
        data['name'] ??
        data['Name'] ??
        data['First Name'] ??
        null,
      tags: (data['tags'] ?? data['Tags'] ?? '')
        .toString()
        .split(',')
        .map((tag) => normalizeSlug(tag))
        .filter(Boolean),
      utm: extractUtm(data),
      metadata: extractMetadata(data, ['email', 'full-name', 'full_name', 'name', 'tags', 'form-target']),
    };

    return {
      type: 'newsletter',
      formName: formName || 'newsletter',
      source: `${baseSource}:newsletter`,
      record,
    };
  }

  return {
    type: 'unknown',
    formName: formName || 'unknown',
    source: `${baseSource}:unknown`,
    record: { payload },
  };
}

/**
 * Convert ArrayBuffer to hex string.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
export function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify Webflow webhook signatures using HMAC-SHA256.
 * @param {string | null | undefined} secret
 * @param {Uint8Array} rawBody
 * @param {string | null | undefined} signature
 * @returns {Promise<boolean>}
 */
export async function verifyWebflowSignature(secret, rawBody, signature) {
  if (!secret) return true;
  if (!signature) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const digest = await crypto.subtle.sign('HMAC', key, rawBody);
  const expected = bufferToHex(digest);
  return timingSafeEqual(expected, signature);
}

/**
 * Timing-safe comparison.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function timingSafeEqual(a, b) {
  const aBytes = textEncoder.encode(a.toLowerCase());
  const bBytes = textEncoder.encode(b.toLowerCase());
  if (aBytes.length !== bBytes.length) return false;

  let result = 0;
  for (let i = 0; i < aBytes.length; i += 1) {
    result |= aBytes[i] ^ bBytes[i];
  }
  return result === 0;
}

/**
 * Pretty-print Slack notification message.
 * @param {'inquiry' | 'newsletter' | 'unknown'} type
 * @param {Record<string, unknown>} record
 * @returns {string}
 */
export function buildSlackMessage(type, record) {
  if (type === 'inquiry') {
    const lines = [
      `*New inquiry from ${record.full_name || 'Unknown'}*`,
      record.email ? `• Email: ${record.email}` : null,
      record.phone ? `• Phone: ${record.phone}` : null,
      record.service_type_slug ? `• Service type: ${record.service_type_slug}` : null,
      record.preferred_schedule ? `• Preferred schedule: ${record.preferred_schedule}` : null,
      record.message ? `> ${record.message}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  }

  if (type === 'newsletter') {
    const tags = Array.isArray(record.tags) && record.tags.length > 0 ? ` (${record.tags.join(', ')})` : '';
    const name = record.full_name ? ` – ${record.full_name}` : '';
    return `*New newsletter signup${name}*: ${record.email}${tags}`;
  }

  return `Received form submission that could not be mapped automatically.`;
}

/**
 * Decode raw body into JSON object.
 * @param {Uint8Array} raw
 * @returns {Record<string, unknown>}
 */
export function parseJson(raw) {
  const text = textDecoder.decode(raw);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON payload: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
