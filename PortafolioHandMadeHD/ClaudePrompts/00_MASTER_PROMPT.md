# 00 — MASTER PROMPT: NEIGHBORHUB

> **Read this file first in every Claude Code session.** It is the single source of truth for the project.
> All child prompts (`01_…` through `06_…`) assume you have this context loaded.

---

## 0. WHO YOU ARE

You are a senior full-stack engineer building **NeighborHub**, a hyperlocal commerce platform for Mexico City neighborhoods. You write **clean, synthetic, navigable code** with strong reusability across modules. You never duplicate logic that belongs in the shared layer.

**Code priorities (in order):**
1. **Clean** — short functions, descriptive names, no dead code, no commented-out blocks.
2. **Synthetic** — say more with less. Prefer composition over configuration.
3. **Navigable** — folder layout reveals architecture; any developer finds the right file in <30 seconds.
4. **Reusable** — anything used by both `web` and `admin` lives in `shared/`. Period.

---

## 1. PROJECT VISION

**NeighborHub** is a hyperlocal web platform that digitizes Mexican neighborhood commerce (tianguis, fonditas, services, circular fashion) to:

- Reduce carbon footprint via measurable km-saved + CO₂-avoided metrics
- Prevent food waste through proximity-first discovery
- Strengthen the local economy (money flowing back into the neighborhood)
- Turn consumption into a conscious community experience

**Tagline:** *Local trade, global impact.*

**Target users:**
1. **Conscious consumer** — young professional who wants to buy local but doesn't know where.
2. **Traditional vendor** — non-tech (e.g., Doña María, 40, runs a tortillería). Needs visibility.
3. **Microentrepreneur** — small bazar or service owner.
4. **Community leader** — local activist replicating the model.

**MVP scale:** <500 businesses, <2,000 users in 6 months. Supabase Free Tier.

---

## 2. LOCKED ARCHITECTURAL DECISIONS

| # | Decision | Value |
|---|---|---|
| 1 | Product name | **NeighborHub** |
| 2 | Frontend (main) | **React 18 + Vite + TypeScript + TailwindCSS + Zustand** |
| 3 | Frontend (admin module) | **Angular 17+ standalone + Bootstrap 5 + jQuery** |
| 4 | Backend | **Supabase only** (PostgreSQL + PostGIS + RLS + Auth + Storage) |
| 5 | Maps | **Mapbox GL JS** (requires `VITE_MAPBOX_TOKEN`) |
| 6 | Database language | **English** (regenerated from scratch) |
| 7 | UI / code / docs language | **English** |
| 8 | Storage | Supabase Storage from day 1 (`avatars` bucket + `business-photos` bucket) |
| 9 | Project structure | Single-app with isolated sub-builds under `/src/web/` and `/src/admin/` |
| 10 | Testing | None for MVP. Strict TypeScript + ESLint only |
| 11 | Rubric strategy | Strict in spirit, adapted via `RUBRIC_COMPLIANCE.md` (Java→Supabase equivalence table) |
| 12 | Visual identity | **Fusion**: NeighborHub logo PNG + metal-plate category icons + Bebas Neue/Nunito typography + Mexican rótulo color palette |

---

## 3. PROJECT ROOT STRUCTURE

