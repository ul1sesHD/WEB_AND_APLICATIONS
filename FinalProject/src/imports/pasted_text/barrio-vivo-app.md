You are a senior full-stack developer and UI/UX designer specializing in 
React + Spring Boot applications with deep knowledge of Mexican visual culture.

Build the complete BARRIO VIVO web application — a hyper-local neighborhood 
commerce directory for Mexican markets (tianguis, fonditas, cremerias, bazares 
de segunda mano, servicios locales). This is NOT an e-commerce app. It is a 
community directory with map, ratings, storytelling, and environmental impact 
metrics.

═══════════════════════════════════════════
VISUAL IDENTITY — ESTILO RÓTULO MEXICANO
═══════════════════════════════════════════

The entire UI must feel like walking into a Mexican tianguis. 
Inspired by: hand-painted letreros, market price signs ("$15.00 KILO"), 
colorful toldos (awnings), plastic market crates in red/blue/yellow/green, 
fondita tablecloths, Coca-Cola plastic chairs, illustrated cartoon mascots 
on carnitas signs, stacked fruit displays, bold hand-lettered typography 
on storefront walls.

FONTS (load from Google Fonts):
- Display / Headings: "Bebas Neue" — all section titles, business names, 
  labels, nav items, CTA buttons. UPPERCASE, letter-spacing 0.04–0.12em.
- Body / UI text: "Nunito" weight 700–800 — readable, friendly, bold.
- Testimonials / Quotes: "Playfair Display" italic — vendor stories, 
  community quotes.

COLOR PALETTE (exact hex values):
- --rojo-toldo: #C0392B (primary CTA, nav bar, active states, brand)
- --rojo-pale: #F5C6C2 (food category backgrounds, light badges)
- --verde-quelite: #1A7A4A (verified badges, eco/impact, success states)  
- --verde-pale: #C3EDCF (eco tag fills, verified badge backgrounds)
- --amarillo-maiz: #F4C430 (stars, accents, logo color on dark bg, 
  alert states, bottom border on CTAs)
- --azul-letrero: #1565C0 (links, info, WhatsApp-adjacent actions, 
  distance display)
- --naranja-chile: #E65100 (services category, energy, mechanic/repair)
- --magenta-bazar: #880E4F (circular fashion category, 
  segunda mano sections)
- --cafe-comal: #3E2723 (primary text, dark navbar, bottom nav bg)
- --crema-papel: #FFF8EE (all card backgrounds, page background base)
- --gris-adobe: #5D4037 (secondary text, subtitles)

DESIGN LANGUAGE:
- Buttons: square corners (border-radius 4px), thick bottom border 
  (border-bottom: 3px solid darken(color, 20%)) mimicking 3D painted signs.
  Font: Bebas Neue, uppercase, letter-spacing 0.06em.
- Cards: border-radius 8px, 1.5px solid border, 
  colored top accent band (4–6px) matching category color.
  Background: #FFF8EE (crema papel).
- Badges: border-radius 3px (almost square), Nunito 800 uppercase 
  letter-spacing 0.08em, NO rounded pills.
- Inputs: 2px border #C0392B on focus, background #FFF8EE, 
  Nunito 700 text, placeholder in --amarillo-maiz.
- Bottom navigation: background #3E2723, 3px top border #F4C430, 
  Bebas Neue labels, active tab in #F4C430.
- Section headers: Bebas Neue, underlined with 2px #F4C430 accent.
- Map pins: teardrop shape, colored by category, white emoji inside, 
  small label below in card style.
- Price tags / distance chips: mimic "$15.00 KILO" signs — 
  bold numbers, Bebas Neue, colored background, 
  thin border all around.
- Overall feel: NOT flat minimalism. Authentic, dense with information 
  like a real market board, but clean enough to navigate.

═══════════════════════════════════════════
TECH STACK
═══════════════════════════════════════════

