# Hypocaps

_[English below ↓](#english)_

Site web du projet Hypocaps — une solution de resucrage au goût neutre pour les personnes atteintes d'hypoglycémie.

## À propos

Hypocaps est un projet visant à rendre la vie des personnes atteintes d'hypoglycémie plus simple en proposant une solution de transport ainsi qu'une solution de resucrage au goût neutre. Ce site a été développé pour recueillir les retours d'utilisateurs via un questionnaire dynamique et présenter le projet au public.

## Stack technique

- **Next.js 15** (dual App Router / Pages Router) — pages statiques et API serverless
- **React 19** + **TypeScript** — UI et typage strict
- **TailwindCSS 3** — styles utilitaires
- **Supabase** (PostgreSQL) — base de données avec RLS
- **Nodemailer** — envoi d'emails transactionnels
- **Algolia** — recherche plein texte
- **Contenu** — fichiers JSON / Markdown (modèle headless CMS)

## Infrastructure

- **Hébergement** — Vercel (déploiement continu depuis GitHub, variables d'env via Vercel UI)
- **Domaine** — OVH (hypocaps.fr, DNS pointant vers Vercel)
- **Base de données** — Supabase Cloud (deux tables : `questionnaire_responses`, `contact_messages`)
- **Email** — SMTP via OVH / ProtonMail avec mot de passe d'application

## Questionnaire

- Multi-étapes (wizard) avec progression visuelle et validation
- Logique conditionnelle data-driven (show/hide selon réponses)
- Traductions FR/EN avec valeurs canoniques pour l'analyse statistique

> **Note d'architecture :** Le projet utilise deux routeurs Next.js simultanément. L'**App Router** (`src/app/`) gère le questionnaire interactif et les API serverless. Le **Pages Router** (`src/pages/`) est conservé pour les pages CMS Stackbit existantes. Cette dualité permet la migration progressive sans tout réécrire d'un coup.

## Architecture du projet

```
src/
  app/                          # App Router (Next.js 15)
    api/
      contact/route.ts          # API formulaire de contact
      submit-questionnaire/     # API soumission questionnaire
    questionnaire/page.tsx      # Page questionnaire (FR/EN)
    layout.tsx                  # Layout racine
  components/
    questionnaire/              # Composants du questionnaire
      FieldRenderer.tsx         # Rendu générique des champs
      QuestionnaireWizard.tsx   # Wizard multi-étapes
      SiteLayout.tsx            # Layout avec header/footer (App Router)
    blocks/
      FormBlock/index.tsx       # Bloc formulaire générique (contact)
    sections/
      Header/index.tsx          # En-tête du site (Pages Router)
      Footer/index.tsx          # Pied de page (compatible App Router)
    layouts/
      DefaultBaseLayout/        # Layout par défaut avec header + footer
  lib/
    questionnaire/
      types.ts                  # Types TypeScript des champs
      translations.ts           # Traductions FR/EN + construction du questionnaire
      validation.ts             # Validation des champs
    supabase/
      client.ts                 # Client Supabase (lazy, côté serveur)
content/
  data/                         # Fichiers de configuration (JSON)
    header.json                 # Navigation principale
    footer.json                 # Liens du pied de page
    site.json                   # Configuration globale
  pages/
    index.md                    # Page d'accueil (sections en YAML)
supabase/
  schema.sql                    # Schéma de la base de données
```

## Licence

MIT

---

## English {#english}

Hypocaps website — a neutral-tasting sugar rescue solution for people with hypoglycemia.

## About

Hypocaps aims to simplify life for people with hypoglycemia by offering a transport solution and a neutral-tasting sugar rescue product. This website was built to gather user feedback through a dynamic questionnaire and to present the project to the public.

## Tech Stack

- **Next.js 15** (dual App Router / Pages Router) — static pages and serverless APIs
- **React 19** + **TypeScript** — UI with strict typing
- **TailwindCSS 3** — utility-first CSS
- **Supabase** (PostgreSQL) — database with Row-Level Security
- **Nodemailer** — transactional email sending
- **Algolia** — full-text search
- **Content** — JSON / Markdown files (headless CMS model)

## Infrastructure

- **Hosting** — Vercel (continuous deployment from GitHub, env vars via Vercel UI)
- **Domain** — OVH (hypocaps.fr, DNS pointing to Vercel)
- **Database** — Supabase Cloud (two tables: `questionnaire_responses`, `contact_messages`)
- **Email** — SMTP via OVH / ProtonMail with app password

## Questionnaire

- Multi-step wizard with visual progress and validation
- Data-driven conditional logic (show/hide based on answers)
- FR/EN translations with canonical values for statistical analysis

> **Architecture note:** The project uses two Next.js routers simultaneously. The **App Router** (`src/app/`) handles the interactive questionnaire and serverless APIs. The **Pages Router** (`src/pages/`) is kept for existing Stackbit CMS pages. This dual setup enables progressive migration without rewriting everything at once.

## Project Architecture

```
src/
  app/                          # App Router (Next.js 15)
    api/
      contact/route.ts          # Contact form API
      submit-questionnaire/     # Questionnaire submission API
    questionnaire/page.tsx      # Questionnaire page (FR/EN)
    layout.tsx                  # Root layout
  components/
    questionnaire/              # Questionnaire components
      FieldRenderer.tsx         # Generic field renderer
      QuestionnaireWizard.tsx   # Multi-step wizard
      SiteLayout.tsx            # Layout with header/footer (App Router)
    blocks/
      FormBlock/index.tsx       # Generic form block (contact)
    sections/
      Header/index.tsx          # Site header (Pages Router)
      Footer/index.tsx          # Footer (App Router compatible)
    layouts/
      DefaultBaseLayout/        # Default layout with header + footer
  lib/
    questionnaire/
      types.ts                  # TypeScript field types
      translations.ts           # FR/EN translations + questionnaire builder
      validation.ts             # Field validation
    supabase/
      client.ts                 # Supabase client (lazy, server-side)
content/
  data/                         # Config files (JSON)
    header.json                 # Main navigation
    footer.json                 # Footer links
    site.json                   # Global config
  pages/
    index.md                    # Homepage (YAML sections)
supabase/
  schema.sql                    # Database schema
```

## License

MIT
