-- Hypocaps — Questionnaire responses

create extension if not exists "pgcrypto";

create table if not exists questionnaire_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Step 1 — Informations personnelles
  first_name text,
  age text,
  email text,

  -- Step 2 — Contexte diabète
  concern_diabetes text not null,
  diabetes_type text,

  -- Step 3 — Habitudes de resucrage
  uses_resucrage text,
  resucrage_food_types text[],
  resucrage_specialized text[],
  resucrage_specialized_other text,
  has_resucrage_problems text,
  resucrage_problems text[],
  resucrage_problems_other text,
  resucrage_form_preference text,

  -- Step 4 — Avis général
  should_be_reimbursed text not null,
  would_try_neutral_taste text
);

-- Index email
create index if not exists idx_qr_email on questionnaire_responses (email);

-- Index chronologique
create index if not exists idx_qr_created_at on questionnaire_responses (created_at desc);

-- Index pour les stats sur les colonnes clés
create index if not exists idx_qr_concern_diabetes on questionnaire_responses (concern_diabetes);
create index if not exists idx_qr_uses_resucrage on questionnaire_responses (uses_resucrage);
create index if not exists idx_qr_should_be_reimbursed on questionnaire_responses (should_be_reimbursed);

-- RLS : autorise l'insert avec la clé anon (publique)
alter table questionnaire_responses enable row level security;
create policy "insert_anon"
  on questionnaire_responses
  for insert
  to anon
  with check (true);
