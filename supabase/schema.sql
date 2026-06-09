-- Hypocaps — Questionnaire responses

create extension if not exists "pgcrypto";

create table if not exists questionnaire_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text,
  answers jsonb not null
);

-- Index for searching by email
create index if not exists idx_questionnaire_responses_email on questionnaire_responses (email);

-- Index for chronological queries
create index if not exists idx_questionnaire_responses_created_at on questionnaire_responses (created_at desc);
