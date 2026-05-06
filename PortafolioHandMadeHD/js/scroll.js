(function () {
  if (!document.querySelector('.page-section')) return;

  // Navbar compacto al hacer scroll dentro de una sección
  const waitForNavbar = setInterval(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    clearInterval(waitForNavbar);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.style.padding = '0.9rem 5%';
      } else {
        navbar.style.padding = '1.5rem 5%';
      }
    }, { passive: true });
  }, 50);
})();