```
neighborhub/
├── README.md                         ← Entry point + rubric traceability table
├── package.json                      ← Root workspace; scripts orchestrate sub-builds
├── .env.example                      ← All env vars documented
├── .gitignore
├── .eslintrc.cjs                     ← Shared ESLint config
├── tsconfig.base.json                ← Shared TS config extended by sub-apps
│
├── public/                           ← Static assets shared by both apps
│   ├── LogoNeighborHub.png
│   ├── categories/                   ← 10 metal-plate PNGs
│   │   ├── Tianguis.png
│   │   ├── Fonda.png
│   │   ├── Paca.png
│   │   ├── Tailoring.png
│   │   ├── Mechanic.png
│   │   ├── Smithy.png
│   │   ├── Tortillas.png
│   │   ├── Dairy.png
│   │   ├── Purifying.png
│   │   └── Grosery.png
│   ├── photos/                       ← Sample business photos (seed data)
│   └── textures/                     ← Background textures (optional)
│
├── src/
│   ├── web/                          ← React 18 + Vite (12 user-facing screens)
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── index.html
│   │   └── src/                      ← see 03_REACT_APP_PROMPT.md
│   │
│   ├── admin/                        ← Angular 17+ (admin panel, 5-entity CRUD)
│   │   ├── package.json
│   │   ├── angular.json
│   │   ├── tsconfig.json
│   │   └── src/                      ← see 04_ANGULAR_ADMIN_PROMPT.md
│   │
│   └── shared/                       ← Consumed by BOTH web/ and admin/
│       ├── package.json              ← Workspace package "@neighborhub/shared"
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts              ← Barrel export
│           ├── supabase/
│           │   ├── client.ts         ← Configured Supabase client (auth + storage)
│           │   └── database.types.ts ← Auto-generated from SQL schema
│           ├── design/
│           │   ├── tokens.ts         ← Colors, typography, spacing (single source)
│           │   ├── tokens.css        ← Same tokens as CSS variables
│           │   └── categories.ts     ← Category → metal-plate PNG mapping
│           ├── helpers/
│           │   ├── formatDistance.ts
│           │   ├── formatCO2.ts
│           │   ├── parseBusinessHours.ts
│           │   ├── isOpenNow.ts
│           │   └── calculateImpact.ts
│           ├── hooks/                ← React-only hooks (web/ uses these)
│           │   └── (see 02_SHARED_LAYER_PROMPT.md)
│           └── services/             ← Framework-agnostic data services
│               ├── businessService.ts
│               ├── reviewService.ts
│               ├── visitService.ts
│               ├── verificationService.ts
│               ├── categoryService.ts
│               └── profileService.ts
│
├── database/                         ← see 01_DATABASE_PROMPT.md
│   ├── 01_schema.sql                 ← Tables, enums, extensions, indexes
│   ├── 02_functions_and_triggers.sql ← PostGIS functions, ACID triggers
│   ├── 03_rls_policies.sql           ← Row Level Security
│   ├── 04_views.sql                  ← v_business_directory, v_user_impact, v_admin_pending
│   ├── 05_storage_buckets.sql        ← avatars + business-photos config
│   ├── 06_seed_data.sql              ← 10 real CDMX businesses + 16 visits
│   └── README.md                     ← Execution order + verification queries
│
├── docs/                             ← see 05_DOCS_PROMPT.md
│   ├── PROJECT_DESCRIPTION.md
│   ├── DATABASE_DIAGRAM.md
│   ├── NAVIGATION_DIAGRAM.md
│   ├── GUI_DESIGN.md
│   ├── ARCHITECTURE.md
│   ├── USE_CASES.md
│   ├── SEQUENCE_DIAGRAMS.md
│   ├── USER_MANUAL.md
│   ├── INSTALLATION_MANUAL.md
│   └── RUBRIC_COMPLIANCE.md          ← Critical: Java→Supabase equivalence table
│
└── prompts/                          ← Where this bundle lives (this file + siblings)
    ├── 00_MASTER_PROMPT.md
    ├── 01_DATABASE_PROMPT.md
    ├── 02_SHARED_LAYER_PROMPT.md
    ├── 03_REACT_APP_PROMPT.md
    ├── 04_ANGULAR_ADMIN_PROMPT.md
    ├── 05_DOCS_PROMPT.md
    └── 06_README_PROMPT.md
```

**Build & deploy model:**
- `npm run dev:web` — runs Vite dev server on `:5173`
- `npm run dev:admin` — runs Angular dev server on `:4200`
- `npm run build` — builds both, outputs to `/dist/web/` and `/dist/admin/`
- Deploy: static hosting (Vercel/Netlify). Path `/admin/*` → Angular bundle; everything else → React bundle. Single `vercel.json` or `netlify.toml` rewrite.

---

## 4. DATABASE — 8 ENTITIES (English)

The schema lives in `/database/`. Full DDL is generated by **`01_DATABASE_PROMPT.md`**. Summary:

### 4.1 Catalog tables (3)

1. **`profiles`** — extends `auth.users` via trigger
   - `id` UUID PK, `name`, `phone`, `role` ENUM(`user`|`vendor`|`admin`)
   - `location` GEOGRAPHY(POINT, 4326), `neighborhood`, `city`, `avatar_url`
   - `active`, `created_at`, `updated_at`, `deleted_at` (soft delete)

2. **`categories`**
   - `id` UUID PK, `name` UNIQUE, `description`, `icon` (emoji fallback)
   - `image_url` (path to metal-plate PNG), `color_hex`, `group` (`food`|`services`|`circular`)
   - `display_order`, `active`, `created_at`

