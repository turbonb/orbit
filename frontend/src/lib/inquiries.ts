import { headers } from "next/headers";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface StartBuildInquiryInput {
  fullName: string;
  email: string;
  company: string;
  projectType: string;
  goals: string;
  timeline: string;
  budget: string;
  integrations: string;
  communication: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface SubmitOptions {
  sendSlack?: boolean;
}

export interface SubmitResult {
  id: string;
}

function resolveSupabaseUrl(): string {
  const explicit = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!explicit) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }
  return explicit;
}

function resolveServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }
  return key;
}

export function validateStartBuildInquiry(payload: StartBuildInquiryInput): ValidationResult {
  const errors: string[] = [];

  if (!payload.fullName?.trim()) {
    errors.push("Full name is required.");
  }
  if (!payload.email?.trim()) {
    errors.push("Email is required.");
  } else if (!EMAIL_PATTERN.test(payload.email.trim().toLowerCase())) {
    errors.push("Please provide a valid email address.");
  }
  if (!payload.projectType?.trim()) {
    errors.push("Project type is required.");
  }
  if (!payload.goals?.trim()) {
    errors.push("Goals are required so we can scope the sprint correctly.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function buildMessage(payload: StartBuildInquiryInput): string {
  const lines = [
    payload.goals.trim(),
    "",
    `Project type: ${payload.projectType}`,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    payload.integrations ? `Stack / integrations: ${payload.integrations}` : null,
    payload.communication ? `Preferred follow-up: ${payload.communication}` : null
  ].filter(Boolean);

  return lines.join("\n");
}

function buildMetadata(payload: StartBuildInquiryInput, sourceIp: string | null): Record<string, unknown> {
  return {
    company: payload.company || null,
    timeline: payload.timeline || null,
    budget: payload.budget || null,
    integrations: payload.integrations || null,
    communication: payload.communication || null,
    user_agent: headers().get("user-agent"),
    referrer: headers().get("referer"),
    source_ip: sourceIp
  };
}

function buildSlackSummary(payload: StartBuildInquiryInput): string {
  const lines = [
    `• Name: ${payload.fullName}`,
    `• Email: ${payload.email}`,
    payload.company ? `• Company: ${payload.company}` : null,
    `• Project type: ${payload.projectType}`,
    payload.timeline ? `• Timeline: ${payload.timeline}` : null,
    payload.budget ? `• Budget: ${payload.budget}` : null,
    payload.communication ? `• Preferred follow-up: ${payload.communication}` : null,
    "",
    `Goals & outcomes:\n${payload.goals}`,
    "",
    payload.integrations ? `Integrations / constraints:\n${payload.integrations}` : null
  ].filter(Boolean);

  return lines.join("\n");
}

async function sendSlackNotification(summary: string): Promise<void> {
  const webhook =
    process.env.ORBIT_INTAKE_WEBHOOK ?? process.env.ORBIT_CONTACT_WEBHOOK_URL ?? process.env.CONTACT_SLACK_WEBHOOK_URL;

  if (!webhook) {
    return;
  }

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🚀 New Orbit build request\n\n${summary}`
    })
  });
}

export async function submitStartBuildInquiry(
  payload: StartBuildInquiryInput,
  options: SubmitOptions = {}
): Promise<SubmitResult> {
  const supabaseUrl = resolveSupabaseUrl();
  const serviceRoleKey = resolveServiceRoleKey();
  const sourceIp = headers().get("x-forwarded-for");

  const response = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      full_name: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: null,
      message: buildMessage(payload),
      service_type_id: null,
      preferred_schedule: null,
      source: "orbit:start-build",
      form_id: null,
      utm: {},
      metadata: buildMetadata(payload, sourceIp)
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to record inquiry: ${detail}`);
  }

  const [record] = (await response.json()) as Array<{ id: string }>;

  if (options.sendSlack !== false) {
    const summary = buildSlackSummary(payload);
    await sendSlackNotification(summary);
  }

  return { id: record.id };
}
