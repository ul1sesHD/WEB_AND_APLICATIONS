(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  /* ── Lighting for glass shine ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const key = new THREE.DirectionalLight(0xffffff, 3.5);
  key.position.set(6, 8, 6);
  scene.add(key);

  const fill = new THREE.PointLight(0xbbbbff, 2.5, 30);
  fill.position.set(-7, -4, 4);
  scene.add(fill);

  const rim = new THREE.PointLight(0xffffff, 2, 20);
  rim.position.set(0, 0, -6);
  scene.add(rim);

  /* ── Glass material ── */
  const glassMat = new THREE.MeshPhysicalMaterial({
    color:             0xffffff,
    metalness:         0.0,
    roughness:         0.02,
    transmission:      0.92,
    thickness:         0.55,
    ior:               1.65,
    transparent:       true,
    opacity:           0.85,
    envMapIntensity:   1.8,
  });

  /* ── Chain ring ──
     N torus links arranged in a circle.
     Adjacent links alternate 90° to interlock like a real chain.
  ── */
  const chainGroup = new THREE.Group();
  const N          = 14;    // number of links
  const ringR      = 4.0;   // radius of the circular chain
  const linkR      = 0.52;  // torus major radius
  const tube       = 0.12;  // torus tube radius

  const zAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2;
    const geo   = new THREE.TorusGeometry(linkR, tube, 14, 72);
    const mesh  = new THREE.Mesh(geo, glassMat);

    // Position link on the ring
    mesh.position.x = Math.cos(angle) * ringR;
    mesh.position.y = Math.sin(angle) * ringR;

    // Tangent direction at this point on the circle
    const tangent = new THREE.Vector3(-Math.sin(angle), Math.cos(angle), 0).normalize();

    // Default torus hole faces +Z — reorient hole to face tangent
    mesh.quaternion.setFromUnitVectors(zAxis, tangent);

    // Every other link: tilt 90° around tangent (chain interlocking)
    if (i % 2 === 0) {
      const tilt = new THREE.Quaternion().setFromAxisAngle(tangent, Math.PI / 2);
      mesh.quaternion.premultiply(tilt);
    }

    chainGroup.add(mesh);
  }

  scene.add(chainGroup);

  /* ── Mouse parallax ── */
  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    const w = canvas.parentElement?.clientWidth  || window.innerWidth;
    const h = canvas.parentElement?.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Animate ── */
  function tick() {
    requestAnimationFrame(tick);

    // Very slow 360° rotation on its own axis (Z)
    chainGroup.rotation.z += 0.0012;

    // Subtle mouse parallax on camera
    camera.position.x += (mx * 0.7 - camera.position.x) * 0.035;
    camera.position.y += (-my * 0.4 - camera.position.y) * 0.035;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  tick();
})();
