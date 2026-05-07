# 02 — SHARED LAYER PROMPT: `/src/shared/`

> **Pre-requisite:** read `00_MASTER_PROMPT.md` first. Database (`01_…`) must be deployed.
> **Output target:** `/src/shared/` workspace package consumed by both `web/` and `admin/`.

---

## 0. YOUR TASK

Build the **shared layer** that React (web) and Angular (admin) both import from. This layer holds:

1. TypeScript types reflecting the Supabase schema exactly
2. A configured Supabase client (auth + storage + realtime)
3. Design tokens (colors, typography) in TS and CSS
4. Framework-agnostic data services (one per entity)
5. Pure helper functions
6. React-specific hooks (web/ only consumes these)

**Code priority:** zero duplication. Anything used by both apps lives here. If a helper is used in only one app, do not put it here — keep it local.

---

## 1. PACKAGE SETUP

### 1.1 `/src/shared/package.json`

```json
{
  "name": "@neighborhub/shared",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".":              "./src/index.ts",
    "./supabase":     "./src/supabase/index.ts",
    "./design":       "./src/design/index.ts",
    "./helpers":      "./src/helpers/index.ts",
    "./services":     "./src/services/index.ts",
    "./hooks":        "./src/hooks/index.ts",
    "./design/css":   "./src/design/tokens.css"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.45.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true }
  }
}
```

### 1.2 `/src/shared/tsconfig.json`

Extends root `tsconfig.base.json`. Strict mode, `noUncheckedIndexedAccess: true`, no JSX (the hooks file uses TS-only React types).

### 1.3 Folder layout

```
src/shared/src/
├── index.ts                    ← Barrel (re-exports public surface)
├── supabase/
│   ├── index.ts
│   ├── client.ts               ← Configured singleton
│   └── database.types.ts       ← Generated, DO NOT hand-edit
├── design/
│   ├── index.ts
│   ├── tokens.ts               ← Source of truth (TS)
│   ├── tokens.css              ← Generated mirror (CSS variables)
│   ├── categories.ts           ← Category → asset mapping
│   └── typography.ts           ← Font stacks + weights
├── helpers/
│   ├── index.ts
│   ├── formatDistance.ts
│   ├── formatCO2.ts
│   ├── formatCurrency.ts
│   ├── parseBusinessHours.ts
│   ├── isOpenNow.ts
│   ├── calculateImpact.ts
│   ├── geo.ts                  ← lng/lat ↔ GEOGRAPHY POINT
│   └── slugify.ts
├── services/
│   ├── index.ts
│   ├── _base.ts                ← Shared error class + result type
│   ├── businessService.ts
│   ├── categoryService.ts
│   ├── reviewService.ts
│   ├── visitService.ts
│   ├── verificationService.ts
│   ├── profileService.ts
│   └── storageService.ts
└── hooks/                      ← React only
    ├── index.ts
    ├── useBusinesses.ts
    ├── useBusiness.ts
    ├── useNearbyBusinesses.ts
    ├── useReviews.ts
    ├── useProfile.ts
    ├── useUserImpact.ts
    ├── useCategories.ts
    └── useGeolocation.ts
```

---

## 2. `supabase/client.ts`

```ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

type Env = {
  url: string;
  anonKey: string;
};

const readEnv = (): Env => {
  // Vite (web) and Angular (admin) expose env vars differently. Try both.
  const viteUrl     = (globalThis as any)?.import?.meta?.env?.VITE_SUPABASE_URL;
  const viteKey     = (globalThis as any)?.import?.meta?.env?.VITE_SUPABASE_ANON_KEY;
  const ngUrl       = (globalThis as any)?.process?.env?.NG_APP_SUPABASE_URL;
  const ngKey       = (globalThis as any)?.process?.env?.NG_APP_SUPABASE_ANON_KEY;
  const url         = viteUrl ?? ngUrl ?? '';
  const anonKey     = viteKey ?? ngKey ?? '';
  if (!url || !anonKey) {
    throw new Error('Supabase URL / anon key missing. Set VITE_* (web) or NG_APP_* (admin).');
  }
  return { url, anonKey };
};

let cachedClient: SupabaseClient<Database> | null = null;

export const getSupabase = (): SupabaseClient<Database> => {
  if (cachedClient) return cachedClient;
  const { url, anonKey } = readEnv();
  cachedClient = createClient<Database>(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'neighborhub.auth',
    },
  });
  return cachedClient;
};
```

