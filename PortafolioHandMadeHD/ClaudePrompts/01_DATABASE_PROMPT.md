# 01 — DATABASE PROMPT: SUPABASE SQL BUNDLE

> **Pre-requisite:** read `00_MASTER_PROMPT.md` first.
> **Output target:** `/database/` folder with 6 SQL files + a README.
> **Execution target:** Supabase project SQL Editor.

---

## 0. YOUR TASK

Generate the full Supabase database for **NeighborHub** in **English**, from scratch, in 6 ordered SQL files. Every file must be safe to run multiple times (use `CREATE … IF NOT EXISTS`, `DROP … IF EXISTS` where appropriate, `ON CONFLICT` for seeds).

Code priorities: clean SQL, named constraints, descriptive comments, no dead code.

---

## 1. FILE OUTPUT ORDER

```
/database/
├── 01_schema.sql                  ← Run 1st
├── 02_functions_and_triggers.sql  ← Run 2nd
├── 03_rls_policies.sql            ← Run 3rd
├── 04_views.sql                   ← Run 4th
├── 05_storage_buckets.sql         ← Run 5th (or via dashboard)
├── 06_seed_data.sql               ← Run 6th (last)
└── README.md                      ← Execution + verification guide
```

---

## 2. FILE 1: `01_schema.sql`

### 2.1 Header & extensions

```sql
-- =============================================================================
-- NeighborHub — Schema Definition
-- Database: Supabase (PostgreSQL 15+)
-- File order: 1 of 6
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS postgis;        -- Geographic queries
CREATE EXTENSION IF NOT EXISTS pg_trgm;        -- Fuzzy text search
CREATE EXTENSION IF NOT EXISTS unaccent;       -- Accent-insensitive search
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- UUID generation
```

### 2.2 ENUM types

```sql
CREATE TYPE user_role AS ENUM ('user', 'vendor', 'admin');

CREATE TYPE business_status AS ENUM ('active', 'pending', 'suspended', 'inactive');

CREATE TYPE badge_type AS ENUM (
  'community_verified',
  'top_rated',
  'eco_friendly',
  'local_history',
  'most_visited'
);

CREATE TYPE visit_mode AS ENUM ('manual', 'gps');

CREATE TYPE category_group AS ENUM ('food', 'services', 'circular');
```

### 2.3 Table: `profiles`

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(20),
  role          user_role NOT NULL DEFAULT 'user',
  location      GEOGRAPHY(POINT, 4326),       -- longitude first, latitude second
  neighborhood  VARCHAR(100),
  city          VARCHAR(100) NOT NULL DEFAULT 'Mexico City',
  avatar_url    TEXT,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ,
  CONSTRAINT name_not_empty CHECK (length(trim(name)) > 0)
);

