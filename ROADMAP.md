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
- [x] 13 tests sur la validation du questionnaire (`validateField`, `validateStep`)

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

### CI / CD
- [ ] GitHub Actions — lint + test à chaque push
- [ ] Déploiement automatique Netlify (déjà configuré, mais pas de gate CI)

### Tests
- [ ] Tests sur la route API `submit-questionnaire` (validation + insertion)
- [ ] Tests sur la route API `contact`
- [ ] Tests e2e avec Playwright ou Cypress (parcours questionnaire complet)

### Infrastructure
- [ ] Dockerfile + docker-compose (dev reproductible)
- [ ] Variables d'environnement documentées (`.env.example`)

### Qualité
- [ ] Storybook pour les composants réutilisables
- [ ] Documentation des composants (props, variants)
- [ ] Audit d'accessibilité (a11y)
- [ ] Lighthouse CI (perf, SEO, a11y)

### Fonctionnel
- [ ] Page d'accueil moderne (au lieu du template Stackbit par défaut)
- [ ] Page de résultats du questionnaire (stats agrégées)
- [ ] Mode sombre / clair
- [ ] i18n avancé (pas juste FR/EN basique)

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
