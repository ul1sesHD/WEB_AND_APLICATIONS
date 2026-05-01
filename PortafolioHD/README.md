# UlisesHD Portfolio

Portafolio profesional de Ulises Hernández, ingeniero full stack con enfoque en backend, frontend, IA, diseño UX/UI y liderazgo. Estética **Cyberpunk Tech Professional** con glassmorphism, neón cyan/violet sobre base azul oscuro.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 + CSS custom (glassmorphism, neon effects)
- **Animations**: Framer Motion + GSAP
- **3D**: React Three Fiber + Three.js + Drei
- **Hosting**: Vercel (recomendado)

## Estructura del Proyecto

```
src/
├── app/                    # App Router (rutas + layout raíz)
│   ├── layout.tsx          # Layout global, fonts, metadata SEO
│   ├── page.tsx            # Homepage que ensambla todas las secciones
│   └── globals.css         # Tailwind + estilos cyberpunk globales
├── components/
│   ├── ui/                 # Componentes primitivos (Button, Card, Badge)
│   ├── layout/             # Header, Footer, Logo
│   └── sections/           # Hero, About, Skills, Projects, Design, Leadership, Contact
├── lib/
│   ├── utils.ts            # cn() helper para Tailwind
│   ├── constants/          # Navegación, social links
│   └── data/               # JSON editables: skills, projects, sections, resume
└── types/                  # Tipos TypeScript compartidos
```

## Comenzar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir http://localhost:3000
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en `localhost:3000` |
| `npm run build` | Build de producción |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint |
| `npm run type-check` | Verificar tipos TypeScript |

## Editar Contenido (sin tocar código React)

Todo el contenido del portafolio está en `src/lib/data/`:

- **`sections.json`** — Títulos y descripciones de cada sección
- **`skills.json`** — Categorías y habilidades técnicas
- **`projects.json`** — Tus proyectos destacados
- **`resume.json`** — Información personal (nombre, email, highlights)

## Sistema de Diseño

### Paleta de Colores

| Variable Tailwind | Hex       | Uso                            |
|-------------------|-----------|--------------------------------|
| `deep-blue`       | `#061125` | Background principal           |
| `dark-blue`       | `#122D70` | Background secundario          |
| `neon-violet`     | `#5C58ED` | Acento primario, hovers        |
| `neon-cyan`       | `#56E1E8` | Highlights, glows, bordes      |
| `neon-blue`       | `#3FA9F5` | Links, CTAs                    |

### Clases CSS Custom

- `.glass-card` — Card con glassmorphism + hover glow
- `.text-neon-gradient` — Texto con gradiente cyan→violet animado
- `.text-glow-cyan` / `.text-glow-violet` — Glow text effect
- `.bg-grid` — Fondo de grilla cyberpunk sutil
- `.heading-display` — Tipografía display extra-bold

## Accesibilidad

- Soporte automático de `prefers-reduced-motion` (animaciones desactivadas)
- Contraste de colores AA cumplido
- Navegación por teclado
- ARIA labels en elementos interactivos

## Próximos Pasos

- [ ] Hero 3D interactivo con React Three Fiber
- [ ] Animaciones de scroll con Framer Motion + GSAP
- [ ] Páginas individuales por proyecto (`/projects/[slug]`)
- [ ] Form de contacto funcional
- [ ] Modo claro opcional
- [ ] CV descargable en PDF
- [ ] Deploy en Vercel + dominio custom

## Autor

**Ulises Hernández** — Full Stack Engineer
- Email: ulises.hd06@gmail.com
- GitHub: [@ul1sesHD](https://github.com/ul1sesHD)

---

> Construido con cyberpunk vibes y mucho café.
