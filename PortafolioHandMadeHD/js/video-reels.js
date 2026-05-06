(function () {
  const grid = document.getElementById('video-reels-grid');
  if (!grid) return;

  // ═══════════════════════════════════════════════════════════
  // DATA: Videos reels (formato 9:16)
  // Reemplazar src con tus videos propios alojados (Cloudinary, Vimeo, etc.)
  // ═══════════════════════════════════════════════════════════
  const VIDEO_REELS = [
    { id: 'reel-1',  src: 'https://www.instagram.com/reel/DVsEWb7AH7G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', title: 'Cinematic Intro',     description: 'Intro cinematográfica para marca de moda',  category: 'Cinematography' },
    { id: 'reel-2',  src: 'https://media.giphy.com/media/FoVzqnSYuVCkQapqmd/giphy.mp4', title: 'Motion Graphics',    description: 'Animación de logos con efectos dinámicos',  category: 'Motion Graphics' },
    { id: 'reel-3',  src: 'https://media.giphy.com/media/R6gvnAxj2QNmE/giphy.mp4',     title: 'Urban Photography',  description: 'Reel urbano con estética minimalista',      category: 'Photography' },
    { id: 'reel-4',  src: 'https://media.giphy.com/media/xT9IgEx8SbQ0teblQE/giphy.mp4', title: 'Brand Campaign',     description: 'Campaña visual para marca emergente',       category: 'Advertising' },
    { id: 'reel-5',  src: 'https://media.giphy.com/media/l0HlQaQ899zB6HzYI/giphy.mp4', title: 'Visual Storytelling', description: 'Narrativa visual para producto digital',    category: 'Storytelling' },
    { id: 'reel-6',  src: 'https://media.giphy.com/media/xT9IglZKBSmj3Jd9B2/giphy.mp4', title: 'Product Reveal',     description: 'Reveal cinematográfico de producto',         category: 'Product' },
    { id: 'reel-7',  src: 'https://media.giphy.com/media/3o7ZfgRj8s1dJI0MQE/giphy.mp4', title: 'Travel Reel',        description: 'Travel video con transiciones suaves',      category: 'Travel' },
    { id: 'reel-8',  src: 'https://media.giphy.com/media/g9GUusdUzzWSo/giphy.mp4',     title: 'Logo Animation',     description: 'Animación de logo con kinetic typography',   category: 'Motion Graphics' },
    { id: 'reel-9',  src: 'https://media.giphy.com/media/l0HlMZYDqJO7mFmFa/giphy.mp4', title: 'Lifestyle Reel',     description: 'Lifestyle content con tono natural',         category: 'Lifestyle' },
    { id: 'reel-10', src: 'https://media.giphy.com/media/l3q2K6AIJUapQqjDO/giphy.mp4', title: 'Behind The Scenes',  description: 'BTS de sesión fotográfica',                   category: 'Documentary' },
    { id: 'reel-11', src: 'https://media.giphy.com/media/xTiTnheBCyJwPpmJOg/giphy.mp4',title: 'Event Coverage',     description: 'Cobertura de evento con estilo dinámico',    category: 'Events' },
    { id: 'reel-12', src: 'https://media.giphy.com/media/l0HlMnxLvMu9m0fgA/giphy.mp4', title: 'Food Reel',          description: 'Food content con close-ups y slowmo',         category: 'Food' },
    { id: 'reel-13', src: 'https://media.giphy.com/media/26vfW7cRefAIvaKFq/giphy.mp4', title: 'Fashion Edit',       description: 'Edit de moda con transiciones rítmicas',      category: 'Fashion' },
    { id: 'reel-14', src: 'https://media.giphy.com/media/l4Jz0fP0LnyKu8ifm/giphy.mp4', title: 'Music Visualizer',   description: 'Visualizador musical sincronizado',           category: 'Music' },
    { id: 'reel-15', src: 'https://media.giphy.com/media/3o7TKU0bYco7QixYSA/giphy.mp4',title: 'Sports Highlight',   description: 'Highlights deportivos en cámara lenta',       category: 'Sports' },
    { id: 'reel-16', src: 'https://media.giphy.com/media/FoVzqnSYuVCkQapqmd/giphy.mp4',title: 'Tech Showcase',      description: 'Showcase de producto tech con motion',        category: 'Technology' },
    { id: 'reel-17', src: 'https://media.giphy.com/media/R6gvnAxj2QNmE/giphy.mp4',     title: 'Social Reel',        description: 'Reel social con edición rítmica',             category: 'Social Media' },
    { id: 'reel-18', src: 'https://media.giphy.com/media/xT9IgEx8SbQ0teblQE/giphy.mp4',title: 'Editorial Video',    description: 'Video editorial con narrativa visual',       category: 'Editorial' },
    { id: 'reel-19', src: 'https://media.giphy.com/media/l0HlQaQ899zB6HzYI/giphy.mp4', title: 'Promo Content',      description: 'Contenido promocional para campaña digital',  category: 'Promo' },
    { id: 'reel-20', src: 'https://media.giphy.com/media/xT9IglZKBSmj3Jd9B2/giphy.mp4',title: 'Teaser Reel',        description: 'Teaser para lanzamiento de producto',         category: 'Teaser' },
  ];

  const INSTAGRAM_URL = 'https://www.instagram.com/ulises.hd';
  let initialized = false;

  // ═══════════════════════════════════════════════════════════
  // RENDER REELS
  // ═══════════════════════════════════════════════════════════
  function renderReels() {
    if (initialized) return;

    grid.innerHTML = VIDEO_REELS.map((reel, i) => `
      <div class="video-reel-card" data-index="${i}" style="--i:${i}">
        <div class="reel-inner">
          <!-- FRONT: Video -->
          <div class="reel-front">
            <video
              src="${reel.src}"
              autoplay muted loop playsinline preload="metadata"
              poster=""
            ></video>
            <div class="reel-overlay">
              <div class="play-icon">
                <i class="fa-solid fa-play"></i>
              </div>
            </div>
            <div class="reel-bottom-bar">
              <span class="reel-front-title">${reel.title}</span>
              <span class="reel-front-cat">${reel.category}</span>
            </div>
          </div>

          <!-- BACK: Info -->
          <div class="reel-back">
            <div class="reel-back-content">
              <span class="reel-cat-badge">${reel.category}</span>
              <h3 class="reel-back-title">${reel.title}</h3>
              <p class="reel-back-desc">${reel.description}</p>
              <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="reel-ig-btn">
                <i class="fab fa-instagram"></i> Ver en Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    setupEvents();
    initialized = true;

    // Trigger entry animation in next frame
    requestAnimationFrame(() => grid.classList.add('animate-in'));
  }

  // ═══════════════════════════════════════════════════════════
  // EVENTS: Flip + pause/play video
  // ═══════════════════════════════════════════════════════════
  function setupEvents() {
    grid.addEventListener('click', e => {
      // Si el click es en un link (Instagram), no flip
      if (e.target.closest('a')) return;

      const card = e.target.closest('.video-reel-card');
      if (!card) return;

      const wasFlipped = card.classList.contains('flipped');
      card.classList.toggle('flipped');

      // Pausar/play video según el estado
      const video = card.querySelector('video');
      if (video) {
        if (!wasFlipped) {
          // Ahora está flipped → pause
          try { video.pause(); } catch (e) {}
        } else {
          // Vuelve al frente → play
          try { video.play(); } catch (e) {}
        }
      }
    });

    // Pausar TODOS los videos cuando salgo de la categoría video
    // (optimización para que no consuman recursos)
    setupVisibilityControl();
  }

  // ═══════════════════════════════════════════════════════════
  // OPTIMIZACIÓN: Pausar videos cuando no están visibles
  // ═══════════════════════════════════════════════════════════
  function setupVisibilityControl() {
    const videoArticle = document.querySelector('.projects-detail[data-cat="video"]');
    if (!videoArticle) return;

    const observer = new MutationObserver(() => {
      const isActive = videoArticle.classList.contains('active');
      const videos = grid.querySelectorAll('video');
      videos.forEach(v => {
        if (isActive) {
          // Solo reanudar si la card no está flipped
          const card = v.closest('.video-reel-card');
          if (card && !card.classList.contains('flipped')) {
            try { v.play(); } catch (e) {}
          }
        } else {
          try { v.pause(); } catch (e) {}
        }
      });
    });

    observer.observe(videoArticle, { attributes: true, attributeFilter: ['class'] });
  }

  // ═══════════════════════════════════════════════════════════
  // ACTIVAR cuando el usuario entra a la categoría VIDEO
  // ═══════════════════════════════════════════════════════════
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-cat-go="video"]');
    if (trigger) {
      // Esperar a que la animación de cambio de vista termine
      setTimeout(renderReels, 350);
    }
  });

  // Si la categoría VIDEO ya está activa (caso edge), render inmediato
  if (document.querySelector('.projects-detail[data-cat="video"].active')) {
    renderReels();
  }
})();
