(function () {
  const servicesSection = document.getElementById('services');
  if (!servicesSection) return;

  // ═══════════════════════════════════════════════════════════
  // DATA: 15 tipos de página web
  // ═══════════════════════════════════════════════════════════
  const dataPaginas = {
    landing: {
      nombre: "Landing Page",
      icon: "🚀",
      descripcion: "Página de una sola pantalla enfocada en convertir visitantes en leads o clientes para un producto, servicio o campaña específica.",
      entregables: [
        "Diseño responsivo y atractivo",
        "Formulario de captura de datos",
        "Integración con WhatsApp/Email",
        "SEO básico optimizado",
        "Dominio y hosting incluido"
      ],
      beneficios: [
        "Convierte visitantes en clientes 3-5x más rápido que una web tradicional",
        "Recolecta datos automáticamente y genera leads mientras duermes",
        "Inversión mínima con retorno máximo: ROI visible en 30 días"
      ],
      rangoPrecio: "Freelancer: $5,000-$10,000 | Agencia: $15,900-$25,000"
    },
    blog: {
      nombre: "Blog",
      icon: "✍️",
      descripcion: "Plataforma para publicar contenido regularmente, construir autoridad, atraer tráfico orgánico y mantener relación con tu audiencia.",
      entregables: [
        "CMS profesional (WordPress, Wix)",
        "Sistema de categorías y etiquetas",
        "Comentarios de lectores habilitados",
        "Integración con redes sociales",
        "Newsletter integrada",
        "SEO on-page optimizado"
      ],
      beneficios: [
        "Tráfico orgánico +150% en 6 meses sin gastar en publicidad",
        "Establece autoridad: lectores te ven como experto de tu industria",
        "Vende mientras duermes: monetiza vía afiliados, publicidad o cursos"
      ],
      rangoPrecio: "Freelancer: $4,000-$8,000 | Agencia: $12,000-$20,000"
    },
    portafolio: {
      nombre: "Portafolio Online",
      icon: "🎨",
      descripcion: "Vitrina profesional para artistas, diseñadores, fotógrafos y creativos que necesitan mostrar su mejor trabajo de forma visual y atractiva.",
      entregables: [
        "Galerías de imágenes optimizadas",
        "Layout limpio y moderno",
        "Filtros por categoría",
        "Página 'Acerca de'",
        "Formulario de contacto directo",
        "Responsive design perfecto"
      ],
      beneficios: [
        "Aumenta propuestas en 40%: tu portafolio funciona 24/7 como vendedor",
        "Reemplaza presentaciones físicas: muestra galerías de lo que haces",
        "Tu marca personal crece: destaca entre 100 competidores"
      ],
      rangoPrecio: "Freelancer: $3,000-$6,000 | Agencia: $10,000-$18,000"
    },
    empresarial: {
      nombre: "Página Empresarial",
      icon: "🏢",
      descripcion: "Presencia digital profesional para negocios B2B o B2C que necesitan construir marca, describir servicios y generar confianza con posibles clientes.",
      entregables: [
        "Diseño corporativo personalizado",
        "Secciones de servicios/productos",
        "Testimonios de clientes",
        "Blog integrado",
        "Formulario de contacto avanzado",
        "SEO técnico completo",
        "Panel de analytics"
      ],
      beneficios: [
        "Aumenta consultas en 20-30%: una web profesional convence donde no llegas",
        "Ahorra horas de presentaciones: muestra servicios, precios y testimonios",
        "Integra formularios para calificar leads automáticamente"
      ],
      rangoPrecio: "Freelancer: $7,000-$15,000 | Agencia: $18,000-$35,000"
    },
    educativa: {
      nombre: "Página Educativa",
      icon: "🎓",
      descripcion: "Plataforma completa para ofrecer cursos en línea, clases virtuales o contenido educativo con seguimiento de progreso de estudiantes.",
      entregables: [
        "LMS (Learning Management System)",
        "Módulos de lecciones estructuradas",
        "Videos incrustados",
        "Cuestionarios y tareas automáticas",
        "Sistema de calificaciones",
        "Área restringida con login seguro",
        "Certificados digitales"
      ],
      beneficios: [
        "Escala globalmente: vende a 1,000 alumnos sin aumentar costos de infraestructura",
        "Ingresos predecibles y recurrentes: mensualidad de 100+ alumnos = ganancia segura",
        "Automatiza evaluaciones: califica tareas, genera certificados, da acceso automático"
      ],
      rangoPrecio: "Freelancer: $8,000-$18,000 | Agencia: $20,000-$40,000"
    },
    reservas: {
      nombre: "Página de Reservas",
      icon: "📅",
      descripcion: "Sistema automatizado que permite a usuarios reservar servicios (hoteles, restaurantes, consultas médicas) seleccionando fecha, hora y detalles.",
      entregables: [
        "Calendario interactivo en tiempo real",
        "Gestión de disponibilidad automática",
        "Procesamiento de pagos integrado",
        "Confirmaciones automáticas por email",
        "Recordatorios SMS/WhatsApp",
        "Panel de administración completo",
        "Historial de reservas"
      ],
      beneficios: [
        "Ahorra 10+ horas semanales en gestión: elimina llamadas y emails para reservar",
        "Aumenta ocupación 25-35%: disponibilidad 24/7 sin depender de personal",
        "Recolecta datos de cada cliente: preferencias, email, teléfono para vender complementarios"
      ],
      rangoPrecio: "Freelancer: $10,000-$22,000 | Agencia: $28,000-$50,000"
    },
    interactiva: {
      nombre: "Página Interactiva",
      icon: "✨",
      descripcion: "Sitio con elementos dinámicos avanzados como gráficos animados, juegos, cuestionarios, filtros complejos o experiencias de realidad aumentada.",
      entregables: [
        "Animaciones CSS/JavaScript avanzadas",
        "Componentes interactivos personalizados",
        "Herramientas visuales (simuladores, gráficos)",
        "Integración de realidad aumentada",
        "Dashboards dinámicos",
        "Performance optimizado"
      ],
      beneficios: [
        "Engagement +200% vs sitios estáticos: usuarios permanecen 5-10 minutos",
        "Diferenciación brutal: compite con experiencia, no solo con precio",
        "Recolecta datos de interacción: sabes exactamente qué les interesa"
      ],
      rangoPrecio: "Freelancer: $12,000-$30,000 | Agencia: $35,000-$60,000"
    },
    membresia: {
      nombre: "Página de Membresía",
      icon: "🔐",
      descripcion: "Plataforma con contenido exclusivo y beneficios para miembros pagos, con acceso restringido según nivel de suscripción.",
      entregables: [
        "Sistema de autenticación segura",
        "Niveles de membresía configurables",
        "Pagos recurrentes automatizados",
        "Área privada con contenido exclusivo",
        "Gestor de suscripción y renovación",
        "Reportes de ingresos mensuales"
      ],
      beneficios: [
        "Cambia venta única por ingresos recurrentes: $5,000 una vez = $500 × 12 meses",
        "Retención 10x mejor: miembros vuelven consistentemente, no buscas nuevos clientes",
        "Escala contenido: un video para 10 miembros o 10,000, mismo costo"
      ],
      rangoPrecio: "Freelancer: $12,000-$28,000 | Agencia: $32,000-$55,000"
    },
    ecommerce: {
      nombre: "E-commerce",
      icon: "🛒",
      descripcion: "Tienda en línea completa para vender productos físicos o digitales con carrito, pagos seguros y gestión de inventario automática.",
      entregables: [
        "Catálogo de productos ilimitado",
        "Carrito de compras funcional",
        "Pasarelas de pago (Stripe, PayPal)",
        "Cálculo automático de envíos",
        "Gestión de inventario en tiempo real",
        "Facturación automática",
        "Integración con logística"
      ],
      beneficios: [
        "Ahorra local físico ($10,000+ mensuales): ventas 24/7 sin límite geográfico",
        "Crece ventas sin aumentar costos operacionales: misma infraestructura para 100 o 10,000 productos",
        "Mejora márgenes de ganancia: sin costos de tienda física"
      ],
      rangoPrecio: "Freelancer: $15,000-$35,000 | Agencia: $35,000-$150,000"
    },
    marketplace: {
      nombre: "Marketplace",
      icon: "🏪",
      descripcion: "Plataforma donde múltiples vendedores ofrecen productos y servicios a compradores, con sistema de reputación y transacciones seguras.",
      entregables: [
        "Módulo multi-vendedor",
        "Carrito compartido entre vendedores",
        "Pasarelas de pago seguras",
        "Sistema de reputación/calificaciones",
        "Gestión de órdenes automática",
        "Panel para vendedores",
        "Moderación de contenido"
      ],
      beneficios: [
        "Ingresos sin inventario: comisión por transacción de otros vendedores",
        "Escala sin límite: 10 vendedores o 10,000, infraestructura igual, ingresos exponencial",
        "Recolecta datos masivos: transacciones, tendencias, comportamiento comprador"
      ],
      rangoPrecio: "Freelancer: $20,000-$45,000 | Agencia: $50,000-$120,000"
    },
    foro: {
      nombre: "Foro Online",
      icon: "💬",
      descripcion: "Comunidad digital donde usuarios conversan, intercambian información y resuelven dudas alrededor de temas compartidos.",
      entregables: [
        "Motor de foros con threads y replies",
        "Sistema de usuarios y perfiles",
        "Moderación de contenido",
        "Notificaciones en tiempo real",
        "Seguridad contra spam",
        "Categorías y subcategorías",
        "Búsqueda avanzada de posts"
      ],
      beneficios: [
        "Comunidad genera contenido gratis: usuarios resuelven dudas entre ellos",
        "Recolecta datos valiosos: sabes exactamente qué dudan, qué les importa",
        "Lealtad extrema: miembros que interactúan vuelven 10x más que visitantes"
      ],
      rangoPrecio: "Freelancer: $8,000-$16,000 | Agencia: $18,000-$35,000"
    },
    eventos: {
      nombre: "Página de Eventos",
      icon: "🎟️",
      descripcion: "Sitio dedicado a promocionar un evento (presencial u online), mostrar detalles y permitir registro de asistentes de forma automatizada.",
      entregables: [
        "Calendario interactivo del evento",
        "Formulario de registro automático",
        "Integración de pagos",
        "Lista de expositores/speakers",
        "Mapas de ubicación",
        "Sistema de tickets",
        "Confirmaciones por email"
      ],
      beneficios: [
        "Automatiza registro y pagos: no replies emails, todo en la web",
        "Recolecta datos de cada asistente: email, teléfono, preferencias",
        "Aumenta asistencia 25-35%: acceso fácil a info + recordatorios automáticos"
      ],
      rangoPrecio: "Freelancer: $6,000-$14,000 | Agencia: $16,000-$32,000"
    },
    noticias: {
      nombre: "Página de Noticias",
      icon: "📰",
      descripcion: "Publicación digital que cubre temas de actualidad; requiere actualización constante y amplificación en redes.",
      entregables: [
        "CMS de noticias especializado",
        "Sistema de categorías y tags",
        "Comentarios validados",
        "Botones de compartir en redes",
        "Suscripción a newsletter",
        "Clasificación por autor",
        "Análisis de lectores"
      ],
      beneficios: [
        "Tráfico viral automático: noticias se comparten en redes, multiplicando alcance",
        "Múltiples fuentes de ingresos: publicidad, afiliados, sponsorships, suscripción",
        "Recolecta emails constantes: base de datos que crece diariamente"
      ],
      rangoPrecio: "Freelancer: $7,000-$15,000 | Agencia: $18,000-$40,000"
    },
    informativa: {
      nombre: "Página Informativa",
      icon: "📚",
      descripcion: "Sitio enfocado en proporcionar información detallada sobre un tema, servicio o industria; establece autoridad y atrae usuarios en búsqueda de conocimiento.",
      entregables: [
        "Estructura modular de contenido",
        "Barra de búsqueda interna",
        "Sistema de categorización",
        "Mapa del sitio XML",
        "SEO on-page optimizado",
        "Directorio de recursos navegable",
        "Filtros de búsqueda avanzada"
      ],
      beneficios: [
        "Posicionamiento en Google automático: clientes te encuentran cuando buscan",
        "Recolecta datos en formularios estratégicos: sabes exactamente qué buscan",
        "Conviértete en autoridad: si dominas la información, dominas el mercado"
      ],
      rangoPrecio: "Freelancer: $5,000-$12,000 | Agencia: $14,000-$28,000"
    },
    comunidad: {
      nombre: "Página de Comunidad",
      icon: "👥",
      descripcion: "Espacio digital donde miembros con intereses comunes interactúan, comparten contenido y construyen vínculos a largo plazo.",
      entregables: [
        "Perfiles de usuario completos",
        "Feed de actividades",
        "Grupos y subcomunidades",
        "Sistema de mensajería privada",
        "Eventos y encuentros virtuales",
        "Gamificación (puntos, badges)"
      ],
      beneficios: [
        "Lealtad x10: miembros activos vuelven diariamente sin que invites",
        "Contenido user-generated: la comunidad crea, tú moderas",
        "Monetización flexible: membresías, sponsors, eventos pagados"
      ],
      rangoPrecio: "Freelancer: $10,000-$20,000 | Agencia: $25,000-$45,000"
    }
  };

  // ═══════════════════════════════════════════════════════════
  // ESTADO
  // ═══════════════════════════════════════════════════════════
  let currentSlide = 0;
  let surveyAnswers = {};

  // ═══════════════════════════════════════════════════════════
  // NAVEGACIÓN ENTRE VISTAS
  // ═══════════════════════════════════════════════════════════
  function showServicesView(viewName) {
    servicesSection.querySelectorAll('.services-view').forEach(v => {
      v.classList.remove('visible');
    });
    const target = servicesSection.querySelector(`.services-${viewName}`);
    if (target) target.classList.add('visible');
    window.scrollTo(0, 0);
  }

  // ═══════════════════════════════════════════════════════════
  // ENCUESTA - PREGUNTAS
  // ═══════════════════════════════════════════════════════════
  const preguntas = [
    {
      id: 'objetivo',
      titulo: '¿Cuál es tu objetivo principal?',
      opciones: [
        { value: 'venta', label: 'Vender productos o servicios', icon: '💰' },
        { value: 'leads', label: 'Captar información de clientes (leads)', icon: '📋' },
        { value: 'autoridad', label: 'Establecerme como experto', icon: '⭐' },
        { value: 'comunidad', label: 'Crear una comunidad', icon: '👥' }
      ]
    },
    {
      id: 'interactividad',
      titulo: '¿Necesitas que los usuarios interactúen frecuentemente?',
      opciones: [
        { value: 'interactividad_alta', label: 'Sí, formularios, reservas, comentarios, etc.', icon: '🔄' },
        { value: 'interactividad_baja', label: 'No, principalmente información y contacto', icon: '📄' },
        { value: 'interactividad_avanzada', label: 'Muy avanzada (juegos, RA, filtros complejos)', icon: '🎮' }
      ]
    },
    {
      id: 'contenido',
      titulo: '¿Publicarás contenido regularmente?',
      opciones: [
        { value: 'contenido', label: 'Sí, artículos, noticias, tutoriales, etc.', icon: '✍️' },
        { value: 'sin_contenido', label: 'No, es información estática', icon: '📌' }
      ]
    },
    {
      id: 'pagos',
      titulo: '¿Necesitas procesar pagos en línea?',
      opciones: [
        { value: 'pagos', label: 'Sí, vender directamente desde el sitio', icon: '🛒' },
        { value: 'sin_pagos', label: 'No, solo contacto para presupuestos', icon: '✉️' }
      ]
    },
    {
      id: 'presupuesto',
      titulo: '¿Cuál es tu rango de presupuesto?',
      opciones: [
        { value: 'bajo', label: '$3,000 - $10,000 MXN', icon: '💲' },
        { value: 'medio', label: '$10,000 - $25,000 MXN', icon: '💲💲' },
        { value: 'alto', label: '$25,000+ MXN', icon: '💲💲💲' }
      ]
    }
  ];

  // ═══════════════════════════════════════════════════════════
  // RENDER ENCUESTA
  // ═══════════════════════════════════════════════════════════
  function renderEncuesta() {
    const container = servicesSection.querySelector('.services-encuesta .encuesta-content');
    if (!container) return;

    let html = `
      <header class="encuesta-header">
        <h2 class="section-title">🚀 Descubre tu Página Web Ideal</h2>
        <p class="encuesta-subtitle">Responde estas preguntas y te mostraremos qué tipo de sitio necesitas</p>
      </header>
      <form class="encuesta-form" id="encuesta-form">
    `;

    preguntas.forEach((p, idx) => {
      html += `
        <fieldset class="pregunta-block glass-card" data-pregunta="${p.id}">
          <legend class="pregunta-title">${idx + 1}. ${p.titulo}</legend>
          <div class="opciones-grid">
            ${p.opciones.map(o => `
              <label class="opcion-item">
                <input type="radio" name="${p.id}" value="${o.value}">
                <span class="opcion-icon">${o.icon}</span>
                <span class="opcion-label">${o.label}</span>
              </label>
            `).join('')}
          </div>
        </fieldset>
      `;
    });

    html += `
        <div class="encuesta-actions">
          <button type="button" class="btn-secondary" id="btn-clear">Limpiar</button>
          <button type="submit" class="btn-primary">Ver Mis Recomendaciones</button>
        </div>
      </form>
    `;

    container.innerHTML = html;

    // Form events
    const form = container.querySelector('#encuesta-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      handleSurveySubmit();
    });

    container.querySelector('#btn-clear').addEventListener('click', () => {
      form.reset();
      surveyAnswers = {};
    });
  }

  // ═══════════════════════════════════════════════════════════
  // VALIDACIÓN Y CÁLCULO DE PUNTUACIÓN
  // ═══════════════════════════════════════════════════════════
  function handleSurveySubmit() {
    const form = document.getElementById('encuesta-form');
    const answers = {};

    for (const p of preguntas) {
      const selected = form.querySelector(`input[name="${p.id}"]:checked`);
      if (!selected) {
        alert('Por favor, selecciona al menos una opción en cada pregunta');
        return;
      }
      answers[p.id] = selected.value;
    }

    surveyAnswers = answers;
    const top3 = calculateScores(answers);
    renderResults(top3);
  }

  function calculateScores(a) {
    const scores = {};
    Object.keys(dataPaginas).forEach(k => scores[k] = 0);

    // Reglas de puntuación
    if (a.objetivo === 'venta' && a.pagos === 'pagos') {
      scores.ecommerce += 50;
      scores.marketplace += 40;
    }
    if (a.objetivo === 'leads') {
      scores.landing += 45;
      scores.empresarial += 30;
    }
    if (a.objetivo === 'autoridad' && a.contenido === 'contenido') {
      scores.blog += 50;
      scores.educativa += 35;
    }
    if (a.objetivo === 'comunidad') {
      scores.membresia += 45;
      scores.comunidad += 50;
      scores.foro += 40;
      scores.interactiva += 30;
    }
    if (a.interactividad === 'interactividad_alta') {
      scores.reservas += 40;
      scores.membresia += 25;
      scores.ecommerce += 15;
    }
    if (a.interactividad === 'interactividad_avanzada') {
      scores.interactiva += 50;
      scores.ecommerce += 20;
    }
    if (a.contenido === 'contenido') {
      scores.blog += 35;
      scores.educativa += 30;
      scores.empresarial += 20;
      scores.noticias += 30;
      scores.informativa += 25;
    }
    if (a.pagos === 'pagos') {
      scores.ecommerce += 45;
      scores.marketplace += 35;
      scores.eventos += 20;
    }
    if (a.presupuesto === 'bajo') {
      scores.landing += 30;
      scores.blog += 25;
      scores.portafolio += 28;
    }
    if (a.presupuesto === 'medio') {
      scores.empresarial += 30;
      scores.educativa += 25;
      scores.reservas += 20;
    }
    if (a.presupuesto === 'alto') {
      scores.ecommerce += 40;
      scores.marketplace += 45;
      scores.interactiva += 35;
    }

    // Bonuses
    if (a.objetivo === 'venta' && a.interactividad === 'interactividad_alta') scores.ecommerce += 10;
    if (a.contenido === 'contenido' && a.objetivo === 'autoridad') {
      scores.blog += 10;
      scores.educativa += 10;
    }

    // Top 3
    const ranked = Object.entries(scores)
      .filter(([_, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const maxScore = ranked[0]?.[1] || 1;
    return ranked.map(([key, score]) => ({
      key,
      score,
      confidence: Math.round((score / maxScore) * 100),
      data: dataPaginas[key]
    }));
  }

  // ═══════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════
  function extractFromPrice(rangoPrecio) {
    // Extrae el primer número del rango: "Freelancer: $5,000-..." → "5,000"
    const match = rangoPrecio.match(/\$([\d,]+)/);
    return match ? match[1] : '—';
  }

  function buildStarfield(container, count = 80) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'pricing-star';
      const size = 1 + Math.random() * 2.2;
      star.style.cssText = `
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${2 + Math.random() * 4}s;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(star);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER RESULTADOS — Estilo Pricing (cards destacadas + popular)
  // ═══════════════════════════════════════════════════════════
  function renderResults(top3) {
    const form = document.getElementById('encuesta-form');
    const resultsContainer = servicesSection.querySelector('.encuesta-results');
    if (!form || !resultsContainer) return;

    const rankings = ['1º RECOMENDADA', '2º OPCIÓN', '3º OPCIÓN'];
    const rankClasses = ['rank-1', 'rank-2', 'rank-3'];
    const ctaLabels = ['EMPEZAR AHORA', 'COTIZAR', 'CONSULTAR'];

    let cardsHtml = top3.map((r, idx) => {
      const fromPrice = extractFromPrice(r.data.rangoPrecio);
      const isPopular = idx === 0;
      return `
        <article class="pricing-card glass-card ${rankClasses[idx]} ${isPopular ? 'is-popular' : ''}">
          ${isPopular ? `
            <div class="popular-tag">
              <i class="fa-solid fa-star"></i>
              <span>${rankings[idx]}</span>
            </div>
          ` : `
            <div class="rank-tag">${rankings[idx]}</div>
          `}

          <div class="pricing-card-head">
            <div class="pricing-card-icon">${r.data.icon}</div>
            <h3 class="pricing-card-title">${r.data.nombre}</h3>
            <p class="pricing-card-desc">${r.data.descripcion}</p>
          </div>

          <div class="pricing-price-block">
            <div class="pricing-price-main">
              <span class="price-currency">$</span>
              <span class="price-amount">${fromPrice}</span>
              <span class="price-period">/desde</span>
            </div>
            <p class="pricing-price-note">${r.data.rangoPrecio}</p>
          </div>

          <div class="pricing-confidence">
            <div class="confidence-label">
              <span>Compatibilidad</span>
              <span>${r.confidence}%</span>
            </div>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${r.confidence}%"></div>
            </div>
          </div>

          <ul class="pricing-features">
            ${r.data.beneficios.map(b => `
              <li>
                <span class="check-circle"><i class="fa-solid fa-check"></i></span>
                ${b}
              </li>
            `).join('')}
          </ul>

          <div class="pricing-deliverables">
            <h4>INCLUYE</h4>
            <ul>
              ${r.data.entregables.map(e => `
                <li>
                  <span class="check-mini"><i class="fa-solid fa-check"></i></span>
                  ${e}
                </li>
              `).join('')}
            </ul>
          </div>

          <a class="pricing-cta-btn ${isPopular ? 'cta-primary' : 'cta-outline'}"
             href="https://wa.me/5255223344552?text=Hola,%20me%20interesa%20una%20${encodeURIComponent(r.data.nombre)}"
             target="_blank" rel="noopener noreferrer">
            ${ctaLabels[idx]}
          </a>
        </article>
      `;
    }).join('');

    resultsContainer.innerHTML = `
      <div class="pricing-starfield" aria-hidden="true"></div>

      <header class="pricing-header">
        <h2 class="pricing-title">Top 3 Opciones Recomendadas</h2>
        <p class="pricing-subtitle">Basado en tus respuestas, estos son los tipos de páginas web que mejor encajan con tu proyecto</p>
      </header>

      <div class="pricing-grid">
        ${cardsHtml}
      </div>

      <div class="pricing-bottom-cta glass-card">
        <h3>¿Listo para tu página web?</h3>
        <p>Contáctame para una consulta personalizada y una cotización sin compromiso</p>
        <a class="btn-whatsapp" target="_blank" rel="noopener noreferrer"
           href="https://wa.me/5255223344552?text=Hola,%20quiero%20cotizar%20una%20página%20web%20basada%20en%20mis%20necesidades">
          <i class="fa-brands fa-whatsapp"></i> Cotizar por WhatsApp
        </a>
      </div>

      <button class="btn-secondary" id="btn-back-form">
        <i class="fa-solid fa-arrow-left"></i> Volver al formulario
      </button>
    `;

    // Generar starfield decorativo
    const starfield = resultsContainer.querySelector('.pricing-starfield');
    if (starfield) buildStarfield(starfield, 100);

    form.style.display = 'none';
    resultsContainer.classList.add('visible');

    document.getElementById('btn-back-form').addEventListener('click', () => {
      resultsContainer.classList.remove('visible');
      resultsContainer.innerHTML = '';
      form.style.display = '';
      window.scrollTo(0, 0);
    });

    window.scrollTo(0, 0);
  }

  // ═══════════════════════════════════════════════════════════
  // CATÁLOGO - CARRUSEL
  // ═══════════════════════════════════════════════════════════
  function renderCatalogo() {
    const container = servicesSection.querySelector('.services-catalogo .catalogo-content');
    if (!container) return;

    const keys = Object.keys(dataPaginas);

    let cardsHtml = keys.map((key, idx) => {
      const p = dataPaginas[key];
      return `
        <div class="catalogo-card ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <div class="card-inner">
            <!-- FRENTE -->
            <div class="card-front glass-card">
              <div class="card-icon">${p.icon}</div>
              <h3 class="card-title">${p.nombre}</h3>
              <p class="card-desc"><em>Si buscas...</em> ${p.descripcion}</p>
              <ul class="card-benefits">
                ${p.beneficios.map(b => `<li>✓ ${b}</li>`).join('')}
              </ul>
              <button class="btn-primary card-flip-btn" data-flip="${idx}">VER ENTREGABLES</button>
            </div>
            <!-- REVERSO -->
            <div class="card-back glass-card">
              <h3 class="card-back-title">${p.icon} ${p.nombre}</h3>
              <div class="card-back-section">
                <h4>ENTREGABLES</h4>
                <ul>
                  ${p.entregables.map(e => `<li>→ ${e}</li>`).join('')}
                </ul>
              </div>
              <div class="card-back-price">
                <h4>RANGO DE INVERSIÓN</h4>
                <p>${p.rangoPrecio}</p>
              </div>
              <button class="btn-secondary card-flip-back" data-flip-back="${idx}">← Volver</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    let dotsHtml = keys.map((_, idx) => `
      <button class="catalogo-dot ${idx === 0 ? 'active' : ''}" data-go="${idx}" aria-label="Ir a tarjeta ${idx + 1}"></button>
    `).join('');

    container.innerHTML = `
      <header class="catalogo-header">
        <h2 class="section-title">CATÁLOGO</h2>
        <p>Explora los 15 tipos de páginas web que puedo crear para ti</p>
      </header>

      <div class="catalogo-carousel">
        <button class="carousel-arrow arrow-left" aria-label="Anterior">‹</button>
        <div class="carousel-track">
          ${cardsHtml}
        </div>
        <button class="carousel-arrow arrow-right" aria-label="Siguiente">›</button>
      </div>

      <div class="catalogo-dots">
        ${dotsHtml}
      </div>

      <div class="muchas-opciones glass-card">
        <div class="muchas-imagen muchas-imagen-encuesta">
          <span class="placeholder-text">📋 Encuesta</span>
        </div>
        <div class="muchas-contenido">
          <h3>¿MUCHAS OPCIONES?</h3>
          <p>Realiza una encuesta rápida para encontrar tu página ideal</p>
          <button class="btn-primary" data-services-go="encuesta">IR A ENCUESTA →</button>
        </div>
        <div class="muchas-imagen muchas-imagen-placeholder">
          <span class="placeholder-text">Imagen por agregar</span>
        </div>
      </div>
    `;

    setupCarouselEvents();
  }

  function setupCarouselEvents() {
    const cards = servicesSection.querySelectorAll('.catalogo-card');
    const dots = servicesSection.querySelectorAll('.catalogo-dot');
    const total = cards.length;

    function goToSlide(idx) {
      currentSlide = ((idx % total) + total) % total;
      cards.forEach((c, i) => {
        c.classList.toggle('active', i === currentSlide);
        // Reset flip cuando cambia
        if (i !== currentSlide) c.classList.remove('flipped');
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    // Arrows
    servicesSection.querySelector('.arrow-left').addEventListener('click', () => goToSlide(currentSlide - 1));
    servicesSection.querySelector('.arrow-right').addEventListener('click', () => goToSlide(currentSlide + 1));

    // Dots
    dots.forEach((d, i) => d.addEventListener('click', () => goToSlide(i)));

    // Flip cards
    servicesSection.addEventListener('click', e => {
      const flipBtn = e.target.closest('[data-flip]');
      const flipBack = e.target.closest('[data-flip-back]');
      if (flipBtn) {
        const idx = +flipBtn.dataset.flip;
        cards[idx].classList.add('flipped');
      } else if (flipBack) {
        const idx = +flipBack.dataset.flipBack;
        cards[idx].classList.remove('flipped');
      }
    });

    // Keyboard
    document.addEventListener('keydown', e => {
      if (!servicesSection.querySelector('.services-catalogo.visible')) return;
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      else if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // Touch/swipe
    let startX = 0;
    const track = servicesSection.querySelector('.carousel-track');
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff < 0 ? 1 : -1));
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════
  function init() {
    // Click handlers para navegación
    servicesSection.addEventListener('click', e => {
      const goEl = e.target.closest('[data-services-go]');
      const backEl = e.target.closest('[data-services-back]');
      if (goEl) {
        e.preventDefault();
        showServicesView(goEl.dataset.servicesGo);
      } else if (backEl) {
        e.preventDefault();
        showServicesView('main');
      }
    });

    renderEncuesta();
    renderCatalogo();
  }

  init();
})();
