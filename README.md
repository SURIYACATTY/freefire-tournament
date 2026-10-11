# BOOYAH ARENA — Free Fire Tournament

## Setup Supabase
1. Create a project at https://supabase.com
2. In SQL Editor, run all SQL in `supabase/schema.sql`.
3. Copy the project URL, publishable/anon key and service role key from project API settings.
4. Copy `.env.example` to `.env.local`, then fill all five values. Use a unique admin password and a random session secret of 32+ characters.

## Run locally
`npm install` then `npm run dev`; open http://localhost:3000 and `/admin` for the dashboard.

## Deploy
Push files to GitHub, import repo at https://vercel.com/new, then add all `.env.example` values under Vercel Project Settings → Environment Variables and redeploy. Never expose `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, or `ADMIN_SESSION_SECRET` in `NEXT_PUBLIC_` variables.

Registrations stored previously in browser localStorage will not migrate automatically.
