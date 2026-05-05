# UlisesHD - Portafolio Personal | Express + EJS

Portafolio personal con arquitectura multi-página usando Express.js + EJS como motor de plantillas.

## 🚀 Características

- ✅ **Multi-página real** con rutas Express (`/`, `/about`, `/projects`, `/services`)
- ✅ **Componentes reutilizables** en EJS (navbar, footer, head)
- ✅ **Transiciones suaves** con Page Transitions API
- ✅ **Animaciones Three.js** en hero e intro
- ✅ **Glass morphism** design system
- ✅ **Responsive** (desktop, tablet, mobile)
- ✅ **SEO-friendly** con URLs reales

## 📋 Requisitos

- Node.js >= 14.0.0
- npm (incluido con Node.js)

## 🔧 Instalación

1. **Clonar/descargar el repositorio**:
   ```bash
   git clone <repo-url>
   cd PortafolioHandMadeHD
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor**:
   ```bash
   npm start
   ```

4. **Abrir en navegador**:
   ```
   http://localhost:3000
   ```

## 📂 Estructura de Carpetas

```
PortafolioHandMadeHD/
├── server.js                          # Express server
├── package.json                       # Dependencias
├── .gitignore
├── README.md
├── public/                            # Archivos estáticos
│   ├── css/                           # Hojas de estilo
│   ├── js/                            # Scripts del lado del cliente
│   └── img/                           # Imágenes
├── views/                             # Plantillas EJS
│   ├── layouts/
│   │   └── layout.ejs                 # Estructura HTML base
│   ├── pages/
│   │   ├── home.ejs                   # Hero + intro-overlay
│   │   ├── about.ejs                  # Sección sobre mí
│   │   ├── projects.ejs               # Proyectos con categorías
│   │   └── services.ejs               # Servicios + contacto
│   └── includes/
│       ├── head.ejs                   # Meta tags, CDN, CSS
│       ├── navbar.ejs                 # Navegación
│       └── footer.ejs                 # Pie de página
└── index.html                         # Archivo original (referencia)
```

## 🛣️ Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con hero e intro animation |
| `/about` | Sección sobre mí |
| `/projects` | Portfolio de proyectos |
| `/services` | Servicios y contacto |

## 🎨 Personalización

### Cambiar contenido
- Editar archivos en `views/pages/`
- Modificar textos, imágenes, colores

### Cambiar estilos
- Editar archivos CSS en `public/css/`
- Tailwind CDN ya incluido en `views/includes/head.ejs`

### Cambiar imágenes
- Reemplazar archivos en `public/img/`
- Actualizar rutas en templates (usar `/img/nombre.png`)

## 🔗 Links Útiles

- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Three.js Documentation](https://threejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📝 Scripts Disponibles

```bash
npm start    # Inicia servidor en puerto 3000
npm run dev  # Instala dependencias y arranca servidor
```

## 🚢 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Heroku
```bash
heroku login
heroku create <app-name>
git push heroku main
```

### Railway.app / Render.com / etc.
Siguiendo documentación oficial de cada plataforma.

## 📧 Contacto

**Email**: ulises.hd06@gmail.com

---

Hecho con ❤️ por UlisesHD
