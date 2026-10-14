/**
 * Interactive Particle & Constellation Background Canvas
 * Responds dynamically to mouse coordinates, clicks, and theme switches.
 */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.animationFrameId = null;
    this.isRunning = false;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.width = this.canvas.width = parent ? parent.clientWidth : window.innerWidth;
    this.height = this.canvas.height = parent ? parent.clientHeight : window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 12000), 85);
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2 + 1.2,
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    // Track mouse within hero container
    const hero = this.canvas.parentElement;
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      hero.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      // Interactive particle ripple on click
      hero.addEventListener('click', (e) => {
        const rect = hero.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        this.spawnBurst(clickX, clickY);
        if (window.soundController) {
          window.soundController.playHover();
        }
      });
    }

    // Pause when off-screen to save battery/GPU
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.start();
          } else {
            this.stop();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(this.canvas);
    }
  }

  spawnBurst(x, y) {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        baseAlpha: 0.9,
        isBurst: true,
        life: 45
      });
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const primaryColor = isLightMode ? '79, 70, 229' : '99, 102, 241'; // Indigo
    const secondaryColor = isLightMode ? '14, 165, 233' : '56, 189, 248'; // Cyan

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Handle burst particles decay
      if (p.isBurst) {
        p.life--;
        p.baseAlpha = p.life / 45;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;
      }

      // Mouse interaction (gentle attraction / soft push)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      // Render particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${i % 2 === 0 ? primaryColor : secondaryColor}, ${p.baseAlpha})`;
      this.ctx.shadowBlur = isLightMode ? 0 : 8;
      this.ctx.shadowColor = `rgba(${primaryColor}, 0.5)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Connect near particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        const maxDist = 125;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${primaryColor}, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

window.ParticleNetwork = ParticleNetwork;