3. **`badges`**
   - `id` UUID PK, `type` ENUM (`community_verified`|`top_rated`|`eco_friendly`|`local_history`|`most_visited`)
   - `name`, `description`, `icon`, `color_hex`, `criterion`

### 4.2 Main entity

4. **`businesses`** — the heart of the platform
   - `id` UUID PK, `owner_id` FK→profiles, `category_id` FK→categories
   - `name`, `description`, `story`, `vendor_quote`, `vendor_name`
   - `phone`, `whatsapp`, `website`
   - `location` GEOGRAPHY(POINT, 4326) **REQUIRED**, `address`, `neighborhood`, `city`, `landmark`
   - `hours` JSONB (7 days, see schema), `years_in_neighborhood`, `photo_url`, `hero_photo_url`
   - `is_eco_friendly`, `eco_practices`
   - `status` ENUM (`active`|`pending`|`suspended`|`inactive`)
   - `rating_avg` DECIMAL(3,2), `total_reviews`, `total_visits`, `total_verifications` — all trigger-maintained
   - `created_at`, `updated_at`, `deleted_at`

### 4.3 Transactional tables (3)

5. **`reviews`** — `id`, `business_id`, `author_id`, `rating` (1–5), `comment` (≤1000 chars), `active`, timestamps. UNIQUE(`business_id`, `author_id`).

6. **`visits`** — `id`, `business_id`, `visitor_id`, `km_distance`, `co2_saved_kg` (= km × 0.21), `reported_spending`, `mode` ENUM(`manual`|`gps`), `visit_location`, `created_at`. **No soft delete** (historical record).

7. **`verifications`** — `id`, `business_id`, `verifier_id`, `confirms` BOOL, `note` (≤300), `created_at`. UNIQUE(`business_id`, `verifier_id`).

### 4.4 Junction table

8. **`business_badges`** — `id`, `business_id`, `badge_type`, `granted_at`. UNIQUE(`business_id`, `badge_type`).

### 4.5 Functions, triggers, views, RLS

- Functions: `calculate_co2(km)`, `distance_km(p1, p2)`, `find_nearby_businesses(...)`
- Triggers: rating recalc, visit increment, verification count + auto-activate (≥5 verifications), profile auto-create on signup, `updated_at` everywhere
- Views: `v_business_directory`, `v_user_impact`, `v_admin_pending`
- RLS: 16+ policies across all tables
- Indexes: GIST on `location`, GIN trigram on `name`, btree on FKs

---

## 5. THE FIVE ENTITIES THE RUBRIC EVALUATES

The academic rubric (Router A) requires **5 CRUD entities**: 3 catalog + 2 transactional. Mapping:

| # | Type | Entity (DB table) | CRUD lives in |
|---|------|-------------------|---------------|
| 1 | Catalog | `profiles` | Angular admin panel — Users tab |
| 2 | Catalog | `categories` | Angular admin panel — Categories tab |
| 3 | Catalog | `businesses` (admin view) | Angular admin panel — Businesses tab + React (vendor self-service) |
| 4 | Transactional | `reviews` | Angular admin panel — Reviews tab + React (user creates own) |
| 5 | Transactional | `visits` | Angular admin panel — Visits tab (read-only reports) + React (user creates own) |

**Why this split works:** every entity has a CRUD UI in the Angular admin panel (which is what the rubric inspects most carefully), AND the user-facing React app provides natural read/create/update flows for the entities normal users own (their own businesses, reviews, visits). This satisfies "CRUD grouped by entity" cleanly.

---

## 6. DESIGN SYSTEM — "FUSION" IDENTITY

### 6.1 Brand assets

- **Logo**: `public/LogoNeighborHub.png` — bold condensed text with 3D shadow. Use as `<img>`, never replace with CSS text.
- **Category icons**: 10 metal-plate PNGs in `public/categories/`. Industrial steel texture, red/orange typography, recortado object on top.

### 6.2 Color palette (Mexican rótulo)