CREATE INDEX IF NOT EXISTS idx_profiles_role     ON public.profiles(role) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles USING GIST(location);
COMMENT ON TABLE public.profiles IS 'User profiles extending auth.users via trigger.';
```

### 2.4 Table: `categories`

```sql
CREATE TABLE IF NOT EXISTS public.categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(100) NOT NULL UNIQUE,
  description   TEXT,
  icon          VARCHAR(10),                  -- emoji fallback
  image_url     TEXT,                         -- path to metal-plate PNG
  color_hex     VARCHAR(7) NOT NULL,
  group_name    category_group NOT NULL,
  display_order SMALLINT NOT NULL DEFAULT 0,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT color_hex_format CHECK (color_hex ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE INDEX IF NOT EXISTS idx_categories_active ON public.categories(active, display_order);
```

### 2.5 Table: `badges`

```sql
CREATE TABLE IF NOT EXISTS public.badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type        badge_type NOT NULL UNIQUE,
  name        VARCHAR(80) NOT NULL,
  description TEXT,
  icon        VARCHAR(10),
  color_hex   VARCHAR(7) NOT NULL,
  criterion   TEXT,
  CONSTRAINT badge_color_format CHECK (color_hex ~ '^#[0-9A-Fa-f]{6}$')
);
```

### 2.6 Table: `businesses`

```sql
CREATE TABLE IF NOT EXISTS public.businesses (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id              UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id           UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,

  name                  VARCHAR(150) NOT NULL,
  description           TEXT,
  story                 TEXT,
  vendor_quote          TEXT,
  vendor_name           VARCHAR(100),

  phone                 VARCHAR(20),
  whatsapp              VARCHAR(20),
  website               TEXT,

  location              GEOGRAPHY(POINT, 4326) NOT NULL,
  address               TEXT,
  neighborhood          VARCHAR(100),
  city                  VARCHAR(100) NOT NULL DEFAULT 'Mexico City',
  landmark              TEXT,

  hours                 JSONB,
  years_in_neighborhood SMALLINT,
  photo_url             TEXT,
  hero_photo_url        TEXT,

  is_eco_friendly       BOOLEAN NOT NULL DEFAULT FALSE,
  eco_practices         TEXT,

  status                business_status NOT NULL DEFAULT 'pending',

  rating_avg            DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  total_reviews         INTEGER NOT NULL DEFAULT 0,
  total_visits          INTEGER NOT NULL DEFAULT 0,
  total_verifications   INTEGER NOT NULL DEFAULT 0,

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at            TIMESTAMPTZ,

  CONSTRAINT business_name_not_empty CHECK (length(trim(name)) > 0),
  CONSTRAINT rating_range            CHECK (rating_avg >= 0 AND rating_avg <= 5),
  CONSTRAINT counters_non_negative   CHECK (
    total_reviews >= 0 AND total_visits >= 0 AND total_verifications >= 0
  )
);

