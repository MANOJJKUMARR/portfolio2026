/**
 * Interactive Developer Terminal Easter Egg - Manojj Kumarr Naidu
 * Supports keyboard history (Up/Down), live page mutations, and custom resume commands.
 */

class PortfolioTerminal {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.body = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.toggleBtn = document.getElementById('terminal-toggle-btn');
    this.closeBtn = document.getElementById('terminal-close-btn');
    this.history = [];
    this.historyIndex = -1;

    this.init();
  }

  init() {
    if (!this.input || !this.body) return;

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.execute(cmd);
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });
  }

  isOpen() {
    return this.modal && !this.modal.classList.contains('hidden');
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    setTimeout(() => this.input.focus(), 100);
    if (window.soundController) window.soundController.playClick();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    if (window.soundController) window.soundController.playClick();
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  appendLine(html, type = 'output') {
    const div = document.createElement('div');
    div.className = `terminal-line terminal-${type} mb-1.5 leading-relaxed`;
    div.innerHTML = html;
    this.body.appendChild(div);
    this.body.scrollTop = this.body.scrollHeight;
  }

  execute(rawCmd) {
    const fullCmd = rawCmd.trim();
    const [command, ...args] = fullCmd.toLowerCase().split(' ');

    if (window.soundController) window.soundController.playBlip();

    this.appendLine(`<span class="text-indigo-400 font-mono font-semibold">guest@manojj-portfolio:~$</span> <span class="text-emerald-300 font-mono">${this.escape(fullCmd)}</span>`, 'command');

    switch (command) {
      case 'help':
        let helpText = `<div class="text-slate-300 text-xs py-1">Available interactive commands:</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">`;
        PORTFOLIO_DATA.terminalHelp.forEach(item => {
          helpText += `<div><span class="text-cyan-400 font-mono font-bold">${item.cmd.padEnd(12, ' ')}</span> <span class="text-slate-400"> - ${item.desc}</span></div>`;
        });
        helpText += `</div><div class="text-slate-500 text-[11px] mt-1">Tip: Press [Esc] to exit terminal or [~] to toggle.</div>`;
        this.appendLine(helpText);
        break;

      case 'projects':
        let projHtml = `<div class="text-xs text-slate-300 mb-1">Featured Projects & QA Deliverables:</div>`;
        PORTFOLIO_DATA.projects.forEach((p, idx) => {
          projHtml += `<div class="text-xs py-0.5"><span class="text-indigo-400 font-mono font-bold">[${idx + 1}]</span> <strong class="text-white">${p.title}</strong> - <span class="text-cyan-300">${p.tagline}</span> <span class="text-slate-500">(${p.tags.slice(0, 3).join(', ')})</span></div>`;
        });
        this.appendLine(projHtml);
        break;

      case 'skills':
        let skillsHtml = `<div class="text-xs text-slate-300 mb-1">Technical Skills & Competencies:</div>`;
        PORTFOLIO_DATA.skills.forEach(group => {
          const names = group.items.map(s => `<span class="${s.highlight ? 'text-cyan-300 font-semibold' : 'text-slate-400'}">${s.name} (${s.level}%)</span>`).join(' • ');
          skillsHtml += `<div class="text-xs py-1"><span class="text-indigo-400 font-mono font-semibold">${group.category}:</span><br/>${names}</div>`;
        });
        this.appendLine(skillsHtml);
        break;

      case 'education':
        let eduHtml = `<div class="text-xs text-slate-300 space-y-1.5 py-1">`;
        PORTFOLIO_DATA.education.forEach(edu => {
          eduHtml += `<div><strong class="text-white">${edu.degree}</strong><br/><span class="text-indigo-400">${edu.institution}</span> (${edu.period}) - <span class="text-amber-300 font-semibold">${edu.honors}</span><br/><span class="text-slate-400">${edu.description}</span></div>`;
        });
        eduHtml += `</div>`;
        this.appendLine(eduHtml);
        break;

      case 'experience':
        let expHtml = `<div class="text-xs text-slate-300 space-y-1.5 py-1">`;
        PORTFOLIO_DATA.experience.forEach(e => {
          expHtml += `<div><strong class="text-white">${e.role}</strong> @ <span class="text-indigo-400">${e.company}</span> (${e.period})<br/><span class="text-slate-400">${e.description}</span></div>`;
        });
        expHtml += `</div>`;
        this.appendLine(expHtml);
        break;

      case 'suksis':
        this.appendLine(`
          <div class="text-xs text-slate-300 space-y-1">
            <p><strong class="text-white">Kor Sukarelawan Polis Siswa/Siswi (SUKSIS)</strong> - Universiti Tun Hussein Onn Malaysia (UTHM)</p>
            <p class="text-cyan-300">Police Volunteer Corps | Mac 2023 - Aug 2026</p>
            <p class="text-slate-400">Completed intensive drills, public safety initiatives, crime prevention patrolling, crowd management, first aid, and crisis leadership under regimented police academy guidance.</p>
          </div>
        `);
        break;

      case 'bio':
        this.appendLine(`
          <div class="text-xs text-slate-300 space-y-1">
            <p><strong class="text-white">${PORTFOLIO_DATA.profile.fullName}</strong></p>
            <p class="text-cyan-300">${PORTFOLIO_DATA.profile.title}</p>
            <p class="text-slate-400">${PORTFOLIO_DATA.profile.bio}</p>
            <p class="text-emerald-400">📍 ${PORTFOLIO_DATA.profile.location} | 📞 ${PORTFOLIO_DATA.profile.phone} | ✉️ ${PORTFOLIO_DATA.profile.socials.email}</p>
          </div>
        `);
        break;

      case 'contact':
        this.appendLine(`
          <div class="text-xs text-slate-300 space-y-1">
            <div>Email: <a href="mailto:${PORTFOLIO_DATA.profile.socials.email}" class="text-cyan-400 underline">${PORTFOLIO_DATA.profile.socials.email}</a></div>
            <div>Phone: <a href="tel:${PORTFOLIO_DATA.profile.phone}" class="text-cyan-400 underline">${PORTFOLIO_DATA.profile.phone}</a></div>
            <div>Location: <span class="text-slate-300">${PORTFOLIO_DATA.profile.location}</span></div>
          </div>
        `);
        break;

      case 'hire':
        this.close();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const nameInput = document.getElementById('contact-name');
          if (nameInput) setTimeout(() => nameInput.focus(), 600);
        }
        break;

      case 'theme':
        if (window.toggleTheme) {
          const newTheme = window.toggleTheme();
          this.appendLine(`<div class="text-xs text-amber-300">Theme switched to: <strong>${newTheme}</strong></div>`);
        }
        break;

      case 'clear':
        this.body.innerHTML = '';
        this.appendLine('<div class="text-slate-500 text-xs italic">Terminal screen cleared. Type "help" for command catalog.</div>');
        break;

      default:
        this.appendLine(`<div class="text-xs text-rose-400 font-mono">zsh: command not found: ${this.escape(command)}. Type <span class="text-cyan-300 font-bold">help</span> to view available instructions.</div>`);
        break;
    }
  }

  escape(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }
}

window.PortfolioTerminal = PortfolioTerminal;
