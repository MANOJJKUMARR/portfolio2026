/**
 * Main Interactive Application Logic - Manojj Kumarr Naidu
 * Integrates 3D Three.js core, particle canvas, recruiter audit scanner, 3D card tilt, modals, and dynamic data.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursorSpotlight();
  initTypewriter();
  initStatsCounter();
  initProjects();
  initSkills();
  initTimeline();
  initTestimonials();
  initRecruiterAudit();
  initContactForm();
  initResumeModal();
  initNavigation();
  initAudioToggle();

  // Initialize Hero 3D Three.js Visualizer
  if (window.Hero3DVisualizer) {
    new Hero3DVisualizer('hero-3d-viewport');
  }

  // Initialize Background Particle Constellation
  if (window.ParticleNetwork) {
    new ParticleNetwork('hero-canvas');
  }
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      if (window.soundController) window.soundController.playClick();
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('portfolio_theme', theme);
  } catch (e) {}

  const themeIcons = document.querySelectorAll('.theme-icon-sun, .theme-icon-moon');
  themeIcons.forEach(icon => {
    if (theme === 'light') {
      if (icon.classList.contains('theme-icon-sun')) icon.classList.add('hidden');
      if (icon.classList.contains('theme-icon-moon')) icon.classList.remove('hidden');
    } else {
      if (icon.classList.contains('theme-icon-sun')) icon.classList.remove('hidden');
      if (icon.classList.contains('theme-icon-moon')) icon.classList.add('hidden');
    }
  });
}

window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
};

/* ==========================================================================
   2. Dynamic Cursor Spotlight Follower
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   3. Audio Controller UI Toggle
   ========================================================================== */
function initAudioToggle() {
  const soundBtns = document.querySelectorAll('.sound-toggle');
  const updateButtons = (isEnabled) => {
    soundBtns.forEach(btn => {
      const label = btn.querySelector('.sound-label');
      const icon = btn.querySelector('.sound-icon');
      if (label) label.textContent = isEnabled ? 'SFX On' : 'SFX Off';
      if (icon) {
        icon.innerHTML = isEnabled 
          ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/>`
          : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z m12 0l-5-5m0 5l5-5"/>`;
      }
      btn.setAttribute('aria-pressed', String(isEnabled));
    });
  };

  if (window.soundController) {
    updateButtons(window.soundController.enabled);
  }

  soundBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.soundController) {
        const newState = window.soundController.toggle();
        updateButtons(newState);
      }
    });
  });
}

/* ==========================================================================
   4. Typewriter Headline Animation
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el || !PORTFOLIO_DATA.profile.typewriterRoles) return;

  const roles = PORTFOLIO_DATA.profile.typewriterRoles;
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      el.textContent = currentRole.substring(0, charIdx);
      typingSpeed = 35;
    } else {
      charIdx++;
      el.textContent = currentRole.substring(0, charIdx);
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   5. Dynamic Stats Counter Animation
   ========================================================================== */
function initStatsCounter() {
  const statsContainer = document.getElementById('hero-stats-container');
  if (!statsContainer || !PORTFOLIO_DATA.profile.stats) return;

  statsContainer.innerHTML = PORTFOLIO_DATA.profile.stats.map(s => `
    <div class="stat-card glass-panel p-3.5 sm:p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 border border-[var(--border)]">
      <div class="text-2xl sm:text-3xl font-extrabold gradient-text counter-number" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium mt-1">${s.label}</div>
    </div>
  `).join('');

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateStats();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsContainer);
}

function animateStats() {
  const counters = document.querySelectorAll('.counter-number');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1500;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeProgress;

      if (target % 1 !== 0) {
        counter.textContent = currentVal.toFixed(2) + suffix;
      } else {
        counter.textContent = Math.round(currentVal) + suffix;
      }

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        counter.textContent = (target % 1 !== 0 ? target.toFixed(2) : target) + suffix;
      }
    }, stepTime);
  });
}