> **Note:** since web and admin run as separate bundles, each calls `getSupabase()` independently and the singleton is per-bundle. Both share the same `localStorage` key (`neighborhub.auth`) so a session set in one is visible in the other.

---

## 3. `supabase/database.types.ts`

Generate from the deployed Supabase project:

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> --schema public > src/shared/src/supabase/database.types.ts
```

If CLI is unavailable, write the types by hand mirroring `01_schema.sql`. Required exports:

```ts
export type Database = { public: { Tables: {...}, Views: {...}, Functions: {...}, Enums: {...} } };

// Convenience aliases
export type Profile         = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert   = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate   = Database['public']['Tables']['profiles']['Update'];

export type Category        = Database['public']['Tables']['categories']['Row'];
export type Business        = Database['public']['Tables']['businesses']['Row'];
export type BusinessInsert  = Database['public']['Tables']['businesses']['Insert'];
export type Review          = Database['public']['Tables']['reviews']['Row'];
export type Visit           = Database['public']['Tables']['visits']['Row'];
export type Verification    = Database['public']['Tables']['verifications']['Row'];
export type Badge           = Database['public']['Tables']['badges']['Row'];

export type BusinessDirectoryRow = Database['public']['Views']['v_business_directory']['Row'];
export type UserImpactRow        = Database['public']['Views']['v_user_impact']['Row'];

export type UserRole       = Database['public']['Enums']['user_role'];
export type BusinessStatus = Database['public']['Enums']['business_status'];
export type BadgeType      = Database['public']['Enums']['badge_type'];

// JSONB shape
export type BusinessHours = Record<
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  { opens: string; closes: string; closed: boolean }
>;
```

---

## 4. `design/tokens.ts`

```ts
export const colors = {
  toldoRed:           '#C0392B',
  toldoRedLight:      '#F5C6C2',
  quelliteGreen:      '#1A7A4A',
  quelliteGreenLight: '#C3EDCF',
  cornYellow:         '#F4C430',
  signBlue:           '#1565C0',
  chiliOrange:        '#E65100',
  bazarMagenta:       '#880E4F',
  comalBrown:         '#3E2723',
  paperCream:         '#FFF8EE',
  adobeGray:          '#5D4037',
  metalBase:          '#8A8A8A',
  metalLight:         '#BDBDBD',
  metalDark:          '#4A4A4A',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32, '3xl': 48, '4xl': 64 } as const;

export const radii = { sharp: 2, sm: 4, md: 8, lg: 14, full: 9999 } as const;

export const shadows = {
  hard: '4px 4px 0 #1A1A1A',
  soft: '0 4px 12px rgba(0,0,0,0.10)',
  metal: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.4)',
} as const;

export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export type ColorName = keyof typeof colors;
```

### 4.1 `design/tokens.css` (mirror as CSS variables)

```css
:root {
  --color-toldo-red:           #C0392B;
  --color-toldo-red-light:     #F5C6C2;
  --color-quellite-green:      #1A7A4A;
  --color-quellite-green-light:#C3EDCF;
  --color-corn-yellow:         #F4C430;
  --color-sign-blue:           #1565C0;
  --color-chili-orange:        #E65100;
  --color-bazar-magenta:       #880E4F;
  --color-comal-brown:         #3E2723;
  --color-paper-cream:         #FFF8EE;
  --color-adobe-gray:          #5D4037;
  --color-metal-base:          #8A8A8A;
  --color-metal-light:         #BDBDBD;
  --color-metal-dark:          #4A4A4A;

  --font-display: "Bebas Neue", sans-serif;
  --font-body:    "Nunito", sans-serif;
  --font-quote:   "Playfair Display", serif;

  --shadow-hard: 4px 4px 0 #1A1A1A;
  --shadow-soft: 0 4px 12px rgba(0,0,0,0.10);

  --radius-sharp: 2px;
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    14px;
}
```

### 4.2 `design/categories.ts`

```ts
import { colors } from './tokens';

