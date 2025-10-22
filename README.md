# Orbit Project Scaffold

This repository contains the groundwork for the **Orbit Collective** web experience.

## Structure

- `frontend/` – Next.js app router project styled with shadcn/ui primitives for the marketing landing page.
- `api/` – Supabase-oriented backend workspace; includes environment placeholders and notes for tables/functions.
- `mcp/google-maps/` – MCP server that exposes Google Maps search, place details, and reverse geocoding tools.
- `package.json` – Root workspace configuration exposing convenience scripts for the frontend.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. The marketing site lives at `http://localhost:3000`.

Supabase connection details should be defined in `api/.env.example` before building serverless functions or edge handlers.

## Google Maps MCP server

For AI assistant workflows, the repository includes a Model Context Protocol server under `mcp/google-maps`. It wraps Google Maps APIs so Claude (or any MCP-compatible client) can find places, request detailed venue information, and reverse geocode coordinates.

Follow the instructions in `mcp/google-maps/README.md` to install dependencies, configure your `GOOGLE_MAPS_API_KEY`, and launch the MCP server. Once dependencies are installed you can start it from the repo root with:

```bash
npm run mcp:maps
```