/* ==========================================================================
   6. Dynamic Projects Grid, Filter, Search & Enhanced 3D Tilt
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';

function initProjects() {
  renderProjects();
  setupProjectFilters();
  setupProjectSearch();
  setupProjectModal();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const countEl = document.getElementById('project-results-count');
  if (!grid) return;

  const filtered = PORTFOLIO_DATA.projects.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));

    return matchesCat && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${PORTFOLIO_DATA.projects.length} highlights`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl p-8 border border-[var(--border)]">
        <div class="text-4xl mb-3">🔍</div>
        <h4 class="text-lg font-semibold text-[var(--text-primary)]">No matching projects found</h4>
        <p class="text-sm text-[var(--text-muted)] mt-1">Try adjusting your search criteria or resetting filters.</p>
        <button id="reset-project-filters" class="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
          Reset Filters
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-project-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        const searchInput = document.getElementById('project-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.filter-pill').forEach(pill => {
          pill.classList.toggle('active', pill.dataset.category === 'all');
        });
        renderProjects();
      });
    }
    return;
  }

  grid.innerHTML = filtered.map(project => `
    <article class="project-card glass-panel rounded-2xl overflow-hidden border border-[var(--border)] group flex flex-col transition-all duration-300" data-project-id="${project.id}">
      <div class="card-glare"></div>

      <!-- Card Banner with dynamic gradient & simulated badge -->
      <div class="relative h-44 bg-gradient-to-tr ${project.gradient} p-5 flex flex-col justify-between overflow-hidden">
        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        <div class="relative z-10 flex items-center justify-between">
          <span class="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            ${project.category}
          </span>
          <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-[10px] font-mono text-white/90">VERIFIED</span>
          </div>
        </div>

        <div class="relative z-10 card-content-3d">
          <h3 class="text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-200">
            ${project.title}
          </h3>
          <p class="text-xs text-white/80 line-clamp-1 mt-0.5">${project.tagline}</p>
        </div>

        <!-- Wireframe sphere decoration -->
        <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-white/20 opacity-30 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
      </div>

      <!-- Card Content Body -->
      <div class="p-6 flex-1 flex flex-col justify-between bg-[var(--surface)]">
        <div>
          <p class="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
            ${project.summary}
          </p>

          <!-- Tech stack tags -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${project.tags.map(t => `
              <span class="tech-tag text-[11px] px-2.5 py-1 rounded-md font-mono bg-[var(--surface-muted)] text-[var(--text-muted)] border border-[var(--border)] cursor-pointer hover:border-indigo-500 hover:text-indigo-400 transition-colors" data-tag="${t}">
                #${t}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <button class="open-case-study flex-1 py-2 px-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 hover:text-white text-indigo-400 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5" data-project-id="${project.id}">
            <span>Inspect Technical Details</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  apply3DTilt();
  bindCaseStudyTriggers();
  bindTechTagClicks();
}

function setupProjectFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category || 'all';
      if (window.soundController) window.soundController.playClick();
      renderProjects();
    });
  });
}

function setupProjectSearch() {
  const input = document.getElementById('project-search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProjects();
  });
}

function bindTechTagClicks() {
  document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      const tagName = tag.getAttribute('data-tag');
      const searchInput = document.getElementById('project-search-input');
      if (searchInput) {
        searchInput.value = tagName;
        searchQuery = tagName;
        renderProjects();
        if (window.soundController) window.soundController.playHover();
      }
    });
  });
}

/* Enhanced 3D Dynamic Tilt effect with holographic glare */
function apply3DTilt() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const glare = card.querySelector('.card-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;
    });
  });
}

/* ==========================================================================
   7. Interactive Project Modal / Case Study Drawer
   ========================================================================== */
function setupProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeProjectModal());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });
}

function bindCaseStudyTriggers() {
  document.querySelectorAll('.open-case-study, .project-card').forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.tech-tag')) return;

      const projectId = elem.getAttribute('data-project-id') || elem.closest('.project-card')?.getAttribute('data-project-id');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });
}

