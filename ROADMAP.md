# Roadmap — Hypocaps Web

Checklist de requis pour un projet Next.js valorisant sur GitHub / CV.

## ✅ Terminé

### 1. TypeScript strict
- [x] `strict: true` et `strictNullChecks: true` dans tsconfig
- [x] `// @ts-nocheck` ajouté aux fichiers Stackbit legacy pour compatibilité

### 2. Architecture documentée
- [x] Dualité App Router / Pages Router assumée et expliquée dans le README
- [x] Migration progressive depuis Stackbit vers App Router

### 3. Tests unitaires
- [x] Vitest configuré avec `npm test` et `npm run test:watch`
- [x] 41 tests (validation questionnaire + API submit-questionnaire + API contact)

### 4. Suppression des `as any`
- [x] Route `submit-questionnaire` : typée avec `Record<string, unknown>` + type guards
- [x] Route `contact` : typée correctement, plus de `as any`

### 5. Validation des entrées API
- [x] `validateQuestionnaire()` : whitelist par champ (Set), type guards (`isString`, `isStringArray`)
- [x] `validateContact()` : regex email, limites de taille, champs requis

### 6. Plus de logs utilisateur en prod
- [x] `console.log` du payload supprimé
- [x] `console.error` conservé uniquement pour les erreurs serveur (pas de données perso)
- [x] Messages d'erreur visibles dans l'UI questionnaire (`submitError` state)

### 7. Commits propres
- [x] Convention `type(scope): message` en anglais
- [x] Template `.gitmessage` pour les futurs commits
- [x] Commits atomiques rangés par sujet

### 8. ESLint + Prettier
- [x] `eslint.config.mjs` (flat config, Next.js + Prettier)
- [x] `.prettierrc` (tabWidth 2, trailingComma es5)
- [x] `npm run lint` : zéro erreur
- [x] Projet reformaté au complet

---

## 🚧 À faire (nice to have pour le CV)

### 🔁 CI/CD (Continuous Integration / Continuous Deployment)

**C'est quoi ?** Un fichier de config (`.github/workflows/ci.yml`) qui dit à GitHub d'exécuter automatiquement des commandes à chaque `git push`. Par exemple : installer les dépendances → linter le code → lancer les tests.

**Pourquoi ?** Ça garantit que ton code est toujours valide avant d'arriver sur GitHub. Un recruteur voit le petit badge vert "passing" sur ton repo, et ça prouve que tu maîtrises les bonnes pratiques d'ingénierie logicielle. Sans ça, tu peux merger du code cassé sans t'en rendre compte.

- [x] **GitHub Actions** — lint + test à chaque push — `.github/workflows/ci.yml` ✅
- [ ] **Déploiement automatique Netlify** — le déploiement est déjà configuré côté Netlify, mais on pourrait ajouter un "gate" CI qui bloque le déploiement si les tests échouent

---

### 🧪 Tests

**C'est quoi ?** Des fichiers `.test.ts` qui appellent ton code et vérifient qu'il se comporte comme attendu.

**Pourquoi ?** Plus tôt tu attrapes un bug, moins il coûte à corriger. Les tests API sont particulièrement importants : ils vérifient que ta validation serveur fonctionne, que les bons status HTTP sont retournés, et que les données malformées sont rejetées. Les tests e2e (end-to-end) simulent un vrai utilisateur qui clique dans le navigateur — parfait pour le questionnaire.

- [x] **Tests API `submit-questionnaire`** — validation, `buildPayload`, 16 tests — ✅
- [x] **Tests API `contact`** — validation email/taille/champs requis, 12 tests — ✅
- [x] **Tests e2e (Playwright)** — navigation, validation, chargement — 5 tests — ✅ (branche `dev`)

---

### 🐳 Docker

**C'est quoi ?** Un fichier `Dockerfile` qui décrit l'environnement exact dont ton app a besoin (Node.js version X, variables d'environnement, etc.). `docker-compose` permet en plus de lancer la base de données, l'app, et autres services d'un coup.

**Pourquoi ?** "Ça marche sur ma machine" — c'est la phrase qu'on ne veut jamais entendre. Docker garantit que tout le monde (toi, un collègue, un serveur de CI) a exactement le même environnement. Sur un CV, c'est un gros plus : ça montre que tu sais containeriser une app.

- [x] **Dockerfile** — multi-stage (deps → builder → runner) — ✅
- [x] **docker-compose** — service `app` avec build + env_file — ✅
- [x] **`.env.example`** — toutes les variables documentées (Supabase, Algolia, SMTP) — ✅

---

### 📚 Documentation & Qualité

**C'est quoi ?** Storybook est un outil qui affiche tes composants React un par un dans un petit catalogue visuel. Tu peux voir chaque bouton, chaque formulaire, chaque section avec ses différentes variantes.

**Pourquoi ?** Pour un recruteur, voir un Storybook bien rangé montre que tu penses "composant réutilisable", que tu documentes ton travail, et que tu testes visuellement tes UI. L'audit d'accessibilité (a11y) garantit que ton site est utilisable par tout le monde (lecteurs d'écran, navigation clavier, contrastes). Lighthouse CI analyse automatiquement les performances, le SEO, et l'accessibilité de ton site.

- [x] **Storybook** — catalogue visuel de tous les composants (boutons, formulaires, sections)
- [x] **Documentation des composants** — décrire les props, les variants, les cas d'usage
- [ ] **Audit d'accessibilité (a11y)** — vérifier contrastes, labels, navigation clavier, lecteurs d'écran
- [ ] **Lighthouse CI** — mettre un badge de perf/SEO/a11y dans le README

---

### ✨ Fonctionnel

**C'est quoi ?** Des améliorations visibles par l'utilisateur final.

**Pourquoi ?** Le template Stackbit par défaut fait "site vitrine générique". Une page d'accueil moderne, un dark mode, et une vraie page de résultats de questionnaire donnent une identité unique au projet. C'est ce qui fera la différence sur un portfolio.

- [ ] **Page d'accueil moderne** — remplacer le template Stackbit par défaut par un vrai design sur-mesure
- [ ] **Page de résultats du questionnaire** — afficher des stats agrégées (graphiques, tendances) à partir des données Supabase
- [ ] **Mode sombre / clair** — bascule avec persistance (localStorage + `prefers-color-scheme`)
- [ ] **i18n avancé** — internationalisation complète (pas juste FR/EN basique, mais détection de langue, fallback, traductions externalisées)

---

## 📦 Stack technique

| Technologie | Usage |
|-------------|-------|
| Next.js 15 | Framework (App + Pages Router) |
| React 19 | UI |
| TypeScript 5 | Typage strict |
| TailwindCSS 3 | Styles |
| Supabase | Base de données (PostgreSQL + RLS) |
| Vitest | Tests unitaires |
| ESLint 9 | Linting (flat config) |
| Prettier 3 | Formatage |
| Nodemailer | Emails transactionnels |
| Algolia | Recherche plein texte |
| Netlify | Hébergement / déploiement |
