(function () {
  // Navbar compact on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(0,0,0,0.85)';
      navbar.style.backdropFilter = 'blur(24px)';
      navbar.style.padding = '0.9rem 5%';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.padding = '1.5rem 5%';
    }
  }, { passive: true });

  // Fade-in sections on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach(s => s.classList.add('fade-section'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(s => io.observe(s));

  // Project carousel
  const cards = document.querySelectorAll('.project-card');
  const dots  = document.querySelectorAll('.dot');
  const prev  = document.querySelector('.prev-btn');
  const next  = document.querySelector('.next-btn');
  let current = 0;

  function showCard(idx) {
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  showCard(0);

  prev && prev.addEventListener('click', () => {
    current = (current - 1 + cards.length) % cards.length;
    showCard(current);
  });

  next && next.addEventListener('click', () => {
    current = (current + 1) % cards.length;
    showCard(current);
  });
})();
