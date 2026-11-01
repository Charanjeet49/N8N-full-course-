// ============================================================
//  RENDERER — data se poora index.html banata hai (100 sections)
// ============================================================
const cfg = require('./config');
const C = require('./content');
const { modules, days } = require('./curriculum');
const { nodes, nodeTypes } = require('./nodes');
const { hub } = require('./pages/docs');
const { yt, iconFor } = require('./kit');
const { agendaHtml } = require('./explain');
const BUILDS = require('./buildlib').builds();

const { esc, pad, makeBuilder, cards, chips } = require('./kit');
const { layout, logo } = require('./layout');
const money = (n) => cfg.pricing.currency + Number(n).toLocaleString('en-IN');
const modById = Object.fromEntries(modules.map((m) => [m.id, m]));
let B = makeBuilder();
const sec = (o) => B.sec(o);

// ---------------- HERO WORKFLOW SVG ----------------
function heroFlow() {
  return `<svg class="hero-flow" viewBox="0 0 520 380" aria-hidden="true">
    <defs>
      <linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#ff6d5a"/><stop offset="1" stop-color="#7c5cff"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <path id="p1" class="wire" d="M95 190 C150 190 150 110 210 110"/>
    <path id="p2" class="wire" d="M95 190 C150 190 150 270 210 270"/>
    <path id="p3" class="wire" d="M300 110 C350 110 350 190 400 190"/>
    <path id="p4" class="wire" d="M300 270 C350 270 350 190 400 190"/>
    ${[['p1', 0], ['p2', .6], ['p3', 1.2], ['p4', 1.8]].map(([p, d]) => `<circle r="5" class="pulse" filter="url(#glow)"><animateMotion dur="2.4s" begin="${d}s" repeatCount="indefinite"><mpath href="#${p}"/></animateMotion></circle>`).join('')}
    <g class="fnode" transform="translate(20,150)"><rect width="76" height="80" rx="18"/><text x="38" y="38" class="ni">⚡</text><text x="38" y="64" class="nl">Webhook</text></g>
    <g class="fnode ai" transform="translate(210,70)"><rect width="90" height="80" rx="18"/><text x="45" y="38" class="ni">🤖</text><text x="45" y="64" class="nl">AI Agent</text></g>
    <g class="fnode" transform="translate(210,230)"><rect width="90" height="80" rx="18"/><text x="45" y="38" class="ni">📊</text><text x="45" y="64" class="nl">Sheets</text></g>
    <g class="fnode ok" transform="translate(400,150)"><rect width="96" height="80" rx="18"/><text x="48" y="38" class="ni">💬</text><text x="48" y="64" class="nl">WhatsApp</text></g>
    <g class="badge" transform="translate(320,20)"><rect width="150" height="34" rx="17"/><text x="75" y="22">✓ 1,284 executions</text></g>
    <g class="badge b2" transform="translate(40,320)"><rect width="170" height="34" rx="17"/><text x="85" y="22">⏱ 40 hrs/week saved</text></g>
  </svg>`;
}

