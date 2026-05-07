# NeighborHub — Database Setup

Supabase (PostgreSQL 15+) schema for the NeighborHub platform.
All tables, columns, and copy are in **English**.

## Execution order (Supabase SQL Editor)

Run each file once, in this order:

1. `01_schema.sql` — extensions, enums, tables, indexes
2. `02_functions_and_triggers.sql` — utility functions, RPCs, ACID triggers
3. `03_rls_policies.sql` — row-level security and the `is_admin()` helper
4. `04_views.sql` — `v_business_directory`, `v_user_impact`, `v_admin_pending`
5. `05_storage_buckets.sql` — `avatars` + `business-photos` buckets and policies
6. `06_seed_data.sql` — 7 users, 12 categories, 5 badges, 10 businesses, 14 reviews, 16 visits, 8 verifications

Every script is idempotent (`CREATE … IF NOT EXISTS`, `OR REPLACE`, `ON CONFLICT DO NOTHING`), so re-running any file is safe.

> If your Supabase project blocks SQL access to the `storage` schema, create the two buckets in the Storage dashboard (same names: `avatars`, `business-photos`) and then run only the policy block of `05_storage_buckets.sql`.

## Verify

After step 6, the `DO $$ … $$` block at the end of `06_seed_data.sql` prints the row counts. You can also run:

```sql
-- Counts should match: 12 categories, 10 businesses, 5 badges
SELECT count(*) FROM public.businesses;          -- 10
SELECT count(*) FROM public.categories;          -- 12
SELECT count(*) FROM public.badges;              -- 5

-- Triggers populated counters correctly
SELECT name, rating_avg, total_reviews, total_visits, total_verifications
FROM public.businesses
ORDER BY name;

-- Spatial RPC works (search around Coyoacan)
SELECT id, name, distance_meters
FROM public.find_nearby_businesses(
  ST_SetSRID(ST_MakePoint(-99.1632, 19.3496), 4326)::geography,
  5000, NULL, NULL, 10
);
```

## Auto-activation rule

A business with `status = 'pending'` flips to `'active'` automatically once it accumulates **5 confirmed verifications**. The seed grants only 3 verifications to `cccccccc-0000-0000-0000-000000000010` so it stays pending — add two more rows to `verifications` to see the trigger fire.

## Reset

To wipe and reapply, re-run the six files (idempotent inserts will be no-ops).

To fully reset the public schema:

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres, anon, authenticated, service_role;
```

Then re-run files 1 through 6 in order.

## Storage folder convention

Both buckets enforce ownership via path. Uploads must be written under `{user_id}/{filename}`, e.g.:

```
avatars/22222222-2222-2222-2222-222222222222/avatar.jpg
business-photos/22222222-2222-2222-2222-222222222222/tortilleria-hero.jpg
```

The RLS policies in `05_storage_buckets.sql` require `auth.uid()::text = (storage.foldername(name))[1]` for write/update/delete.

## Seed users

| Email | Password | Role |
|---|---|---|
| admin@neighborhub.local | admin12345 | admin |
| maria.tortilleria@neighborhub.local | vendor12345 | vendor |
| pedro.mecanico@neighborhub.local | vendor12345 | vendor |
| lupita.fonda@neighborhub.local | vendor12345 | vendor |
| ana.garcia@neighborhub.local | user12345 | user |
| carlos.lopez@neighborhub.local | user12345 | user |
| sofia.martinez@neighborhub.local | user12345 | user |

Seed credentials are for local development only — rotate or remove before any public deployment.
