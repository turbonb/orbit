# Silver Lining Supabase Integration

This note captures the backend schema, access patterns, and scripts that power the Silver Lining workstream. Share this with any Ranger wiring Webflow, Next.js, or automation layers so everyone uses the same surface area.

## Database Schema

- `service_types` – Canonical list of offerings surfaced in the contact form (seeded with Routine, Deep Clean, Move, Commercial).
- `inquiries` – Normalized lead submissions regardless of source (Webflow, Next.js server action, automation bots).
- `newsletter_signups` – Email capture entries from CTA banners or footer forms.
- `form_events` – Raw payload storage for any upstream form webhook (useful for replay/debug).
- `blog_posts` – Public article metadata + markdown body served to the marketing site.
- Storage buckets:
  - `lead-assets` (private) for any follow-up docs shared with leads.
  - `marketing-media` (public) for blog hero art and downloadable assets.

Row Level Security (RLS) is active on every table. Public readers (anon key) can select published blog posts and marketing assets. Any write access requires the service role key.

## Environment Variables

Populate these in both the Supabase CLI context (`api/.env`) and the Next.js app (`frontend/.env.local`). Never push real keys to Git.

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Base URL for the project (used by server-side scripts/actions). |
| `SUPABASE_PROJECT_ID` | Supabase project ref (CLI + documentation). |
| `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public key that grants read-only access to published blog posts. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for inserts/updates (used by server actions, API routes, seed scripts). |
| `SUPABASE_DB_PASSWORD` | Postgres password for the managed project (CLI operations). |
| `ORBIT_INTAKE_WEBHOOK` or `CONTACT_SLACK_WEBHOOK_URL` | Optional Slack webhook for contact notifications. |
| `ADMIN_NOTIFICATION_EMAIL` / `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | Optional Resend configuration so edge functions can email the ops team. |
| `WEBFLOW_FORM_SECRET` | Shared secret to validate incoming Webflow webhooks via the `webflow-form` edge function. |

Copy the provided `.env.example` files:

```bash
cp api/.env.example api/.env
cp frontend/.env.example frontend/.env.local
```

Then fill in project-specific secrets. Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.

## Running Migrations & Seeds

Use the Supabase CLI from `orbit/api`:

```bash
cd orbit/api
supabase db reset            # Rebuilds schema and loads seed.sql
```

The `supabase/seed.sql` file seeds service types and three example blog posts.

### Local Data Seeding & Cleanup

Two helper scripts live under `api/scripts/` and require `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in the environment:

```bash
# Seed sample inquiries/newsletter signups tagged "local:seed"
node api/scripts/seed-local.js

# Remove seeded records
node api/scripts/cleanup-local.js
```

These are safe to run repeatedly; cleanup removes any records where `source = 'local:seed'`.

## Webflow → Supabase Edge Function

- Edge function path: `supabase/functions/webflow-form`.
- Validates `webflow-signature` header (set `WEBFLOW_FORM_SECRET`).
- Normalizes payloads into `form_events` and `inquiries`/`newsletter_signups`.
- Emits Slack and optional Resend emails.

Deploy with the Supabase CLI once credentials are loaded:

```bash
supabase functions deploy webflow-form
```

## Next.js Integration Points

All Supabase estate lives in the `frontend/src/lib` helpers so UI components stay lean.

### Contact / Start Build Form

- Server action: `submitStartBuildAction` at `src/app/start-your-build/actions.ts`.
- Shared helpers: `validateStartBuildInquiry` + `submitStartBuildInquiry` in `src/lib/inquiries.ts`.
- Client form (`StartBuildForm`) now calls the server action directly; it no longer hits a mock endpoint.
- API route `/api/start-request` shares the same logic so external clients (e.g., marketing automation) can still POST JSON payloads.

**Front-end usage:**

```tsx
import { submitStartBuildAction } from "@/app/start-your-build/actions";

await submitStartBuildAction({
  fullName,
  email,
  company,
  projectType,
  goals,
  timeline,
  budget,
  integrations,
  communication
});
```

Errors return as `{ success: false, errors?: string[], message?: string }` so client components can surface validation feedback inline.

### Blog Data Fetching

- Summary/detail helpers in `src/lib/blog.ts` call Supabase REST using the anon key.
- Server component `BlogSection` demonstrates how to render the latest three posts on the marketing home page.
- API route `/api/blog` exposes a JSON response (`?limit=6` default) for any client-side widgets that prefer fetching via Next.

**Server component example:**

```tsx
import { fetchPublishedBlogPosts } from "@/lib/blog";

const posts = await fetchPublishedBlogPosts(3);
```

**Client fetch example:**

```ts
const response = await fetch("/api/blog?limit=3");
const { posts } = await response.json();
```

## QA Checklist

- [ ] Run `supabase db lint` or `supabase db reset` locally to verify migrations apply cleanly.
- [ ] POST to `/api/start-request` with sample payload and confirm insert lands in `public.inquiries`.
- [ ] Call `node api/scripts/seed-local.js` then confirm blog section renders seeded content (requires env config).
- [ ] Trigger the Webflow webhook (or simulate via cURL) once secrets are in place.

Next steps for the front-end Rangers are called out in `docs/progress.md`.