// ---------------- SECTION BUILDERS ----------------
function build() {
  B = makeBuilder();
  const S = [];
  const P = cfg.pricing.plans;

  // 1 HERO
  S.push(sec({
    id: 'home', title: 'Hero', head: false, cls: 'hero', group: 'Overview',
    body: `<div class="hero-grid">
      <div class="hero-copy">
        <span class="pill reveal"><span class="dot"></span> Next batch: <b data-countdown-short="${cfg.nextBatchStart}">soon</b> · Only ${cfg.seatsPerBatch} seats</span>
        <h1 class="reveal" style="--d:80ms">Master <span class="grad">n8n</span> &amp; build<br><span class="typed" data-words='${esc(JSON.stringify(C.heroWords))}'>AI Agents</span><span class="caret">|</span></h1>
        <p class="lead reveal" style="--d:160ms">${esc(cfg.tagline)}. ${cfg.totalDays} din, ${cfg.hoursPerClass} ghante roz, 20 real projects — zero coding se production-grade AI automation tak.</p>
        <div class="hero-cta reveal" style="--d:240ms">
          <a href="#enroll" class="btn btn-primary magnetic">Reserve My Seat →</a>
          <a href="#curriculum" class="btn btn-ghost magnetic">View 25-Day Curriculum</a>
          <button class="btn btn-link" data-print>⬇ Download Brochure</button>
        </div>
        <ul class="hero-meta reveal" style="--d:320ms">
          <li><b>${cfg.totalDays}</b> Live Days</li><li><b>${cfg.totalDays * cfg.hoursPerClass}h</b> Training</li><li><b>8</b> Modules</li><li><b>Hinglish</b> Language</li>
        </ul>
      </div>
      <div class="hero-visual reveal" style="--d:200ms">${heroFlow()}</div>
    </div>
    <a href="#tools-marquee" class="scroll-hint" aria-label="Scroll"><span></span></a>`,
  }));

  // 2 MARQUEE
  S.push(sec({
    id: 'tools-marquee', title: 'Apps you will automate', head: false, cls: 'marquee-sec',
    body: `<p class="marquee-label">40+ apps jo aap course mein connect karoge</p>
      <div class="marquee"><div class="marquee-track">${[...C.marquee, ...C.marquee].map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>
      <div class="marquee rev"><div class="marquee-track">${[...C.marquee].reverse().concat([...C.marquee].reverse()).map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>`,
  }));

  // 3 STATS
  S.push(sec({
    id: 'stats', title: 'Course in numbers', eyebrow: 'By the numbers', cls: 'tight',
    body: `<div class="stats">${C.stats.map((s, i) => `<div class="stat reveal" style="--d:${i * 80}ms"><b data-count="${s.n}" data-suffix="${s.s}">0</b><span>${esc(s.l)}</span></div>`).join('')}</div>`,
  }));

  // 4 WHAT IS N8N
  S.push(sec({
    id: 'what-is-n8n', title: 'n8n kya hai? <span class="grad">Automation ka Swiss-army knife</span>', eyebrow: 'The tool',
    sub: 'n8n ek workflow automation platform hai jahan aap apps, APIs aur AI ko visually connect karke kaam ko autopilot par daal dete ho.',
    body: cards(C.whatIsN8n, (x) => `<h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 4),
  }));

  // 5 WHY NOW
  S.push(sec({
    id: 'why-now', title: 'Abhi kyun seekhein?', eyebrow: 'Market opportunity',
    sub: 'AI + automation 2026 ki sabse fast-growing skill hai — aur demand supply se kahin zyada.',
    body: cards(C.whyNow, (x) => `<div class="big-k grad">${esc(x.k)}</div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 3),
  }));

  // 6 WHO FOR
  S.push(sec({
    id: 'who-for', title: 'Yeh course kiske liye hai?', eyebrow: 'Perfect for',
    body: cards(C.personas, (x) => `<div class="ic">${x.i}</div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 3),
  }));

  // 7 PROBLEMS
  S.push(sec({
    id: 'problems', title: 'Kya aap bhi in problems se pareshaan ho?', eyebrow: 'Before the course',
    body: `<div class="list-x">${C.problems.map((p, i) => `<div class="li bad reveal" style="--d:${i * 60}ms"><span>✕</span>${esc(p)}</div>`).join('')}</div>`,
  }));

  // 8 TRANSFORMATION
  S.push(sec({
    id: 'transformation', title: 'Course ke baad aapki nayi reality', eyebrow: 'After the course',
    body: `<div class="list-x">${C.solutions.map((p, i) => `<div class="li good reveal" style="--d:${i * 60}ms"><span>✓</span>${esc(p)}</div>`).join('')}</div>`,
  }));

  // 9 AT A GLANCE
  S.push(sec({
    id: 'glance', title: 'Course at a glance', eyebrow: 'Quick overview',
    body: `<div class="glance reveal">
      ${[['🗓️', 'Duration', `${cfg.totalDays} working days (~5 weeks)`], ['⏰', 'Class time', cfg.classTime], ['📅', 'Days', cfg.classDays], ['⌛', 'Per class', `${cfg.hoursPerClass} hours live`], ['🧱', 'Modules', '8 modules · 150+ topics'], ['🗣️', 'Language', 'Hinglish'], ['🎓', 'Level', 'Beginner → Advanced'], ['📜', 'Certificate', 'Verified + Merit']].map(([i, k, v]) => `<div><span>${i}</span><small>${k}</small><b>${esc(v)}</b></div>`).join('')}
    </div>`,
  }));

  // 10 METHODOLOGY
  S.push(sec({
    id: 'method', title: 'Learn → Build → Practice → Ship', eyebrow: 'Teaching method',
    body: `<div class="steps-h">${C.methodology.map((m, i) => `<div class="step reveal" style="--d:${i * 100}ms"><div class="ic">${m.i}</div><b>${pad(i + 1)}</b><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></div>`).join('')}</div>`,
  }));

  // 11 LIVE DEMO
  S.push(sec({
    id: 'live-demo', title: 'Live workflow simulator', eyebrow: 'Try it yourself',
    sub: 'Ek scenario chuno aur <b>Execute Workflow</b> dabao — dekho n8n step-by-step kaise kaam karta hai.',
    body: `<div class="demo reveal">
      <div class="demo-tabs" role="tablist">
        <button class="active" data-scn="lead">🎯 Lead Engine</button>
        <button data-scn="support">🤖 AI Support</button>
        <button data-scn="invoice">🧾 Invoice AI</button>
      </div>
      <div class="demo-body">
        <div class="demo-canvas" id="demoCanvas"></div>
        <div class="demo-side">
          <button class="btn btn-primary" id="demoRun">▶ Execute Workflow</button>
          <pre class="demo-log" id="demoLog">// Output yahan dikhega…</pre>
        </div>
      </div>
    </div>`,
  }));

  // 12 COMPARISON
  S.push(sec({
    id: 'compare', title: 'n8n vs Zapier vs Make', eyebrow: 'Why n8n',
    body: `<div class="table-wrap reveal"><table class="tbl"><thead><tr><th>Feature</th>${C.comparison.cols.map((c, i) => `<th class="${i === 0 ? 'hl' : ''}">${c}</th>`).join('')}</tr></thead>
      <tbody>${C.comparison.rows.map((r) => `<tr>${r.map((c, i) => `<td class="${i === 1 ? 'hl' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
  }));

  // 13 SKILLS
  S.push(sec({
    id: 'skills', title: '12 skills jo aapke resume par chamkenge', eyebrow: 'Skills you gain',
    body: `<div class="skill-cloud">${C.skills.map((s, i) => `<span class="skill reveal" style="--d:${i * 40}ms">${esc(s)}</span>`).join('')}</div>`,
  }));

  // 14 ROADMAP
  S.push(sec({
    id: 'curriculum', title: '8 Modules · 25 Days · 1 Roadmap', eyebrow: 'Curriculum roadmap',
    sub: 'Har module pichhle par build karta hai. Kisi bhi module par click karke uski detail dekho.',
    body: `<div class="roadmap">${modules.map((m, i) => `<a href="#module-${m.no}" class="rm reveal" style="--c:${m.color};--d:${i * 70}ms">
        <span class="rm-no">M${m.no}</span><span class="rm-ic">${m.icon}</span>
        <b>${esc(m.title)}</b><small>Day ${m.days[0]}${m.days.length > 1 ? '–' + m.days[m.days.length - 1] : ''} · ${m.days.length * cfg.hoursPerClass} hrs</small></a>`).join('')}
      <div class="rm-line"><span></span></div></div>
      <div class="day-strip reveal">${days.map((d) => `<a href="#day-${d.day}" style="--c:${modById[d.module].color}" title="${esc(d.title)}">${d.day}</a>`).join('')}</div>`,
  }));

  // 15 CLASS FORMAT
  S.push(sec({
    id: 'class-format', title: 'Ek 2-ghante ki class kaisi hoti hai?', eyebrow: 'Class structure',
    body: `<div class="format reveal">${C.classFormat.map((f) => `<div class="fmt"><small>${esc(f.m)}</small><b>${esc(f.t)}</b><p>${esc(f.d)}</p></div>`).join('')}</div>`,
  }));

  // LESSON LIBRARY
  S.push(sec({
    id: 'lessons', title: '25 in-depth lesson pages', eyebrow: 'Day-wise teaching guide', group: 'Learning hub',
    sub: 'Har din ka alag page: concepts + analogies, animated workflow diagram, step-by-step build, example JSON, ready workflow, challenge, quiz, videos aur docs.',
    body: `<div class="lesson-grid">${days.map((d, i) => `<a href="/day/${d.day}" class="card lcard reveal" style="--c:${modById[d.module].color};--d:${(i % 5) * 50}ms"><span class="lc-day">Day ${pad(d.day)}</span><h3>${esc(d.title)}</h3><small>Module ${modById[d.module].no} · ${d.tools.slice(0, 3).map(esc).join(' · ')}</small><i>Open lesson →</i></a>`).join('')}</div>`,
  }));

  // NODE TYPES
  S.push(sec({
    id: 'node-types', title: 'n8n mein 6 type ke nodes', eyebrow: 'Nodes basics', group: 'Learning hub',
    body: `${cards(nodeTypes, (t) => `<div class="ic">${t.i}</div><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p><div class="analogy">Example: ${esc(t.ex)}</div>`, 3)}<p class="hint reveal">Poori library (${nodes.length} nodes): <a href="/nodes">Nodes Library →</a></p>`,
  }));

  // TOP 10 NODES
  S.push(sec({
    id: 'top-nodes', title: 'Top 10 nodes jo har project mein lagte hain', eyebrow: 'Must master', group: 'Learning hub',
    body: `<ol class="top10">${nodes.filter((n) => n.tier === 1).map((n, i) => `<li class="reveal" style="--d:${i * 50}ms"><b>${pad(i + 1)}</b><span>${iconFor(n.name)}</span><div><a href="/nodes#${n.id}"><h3>${esc(n.name)}</h3></a><p>${esc(n.desc)}</p></div><a href="${esc(n.docs)}" target="_blank" rel="noopener" class="b-doc">Docs ↗</a></li>`).join('')}</ol>
      <div class="hero-cta reveal"><a href="/nodes#top-50" class="btn btn-primary">Top 50 nodes dekho →</a><a href="/nodes#cat-ai" class="btn btn-ghost">AI nodes</a></div>`,
  }));

  // DOCS HUB PREVIEW
  S.push(sec({
    id: 'docs-preview', title: 'n8n official docs — organized by day', eyebrow: 'Docs hub', group: 'Learning hub',
    body: `<div class="grid g4">${hub.slice(0, 12).map((h, i) => `<a href="/docs#docs-${h.id}" class="card reveal" style="--d:${(i % 4) * 60}ms"><div class="ic">${h.i}</div><h3>${esc(h.t)}</h3><p>${esc(h.d)}</p><small class="kn">Day ${h.days.join(', ')}</small></a>`).join('')}</div>`,
  }));

  // VIDEO LIBRARY
  const vids = [['n8n beginner full course', 1], ['n8n expressions tutorial', 4], ['n8n webhook tutorial', 8], ['n8n telegram bot', 9], ['n8n ai agent tutorial', 15], ['n8n rag chatbot', 16], ['n8n self host docker', 19], ['n8n error handling', 18]];
  S.push(sec({
    id: 'video-library', title: 'Video library', eyebrow: 'Watch & learn', group: 'Learning hub',
    sub: 'Har topic ke latest YouTube tutorials + n8n ka official channel. Class ke baad revision ke liye.',
    body: `<div class="grid g4">${vids.map(([q, d], i) => `<a class="card vcard reveal" href="${esc(yt(q))}" target="_blank" rel="noopener" style="--d:${(i % 4) * 60}ms"><div class="vthumb" style="--c:${modById[days[d - 1].module].color}"><span>▶</span></div><h3>${esc(q)}</h3><small>Day ${d} · YouTube ↗</small></a>`).join('')}</div>
      <p class="hint reveal">Official channel: <a href="https://www.youtube.com/@n8n-io" target="_blank" rel="noopener">youtube.com/@n8n-io ↗</a></p>`,
  }));

  // TEACHER GUIDE
  S.push(sec({
    id: 'teach-with-site', title: 'Is website se kaise seekhein', eyebrow: 'Kaise use karein', group: 'Learning hub',
    body: `<div class="steps-h">${[['🧰', 'Day 0 setup', 'Class se pehle <a href="/setup">setup page</a> par accounts ready kar lo — 30 minute ka kaam'], ['📘', 'Har din ka page', '/day/N par kahani, examples aur ready workflow — class se pehle 10 minute dekh lo'], ['🧩', 'Saath-saath banao', 'Doosre tab mein n8n kholo; atke to "Today\'s build" se JSON copy karke aage badho'], ['✅', 'Tick + challenge', 'Din ke end mein challenge try karo aur "Day complete" tick karo — progress save hota hai']].map(([i, t, d], k) => `<div class="step reveal" style="--d:${k * 90}ms"><div class="ic">${i}</div><b>${pad(k + 1)}</b><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`,
  }));

  // 16-23 MODULES
  modules.forEach((m) => {
    const ds = days.filter((d) => d.module === m.id);
    S.push(sec({
      id: `module-${m.no}`, group: 'Modules', cls: 'module-sec', style: `--c:${m.color}`,
      eyebrow: `Module ${m.no} of 8 · Day ${m.days[0]}${m.days.length > 1 ? '–' + m.days[m.days.length - 1] : ''}`,
      title: `${m.icon} ${esc(m.title)}`, sub: esc(m.summary),
      body: `<div class="mod-grid">
        <div class="mod-out reveal"><h4>Module outcomes</h4><ul>${m.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
          <div class="mod-meta"><span>${ds.length} classes</span><span>${ds.length * cfg.hoursPerClass} hours</span><span>${ds.reduce((a, d) => a + d.topics.length, 0)} topics</span></div></div>
        <div class="mod-days">${ds.map((d, i) => `<a href="#day-${d.day}" class="mod-day reveal" style="--d:${i * 80}ms"><span>Day ${pad(d.day)}</span><b>${esc(d.title)}</b><i>→</i></a>`).join('')}</div>
      </div>`,
    }));
  });

  // 24-48 DAYS
  days.forEach((d) => {
    const m = modById[d.module];
    const total = d.agenda.reduce((a, x) => a + x[0], 0);
    S.push(sec({
      id: `day-${d.day}`, group: 'Day-wise classes', cls: 'day-sec', style: `--c:${m.color}`, head: false,
      title: `Day ${d.day}: ${esc(d.title)}`,
      body: `<div class="day">
        <div class="day-left reveal">
          <div class="day-badge"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="ring-bg"/><circle cx="60" cy="60" r="52" class="ring" style="--p:${d.day / cfg.totalDays}"/></svg><div><small>DAY</small><b>${pad(d.day)}</b><small>of ${cfg.totalDays}</small></div></div>
          <span class="sec-num">${pad(B.next())}</span>
          <span class="eyebrow">Module ${m.no} · ${esc(m.title)}</span>
          <h2 class="sec-title">${esc(d.title)}</h2>
          <p class="hook">“${esc(d.hook)}”</p>
          <h4>Aaj ke topics</h4>
          <ul class="topics">${d.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          ${chips(d.tools)}
        </div>
        <div class="day-right">
          <div class="panel reveal" style="--d:100ms"><h4>⏱ 2-hour class plan</h4>
            <div class="agenda-bar">${d.agenda.map((a, i) => `<span style="flex:${a[0]};--i:${i}" title="${esc(a[1])} (${a[0]} min)"></span>`).join('')}</div>
            ${agendaHtml(d)}
            <p class="tot">Total: ${total} minutes</p>
          </div>
          <div class="panel lab reveal" style="--d:180ms"><h4>🛠 Live lab</h4><p>${esc(d.lab)}</p><p class="lab-build">⚡ <a href="/day/${d.day}#todays-build">Ready workflow: ${esc(BUILDS[d.day].name)}</a> · <a href="${BUILDS[d.day].url}" download>JSON ⬇</a></p></div>
          <div class="panel reveal" style="--d:240ms"><h4>📝 Homework</h4><p>${esc(d.homework)}</p></div>
          <div class="panel reveal" style="--d:300ms"><h4>📚 Resources</h4><ul class="res">${d.resources.map(([t, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a></li>`).join('')}</ul></div>
          <a href="/day/${d.day}" class="btn btn-primary full-lesson">📘 Full lesson kholo — Day ${d.day} →</a>
          <nav class="day-nav">${d.day > 1 ? `<a href="#day-${d.day - 1}">← Day ${d.day - 1}</a>` : '<span></span>'}${d.day < cfg.totalDays ? `<a href="#day-${d.day + 1}">Day ${d.day + 1} →</a>` : `<a href="#projects">Projects →</a>`}</nav>
        </div>
      </div>`,
    }));
  });

  // 49 PROJECTS
  const cats = [['all', 'All'], ['basics', 'Basics'], ['business', 'Business'], ['ai', 'AI'], ['devops', 'DevOps'], ['capstone', 'Sprints']];
  S.push(sec({
    id: 'projects', title: '20 projects jo aap khud build karoge', eyebrow: 'Portfolio', group: 'Projects',
    body: `<div class="filters">${cats.map(([k, l], i) => `<button data-filter="${k}" class="${i ? '' : 'active'}">${l}</button>`).join('')}</div>
      <div class="grid g4 proj-grid">${C.projects.map((p, i) => `<a href="#day-${p.day}" class="card proj reveal" data-cat="${p.c}" style="--d:${(i % 8) * 50}ms"><span class="tag">${p.c}</span><small>Day ${p.day}</small><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></a>`).join('')}</div>`,
  }));

  // 50 CAPSTONE
  S.push(sec({
    id: 'capstone', title: 'Capstone Project', eyebrow: 'Final project', group: 'Projects',
    sub: 'Apni pasand ki real business problem choose karo aur end-to-end AI automation solution banao.',
    body: `<div class="two">
      <div class="panel reveal"><h4>💡 Sample capstone ideas</h4><ul class="topics">${C.capstone.ideas.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="panel reveal" style="--d:120ms"><h4>📏 Evaluation rubric</h4>${C.capstone.rubric.map(([t, w]) => `<div class="bar"><span>${esc(t)}</span><i><em style="--w:${w * 4}%"></em></i><b>${w}%</b></div>`).join('')}</div>
    </div>`,
  }));

  // 51 JOURNEY TIMELINE
  S.push(sec({
    id: 'journey', title: 'Aapki poori student journey', eyebrow: 'Day 0 → Day 26+', group: 'Student journey',
    body: `<div class="timeline">${C.journey.map((j, i) => `<div class="tl reveal" style="--d:${i * 80}ms"><span class="tl-dot"></span><small>${esc(j.w)}</small><h3>${esc(j.t)}</h3><p>${esc(j.d)}</p></div>`).join('')}</div>`,
  }));

  // 52-59 JOURNEY STAGES
  C.journeyStages.forEach((st, i) => {
    S.push(sec({
      id: `journey-${st.id}`, group: 'Student journey', cls: 'stage-sec' + (i % 2 ? ' alt' : ''),
      eyebrow: `Journey stage ${i + 1} of ${C.journeyStages.length}`, title: `${st.i} ${esc(st.t)}`,
      body: `<div class="stage reveal"><div class="stage-num">${pad(i + 1)}</div><ul class="checks">${st.pts.map((p, k) => `<li class="reveal" style="--d:${k * 80}ms">${esc(p)}</li>`).join('')}</ul></div>`,
    }));
  });

  // 60 CAREERS
  S.push(sec({
    id: 'careers', title: 'Career paths after this course', eyebrow: 'Careers', group: 'Career',
    sub: 'Indicative ranges — experience, city aur portfolio par depend karta hai.',
    body: cards(C.careers, (x) => `<h3>${esc(x.r)}</h3><div class="sal grad">${esc(x.s)}</div><p>${esc(x.d)}</p>`, 3),
  }));

  // 61 FREELANCE
  S.push(sec({
    id: 'freelancing', title: 'Freelancing roadmap: pehla client 30 din mein', eyebrow: 'Earn', group: 'Career',
    body: `<div class="steps-v">${C.freelanceSteps.map((s, i) => `<div class="sv reveal" style="--d:${i * 70}ms"><b>${i + 1}</b><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></div>`).join('')}</div>`,
  }));

  // 62 AGENCY
  S.push(sec({
    id: 'agency', title: 'Automation agency blueprint', eyebrow: 'Scale up', group: 'Career',
    body: cards(C.agency, (x, i) => `<b class="kn">${pad(i + 1)}</b><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 5),
  }));

  // 63 TOOLS
  S.push(sec({
    id: 'tools', title: 'Tools & integrations covered', eyebrow: 'Tech stack', group: 'Resources',
    body: `<div class="grid g4">${C.toolGroups.map((g, i) => `<div class="card reveal" style="--d:${i * 60}ms"><h3>${esc(g.g)}</h3>${chips(g.items)}</div>`).join('')}</div>`,
  }));

  // 64 RESOURCE LIBRARY
  S.push(sec({
    id: 'resources', title: 'Resource library', eyebrow: 'Everything included', group: 'Resources',
    body: cards(C.resourceLibrary, (x) => `<div class="ic">${x.i}</div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 4),
  }));

  // 65 DOWNLOADS
  S.push(sec({
    id: 'downloads', title: 'Free downloads', eyebrow: 'Get started today', group: 'Resources',
    sub: 'Form bharo aur yeh sab resources WhatsApp/email par pao.',
    body: `<div class="dl-list">${C.downloads.map(([t, k], i) => `<a href="${k === 'brochure' ? '#' : '#enroll'}" ${k === 'brochure' ? 'data-print' : ''} class="dl reveal" style="--d:${i * 60}ms"><span>⬇</span>${esc(t)}<i>→</i></a>`).join('')}</div>`,
  }));

  // 66 TEMPLATE PACKS
  S.push(sec({
    id: 'templates', title: '120+ workflow templates vault', eyebrow: 'Templates', group: 'Resources',
    body: `<div class="grid g4">${C.templatePacks.map((t, i) => `<div class="card pack reveal" style="--d:${i * 50}ms"><b data-count="${t.n}">0</b><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p></div>`).join('')}</div>`,
  }));

  // 67 PROMPTS
  S.push(sec({
    id: 'prompts', title: 'AI prompt library (preview)', eyebrow: 'Prompts', group: 'Resources',
    body: `<div class="grid g2">${C.prompts.map((p, i) => `<div class="card code-card reveal" style="--d:${i * 70}ms"><div class="cc-h"><b>${esc(p.t)}</b><button class="copy" data-copy="${esc(p.p)}">Copy</button></div><pre>${esc(p.p)}</pre></div>`).join('')}</div>`,
  }));

  // 68 CHEAT SHEET
  S.push(sec({
    id: 'cheatsheet', title: 'Expressions cheat sheet (preview)', eyebrow: 'Cheat sheet', group: 'Resources',
    body: `<div class="table-wrap reveal"><table class="tbl mono"><thead><tr><th>Expression</th><th>Kya karta hai</th><th></th></tr></thead><tbody>${C.cheatsheet.map(([e, d]) => `<tr><td><code>${esc(e)}</code></td><td>${esc(d)}</td><td><button class="copy" data-copy="${esc(e)}">Copy</button></td></tr>`).join('')}</tbody></table></div>`,
  }));

  // 69 OFFICIAL LINKS
  S.push(sec({
    id: 'official', title: 'Official docs & learning links', eyebrow: 'Bookmarks', group: 'Resources',
    body: `<div class="dl-list">${C.officialLinks.map(([t, u], i) => `<a href="${esc(u)}" target="_blank" rel="noopener" class="dl reveal" style="--d:${i * 50}ms"><span>🔗</span>${esc(t)}<i>↗</i></a>`).join('')}</div>`,
  }));

  // 70 SELF HOST
  S.push(sec({
    id: 'self-host', title: 'Self-host n8n in 6 steps', eyebrow: 'Day 19 preview', group: 'Resources',
    body: `<div class="terminal reveal"><div class="term-h"><i></i><i></i><i></i><span>n8n-setup.sh</span></div>
      ${C.selfHostSteps.map((s, i) => `<div class="term-l"><span class="pr">${i + 1}.</span><b>${esc(s.t)}</b><code>${esc(s.c)}</code></div>`).join('')}</div>`,
  }));

  // 71 REQUIREMENTS
  S.push(sec({
    id: 'requirements', title: 'Kya chahiye? (Requirements)', eyebrow: 'Setup', group: 'Before you start',
    body: cards(C.requirements, (x) => `<h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 3),
  }));

  // 72 PRE CHECKLIST
  S.push(sec({
    id: 'checklist', title: 'Pre-course checklist', eyebrow: 'Tick karte jao', group: 'Before you start',
    sub: 'Interactive checklist — aapka progress isi browser mein save rehta hai.',
    body: `<div class="check-ui reveal"><div class="cprog"><span id="cprogBar"></span></div><p id="cprogTxt">0 / ${C.preChecklist.length} done</p>
      <div class="grid g4">${C.preChecklist.map((c, i) => `<label class="cbox"><input type="checkbox" data-ck="${i}"><span></span>${esc(c)}</label>`).join('')}</div></div>`,
  }));

  // 73 ASSESSMENTS
  S.push(sec({
    id: 'assessments', title: 'Assessments & grading', eyebrow: 'How you are evaluated', group: 'Certification',
    body: `<div class="assess">${C.assessments.map((a, i) => `<div class="as reveal" style="--d:${i * 70}ms"><b>${esc(a.w)}</b><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></div>`).join('')}</div>`,
  }));

  // 74 CERT LEVELS
  S.push(sec({
    id: 'cert-levels', title: 'Certification levels', eyebrow: 'Earn it', group: 'Certification',
    body: cards(C.certLevels, (x, i) => `<div class="medal m${i}">${['🥉', '🥈', '🥇'][i]}</div><h3>${esc(x.t)}</h3><p>${esc(x.r)}</p>`, 3),
  }));

  // 75 CERT PREVIEW
  S.push(sec({
    id: 'certificate', title: 'Aapka certificate', eyebrow: 'Preview', group: 'Certification',
    body: `<div class="cert tilt reveal"><div class="cert-in">
      <small>${esc(cfg.brand)}</small><h3>Certificate of Completion</h3><p>This certifies that</p>
      <div class="cert-name">Your Name</div>
      <p>has successfully completed the <b>${esc(cfg.courseName)}</b> program — ${cfg.totalDays} live classes, ${cfg.totalDays * cfg.hoursPerClass} hours, 20 projects &amp; capstone.</p>
      <div class="cert-f"><span>Lead Instructor</span><span class="seal">n8n<br>PRO</span><span>Certificate ID: AS-N8N-XXXX</span></div>
    </div></div>`,
  }));

  // 76 INSTRUCTOR
  S.push(sec({
    id: 'instructor', title: 'Meet your mentor', eyebrow: 'Instructor', group: 'Support',
    body: `<div class="mentor reveal"><div class="avatar"><span>👨‍🏫</span></div><div><h3>${esc(cfg.instructor.name)}</h3><small>${esc(cfg.instructor.title)}</small><p>${esc(cfg.instructor.bio)}</p>${chips(cfg.instructor.highlights)}</div></div>`,
  }));

  // 77 SUPPORT
  S.push(sec({
    id: 'support', title: 'Aap kabhi akele nahi atkoge', eyebrow: 'Mentor support', group: 'Support',
    body: cards(C.support, (x) => `<div class="ic">${x.i}</div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 3),
  }));

  // 78 COMMUNITY
  S.push(sec({
    id: 'community', title: 'Community & network', eyebrow: 'Tribe', group: 'Support',
    body: cards(C.community, (x) => `<h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 4),
  }));

  // 79 LIVE FEATURES
  S.push(sec({
    id: 'live-classes', title: 'Live class experience', eyebrow: 'Inside the classroom', group: 'Support',
    body: cards(C.liveFeatures, (x) => `<h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 4),
  }));

  // 80 LMS
  S.push(sec({
    id: 'lms', title: 'Recordings & LMS access', eyebrow: 'Learn anytime', group: 'Support',
    body: `<div class="two"><div class="lms-mock reveal"><div class="lm-top"><i></i><i></i><i></i></div><div class="lm-b"><div class="lm-side">${days.slice(0, 8).map((d) => `<span>Day ${d.day}</span>`).join('')}</div><div class="lm-main"><div class="lm-video">▶</div><div class="lm-prog"><span></span></div></div></div></div>
      <ul class="checks reveal" style="--d:120ms">${C.lms.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`,
  }));

  // 81 BONUSES
  const bonusTotal = C.bonuses.reduce((a, b) => a + Number(b.v.replace(/\D/g, '')), 0);
  S.push(sec({
    id: 'bonuses', title: `Bonuses worth ${money(bonusTotal)} — FREE`, eyebrow: 'Exclusive bonuses', group: 'Offer',
    body: cards(C.bonuses, (x) => `<span class="worth">Worth ${esc(x.v)}</span><h3>🎁 ${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 3),
  }));

  // 82 HACKATHON
  S.push(sec({
    id: 'hackathon', title: 'Hackathon & Demo Day', eyebrow: 'Compete & showcase', group: 'Projects',
    body: cards(C.hackathon, (x) => `<h3>🏁 ${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 4),
  }));

  // 83 INDUSTRIES
  S.push(sec({
    id: 'industries', title: 'Har industry mein automation', eyebrow: 'Use cases', group: 'Projects',
    body: cards(C.industries, (x) => `<div class="ic">${x.i}</div><h3>${esc(x.t)}</h3><ul class="mini">${x.u.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>`, 4),
  }));

  // 84 AI SPOTLIGHT
  S.push(sec({
    id: 'ai-spotlight', title: 'AI Agents spotlight', eyebrow: 'Module 5 deep-dive', group: 'Projects', cls: 'ai-sec',
    body: `<div class="orbit reveal"><div class="core">🤖<small>AI Agent</small></div>${C.aiSpotlight.map((x, i) => `<div class="sat" style="--i:${i};--n:${C.aiSpotlight.length}"><b>${esc(x.t)}</b><small>${esc(x.d)}</small></div>`).join('')}</div>`,
  }));

  // 85 TESTIMONIALS
  S.push(sec({
    id: 'testimonials', title: 'Students kya kehte hain', eyebrow: 'Reviews', group: 'Social proof',
    body: `<div class="slider reveal" data-slider><div class="slides">${C.testimonials.map((t) => `<figure class="tcard"><div class="stars">${'★'.repeat(t.s)}</div><blockquote>“${esc(t.q)}”</blockquote><figcaption><b>${esc(t.n)}</b><small>${esc(t.r)}</small></figcaption></figure>`).join('')}</div>
      <div class="sl-ctrl"><button data-prev aria-label="Previous">←</button><div class="sl-dots"></div><button data-next aria-label="Next">→</button></div></div>`,
  }));

  // 86 STORIES
  S.push(sec({
    id: 'stories', title: 'Success stories', eyebrow: 'Transformations', group: 'Social proof',
    body: cards(C.stories, (x) => `<div class="big-k grad">${esc(x.b)}</div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 3),
  }));

  // 87 INCOME CALCULATOR
  S.push(sec({
    id: 'income-calc', title: 'Freelance income estimator', eyebrow: 'Calculator', group: 'Calculators',
    body: `<div class="calc reveal" data-calc="income">
      <label>Projects per month <output>3</output><input type="range" min="1" max="15" value="3" name="p"></label>
      <label>Average project price (₹) <output>15000</output><input type="range" min="5000" max="100000" step="5000" value="15000" name="v"></label>
      <label>Retainer clients <output>2</output><input type="range" min="0" max="20" value="2" name="r"></label>
      <label>Retainer per client / month (₹) <output>8000</output><input type="range" min="2000" max="50000" step="1000" value="8000" name="rv"></label>
      <div class="calc-out"><small>Estimated monthly income</small><b id="incomeOut">₹0</b><small id="incomeYr"></small></div>
    </div>`,
  }));

  // 88 ROI CALCULATOR
  S.push(sec({
    id: 'roi-calc', title: 'Business ROI calculator', eyebrow: 'Calculator', group: 'Calculators',
    sub: 'Business owners: dekhiye automation se kitna time aur paisa bach sakta hai.',
    body: `<div class="calc reveal" data-calc="roi">
      <label>Manual hours per week (team) <output>20</output><input type="range" min="2" max="200" value="20" name="h"></label>
      <label>Cost per hour (₹) <output>300</output><input type="range" min="100" max="3000" step="50" value="300" name="c"></label>
      <label>% automatable <output>60</output><input type="range" min="10" max="95" value="60" name="a"></label>
      <div class="calc-out"><small>Yearly savings</small><b id="roiOut">₹0</b><small id="roiHrs"></small></div>
    </div>`,
  }));

  // 89 BATCHES
  S.push(sec({
    id: 'batches', title: 'Upcoming batches', eyebrow: 'Schedule', group: 'Offer',
    body: `<div class="countdown reveal" data-countdown="${cfg.nextBatchStart}">${['Days', 'Hours', 'Minutes', 'Seconds'].map((u) => `<div><b data-u="${u[0].toLowerCase()}">00</b><small>${u}</small></div>`).join('')}</div>
      <div class="grid g3">${C.batches.map((b, i) => `<div class="card batch reveal" style="--d:${i * 80}ms"><span class="tag">${esc(b.seats)}</span><h3>${esc(b.name)}</h3><p>🗓 Starts ${esc(b.start)}</p><p>⏰ ${esc(b.time)}</p><a href="#enroll" class="btn btn-ghost sm">Book seat</a></div>`).join('')}</div>`,
  }));

  // 90 PRICING
  S.push(sec({
    id: 'pricing', title: 'Simple, transparent pricing', eyebrow: 'Plans', group: 'Offer',
    body: `<div class="grid g3 pricing">${P.map((p, i) => `<div class="price card reveal ${p.featured ? 'feat' : ''}" style="--d:${i * 100}ms">
      <span class="tag">${esc(p.tag)}</span><h3>${esc(p.name)}</h3>
      <div class="amt"><s>${money(p.mrp)}</s><b>${money(p.price)}</b><small>${Math.round((1 - p.price / p.mrp) * 100)}% off · incl. GST</small></div>
      <ul>${p.features.map((f) => `<li>✓ ${esc(f)}</li>`).join('')}${p.missing.map((f) => `<li class="no">✕ ${esc(f)}</li>`).join('')}</ul>
      <a href="#enroll" data-plan="${p.id}" class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'} magnetic">Choose ${esc(p.name)}</a></div>`).join('')}</div>`,
  }));

  // 91 EMI
  S.push(sec({
    id: 'payment', title: 'Payment & EMI options', eyebrow: 'Easy payments', group: 'Offer',
    body: cards(C.emi, (x) => `<h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>`, 4),
  }));

  // 92 GUARANTEE
  S.push(sec({
    id: 'guarantee', title: esc(C.guarantee.t), eyebrow: 'Zero risk', group: 'Offer',
    body: `<div class="guar reveal"><div class="shield">🛡️</div><p>${esc(C.guarantee.d)}</p></div>`,
  }));

  // 93 SELF VS COURSE
  S.push(sec({
    id: 'vs-youtube', title: 'YouTube se khud seekhna vs yeh course', eyebrow: 'Honest comparison', group: 'Offer',
    body: `<div class="table-wrap reveal"><table class="tbl"><thead><tr><th></th><th>Self-learning</th><th class="hl">${esc(cfg.courseName)}</th></tr></thead><tbody>${C.selfVsCourse.map(([a, b, c]) => `<tr><td><b>${esc(a)}</b></td><td>✕ ${esc(b)}</td><td class="hl">✓ ${esc(c)}</td></tr>`).join('')}</tbody></table></div>`,
  }));

  // 94 FAQ
  S.push(sec({
    id: 'faq', title: 'Frequently asked questions', eyebrow: 'FAQ', group: 'Help',
    body: `<div class="faq">${C.faqs.map(([q, a], i) => `<details class="reveal" style="--d:${(i % 6) * 50}ms"${i === 0 ? ' open' : ''}><summary>${esc(q)}<i>+</i></summary><p>${esc(a)}</p></details>`).join('')}</div>`,
  }));

  // 95 GLOSSARY
  S.push(sec({
    id: 'glossary', title: 'n8n glossary', eyebrow: 'Jargon buster', group: 'Help',
    body: `<input class="search" id="glossSearch" placeholder="Search terms…"><div class="gloss">${C.glossary.map(([t, d]) => `<div class="gl reveal"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>`,
  }));

  // 96 RULES
  S.push(sec({
    id: 'rules', title: 'Class code of conduct', eyebrow: 'House rules', group: 'Help',
    body: `<ol class="rules">${C.rules.map((r, i) => `<li class="reveal" style="--d:${i * 60}ms">${esc(r)}</li>`).join('')}</ol>`,
  }));

  // 97 ENROLL STEPS
  S.push(sec({
    id: 'how-to-enroll', title: 'Enroll kaise karein? 4 simple steps', eyebrow: 'Process', group: 'Enroll',
    body: `<div class="steps-h">${C.enrollSteps.map((m, i) => `<div class="step reveal" style="--d:${i * 100}ms"><b>${pad(i + 1)}</b><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></div>`).join('')}</div>`,
  }));

  // 98 ENROLL FORM
  S.push(sec({
    id: 'enroll', title: 'Reserve your seat', eyebrow: 'Enroll now', group: 'Enroll', cls: 'enroll-sec',
    sub: 'Form bharo — hamari team 24 ghante ke andar call karegi. Free brochure + setup guide turant milega.',
    body: `<form class="form reveal" id="enrollForm" novalidate>
      <div class="f2"><label>Full name<input name="name" required minlength="2" autocomplete="name"></label>
      <label>Phone (WhatsApp)<input name="phone" required pattern="[0-9+ ]{10,15}" inputmode="tel" autocomplete="tel"></label></div>
      <div class="f2"><label>Email<input name="email" type="email" required autocomplete="email"></label>
      <label>Plan<select name="plan">${P.map((p) => `<option value="${p.id}" ${p.featured ? 'selected' : ''}>${esc(p.name)} — ${money(p.price)}</option>`).join('')}</select></label></div>
      <div class="f2"><label>You are a…<select name="profile">${C.personas.map((p) => `<option>${esc(p.t)}</option>`).join('')}</select></label>
      <label>Preferred batch<select name="batch">${C.batches.map((b) => `<option>${esc(b.name)} — ${esc(b.start)}</option>`).join('')}</select></label></div>
      <label>Aap automation se kya banana chahte ho? (optional)<textarea name="goal" rows="3"></textarea></label>
      <input type="text" name="company" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn-primary magnetic" type="submit">Reserve My Seat →</button>
      <p class="form-msg" id="formMsg" role="status"></p>
    </form>`,
  }));

  // 99 FINAL CTA
  S.push(sec({
    id: 'final-cta', title: 'Final CTA', head: false, cls: 'final', group: 'Enroll',
    body: `<div class="final-in reveal"><span class="eyebrow">${pad(B.next())} · Last step</span><h2>25 din baad aap kya ban sakte ho?<br><span class="grad">AI Automation Expert.</span></h2>
      <p>Seats limited hain — ${cfg.seatsPerBatch} per batch. Agla batch shuru hone mein:</p>
      <div class="countdown" data-countdown="${cfg.nextBatchStart}">${['Days', 'Hours', 'Minutes', 'Seconds'].map((u) => `<div><b data-u="${u[0].toLowerCase()}">00</b><small>${u}</small></div>`).join('')}</div>
      <a href="#enroll" class="btn btn-primary btn-lg magnetic">Start My Automation Journey →</a></div>`,
  }));

  // 100 CONTACT / FOOTER
  S.push(sec({
    id: 'contact', title: 'Contact & footer', head: false, cls: 'footer', group: 'Enroll',
    body: `<div class="foot">
      <div>${logo()}<p>${esc(cfg.courseName)} — ${esc(cfg.tagline)}.</p><span class="sec-num">${pad(B.next())}</span></div>
      <div><h4>Course</h4><a href="#curriculum">Curriculum</a><a href="#projects">Projects</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
      <div><h4>Contact</h4><a href="tel:${esc(cfg.contact.phone.replace(/\s/g, ''))}">📞 ${esc(cfg.contact.phone)}</a><a href="mailto:${esc(cfg.contact.email)}">✉️ ${esc(cfg.contact.email)}</a><a href="https://wa.me/${esc(cfg.contact.whatsapp)}" target="_blank" rel="noopener">💬 WhatsApp</a><span>📍 ${esc(cfg.contact.address)}</span></div>
      <div><h4>Follow</h4>${Object.entries(cfg.social).map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</div>
    </div>
    <p class="copy-r">© ${new Date().getFullYear()} ${esc(cfg.brand)}. All rights reserved. n8n is a trademark of n8n GmbH; this course is independent and not affiliated with n8n GmbH.</p>`,
  }));

  return S.join('\n');
}

function demoData() {
  return {
    lead: { nodes: [['⚡', 'Meta Lead Ad'], ['🧹', 'Clean Data'], ['🧠', 'AI Score'], ['🔀', 'IF Hot?'], ['📇', 'HubSpot'], ['💬', 'WhatsApp']], out: { name: 'Riya Sharma', phone: '+919876543210', score: 87, label: 'HOT', crm: 'contact_4821', whatsapp: 'sent ✓' } },
    support: { nodes: [['💬', 'WhatsApp In'], ['📚', 'Vector Search'], ['🤖', 'AI Agent'], ['🛡️', 'Guardrail'], ['🎫', 'Ticket?'], ['📤', 'Reply']], out: { question: 'Course fees kitni hai?', sources: 2, answer: 'Live Cohort ₹9,999 hai, EMI available.', confidence: 0.94, escalated: false } },
    invoice: { nodes: [['📧', 'Gmail Trigger'], ['📄', 'Extract PDF'], ['🧾', 'AI Extractor'], ['✅', 'Validate GST'], ['📊', 'Sheets'], ['🔔', 'Telegram']], out: { vendor: 'ABC Traders', invoice_no: 'INV-2291', total: 23600, gst: 3600, status: 'logged ✓' } },
  };
}

function render() {
  const body = build();
  const total = B.registry.length;
  const title = `${cfg.courseName} — ${cfg.totalDays}-Day Live n8n & AI Automation Course | ${cfg.brand}`;
  const desc = `${cfg.totalDays} live classes × ${cfg.hoursPerClass} hours. Learn n8n, APIs, webhooks, AI Agents, RAG, self-hosting & freelancing. 20 projects, capstone & certificate.`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'Course', name: cfg.courseName, description: desc,
    provider: { '@type': 'Organization', name: cfg.brand, sameAs: cfg.siteUrl },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', startDate: cfg.nextBatchStart.slice(0, 10), courseWorkload: `PT${cfg.totalDays * cfg.hoursPerClass}H` },
    offers: cfg.pricing.plans.map((p) => ({ '@type': 'Offer', name: p.name, price: p.price, priceCurrency: 'INR', category: 'Paid' })),
  };
  return layout({ title, desc, body, total, drawerHtml: B.drawer(), active: 'home', schema, footer: false,
    extraScript: `window.__DEMO__=${JSON.stringify(demoData())};` });
}

module.exports = { render, sectionCount: () => B.registry.length, registry: () => B.registry };
