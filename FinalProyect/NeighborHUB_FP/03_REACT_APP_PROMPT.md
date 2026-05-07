# 03 — REACT APP PROMPT: `/src/web/`

> **Pre-requisite:** read `00_MASTER_PROMPT.md`. Database (`01_…`) deployed. Shared layer (`02_…`) generated.
> **Output target:** `/src/web/` — Vite + React 18 + TypeScript + Tailwind. 12 screens.

---

## 0. YOUR TASK

Build the **user-facing web app** for NeighborHub: 12 responsive screens, Mapbox map, auth flows, business directory, reviews, impact dashboard. Mobile-first; works on desktop.

**Code priority:** small components, single-responsibility files, **everything reusable lives in `@neighborhub/shared`**. Pages compose; they do not duplicate.

---

## 1. PROJECT SETUP

### 1.1 Stack

```
react@18                  zustand                   mapbox-gl + react-map-gl
react-dom@18              @tanstack/react-query     react-hook-form + zod
react-router-dom@6        @neighborhub/shared       chart.js + react-chartjs-2
                          tailwindcss               lucide-react
                          vite                      date-fns
```

### 1.2 `/src/web/package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --max-warnings 0"
  }
}
```

### 1.3 `vite.config.ts`

- Path alias `@/` → `src/`
- Path alias `@shared/` → `../shared/src/`
- Build output to `../../dist/web/`
- Server port 5173

### 1.4 `tailwind.config.ts`

Extend with shared design tokens:

```ts
import { colors, spacing, breakpoints } from '@neighborhub/shared';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        toldo:    { DEFAULT: colors.toldoRed,      light: colors.toldoRedLight },
        quellite: { DEFAULT: colors.quelliteGreen, light: colors.quelliteGreenLight },
        corn:     colors.cornYellow,
        sign:     colors.signBlue,
        chili:    colors.chiliOrange,
        bazar:    colors.bazarMagenta,
        comal:    colors.comalBrown,
        paper:    colors.paperCream,
        adobe:    colors.adobeGray,
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body:    ['Nunito', 'sans-serif'],
        quote:   ['Playfair Display', 'serif'],
      },
      boxShadow: { hard: '4px 4px 0 #1A1A1A' },
    },
  },
};
```

---

## 2. FOLDER STRUCTURE

```
src/web/src/
├── main.tsx                    ← App entrypoint (StrictMode + QueryClient + Router)
├── App.tsx                     ← Route definitions
├── routes.ts                   ← Route constants (single source)
├── styles/
│   └── globals.css             ← Tailwind directives + tokens.css import + reset
│
├── components/                 ← Atoms + Molecules (pure, reusable)
│   ├── ui/                     ← Button, Card, Badge, Input, Modal, Sheet, Skeleton
│   ├── brand/                  ← Logo, MetalPlate, BadgeChip, RatingStars
│   ├── business/               ← BusinessCard, BusinessHero, HoursWidget, MapPin
│   ├── impact/                 ← ImpactCounter, ImpactCard, CO2Badge
│   └── layout/                 ← AppShell, BottomNav, TopNav, Breadcrumb
│
├── features/                   ← Feature-scoped logic
│   ├── auth/                   ← LoginForm, RegisterWizard, useAuth
│   ├── business/               ← BusinessList, BusinessFilters, ReviewForm, RegisterBusinessWizard
│   ├── map/                    ← BusinessMap, useMapState, mapStyles
│   ├── profile/                ← ProfileEditor, MyBusinessesGrid
│   ├── impact/                 ← ImpactDashboard, ImpactCharts
│   └── circular/               ← CircularLanding (SCR-07)
│
├── pages/                      ← One file per screen (SCR-00 to SCR-11)
│   ├── LandingPage.tsx              # SCR-00
│   ├── LoginPage.tsx                # SCR-01
│   ├── RegisterPage.tsx             # SCR-02
│   ├── HomePage.tsx                 # SCR-03
│   ├── ExplorePage.tsx              # SCR-04
│   ├── BusinessDetailPage.tsx       # SCR-05
│   ├── RegisterBusinessPage.tsx     # SCR-06
│   ├── CircularPage.tsx             # SCR-07
│   ├── ProfilePage.tsx              # SCR-08
│   ├── WhyLocalPage.tsx             # SCR-09
│   ├── MyImpactPage.tsx             # SCR-10
│   └── AdminLinkPage.tsx            # SCR-11 (redirect to /admin)
│
├── stores/                     ← Zustand
│   ├── authStore.ts            ← user, session, profile, signIn, signOut
│   ├── locationStore.ts        ← coords, permission, request
│   └── filtersStore.ts         ← selectedCategory, radius, searchQuery
│
├── hooks/                      ← Local hooks (use shared/ first)
│   ├── useGuard.ts             ← Auth/role redirect
│   └── useScrollLock.ts
│
└── lib/
    ├── queryClient.ts          ← TanStack QueryClient config
    └── env.ts                  ← Validated env vars (Zod)