```ts
// shared/src/design/tokens.ts
export const colors = {
  // Primary brand
  toldoRed:       '#C0392B',  // Primary CTA, brand, navbar
  toldoRedLight:  '#F5C6C2',  // Light backgrounds, food badges

  // Eco / verified
  quelliteGreen:      '#1A7A4A',  // Success, verified, eco
  quelliteGreenLight: '#C3EDCF',

  // Accents
  cornYellow:    '#F4C430',  // Stars, highlights, logo on dark
  signBlue:      '#1565C0',  // Links, info, distance
  chiliOrange:   '#E65100',  // Services, energy
  bazarMagenta:  '#880E4F',  // Circular fashion

  // Neutrals
  comalBrown:    '#3E2723',  // Primary text, dark navbar
  paperCream:    '#FFF8EE',  // Card backgrounds, base
  adobeGray:     '#5D4037',  // Secondary text

  // Industrial (from NeighborHub assets — used sparingly for category chips)
  metalBase:     '#8A8A8A',
  metalLight:    '#BDBDBD',
  metalDark:     '#4A4A4A',
} as const;
```

### 6.3 Typography

```ts
export const typography = {
  display: '"Bebas Neue", sans-serif',     // Headings, CTAs, prices — UPPERCASE, letter-spacing 0.04–0.12em
  body:    '"Nunito", sans-serif',         // UI body, weight 700–800
  quote:   '"Playfair Display", serif',    // Vendor stories, italic
} as const;
```

Load via `<link>` in both `index.html` files (Google Fonts).

### 6.4 Component style rules

- **Buttons:** square corners (4px radius), 3px solid bottom border, Bebas Neue uppercase, letter-spacing 0.08em, hard offset shadow `4px 4px 0 #1A1A1A` on primary CTAs.
- **Cards:** 8px radius, 1.5px border, **colored top accent band** (4–6px tall, category color).
- **Badges:** 3px radius (almost square), Nunito 800 uppercase.
- **Inputs:** 2px border (focus = `toldoRed`), `paperCream` background.
- **Bottom nav (mobile):** `comalBrown` bg, 3px `cornYellow` top border.
- **Map pins:** teardrop SVG, category color fill, emoji inside, white border.
- **Price/distance chips:** "market sign" style — bold Bebas number, colored bg, thin full border. Mimics `$15.00 KILO` aesthetic.

### 6.5 Spacing scale

`4, 8, 12, 16, 24, 32, 48, 64` px. Tailwind uses these out of the box.

### 6.6 Category → asset mapping

```ts
// shared/src/design/categories.ts
export const categoryAssets: Record<string, { plate: string; emoji: string; color: string }> = {
  'tortillas':  { plate: '/categories/Tortillas.png',  emoji: '🌽', color: colors.cornYellow },
  'fonda':      { plate: '/categories/Fonda.png',      emoji: '🥗', color: colors.toldoRed },
  'verduleria': { plate: '/categories/Grosery.png',    emoji: '🥦', color: colors.quelliteGreen },
  'lacteos':    { plate: '/categories/Dairy.png',      emoji: '🥛', color: colors.paperCream },
  'tianguis':   { plate: '/categories/Tianguis.png',   emoji: '🏪', color: colors.chiliOrange },
  'purificadora':{ plate: '/categories/Purifying.png', emoji: '💧', color: colors.signBlue },
  'mecanico':   { plate: '/categories/Mechanic.png',   emoji: '🔧', color: colors.adobeGray },
  'herreria':   { plate: '/categories/Smithy.png',     emoji: '⚒️', color: colors.metalDark },
  'sastreria':  { plate: '/categories/Tailoring.png',  emoji: '🧵', color: colors.bazarMagenta },
  'paca':       { plate: '/categories/Paca.png',       emoji: '👗', color: colors.bazarMagenta },
  // Two extra categories without assets — use emoji fallback:
  'panaderia':  { plate: null, emoji: '🍞', color: colors.chiliOrange },
  'polleria':   { plate: null, emoji: '🐔', color: colors.toldoRed },
};
```

> **Note on count:** the rubric design doc lists 12 categories; you have 10 metal plates. The two without plates use emoji fallback. This is intentional and documented.

---

## 7. THE 12 SCREENS (`/src/web/`, React)

| ID | Route | Auth | Purpose |
|----|-------|------|---------|
| SCR-00 | `/` | public | Landing/splash. Hero with logo + animated CO₂ counter + 2 CTAs + 10 category metal-plate grid + featured businesses |
| SCR-01 | `/login` | public | Email/password card form |
| SCR-02 | `/register` | public | 3-step wizard: account → location → confirm |
| SCR-03 | `/home` | auth | Map (Mapbox) + 5km radius + category chips + impact banner + nearby list. Main hub. |
| SCR-04 | `/explore` | auth | Full search + filter panel sheet + infinite scroll list |
| SCR-05 | `/business/:id` | auth | Hero photo + history quote + hours + reviews + "Register visit" CTA |
| SCR-06 | `/register-business` | auth (vendor) | 3-step wizard: data → story → location |
| SCR-07 | `/circular` | auth | Circular fashion landing, magenta theme, FAB to publish |
| SCR-08 | `/profile` | auth | User dashboard, my businesses, ranking, stats grid |
| SCR-09 | `/why-local` | public | Storytelling: animated counter + impact calculator + testimonials |
| SCR-10 | `/my-impact` | auth | Personal dashboard with charts, weekly/monthly/total tabs, share button |
| SCR-11 | (links to `/admin`) | admin only | Conditional UI in profile that opens Angular admin |

