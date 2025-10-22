#!/usr/bin/env node

const { randomUUID } = require("crypto");

async function post(restUrl, table, payload, key, query = "") {
  const separator = query ? (query.startsWith("?") ? "" : "?") : "";
  const response = await fetch(`${restUrl}/${table}${separator}${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to insert into ${table}: ${detail}`);
  }

  return response.json();
}

async function main() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error("Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY before seeding.");
    process.exit(1);
  }

  const restUrl = `${url.replace(/\/$/, "")}/rest/v1`;
  const now = new Date().toISOString();
  const seedTag = `local:seed`; // Used for cleanup.

  const inquiryPayloads = [
    {
      full_name: "Taylor Mission",
      email: "taylor.mission+orbit@example.com",
      phone: null,
      message:
        "Interested in a 2-week Orbit sprint focused on a Supabase-backed marketing experience. Needs contact automation and analytics instrumentation.",
      service_type_id: null,
      preferred_schedule: null,
      status: "new",
      source: seedTag,
      form_id: randomUUID(),
      utm: { utm_source: "seed-script" },
      metadata: {
        company: "Launch Window Labs",
        timeline: "This month",
        budget: "$10k – $20k",
        integrations: "Supabase, Resend, Slack",
        communication: "Email works best",
        created_by: seedTag,
        seeded_at: now
      }
    }
  ];

  const newsletterPayloads = [
    {
      email: "ops-team+orbit@example.com",
      full_name: "Ops Team Seed",
      source: seedTag,
      form_id: randomUUID(),
      tags: ["seed", "ops"],
      metadata: { created_by: seedTag, seeded_at: now }
    }
  ];

  const results = [];

  for (const payload of inquiryPayloads) {
    const [record] = await post(restUrl, "inquiries", payload, serviceRoleKey);
    results.push({ table: "inquiries", id: record.id });
  }

  for (const payload of newsletterPayloads) {
    const [record] = await post(restUrl, "newsletter_signups", payload, serviceRoleKey, "?on_conflict=email");
    results.push({ table: "newsletter_signups", id: record.id });
  }

  console.log(`Seeded ${results.length} records tagged with '${seedTag}'.`);
  results.forEach((result) => {
    console.log(`  • ${result.table} → ${result.id}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
