-- =============================================================================
-- NeighborHub — Reporting Views
-- File order: 4 of 6
-- =============================================================================

-- ─── v_business_directory ────────────────────────────────────────────────────
-- Businesses + category + owner + badges (JSON aggregated)
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
  b.website,
  b.address,
  b.neighborhood,
  b.city,
  b.landmark,
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
  b.created_at,
  b.updated_at,
  c.id         AS category_id,
  c.name       AS category_name,
  c.icon       AS category_icon,
  c.image_url  AS category_image_url,
  c.color_hex  AS category_color,
  c.group_name AS category_group,
  p.id         AS owner_profile_id,
  p.name       AS owner_name,
  p.avatar_url AS owner_avatar_url,
  COALESCE(
    (SELECT json_agg(json_build_object(
       'type',  bb.badge_type,
       'name',  bg.name,
       'icon',  bg.icon,
       'color', bg.color_hex
     ))
       FROM public.business_badges bb
       JOIN public.badges          bg ON bg.type = bb.badge_type
      WHERE bb.business_id = b.id),
    '[]'::json
  ) AS badges
FROM public.businesses b
JOIN public.categories c ON c.id = b.category_id
JOIN public.profiles   p ON p.id = b.owner_id
WHERE b.deleted_at IS NULL;


-- ─── v_user_impact ───────────────────────────────────────────────────────────
-- Aggregate sustainability metrics per user
CREATE OR REPLACE VIEW public.v_user_impact AS
SELECT
  p.id   AS user_id,
  p.name,
  COUNT(v.id)                            AS total_visits,
  COALESCE(SUM(v.km_distance), 0)        AS total_km_saved,
  COALESCE(SUM(v.co2_saved_kg), 0)       AS total_co2_saved_kg,
  COALESCE(SUM(v.reported_spending), 0)  AS total_local_spending,
  COUNT(DISTINCT v.business_id)          AS unique_businesses_visited,
  COUNT(DISTINCT DATE(v.created_at))     AS active_days,
  MIN(v.created_at)                      AS first_visit_at,
  MAX(v.created_at)                      AS last_visit_at
FROM public.profiles p
LEFT JOIN public.visits v ON v.visitor_id = p.id
WHERE p.deleted_at IS NULL
GROUP BY p.id, p.name;


-- ─── v_admin_pending ─────────────────────────────────────────────────────────
-- Businesses awaiting moderation
CREATE OR REPLACE VIEW public.v_admin_pending AS
SELECT
  b.id,
  b.name,
  b.created_at,
  b.total_verifications,
  b.status,
  c.name AS category_name,
  p.id   AS owner_id,
  p.name AS owner_name
FROM public.businesses b
JOIN public.categories c ON c.id = b.category_id
JOIN public.profiles   p ON p.id = b.owner_id
WHERE b.status = 'pending'
  AND b.deleted_at IS NULL
ORDER BY b.created_at ASC;
