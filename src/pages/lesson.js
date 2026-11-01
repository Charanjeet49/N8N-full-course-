// ============================================================
//  LESSON PAGE — /day/:n  (har din ~21 sections, poora teaching guide)
// ============================================================
const cfg = require('../config');
const { modules, days } = require('../curriculum');
const LESSONS = { ...require('../lessons'), ...require('../lessons2') };
const { nodes } = require('../nodes');
const { layout } = require('../layout');
const { esc, pad, makeBuilder, chips, yt, flowDiagram, iconFor } = require('../kit');
const { agendaHtml, EXAMPLES } = require('../explain');
const { builds } = require('../buildlib');
const { buildBlock } = require('../buildview');
const { challenges } = require('../student');

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
  const E = EXAMPLES[n];
  if (!d || !L || !E) return null;
  const m = modById[d.module];
  const B = makeBuilder();
  const S = [];
  const G = `Day ${n}`;

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
          ${n === 1 ? '<p class="d0-note">🧰 Pehli baar? Class se pehle <a href="/setup">Day 0 setup</a> kar lo — 20 minute.</p>' : ''}
          <div class="vm-mini" role="group" aria-label="View mode"><span>View:</span><button type="button" data-set-mode="student">🎓 Student</button><button type="button" data-set-mode="mentor">👨‍🏫 Mentor</button><a href="/mentor" title="Yeh kya hai?">?</a></div>
          <div class="hero-cta"><a href="#todays-build" class="btn btn-primary magnetic">⚡ Aaj ka build (JSON)</a><a href="#build" class="btn btn-ghost">▶ Step-by-step</a><a href="#quiz" class="btn btn-ghost">🧠 Quiz</a><a class="btn btn-link" href="/pdf/day-${pad(n)}-notes.pdf" download="Day-${pad(n)}-Notes-n8n-course.pdf">⬇ Notes PDF</a></div>
        </div>
        <div class="lh-ring reveal" style="--d:120ms"><div class="day-badge big"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="ring-bg"/><circle cx="60" cy="60" r="52" class="ring" style="--p:${n / cfg.totalDays}"/></svg><div><small>DAY</small><b>${pad(n)}</b><small>of ${cfg.totalDays}</small></div></div>
          <p data-progress-label>Day ${n} of ${cfg.totalDays}</p></div>
      </div>
      <div class="day-dots reveal">${days.map((x) => `<a href="/day/${x.day}" class="${x.day === n ? 'on' : ''}" style="--c:${modById[x.module].color}" title="Day ${x.day}: ${esc(x.title)}">${x.day}</a>`).join('')}</div>`,
  }));

  // 2 WHY
  S.push(B.sec({ id: 'why', group: G, eyebrow: 'Kyun zaroori hai', title: 'Aaj ka lesson kyun matter karta hai?', body: `<div class="why-box reveal"><span>💡</span><p>${esc(L.why)}</p></div>` }));

  // 2b TODAY'S BUILD
  const TB = builds()[n];
  S.push(B.sec({ id: 'todays-build', group: G, eyebrow: "Today's build", title: `Aaj hum milke yeh banayenge`, sub: 'Ready n8n workflow: copy karo → n8n canvas par paste karo → apne accounts connect karo → chalao. Class mein peeche reh gaye to bhi yahan se seedha saath aa sakte ho.', body: `${buildBlock(TB, m.color)}${TB.prompts.length ? `<h4 class="tb-ph">💬 Is build ke prompts</h4><div class="grid g2 tb-prompts">${require('../buildview').promptCards(TB)}</div>` : ''}<p class="hint reveal">📦 Saare 25 workflows ek saath: <a href="/resources">Resources page →</a></p>` }));

  // 3 OBJECTIVES (+ topic example cards)
  S.push(B.sec({ id: 'objectives', group: G, eyebrow: 'Aaj kya seekhenge', title: 'Aaj ke baad aap yeh kar paoge', sub: 'Har topic par click karo — ek real-life example aur ek n8n example.', body: `<ul class="obj obj-x">${d.topics.map((t, i) => { const [life, n8n] = E.topics[i] || []; return `<li class="reveal" style="--d:${i * 60}ms"><details><summary><b>${pad(i + 1)}</b><span>${esc(t)}</span><i class="ox-plus">+</i></summary>${life ? `<div class="ox"><p><span>🌍 Real life</span>${esc(life)}</p><p><span>⚙️ n8n mein</span>${esc(n8n)}</p></div>` : ''}</details></li>`; }).join('')}</ul>` }));

  // 4 CONCEPTS
  S.push(B.sec({ id: 'concepts', group: G, eyebrow: 'Core concepts', title: 'Concepts — aasaan Hinglish + real-life example', body: `<div class="grid g2">${L.concepts.map(([t, e, a], i) => `<div class="card concept reveal" style="--d:${i * 70}ms"><span class="kn">CONCEPT ${pad(i + 1)}</span><h3>${esc(t)}</h3><p>${esc(e)}</p><div class="analogy">🪄 <b>Analogy:</b> ${esc(a)}</div></div>`).join('')}</div>` }));

  // 4b STORY TIME
  S.push(B.sec({ id: 'story', group: G, eyebrow: 'Story time', title: `Ek kahani se samjho: ${esc(E.story.t)}`, sub: 'Har scene ek n8n step hai. Pehle kahani padho, phir neeche wala workflow dekho — dono same cheez hain.', body: `<div class="story reveal" style="--c:${m.color};--n:${E.story.s.length}"><div class="st-road"><span class="st-car">${n === 1 ? '🚗' : '⚡'}</span></div><ol class="st-scenes">${E.story.s.map(([em, scene, map], i) => `<li style="--i:${i}"><span class="st-em">${em}</span><b>${esc(scene)}</b><small>= ${esc(map)}</small></li>`).join('')}</ol></div>
    <p class="hint reveal">🪄 Ek line mein: "${esc(E.concept.k.replace(/^"|"$/g, ''))}"</p>` }));

  // 5 DIAGRAM
  S.push(B.sec({ id: 'diagram', group: G, eyebrow: 'Visual', title: 'Aaj ka workflow — animated diagram', sub: 'Data left se right flow karta hai. Har dot ek item hai jo agle node mein ja raha hai.', body: `<div class="reveal">${flowDiagram(L.steps, m.color)}</div>` }));

  // 6 BUILD
  S.push(B.sec({ id: 'build', group: G, eyebrow: 'Hands-on', title: 'Step-by-step build (n8n kholo aur saath chalo)', body: `<ol class="build">${L.steps.map(([node, cfgTxt], i) => { const nd = findNode(node); return `<li class="reveal" style="--d:${i * 60}ms"><span class="b-num">${i + 1}</span><span class="b-ic">${iconFor(node)}</span><div><b>${nd ? `<a href="/nodes#${nd.id}">${esc(node)}</a>` : esc(node)}</b><p>${esc(cfgTxt)}</p></div>${nd ? `<a class="b-doc" href="${esc(nd.docs)}" target="_blank" rel="noopener">Docs ↗</a>` : ''}</li>`; }).join('')}</ol>
    <p class="hint reveal">✅ Har step ke baad <b>Execute step</b> dabao aur output panel check karo. Sab green ho to workflow ko <b>Active</b> karo.</p>` }));

  // 6b BEFORE vs AFTER
  const sum = (a) => a.reduce((x, y) => x + y[1], 0);
  const bT = sum(E.ba.before), aT = sum(E.ba.after), mx = Math.max(bT, aT, 1);
  const baCol = (cls, h, rows, tot) => `<div class="ba-col ${cls} reveal"><h4>${h}</h4><ul>${rows.map(([t, mn]) => `<li><span>${esc(t)}</span>${mn ? `<em>${mn} min</em>` : ''}</li>`).join('')}</ul>${bT ? `<div class="ba-bar"><i style="--w:${Math.max(4, Math.round((tot / mx) * 100))}%"></i></div><p class="ba-tot">${tot} min</p>` : ''}</div>`;
  S.push(B.sec({ id: 'before-after', group: G, eyebrow: 'Before vs After', title: 'Manual vs Automation — farak dekho', body: `<div class="ba">${baCol('bad', '😩 Pehle (manual)', E.ba.before, bT)}<div class="ba-mid reveal">→</div>${baCol('good', '⚡ Ab (n8n)', E.ba.after, aT)}</div><p class="ba-note reveal">⏱ ${esc(E.ba.note)}</p>` }));

  // 7 INPUT/OUTPUT
  S.push(B.sec({ id: 'example-data', group: G, eyebrow: 'Example', title: 'Sample input → output (real data jaisa)', body: `<div class="two io"><div class="code-card reveal"><div class="cc-h"><b>📥 Input</b><button class="copy" data-copy="${json(L.input)}">Copy</button></div><pre>${json(L.input)}</pre></div><div class="code-card reveal" style="--d:100ms"><div class="cc-h"><b>📤 Output</b><button class="copy" data-copy="${json(L.output)}">Copy</button></div><pre>${json(L.output)}</pre></div></div>` }));

  // 8 SNIPPET
  S.push(B.sec({ id: 'snippet', group: G, eyebrow: 'Code / expression / prompt', title: 'Aaj ka key snippet', body: `<div class="code-card reveal"><div class="cc-h"><b>⌨️ Copy karke n8n mein paste karo</b><button class="copy" data-copy="${esc(L.snippet)}">Copy</button></div><pre>${esc(L.snippet)}</pre></div>${[3, 4, 5, 6, 8, 13].includes(n) ? '<p class="hint reveal">🧪 Expression khud try karna hai? <a href="/cheatsheets#playground">Expression playground kholo →</a></p>' : ''}` }));

  // 9 CLASS PLAN
  S.push(B.sec({ id: 'class-plan', group: G, eyebrow: 'Aaj ki class', title: 'Aaj ki class mein kya hoga (2 ghante)', body: `<div class="panel reveal" style="--c:${m.color}"><div class="agenda-bar">${d.agenda.map((a, i) => `<span style="flex:${a[0]};--i:${i}"></span>`).join('')}</div>${agendaHtml(d)}</div>` }));

  // 11 ATAK GAYE? (mistakes + fixes + help)
  const fixes = [];
  TB.creds.forEach((c) => fixes.push([`Node par laal ⚠️ triangle dikh raha hai?`, `Uska account connect nahi hua. Node kholo → Credential → "${c}" connect karo.`]));
  if (TB.json.nodes.some((x) => /webhook|formTrigger|chatTrigger/i.test(x.type))) fixes.push(['Webhook/Form test par kuch nahi ho raha?', '"Listen for test event" / "Test URL" use karo aur 2 minute ke andar request bhejo. Production URL sirf tab chalta hai jab workflow Active ho.']);
  if (TB.json.nodes.some((x) => /scheduleTrigger|Trigger$/.test(x.type) && !/manual|webhook|form|chat/i.test(x.type))) fixes.push(['Time par apne aap nahi chala?', 'Upar right mein "Active" toggle on hai? Aur Settings mein timezone Asia/Kolkata check karo.']);
  if (TB.json.nodes.some((x) => x.type.includes('langchain'))) fixes.push(['AI node par 401 / 429 error?', '401 = API key galat. 429 = credit khatam ya bahut jaldi-jaldi requests. OpenAI billing page check karo.']);
  if (TB.json.nodes.some((x) => x.type.includes('googleSheets'))) fixes.push(['"Sheet not found" / column khaali?', 'Sheet ID aur tab ka naam (capital/small letters bhi) check karo. Sheet ki pehli row mein headers hone chahiye.']);
  S.push(B.sec({ id: 'stuck', group: G, eyebrow: 'Atak gaye?', title: '🧯 Yahan sab atakte hain — aap akele nahi ho', sub: 'Error aana seekhne ka hissa hai. Neeche wale points check karo; phir bhi na bane to doubt poochho.', body: `<div class="grid g2">
      <div><h4 class="stk-h">🔧 Agar yeh ho raha hai…</h4><div class="stk-list">${fixes.map(([q, a], i) => `<details class="stk reveal" style="--d:${i * 50}ms"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div>
      <div><h4 class="stk-h">⚠️ Yeh galtiyan sabse common hain</h4><div class="list-x">${L.mistakes.map((p, i) => `<div class="li bad reveal" style="--d:${i * 60}ms"><span>!</span>${esc(p)}</div>`).join('')}</div></div>
    </div>
    <div class="stk-help reveal"><b>Phir bhi atke? Koi baat nahi 🙂</b><span>Screenshot + error message ke saath poochho — jaldi solve hoga.</span><a class="btn btn-primary sm" href="https://wa.me/${esc(cfg.contact.whatsapp)}?text=${encodeURIComponent(`Day ${n} (${d.title}) mein doubt hai: `)}" target="_blank" rel="noopener">💬 Doubt poochho</a><a class="btn btn-ghost sm" href="https://community.n8n.io/" target="_blank" rel="noopener">🌍 n8n community</a></div>` }));

  // 12 TIPS
  S.push(B.sec({ id: 'pro-tips', group: G, eyebrow: 'Pro tips', title: '⭐ Chhoti tricks jo time bachati hain', body: `<div class="list-x">${L.tips.map((p, i) => `<div class="li good reveal" style="--d:${i * 60}ms"><span>★</span>${esc(p)}</div>`).join('')}</div>` }));

  // 13 LAB + HOMEWORK + PRACTICE
  S.push(B.sec({ id: 'practice', group: G, eyebrow: 'Practice', title: 'Live lab, homework aur practice ladder', body: `<div class="grid g2"><div class="panel lab reveal" style="--c:${m.color}"><h4>🛠 Live lab</h4><p>${esc(d.lab)}</p></div><div class="panel reveal"><h4>📝 Homework</h4><p>${esc(d.homework)}</p></div></div>
    <div class="ladder">${L.practice.map(([lvl, t], i) => `<div class="rung reveal r${i}" style="--d:${i * 90}ms"><small>${esc(lvl)}</small><p>${esc(t)}</p></div>`).join('')}</div>` }));

  // 13b CHALLENGE (hints)
  const [cT, h1, h2, sol] = challenges[n];
  S.push(B.sec({ id: 'challenge', group: G, eyebrow: 'Challenge', title: '🧩 Aaj ka challenge — pehle khud try karo', sub: 'Seedha solution mat kholna 😉 Pehle 5 minute khud socho, phir ek-ek hint kholo.', body: `<div class="chl reveal" style="--c:${m.color}"><p class="chl-task">🎯 ${esc(cT)}</p>
      <div class="chl-steps"><details class="chl-h"><summary>💡 Hint 1</summary><p>${esc(h1)}</p></details><details class="chl-h"><summary>💡 Hint 2</summary><p>${esc(h2)}</p></details><details class="chl-h sol"><summary>✅ Solution dekho</summary><p>${esc(sol)}</p></details></div></div>` }));

  // 14 QUIZ
  S.push(B.sec({ id: 'quiz', group: G, eyebrow: 'Self-check', title: '🎯 2 minute ka self-check', sub: 'Score sirf aapko dikhta hai. Galat hua to explanation padho — wahi asli seekh hai.', body: `<div class="quiz" data-quiz>${L.quiz.map(([q, opts0, ans0, ex], i) => { const r = (n + i * 3) % opts0.length; const opts = opts0.map((_, k) => opts0[(k + r) % opts0.length]); const ans = (ans0 - r + opts0.length) % opts0.length; return `<div class="qz card reveal" data-ans="${ans}" style="--d:${i * 60}ms"><b>Q${i + 1}. ${esc(q)}</b><div class="opts">${opts.map((o, k) => `<button data-k="${k}">${String.fromCharCode(65 + k)}. ${esc(o)}</button>`).join('')}</div><p class="ex">${esc(ex || 'Sahi jawab highlighted hai.')}</p></div>`; }).join('')}<p class="qz-score" data-score>Score: 0 / ${L.quiz.length}</p></div>` }));

  // 15 VIDEOS
  S.push(B.sec({ id: 'videos', group: G, eyebrow: 'Watch', title: 'Video resources', sub: 'YouTube par latest tutorials (search links hamesha fresh results dete hain) + n8n ka official channel.', body: `<div class="grid g3">${[...L.videos.map((q) => [q, yt(q)]), ['n8n official YouTube channel', 'https://www.youtube.com/@n8n-io']].map(([t, u], i) => `<a class="card vcard reveal" href="${esc(u)}" target="_blank" rel="noopener" style="--d:${i * 70}ms"><div class="vthumb" style="--c:${m.color}"><span>▶</span></div><h3>${esc(t)}</h3><small>YouTube ↗</small></a>`).join('')}</div>` }));

  // 16 DOCS
  const allDocs = [...d.resources, ...L.docs].filter((x, i, a) => a.findIndex((y) => y[1] === x[1]) === i);
  S.push(B.sec({ id: 'docs', group: G, eyebrow: 'Official docs', title: 'n8n docs & reading list', body: `<div class="dl-list">${allDocs.map(([t, u], i) => `<a href="${esc(u)}" target="_blank" rel="noopener" class="dl reveal" style="--d:${i * 50}ms"><span>📚</span>${esc(t)}<i>↗</i></a>`).join('')}</div><p class="hint">Saare docs ek jagah: <a href="/docs">Docs Hub →</a></p>` }));

  // 17 NODES USED + NEXT
  const used = [...new Set(L.steps.map(([x]) => x))].map(findNode).filter(Boolean);
  S.push(B.sec({ id: 'nodes-used', group: G, eyebrow: 'Nodes library', title: 'Aaj kaunse nodes use hue', body: `<div class="grid g4">${used.map((nd, i) => `<a href="/nodes#${nd.id}" class="card node-mini reveal" style="--d:${i * 50}ms"><span class="nm-ic">${iconFor(nd.name)}</span><b>${esc(nd.name)}</b><small>${esc(nd.desc)}</small></a>`).join('')}</div>
    <div class="done-box reveal" data-day="${n}"><div><b>Aaj ka din ho gaya? 🎉</b><span>Tick karo — aapka progress isi browser mein save hoga.</span></div><button class="btn btn-primary" data-complete="${n}">✅ Day ${n} complete</button></div>
    <nav class="lesson-next reveal">${n > 1 ? `<a href="/day/${n - 1}" class="btn btn-ghost">← Day ${n - 1}</a>` : '<span></span>'}<a href="/#enroll" class="btn btn-ghost">🎓 Enroll</a>${n < cfg.totalDays ? `<a href="/day/${n + 1}" class="btn btn-primary magnetic">Next: Day ${n + 1} →</a>` : '<a href="/#capstone" class="btn btn-primary">Capstone →</a>'}</nav>` }));

  // 18 MENTOR NOTES (sirf Mentor mode mein)
  S.push(B.sec({ id: 'teacher-script', group: G, eyebrow: 'Sirf mentor ke liye', title: '👨‍🏫 Mentor notes — class kaise lein', mentor: true, body: `<ul class="checks reveal">${L.teach.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` }));

  return layout({
    title: `Day ${n}: ${d.title} — ${cfg.courseName} | ${cfg.brand}`,
    desc: `Day ${n} lesson (Hinglish): ${d.topics.slice(0, 3).join(', ')}. Step-by-step n8n build, examples, quiz aur docs.`,
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'lesson', label: 'lesson sections',
  });
}

module.exports = { renderLesson, lessonSectionCount: () => 21 };