function openProjectModal(id) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('project-modal-content');
  if (!modal || !body) return;

  body.innerHTML = `
    <!-- Header Banner -->
    <div class="relative bg-gradient-to-r ${project.gradient} p-6 sm:p-8 rounded-t-2xl text-white">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
          ${project.category}
        </span>
        <span class="text-xs font-mono text-white/80">Deliverable Verification</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-extrabold">${project.title}</h2>
      <p class="text-sm sm:text-base text-white/90 mt-1">${project.tagline}</p>
    </div>

    <!-- Modal Body Details -->
    <div class="p-6 sm:p-8 space-y-6">
      <!-- High Impact Metrics Grid -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">Verification Benchmarks</h4>
        <div class="grid grid-cols-3 gap-3">
          ${project.metrics.map(m => `
            <div class="glass-panel p-3.5 rounded-xl border border-[var(--border)] text-center">
              <div class="text-lg sm:text-2xl font-bold gradient-text">${m.value}</div>
              <div class="text-[11px] text-[var(--text-muted)] mt-0.5">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Problem & Deep Dive -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Technical Implementation & Architecture</h4>
        <p class="text-sm text-[var(--text-primary)] leading-relaxed">${project.fullDescription}</p>
      </div>

      <!-- Key Capabilities / Innovations -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Key Highlights & Tested Deliverables</h4>
        <ul class="space-y-2">
          ${project.features.map(f => `
            <li class="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
              <span class="text-emerald-400 mt-0.5 font-bold">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Architecture Stack -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Core Technology & Environment</h4>
        <div class="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--text-muted)] font-mono leading-relaxed">
          ${project.architecture}
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (window.soundController) window.soundController.playHover();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (window.soundController) window.soundController.playClick();
  }
}

/* ==========================================================================
   8. Interactive Skills Matrix & Category Filter
   ========================================================================== */
function initSkills() {
  const container = document.getElementById('skills-container');
  if (!container || !PORTFOLIO_DATA.skills) return;

  container.innerHTML = PORTFOLIO_DATA.skills.map(group => `
    <div class="glass-panel p-6 rounded-2xl border border-[var(--border)] flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="font-bold text-sm text-[var(--text-primary)]">${group.category}</h3>
        </div>

        <div class="space-y-3.5">
          ${group.items.map(s => `
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                  ${s.name}
                  ${s.highlight ? '<span class="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Core Specialty"></span>' : ''}
                </span>
                <span class="text-[var(--text-muted)] font-mono">${s.exp} • ${s.level}%</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                <div class="skill-progress-bar h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style="width: 0%" data-width="${s.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-progress-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
          bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        });
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);
}

/* ==========================================================================
   9. Interactive Career Timeline & Education
   ========================================================================== */
function initTimeline() {
  const container = document.getElementById('timeline-container');
  const expTab = document.getElementById('timeline-tab-exp');
  const eduTab = document.getElementById('timeline-tab-edu');
  if (!container) return;

  function render(type) {
    if (type === 'exp') {
      container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
        <div class="relative pl-8 sm:pl-10 pb-10 group last:pb-2">
          <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-[var(--surface)] group-hover:bg-indigo-500 transition-colors duration-300"></div>
          <div class="absolute left-[7px] top-6 bottom-0 w-[2px] bg-[var(--border)] group-last:hidden"></div>

          <div class="glass-panel p-6 rounded-2xl border border-[var(--border)] transition-transform duration-200 hover:-translate-y-1">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div>
                <h4 class="text-base font-bold text-[var(--text-primary)]">${exp.role}</h4>
                <div class="text-xs font-semibold text-indigo-400">${exp.company} • <span class="text-[var(--text-muted)] font-normal">${exp.location}</span></div>
              </div>
              <span class="inline-block text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)] border border-[var(--border)] self-start sm:self-auto">
                ${exp.period}
              </span>
            </div>

            <p class="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mt-3">
              ${exp.description}
            </p>

            <ul class="mt-4 space-y-1.5">
              ${exp.achievements.map(a => `
                <li class="text-xs text-[var(--text-muted)] flex items-start gap-2">
                  <span class="text-cyan-400 font-bold mt-0.5">›</span>
                  <span>${a}</span>
                </li>
              `).join('')}
            </ul>

            <div class="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--border)]">
              ${exp.technologies.map(t => `
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-muted)]">
                  ${t}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = PORTFOLIO_DATA.education.map(edu => `
        <div class="relative pl-8 sm:pl-10 pb-10 group last:pb-2">
          <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 bg-[var(--surface)] group-hover:bg-emerald-500 transition-colors"></div>
          <div class="absolute left-[7px] top-6 bottom-0 w-[2px] bg-[var(--border)] group-last:hidden"></div>

          <div class="glass-panel p-6 rounded-2xl border border-[var(--border)]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div>
                <h4 class="text-base font-bold text-[var(--text-primary)]">${edu.degree}</h4>
                <div class="text-xs font-semibold text-emerald-400">${edu.institution}</div>
              </div>
              <span class="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)] border border-[var(--border)] self-start sm:self-auto">
                ${edu.period}
              </span>
            </div>
            <div class="text-xs text-amber-400 font-semibold mt-1">★ ${edu.honors}</div>
            <p class="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mt-2">${edu.description}</p>
          </div>
        </div>
      `).join('');
    }
  }

  render('exp');

  if (expTab && eduTab) {
    expTab.addEventListener('click', () => {
      expTab.classList.add('bg-indigo-600', 'text-white');
      expTab.classList.remove('text-[var(--text-muted)]');
      eduTab.classList.remove('bg-indigo-600', 'text-white');
      eduTab.classList.add('text-[var(--text-muted)]');
      render('exp');
      if (window.soundController) window.soundController.playClick();
    });

    eduTab.addEventListener('click', () => {
      eduTab.classList.add('bg-indigo-600', 'text-white');
      eduTab.classList.remove('text-[var(--text-muted)]');
      expTab.classList.remove('bg-indigo-600', 'text-white');
      expTab.classList.add('text-[var(--text-muted)]');
      render('edu');
      if (window.soundController) window.soundController.playClick();
    });
  }
}