CREATE INDEX IF NOT EXISTS idx_businesses_location     ON public.businesses USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_businesses_category     ON public.businesses(category_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_businesses_owner        ON public.businesses(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_businesses_status       ON public.businesses(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_businesses_name_trgm    ON public.businesses USING GIN(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_businesses_neighborhood ON public.businesses(neighborhood) WHERE deleted_at IS NULL;
```

### 2.7 Table: `reviews`

```sql
CREATE TABLE IF NOT EXISTS public.reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating      SMALLINT NOT NULL,
  comment     TEXT,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT rating_1_to_5     CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT comment_max_1000  CHECK (comment IS NULL OR length(comment) <= 1000),
  UNIQUE (business_id, author_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_business ON public.reviews(business_id) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_reviews_author   ON public.reviews(author_id);
```

### 2.8 Table: `visits`

```sql
CREATE TABLE IF NOT EXISTS public.visits (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id       UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  visitor_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  km_distance       DECIMAL(8,3) NOT NULL,
  co2_saved_kg      DECIMAL(8,4) NOT NULL,
  reported_spending DECIMAL(10,2),
  mode              visit_mode NOT NULL DEFAULT 'manual',
  visit_location    GEOGRAPHY(POINT, 4326),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT km_non_negative      CHECK (km_distance >= 0),
  CONSTRAINT co2_non_negative     CHECK (co2_saved_kg >= 0),
  CONSTRAINT spending_non_negative CHECK (reported_spending IS NULL OR reported_spending >= 0)
);

CREATE INDEX IF NOT EXISTS idx_visits_business ON public.visits(business_id);
CREATE INDEX IF NOT EXISTS idx_visits_visitor  ON public.visits(visitor_id, created_at DESC);
```

### 2.9 Table: `verifications`

```sql
CREATE TABLE IF NOT EXISTS public.verifications (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id  UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  verifier_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  confirms     BOOLEAN NOT NULL DEFAULT TRUE,
  note         TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT note_max_300 CHECK (note IS NULL OR length(note) <= 300),
  UNIQUE (business_id, verifier_id)
);

CREATE INDEX IF NOT EXISTS idx_verifications_business ON public.verifications(business_id);
```

### 2.10 Table: `business_badges`

```sql
CREATE TABLE IF NOT EXISTS public.business_badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  badge_type  badge_type NOT NULL,
  granted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business_id, badge_type),
  FOREIGN KEY (badge_type) REFERENCES public.badges(type) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_business_badges_business ON public.business_badges(business_id);
```

---

## 3. FILE 2: `02_functions_and_triggers.sql`

### 3.1 Header

```sql
-- =============================================================================
-- NeighborHub — Functions & Triggers
-- File order: 2 of 6
-- =============================================================================
```

### 3.2 Utility functions

```sql
-- CO2 saved factor for Mexico City (kg per km not driven)
CREATE OR REPLACE FUNCTION public.calculate_co2(km DECIMAL)
RETURNS DECIMAL LANGUAGE sql IMMUTABLE AS $$
  SELECT ROUND((km * 0.21)::numeric, 4);
$$;

-- Distance between two GEOGRAPHY points in km
CREATE OR REPLACE FUNCTION public.distance_km(p1 GEOGRAPHY, p2 GEOGRAPHY)
RETURNS DECIMAL LANGUAGE sql IMMUTABLE AS $$
  SELECT ROUND((ST_Distance(p1, p2) / 1000.0)::numeric, 3);
$$;

-- Generic updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

### 3.3 RPC: `find_nearby_businesses`

```sql
CREATE OR REPLACE FUNCTION public.find_nearby_businesses(
  user_location  GEOGRAPHY,
  radius_meters  INTEGER DEFAULT 5000,
  category_filter UUID DEFAULT NULL,
  search_query   TEXT DEFAULT NULL,
  result_limit   INTEGER DEFAULT 50
)
RETURNS TABLE (
  id              UUID,
  name            VARCHAR,
  category_name   VARCHAR,
  category_icon   VARCHAR,
  category_color  VARCHAR,
  distance_meters DECIMAL,
  rating_avg      DECIMAL,
  total_reviews   INTEGER,
  location        GEOGRAPHY,
  photo_url       TEXT,
  status          business_status
)
LANGUAGE sql STABLE AS $$
  SELECT
    b.id,
    b.name,
    c.name AS category_name,
    c.icon AS category_icon,
    c.color_hex AS category_color,
    ROUND(ST_Distance(b.location, user_location)::numeric, 0) AS distance_meters,
    b.rating_avg,
    b.total_reviews,
    b.location,
    b.photo_url,
    b.status
  FROM public.businesses b
  JOIN public.categories c ON c.id = b.category_id
  WHERE b.deleted_at IS NULL
    AND b.status IN ('active', 'pending')
    AND ST_DWithin(b.location, user_location, radius_meters)
    AND (category_filter IS NULL OR b.category_id = category_filter)
    AND (search_query IS NULL OR b.name ILIKE '%' || search_query || '%')
  ORDER BY ST_Distance(b.location, user_location) ASC
  LIMIT result_limit;
$$;
```

### 3.4 Triggers — counters

```sql
-- Recalculate rating_avg + total_reviews on review change
CREATE OR REPLACE FUNCTION public.recalculate_business_rating()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  target_business_id UUID := COALESCE(NEW.business_id, OLD.business_id);
BEGIN
  UPDATE public.businesses b
  SET
    rating_avg    = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2)
                              FROM public.reviews
                              WHERE business_id = target_business_id AND active = TRUE), 0),
    total_reviews = (SELECT COUNT(*)
                     FROM public.reviews
                     WHERE business_id = target_business_id AND active = TRUE)
  WHERE b.id = target_business_id;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_recalculate_rating
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.recalculate_business_rating();

-- Increment visit count
CREATE OR REPLACE FUNCTION public.increment_business_visits()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.businesses
  SET total_visits = total_visits + 1
  WHERE id = NEW.business_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_increment_visits
AFTER INSERT ON public.visits
FOR EACH ROW EXECUTE FUNCTION public.increment_business_visits();

-- Recalculate verifications + auto-activate at >= 5
CREATE OR REPLACE FUNCTION public.recalculate_business_verifications()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  target_business_id UUID := COALESCE(NEW.business_id, OLD.business_id);
  new_count          INTEGER;
BEGIN
  SELECT COUNT(*) INTO new_count
  FROM public.verifications
  WHERE business_id = target_business_id AND confirms = TRUE;

  UPDATE public.businesses
  SET
    total_verifications = new_count,
    status = CASE
      WHEN status = 'pending' AND new_count >= 5 THEN 'active'::business_status
      ELSE status
    END
  WHERE id = target_business_id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_recalculate_verifications
AFTER INSERT OR DELETE ON public.verifications
FOR EACH ROW EXECUTE FUNCTION public.recalculate_business_verifications();
```

### 3.5 Trigger — auto-create profile on signup

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3.6 `updated_at` triggers (one per relevant table)

```sql
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

---

## 4. FILE 3: `03_rls_policies.sql`

Enable RLS on every table and define policies for each role. Pattern:
- Public read for catalog data and active listings
- Owner write on user-generated data
- Admin override via role check

```sql
-- =============================================================================
-- NeighborHub — Row Level Security
-- File order: 3 of 6
-- =============================================================================

ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_badges ENABLE ROW LEVEL SECURITY;

-- Helper: is current user admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND deleted_at IS NULL
  );
$$;

-- ─── profiles ────────────────────────────────────────────────────────────────
CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT
  USING (active = TRUE AND deleted_at IS NULL);

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ─── categories (read-only public, admin writes) ─────────────────────────────
CREATE POLICY "categories_select_active"
  ON public.categories FOR SELECT
  USING (active = TRUE);

CREATE POLICY "categories_admin_all"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- ─── badges (read-only public) ───────────────────────────────────────────────
CREATE POLICY "badges_select_all"
  ON public.badges FOR SELECT
  USING (TRUE);

-- ─── businesses ──────────────────────────────────────────────────────────────
CREATE POLICY "businesses_select_visible"
  ON public.businesses FOR SELECT
  USING (deleted_at IS NULL AND status IN ('active', 'pending'));

CREATE POLICY "businesses_insert_own"
  ON public.businesses FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "businesses_update_own"
  ON public.businesses FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "businesses_delete_own"
  ON public.businesses FOR DELETE
  USING (auth.uid() = owner_id);

CREATE POLICY "businesses_admin_all"
  ON public.businesses FOR ALL
  USING (public.is_admin());

-- ─── reviews ─────────────────────────────────────────────────────────────────
CREATE POLICY "reviews_select_active"
  ON public.reviews FOR SELECT
  USING (active = TRUE);

CREATE POLICY "reviews_insert_own"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "reviews_update_own"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "reviews_admin_all"
  ON public.reviews FOR ALL
  USING (public.is_admin());

-- ─── visits ──────────────────────────────────────────────────────────────────
CREATE POLICY "visits_select_own"
  ON public.visits FOR SELECT
  USING (auth.uid() = visitor_id);

CREATE POLICY "visits_insert_own"
  ON public.visits FOR INSERT
  WITH CHECK (auth.uid() = visitor_id);

CREATE POLICY "visits_admin_all"
  ON public.visits FOR ALL
  USING (public.is_admin());

-- ─── verifications ───────────────────────────────────────────────────────────
CREATE POLICY "verifications_select_all"
  ON public.verifications FOR SELECT
  USING (TRUE);

CREATE POLICY "verifications_insert_own"
  ON public.verifications FOR INSERT
  WITH CHECK (auth.uid() = verifier_id);

CREATE POLICY "verifications_admin_all"
  ON public.verifications FOR ALL
  USING (public.is_admin());

-- ─── business_badges (read-only public, system-managed) ──────────────────────
CREATE POLICY "business_badges_select_all"
  ON public.business_badges FOR SELECT
  USING (TRUE);

CREATE POLICY "business_badges_admin_all"
  ON public.business_badges FOR ALL
  USING (public.is_admin());
```

---

## 5. FILE 4: `04_views.sql`

```sql
-- =============================================================================
-- NeighborHub — Reporting Views
-- File order: 4 of 6
-- =============================================================================

-- v_business_directory: businesses + category + owner + badges (JSON aggregated)
CREATE OR REPLACE VIEW public.v_business_directory AS
SELECT
  b.id,
  b.name,
  b.description,
  b.story,
  b.vendor_quote,
  b.vendor_name,
  b.phone,
  b.whatsapp,
  b.address,
  b.neighborhood,
  b.city,
  b.location,
  b.hours,
  b.years_in_neighborhood,
  b.photo_url,
  b.hero_photo_url,
  b.is_eco_friendly,
  b.eco_practices,
  b.status,
  b.rating_avg,
  b.total_reviews,
  b.total_visits,
  b.total_verifications,
  c.id    AS category_id,
  c.name  AS category_name,
  c.icon  AS category_icon,
  c.image_url AS category_image_url,
  c.color_hex AS category_color,
  c.group_name AS category_group,
  p.id    AS owner_profile_id,
  p.name  AS owner_name,
  p.avatar_url AS owner_avatar_url,
  COALESCE(
    (SELECT json_agg(json_build_object(
       'type', bb.badge_type,
       'name', bg.name,
       'icon', bg.icon,
       'color', bg.color_hex
     ))
     FROM public.business_badges bb
     JOIN public.badges bg ON bg.type = bb.badge_type
     WHERE bb.business_id = b.id),
    '[]'::json
  ) AS badges
FROM public.businesses b
JOIN public.categories c ON c.id = b.category_id
JOIN public.profiles   p ON p.id = b.owner_id
WHERE b.deleted_at IS NULL;

-- v_user_impact: aggregate metrics per user
CREATE OR REPLACE VIEW public.v_user_impact AS
SELECT
  p.id AS user_id,
  p.name,
  COUNT(v.id)                                         AS total_visits,
  COALESCE(SUM(v.km_distance), 0)                     AS total_km_saved,
  COALESCE(SUM(v.co2_saved_kg), 0)                    AS total_co2_saved_kg,
  COALESCE(SUM(v.reported_spending), 0)               AS total_local_spending,
  COUNT(DISTINCT v.business_id)                       AS unique_businesses_visited,
  COUNT(DISTINCT DATE(v.created_at))                  AS active_days,
  MIN(v.created_at)                                   AS first_visit_at,
  MAX(v.created_at)                                   AS last_visit_at
FROM public.profiles p
LEFT JOIN public.visits v ON v.visitor_id = p.id
GROUP BY p.id, p.name;

-- v_admin_pending: businesses needing admin review
CREATE OR REPLACE VIEW public.v_admin_pending AS
SELECT
  b.id,
  b.name,
  b.created_at,
  b.total_verifications,
  b.status,
  c.name AS category_name,
  p.name AS owner_name,
  p.id   AS owner_id
FROM public.businesses b
JOIN public.categories c ON c.id = b.category_id
JOIN public.profiles   p ON p.id = b.owner_id
WHERE b.status = 'pending' AND b.deleted_at IS NULL
ORDER BY b.created_at ASC;
```

---

## 6. FILE 5: `05_storage_buckets.sql`

```sql
-- =============================================================================
-- NeighborHub — Storage Buckets
-- File order: 5 of 6
-- Note: bucket creation via SQL requires the `storage` extension; otherwise
-- create them in the Supabase dashboard with the same names.
-- =============================================================================

-- Bucket: avatars (public read, authenticated write to own folder)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', TRUE, 2097152, ARRAY['image/png','image/jpeg','image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Bucket: business-photos (public read, authenticated write)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('business-photos', 'business-photos', TRUE, 5242880, ARRAY['image/png','image/jpeg','image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_owner_write"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "avatars_owner_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "avatars_owner_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "business_photos_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'business-photos');

CREATE POLICY "business_photos_authenticated_write"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'business-photos' AND auth.role() = 'authenticated');

CREATE POLICY "business_photos_owner_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'business-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "business_photos_owner_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'business-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
```

**Folder convention:** uploads must use `{user_id}/{filename}` to satisfy ownership checks.

---

## 7. FILE 6: `06_seed_data.sql`

Generate seed data for:
- 7 users (3 vendors, 3 consumers, 1 admin) — created via `auth.users` raw inserts
- 12 categories (10 with metal-plate `image_url`, 2 with emoji-only)
- 5 badges (one per `badge_type`)
- 10 real CDMX businesses with accurate `ST_MakePoint(lng, lat)` coordinates in different neighborhoods (Coyoacán, Roma, Condesa, Del Valle, Narvarte, Centro, Polanco, Santa María La Ribera, San Rafael, Tlalpan)
- 16 historical visits with computed CO₂
- 14 reviews
- 8 verifications
- Selected `business_badges` matching their criteria

Each business must include: `name`, `story` (storytelling 2–3 paragraphs), `vendor_quote`, `vendor_name`, `years_in_neighborhood`, complete `hours` JSONB for 7 days, `phone`, `whatsapp`, `address`, `neighborhood`, `landmark`, `photo_url` referencing `/photos/business-N.jpg`, `is_eco_friendly` boolean.

**Use real CDMX coordinates** (decimal degrees, longitude first):
- Coyoacán: ≈ `(-99.1632, 19.3496)`
- Roma Norte: ≈ `(-99.1628, 19.4148)`
- Condesa: ≈ `(-99.1740, 19.4131)`
- Del Valle: ≈ `(-99.1738, 19.3819)`
- Centro Histórico: ≈ `(-99.1332, 19.4326)`

Use `ON CONFLICT … DO NOTHING` so re-running is safe.

End with verification block:

```sql
-- ─── Verification ────────────────────────────────────────────────────────────
DO $$
BEGIN
  RAISE NOTICE 'Profiles:        %', (SELECT count(*) FROM public.profiles);
  RAISE NOTICE 'Categories:      %', (SELECT count(*) FROM public.categories);
  RAISE NOTICE 'Badges:          %', (SELECT count(*) FROM public.badges);
  RAISE NOTICE 'Businesses:      %', (SELECT count(*) FROM public.businesses);
  RAISE NOTICE 'Reviews:         %', (SELECT count(*) FROM public.reviews);
  RAISE NOTICE 'Visits:          %', (SELECT count(*) FROM public.visits);
  RAISE NOTICE 'Verifications:   %', (SELECT count(*) FROM public.verifications);
  RAISE NOTICE 'Business Badges: %', (SELECT count(*) FROM public.business_badges);
END $$;
```

Expected after seed:
| Table | Count |
|---|---|
| profiles | ≥ 7 |
| categories | 12 |
| badges | 5 |
| businesses | 10 |
| reviews | ≥ 14 |
| visits | ≥ 16 |
| verifications | ≥ 8 |

---

## 8. `database/README.md`

```markdown
# NeighborHub — Database Setup

## Execution order (Supabase SQL Editor)

1. `01_schema.sql`
2. `02_functions_and_triggers.sql`
3. `03_rls_policies.sql`
4. `04_views.sql`
5. `05_storage_buckets.sql`  (or create buckets in dashboard)
6. `06_seed_data.sql`

## Verify

Run after step 6:

\`\`\`sql
SELECT count(*) FROM public.businesses;          -- 10
SELECT count(*) FROM public.categories;          -- 12
SELECT * FROM public.find_nearby_businesses(
  ST_SetSRID(ST_MakePoint(-99.1632, 19.3496), 4326)::geography,
  5000, NULL, NULL, 10
);  -- should return businesses in Coyoacán
\`\`\`

## Reset

To wipe and re-run, run the files again. All `CREATE` statements use `IF NOT EXISTS`
or `OR REPLACE`; seed inserts use `ON CONFLICT DO NOTHING`.

To fully reset, drop the public schema and recreate:

\`\`\`sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres, anon, authenticated, service_role;
\`\`\`

Then re-run the 6 files.
```

---

## 9. ACCEPTANCE CRITERIA

- [ ] All 6 files exist in `/database/` and execute in order without errors.
- [ ] Verification block in file 6 prints expected counts.
- [ ] `find_nearby_businesses` returns ≤ `result_limit` rows ordered by distance.
- [ ] `auth.users` insert triggers profile creation.
- [ ] Inserting a 5th confirmed verification flips a pending business to active.
- [ ] All RLS policies enforce per Supabase Auth dashboard test.
- [ ] Both Storage buckets exist and accept uploads under `{user_id}/...` paths.
- [ ] No table or column is in Spanish.

---

**END OF DATABASE PROMPT**
