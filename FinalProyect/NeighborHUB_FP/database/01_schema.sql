-- =============================================================================
-- NeighborHub — Schema Definition
-- Database: Supabase (PostgreSQL 15+)
-- File order: 1 of 6
-- =============================================================================

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS postgis;        -- Geographic queries
CREATE EXTENSION IF NOT EXISTS pg_trgm;        -- Fuzzy text search
CREATE EXTENSION IF NOT EXISTS unaccent;       -- Accent-insensitive search
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- UUID generation


-- ─── ENUM types ──────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'vendor', 'admin');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'business_status') THEN
    CREATE TYPE business_status AS ENUM ('active', 'pending', 'suspended', 'inactive');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'badge_type') THEN
    CREATE TYPE badge_type AS ENUM (
      'community_verified',
      'top_rated',
      'eco_friendly',
      'local_history',
      'most_visited'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'visit_mode') THEN
    CREATE TYPE visit_mode AS ENUM ('manual', 'gps');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_group') THEN
    CREATE TYPE category_group AS ENUM ('food', 'services', 'circular');
  END IF;
END $$;


-- ─── Table: profiles ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(20),
  role          user_role NOT NULL DEFAULT 'user',
  location      GEOGRAPHY(POINT, 4326),
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


-- ─── Table: categories ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(100) NOT NULL UNIQUE,
  description   TEXT,
  icon          VARCHAR(10),
  image_url     TEXT,
  color_hex     VARCHAR(7) NOT NULL,
  group_name    category_group NOT NULL,
  display_order SMALLINT NOT NULL DEFAULT 0,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT color_hex_format CHECK (color_hex ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE INDEX IF NOT EXISTS idx_categories_active ON public.categories(active, display_order);

COMMENT ON TABLE public.categories IS 'Business categories with metal-plate icon assets.';


-- ─── Table: badges ───────────────────────────────────────────────────────────
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

COMMENT ON TABLE public.badges IS 'Reputation badges granted to businesses.';


-- ─── Table: businesses ───────────────────────────────────────────────────────
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

COMMENT ON TABLE public.businesses IS 'Hyperlocal businesses; counters maintained by triggers.';


-- ─── Table: reviews ──────────────────────────────────────────────────────────
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


-- ─── Table: visits ───────────────────────────────────────────────────────────
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
  CONSTRAINT km_non_negative       CHECK (km_distance >= 0),
  CONSTRAINT co2_non_negative      CHECK (co2_saved_kg >= 0),
  CONSTRAINT spending_non_negative CHECK (reported_spending IS NULL OR reported_spending >= 0)
);

CREATE INDEX IF NOT EXISTS idx_visits_business ON public.visits(business_id);
CREATE INDEX IF NOT EXISTS idx_visits_visitor  ON public.visits(visitor_id, created_at DESC);


-- ─── Table: verifications ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.verifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  verifier_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  confirms    BOOLEAN NOT NULL DEFAULT TRUE,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT note_max_300 CHECK (note IS NULL OR length(note) <= 300),
  UNIQUE (business_id, verifier_id)
);

CREATE INDEX IF NOT EXISTS idx_verifications_business ON public.verifications(business_id);


-- ─── Table: business_badges ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.business_badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  badge_type  badge_type NOT NULL REFERENCES public.badges(type) ON DELETE CASCADE,
  granted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business_id, badge_type)
);

CREATE INDEX IF NOT EXISTS idx_business_badges_business ON public.business_badges(business_id);