Full screen specs in **`03_REACT_APP_PROMPT.md`**.

---

## 8. SEVEN-SPRINT PLAN (Suggested Execution Order)

Each sprint is ~1 week of focused work. Each maps to one or two child prompts.

### Sprint 1 — Database foundation
- **Prompt:** `01_DATABASE_PROMPT.md`
- **Deliverables:** all SQL files in `/database/`, executed in Supabase, Storage buckets created.
- **Verification:** `SELECT count(*) FROM businesses;` returns 10. RLS policies confirmed via Supabase dashboard.

### Sprint 2 — Shared layer
- **Prompt:** `02_SHARED_LAYER_PROMPT.md`
- **Deliverables:** `/src/shared/` workspace package with TS types, Supabase client, design tokens, services, helpers.
- **Verification:** `npm run typecheck` passes from root.

### Sprint 3 — Auth + React skeleton (SCR-00, 01, 02, 09)
- **Prompt:** `03_REACT_APP_PROMPT.md` (sections 1–4)
- **Deliverables:** Vite project, routing, Zustand auth store, public screens.
- **Verification:** can register a new user, log in, see landing page.

### Sprint 4 — React core experience (SCR-03, 04, 05)
- **Prompt:** `03_REACT_APP_PROMPT.md` (sections 5–7)
- **Deliverables:** Mapbox integration, business directory, business detail with reviews.
- **Verification:** seed business appears on map, click pin → detail → leave a review.

### Sprint 5 — React rest (SCR-06, 07, 08, 10)
- **Prompt:** `03_REACT_APP_PROMPT.md` (sections 8–10)
- **Deliverables:** business registration wizard, circular fashion, profile, impact dashboard with Chart.js.
- **Verification:** vendor flow end-to-end works; impact metrics render correctly.

### Sprint 6 — Angular admin panel
- **Prompt:** `04_ANGULAR_ADMIN_PROMPT.md`
- **Deliverables:** `/src/admin/` Angular app with 5 entity CRUDs, jQuery utilities, Bootstrap layout, role guard.
- **Verification:** admin user logs in at `/admin`, can CRUD all 5 entities, RLS blocks non-admins.

### Sprint 7 — Documentation + README
- **Prompts:** `05_DOCS_PROMPT.md` + `06_README_PROMPT.md`
- **Deliverables:** 9 rubric documents + `RUBRIC_COMPLIANCE.md` + root README with traceability table.
- **Verification:** every rubric criterion has a row pointing to a real file:line.

---

## 9. ENVIRONMENT VARIABLES (`.env.example`)

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Mapbox
VITE_MAPBOX_TOKEN=pk.eyJ...

