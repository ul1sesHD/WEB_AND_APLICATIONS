-- =============================================================================
-- NeighborHub — Seed Data
-- File order: 6 of 6
--
-- Idempotent: every INSERT uses ON CONFLICT DO NOTHING so this script is safe
-- to re-run. Stable UUIDs are used so that follow-up inserts can reference
-- each other deterministically.
--
-- All copy in English. Coordinates are real CDMX locations (lng, lat).
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ─── 1) Auth users (7) ───────────────────────────────────────────────────────
-- The `on_auth_user_created` trigger will populate `public.profiles` with
-- (id, name, role) extracted from raw_user_meta_data. We then UPDATE those
-- rows below to add location, neighborhood, avatar, etc.

INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token,
  email_change, email_change_token_new, recovery_token
) VALUES
  -- 1 admin
  ('00000000-0000-0000-0000-000000000000',
   '11111111-1111-1111-1111-111111111111',
   'authenticated', 'authenticated',
   'admin@neighborhub.local',
   crypt('admin12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Admin User","role":"admin"}',
   now(), now(), '', '', '', ''),

  -- 3 vendors
  ('00000000-0000-0000-0000-000000000000',
   '22222222-2222-2222-2222-222222222222',
   'authenticated', 'authenticated',
   'maria.tortilleria@neighborhub.local',
   crypt('vendor12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Maria Hernandez","role":"vendor"}',
   now(), now(), '', '', '', ''),

  ('00000000-0000-0000-0000-000000000000',
   '33333333-3333-3333-3333-333333333333',
   'authenticated', 'authenticated',
   'pedro.mecanico@neighborhub.local',
   crypt('vendor12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Pedro Ramirez","role":"vendor"}',
   now(), now(), '', '', '', ''),

  ('00000000-0000-0000-0000-000000000000',
   '44444444-4444-4444-4444-444444444444',
   'authenticated', 'authenticated',
   'lupita.fonda@neighborhub.local',
   crypt('vendor12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Guadalupe Sanchez","role":"vendor"}',
   now(), now(), '', '', '', ''),

  -- 3 consumers
  ('00000000-0000-0000-0000-000000000000',
   '66666666-6666-6666-6666-666666666666',
   'authenticated', 'authenticated',
   'ana.garcia@neighborhub.local',
   crypt('user12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Ana Garcia","role":"user"}',
   now(), now(), '', '', '', ''),

  ('00000000-0000-0000-0000-000000000000',
   '77777777-7777-7777-7777-777777777777',
   'authenticated', 'authenticated',
   'carlos.lopez@neighborhub.local',
   crypt('user12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Carlos Lopez","role":"user"}',
   now(), now(), '', '', '', ''),

  ('00000000-0000-0000-0000-000000000000',
   '88888888-8888-8888-8888-888888888888',
   'authenticated', 'authenticated',
   'sofia.martinez@neighborhub.local',
   crypt('user12345', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}',
   '{"name":"Sofia Martinez","role":"user"}',
   now(), now(), '', '', '', '')
ON CONFLICT (id) DO NOTHING;


-- ─── 2) Profile enrichment (location, neighborhood, avatar) ──────────────────
-- The trigger created stub rows; here we add the data the trigger doesn't know.

UPDATE public.profiles SET
  phone        = '+52 55 5555 0001',
  neighborhood = 'Roma Norte',
  city         = 'Mexico City',
  location     = ST_SetSRID(ST_MakePoint(-99.1628, 19.4148), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Admin'
WHERE id = '11111111-1111-1111-1111-111111111111';

UPDATE public.profiles SET
  phone        = '+52 55 5555 0002',
  neighborhood = 'Coyoacan',
  location     = ST_SetSRID(ST_MakePoint(-99.1632, 19.3496), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Maria'
WHERE id = '22222222-2222-2222-2222-222222222222';

UPDATE public.profiles SET
  phone        = '+52 55 5555 0003',
  neighborhood = 'Santa Maria La Ribera',
  location     = ST_SetSRID(ST_MakePoint(-99.1556, 19.4493), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Pedro'
WHERE id = '33333333-3333-3333-3333-333333333333';

UPDATE public.profiles SET
  phone        = '+52 55 5555 0004',
  neighborhood = 'Tlalpan',
  location     = ST_SetSRID(ST_MakePoint(-99.1668, 19.2913), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Lupita'
WHERE id = '44444444-4444-4444-4444-444444444444';

UPDATE public.profiles SET
  phone        = '+52 55 5555 0006',
  neighborhood = 'Condesa',
  location     = ST_SetSRID(ST_MakePoint(-99.1740, 19.4131), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Ana'
WHERE id = '66666666-6666-6666-6666-666666666666';

UPDATE public.profiles SET
  phone        = '+52 55 5555 0007',
  neighborhood = 'Del Valle',
  location     = ST_SetSRID(ST_MakePoint(-99.1738, 19.3819), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos'
WHERE id = '77777777-7777-7777-7777-777777777777';

UPDATE public.profiles SET
  phone        = '+52 55 5555 0008',
  neighborhood = 'Narvarte',
  location     = ST_SetSRID(ST_MakePoint(-99.1556, 19.3924), 4326)::geography,
  avatar_url   = 'https://api.dicebear.com/7.x/initials/svg?seed=Sofia'
WHERE id = '88888888-8888-8888-8888-888888888888';


-- ─── 3) Categories (12) ──────────────────────────────────────────────────────
INSERT INTO public.categories
  (id, name, description, icon, image_url, color_hex, group_name, display_order)
VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'tortillas',     'Tortillerias and corn products',         '🌽', '/categories/Tortillas.png',  '#F4C430', 'food',      1),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'fonda',         'Home-style restaurants and food stalls', '🥗', '/categories/Fonda.png',      '#C0392B', 'food',      2),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'verduleria',    'Greengrocers and produce vendors',       '🥦', '/categories/Grosery.png',    '#1A7A4A', 'food',      3),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'lacteos',       'Dairy and cheese shops',                 '🥛', '/categories/Dairy.png',      '#FFF8EE', 'food',      4),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'tianguis',      'Open-air weekly markets',                '🏪', '/categories/Tianguis.png',   '#E65100', 'food',      5),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'purificadora',  'Water purification stations',            '💧', '/categories/Purifying.png',  '#1565C0', 'services',  6),
  ('aaaaaaaa-0000-0000-0000-000000000007', 'mecanico',      'Auto repair workshops',                  '🔧', '/categories/Mechanic.png',   '#5D4037', 'services',  7),
  ('aaaaaaaa-0000-0000-0000-000000000008', 'herreria',      'Smithies and metalwork',                 '⚒️', '/categories/Smithy.png',     '#4A4A4A', 'services',  8),
  ('aaaaaaaa-0000-0000-0000-000000000009', 'sastreria',     'Tailoring and clothing repair',          '🧵', '/categories/Tailoring.png',  '#880E4F', 'services',  9),
  ('aaaaaaaa-0000-0000-0000-000000000010', 'paca',          'Second-hand clothing bazaars',           '👗', '/categories/Paca.png',       '#880E4F', 'circular', 10),
  ('aaaaaaaa-0000-0000-0000-000000000011', 'panaderia',     'Bakeries and pan dulce',                 '🍞', NULL,                          '#E65100', 'food',     11),
  ('aaaaaaaa-0000-0000-0000-000000000012', 'polleria',      'Poultry and rotisserie shops',           '🐔', NULL,                          '#C0392B', 'food',     12)
ON CONFLICT (id) DO NOTHING;


-- ─── 4) Badges (5) ───────────────────────────────────────────────────────────
INSERT INTO public.badges (id, type, name, description, icon, color_hex, criterion)
VALUES
  ('bbbbbbbb-0000-0000-0000-000000000001', 'community_verified', 'Community Verified', 'Confirmed by at least 5 neighbors',  '✅', '#1A7A4A', '5 or more confirmed verifications'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'top_rated',          'Top Rated',          'Rating average above 4.5 stars',     '⭐', '#F4C430', 'rating_avg >= 4.5 with at least 5 reviews'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'eco_friendly',       'Eco Friendly',       'Practices listed and self-declared', '🌿', '#1A7A4A', 'is_eco_friendly = TRUE'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'local_history',      'Local History',      '20 or more years in the neighborhood','🏛️','#880E4F', 'years_in_neighborhood >= 20'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'most_visited',       'Most Visited',       '50 or more recorded visits',          '🔥', '#E65100', 'total_visits >= 50')
ON CONFLICT (id) DO NOTHING;


-- ─── 5) Businesses (10) ──────────────────────────────────────────────────────
WITH default_hours AS (
  SELECT '{
    "monday":    {"open": "07:00", "close": "20:00"},
    "tuesday":   {"open": "07:00", "close": "20:00"},
    "wednesday": {"open": "07:00", "close": "20:00"},
    "thursday":  {"open": "07:00", "close": "20:00"},
    "friday":    {"open": "07:00", "close": "20:00"},
    "saturday":  {"open": "08:00", "close": "18:00"},
    "sunday":    {"closed": true}
  }'::jsonb AS hours
)
INSERT INTO public.businesses (
  id, owner_id, category_id,
  name, description, story, vendor_quote, vendor_name,
  phone, whatsapp, location, address, neighborhood, city, landmark,
  hours, years_in_neighborhood, photo_url, hero_photo_url,
  is_eco_friendly, eco_practices, status
) VALUES

  -- 1) Tortilleria Dona Maria — Coyoacan
  ('cccccccc-0000-0000-0000-000000000001',
   '22222222-2222-2222-2222-222222222222',
   'aaaaaaaa-0000-0000-0000-000000000001',
   'Tortilleria Dona Maria',
   'Hand-pressed nixtamal corn tortillas, made fresh every morning since 1985.',
   'Dona Maria opened this tortilleria the day her first grandchild was born. Three decades later, the same wood-fired comal still warms the neighborhood at dawn. Locals stop by not only for tortillas but for the gossip that travels faster than the steam.',
   'A good tortilla is patience and fire — nothing else.',
   'Maria Hernandez',
   '+52 55 5555 1001', '+52 55 5555 1001',
   ST_SetSRID(ST_MakePoint(-99.1632, 19.3496), 4326)::geography,
   'Av. Mexico 120, Coyoacan',
   'Coyoacan', 'Mexico City', 'Two blocks from the Coyoacan kiosk',
   (SELECT hours FROM default_hours), 39,
   '/photos/business-1.jpg', '/photos/business-1-hero.jpg',
   TRUE,
   'Local nixtamal corn, biodegradable paper wrapping, no plastic bags',
   'active'),

  -- 2) Fonda La Esquina — Roma Norte
  ('cccccccc-0000-0000-0000-000000000002',
   '44444444-4444-4444-4444-444444444444',
   'aaaaaaaa-0000-0000-0000-000000000002',
   'Fonda La Esquina',
   'Daily three-course menu cooked from scratch by Sra. Lupita and her two daughters.',
   'A staple of Roma Norte since 2002, Fonda La Esquina survived the earthquake, the pandemic, and three rent hikes. The dining room still holds the same eight tables, the same yellow walls, and the same recipe book hand-written by Lupitas mother.',
   'When the kitchen closes, the neighborhood goes quiet.',
   'Guadalupe Sanchez',
   '+52 55 5555 1002', '+52 55 5555 1002',
   ST_SetSRID(ST_MakePoint(-99.1628, 19.4148), 4326)::geography,
   'Calle Orizaba 45, Roma Norte',
   'Roma Norte', 'Mexico City', 'On the corner of Orizaba and Puebla',
   (SELECT hours FROM default_hours), 22,
   '/photos/business-2.jpg', '/photos/business-2-hero.jpg',
   TRUE,
   'Compostable containers, seasonal produce sourced from local tianguis',
   'active'),

  -- 3) Verduleria Don Memo — Del Valle
  ('cccccccc-0000-0000-0000-000000000003',
   '22222222-2222-2222-2222-222222222222',
   'aaaaaaaa-0000-0000-0000-000000000003',
   'Verduleria Don Memo',
   'Family-run produce shop with daily-fresh fruit and vegetables from Central de Abasto.',
   'Don Memo started selling tomatoes from a wheelbarrow in 1998. Today his shop occupies a corner of Del Valle and his daughter Gabi runs the second register. Customers know they can ask for half a chile or a single onion — no minimum.',
   'No plastic bag ever leaves my shop. Bring a basket, like grandma did.',
   'Guillermo Reyes',
   '+52 55 5555 1003', '+52 55 5555 1003',
   ST_SetSRID(ST_MakePoint(-99.1738, 19.3819), 4326)::geography,
   'Av. Universidad 850, Del Valle',
   'Del Valle', 'Mexico City', 'Across from Parque Hundido',
   (SELECT hours FROM default_hours), 27,
   '/photos/business-3.jpg', '/photos/business-3-hero.jpg',
   TRUE,
   'Zero plastic policy, compost program, reuses fruit crates',
   'active'),

  -- 4) Lacteos La Vaquita — Condesa
  ('cccccccc-0000-0000-0000-000000000004',
   '33333333-3333-3333-3333-333333333333',
   'aaaaaaaa-0000-0000-0000-000000000004',
   'Lacteos La Vaquita',
   'Artisanal cheeses, yogurt, and milk from small dairies in Estado de Mexico.',
   'A second-generation dairy shop run by Pedro and his cousin. The display case has rotated since 1991 but the queso panela is still cut by hand and weighed on the same brass scale.',
   'A piece of cheese tastes like the field it came from.',
   'Pedro Ramirez',
   '+52 55 5555 1004', '+52 55 5555 1004',
   ST_SetSRID(ST_MakePoint(-99.1740, 19.4131), 4326)::geography,
   'Av. Michoacan 88, Condesa',
   'Condesa', 'Mexico City', 'Half a block from Parque Mexico',
   (SELECT hours FROM default_hours), 33,
   '/photos/business-4.jpg', '/photos/business-4-hero.jpg',
   FALSE,
   NULL,
   'active'),

  -- 5) Tianguis del Domingo — Tlalpan
  ('cccccccc-0000-0000-0000-000000000005',
   '44444444-4444-4444-4444-444444444444',
   'aaaaaaaa-0000-0000-0000-000000000005',
   'Tianguis del Domingo',
   'Open-air market every Sunday with over 60 family vendors of food, clothes, and crafts.',
   'For thirty years, the streets of central Tlalpan have been blocked off every Sunday at 6 a.m. Vendors arrive in trucks, push carts, and on foot. By 9 a.m. you can buy anything from quesadillas to vintage radios.',
   'Sunday is when the neighborhood breathes together.',
   'Guadalupe Sanchez',
   '+52 55 5555 1005', '+52 55 5555 1005',
   ST_SetSRID(ST_MakePoint(-99.1668, 19.2913), 4326)::geography,
   'Calle Madero, Tlalpan Centro',
   'Tlalpan', 'Mexico City', 'Streets around the Tlalpan kiosk, Sundays only',
   '{
      "monday":    {"closed": true},
      "tuesday":   {"closed": true},
      "wednesday": {"closed": true},
      "thursday":  {"closed": true},
      "friday":    {"closed": true},
      "saturday":  {"closed": true},
      "sunday":    {"open": "06:00", "close": "16:00"}
    }'::jsonb,
   30,
   '/photos/business-5.jpg', '/photos/business-5-hero.jpg',
   TRUE,
   'Walking-only market, reusable canvas bags promoted, food waste donated to a shelter',
   'active'),

  -- 6) Purificadora El Manantial — Narvarte
  ('cccccccc-0000-0000-0000-000000000006',
   '33333333-3333-3333-3333-333333333333',
   'aaaaaaaa-0000-0000-0000-000000000006',
   'Purificadora El Manantial',
   '20 L water refill station with bring-your-own-bottle discount.',
   'Opened during the 2017 water shortage as a bet that neighbors would refill instead of buy. Six years later it still beats the price of bottled brands and saves an estimated 12,000 plastic jugs per year.',
   'We sell water, but we save plastic.',
   'Pedro Ramirez',
   '+52 55 5555 1006', '+52 55 5555 1006',
   ST_SetSRID(ST_MakePoint(-99.1556, 19.3924), 4326)::geography,
   'Diagonal San Antonio 200, Narvarte',
   'Narvarte', 'Mexico City', 'Next to the Narvarte metro exit',
   (SELECT hours FROM default_hours), 8,
   '/photos/business-6.jpg', '/photos/business-6-hero.jpg',
   TRUE,
   '5 percent discount when you bring your own jug, jugs sanitized with steam',
   'active'),

  -- 7) Taller Mecanico Pedro — Santa Maria La Ribera
  ('cccccccc-0000-0000-0000-000000000007',
   '33333333-3333-3333-3333-333333333333',
   'aaaaaaaa-0000-0000-0000-000000000007',
   'Taller Mecanico Pedro',
   'General auto repair, tune-ups, and brake service. Honest pricing.',
   'Pedro inherited the shop from his uncle in 2005 and kept the same fair-price rule: no surprise charges, written quote before any work. The shop is small, the regulars are loyal.',
   'I would rather lose a job than lose a regular.',
   'Pedro Ramirez',
   '+52 55 5555 1007', '+52 55 5555 1007',
   ST_SetSRID(ST_MakePoint(-99.1556, 19.4493), 4326)::geography,
   'Calle Naranjo 14, Santa Maria La Ribera',
   'Santa Maria La Ribera', 'Mexico City', 'Two blocks from the Kiosko Morisco',
   '{
      "monday":    {"open": "08:00", "close": "19:00"},
      "tuesday":   {"open": "08:00", "close": "19:00"},
      "wednesday": {"open": "08:00", "close": "19:00"},
      "thursday":  {"open": "08:00", "close": "19:00"},
      "friday":    {"open": "08:00", "close": "19:00"},
      "saturday":  {"open": "08:00", "close": "14:00"},
      "sunday":    {"closed": true}
    }'::jsonb,
   19,
   '/photos/business-7.jpg', '/photos/business-7-hero.jpg',
   FALSE,
   NULL,
   'active'),

  -- 8) Herreria Hermanos Lopez — San Rafael
  ('cccccccc-0000-0000-0000-000000000008',
   '22222222-2222-2222-2222-222222222222',
   'aaaaaaaa-0000-0000-0000-000000000008',
   'Herreria Hermanos Lopez',
   'Custom iron gates, window grilles, and decorative metalwork.',
   'Three brothers, one forge, four decades. The Lopez workshop has fitted half the gates of San Rafael since 1984. The youngest brother does the welding while the eldest sketches by hand on butcher paper.',
   'Steel remembers the hands that shaped it.',
   'Maria Hernandez',
   '+52 55 5555 1008', '+52 55 5555 1008',
   ST_SetSRID(ST_MakePoint(-99.1622, 19.4400), 4326)::geography,
   'Calle Antonio Caso 65, San Rafael',
   'San Rafael', 'Mexico City', 'Across the street from the church of San Cosme',
   '{
      "monday":    {"open": "09:00", "close": "18:00"},
      "tuesday":   {"open": "09:00", "close": "18:00"},
      "wednesday": {"open": "09:00", "close": "18:00"},
      "thursday":  {"open": "09:00", "close": "18:00"},
      "friday":    {"open": "09:00", "close": "18:00"},
      "saturday":  {"open": "09:00", "close": "13:00"},
      "sunday":    {"closed": true}
    }'::jsonb,
   40,
   '/photos/business-8.jpg', '/photos/business-8-hero.jpg',
   FALSE,
   NULL,
   'pending'),

  -- 9) Sastreria Don Pancho — Centro Historico
  ('cccccccc-0000-0000-0000-000000000009',
   '44444444-4444-4444-4444-444444444444',
   'aaaaaaaa-0000-0000-0000-000000000009',
   'Sastreria Don Pancho',
   'Suit alterations, repairs, and made-to-measure shirts since 1972.',
   'Don Panchos shop has outlasted four governments and the closure of three nearby tailors. The single sewing machine, oiled every morning, is older than most of his customers.',
   'A garment well repaired is a vote against waste.',
   'Guadalupe Sanchez',
   '+52 55 5555 1009', '+52 55 5555 1009',
   ST_SetSRID(ST_MakePoint(-99.1332, 19.4326), 4326)::geography,
   'Calle Republica de Cuba 33, Centro Historico',
   'Centro Historico', 'Mexico City', 'A block from the Plaza Garibaldi',
   '{
      "monday":    {"open": "10:00", "close": "19:00"},
      "tuesday":   {"open": "10:00", "close": "19:00"},
      "wednesday": {"open": "10:00", "close": "19:00"},
      "thursday":  {"open": "10:00", "close": "19:00"},
      "friday":    {"open": "10:00", "close": "19:00"},
      "saturday":  {"open": "10:00", "close": "15:00"},
      "sunday":    {"closed": true}
    }'::jsonb,
   52,
   '/photos/business-9.jpg', '/photos/business-9-hero.jpg',
   TRUE,
   'Repair-first service, fabric scraps donated to a textile cooperative',
   'active'),

  -- 10) Paca de Coyoacan — Coyoacan
  ('cccccccc-0000-0000-0000-000000000010',
   '22222222-2222-2222-2222-222222222222',
   'aaaaaaaa-0000-0000-0000-000000000010',
   'Paca de Coyoacan',
   'Curated second-hand clothing, vintage jackets, denim by the kilo.',
   'A circular fashion bazaar that opened in 2018 in a former garage. Every piece is washed and mended in-house. The pricing is by weight: vintage denim, one kilo, one fair price.',
   'Wearing it again is the most radical thing you can do.',
   'Maria Hernandez',
   '+52 55 5555 1010', '+52 55 5555 1010',
   ST_SetSRID(ST_MakePoint(-99.1610, 19.3520), 4326)::geography,
   'Calle Higuera 30, Coyoacan',
   'Coyoacan', 'Mexico City', 'Three blocks from the Coyoacan market',
   '{
      "monday":    {"closed": true},
      "tuesday":   {"open": "11:00", "close": "20:00"},
      "wednesday": {"open": "11:00", "close": "20:00"},
      "thursday":  {"open": "11:00", "close": "20:00"},
      "friday":    {"open": "11:00", "close": "21:00"},
      "saturday":  {"open": "10:00", "close": "21:00"},
      "sunday":    {"open": "11:00", "close": "18:00"}
    }'::jsonb,
   6,
   '/photos/business-10.jpg', '/photos/business-10-hero.jpg',
   TRUE,
   'Repaired and washed in-house, no fast fashion accepted',
   'pending')
