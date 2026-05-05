(function () {
  const overlay   = document.getElementById('intro-overlay');
  if (!overlay) return;

  document.body.style.overflow = 'hidden';

  const canvas    = document.getElementById('intro-canvas');
  const ctx       = canvas.getContext('2d');
  const logoWrap  = document.getElementById('intro-logo-wrap');
  const logoImg   = document.getElementById('intro-logo-img');
  const bigLogo   = document.getElementById('intro-big-logo');
  const bigImg    = document.getElementById('intro-big-img');

  let W, H, crack;

  /* ── Generate rough hand-made crack ── */
  function makeCrack() {
    const pts = [];
    const n = 36;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      // More jagged near center, smoother at edges
      const jitter = (Math.random() - 0.5) * H * 0.038 * Math.sin(t * Math.PI);
      pts.push({ x: t * W, y: H / 2 + jitter });
    }
    return pts;
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    crack = makeCrack();
  }
  resize();
  window.addEventListener('resize', () => { resize(); redraw(); });

  let currentGap = 0;
  function redraw() { draw(currentGap); }

  /* ── Draw helper: two black panels leaving a gap ── */
  function draw(gapPx) {
    ctx.clearRect(0, 0, W, H);

    if (gapPx <= 0) {
      // Solid black + thin crack line
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      drawCrackLine(0);
      return;
    }

    // Top black panel (above crack, shifted up by gapPx)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W, 0);
    for (let i = crack.length - 1; i >= 0; i--) {
      ctx.lineTo(crack[i].x, crack[i].y - gapPx);
    }
    ctx.closePath();
    ctx.fill();

    // Bottom black panel (below crack, shifted down by gapPx)
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(W, H);
    for (let i = crack.length - 1; i >= 0; i--) {
      ctx.lineTo(crack[i].x, crack[i].y + gapPx);
    }
    ctx.closePath();
    ctx.fill();

    // Glowing crack edges
    drawCrackLine(-gapPx);
    drawCrackLine(+gapPx);
  }

  function drawCrackLine(offsetY) {
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.2;
    ctx.shadowColor = 'rgba(255,255,255,0.7)';
    ctx.shadowBlur = 5;
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    crack.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y + offsetY);
      else         ctx.lineTo(p.x, p.y + offsetY);
    });
    ctx.stroke();
    ctx.restore();
  }

  /* ── Circle helpers ── */
  function showCircle(scale, logoSrc) {
    logoWrap.style.display = 'flex';
    logoWrap.style.transform = `translate(-50%, -50%) scale(${scale})`;
    logoImg.src = 'img/' + logoSrc;
  }
  function hideCircle() { logoWrap.style.display = 'none'; }

  /* ── Big logo helpers ── */
  function showBig(logoSrc) {
    bigImg.style.animation = 'none';
    void bigImg.offsetWidth; // reflow
    bigImg.style.animation = '';
    bigImg.src = 'img/' + logoSrc;
    bigLogo.style.display = 'flex';
  }
  function hideBig() { bigLogo.style.display = 'none'; }

  /* ── Overlay background ── */
  function setBg(color, duration) {
    overlay.style.transition = duration
      ? `background ${duration}ms ease`
      : 'background 0.12s';
    overlay.style.background = color;
  }

  /* ── Hero reveal ── */
  function revealHero() {
    // Kick off hero text animations
    document.querySelectorAll('.hero-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 180);
    });
    overlay.classList.add('fade-out');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 800);
  }

  /* ── Sequence ── */
  const timers = [];
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }

  // Moment 1 — black + crack + small circle (scale 1)
  draw(0);
  showCircle(1, 'LogoHDBlack.png');
  hideBig();
  setBg('#000', 0);

  // Moment 2 — crack opens slightly, circle x2
  at(700, () => {
    currentGap = H * 0.022;
    draw(currentGap);
    showCircle(2, 'LogoHDBlack.png');
    setBg('#fff');
  });

  // Moment 3 — crack opens more, circle x3
  at(1300, () => {
    currentGap = H * 0.065;
    draw(currentGap);
    showCircle(3, 'LogoHDBlack.png');
  });

  // Moment 4 — white bg, logo fills screen (smooth 1s)
  at(1900, () => {
    ctx.clearRect(0, 0, W, H);
    hideCircle();
    showBig('LogoHDBlack.png');
    setBg('#fff', 900);
  });

  // Moment 5 — black bg, white logo
  at(3100, () => { setBg('#000', 120); showBig('LogoHDWhite.png'); });

  // Moment 6 — white bg, black logo
  at(3450, () => { setBg('#fff', 120); showBig('LogoHDBlack.png'); });

  // Moment 7 — black bg, white logo
  at(3800, () => { setBg('#000', 120); showBig('LogoHDWhite.png'); });

  // Moment 8 — pure white screen
  at(4150, () => { hideBig(); hideCircle(); setBg('#fff', 500); });

  // Moment 9 — fade out, hero reveals
  at(4750, () => revealHero());

  // Safety fallback
  at(6000, revealHero);

  // Click to skip
  overlay.addEventListener('click', () => {
    timers.forEach(clearTimeout);
    hideBig(); hideCircle();
    revealHero();
  }, { once: true });
})();
