# 🌟 Full Dynamic & Interactive Developer Portfolio

A cutting-edge, high-performance portfolio website engineered for software engineers, architects, and creative technologists. Fully dynamic, zero build setup required, and completely customizable.

![Portfolio Preview](assets/preview.png)

---

## ⚡ Key Interactive Features

1. **Interactive Particle & Constellation Canvas**:
   - Physics-based constellation network reacting to mouse coordinates.
   - Click burst ripples and responsive theme color adjustments.
   - Automatically pauses when out of viewport to optimize battery/GPU.

2. **Dynamic Project Search & Discipline Filtering**:
   - Filter projects instantly across categories (`AI & Machine Learning`, `Full Stack & Distributed`, `Creative & 3D`, `Mobile`).
   - Real-time search bar querying titles, taglines, and tech tags simultaneously.
   - 3D card perspective tilt responding dynamically to cursor hovering.

3. **In-Depth Case Study Modal**:
   - Clicking any project opens full architecture specs, problem context, benchmarks, and direct links.
   - Smooth backdrop blur and keyboard dismissal (`Escape`).

4. **Interactive Technical Skills Matrix & Synergy Filter**:
   - Animated proficiency level bars.
   - Tech Synergy: Clicking `#tag` or "Find in Projects" instantly filters the portfolio to projects built with that technology.

5. **Interactive Experience & Career Timeline**:
   - Switchable between professional work experience and academic credentials/certifications.
   - Expandable bullet points with technology tags.

6. **Testimonials Carousel**:
   - Client and colleague endorsements with rating indicators, arrow navigation, and auto-rotation.

7. **Native Web Audio API Micro-Interactions**:
   - Zero external audio files required! Synthesizes subtle clicks, hover blips, and success chimes natively in real-time.
   - SFX Toggle with state persistence in `localStorage`.

8. **Interactive Developer CLI Terminal (`~`)**:
   - Easter egg terminal console accessible via `[~]` backquote key or the header CLI button.
   - Commands: `help`, `projects`, `skills`, `bio`, `contact`, `stats`, `hire`, `theme`, `clear`, `matrix`.
   - Command history navigation with `Up` and `Down` arrow keys.

9. **Reactive Contact Form & Direct Coordinates**:
   - Real-time character counter (`0/500`).
   - Simulated async dispatch states with feedback confirmation.
   - One-click "Copy Email to Clipboard" button.

10. **Theme Switcher (Dark & Light Mode)**:
    - High-contrast, custom-tailored dark and light palettes.
    - Automatic persistence in `localStorage`.

---

## 🚀 Quick Start

### Option 1: Direct File Opening
Double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari). No build tools or installations needed!

### Option 2: Run with Local HTTP Server
Run the following command in the project directory:

```bash
# Using Node.js (npx)
npx serve -l 3000

# Or via npm
npm start
```
Then navigate to `http://localhost:3000`.

---

## 🛠️ How to Customize with Your Own Data

All content is cleanly separated from presentation logic inside **`js/data.js`**:

1. **Profile Info**: Update your name, roles, bio, social links, and stats inside `PORTFOLIO_DATA.profile`.
2. **Projects**: Add, remove, or modify items in `PORTFOLIO_DATA.projects`.
3. **Skills**: Customize technical categories and proficiency scores in `PORTFOLIO_DATA.skills`.
4. **Career & Education**: Edit your milestones in `PORTFOLIO_DATA.experience` and `PORTFOLIO_DATA.education`.
5. **Testimonials**: Add your recommendations in `PORTFOLIO_DATA.testimonials`.

---

## 📁 Project Architecture

```
interactive-portfolio/
├── index.html           # Main semantic HTML5 markup
├── css/
│   └── styles.css       # Design system, glassmorphism, 3D tilt, and theme variables
├── js/
│   ├── data.js          # Centralized data store (easy to customize)
│   ├── particles.js     # Canvas constellation physics engine
│   ├── audio.js         # Web Audio API sound synthesizer
│   ├── terminal.js      # Interactive CLI console easter egg
│   └── main.js          # Reactive controller, filters, modals, and animations
├── package.json         # Local dev scripts
└── README.md            # Documentation and customization guide
```

---

## 🚢 Free 1-Click Deployment

- **GitHub Pages**: Push this repo to GitHub and enable GitHub Pages in Settings > Pages.
- **Vercel / Netlify / Cloudflare Pages**: Drag and drop the folder directly into the web dashboard for instant global CDN deployment.
