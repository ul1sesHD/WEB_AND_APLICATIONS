(function () {
  const isMainPage = document.querySelector('.page-section');

  if (!isMainPage) {
    /* ── index.html: hero + intro ── */
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const navLinks = document.querySelectorAll('[data-view]');
    const allSections = document.querySelectorAll('section');
    const startBtn = document.getElementById('hero-start');

    const VIEWS = {
      home:     ['about', 'contact'],
      projects: ['projects'],
      services: ['services'],
    };

    function showView(viewName) {
      const sectionIds = VIEWS[viewName];
      if (!sectionIds) return;

      allSections.forEach(s => {
        s.classList.toggle('view-active', sectionIds.includes(s.id));
      });

      navLinks.forEach(a => {
        a.classList.toggle('nav-active', a.dataset.view === viewName);
      });

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    allSections.forEach(s => s.classList.remove('view-active'));
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('view-active');

    if (startBtn) {
      startBtn.addEventListener('click', e => {
        e.preventDefault();
        navbar.classList.add('visible');
        showView('home');
      });
    }

    navLinks.forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const view = a.dataset.view;
        if (view) {
          if (!navbar.classList.contains('visible')) navbar.classList.add('visible');
          showView(view);
        }
      });
    });
  } else {
    /* ── main.html: tab navigation ── */
    const sections = document.querySelectorAll('.page-section');

    function showSection(sectionId) {
      // Ocultar todas las secciones con display: none
      sections.forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
      });

      // Mostrar la sección seleccionada
      const active = document.getElementById(sectionId);
      if (active) {
        active.style.display = 'block';
        active.classList.add('active');

        // Scroll al top
        window.scrollTo(0, 0);

        // Marcar link activo en el navbar
        document.querySelectorAll('a[data-section]').forEach(a => {
          a.classList.toggle('nav-active', a.dataset.section === sectionId);
        });
      }
    }

    document.addEventListener('click', e => {
      const link = e.target.closest('a[data-section]');
      if (link) {
        e.preventDefault();
        showSection(link.getAttribute('data-section'));
      }
    });

    // Inicializar mostrando about
    showSection('about');
  }
})();
