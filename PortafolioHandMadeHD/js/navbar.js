class MainNavbar extends HTMLElement {
  connectedCallback() {
    const isMainPage = window.location.pathname.includes('main.html') || document.querySelector('.page-section');

    if (isMainPage) {
      // main.html — navbar visible siempre, links con data-section
      this.innerHTML = `
        <nav id="navbar" class="visible">
          <div class="nav-container">
            <div class="nav-logo">
              <a href="index.html">
                <img src="img/LogoHDWhite.png" alt="HD" class="logo-img">
              </a>
            </div>
            <div class="nav-pill">
              <a href="#about"    data-section="about"    class="nav-active">SOBRE MI</a>
              <a href="#projects" data-section="projects">PROJECTS</a>
              <a href="#services" data-section="services">SERVICES</a>
              <a href="#contact"  data-section="contact">CONTACT</a>
            </div>
          </div>
        </nav>
      `;
    } else {
      // index.html — navbar oculto inicialmente, links con data-view
      this.innerHTML = `
        <nav id="navbar">
          <div class="nav-container">
            <div class="nav-logo">
              <a href="index.html">
                <img src="img/LogoHDWhite.png" alt="HD" class="logo-img">
              </a>
            </div>
            <div class="nav-pill">
              <a href="#home"     data-view="home">SOBRE MI</a>
              <a href="#projects" data-view="projects">PROJECTS</a>
              <a href="#services" data-view="services">SERVICES</a>
              <a href="#contact"  data-view="home">CONTACT</a>
            </div>
          </div>
        </nav>
      `;
    }
  }
}

customElements.define('main-navbar', MainNavbar);
