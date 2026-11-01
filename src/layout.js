// ============================================================
//  LAYOUT — har page ka common shell (head, nav, drawer, footer)
// ============================================================
const cfg = require('./config');
const { esc } = require('./kit');

const NAV = [
  ['/#curriculum', 'Curriculum', 'home'],
  ['/day/1', 'Lessons', 'lesson'],
  ['/nodes', 'Nodes Library', 'nodes'],
  ['/docs', 'Docs Hub', 'docs'],
  ['/resources', 'Resources', 'resources'],
  ['/#projects', 'Projects', 'home'],
  ['/#pricing', 'Pricing', 'home'],
  ['/#faq', 'FAQ', 'home'],
];

function brandStyle() {
  const b = cfg.brandColors;
  return `<style>:root{--pri:${b.primary};--pri2:${b.secondary};--acc:${b.accent};}</style>`;
}

function logo() {
  return cfg.logo
    ? `<a href="/" class="logo"><img src="${esc(cfg.logo)}" alt="${esc(cfg.brand)} logo" class="logo-img">${cfg.showBrandText ? `<span>${esc(cfg.brand)}</span>` : ''}</a>`
    : `<a href="/" class="logo"><span class="logo-mark">◆</span>${esc(cfg.brand)}</a>`;
}

function siteFooter() {
  return `<footer class="site-foot"><div class="wrap">
    <div class="foot">
      <div>${logo()}<p>${esc(cfg.courseName)} — ${esc(cfg.tagline)}.</p></div>
      <div><h4>Course</h4><a href="/#curriculum">Curriculum</a><a href="/day/1">Day-wise lessons</a><a href="/nodes">Nodes library</a><a href="/docs">Docs hub</a></div>
      <div><h4>Contact</h4><a href="tel:${esc(cfg.contact.phone.replace(/\s/g, ''))}">📞 ${esc(cfg.contact.phone)}</a><a href="mailto:${esc(cfg.contact.email)}">✉️ ${esc(cfg.contact.email)}</a><a href="https://wa.me/${esc(cfg.contact.whatsapp)}" target="_blank" rel="noopener">💬 WhatsApp</a></div>
      <div><h4>Enroll</h4><a href="/#pricing">Plans &amp; pricing</a><a href="/#enroll">Reserve seat</a><a href="/#faq">FAQ</a></div>
    </div>
    <p class="copy-r">© ${new Date().getFullYear()} ${esc(cfg.brand)}. n8n is a trademark of n8n GmbH; this course is independent and not affiliated with n8n GmbH.</p>
  </div></footer>`;
}

function layout({ title, desc, body, total, drawerHtml, active = 'home', schema = null, extraScript = '', footer = true, label = 'sections' }) {
  return `<!doctype html>
<html lang="hi-Latn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<meta name="theme-color" content="${esc(cfg.brandColors.primary)}">
<link rel="icon" href="${esc(cfg.favicon)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
${brandStyle()}
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
</head>
<body data-page="${active}">
<div id="preloader"><div class="pl-nodes"><i></i><i></i><i></i></div><small>Loading workflows…</small></div>
<div class="progress"><span id="progressBar"></span></div>
<canvas id="bgCanvas" aria-hidden="true"></canvas>
<div class="cursor-glow" aria-hidden="true"></div>
<header class="nav" id="nav">
  <div class="wrap nav-in">
    ${logo()}
    <nav class="nav-links" id="navLinks">${NAV.map(([h, t, p]) => `<a href="${h}" class="${p === active && p !== 'home' ? 'on' : ''}">${t}</a>`).join('')}</nav>
    <div class="nav-act">
      <button class="btn btn-ghost sm" id="openIndex" aria-label="All sections">☰ <span class="hide-sm">${total} ${label}</span></button>
      <a href="/#enroll" class="btn btn-primary sm">Enroll</a>
    </div>
  </div>
</header>
<aside class="drawer" id="drawer" aria-hidden="true"><div class="dr-in"><div class="dr-h"><b>Is page par · ${total} ${label}</b><button id="closeIndex" aria-label="Close">✕</button></div>
  <div class="dr-body"><div class="dr-g dr-pages"><h5>Pages</h5><a href="/"><span>🏠</span>Home / Brochure</a><a href="/day/1"><span>📘</span>Day-wise lessons (25)</a><a href="/nodes"><span>🧩</span>Nodes library (100)</a><a href="/docs"><span>📚</span>n8n Docs hub</a></div>${drawerHtml}</div></div></aside>
<div class="sec-indicator" id="secIndicator"><b>01</b>/<span>${total}</span></div>
<main>
${body}
</main>
${footer ? siteFooter() : ''}
<a class="wa-float" href="https://wa.me/${esc(cfg.contact.whatsapp)}?text=${encodeURIComponent('Hi, mujhe n8n course ke baare mein jaankari chahiye')}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
<button class="to-top" id="toTop" aria-label="Back to top">↑</button>
<div class="toast" id="toast"></div>
<script>window.__WA__=${JSON.stringify(cfg.contact.whatsapp)};${extraScript}</script>
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = { layout, logo };
