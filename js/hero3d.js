/**
 * Interactive 3D Cyber Core & Holographic Security Visualizer
 * Powered by Three.js (Zero CDN, 100% Local)
 * Features: Orbit controls, mouse reactivity, wireframe morphing, particle halos, and HUD telemetry.
 */

class Hero3DVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.coreMesh = null;
    this.wireframeMesh = null;
    this.particles = null;
    this.ringGroup = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.animationFrameId = null;
    this.mode = 'cyber'; // cyber, wireframe, particles

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 420;

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 6.5;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x6366f1, 1.2);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 2.5, 50);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight2.position.set(-5, -5, 3);
    this.scene.add(pointLight2);

    // 5. Create Central 3D Objects
    this.createCore();
    this.createOrbitalRings();
    this.createParticleCloud();

    // 6. Bind Events
    this.bindEvents();

    // 7. Start Render Loop
    this.animate();
  }

  createCore() {
    this.coreGroup = new THREE.Group();

    // Inner Icosahedron (Cyber Core)
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);

    // Faceted Holographic Material
    const material = new THREE.MeshPhongMaterial({
      color: 0x1e1b4b,
      emissive: 0x312e81,
      wireframe: false,
      shininess: 90,
      transparent: true,
      opacity: 0.85,
      flatShading: true
    });
    this.coreMesh = new THREE.Mesh(geometry, material);
    this.coreGroup.add(this.coreMesh);

    // Outer Glowing Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    this.wireframeMesh = new THREE.Mesh(wireGeo, wireMat);
    this.coreGroup.add(this.wireframeMesh);

    // Security Hex Shield Node vertices
    const pointsGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.08,
      transparent: true,
      opacity: 0.9
    });
    this.nodePoints = new THREE.Points(pointsGeo, pointsMat);
    this.coreGroup.add(this.nodePoints);

    this.scene.add(this.coreGroup);
  }

  createOrbitalRings() {
    this.ringGroup = new THREE.Group();

    // Horizontal Scanning Ring
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.7
    });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 2.3;
    this.ringGroup.add(this.ring1);

    // Diagonal Quantum Ring
    const ringGeo2 = new THREE.TorusGeometry(2.55, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.55
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.x = -Math.PI / 3;
    this.ring2.rotation.y = Math.PI / 5;
    this.ringGroup.add(this.ring2);

    this.scene.add(this.ringGroup);
  }

  createParticleCloud() {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.65
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    // Interactive mouse rotation tracking
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.targetRotationY = x * 0.7;
      this.targetRotationX = -y * 0.7;
    });

    // Drag to rotate on 3D viewport
    const el = this.renderer.domElement;
    el.style.cursor = 'grab';

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      el.style.cursor = 'grabbing';
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      el.style.cursor = 'grab';
    });

    el.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      if (this.coreGroup) {
        this.coreGroup.rotation.y += deltaX * 0.01;
        this.coreGroup.rotation.x += deltaY * 0.01;
      }

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Click pulse burst
    el.addEventListener('click', () => {
      this.pulseEffect();
      if (window.soundController) window.soundController.playHover();
    });

    // Touch support for mobile / tablets
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    el.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      if (this.coreGroup) {
        this.coreGroup.rotation.y += deltaX * 0.01;
        this.coreGroup.rotation.x += deltaY * 0.01;
      }

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    el.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  pulseEffect() {
    if (!this.coreGroup) return;
    const initialScale = 1;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 0.1;
      const s = initialScale + Math.sin(progress * Math.PI) * 0.25;
      if (this.coreGroup) this.coreGroup.scale.set(s, s, s);

      if (progress >= 1) {
        clearInterval(interval);
        if (this.coreGroup) this.coreGroup.scale.set(1, 1, 1);
      }
    }, 16);
  }

  toggleWireframe() {
    if (this.wireframeMesh) {
      this.wireframeMesh.visible = !this.wireframeMesh.visible;
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Smooth lerp rotation toward mouse position
    if (!this.isDragging && this.coreGroup) {
      this.coreGroup.rotation.y += (this.targetRotationY - this.coreGroup.rotation.y) * 0.05 + 0.003;
      this.coreGroup.rotation.x += (this.targetRotationX - this.coreGroup.rotation.x) * 0.05;
      this.coreGroup.rotation.z = Math.sin(time * 0.5) * 0.08;
    }

    // Secondary animations
    if (this.wireframeMesh) {
      this.wireframeMesh.rotation.y -= 0.004;
      this.wireframeMesh.rotation.x += 0.002;
    }

    if (this.ring1) {
      this.ring1.rotation.z += 0.008;
    }
    if (this.ring2) {
      this.ring2.rotation.z -= 0.006;
    }

    if (this.particles) {
      this.particles.rotation.y += 0.0015;
      this.particles.rotation.x = Math.sin(time * 0.3) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.Hero3DVisualizer = Hero3DVisualizer;
