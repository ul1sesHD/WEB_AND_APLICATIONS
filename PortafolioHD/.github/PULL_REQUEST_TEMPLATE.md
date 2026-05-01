# feat(portfolio): UlisesHD Cyberpunk Tech Portfolio Base

## Resumen

Nueva carpeta `PortafolioHD/` con la base completa del portafolio profesional de Ulises Hernández. Stack: **Next.js 14 + TypeScript + Tailwind CSS** con estética **Cyberpunk Tech Professional** (glassmorphism, neón cyan/violet sobre base azul oscuro).

## ¿Qué incluye?

### Configuración
- Next.js 14 (App Router) + React 18 + TypeScript estricto
- Tailwind CSS con tema custom (paleta UlisesHD)
- ESLint con `next/core-web-vitals`
- PostCSS, path alias `@/*`

### Sistema de Diseño Cyberpunk
- Paleta: `#061125` (deep-blue), `#122D70` (dark-blue), `#5C58ED` (neon-violet), `#56E1E8` (neon-cyan), `#3FA9F5` (neon-blue)
- Clases custom: `.glass-card`, `.text-neon-gradient`, `.text-glow-cyan/violet`, `.bg-grid`, `.heading-display`
- Animaciones: `neonPulse`, `float`, `glow`, `gradientShift`
- Soporte completo de `prefers-reduced-motion`

### Componentes
- **UI primitivos**: Button (primary/secondary/ghost · sm/md/lg), Card (glassmorphism), Badge (4 variantes)
- **Layout**: Header (sticky con backdrop-blur al scroll), Footer, Logo
- **Sections**: Hero, About, Skills, Projects, Design, Leadership, Contact

### Contenido editable (JSON)
- `sections.json` — Títulos y descripciones
- `skills.json` — 7 categorías de habilidades (Backend, Cloud, AI, Frontend, Design, PM, Leadership)
- `projects.json` — Proyectos destacados
- `resume.json` — Info personal

### Documentación
- `README.md` con setup, comandos, guía de edición y roadmap

## Estructura de Commits

```
67f6c42 docs(portfolio): README con setup, scripts y guia de edicion
14013ac feat(app): root layout + homepage assembly
bf2c127 feat(sections): siete secciones del portafolio
705599a feat(layout): Header, Footer y Logo con efectos neon
4ac6b78 feat(ui): glassmorphism UI primitives
2a96627 feat(data): portfolio content + types + navigation
6705014 feat(design): cyberpunk design system + Tailwind theme
bfbd037 chore(portfolio): scaffold Next.js 14 + TypeScript project
```

## Cómo probar localmente

```bash
cd PortafolioHD
npm install
npm run dev
# Abrir http://localhost:3000
```

## Próximos pasos (no en este PR)

- [ ] Hero 3D interactivo con React Three Fiber + Three.js
- [ ] Animaciones scroll-triggered con Framer Motion + GSAP
- [ ] Páginas individuales por proyecto (`/projects/[slug]`)
- [ ] Form de contacto funcional con email
- [ ] Modo claro opcional
- [ ] Deploy a Vercel
