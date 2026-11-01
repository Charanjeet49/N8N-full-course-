// ============================================================
//  LESSON PAGE — /day/:n  (har din ~17 sections, poora teaching guide)
// ============================================================
const cfg = require('../config');
const { modules, days } = require('../curriculum');
const LESSONS = { ...require('../lessons'), ...require('../lessons2') };
const { nodes } = require('../nodes');
const { layout } = require('../layout');
const { esc, pad, makeBuilder, chips, yt, flowDiagram, iconFor } = require('../kit');

const modById = Object.fromEntries(modules.map((m) => [m.id, m]));
const nodeByName = Object.fromEntries(nodes.map((n) => [n.name.toLowerCase(), n]));
const findNode = (name) => {
  const k = name.toLowerCase();
  return nodeByName[k] || nodes.find((n) => n.name.toLowerCase().startsWith(k) || k.startsWith(n.name.toLowerCase().split(' (')[0]));
};
const json = (o) => esc(JSON.stringify(o, null, 2));

function renderLesson(n) {
  const d = days.find((x) => x.day === n);
  const L = LESSONS[n];
  if (!d || !L) return null;
  const m = modById[d.module];
  const B = makeBuilder();
  const S = [];
  const G = `Day ${n}`;
  const fmt = (min) => `${Math.floor(min / 60)}:${pad(min % 60)}`;
  let acc = 0;

  // 1 HERO
  S.push(B.sec({
    id: 'lesson-hero', title: 'Lesson overview', head: false, cls: 'lesson-hero', group: G, style: `--c:${m.color}`,
    body: `<nav class="crumbs reveal"><a href="/">Home</a> / <a href="/#module-${m.no}">Module ${m.no}</a> / <b>Day ${n}</b></nav>
      <div class="lh-grid">
        <div class="reveal">
          <span class="eyebrow">Module ${m.no} · ${esc(m.title)} · ${cfg.hoursPerClass} hour class</span>
          <h1 class="lh-title"><span class="lh-day">Day ${pad(n)}</span>${esc(d.title)}</h1>
          <p class="lead">“${esc(d.hook)}”</p>
          ${chips(d.tools)}
          <div class="hero-cta"><a href="#build" class="btn btn-primary magnetic">▶ Step-by-step build</a><a href="#quiz" class="btn btn-ghost">🧠 Quiz</a><button class="btn btn-link" data-print>⬇ Notes PDF</button></div>
        </div>
        <div class="lh-ring reveal" style="--d:120ms"><div class="day-badge big"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="ring-bg"/><circle cx="60" cy="60" r="52" class="ring" style="--p:${n / cfg.totalDays}"/></svg><div><small>DAY</small><b>${pad(n)}</b><small>of ${cfg.totalDays}</small></div></div>
          <p>${Math.round((n / cfg.totalDays) * 100)}% course complete</p></div>
      </div>
      <div class="day-dots reveal">${days.map((x) => `<a href="/day/${x.day}" class="${x.day === n ? 'on' : x.day < n ? 'done' : ''}" style="--c:${modById[x.module].color}" title="Day ${x.day}: ${esc(x.title)}">${x.day}</a>`).join('')}</div>`,
  }));

  // 2 WHY
  S.push(B.sec({ id: 'why', group: G, eyebrow: 'Kyun zaroori hai', title: 'Aaj ka lesson kyun matter karta hai?', body: `<div class="why-box reveal"><span>💡</span><p>${esc(L.why)}</p></div>` }));

  // 3 OBJECTIVES
  S.push(B.sec({ id: 'objectives', group: G, eyebrow: 'Learning objectives', title: 'Class ke end tak student kya kar payega', body: `<ul class="obj">${d.topics.map((t, i) => `<li class="reveal" style="--d:${i * 60}ms"><b>${pad(i + 1)}</b>${esc(t)}</li>`).join('')}</ul>` }));

  // 4 CONCEPTS
  S.push(B.sec({ id: 'concepts', group: G, eyebrow: 'Core concepts', title: 'Concepts — simple Hinglish + real-life analogy', body: `<div class="grid g2">${L.concepts.map(([t, e, a], i) => `<div class="card concept reveal" style="--d:${i * 70}ms"><span class="kn">CONCEPT ${pad(i + 1)}</span><h3>${esc(t)}</h3><p>${esc(e)}</p><div class="analogy">🪄 <b>Analogy:</b> ${esc(a)}</div></div>`).join('')}</div>` }));

  // 5 DIAGRAM
  S.push(B.sec({ id: 'diagram', group: G, eyebrow: 'Visual', title: 'Aaj ka workflow — animated diagram', sub: 'Data left se right flow karta hai. Har dot ek item hai jo agle node mein ja raha hai.', body: `<div class="reveal">${flowDiagram(L.steps, m.color)}</div>` }));

  // 6 BUILD
  S.push(B.sec({ id: 'build', group: G, eyebrow: 'Hands-on', title: 'Step-by-step build (n8n kholo aur saath chalo)', body: `<ol class="build">${L.steps.map(([node, cfgTxt], i) => { const nd = findNode(node); return `<li class="reveal" style="--d:${i * 60}ms"><span class="b-num">${i + 1}</span><span class="b-ic">${iconFor(node)}</span><div><b>${nd ? `<a href="/nodes#${nd.id}">${esc(node)}</a>` : esc(node)}</b><p>${esc(cfgTxt)}</p></div>${nd ? `<a class="b-doc" href="${esc(nd.docs)}" target="_blank" rel="noopener">Docs ↗</a>` : ''}</li>`; }).join('')}</ol>
    <p class="hint reveal">✅ Har step ke baad <b>Execute step</b> dabao aur output panel check karo. Sab green ho to workflow ko <b>Active</b> karo.</p>` }));

  // 7 INPUT/OUTPUT
  S.push(B.sec({ id: 'example-data', group: G, eyebrow: 'Example', title: 'Sample input → output (real data jaisa)', body: `<div class="two io"><div class="code-card reveal"><div class="cc-h"><b>📥 Input</b><button class="copy" data-copy="${json(L.input)}">Copy</button></div><pre>${json(L.input)}</pre></div><div class="code-card reveal" style="--d:100ms"><div class="cc-h"><b>📤 Output</b><button class="copy" data-copy="${json(L.output)}">Copy</button></div><pre>${json(L.output)}</pre></div></div>` }));

  // 8 SNIPPET
  S.push(B.sec({ id: 'snippet', group: G, eyebrow: 'Code / expression / prompt', title: 'Aaj ka key snippet', body: `<div class="code-card reveal"><div class="cc-h"><b>⌨️ Copy karke n8n mein paste karo</b><button class="copy" data-copy="${esc(L.snippet)}">Copy</button></div><pre>${esc(L.snippet)}</pre></div>` }));

  // 9 CLASS PLAN
  S.push(B.sec({ id: 'class-plan', group: G, eyebrow: 'Teacher plan', title: '2-ghante ka minute-by-minute plan', body: `<div class="panel reveal" style="--c:${m.color}"><div class="agenda-bar">${d.agenda.map((a, i) => `<span style="flex:${a[0]};--i:${i}"></span>`).join('')}</div><ol class="agenda">${d.agenda.map((a) => { const s = acc; acc += a[0]; return `<li><time>${fmt(s)}–${fmt(acc)}</time><div><b>${esc(a[1])}</b>${a[2] ? `<small>${esc(a[2])}</small>` : ''}</div><em>${a[0]}m</em></li>`; }).join('')}</ol></div>` }));

  // 10 TEACHER SCRIPT
  S.push(B.sec({ id: 'teacher-script', group: G, eyebrow: 'For the instructor', title: 'Teacher script — class kaise lein', body: `<ul class="checks reveal">${L.teach.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` }));

  // 11 MISTAKES
  S.push(B.sec({ id: 'mistakes', group: G, eyebrow: 'Debugging', title: 'Common mistakes (aur unse kaise bachein)', body: `<div class="list-x">${L.mistakes.map((p, i) => `<div class="li bad reveal" style="--d:${i * 60}ms"><span>✕</span>${esc(p)}</div>`).join('')}</div>` }));

  // 12 TIPS
  S.push(B.sec({ id: 'pro-tips', group: G, eyebrow: 'Pro tips', title: 'Pro tips jo experts use karte hain', body: `<div class="list-x">${L.tips.map((p, i) => `<div class="li good reveal" style="--d:${i * 60}ms"><span>★</span>${esc(p)}</div>`).join('')}</div>` }));

  // 13 LAB + HOMEWORK + PRACTICE
  S.push(B.sec({ id: 'practice', group: G, eyebrow: 'Practice', title: 'Live lab, homework & practice ladder', body: `<div class="grid g2"><div class="panel lab reveal" style="--c:${m.color}"><h4>🛠 Live lab</h4><p>${esc(d.lab)}</p></div><div class="panel reveal"><h4>📝 Homework</h4><p>${esc(d.homework)}</p></div></div>
    <div class="ladder">${L.practice.map(([lvl, t], i) => `<div class="rung reveal r${i}" style="--d:${i * 90}ms"><small>${esc(lvl)}</small><p>${esc(t)}</p></div>`).join('')}</div>` }));

  // 14 QUIZ
  S.push(B.sec({ id: 'quiz', group: G, eyebrow: 'Self-check', title: 'Quick quiz — click karke check karo', body: `<div class="quiz" data-quiz>${L.quiz.map(([q, opts0, ans0, ex], i) => { const r = (n + i * 3) % opts0.length; const opts = opts0.map((_, k) => opts0[(k + r) % opts0.length]); const ans = (ans0 - r + opts0.length) % opts0.length; return `<div class="qz card reveal" data-ans="${ans}" style="--d:${i * 60}ms"><b>Q${i + 1}. ${esc(q)}</b><div class="opts">${opts.map((o, k) => `<button data-k="${k}">${String.fromCharCode(65 + k)}. ${esc(o)}</button>`).join('')}</div><p class="ex">${esc(ex || 'Sahi jawab highlighted hai.')}</p></div>`; }).join('')}<p class="qz-score" data-score>Score: 0 / ${L.quiz.length}</p></div>` }));

  // 15 VIDEOS
  S.push(B.sec({ id: 'videos', group: G, eyebrow: 'Watch', title: 'Video resources', sub: 'YouTube par latest tutorials (search links hamesha fresh results dete hain) + n8n ka official channel.', body: `<div class="grid g3">${[...L.videos.map((q) => [q, yt(q)]), ['n8n official YouTube channel', 'https://www.youtube.com/@n8n-io']].map(([t, u], i) => `<a class="card vcard reveal" href="${esc(u)}" target="_blank" rel="noopener" style="--d:${i * 70}ms"><div class="vthumb" style="--c:${m.color}"><span>▶</span></div><h3>${esc(t)}</h3><small>YouTube ↗</small></a>`).join('')}</div>` }));

  // 16 DOCS
  const allDocs = [...d.resources, ...L.docs].filter((x, i, a) => a.findIndex((y) => y[1] === x[1]) === i);
  S.push(B.sec({ id: 'docs', group: G, eyebrow: 'Official docs', title: 'n8n docs & reading list', body: `<div class="dl-list">${allDocs.map(([t, u], i) => `<a href="${esc(u)}" target="_blank" rel="noopener" class="dl reveal" style="--d:${i * 50}ms"><span>📚</span>${esc(t)}<i>↗</i></a>`).join('')}</div><p class="hint">Saare docs ek jagah: <a href="/docs">Docs Hub →</a></p>` }));

  // 17 NODES USED + NEXT
  const used = [...new Set(L.steps.map(([x]) => x))].map(findNode).filter(Boolean);
  S.push(B.sec({ id: 'nodes-used', group: G, eyebrow: 'Nodes library', title: 'Aaj kaunse nodes use hue', body: `<div class="grid g4">${used.map((nd, i) => `<a href="/nodes#${nd.id}" class="card node-mini reveal" style="--d:${i * 50}ms"><span class="nm-ic">${iconFor(nd.name)}</span><b>${esc(nd.name)}</b><small>${esc(nd.desc)}</small></a>`).join('')}</div>
    <nav class="lesson-next reveal">${n > 1 ? `<a href="/day/${n - 1}" class="btn btn-ghost">← Day ${n - 1}</a>` : '<span></span>'}<a href="/#enroll" class="btn btn-ghost">🎓 Enroll</a>${n < cfg.totalDays ? `<a href="/day/${n + 1}" class="btn btn-primary magnetic">Next: Day ${n + 1} →</a>` : '<a href="/#capstone" class="btn btn-primary">Capstone →</a>'}</nav>` }));

  return layout({
    title: `Day ${n}: ${d.title} — ${cfg.courseName} | ${cfg.brand}`,
    desc: `Day ${n} lesson (Hinglish): ${d.topics.slice(0, 3).join(', ')}. Step-by-step n8n build, examples, quiz aur docs.`,
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'lesson', label: 'lesson sections',
  });
}

module.exports = { renderLesson, lessonSectionCount: () => 17 };
