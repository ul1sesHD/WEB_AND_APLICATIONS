# 06 — README PROMPT: Root `README.md`

> **Pre-requisite:** read `00_MASTER_PROMPT.md`. All previous outputs (`01–05`) generated.
> **Output target:** `/README.md` at repo root.

---

## 0. YOUR TASK

Generate the **root `README.md`** for NeighborHub. This is the front door of the repo. It must:

1. Pitch the project clearly in 30 seconds.
2. Show the rubric traceability table — every criterion mapped to real files with line numbers.
3. Walk a new developer from clone to running app in < 10 minutes.
4. Show project structure at a glance.
5. Document scripts, env vars, and deployment.

**Style:** dense but scannable. Prefer tables. Keep it honest. No marketing voice.

---

## 1. STRUCTURE OF THE README

```
1. Title + tagline + status badge row
2. One-paragraph pitch
3. Demo links (placeholders if not deployed yet)
4. Tech stack table
5. Repository structure (tree, abbreviated)
6. Quick start (5 commands max)
7. Environment variables table
8. Scripts reference
9. Rubric compliance table (THE BIG ONE)
10. Architecture overview (link to docs/ARCHITECTURE.md)
11. Documentation index
12. Authors + license
```

---

## 2. TEMPLATE

````markdown
# NeighborHub

> **Local trade, global impact.** A hyperlocal commerce platform that digitizes Mexican
> neighborhood businesses (tianguis, fonditas, services, circular fashion) and measures
> the carbon footprint and local economic impact of buying close to home.

