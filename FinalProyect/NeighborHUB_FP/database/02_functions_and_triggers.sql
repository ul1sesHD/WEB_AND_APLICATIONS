-- =============================================================================
-- NeighborHub — Functions & Triggers
-- File order: 2 of 6
-- =============================================================================

-- ─── Utility functions ───────────────────────────────────────────────────────

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


-- ─── RPC: find_nearby_businesses ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.find_nearby_businesses(
  user_location   GEOGRAPHY,
  radius_meters   INTEGER DEFAULT 5000,
  category_filter UUID    DEFAULT NULL,
  search_query    TEXT    DEFAULT NULL,
  result_limit    INTEGER DEFAULT 50
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
    c.name      AS category_name,
    c.icon      AS category_icon,
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
    AND (search_query   IS NULL OR b.name ILIKE '%' || search_query || '%')
  ORDER BY ST_Distance(b.location, user_location) ASC
  LIMIT result_limit;
$$;


-- ─── Counter triggers ────────────────────────────────────────────────────────

-- Recalculate rating_avg + total_reviews on review change
CREATE OR REPLACE FUNCTION public.recalculate_business_rating()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  target_business_id UUID := COALESCE(NEW.business_id, OLD.business_id);
BEGIN
  UPDATE public.businesses b
  SET
    rating_avg    = COALESCE(
      (SELECT ROUND(AVG(rating)::numeric, 2)
         FROM public.reviews
        WHERE business_id = target_business_id AND active = TRUE),
      0
    ),
    total_reviews = (
      SELECT COUNT(*)
        FROM public.reviews
       WHERE business_id = target_business_id AND active = TRUE
    )
  WHERE b.id = target_business_id;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_recalculate_rating ON public.reviews;
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

DROP TRIGGER IF EXISTS trg_increment_visits ON public.visits;
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

DROP TRIGGER IF EXISTS trg_recalculate_verifications ON public.verifications;
CREATE TRIGGER trg_recalculate_verifications
AFTER INSERT OR DELETE ON public.verifications
FOR EACH ROW EXECUTE FUNCTION public.recalculate_business_verifications();


-- ─── Auto-create profile on signup ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─── updated_at triggers ─────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_businesses_updated_at ON public.businesses;
CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_reviews_updated_at ON public.reviews;
CREATE TRIGGER trg_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
