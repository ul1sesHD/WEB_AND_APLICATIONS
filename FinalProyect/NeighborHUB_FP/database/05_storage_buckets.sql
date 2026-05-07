-- =============================================================================
-- NeighborHub — Storage Buckets
-- File order: 5 of 6
-- Note: bucket creation via SQL requires Supabase storage. If your project
-- restricts SQL access to storage, create the buckets in the dashboard with
-- the exact same names, then run only the policies block below.
-- Folder convention for both buckets: {user_id}/{filename}
-- =============================================================================

-- ─── Buckets ─────────────────────────────────────────────────────────────────

-- avatars: public read, 2 MB max, png / jpeg / webp
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  TRUE,
  2097152,
  ARRAY['image/png','image/jpeg','image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- business-photos: public read, 5 MB max, png / jpeg / webp
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-photos',
  'business-photos',
  TRUE,
  5242880,
  ARRAY['image/png','image/jpeg','image/webp']
)
ON CONFLICT (id) DO NOTHING;


-- ─── Policies: avatars ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "avatars_public_read"   ON storage.objects;
DROP POLICY IF EXISTS "avatars_owner_write"   ON storage.objects;
DROP POLICY IF EXISTS "avatars_owner_update"  ON storage.objects;
DROP POLICY IF EXISTS "avatars_owner_delete"  ON storage.objects;

CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_owner_write"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_owner_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_owner_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );


-- ─── Policies: business-photos ───────────────────────────────────────────────
DROP POLICY IF EXISTS "business_photos_public_read"            ON storage.objects;
DROP POLICY IF EXISTS "business_photos_authenticated_write"    ON storage.objects;
DROP POLICY IF EXISTS "business_photos_owner_update"           ON storage.objects;
DROP POLICY IF EXISTS "business_photos_owner_delete"           ON storage.objects;

CREATE POLICY "business_photos_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'business-photos');

CREATE POLICY "business_photos_authenticated_write"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'business-photos'
    AND auth.role() = 'authenticated'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "business_photos_owner_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'business-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "business_photos_owner_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'business-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