ON CONFLICT (id) DO NOTHING;


-- ─── 6) Reviews (14) ─────────────────────────────────────────────────────────
INSERT INTO public.reviews (id, business_id, author_id, rating, comment) VALUES
  ('dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 5, 'The tortillas are still warm by the time I get home. Best in the area.'),
  ('dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777', 5, 'Real nixtamal. You can taste the difference instantly.'),
  ('dddddddd-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000001', '88888888-8888-8888-8888-888888888888', 4, 'Excellent quality, sometimes a long line on weekends.'),
  ('dddddddd-0000-0000-0000-000000000004', 'cccccccc-0000-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', 5, 'The mole is the same recipe my grandmother used. Beautiful.'),
  ('dddddddd-0000-0000-0000-000000000005', 'cccccccc-0000-0000-0000-000000000002', '88888888-8888-8888-8888-888888888888', 5, 'Cheap, generous, made with care. My weekly fix.'),
  ('dddddddd-0000-0000-0000-000000000006', 'cccccccc-0000-0000-0000-000000000003', '77777777-7777-7777-7777-777777777777', 5, 'Don Memo always has the freshest tomatoes. He even remembers my dog.'),
  ('dddddddd-0000-0000-0000-000000000007', 'cccccccc-0000-0000-0000-000000000003', '88888888-8888-8888-8888-888888888888', 4, 'Great prices, would love a wider variety of herbs.'),
  ('dddddddd-0000-0000-0000-000000000008', 'cccccccc-0000-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 4, 'The queso panela is excellent. Wish they took card.'),
  ('dddddddd-0000-0000-0000-000000000009', 'cccccccc-0000-0000-0000-000000000005', '77777777-7777-7777-7777-777777777777', 5, 'Sundays are not Sundays without this tianguis.'),
  ('dddddddd-0000-0000-0000-000000000010', 'cccccccc-0000-0000-0000-000000000005', '88888888-8888-8888-8888-888888888888', 5, 'Overwhelming variety. Bring a big bag.'),
  ('dddddddd-0000-0000-0000-000000000011', 'cccccccc-0000-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 5, 'Cheaper than bottled water and zero plastic. No-brainer.'),
  ('dddddddd-0000-0000-0000-000000000012', 'cccccccc-0000-0000-0000-000000000007', '77777777-7777-7777-7777-777777777777', 5, 'Pedro fixed my brakes for half what the dealer asked. Honest work.'),
  ('dddddddd-0000-0000-0000-000000000013', 'cccccccc-0000-0000-0000-000000000009', '66666666-6666-6666-6666-666666666666', 5, 'Don Pancho saved my favorite jacket. Old-school craftsmanship.'),
  ('dddddddd-0000-0000-0000-000000000014', 'cccccccc-0000-0000-0000-000000000010', '88888888-8888-8888-8888-888888888888', 5, 'Found the best vintage denim of my life. Reasonable per-kilo pricing.')
ON CONFLICT (business_id, author_id) DO NOTHING;


-- ─── 7) Visits (16) ──────────────────────────────────────────────────────────
INSERT INTO public.visits (id, business_id, visitor_id, km_distance, co2_saved_kg, reported_spending, mode) VALUES
  ('eeeeeeee-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 0.800, public.calculate_co2(0.800),  45.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777', 1.200, public.calculate_co2(1.200),  60.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000001', '88888888-8888-8888-8888-888888888888', 0.500, public.calculate_co2(0.500),  35.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000004', 'cccccccc-0000-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', 0.350, public.calculate_co2(0.350), 120.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000005', 'cccccccc-0000-0000-0000-000000000002', '88888888-8888-8888-8888-888888888888', 1.500, public.calculate_co2(1.500),  90.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000006', 'cccccccc-0000-0000-0000-000000000003', '77777777-7777-7777-7777-777777777777', 0.450, public.calculate_co2(0.450), 180.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000007', 'cccccccc-0000-0000-0000-000000000003', '88888888-8888-8888-8888-888888888888', 2.300, public.calculate_co2(2.300), 220.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000008', 'cccccccc-0000-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 0.250, public.calculate_co2(0.250),  85.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000009', 'cccccccc-0000-0000-0000-000000000005', '77777777-7777-7777-7777-777777777777', 4.800, public.calculate_co2(4.800), 150.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000010', 'cccccccc-0000-0000-0000-000000000005', '88888888-8888-8888-8888-888888888888', 5.500, public.calculate_co2(5.500), 200.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000011', 'cccccccc-0000-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 1.800, public.calculate_co2(1.800),  35.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000012', 'cccccccc-0000-0000-0000-000000000007', '77777777-7777-7777-7777-777777777777', 2.100, public.calculate_co2(2.100), 950.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000013', 'cccccccc-0000-0000-0000-000000000009', '66666666-6666-6666-6666-666666666666', 3.700, public.calculate_co2(3.700), 250.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000014', 'cccccccc-0000-0000-0000-000000000010', '88888888-8888-8888-8888-888888888888', 1.100, public.calculate_co2(1.100), 320.00, 'manual'),
  ('eeeeeeee-0000-0000-0000-000000000015', 'cccccccc-0000-0000-0000-000000000010', '66666666-6666-6666-6666-666666666666', 1.300, public.calculate_co2(1.300), 180.00, 'gps'),
  ('eeeeeeee-0000-0000-0000-000000000016', 'cccccccc-0000-0000-0000-000000000007', '88888888-8888-8888-8888-888888888888', 4.200, public.calculate_co2(4.200), 420.00, 'manual')
ON CONFLICT (id) DO NOTHING;


-- ─── 8) Verifications (8) ────────────────────────────────────────────────────
-- Distributed across pending businesses (8, 10) and a few active ones.
INSERT INTO public.verifications (id, business_id, verifier_id, confirms, note) VALUES
  ('ffffffff-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000008', '66666666-6666-6666-6666-666666666666', TRUE, 'I have used their gates for years.'),
  ('ffffffff-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000008', '77777777-7777-7777-7777-777777777777', TRUE, 'Real shop, well-known on the block.'),
  ('ffffffff-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000010', '66666666-6666-6666-6666-666666666666', TRUE, 'Visited multiple times, legit.'),
  ('ffffffff-0000-0000-0000-000000000004', 'cccccccc-0000-0000-0000-000000000010', '77777777-7777-7777-7777-777777777777', TRUE, 'Confirmed, great curation.'),
  ('ffffffff-0000-0000-0000-000000000005', 'cccccccc-0000-0000-0000-000000000010', '88888888-8888-8888-8888-888888888888', TRUE, 'Confirmed, ethically sourced.'),
  ('ffffffff-0000-0000-0000-000000000006', 'cccccccc-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', TRUE, 'Daily customer, the place is real.'),
  ('ffffffff-0000-0000-0000-000000000007', 'cccccccc-0000-0000-0000-000000000005', '77777777-7777-7777-7777-777777777777', TRUE, 'Tianguis runs every Sunday like clockwork.'),
  ('ffffffff-0000-0000-0000-000000000008', 'cccccccc-0000-0000-0000-000000000006', '88888888-8888-8888-8888-888888888888', TRUE, 'I refill here every two weeks.')
ON CONFLICT (business_id, verifier_id) DO NOTHING;


-- ─── 9) Business badges ──────────────────────────────────────────────────────
-- Granted by criteria. Manual grants for seed; in production, a job grants them.
INSERT INTO public.business_badges (business_id, badge_type) VALUES
  ('cccccccc-0000-0000-0000-000000000001', 'top_rated'),
  ('cccccccc-0000-0000-0000-000000000001', 'eco_friendly'),
  ('cccccccc-0000-0000-0000-000000000001', 'local_history'),
  ('cccccccc-0000-0000-0000-000000000002', 'top_rated'),
  ('cccccccc-0000-0000-0000-000000000002', 'eco_friendly'),
  ('cccccccc-0000-0000-0000-000000000002', 'local_history'),
  ('cccccccc-0000-0000-0000-000000000003', 'eco_friendly'),
  ('cccccccc-0000-0000-0000-000000000003', 'local_history'),
  ('cccccccc-0000-0000-0000-000000000005', 'eco_friendly'),
  ('cccccccc-0000-0000-0000-000000000005', 'local_history'),
  ('cccccccc-0000-0000-0000-000000000006', 'eco_friendly'),
  ('cccccccc-0000-0000-0000-000000000008', 'local_history'),
  ('cccccccc-0000-0000-0000-000000000009', 'eco_friendly'),
  ('cccccccc-0000-0000-0000-000000000009', 'local_history'),
  ('cccccccc-0000-0000-0000-000000000010', 'eco_friendly')
ON CONFLICT (business_id, badge_type) DO NOTHING;


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