Frontend: React 18 + Vite + TailwindCSS (with custom theme tokens 
matching the palette above) + React Router v6.
Backend: Spring Boot 3 (Java 17) REST API.
Database: MySQL 8 — 5 entities minimum.
Auth: Spring Security + JWT (HS256) + BCrypt password hashing.
Maps: Leaflet.js (free, no API key needed for MVP).
State: Zustand for global state (user session, filters, nearby results).
HTTP: Axios with JWT interceptor.
Icons: React Icons (ri- prefix) — NO generic icon libraries.

═══════════════════════════════════════════
DATABASE ENTITIES
═══════════════════════════════════════════

1. USUARIO (catalog)
   - id (UUID PK), nombre, email (UNIQUE), telefono, 
     password_hash (BCrypt), rol ENUM('usuario','vendedor','admin'),
     colonia, lat DECIMAL(10,7), lng DECIMAL(10,7), 
     activo BOOLEAN DEFAULT true, created_at TIMESTAMP

2. CATEGORIA (catalog)  
   - id (UUID PK), nombre, icono (emoji string), descripcion, 
     color_hex VARCHAR(7), activo BOOLEAN

   Seed data for categorias:
   ('Alimentos y Mercados','🌽','#C0392B'),
   ('Fondas y Antojitos','🥗','#E65100'),
   ('Tortillería','🌮','#C0392B'),
   ('Cremería y Lácteos','🥛','#1565C0'),
   ('Verdulería','🥦','#1A7A4A'),
   ('Panadería y Dulcería','🍞','#F4C430'),
   ('Purificadora','💧','#1565C0'),
   ('Ferretería y Servicios','🔧','#E65100'),
   ('Mecánico y Talachero','🚗','#E65100'),
   ('Zapatería','👟','#880E4F'),
   ('Moda Circular y Bazar','👗','#880E4F'),
   ('Tiendas a Granel','🧺','#1A7A4A')

