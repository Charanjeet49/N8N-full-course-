// ============================================================
//  LIBRARY — /library  (saare references ek jagah, filter ke saath)
// ============================================================
const cfg = require('../config');
const { modules, days } = require('../curriculum');
const { layout } = require('../layout');
const { esc, makeBuilder, yt } = require('../kit');
const { READ } = require('../games');
const LESSONS = { ...require('../lessons'), ...require('../lessons2') };

const EXTRA = [
  ['course', 'n8n Level 1 course (official, free)', 'https://docs.n8n.io/courses/level-one/', 'Beginner', 'n8n ka apna text course — Module 1–2 ke saath.'],
  ['course', 'n8n Level 2 course (official, free)', 'https://docs.n8n.io/courses/level-two/', 'Pro', 'Data structures, merging, error handling — Module 2–6 ke saath.'],
  ['course', 'n8n Advanced AI docs', 'https://docs.n8n.io/advanced-ai/', 'Pro', 'Agents, RAG, memory — Day 14–17.'],
  ['practice', 'Open-Meteo (free weather API, bina key)', 'https://open-meteo.com/', 'Beginner', 'HTTP Request practice ke liye.'],
  ['practice', 'JSONPlaceholder (fake REST API)', 'https://jsonplaceholder.typicode.com/', 'Beginner', 'GET/POST practice, bina signup.'],
  ['practice', 'ReqRes (test API with fake users)', 'https://reqres.in/', 'Beginner', 'Login/users jaisa API practice.'],
  ['practice', 'Hoppscotch (API tester in browser)', 'https://hoppscotch.io/', 'Beginner', 'Webhook ko request bhejne ke liye.'],
  ['community', 'n8n community forum', 'https://community.n8n.io/', 'Pro', 'Atak gaye? Yahan poochho — pehle search karo.'],
  ['community', 'n8n workflow templates gallery', 'https://n8n.io/workflows/', 'Practice', 'Hazaron ready workflows — import karke seekho.'],
  ['video', 'n8n official YouTube channel', 'https://www.youtube.com/@n8n-io', 'Beginner', 'Official tutorials aur feature updates.'],
];
const TYPES = { doc: '📘 Docs', course: '🎓 Courses', practice: '🧪 Practice APIs', community: '💬 Community', video: '▶ Videos', template: '🧩 Templates' };

function renderLibrary() {
  const B = makeBuilder();
  const S = [];
  const modOf = Object.fromEntries(days.map((d) => [d.day, modules.find((m) => m.id === d.module)]));
  const items = []; const seen = new Set();
  const add = (type, t, u, lvl, why, day) => { if (seen.has(u)) return; seen.add(u); items.push({ type, t, u, lvl, why, day }); };
  EXTRA.forEach(([type, t, u, lvl, why]) => add(type, t, u, lvl, why, 0));
  for (const d of days) {
    [...d.resources, ...LESSONS[d.day].docs].forEach(([t, u]) => add('doc', t, u, d.day <= 6 ? 'Beginner' : 'Pro', `Day ${d.day}: ${d.title}`, d.day));
    add('template', `Templates: "${READ[d.day][0]}"`, `https://n8n.io/workflows/?search=${encodeURIComponent(READ[d.day][0])}`, 'Practice', `Day ${d.day} se jude ready workflows`, d.day);
    LESSONS[d.day].videos.forEach((q) => add('video', q, yt(q), 'Beginner', `Day ${d.day} video search`, d.day));
  }
  S.push(B.sec({
    id: 'lib-hero', title: 'Library', head: false, cls: 'lesson-hero', group: 'Library',
    body: `<div class="reveal"><span class="eyebrow">📚 ${items.length} resources · ek jagah</span>
      <h1 class="lh-title">Library<br><span class="grad">sahi cheez, sahi level par</span></h1>
      <p class="lead">Har link par level likha hai: <b>Beginner</b> (shuru ke liye), <b>Practice</b> (haath se karke), <b>Pro</b> (gehraai). Type, module ya search se chhaant lo.</p></div>`,
  }));
  S.push(B.sec({
    id: 'library', group: 'Library', eyebrow: 'Filter', title: '🔎 Dhoondho aur padho',
    body: `<div class="lib-f reveal"><input type="search" class="lib-s" data-lib-search placeholder="Search: webhook, agent, sheets…" aria-label="Search resources">
        <div class="filters" data-lib-type><button class="active" data-v="all">Sab</button>${Object.entries(TYPES).map(([k, v]) => `<button data-v="${k}">${v}</button>`).join('')}</div>
        <div class="filters" data-lib-mod><button class="active" data-v="all">Saare modules</button>${modules.map((m) => `<button data-v="${m.no}">${m.icon} M${m.no}</button>`).join('')}</div></div>
      <p class="lib-count" data-lib-count></p>
      <div class="lib-list">${items.map((x) => `<a class="lib-i" href="${esc(x.u)}" target="_blank" rel="noopener" data-type="${x.type}" data-mod="${x.day ? modOf[x.day].no : 0}" data-text="${esc((x.t + ' ' + x.why).toLowerCase())}"><span class="lib-t">${TYPES[x.type].split(' ')[0]}</span><div><b>${esc(x.t)}</b><small>${esc(x.why)}</small></div><span class="b3-l l-${x.lvl.toLowerCase()}">${x.lvl}</span></a>`).join('')}</div>
      <p class="hint reveal">ℹ️ Links n8n ke official docs, templates aur community ke hain. Koi link na khule to <a href="/docs">Docs Hub</a> se dhoondho.</p>`,
  }));
  return layout({
    title: `Library — n8n resources (docs, templates, videos) | ${cfg.brand}`,
    desc: 'n8n course ke saare references ek jagah: docs, official courses, templates, practice APIs, community aur videos — level ke saath.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'library',
  });
}

module.exports = { renderLibrary };