[![Built with Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E)]()
[![React 18](https://img.shields.io/badge/Web-React%2018-61DAFB)]()
[![Angular 17](https://img.shields.io/badge/Admin-Angular%2017-DD0031)]()
[![PostGIS](https://img.shields.io/badge/Geo-PostGIS-336791)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)]()

---

## What it does

NeighborHub helps neighbors discover local businesses within walking distance, register
their visits, and see their cumulative environmental and economic impact. Vendors
publish their stories, hours, and contact info. The community verifies authenticity.
Admins moderate. Every interaction is geographically aware (PostGIS) and legally
authorized (Postgres Row Level Security).

## Live demo

| Surface       | URL                                  |
|---------------|--------------------------------------|
| Web (users)   | _add deployed URL_                   |
| Admin panel   | _add deployed URL_/admin             |
| Database UI   | _add Supabase project URL_           |

Sample admin credentials, after running `06_seed_data.sql` and promoting yourself
via SQL — see Installation Manual.

---

## Tech stack

| Layer          | Choice                                            | Why                                |
|----------------|---------------------------------------------------|------------------------------------|
| Database       | Supabase PostgreSQL 15 + PostGIS + pg_trgm        | Geo queries, fuzzy search          |
| Auth           | Supabase Auth (JWT + bcrypt internally)           | Out-of-the-box secure auth         |
| Storage        | Supabase Storage (`avatars`, `business-photos`)   | Direct uploads with RLS-style ACLs |
| Authorization  | Row Level Security policies                       | Server-side, per-row, per-role     |
| Web frontend   | React 18 + Vite + TypeScript + Tailwind + Zustand | Modern, fast, mobile-first         |
| Admin frontend | Angular 17 + Bootstrap 5 + jQuery + Reactive Forms| Strict-typed admin CRUD            |
| Maps           | Mapbox GL JS                                      | Quality + free tier                |
| Charts         | Chart.js                                          | Impact dashboard                   |
| Shared layer   | TypeScript workspace package                      | Zero duplication between apps      |

---

## Repository structure

```
neighborhub/
├── src/
│   ├── web/         # React 18 user-facing app (12 screens)
│   ├── admin/       # Angular 17 admin panel (5 entity CRUDs)
│   └── shared/      # Types, Supabase client, design tokens, services, hooks
├── database/        # 6 SQL files: schema → triggers → RLS → views → storage → seed
├── docs/            # 10 markdown documents (rubric + compliance defense)
├── public/          # Logo PNG, 10 metal-plate category icons, sample photos
├── prompts/         # 7 Claude Code prompts that built this repo
└── README.md        # This file
```

Full layout: `docs/ARCHITECTURE.md`.

---

## Quick start

```bash
# 1. Clone + install
git clone <repo-url> neighborhub && cd neighborhub
npm install

# 2. Set env vars
cp .env.example .env
# Edit .env with your Supabase URL/key + Mapbox token

# 3. Set up database (Supabase SQL editor)
# Run files in /database/ in order: 01 → 06

# 4. Run dev (two terminals)
npm run dev:web      # http://localhost:5173
npm run dev:admin    # http://localhost:4200

# 5. Promote yourself to admin (optional)
# In Supabase SQL editor:
# UPDATE public.profiles SET role = 'admin' WHERE id = '<your-uuid>';
```

Detailed steps: `docs/INSTALLATION_MANUAL.md`.

---

## Environment variables

```bash
# Web (Vite)
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_MAPBOX_TOKEN=pk.eyJ...

# Admin (Angular env replacement)
NG_APP_SUPABASE_URL=https://<project>.supabase.co
NG_APP_SUPABASE_ANON_KEY=eyJ...
NG_APP_MAPBOX_TOKEN=pk.eyJ...
```

`.env.example` documents all of them.

---

## Scripts

| Command                  | What it does                              |
|--------------------------|-------------------------------------------|
| `npm run dev:web`        | Vite dev server (web app) on `:5173`      |
| `npm run dev:admin`      | Angular dev server (admin) on `:4200`     |
| `npm run build`          | Production build of both apps             |
| `npm run typecheck`      | TypeScript check across all workspaces    |
| `npm run lint`           | ESLint across all workspaces              |
| `npm run preview:web`    | Preview production web build              |

---

## Rubric compliance — Router A traceability

This table maps every academic rubric criterion to its concrete implementation.
For full rationale (especially the Java→Supabase equivalence on Security), see
`docs/RUBRIC_COMPLIANCE.md`.

### Criterion 1 — CRUD for 5 Entities · 20 pts

| Entity        | Type           | Service module                                                       | Admin CRUD UI                                                      |
|---------------|----------------|----------------------------------------------------------------------|---------------------------------------------------------------------|
| Profiles      | Catalog        | `src/shared/src/services/profileService.ts`                          | `src/admin/src/app/features/profiles/`                              |
| Categories    | Catalog        | `src/shared/src/services/categoryService.ts`                         | `src/admin/src/app/features/categories/`                            |
| Businesses    | Catalog        | `src/shared/src/services/businessService.ts`                         | `src/admin/src/app/features/businesses/`                            |
| Reviews       | Transactional  | `src/shared/src/services/reviewService.ts`                           | `src/admin/src/app/features/reviews/`                               |
| Visits        | Transactional  | `src/shared/src/services/visitService.ts`                            | `src/admin/src/app/features/visits/`                                |

Each entity has: list component (Bootstrap table) + form component (Reactive
Forms with validators) + service (CRUD methods) + matching shared service.
JSON: every Supabase response is JSON; the `businesses.hours` column is JSONB.

### Criterion 2 — Update + Normalization · 20 pts

| Item                       | File evidence                                                                                       |
|----------------------------|-----------------------------------------------------------------------------------------------------|
| Update operation per entity| `*-form.component.ts → submit()` in each of 5 features                                              |
| Pre-fill on edit           | `*-form.component.ts → ngOnInit() → patchValue(record)`                                             |
| Validations                | `Validators.required, .email, .pattern, .minLength, .maxLength` in every form group                 |
| 3NF + junction table       | `database/01_schema.sql` (`business_badges` resolves M:N)                                           |
| Soft delete                | `deleted_at TIMESTAMPTZ` on `profiles`, `businesses`, `reviews`, `categories`                       |

### Criterion 3 — Graphical Interfaces · 20 pts

**CSS app-level:**
- `src/shared/src/design/tokens.css` (single source design tokens)
- `src/web/tailwind.config.ts` (extends tokens)
- `src/admin/src/styles.scss` (Bootstrap + tokens)

**Bootstrap — 14 distinct components used:**

| # | Component   | File                                                                |
|---|-------------|---------------------------------------------------------------------|
| 1 | Navbar      | `src/admin/.../layout/topbar/topbar.component.html`                 |
| 2 | Nav-pills   | `src/admin/.../layout/sidebar/sidebar.component.html`               |
| 3 | Card        | every list and form template                                        |
| 4 | Table       | every list template                                                 |
| 5 | Form ctrls  | every form template                                                 |
| 6 | Modal       | `src/admin/.../shared/components/confirm-modal/`                    |
| 7 | Alert       | `src/admin/.../shared/components/alert-banner/`                     |
| 8 | Badge       | role/status indicators (multiple)                                   |
| 9 | Breadcrumb  | `src/admin/.../shared/components/breadcrumb/`                       |
|10 | Pagination  | `src/admin/.../shared/components/pagination/`                       |
|11 | Dropdown    | filter widgets in lists                                             |
|12 | Toast       | `src/admin/.../core/jquery/toast.service.ts`                        |
|13 | Tabs        | `src/admin/.../features/dashboard/dashboard.component.html`         |
|14 | Grid        | every layout template                                               |

**jQuery — 12 distinct uses:**

| # | Use                            | File                                                                |
|---|--------------------------------|---------------------------------------------------------------------|
| 1 | Live search filter             | `src/admin/.../core/jquery/live-search.directive.ts`                |
| 2 | Sortable tables                | `src/admin/.../core/jquery/table-sort.directive.ts`                 |
| 3 | Confirm modal show/hide        | `src/admin/.../core/jquery/confirm-modal.service.ts`                |
| 4 | Tooltip init                   | `src/admin/.../core/jquery/tooltip.directive.ts`                    |
| 5 | Toast notifications            | `src/admin/.../core/jquery/toast.service.ts`                        |
| 6 | Sidebar collapse on mobile     | `src/admin/.../layout/sidebar/sidebar.component.ts`                 |
| 7 | Validation visual feedback     | `src/admin/.../core/jquery/form-feedback.directive.ts`              |
| 8 | CSV export download trigger    | `src/admin/.../features/visits/visit-report.component.ts`           |
| 9 | Autocomplete dropdown          | `src/admin/.../features/businesses/business-form.component.ts`      |
|10 | Image preview before upload    | `src/admin/.../features/businesses/business-form.component.ts`      |
|11 | Smooth scroll to errors        | `src/admin/.../core/jquery/form-feedback.directive.ts`              |
|12 | Tab switcher                   | `src/admin/.../features/dashboard/dashboard.component.ts`           |

### Criterion 4 — Integrated Design + Usability · 15 pts

| Item                | File                                                                  |
|---------------------|-----------------------------------------------------------------------|
| Main menu (web)     | `src/web/src/components/layout/BottomNav.tsx` (mobile), `TopNav.tsx` (desktop) |
| Main menu (admin)   | `src/admin/.../layout/sidebar/`                                       |
| Breadcrumbs         | `src/admin/.../shared/components/breadcrumb/`                         |
| Error handling      | `src/admin/.../core/error/error-handler.service.ts`                   |
| Validation visuals  | `src/admin/.../core/jquery/form-feedback.directive.ts`                |
| Responsive (5 pts)  | Tailwind utility breakpoints + Bootstrap grid                          |

### Criterion 5 — Security · 10 pts

See `docs/RUBRIC_COMPLIANCE.md` for the Java→Supabase equivalence defense.

| Rubric ask          | Implementation                                | Evidence                                                |
|---------------------|-----------------------------------------------|---------------------------------------------------------|
| Authentication      | Supabase Auth (JWT + auto-refresh)            | `src/shared/src/supabase/client.ts`                     |
| Password encryption | Supabase bcrypt internal — never reaches code | (managed)                                               |
| Anti-injection      | RLS + parameterized queries (Supabase SDK)    | `database/03_rls_policies.sql`                          |
| Authorization       | RLS server-side                               | `database/03_rls_policies.sql` (16+ policies)           |

### Criterion 6 — Documentation · 15 pts

| File                                | Purpose                          |
|-------------------------------------|----------------------------------|
| `docs/PROJECT_DESCRIPTION.md`       | 1-page summary                   |
| `docs/DATABASE_DIAGRAM.md`          | ER + DDL                         |
| `docs/NAVIGATION_DIAGRAM.md`        | Screen IDs and flow              |
| `docs/GUI_DESIGN.md`                | Wireframes per screen            |
| `docs/ARCHITECTURE.md`              | Stack and layered design         |
| `docs/USE_CASES.md`                 | 4 abstraction levels             |
| `docs/SEQUENCE_DIAGRAMS.md`         | 3 critical operations            |
| `docs/USER_MANUAL.md`               | End-user guide                   |
| `docs/INSTALLATION_MANUAL.md`       | Setup and deploy                 |
| `docs/RUBRIC_COMPLIANCE.md`         | Java→Supabase equivalence        |

### Score summary

| Criterion                       | Target |
|---------------------------------|--------|
| 1 — CRUD                        | 20 / 20 |
| 2 — Update + normalization      | 20 / 20 |
| 3 — Graphical interfaces        | 20 / 20 |
| 4 — Integrated design           | 15 / 15 |
| 5 — Security                    | 10 / 10 |
| 6 — Documentation               | 15 / 15 |
| **Base total**                  | **100 / 100** |
| Bonus (Spring Boot + React)     | 0 / 10 (forfeited intentionally) |
| **Final**                       | **100 / 110** |

---

## Architecture in 30 seconds

```
┌─────────────┐  ┌──────────────┐
│  Web (React)│  │ Admin (Angular)│
└──────┬──────┘  └────────┬─────┘
       │                  │
       └─────┬────────────┘
             │
   @neighborhub/shared (types, client, services, design tokens)
             │
       ┌─────┴───────────────────────────────┐
       │           SUPABASE                  │
       │  Postgres + PostGIS + Auth + Storage│
       │  RLS policies + triggers + views    │
       └─────────────────────────────────────┘
```

Both frontends are independent SPAs that share a typed Supabase client and design
system. There is no Node backend; Postgres is the application server.

Full diagram: `docs/ARCHITECTURE.md`.

---

## Documentation index

| Topic              | Read                                  |
|--------------------|---------------------------------------|
| What is this       | `docs/PROJECT_DESCRIPTION.md`         |
| How does it work   | `docs/ARCHITECTURE.md`                |
| Database schema    | `docs/DATABASE_DIAGRAM.md`            |
| All screens        | `docs/NAVIGATION_DIAGRAM.md`, `GUI_DESIGN.md` |
| User flows         | `docs/USE_CASES.md`, `SEQUENCE_DIAGRAMS.md` |
| For end users      | `docs/USER_MANUAL.md`                 |
| For developers     | `docs/INSTALLATION_MANUAL.md`         |
| Rubric defense     | `docs/RUBRIC_COMPLIANCE.md`           |

---

## Authors

- **Héctor Ulises Hernández Domínguez**
- **Alejandra Roa Alonso**
- **Eiso Jorge Kashiwamoto Yabuta**

Universidad La Salle México · Facultad de Ingeniería · Web Application and Service Programming · 2026.

---

## License

MIT — see `LICENSE`. Academic use encouraged; commercial use permitted with attribution.
````

---

## 3. ACCEPTANCE CRITERIA

- [ ] README compiles to a clean GitHub-rendered page (preview locally if possible).
- [ ] Every file path cited in the rubric tables is real and resolves.
- [ ] Quick-start gets a new dev to a running app in under 10 minutes.
- [ ] The compliance table is honest — no fake claims.
- [ ] No Spanish.
- [ ] Length ≤ 600 lines (it's dense, not bloated).

---

**END OF README PROMPT**
