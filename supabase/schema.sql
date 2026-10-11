create extension if not exists pgcrypto;
create table if not exists public.teams (
 id uuid primary key default gen_random_uuid(),
 team_name text not null check (char_length(team_name) between 2 and 50),
 captain_name text not null check (char_length(captain_name) between 2 and 70),
 phone text not null check (char_length(phone) between 5 and 25),
 email text, player_2 text, player_3 text, player_4 text, substitute text, notes text,
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 created_at timestamptz not null default now()
);
create table if not exists public.matches (
 id uuid primary key default gen_random_uuid(),
 team_a uuid not null references public.teams(id) on delete cascade,
 team_b uuid not null references public.teams(id) on delete cascade,
 round_name text not null default 'Round 1', match_time text,
 status text not null default 'scheduled' check (status in ('scheduled','completed')),
 created_at timestamptz not null default now(), check (team_a <> team_b)
);
alter table public.teams enable row level security;
alter table public.matches enable row level security;
drop policy if exists "Anyone can register a team" on public.teams;
create policy "Anyone can register a team" on public.teams for insert to anon, authenticated with check (status = 'pending');
revoke all on public.teams from anon, authenticated;
grant insert (team_name, captain_name, phone, email, player_2, player_3, player_4, substitute, notes, status) on public.teams to anon, authenticated;
revoke all on public.matches from anon, authenticated;