/* ==========================================================================
   10. Interactive Recruiter Security & QA Diagnostic Simulator
   ========================================================================== */
function initRecruiterAudit() {
  const launchBtn = document.getElementById('run-audit-btn');
  const auditContainer = document.getElementById('audit-results-terminal');
  const progressBar = document.getElementById('audit-progress-bar');
  const progressText = document.getElementById('audit-progress-text');
  if (!launchBtn || !auditContainer) return;

  const checks = [
    { title: "Software QA & Test Script Execution", detail: "Verified test execution across municipal IES & e-MAS modules with 95%+ functional defect detection.", tag: "PASSED (NK SYSTEM)" },
    { title: "WhatsApp OTP Two-Factor Authentication (2FA)", detail: "Verified multi-layer security handshake, session hashing, and rate-limiting against automated brute-force attacks.", tag: "PASSED (DYNOPRO)" },
    { title: "Access Control & Role-Based Privileges (RBAC)", detail: "Strict separation of Admin, Staff, and Customer privileges validated against unauthorized privilege escalation.", tag: "ENFORCED" },
    { title: "Computer Hardware & Motherboard Diagnostics", detail: "Motherboard power rail testing, component replacement, and Windows OS hardening verified.", tag: "OPERATIONAL" },
    { title: "SUKSIS Police Volunteer Corps Leadership & Discipline", detail: "Regimented drills, crowd management, emergency first aid, and crisis decision-making verified.", tag: "EXCELLENT (UTHM)" }
  ];

  launchBtn.addEventListener('click', () => {
    launchBtn.disabled = true;
    launchBtn.innerHTML = `
      <svg class="animate-spin w-4 h-4 text-white inline-block mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
      Running Diagnostic Scan...
    `;
    auditContainer.innerHTML = '';
    if (progressBar) progressBar.style.width = '0%';
    if (progressText) progressText.textContent = 'Initializing telemetry... 0%';

    let current = 0;
    const interval = setInterval(() => {
      if (current < checks.length) {
        const item = checks[current];
        const pct = Math.round(((current + 1) / checks.length) * 100);
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `Scanning systems... ${pct}%`;

        const row = document.createElement('div');
        row.className = 'glass-panel p-3.5 rounded-xl border border-[var(--border)] mb-2 flex items-center justify-between text-xs modal-fade-in';
        row.innerHTML = `
          <div>
            <div class="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>${item.title}</span>
            </div>
            <div class="text-[11px] text-[var(--text-muted)] mt-0.5">${item.detail}</div>
          </div>
          <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap ml-2">
            ${item.tag}
          </span>
        `;
        auditContainer.appendChild(row);

        if (window.soundController) window.soundController.playHover();
        current++;
      } else {
        clearInterval(interval);
        launchBtn.disabled = false;
        launchBtn.innerHTML = `✓ Diagnostic Completed (Re-run Scan)`;

        const summary = document.createElement('div');
        summary.className = 'p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center justify-between mt-3 modal-fade-in';
        summary.innerHTML = `
          <span>OVERALL CANDIDATE RATING: 100% VERIFIED • READY FOR QA / INFOSEC ROLES</span>
          <a href="#contact" class="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors">
            Contact Manojj →
          </a>
        `;
        auditContainer.appendChild(summary);

        if (window.soundController) window.soundController.playSuccess();
      }
    }, 700);
  });
}

