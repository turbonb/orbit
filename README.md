# Orbit Project Scaffold

This repository contains the groundwork for the **Orbit Collective** web experience.

## Structure

- `frontend/` – Next.js app router project styled with shadcn/ui primitives for the marketing landing page.
- `api/` – Supabase-oriented backend workspace; includes environment placeholders and notes for tables/functions.
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