# Angular admin (same Supabase, different env file format)
NG_APP_SUPABASE_URL=https://your-project.supabase.co
NG_APP_SUPABASE_ANON_KEY=eyJ...
NG_APP_MAPBOX_TOKEN=pk.eyJ...
```

Both apps consume the same Supabase project. The user logs in once (Supabase persists session in localStorage); both React and Angular read the same session.

---

## 10. RUBRIC COMPLIANCE STRATEGY (Router A, strict-adapted)

The rubric was written for a Spring Boot / Java / JPA stack. We use Supabase. Our defense lives in `docs/RUBRIC_COMPLIANCE.md`, which maps each criterion to its modern equivalent. The mapping is:

| Rubric requirement | Our implementation | File evidence |
|---|---|---|
| 5 entities CRUD | 5 entities CRUD via Angular admin + React user flows | `src/admin/src/app/features/{profiles,categories,businesses,reviews,visits}/` |
| Angular usage | Full Angular 17 standalone admin panel | `src/admin/` |
| JSON usage | Supabase REST returns JSON; TypeScript types model it; JSONB `hours` column | `database/01_schema.sql`, `shared/src/supabase/database.types.ts` |
| Validations (client + server) | Angular Reactive Forms validators + React Hook Form + Zod + Postgres CHECK constraints + RLS | multiple |
| Bootstrap (≥10 uses) | Tables, modals, navbar, cards, forms, alerts, badges, breadcrumbs, pagination, dropdown — all in Angular admin | `src/admin/src/app/features/**/*.html` |
| jQuery (≥10 uses) | AJAX search, table sort, modal open/close, validation feedback, dynamic filters, autocomplete, etc. — in Angular admin | `src/admin/src/app/shared/jquery/` |
| CSS app-level | Shared design tokens + Tailwind + Angular component CSS | `shared/src/design/tokens.css`, `src/web/src/styles/`, `src/admin/src/styles/` |
| Authentication | Supabase Auth (JWT, refresh tokens) | `shared/src/supabase/client.ts` |
| Password encryption | Supabase Auth uses bcrypt internally; passwords never touch our codebase | documented in `RUBRIC_COMPLIANCE.md` |
| Anti-injection | RLS + parameterized queries via Supabase SDK + JWT-scoped requests + input validation | `database/03_rls_policies.sql` |
| Update with previous values | Reactive Forms `patchValue()` + React Hook Form `defaultValues` from fetched record | per-feature |
| Soft delete | `deleted_at` column on profiles, businesses, reviews, categories | schema |
| 9 docs | All present in `/docs/` | `docs/*.md` |
| Bonus +10 (Spring Boot + React) | **Forfeited** — documented honestly | `RUBRIC_COMPLIANCE.md` |

Total target: **100/100** base points. Bonus skipped intentionally.

---

## 11. CODE QUALITY RULES (NON-NEGOTIABLE)

1. **TypeScript strict mode** in both web and admin (`"strict": true`, `"noUncheckedIndexedAccess": true`).
2. **No `any`** unless justified by a comment explaining why.
3. **No duplicated logic between web and admin** — if both need it, it goes in `shared/`.
4. **Functions > 40 lines** must be split.
5. **Files > 250 lines** must be split.
6. **No inline styles** except for dynamic values (e.g., a category color from data).
7. **No commented-out code** in committed files.
8. **Imports ordered**: external → `@neighborhub/shared` → relative.
9. **One default export per file** (or named exports only).
10. **Errors are typed** — never throw raw strings.

---

## 12. WHAT EACH CHILD PROMPT COVERS

| File | Scope |
|------|-------|
| `01_DATABASE_PROMPT.md` | All SQL: schema, functions, triggers, RLS, views, storage buckets, seed data |
| `02_SHARED_LAYER_PROMPT.md` | `/src/shared/`: TS types, Supabase client, design tokens, services, helpers, hooks |
| `03_REACT_APP_PROMPT.md` | `/src/web/`: 12 screens, components, Zustand stores, routing, Mapbox integration |
| `04_ANGULAR_ADMIN_PROMPT.md` | `/src/admin/`: 5-entity CRUD, Bootstrap, jQuery, role guard, Reactive Forms |
| `05_DOCS_PROMPT.md` | All 9 rubric documents + `RUBRIC_COMPLIANCE.md` |
| `06_README_PROMPT.md` | Root `README.md` with full rubric traceability table |

---

## 13. WHEN STARTING ANY CLAUDE CODE SESSION

Begin every session with this preamble:

> "I am working on **NeighborHub**. Read `prompts/00_MASTER_PROMPT.md` for full project context. Then execute `prompts/0X_<TASK>_PROMPT.md`. Follow the locked decisions in section 2 — do not propose alternative stacks. All code, UI, and docs in English. Code must be clean, synthetic, and navigable; reusable logic goes in `src/shared/`."

End every session by verifying:
- [ ] All new code passes `npm run typecheck && npm run lint` from root
- [ ] No duplication between `web/` and `admin/`
- [ ] Files committed do not exceed 250 lines or contain commented-out code
- [ ] If a new shared concern was introduced, it lives in `src/shared/`

---

## 14. OUT OF SCOPE FOR MVP (DO NOT BUILD)

- Mobile native apps (React Native, Expo) — web responsive is enough
- Spring Boot / any Java backend — Supabase only
- Automated tests — TypeScript strict + ESLint suffice for MVP
- Docker / containerization — static hosting deploy
- Push notifications, real-time chat, payments — future roadmap
- Internationalization (i18n) — English only for now
- Server-side rendering (SSR) — Vite SPA is fine

---

**END OF MASTER PROMPT**
