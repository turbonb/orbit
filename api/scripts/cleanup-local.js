#!/usr/bin/env node

async function remove(restUrl, table, key, filter) {
  const response = await fetch(`${restUrl}/${table}?${filter}`, {
    method: "DELETE",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation"
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to clean ${table}: ${detail}`);
  }

  const rows = await response.json();
  return rows.length;
}

async function main() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error("Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY before cleanup.");
    process.exit(1);
  }

  const restUrl = `${url.replace(/\/$/, "")}/rest/v1`;
  const seedTag = "local:seed";

  const removedInquiries = await remove(restUrl, "inquiries", serviceRoleKey, `source=eq.${seedTag}`);
  const removedNewsletter = await remove(restUrl, "newsletter_signups", serviceRoleKey, `source=eq.${seedTag}`);

  console.log(
    `Removed ${removedInquiries} inquiries and ${removedNewsletter} newsletter signups tagged with '${seedTag}'.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
