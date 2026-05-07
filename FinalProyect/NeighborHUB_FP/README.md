# NeighborHub — Claude Code Prompt Bundle

This folder contains **7 prompts** that, executed in order, build the entire NeighborHub project.

---

## How to use

Open Claude Code in a fresh project folder. For each prompt:

1. Start a new Claude Code session.
2. Paste this preamble:
   > "I am working on **NeighborHub**. Read `prompts/00_MASTER_PROMPT.md` for full project context. Then execute `prompts/0X_<TASK>_PROMPT.md`. Follow the locked decisions — do not propose alternative stacks. All code, UI, and docs in English. Code must be clean, synthetic, and navigable; reusable logic goes in `src/shared/`."
3. Replace `0X_<TASK>_PROMPT.md` with the file you're running this session.

---

## Execution order

| Order | File                              | Sprint | What it builds                                                  |
|-------|-----------------------------------|--------|------------------------------------------------------------------|
| 1     | `00_MASTER_PROMPT.md`             | —      | **Read first every session.** Project vision, decisions, plan.   |
| 2     | `01_DATABASE_PROMPT.md`           | 1      | All Supabase SQL: schema, triggers, RLS, views, storage, seed.   |
| 3     | `02_SHARED_LAYER_PROMPT.md`       | 2      | `/src/shared/`: types, Supabase client, design tokens, services. |
| 4     | `03_REACT_APP_PROMPT.md`          | 3–5    | `/src/web/`: 12 user-facing screens. Build in 3 sprints.         |
| 5     | `04_ANGULAR_ADMIN_PROMPT.md`      | 6      | `/src/admin/`: 5 entity CRUDs with Bootstrap + jQuery.           |
| 6     | `05_DOCS_PROMPT.md`               | 7a     | `/docs/`: 10 markdown documents.                                 |
| 7     | `06_README_PROMPT.md`             | 7b     | Root `README.md` with rubric traceability.                       |

---

## Locked decisions (read 00_MASTER_PROMPT.md for details)

| # | Decision | Value |
|---|---|---|
| 1 | Product name | **NeighborHub** |
| 2 | Frontend (main) | **React 18 + Vite + TypeScript + Tailwind + Zustand** |
| 3 | Frontend (admin) | **Angular 17 standalone + Bootstrap 5 + jQuery** |
| 4 | Backend | **Supabase only** (PostgreSQL + PostGIS + RLS + Auth + Storage) |
| 5 | Maps | **Mapbox GL JS** |
| 6 | Database language | **English** |
| 7 | UI / code / docs language | **English** |
| 8 | Storage | Supabase Storage from day 1 |
| 9 | Project structure | Single-app with sub-builds under `/src/web/` and `/src/admin/` |
| 10 | Testing | None for MVP. TypeScript strict + ESLint only |
| 11 | Rubric strategy | Strict-adapted via `docs/RUBRIC_COMPLIANCE.md` |
| 12 | Visual identity | NeighborHub logo + metal plates + Bebas Neue + Mexican rótulo palette |

---

## Tips

- Don't skip prompt 00. Every other prompt assumes its context.
- Run 01 before 02. The shared layer reads the deployed schema.
- 03 (React) is the longest. Spread it across 3 sessions if needed (auth → core → rest).
- 06 (README) goes last because it cites real files that must exist.
- After each prompt completes, run `npm run typecheck && npm run lint` from the repo root before starting the next.

---

**Total estimated time with Claude Code:** ~5–8 productive working days, depending on review pace.
