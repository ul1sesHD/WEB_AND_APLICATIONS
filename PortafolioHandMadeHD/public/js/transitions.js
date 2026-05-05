document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="/"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href && !link.classList.contains('no-transition')) {
        e.preventDefault();
        navigateTo(href);
      }
    });
  });
});

function navigateTo(href) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.href = href;
    });
  } else {
    window.location.href = href;
  }
}