3. NEGOCIO (catalog — main entity)
   - id (UUID PK), usuario_id FK, categoria_id FK,
     nombre VARCHAR(100) NOT NULL,
     descripcion TEXT (the vendor's story),
     historia TEXT (how long, tradition, origin),
     telefono, whatsapp, direccion, colonia, 
     lat DECIMAL(10,7) NOT NULL, lng DECIMAL(10,7) NOT NULL,
     horario VARCHAR(300), foto_url VARCHAR(300),
     anios_en_barrio INT (years in neighborhood),
     verificado BOOLEAN DEFAULT false,
     activo BOOLEAN DEFAULT true, created_at TIMESTAMP,
     -- computed: rating_promedio, total_visitas, total_resenas

4. RESENA (transactional)
   - id (UUID PK), usuario_id FK, negocio_id FK,
     rating INT CHECK(1-5) NOT NULL,
     comentario TEXT, 
     created_at TIMESTAMP, activo BOOLEAN DEFAULT true
   - UNIQUE constraint: one review per user per business

5. VISITA (transactional)  
   - id (UUID PK), usuario_id FK, negocio_id FK,
     km_distancia DECIMAL(6,2),
     co2_ahorrado DECIMAL(6,3) (= km * 0.21 kg/km),
     dinero_local DECIMAL(10,2) (optional, user input),
     fecha TIMESTAMP DEFAULT NOW()

═══════════════════════════════════════════
REST API ENDPOINTS (Spring Boot)
═══════════════════════════════════════════

Auth (public):
  POST /api/auth/register → { nombre, email, password, colonia, lat, lng }
  POST /api/auth/login → { email, password } → { token, usuario }

Negocios (public GET, protected POST/PUT/DELETE):
  GET /api/negocios?lat=&lng=&radio=5&categoria=&search=&page=0&size=20
    → Returns List<NegocioDTO> sorted by distance (Haversine formula)
    → Each DTO includes: distancia_km, rating_promedio, total_visitas
  GET /api/negocios/{id} → NegocioDetailDTO (full info + avg rating + reviews)
  POST /api/negocios (JWT required) → create negocio
  PUT /api/negocios/{id} (JWT, ownership check) → update
  DELETE /api/negocios/{id} (JWT, ownership or admin) → logical delete

Categorias (public):
  GET /api/categorias → List<CategoriaDTO>

Reseñas:
  GET /api/resenas/negocio/{id}?page=0&size=10
  POST /api/resenas (JWT) → { negocio_id, rating, comentario }
  PUT /api/resenas/{id} (JWT, ownership) → update
  DELETE /api/resenas/{id} (JWT, ownership or admin) → logical delete

Visitas:
  POST /api/visitas (JWT) → { negocio_id, lat, lng, dinero_local? }
    → Backend calculates km_distancia and co2_ahorrado
  GET /api/usuarios/me/impacto (JWT) → ImpactoDTO:
    { total_km, total_co2, total_dinero_local, total_visitas, 
      total_negocios_distintos, ranking_barrio }

Admin (JWT + ROLE_ADMIN):
  GET /api/admin/negocios?verificado=false (pending verification)
  PUT /api/admin/negocios/{id}/verificar → toggle verificado

═══════════════════════════════════════════
FRONTEND SCREENS — ALL REQUIRED
═══════════════════════════════════════════

SCR-00: Splash / Landing (public homepage)
  Layout: full-screen, crema-papel background.
  Hero section: Large Bebas Neue title "BARRIO VIVO" in --rojo-toldo,
    subtitle "Tu barrio, más vivo" in Nunito 800,
    Animated counter: "X negocios · Y km ahorrados · Z kg CO₂ evitado"
    Two CTAs: "Explorar el mapa" (primary rojo) + "Registrar negocio" (verde)
  Below fold: 
    Section "¿Por qué local?" with 3 impact cards:
      - Carbon footprint reduction visualization
      - Economy stays in the neighborhood  
      - Rediscover your community
    Section "Categorías" — horizontal scroll of category chips with 
      colored icons in market-stall style cards
    Section "Negocios destacados" — 3 featured business cards
    Footer with "Barrio Vivo" logo, social links, credits

SCR-01: Login
  Centered card on crema-papel background.
  Top: Bebas Neue "BARRIO VIVO" logo in rojo + amarillo accent.
  Form: email + password inputs (styled as described).
  Primary CTA: "Entrar" button.
  Link: "¿No tienes cuenta? Regístrate"
  Error states: red border + error message in Nunito.

SCR-02: Registro (3-step wizard)
  Step 1: Nombre + email + password + confirmar password
  Step 2: Colonia/barrio + enable geolocation button + 
          optional: ¿eres vendedor? toggle
  Step 3: Confirmation screen with Bebas Neue "¡Bienvenido al barrio!"
  Progress bar: 3 segments, colored in --rojo-toldo for completed steps.
  Each step card: white bg, thick top border in --rojo-toldo.

SCR-03: Home / Mapa (main authenticated screen)
  Top navbar: --rojo-toldo background, "BARRIO VIVO" logo in --amarillo-maiz,
    bell icon + avatar icon, search bar with #FFF8EE bg and 2px --amarillo-maiz 
    border, location chip below ("📍 Coyoacán · 5km").
  Leaflet map (full-width, 200px height): 
    - Shows user location as blue dot
    - Shows businesses as colored teardrops by category
    - 5km dashed radius circle
    - Click pin → shows mini card popup with business name + rating
  Category filter chips (horizontal scroll): Bebas Neue font, 
    active chip in --rojo-toldo with --amarillo-maiz text, 
    inactive in #FFF8EE with dark border.
  Impact banner: --verde-quelite background, 3 stats in Bebas Neue
    (km ahorrados, CO₂ evitado, dinero local esta semana)
  "Cerca de ti" horizontal scroll of NegocioCards (see component below)
  "Directorio" vertical list of NegocioListItems
  Bottom navigation: 5 tabs (Mapa, Explorar, +Registrar, Circular, Perfil)
    in --cafe-comal background, 3px --amarillo-maiz top border,
    active tab label in --amarillo-maiz

SCR-04: Explorar / Search
  Full search bar at top (prominent, always visible)
  Active filters row: dismissible badge chips
  Sort options: "Más cercano" / "Mejor calificado" / "Más visitado"
  Results count: "47 negocios en Coyoacán"
  Infinite scroll list of NegocioListItems
  Empty state: illustrated market stall with "No encontramos nada... 
    ¡sé el primero en registrar!" CTA

SCR-04a: Filter Panel (slide-up sheet)
  Categoría: checkbox grid with colored icons
  Distancia: range slider 0.5–10km
  Rating mínimo: star selector
  Solo verificados: toggle switch

SCR-05: Detalle de Negocio (most important screen)
  Hero image or emoji placeholder (colored bg matching category)
  Back button (top left) + Share button (top right) 
  "✓ VERIFICADO" badge (top right if verified, --verde-quelite bg)
  Category tag (colored pill)
  Business name in Bebas Neue 32px
  Address + distance chip (styled as price sign: "350m de ti")
  Star rating row + count
  
  Info grid (2x2 cards with colored top accent):
    - Horario (clock icon) — green accent
    - Distancia (pin icon) — rojo accent  
    - Contacto (phone icon) — amarillo accent
    - En el barrio desde (calendar icon) — azul accent

  "Su historia" section:
    Playfair Display italic quote from vendor
    "— Nombre, fundador/a" attribution
    
  Impact mini-card (--verde-quelite bg):
    "Al venir aquí ahorras X km · evitas Y kg de CO₂"
    
  Reviews section:
    "Reseñas del barrio" title + "+ Dejar reseña" link
    Review cards: avatar initials circle (--rojo-pale bg), 
    name in Nunito 800, stars, comment, "Hace X días"
    
  Fixed bottom CTA bar:
    Primary: "REGISTRAR VISITA" (--rojo-toldo, full width)
    Secondary: "IR AQUÍ" (--amarillo-maiz, icon)
    
  WhatsApp contact button (--verde-quelite, below CTAs if whatsapp exists)

SCR-05b: Dejar Reseña (modal/sheet)
  Star selector (large, interactive, --amarillo-maiz)
  Textarea for comment
  Submit CTA: "Publicar reseña"

SCR-05c: Confirmar Visita (modal)
  Shows business name + distance
  CO₂ savings preview (calculated live)
  Optional: "¿Cuánto gastaste?" input (for economy tracking)
  CTA: "Confirmar visita"
  Post-confirmation: success screen with impact summary
    "¡Gracias! Ahorraste X km y Y kg de CO₂ 🌿"

SCR-06: Registrar Negocio (3-step wizard)
  Step 1: Nombre + categoría (grid with icons) + 
    "¿Cuántos años llevas aquí?" number input
  Step 2: Historia/descripción textarea + photo upload +
    horario builder (day checkboxes + time range per day)
  Step 3: Ubicación (map picker with Leaflet, drag pin) + 
    teléfono + WhatsApp + dirección
  Final: "¡Tu negocio ya está en el barrio!"
    with preview card and share prompt

SCR-07: Moda Circular
  Category hero banner in --magenta-bazar
  Description: "Dale una segunda vida. Compra, vende o intercambia ropa."
  Filtered listing of all negocios with categoria "Moda Circular y Bazar"
  + Floating "Publicar artículo" FAB button

SCR-08: Perfil de Usuario
  Header: --cafe-comal bg, avatar circle, name, 
    "Vecino/a de X · Miembro desde [año]"
  Ranking card: --amarillo-maiz bg, Bebas Neue large number,
    "Top X consumidor consciente de [colonia]"
  Impact dashboard (2x2 grid):
    km totales / CO₂ total / dinero local / negocios visitados
    Each card: colored left border, Bebas Neue number, Nunito label
  "Mis negocios" section with edit/delete actions
  "+ Registrar nuevo negocio" CTA button

SCR-09: ¿Por qué local? (educational/promotional)
  Full-page storytelling with:
  - Animated CO₂ counter
  - "Cada vez que compras local..." 3-step visual
  - Community testimonials in Playfair italic
  - Impact calculator: "Si 100 vecinos compran local 3 veces por semana..."
  - "Únete al movimiento" CTA

SCR-10: Mi Impacto (personal dashboard)
  Weekly / monthly / total tabs
  Bar chart of visits per week (Chart.js, colored bars in brand palette)
  CO₂ saved vs average car trip comparison
  Categories breakdown: which types of business visited most
  "Compartir mi impacto" button (generates shareable image)

SCR-11: Admin Panel (role: admin only)
  Tabs: Negocios pendientes / Usuarios / Categorías
  Negocios pendientes: list of unverified businesses with 
    "Verificar" (green) and "Rechazar" (red) actions
  Usuarios: searchable table with role management
  Categorías: CRUD for business categories

═══════════════════════════════════════════
REUSABLE COMPONENTS
═══════════════════════════════════════════

<NegocioCard> — horizontal scroll card:
  - Colored emoji area (category color bg, emoji 40px)
  - Colored top band (category color, 4px)
  - Category badge (Bebas Neue, category color bg, white text)
  - Business name (Bebas Neue 16px)
  - Distance + status (open/closed)
  - Star rating
  - Verificado badge if true
  Width: 160–175px, background #FFF8EE

<NegocioListItem> — full-width row:
  - Avatar square with emoji (44x44, category color bg, 6px radius)
  - Name (Bebas Neue 16px) + category + verified chip
  - Right: distance in Bebas Neue (--rojo-toldo) + stars

<CategoryChip> — filter pill:
  Active: --rojo-toldo bg, --amarillo-maiz text, Bebas Neue
  Inactive: #FFF8EE bg, dark border, --cafe-comal text
  Border-radius: 3px (square-ish, not pill)

<ImpactBanner> — green banner:
  --verde-quelite bg, leaf emoji, 3 stat columns
  Numbers: Bebas Neue white, Labels: Nunito 700 rgba(white, 0.75)

<RatingStars> — interactive:
  Large stars for input (32px), small for display (14px)
  Color: --amarillo-maiz, empty: rgba(--cafe-comal, 0.2)

<MapPin> — Leaflet custom marker:
  SVG teardrop shape, filled with category color
  White emoji inside, 2px white border
  Drop shadow: 2px 3px 0 darken(color, 20%)

<VerifiedBadge>:
  "✓ VERIFICADO" in Bebas Neue, --verde-quelite bg, 
  --amarillo-maiz text, 3px border-radius

<StatusPill> open/closed:
  "ABIERTO AHORA" → --cafe-comal bg, --amarillo-maiz text
  "CERRADO" → light gray bg, gray text
  Bebas Neue uppercase

<PriceSignChip> for distance/time:
  Mimics "$15.00 KILO" sign style
  Colored bg, bold Bebas Neue number, thin full border
  Used for: "350m", "5 min", "4.9 ★"

<HistoryQuote>:
  Playfair Display italic, left border in --rojo-toldo 3px,
  padding-left 16px, --gris-adobe color

<Wizard>: multi-step form wrapper
  Progress bar: segment pills, completed = --verde-quelite, 
  active = --rojo-toldo, pending = rgba(0,0,0,0.1)
  Step label in Bebas Neue uppercase

═══════════════════════════════════════════
SPRING BOOT BACKEND DETAILS
═══════════════════════════════════════════

Project structure:
  com.barriovivo/
    config/ (SecurityConfig, CorsConfig, JwtConfig)
    controller/ (AuthController, NegocioController, 
                 CategoriaController, ResenaController, 
                 VisitaController, UsuarioController, AdminController)
    service/ (AuthService, NegocioService, ResenaService, 
              VisitaService, ImpactoService, GeoService)
    repository/ (JPA repositories for all 5 entities)
    model/entity/ (Usuario, Categoria, Negocio, Resena, Visita)
    model/dto/ (request and response DTOs for each entity)
    security/ (JwtFilter, JwtService, UserDetailsServiceImpl)
    exception/ (GlobalExceptionHandler with proper HTTP codes)

GeoService.calculateDistance(lat1, lng1, lat2, lng2):
  Implements Haversine formula returning km as double

ImpactoService.calcularCO2(double km):
  Returns km * 0.21 (average Mexico City car emission factor kg CO₂/km)

Security config:
  Public: GET /api/negocios/**, GET /api/categorias, 
          POST /api/auth/**
  Protected: everything else
  CORS: allow React dev server (localhost:5173) + production domain

═══════════════════════════════════════════
SPECIFIC UX BEHAVIORS
═══════════════════════════════════════════

1. Geolocation: On first load, request browser location. 
   If denied, default to Zócalo CDMX (19.4326, -99.1332)
   Show "Detectando tu barrio..." loading state.

2. Map interaction: Clicking a map pin shows a mini popup card 
   (NegocioCard compact). Clicking the card navigates to SCR-05.

3. Distance calculation: All distances calculated client-side 
   using Haversine with user's current coords. 
   Format: "350m" if <1km, "1.2 km" if ≥1km.

4. Open/Closed status: Parse horario string to determine if currently open.
   Show "ABIERTO AHORA" or "CIERRA A LAS 2PM" or "CERRADO · Abre mañana 7am"

5. Visit registration: 
   - POST to /api/visitas
   - Show success animation: leaf emoji grows + 
     "¡Ahorraste X km! = Y kg CO₂"
   - Update impact counters in real time

6. Review uniqueness: If user already reviewed, show "Editar tu reseña" 
   instead of "Dejar reseña". Prevent duplicate review UI.

7. Offline/loading states: 
   - Skeleton screens matching the card shapes (crema-papel bg + 
     animated shimmer)
   - Error states with "Algo salió mal... intenta de nuevo" 
     in Bebas Neue

8. Empty states: 
   - No negocios nearby: "Sé el primero en registrar un negocio en 
     [colonia]" with illustrated market stall SVG
   - No reviews: "Sé el primero en opinar. El barrio escucha."

9. Responsive: Mobile-first PWA. 
   Breakpoints: 375px (mobile), 768px (tablet), 1200px (desktop)
   Desktop: sidebar with map on right (60%) + list on left (40%)

10. PWA manifest: 
    App name: "Barrio Vivo"
    Theme color: #C0392B
    Background color: #FFF8EE
    Icons: leaf/market themed

═══════════════════════════════════════════
GENERATE IN THIS ORDER
═══════════════════════════════════════════

Step 1: Spring Boot project structure + pom.xml dependencies
Step 2: All JPA entities + repositories
Step 3: DTOs + service layer + GeoService + ImpactoService
Step 4: Security config + JWT implementation  
Step 5: All REST controllers with validation
Step 6: React project setup + Tailwind config with custom theme tokens
Step 7: All reusable components (NegocioCard, MapPin, CategoryChip, etc.)
Step 8: React Router setup + all screen components
Step 9: Zustand store (auth, negocios, filters, impacto)
Step 10: Axios service layer with JWT interceptor
Step 11: Leaflet map integration with custom pins
Step 12: Chart.js integration for impact dashboard
Step 13: PWA manifest + service worker
Step 14: Docker Compose (MySQL + Spring Boot + React)
Step 15: README with full setup instructions

Generate production-ready code. No placeholders. 
Every screen must be fully implemented with real logic, 
real API calls, real form validation, real error handling.
Comment critical logic in Spanish to match the team's language.