export const categoryAssets = {
  tortillas:    { plate: '/categories/Tortillas.png',  emoji: '🌽', color: colors.cornYellow },
  fonda:        { plate: '/categories/Fonda.png',      emoji: '🥗', color: colors.toldoRed },
  verduleria:   { plate: '/categories/Grosery.png',    emoji: '🥦', color: colors.quelliteGreen },
  lacteos:      { plate: '/categories/Dairy.png',      emoji: '🥛', color: colors.paperCream },
  tianguis:     { plate: '/categories/Tianguis.png',   emoji: '🏪', color: colors.chiliOrange },
  purificadora: { plate: '/categories/Purifying.png',  emoji: '💧', color: colors.signBlue },
  mecanico:     { plate: '/categories/Mechanic.png',   emoji: '🔧', color: colors.adobeGray },
  herreria:     { plate: '/categories/Smithy.png',     emoji: '⚒️', color: colors.metalDark },
  sastreria:    { plate: '/categories/Tailoring.png',  emoji: '🧵', color: colors.bazarMagenta },
  paca:         { plate: '/categories/Paca.png',       emoji: '👗', color: colors.bazarMagenta },
  panaderia:    { plate: null,                         emoji: '🍞', color: colors.chiliOrange },
  polleria:     { plate: null,                         emoji: '🐔', color: colors.toldoRed },
} as const;

export type CategorySlug = keyof typeof categoryAssets;

export const getCategoryAsset = (slug: string) =>
  (categoryAssets as Record<string, typeof categoryAssets[CategorySlug]>)[slug] ?? null;
```

---

## 5. HELPERS — Specs (one file each, ≤ 40 lines)

### `formatDistance(meters: number): string`
- < 1000 → `"450 m"`
- ≥ 1000 → `"1.2 km"` (1 decimal)
- < 0 or NaN → `"—"`

### `formatCO2(kg: number): { value: string; equivalence: string }`
Returns `{ value: "12.4 kg", equivalence: "≈ 0.6 trees planted" }`. Trees = kg / 21.

### `formatCurrency(amount: number, currency = 'MXN'): string`
Uses `Intl.NumberFormat('es-MX')` since amounts are pesos.

### `parseBusinessHours(json: unknown): BusinessHours | null`
Validates shape from JSONB. Returns `null` on invalid input — does not throw.

### `isOpenNow(hours: BusinessHours, now = new Date()): { open: boolean; message: string }`
Returns `{ open: true, message: "Open · closes at 14:00" }` or `{ open: false, message: "Closed · opens tomorrow at 07:00" }`.

### `calculateImpact(km: number, spending: number): { co2Kg: number; trees: number; pesos: number }`
Pure function. CO₂ = km × 0.21. Trees = co2Kg / 21.

### `geo.ts`
```ts
export const toGeoPoint = (lng: number, lat: number) =>
  `SRID=4326;POINT(${lng} ${lat})`;

export const parseGeoPoint = (point: string): { lng: number; lat: number } | null => {
  // Matches "POINT(-99.1632 19.3496)" or "SRID=4326;POINT(-99.1632 19.3496)"
  const m = point.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
  return m ? { lng: parseFloat(m[1]!), lat: parseFloat(m[2]!) } : null;
};
```

### `slugify(s: string): string`
Lowercase, strip accents, replace non-alphanum with `-`, collapse repeats, trim hyphens.

---

## 6. SERVICES — Framework-agnostic CRUD

### 6.1 `services/_base.ts`

```ts
export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number,
    public readonly details?: unknown,
  ) { super(message); this.name = 'ServiceError'; }
}

export type Result<T> = { data: T; error: null } | { data: null; error: ServiceError };

export const ok    = <T>(data: T): Result<T> => ({ data, error: null });
export const fail  = (error: ServiceError): Result<never> => ({ data: null, error });
```

### 6.2 Service shape (apply to all 7)

Every service is a **module of pure async functions** taking the Supabase client + arguments and returning `Result<T>`. No classes, no singletons (the client is the singleton).

Example: `businessService.ts`

```ts
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Business, BusinessInsert, BusinessDirectoryRow, Database } from '../supabase/database.types';
import { ServiceError, ok, fail, type Result } from './_base';

type Sb = SupabaseClient<Database>;