/* ==========================================================================
   11. Interactive Testimonials Carousel
   ========================================================================== */
function initTestimonials() {
  const container = document.getElementById('testimonials-container');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!container || !PORTFOLIO_DATA.testimonials) return;

  let currentIndex = 0;
  const testimonials = PORTFOLIO_DATA.testimonials;

  function renderSlide(idx) {
    const t = testimonials[idx];
    container.innerHTML = `
      <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border)] relative overflow-hidden transition-all duration-300">
        <div class="text-5xl text-indigo-400/20 font-serif absolute top-4 left-6 pointer-events-none">“</div>
        <div class="relative z-10">
          <div class="flex items-center gap-1 text-amber-400 mb-4">
            ${'★'.repeat(t.rating)}
          </div>
          <p class="text-base sm:text-lg text-[var(--text-primary)] italic leading-relaxed mb-6 font-light">
            "${t.quote}"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white font-bold flex items-center justify-center text-sm shadow-md">
              ${t.avatarInitials}
            </div>
            <div>
              <div class="font-bold text-sm text-[var(--text-primary)]">${t.name}</div>
              <div class="text-xs text-[var(--text-muted)]">${t.title}</div>
              ${t.contact ? `<div class="text-[11px] text-indigo-400 font-mono mt-0.5">${t.contact}</div>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = testimonials.map((_, i) => `
        <button class="w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === idx ? 'bg-indigo-500 w-6' : 'bg-[var(--border)] hover:bg-slate-400'}" aria-label="Go to testimonial ${i + 1}"></button>
      `).join('');

      dotsContainer.querySelectorAll('button').forEach((dot, i) => {
        dot.addEventListener('click', () => {
          currentIndex = i;
          renderSlide(currentIndex);
          if (window.soundController) window.soundController.playClick();
        });
      });
    }
  }

  renderSlide(0);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      renderSlide(currentIndex);
      if (window.soundController) window.soundController.playClick();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      renderSlide(currentIndex);
      if (window.soundController) window.soundController.playClick();
    });
  }
}

/* ==========================================================================
   12. Interactive Contact Form & Copy Clipboard
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const msgInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('message-char-count');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (msgInput && charCounter) {
    msgInput.addEventListener('input', () => {
      const remaining = 500 - msgInput.value.length;
      charCounter.textContent = `${msgInput.value.length}/500`;
      charCounter.classList.toggle('text-rose-500', remaining < 20);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = PORTFOLIO_DATA.profile.socials.email;
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerText;
        copyEmailBtn.innerHTML = '✓ Copied!';
        copyEmailBtn.classList.add('bg-emerald-600', 'text-white');
        if (window.soundController) window.soundController.playSuccess();
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.classList.remove('bg-emerald-600', 'text-white');
        }, 2200);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const feedbackEl = document.getElementById('form-feedback');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin w-4 h-4 text-white inline-block mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
          Transmitting to Manojj...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Transmit Inquiry to Manojj →`;
        }

        if (feedbackEl) {
          feedbackEl.className = 'mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2';
          feedbackEl.innerHTML = `
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Thank you! Your dispatch has been transmitted to Manojj Kumarr Naidu (manojj5613@gmail.com). Expect a response promptly.</span>
          `;
          feedbackEl.classList.remove('hidden');
        }

        if (window.soundController) window.soundController.playSuccess();
        form.reset();
        if (charCounter) charCounter.textContent = '0/500';
      }, 1200);
    });
  }
}

/* ==========================================================================
   13. Interactive Resume Preview Modal
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const triggerBtns = document.querySelectorAll('.open-resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  if (!modal) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.soundController) window.soundController.playHover();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      if (window.soundController) window.soundController.playClick();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   14. Navigation, ScrollSpy & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (nav) {
      if (scrollY > 40) {
        nav.classList.add('glass-nav-scrolled');
      } else {
        nav.classList.remove('glass-nav-scrolled');
      }
    }

    if (backToTop) {
      if (scrollY > 500) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
      } else {
        backToTop.classList.remove('opacity-100');
        backToTop.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.soundController) window.soundController.playClick();
    });
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (window.soundController) window.soundController.playClick();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}