```

---

## 3. ROUTING — `App.tsx` + `routes.ts`

```ts
// routes.ts
export const ROUTES = {
  landing:          '/',
  login:            '/login',
  register:         '/register',
  home:             '/home',
  explore:          '/explore',
  businessDetail:   (id: string) => `/business/${id}`,
  registerBusiness: '/register-business',
  circular:         '/circular',
  profile:          '/profile',
  whyLocal:         '/why-local',
  myImpact:         '/my-impact',
  admin:            '/admin',  // external — Angular bundle
} as const;
```

Use `react-router-dom` with `<RequireAuth>` and `<RequireRole>` wrappers.

---

## 4. AUTH (Zustand store + flows)

### 4.1 `stores/authStore.ts`

```ts
type AuthState = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<Result<void>>;
  signUp: (email: string, password: string, name: string, neighborhood: string) => Promise<Result<void>>;
  signOut: () => Promise<void>;
};
```

`initialize()` calls `supabase.auth.getSession()` + subscribes to `onAuthStateChange`. Profile is fetched via `profileService.getProfile()` whenever session changes.

### 4.2 SCR-01 LoginPage

- Card centered, `paperCream` bg, hard shadow
- Form: `email`, `password` (React Hook Form + Zod)
- "Continue" button → `toldoRed`, full width, Bebas Neue uppercase
- Footer link: "Don't have an account? Sign up" → SCR-02
- Error inline below button (red text, no toast)

### 4.3 SCR-02 RegisterPage — **3-step wizard**

Step indicator at top (3 dots). Each step is a separate component sharing `useForm` via `FormProvider`:

1. **Account** — `email`, `password`, `confirmPassword`, `name`
2. **Location** — `neighborhood` (free text), optional GPS request → stores `lng/lat`
3. **Confirm** — summary card + "Create account" button

On success: `signUp()` → trigger creates profile → redirect to SCR-03 Home.

---

## 5. SCR-00 LANDING PAGE

Public. No auth gate. Sections, top to bottom:

### 5.1 Hero
- Full-viewport, radial gradient `chiliOrange → toldoRed → toldoRedLight`
- `<img src="/LogoNeighborHub.png" alt="NeighborHub" />` centered, max 320px wide
- Subtitle: *"Local trade, global impact."* — Nunito 800, white
- **Animated CO₂ counter** showing community total (queried from `v_user_impact`, summed). Format: `"1,247 kg of CO₂ saved this month."`
- Two CTAs side by side:
  - "EXPLORE MAP" → `/home` — white bg, hard shadow
  - "REGISTER BUSINESS" → `/register-business` — outlined, transparent

### 5.2 Categories grid
- Section title: "WHAT'S NEAR YOU?" (Bebas, comalBrown)
- 3 columns × 4 rows on mobile, 5 columns × 3 rows on desktop
- Each item: `<MetalPlate category={slug} size="lg" />` — clicking navigates to `/explore?cat=<slug>`
- The 2 categories without plates use emoji-only cards styled with metallic gradient bg (use `categoryAssets[slug].plate ?? null` check)

### 5.3 Featured businesses
- Title: "TRENDING IN YOUR BARRIO"
- Horizontal scroll on mobile, 3-up grid desktop
- 6 businesses with `top_rated` badge (call `businessService.listBusinesses({ ...badged: 'top_rated' })`)

### 5.4 Why local strip
- Three-column impact stats (community-wide totals)
- Link "Learn more →" to SCR-09

---

## 6. SCR-03 HOME PAGE (Map + Directory)

The product's heart. Layout:

### 6.1 Top region (40% viewport)
- Mapbox map (react-map-gl), centered on user location
- Custom map style: light, low saturation
- Pins: `<MapPin>` SVG teardrop, color from category, emoji inside, white border
- 5km radius circle around user (semi-transparent toldoRed)
- Tapping pin → bottom sheet with `<BusinessCard variant="preview" />`

### 6.2 Middle region — Filters bar
- Horizontal scroll category chips (small `MetalPlate` size 32px + name)
- Selected = thick toldoRed border + slight scale-up
- Search icon → opens search input replacing chips bar
- "5 km" radius badge (tappable, opens slider sheet 1–10 km)

### 6.3 Bottom region — Nearby list
- Vertical list of `<BusinessCard variant="full" />`
- Pull-to-refresh on mobile (use `react-pull-to-refresh` or simple touch handler)
- Skeleton state while loading
- Empty state: illustration + "No businesses found in 5 km. Try expanding the radius."

### 6.4 Impact banner (sticky bottom-of-list)
- Card: paperCream bg, quelliteGreen accent
- "Your impact this month: **3.2 kg CO₂** · **14 visits** · **$420 local**"
- Tap → SCR-10

---

## 7. SCR-05 BUSINESS DETAIL PAGE

Layout (mobile, scroll vertically):

### 7.1 Hero
- `hero_photo_url` full-width image, 60vh on mobile
- Floating back button top-left, share button top-right
- Bottom-overlay gradient → black 60%
- On gradient: business name (Bebas, 56px), category chip, distance + rating

### 7.2 Story section
- `paperCream` bg
- Vendor portrait (if available) circular 80px
- `vendor_quote` — Playfair Display italic 24px, comalBrown
- — vendor_name, x years in barrio
- "Verified by N neighbors" with verified badge

### 7.3 Hours widget
- `<HoursWidget />` — shows current status: "Open now · closes 14:00" (quelliteGreen) or "Closed · opens tomorrow 07:00" (toldoRed)
- Expandable to show full week schedule

### 7.4 Action bar (sticky bottom on mobile)
- `[ Visited here ]` primary CTA → opens visit modal (km + spending input)
- `[ Verify ]` secondary outlined
- `[ Call ]` `[ WhatsApp ]` icon buttons
- Visit modal computes `co2_saved_kg` client-side and inserts via `visitService.create()`

### 7.5 Reviews section
- "Reviews (N) · ★ 4.6"
- "Leave a review" button → opens `<ReviewForm />` modal
- Review list: avatar + stars + comment + relative time
- Pagination: 5 visible, "Show more" loads next 5

### 7.6 Map mini
- 200px height embed of the location with a single pin
- Tap → opens external Maps app

---

## 8. SCR-06 REGISTER BUSINESS — 3-step wizard

Vendors only (`role !== 'user'` check via `RequireRole`). Steps:

1. **Business basics** — name, category (MetalPlate selector grid), description, vendor name, vendor quote, years in barrio
2. **Story & contact** — story (textarea), phone, whatsapp, website, hours (7-day picker grid), is_eco_friendly + practices
3. **Location** — search address (Mapbox geocoding) OR drop pin on map, neighborhood, landmark, photo upload (card + hero)

Submit → `businessService.create()` with status `pending`. Redirect to a success screen: *"Your business is awaiting community verification. 5 neighbors must confirm before it goes live."*

---

## 9. SCR-08 PROFILE PAGE

Tabs:

1. **Personal data** — editable form (name, neighborhood, avatar upload)
2. **My businesses** — grid of vendor's own businesses (if vendor)
3. **Stats** — `<ImpactCounter />` × 3: visits, kg CO₂, pesos local
4. **History** — list of last 20 visits with date + business + km + co2

Admin users see an **"Open Admin Panel →"** button (links to `/admin`).

---

## 10. SCR-10 MY IMPACT PAGE

Personal dashboard. Charts (Chart.js):

- **Top:** 3 hero stats — "12.4 kg CO₂", "$1,240 local", "47 visits"
- **Tabs:** Week / Month / All time
- **Chart 1:** Line chart — daily CO₂ over selected period
- **Chart 2:** Stacked bar — visits per category
- **Chart 3:** Donut — spending split by category
- **Equivalences strip:** "= 0.6 trees planted · 8 km not driven · 3 supermarket trips replaced"
- **Share button:** generates a shareable card image (canvas → blob)

---

## 11. OTHER SCREENS — Brief specs

- **SCR-04 Explore:** full-screen list with sticky filter sheet, infinite scroll, sort controls (distance / rating / newest)
- **SCR-07 Circular fashion:** magenta theme, hero with `Paca.png`, FAB to publish circular item
- **SCR-09 Why local:** scroll-driven storytelling, animated stats, embedded impact calculator
- **SCR-11 AdminLinkPage:** simple redirect / link page that informs the user they're entering the admin panel and includes a "Continue to /admin" button

---

## 12. SHARED COMPONENTS — Specifications

### `<Logo size?>`
Wraps `<img>` with `loading="eager"` and `alt="NeighborHub"`.

### `<MetalPlate category size onSelect selected>`
- Sizes: `sm 48 / md 80 / lg 120 / xl 160`
- Renders the PNG; if `plate === null`, fallback metallic gradient + emoji centered
- `selected`: 3px toldoRed outline + offset 2px

### `<BusinessCard variant="full" | "preview" | "compact" business>`
- Top accent band (4px) using `categoryAssets[slug].color`
- Photo (4:3 aspect) with rounded-md
- Name (Bebas 24px) + category chip
- Stars + total reviews + distance
- Badge chips horizontal scroll
- "preview" variant for map sheet: photo small left, info right, no badges
- "compact" for search results

### `<BadgeChip type>`
Pill: light-bg of badge color, dark text, uppercase, Nunito 800.

### `<HoursWidget hours />`
Uses `isOpenNow()` helper. Collapsible to show 7-day schedule.

### `<RatingStars rating size interactive onChange?>`
SVG stars, half-star support.

### `<ImpactCounter value label icon color />`
Big Bebas number that animates from 0 on mount.

### `<MapPin category emoji />`
SVG teardrop, fillable.

---

## 13. STATE — Zustand stores

### `authStore`
```ts
useAuth().user, .profile, .session, .signIn(), .signOut(), .signUp(), .initialize()
```

### `locationStore`
```ts
useLocation().coords, .permission ('granted'|'denied'|'prompt'),
.requestPermission(), .setCoords()
```
Defaults to `{ lng: -99.1332, lat: 19.4326 }` (CDMX Centro) if denied.

### `filtersStore`
```ts
useFilters().categoryId, .radius, .search, .setCategory(), .setRadius(), .clearAll()
```

---

## 14. ENV VALIDATION — `lib/env.ts`

```ts
import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(20),
  VITE_MAPBOX_TOKEN: z.string().startsWith('pk.'),
});

export const env = envSchema.parse(import.meta.env);
```

Throws on boot if any var is missing — fail fast.

---

## 15. ACCEPTANCE CRITERIA

- [ ] All 12 routes resolve and render without errors.
- [ ] `npm run typecheck` and `npm run lint` pass clean.
- [ ] No file > 250 lines; no function > 40 lines.
- [ ] Mobile (375px) and desktop (1280px) both look good — no horizontal scroll on mobile.
- [ ] Map renders pins for nearby businesses; tapping shows preview.
- [ ] Auth flows work end-to-end: sign up → profile created → log in → log out.
- [ ] Visit modal computes CO₂ correctly using shared helper.
- [ ] Review form submits and updates `rating_avg` (verify in DB).
- [ ] Photo uploads land in `business-photos/{user_id}/{business_id}/...`.
- [ ] No duplicated logic that already exists in `@neighborhub/shared`.
- [ ] All UI text in **English**.

---

**END OF REACT APP PROMPT**
