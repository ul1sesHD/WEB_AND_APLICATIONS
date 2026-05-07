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


-- ─── Helper: is current user admin? ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND deleted_at IS NULL
  );
$$;


-- ─── profiles ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "profiles_select_public" ON public.profiles;
CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT
  USING (active = TRUE AND deleted_at IS NULL);

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL
  USING (public.is_admin());


-- ─── categories (read-only public, admin writes) ─────────────────────────────
DROP POLICY IF EXISTS "categories_select_active" ON public.categories;
CREATE POLICY "categories_select_active"
  ON public.categories FOR SELECT
  USING (active = TRUE);

DROP POLICY IF EXISTS "categories_admin_all" ON public.categories;
CREATE POLICY "categories_admin_all"
  ON public.categories FOR ALL
  USING (public.is_admin());


-- ─── badges (read-only public) ───────────────────────────────────────────────
DROP POLICY IF EXISTS "badges_select_all" ON public.badges;
CREATE POLICY "badges_select_all"
  ON public.badges FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "badges_admin_all" ON public.badges;
CREATE POLICY "badges_admin_all"
  ON public.badges FOR ALL
  USING (public.is_admin());


-- ─── businesses ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "businesses_select_visible" ON public.businesses;
CREATE POLICY "businesses_select_visible"
  ON public.businesses FOR SELECT
  USING (deleted_at IS NULL AND status IN ('active', 'pending'));

DROP POLICY IF EXISTS "businesses_insert_own" ON public.businesses;
CREATE POLICY "businesses_insert_own"
  ON public.businesses FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "businesses_update_own" ON public.businesses;
CREATE POLICY "businesses_update_own"
  ON public.businesses FOR UPDATE
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "businesses_delete_own" ON public.businesses;
CREATE POLICY "businesses_delete_own"
  ON public.businesses FOR DELETE
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "businesses_admin_all" ON public.businesses;
CREATE POLICY "businesses_admin_all"
  ON public.businesses FOR ALL
  USING (public.is_admin());


-- ─── reviews ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "reviews_select_active" ON public.reviews;
CREATE POLICY "reviews_select_active"
  ON public.reviews FOR SELECT
  USING (active = TRUE);

DROP POLICY IF EXISTS "reviews_insert_own" ON public.reviews;
CREATE POLICY "reviews_insert_own"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "reviews_update_own" ON public.reviews;
CREATE POLICY "reviews_update_own"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "reviews_admin_all" ON public.reviews;
CREATE POLICY "reviews_admin_all"
  ON public.reviews FOR ALL
  USING (public.is_admin());


-- ─── visits ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "visits_select_own" ON public.visits;
CREATE POLICY "visits_select_own"
  ON public.visits FOR SELECT
  USING (auth.uid() = visitor_id);

DROP POLICY IF EXISTS "visits_insert_own" ON public.visits;
CREATE POLICY "visits_insert_own"
  ON public.visits FOR INSERT
  WITH CHECK (auth.uid() = visitor_id);

DROP POLICY IF EXISTS "visits_admin_all" ON public.visits;
CREATE POLICY "visits_admin_all"
  ON public.visits FOR ALL
  USING (public.is_admin());


-- ─── verifications ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "verifications_select_all" ON public.verifications;
CREATE POLICY "verifications_select_all"
  ON public.verifications FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "verifications_insert_own" ON public.verifications;
CREATE POLICY "verifications_insert_own"
  ON public.verifications FOR INSERT
  WITH CHECK (auth.uid() = verifier_id);

DROP POLICY IF EXISTS "verifications_admin_all" ON public.verifications;
CREATE POLICY "verifications_admin_all"
  ON public.verifications FOR ALL
  USING (public.is_admin());


-- ─── business_badges (read-only public, system-managed) ──────────────────────
DROP POLICY IF EXISTS "business_badges_select_all" ON public.business_badges;
CREATE POLICY "business_badges_select_all"
  ON public.business_badges FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "business_badges_admin_all" ON public.business_badges;
CREATE POLICY "business_badges_admin_all"
  ON public.business_badges FOR ALL
  USING (public.is_admin());
