# BS Portal — Client Platform (Next.js + Supabase)

Public website + private client app for an electrical and home automation business. It includes a marketing landing, contact flow, authentication, a project dashboard, and a "My Home" interactive module. Supabase powers auth, database, storage, and realtime, and a Volti assistant is configurable via API.

## Recruiter Highlights

- End-to-end product: marketing site, client onboarding, project tracking, and document delivery.
- Secure by design: Supabase Auth + Row Level Security by user and internal roles.
- Interactive UX: floor plans with zones, devices, and realtime state.
- Clean API surface: uploads, device toggles, and routines endpoints.
- Modern stack: Next.js, React, TypeScript, Tailwind, Supabase.

## Core Features

- Landing page with services, portfolio, and CTA.
- Contact form with basic validation.
- Client login and registration.
- Project dashboard with progress and documents.
- Document downloads via Supabase Storage.
- Volti assistant (LLM) via API.
- "My Home" module: plans, devices, telemetry, and routines.

## Tech Stack

- Next.js (Pages Router) + React + TypeScript
- Tailwind CSS v4
- Supabase (Auth, Database, Storage, Realtime)
- Node 18.18+ (recommended 20) + npm

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`

## Local Setup

1. Install Node 18.18+ (20 recommended).
2. Copy env file: `cp .env.local.example .env.local`.
3. Fill Supabase and OpenAI variables (see below).
4. Install dependencies: `npm install`.
5. Run dev server: `npm run dev` (http://localhost:3000).

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_VOLTI_API_KEY` (optional)
- `NEXT_PUBLIC_VOLTI_API_URL` (optional, default `/api/volti`)
- `NEXT_PUBLIC_INTERNAL_EMAILS` (comma-separated)
- `NEXT_PUBLIC_INTERNAL_BYPASS` (local only)

## Supabase Core Schema

- Tables: `clients`, `projects`, `estimates`, `documents`, `progress`
- Storage: `documents` bucket
- Email auth with `signInWithPassword` and `signUp`

## Key Routes

- `/` landing
- `/contacto`
- `/login`, `/registro`
- `/dashboard`
- `/proyecto/[id]`
- `/api/upload`

## "My Home" Module (/app/home)

- Internal users only (metadata `role=internal` or `NEXT_PUBLIC_INTERNAL_EMAILS`).
- Interactive plans with zones and devices, optimistic toggles (`/api/home/toggle`).
- Image or PDF rendering (pdf.js).

### Supabase Schema + Seed

1. Import `supabase/home-schema.sql`.
2. Replace `:OWNER_USER_ID` with the internal user id.
3. Adjust normalized polygons and positions (0..1).

## Deployment (Vercel)

- Build: `npm ci` -> `npm run build`
- Output: `.next`
- Environment variables: same as `.env.local`

## Note for Recruiters

This project demonstrates:
- Full-stack delivery with Next.js and Supabase.
- Security and permissions with RLS.
- Interactive UX on floor plans and simulated devices.
- API integrations and automation.

If you want, I can add a **Live Demo**, **Screenshots**, and a **Responsibilities** section tailored to your role.