export const listBusinesses = async (
  sb: Sb,
  filters: { categoryId?: string; search?: string; limit?: number } = {},
): Promise<Result<BusinessDirectoryRow[]>> => {
  let q = sb.from('v_business_directory').select('*').limit(filters.limit ?? 20);
  if (filters.categoryId) q = q.eq('category_id', filters.categoryId);
  if (filters.search)     q = q.ilike('name', `%${filters.search}%`);
  const { data, error } = await q;
  if (error) return fail(new ServiceError(error.message, 'list_failed'));
  return ok(data ?? []);
};

export const getBusiness = async (sb: Sb, id: string) => { /* ... */ };

export const findNearby = async (
  sb: Sb,
  args: { lng: number; lat: number; radius?: number; categoryId?: string; search?: string; limit?: number },
) => {
  const { data, error } = await sb.rpc('find_nearby_businesses', {
    user_location: `SRID=4326;POINT(${args.lng} ${args.lat})`,
    radius_meters: args.radius ?? 5000,
    category_filter: args.categoryId ?? null,
    search_query: args.search ?? null,
    result_limit: args.limit ?? 50,
  });
  if (error) return fail(new ServiceError(error.message, 'rpc_failed'));
  return ok(data ?? []);
};

export const createBusiness = async (sb: Sb, payload: BusinessInsert) => { /* ... */ };
export const updateBusiness = async (sb: Sb, id: string, patch: Partial<Business>) => { /* ... */ };
export const softDeleteBusiness = async (sb: Sb, id: string) =>
  updateBusiness(sb, id, { deleted_at: new Date().toISOString() });
```

Apply the same pattern to: `categoryService`, `reviewService`, `visitService`, `verificationService`, `profileService`.

### 6.3 `storageService.ts`

```ts
export const uploadAvatar = async (sb: Sb, userId: string, file: File): Promise<Result<string>> => {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${userId}/avatar.${ext}`;
  const { error } = await sb.storage.from('avatars').upload(path, file, { upsert: true });
  if (error) return fail(new ServiceError(error.message, 'upload_failed'));
  const { data } = sb.storage.from('avatars').getPublicUrl(path);
  return ok(data.publicUrl);
};

export const uploadBusinessPhoto = async (
  sb: Sb,
  userId: string,
  businessId: string,
  file: File,
  kind: 'card' | 'hero',
): Promise<Result<string>> => { /* path: `${userId}/${businessId}/${kind}.${ext}` */ };
```

---

## 7. REACT HOOKS — `hooks/` folder

These wrap services with React state. Use **TanStack Query** (`@tanstack/react-query`) — it must be a peer dep of `web/`, not bundled here. Hook files import `useQuery`, `useMutation` from `@tanstack/react-query` and the corresponding service.

### `useNearbyBusinesses.ts`

```ts
import { useQuery } from '@tanstack/react-query';
import { findNearby } from '../services/businessService';
import { getSupabase } from '../supabase/client';

export const useNearbyBusinesses = (args: { lng: number; lat: number; radius?: number; categoryId?: string }) =>
  useQuery({
    queryKey: ['businesses', 'nearby', args],
    queryFn: async () => {
      const r = await findNearby(getSupabase(), args);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Number.isFinite(args.lng) && Number.isFinite(args.lat),
    staleTime: 60_000,
  });
```

Apply the same pattern to all hooks. Each hook is ≤ 30 lines.

### `useGeolocation.ts`
Custom hook returning `{ coords, error, loading, request }` using `navigator.geolocation`. Defaults to **Mexico City Centro** `(lng: -99.1332, lat: 19.4326)` if permission denied.

---

## 8. BARREL EXPORT — `src/index.ts`

```ts
export * from './supabase';
export * from './design';
export * from './helpers';
export * from './services';
export * from './hooks';
```

---

## 9. ACCEPTANCE CRITERIA

- [ ] `npm run typecheck --workspace @neighborhub/shared` passes.
- [ ] No file > 250 lines; no function > 40 lines.
- [ ] `database.types.ts` mirrors deployed schema 1:1.
- [ ] `getSupabase()` works from both Vite and Angular environments.
- [ ] Every service returns `Result<T>` — never throws to the caller.
- [ ] Hooks are tree-shakable (named exports, no side effects on import).
- [ ] CSS variables in `tokens.css` match TS values in `tokens.ts` exactly.
- [ ] No Spanish identifiers; only "comments / JSDoc" may use translation hints.

---

**END OF SHARED LAYER PROMPT**
