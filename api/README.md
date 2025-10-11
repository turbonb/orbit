# Orbit API Scaffold

This folder anchors the Supabase backend for the Orbit landing experience. It keeps infrastructure
configuration, SQL migrations, and edge functions distinct from the marketing frontend.

## Structure

- `supabase/` – Placeholder for the Supabase project export (`supabase/config.toml`, migrations, functions).
- `.env.example` – Environment variables shared with the frontend for authenticated requests.
- `scripts/` – Workspace for Supabase CLI helpers (to be added as the API evolves).

## Getting Started

1. Install the Supabase CLI locally.
2. Copy `.env.example` to `.env` and fill in project secrets.
3. Run `supabase init` inside this directory to pull down your project configuration.
4. Add SQL migrations under `supabase/migrations` and functions under `supabase/functions`.

Keep sensitive keys out of version control. Only commit checked-in migrations, function code, and metadata.
