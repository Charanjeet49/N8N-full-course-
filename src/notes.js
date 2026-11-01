// ============================================================
//  NOTES PDF — har Day ka print-ready HTML (scripts/pdf.js isse PDF banata hai)
//  Student copy: mentor content nahi. Mentor copy: teacher script + mentor notes.
// ============================================================
const fs = require('fs');
const path = require('path');
const cfg = require('./config');
const { modules, days } = require('./curriculum');
const LESSONS = { ...require('./lessons'), ...require('./lessons2') };
const { esc, pad, iconFor } = require('./kit');
const { agendaExplain, EXAMPLES } = require('./explain');
const { builds } = require('./buildlib');
const { challenges, earn, glossary } = require('./student');
const { DEEP } = require('./deep');
const { shotFor } = require('./shots');

const modById = Object.fromEntries(modules.map((m) => [m.id, m]));
const BASE = (cfg.publicUrl || new URL(cfg.siteUrl).origin).replace(/\/$/, '');
const abs = (p) => (/^https?:/.test(p) ? p : BASE + p);
const LOGO = `<img src="${cfg.logo}" alt="${esc(cfg.brand)}">`;
const LOGO_FULL = `<img src="${cfg.logoFull || cfg.logo}" alt="${esc(cfg.brand)}">`;
const fmt = (min) => `${Math.floor(min / 60)}:${pad(min % 60)}`;
const pdfName = (n, mentor) => `day-${pad(n)}-${mentor ? 'mentor' : 'notes'}.pdf`;

// ---------- link card (clickable, no QR) ----------
const linkCard = (url, icon, title, sub) => `<a class="lk-card" href="${esc(url)}"><span class="lk-i">${icon}</span><div><b>${esc(title)}</b><small>${esc(sub)}</small><code>${esc(url.replace(/^https?:\/\//, '').replace(/\?.*$/, ''))}</code></div><em>↗</em></a>`;

// ---------- small building blocks ----------
const h2 = (icon, title, sub = '', cls = '') => `<header class="nh ${cls}"><span class="nh-ic">${icon}</span><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div></header>`;
const box = (kind, title, body) => `<div class="bx bx-${kind}">${title ? `<div class="bx-t">${title}</div>` : ''}${body}</div>`;
const pre = (title, text, kind = 'prompt') => `<div class="code ${kind}"><div class="code-h"><b>${title}</b><span>📋 Select karke copy karo</span></div><pre>${esc(text)}</pre></div>`;
const check = (t) => `<li><i class="cb"></i><span>${t}</span></li>`;

function flow(steps, color) {
  return `<div class="flow" style="--c:${color}">${steps.map(([name, desc], i) => `${i ? '<span class="fl-ar">➜</span>' : ''}<div class="fl-n"><span class="fl-i">${iconFor(name)}</span><b>${esc(name)}</b>${desc ? `<small>${esc(desc)}</small>` : ''}<em>${i + 1}</em></div>`).join('')}</div>`;
}

function dayGlossary(n) {
  const d = days.find((x) => x.day === n); const L = LESSONS[n];
  const text = [d.title, ...d.topics, ...L.concepts.flat(), ...L.steps.flat(), L.why].join(' ').toLowerCase();
  return glossary.filter(([t]) => new RegExp(`(^|[^a-z])${t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(text)).slice(0, 8);
}

// quiz options ko website jaisa hi shuffle (same answer letters)
function quizItems(n) {
  return LESSONS[n].quiz.map(([q, opts0, ans0, ex], i) => {
    const r = (n + i * 3) % opts0.length;
    const opts = opts0.map((_, k) => opts0[(k + r) % opts0.length]);
    return { q, opts, ans: (ans0 - r + opts0.length) % opts0.length, ex };
  });
}

// ============================================================
//  ONE DAY (sections as HTML string; cover optional for e-book)
// ============================================================
function dayBody(n, { mentor = false, cover = true } = {}) {
  const d = days.find((x) => x.day === n); const L = LESSONS[n]; const E = EXAMPLES[n];
  const m = modById[d.module]; const TB = builds()[n]; const C = m.color;
  const [cT, h1, h2t, sol] = challenges[n];
  const Q = quizItems(n);
  const nextD = days.find((x) => x.day === n + 1);
  const lessonUrl = abs(`/day/${n}`);
  const jsonUrl = abs(TB.url);
  const wa = `https://wa.me/${cfg.contact.whatsapp}?text=${encodeURIComponent(`Day ${n} (${d.title}) mein doubt hai: `)}`;
  const S = [];

  // ---------- COVER ----------
  if (cover) {
    S.push(`<section class="cover" style="--c:${C}">
      <div class="cv-top"><span class="cv-logo">${LOGO}</span><div><small>${esc(cfg.courseName)}</small><small>📞 ${esc(cfg.contact.phone)}</small></div>${mentor ? '<span class="cv-badge">👨‍🏫 MENTOR COPY</span>' : '<span class="cv-badge">📘 CLASS NOTES</span>'}</div>
      <div class="cv-mid">
        <span class="cv-mod">${m.icon} Module ${m.no} · ${esc(m.title)}</span>
        <div class="cv-day"><small>DAY</small><b>${pad(n)}</b><small>of ${cfg.totalDays}</small></div>
        <h1>${esc(d.title)}</h1>
        <p class="cv-hook">“${esc(d.hook)}”</p>
        <div class="cv-build"><span>⚡ Aaj hum yeh banayenge</span><b>${esc(TB.name)}</b><p>${esc(TB.what)}</p></div>
        <div class="cv-chips">${d.tools.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      </div>
      <div class="cv-bot">
        <div class="cv-dots">${days.map((x) => `<i class="${x.day < n ? 'p' : x.day === n ? 'on' : ''}" style="--mc:${modById[x.module].color}"></i>`).join('')}</div>
        <div class="cv-fill"><span>Naam: <i></i></span><span>Class date: <i></i></span></div>
        <small>${cfg.hoursPerClass} ghante ki live class · ${esc(cfg.classTime)}</small>
      </div>
    </section>`);
  }

  // ---------- ROADMAP ----------
  let acc = 0;
  S.push(`<section class="pg" style="--c:${C}">
    ${!cover ? `<div class="day-div"><span>DAY ${pad(n)}</span><h1>${esc(d.title)}</h1><p>“${esc(d.hook)}”</p></div>` : ''}
    ${h2('🧭', 'Aaj ka roadmap', 'Ek nazar mein poori class — kya, kyun aur kitne time mein.')}
    ${box('why', '💡 Yeh lesson kyun zaroori hai?', `<p>${esc(L.why)}</p>`)}
    <h3 class="sh">🎯 Aaj ke baad aap yeh kar paoge</h3>
    <ol class="obj">${d.topics.map((t, i) => { const [life, n8n] = E.topics[i] || []; return `<li><b>${pad(i + 1)}</b><div><span>${esc(t)}</span>${life ? `<small>🌍 ${esc(life)}<br>⚙️ ${esc(n8n)}</small>` : ''}</div></li>`; }).join('')}</ol>
    <h3 class="sh">⏱ Class ka plan (${cfg.hoursPerClass} ghante)</h3>
    <div class="ag-bar">${d.agenda.map((a, i) => `<span style="flex:${a[0]};--i:${i}">${a[0]}m</span>`).join('')}</div>
    <ol class="agenda">${d.agenda.map((a, i) => { const s = acc; acc += a[0]; const X = agendaExplain(n, i); return `<li><time>${fmt(s)}–${fmt(acc)}</time><div><b>${esc(a[1])}</b>${a[2] ? `<small>${esc(a[2])}</small>` : ''}${X.k ? `<p class="ag-k">🪄 ${esc(X.k.replace(/^"|"$/g, ''))}</p>` : ''}${mentor && X.m ? `<p class="ag-m">👨‍🏫 ${esc(X.m)}</p>` : ''}</div></li>`; }).join('')}</ol>
  </section>`);

  // ---------- CONCEPTS + STORY ----------
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('🧠', 'Concepts — aasaan bhasha mein', 'Har concept ke saath ek real-life analogy. Analogy yaad rahegi to concept bhi yaad rahega.')}
    <div class="g2">${L.concepts.map(([t, e, a], i) => `<div class="concept"><span class="kn">CONCEPT ${pad(i + 1)}</span><h4>${esc(t)}</h4><p>${esc(e)}</p><div class="an">🪄 <b>Analogy:</b> ${esc(a)}</div></div>`).join('')}</div>
    ${box('concept', `🔑 Aaj ka main idea`, `<p>${esc(E.concept.e)}</p>${E.concept.x && E.concept.x.length ? `<ul>${E.concept.x.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`)}
    <h3 class="sh">📖 Ek kahani se samjho: ${esc(E.story.t)}</h3>
    <ol class="story">${E.story.s.map(([em, scene, map]) => `<li><span>${em}</span><b>${esc(scene)}</b><small>= ${esc(map)}</small></li>`).join('')}</ol>
    <p class="one-line">🪄 Ek line mein: “${esc(E.concept.k.replace(/^"|"$/g, ''))}”</p>
  </section>`);

  // ---------- DEEP DIVE (Phase A) ----------
  const D = DEEP[n];
  if (D) {
    S.push(`<section class="pg brk" style="--c:${C}">
    ${h2('🔬', 'Gehraai se samjho — har concept andar se', 'Kya hai, n8n andar kya karta hai, kab use karein, kab nahi, example aur common galti.')}
    ${D.concepts.map((c, i) => `<div class="dd"><div class="dd-h"><span>${pad(i + 1)}</span><b>${esc(c.t)}</b></div>
      <p><b class="lb">📖 Kya hai:</b> ${esc(c.kya)}</p>
      <p><b class="lb">⚙️ Andar kaise:</b> ${esc(c.andar)}</p>
      <div class="g2 dd-2"><div class="dd-ok"><b>✅ Kab use karein</b><p>${esc(c.kab)}</p></div><div class="dd-no"><b>⛔ Kab nahi</b><p>${esc(c.kabNahi)}</p></div></div>
      <p class="dd-ex"><b>🧪 Example:</b> ${esc(c.ex)}</p>
      <p class="dd-bad"><b>⚠️ Common galti:</b> ${esc(c.galti)}</p>
      <p class="dd-y">🪄 ${esc(c.yaad)}</p></div>`).join('')}
  </section>`);
  }

  // ---------- FLOW + BUILD STEPS ----------
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('🗺️', `Aaj ka workflow: ${esc(TB.name)}`, 'Data left se right chalta hai. Har dabba ek n8n node hai.')}
    ${flow(TB.flow, C)}
    ${shotFor(n, 'canvas') ? `<figure class="shot"><img src="${shotFor(n, 'canvas')}" alt=""><figcaption>📸 Asli n8n mein import karne par yeh dikhega. Laal ⚠️ = account (credential) connect karna baaki.</figcaption></figure>` : ''}
    ${earn[n] ? box('earn', '💰 Isse kitna kama sakte ho?', `<p>${esc(earn[n][0])} — aam taur par <b>${esc(earn[n][1])}</b>. <i>(Andaaza hai; client aur scope ke hisaab se badalta hai.)</i></p>`) : ''}
    <h3 class="sh">🛠 Step-by-step build — n8n kholo aur saath chalo</h3>
    <ol class="steps">${L.steps.map(([node, t], i) => `<li><span class="st-n">${i + 1}</span><span class="st-i">${iconFor(node)}</span><div><b>${esc(node)}</b><p>${esc(t)}</p></div></li>`).join('')}</ol>
    <p class="tip-line">✅ Har step ke baad <b>Execute step</b> dabao aur output check karo. Sab green ho to workflow <b>Active</b> karo.</p>
    <div class="g2">
      ${box('steps', '🔑 Setup (import ke baad)', `<ul class="checks">${TB.creds.map((c) => check(`Connect: <b>${esc(c)}</b>`)).join('')}${(TB.setup || []).map((s) => check(esc(s))).join('')}${!TB.creds.length && !(TB.setup || []).length ? check('Koi setup nahi — seedha Test karo!') : ''}</ul>`)}
      ${box('steps', '✅ Test kaise karein', `<ol class="tl">${(TB.test || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`)}
    </div>
  </section>`);

  // ---------- DATA KA SAFAR + NODE ANATOMY (Phase A) ----------
  if (D) {
    S.push(`<section class="pg brk" style="--c:${C}">
    ${h2('🚚', 'Data ka safar — har node ke baad', `Aaj ke build mein data kaise badalta hai. Expressions samajhne ki chaabi yahi hai.`)}
    <ol class="dj">${D.trace.map(([node, note, data], i) => `<li><div class="dj-h"><span>${i + 1}</span><b>${iconFor(node)} ${esc(node)}</b></div><p>${esc(note)}</p><pre>${esc(JSON.stringify(data, null, 2))}</pre></li>`).join('')}</ol>
  </section>`);
    S.push(`<section class="pg brk" style="--c:${C}">
    ${h2('🧩', 'Node anatomy — har setting ka matlab', 'Har zaroori option kya karta hai aur kab badalna hai. Isse aap khud naye workflows bana paoge.')}
    ${D.nodes.map((nd, i) => { const shot = shotFor(n, 'node', i); return `<div class="na"><div class="na-h"><span>${iconFor(nd.n)}</span><div><b>${esc(nd.n)}</b><small>${esc(nd.why)}</small></div></div><div class="${shot ? 'na-g' : ''}">${shot ? `<figure class="shot sm"><img src="${shot}" alt=""><figcaption>📸 Asli n8n: ${esc(nd.n)}</figcaption></figure>` : ''}<table class="nat"><thead><tr><th>Setting</th><th>Kya karti hai</th><th>Aaj ki value</th><th>Kab badlein</th></tr></thead><tbody>${nd.s.map(([a, b, c, d]) => `<tr><td><b>${esc(a)}</b></td><td>${esc(b)}</td><td><code>${esc(c)}</code></td><td>${esc(d)}</td></tr>`).join('')}</tbody></table></div></div>`; }).join('')}
  </section>`);
  }

  // ---------- BEFORE/AFTER + DATA + SNIPPET ----------
  const sum = (a) => a.reduce((x, y) => x + y[1], 0);
  const bT = sum(E.ba.before), aT = sum(E.ba.after), mx = Math.max(bT, aT, 1);
  const baCol = (cls, h, rows, tot) => `<div class="ba-c ${cls}"><h4>${h}</h4><ul>${rows.map(([t, mn]) => `<li><span>${esc(t)}</span>${mn ? `<em>${mn} min</em>` : ''}</li>`).join('')}</ul>${bT ? `<div class="ba-bar"><i style="width:${Math.max(4, Math.round((tot / mx) * 100))}%"></i></div><b class="ba-t">${tot} min</b>` : ''}</div>`;
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('⚖️', 'Pehle vs Ab — farak dekho', 'Yahi farak client ko dikhana hai. Time bachta hai = paisa bachta hai.')}
    <div class="ba">${baCol('bad', '😩 Pehle (manual)', E.ba.before, bT)}<span class="ba-ar">➜</span>${baCol('good', '⚡ Ab (n8n)', E.ba.after, aT)}</div>
    <p class="one-line">⏱ ${esc(E.ba.note)}</p>
    <h3 class="sh">⌨️ Aaj ka key snippet</h3>
    ${pre('Copy karke n8n mein paste karo', L.snippet, 'snip')}
    <h3 class="sh">📦 Sample data — input se output tak</h3>
    <div class="g2 io">${pre('📥 Input', JSON.stringify(L.input, null, 2), 'json')}${pre('📤 Output', JSON.stringify(L.output, null, 2), 'json')}</div>
  </section>`);

  // ---------- PROMPTS + IMPORT ----------
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('💬', 'Copy-paste prompts', 'ChatGPT / Claude mein seedha paste karo. PDF mein text select karke copy ho jata hai.')}
    ${TB.prompts.map(([t, p]) => pre(`💬 ${esc(t)}`, p)).join('')}
    <h3 class="sh">📥 Workflow ko n8n mein kaise laayein</h3>
    <div class="imp">
      <ol class="imp-s">
        <li><b>Workflow JSON</b> wale button par click karo (ya lesson page par <b>📋 Copy workflow JSON</b> dabao).</li>
        <li>Poora text copy karo (<kbd>Ctrl</kbd>+<kbd>A</kbd>, <kbd>Ctrl</kbd>+<kbd>C</kbd>).</li>
        <li>n8n mein naya workflow kholo → canvas par click → <kbd>Ctrl</kbd>+<kbd>V</kbd>. Ya … menu → <i>Import from File</i>.</li>
        <li>Upar wala Setup checklist poora karo aur <b>Test</b> dabao.</li>
      </ol>
      <div class="qr-col">${linkCard(jsonUrl, '⚡', 'Workflow JSON', `${TB.json.nodes.length - 1} nodes · ready to import`)}${linkCard(lessonUrl, '🌐', 'Lesson page', 'Copy buttons, quiz aur video links')}</div>
    </div>
  </section>`);

  // ---------- STUCK + TIPS ----------
  const fixes = [];
  TB.creds.forEach((c) => fixes.push(['Node par laal ⚠️ triangle?', `Account connect nahi hua. Node kholo → Credential → "${c}" connect karo.`]));
  if (TB.json.nodes.some((x) => /webhook|formTrigger|chatTrigger/i.test(x.type))) fixes.push(['Webhook/Form test par kuch nahi ho raha?', '"Listen for test event" / Test URL use karo aur 2 minute ke andar request bhejo. Production URL sirf Active workflow par chalta hai.']);
  if (TB.json.nodes.some((x) => /scheduleTrigger|Trigger$/.test(x.type) && !/manual|webhook|form|chat/i.test(x.type))) fixes.push(['Time par apne aap nahi chala?', '"Active" toggle on hai? Settings mein timezone Asia/Kolkata check karo.']);
  if (TB.json.nodes.some((x) => x.type.includes('langchain'))) fixes.push(['AI node par 401 / 429 error?', '401 = API key galat. 429 = credit khatam ya bahut jaldi requests. OpenAI billing page check karo.']);
  if (TB.json.nodes.some((x) => x.type.includes('googleSheets'))) fixes.push(['"Sheet not found" / column khaali?', 'Sheet ID aur tab ka naam (capital/small bhi) check karo. Pehli row mein headers hone chahiye.']);
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('🧯', 'Atak gaye? Yeh check karo', 'Error aana seekhne ka hissa hai — sab atakte hain. Neeche wale points se 90% problems solve ho jaati hain.')}
    <table class="fix"><thead><tr><th>Agar yeh ho raha hai…</th><th>To yeh karo</th></tr></thead><tbody>${fixes.map(([q, a]) => `<tr><td>${esc(q)}</td><td>${esc(a)}</td></tr>`).join('')}</tbody></table>
    ${box('bad', '⚠️ Yeh galtiyan sabse common hain', `<ul class="ml">${L.mistakes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`)}
    ${box('tip', '⭐ Pro tips — time bachane wali tricks', `<ul class="tl2">${L.tips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`)}
    <a class="help" href="${esc(wa)}"><b>Phir bhi atke? Koi baat nahi 🙂</b><span>Screenshot + error message ke saath WhatsApp par poochho →</span></a>
  </section>`);

  // ---------- PRACTICE + CHALLENGE ----------
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('🏋️', 'Practice + Challenge', 'Padhne se zyada banane se seekhte hain. Ek-ek level upar jaao.')}
    <div class="g2">${box('steps', '🛠 Live lab', `<p>${esc(d.lab)}</p>`)}${box('steps', '📝 Homework', `<p>${esc(d.homework)}</p><ul class="checks">${check('Homework ho gaya')}</ul>`)}</div>
    <div class="ladder">${L.practice.map(([lvl, t], i) => `<div class="rung r${i}"><small>${esc(lvl)}</small><p>${esc(t)}</p><i class="cb"></i></div>`).join('')}</div>
    <div class="chl">
      <div class="chl-t">🧩 Aaj ka challenge — pehle khud try karo</div>
      <p class="chl-task">🎯 ${esc(cT)}</p>
      <div class="g2"><div class="hint"><b>💡 Hint 1</b><p>${esc(h1)}</p></div><div class="hint"><b>💡 Hint 2</b><p>${esc(h2t)}</p></div></div>
      <small>✅ Solution aakhri page par hai — pehle 5 minute khud socho 😉</small>
    </div>
  </section>`);

  // ---------- EXPRESSION PRACTICE SHEET (Phase A) ----------
  if (D) {
    S.push(`<section class="pg brk" style="--c:${C}">
    ${h2('🧪', 'Expression practice sheet', 'Input dekho aur khaali jagah mein expression likho. Jawab aakhri page par hain.')}
    <div class="xs">${D.lab.map(([task, input], i) => `<div class="xs-c"><b>${i + 1}. ${esc(task)}</b>${Object.keys(input).length ? `<pre>${esc(JSON.stringify(input))}</pre>` : '<small>Input ki zaroorat nahi</small>'}<div class="xs-w"><span>Mera jawab:</span><i></i></div></div>`).join('')}</div>
  </section>`);
  }

  // ---------- QUIZ + GLOSSARY ----------
  const G = dayGlossary(n);
  S.push(`<section class="pg" style="--c:${C}">
    ${h2('🎯', '2 minute ka self-check', 'Sahi option par gol ghera lagao. Answers aakhri page par — score sirf aapke liye hai.')}
    <div class="quiz">${Q.map(({ q, opts }, i) => `<div class="qz"><b>Q${i + 1}. ${esc(q)}</b><ol>${opts.map((o, k) => `<li><i>${String.fromCharCode(65 + k)}</i>${esc(o)}</li>`).join('')}</ol></div>`).join('')}</div>
    ${G.length ? `<h3 class="sh">📖 Aaj ke naye shabd</h3><dl class="gl">${G.map(([t, x]) => `<div><dt>${esc(t)}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>` : ''}
  </section>`);

  // ---------- MENTOR SCRIPT ----------
  if (mentor) {
    S.push(`<section class="pg brk" style="--c:${C}">
      ${h2('👨‍🏫', 'Mentor notes — class kaise lein', 'Yeh page sirf aapki copy mein hai. Students ki PDF mein nahi jaata.', 'mentor')}
      <ul class="checks big">${L.teach.map((t) => check(esc(t))).join('')}</ul>
      <h3 class="sh">🗣 Har block ke liye mentor tip</h3>
      <ol class="agenda">${d.agenda.map((a, i) => { const X = agendaExplain(n, i); return X.m ? `<li><time>${a[0]}m</time><div><b>${esc(a[1])}</b><p class="ag-m">${esc(X.m)}</p>${X.q && X.q.length ? `<small>Class se poochho: ${X.q.map(esc).join(' · ')}</small>` : ''}</div></li>` : ''; }).join('')}</ol>
    </section>`);
  }

  // ---------- MY NOTES + NEXT ----------
  S.push(`<section class="pg brk notes-pg" style="--c:${C}">
    ${h2('✍️', 'Meri notes', 'Class mein jo naya laga, jo doubt aaya — yahan likho. Kal revise karna aasaan hoga.')}
    <div class="lines">${'<i></i>'.repeat(17)}</div>
    <div class="g2 end">
      ${nextD ? `<div class="next"><small>⏭ Kal kya seekhenge — Day ${nextD.day}</small><b>${esc(nextD.title)}</b><p>“${esc(nextD.hook)}”</p></div>` : `<div class="next"><small>🎓 Aakhri din!</small><b>Course complete</b><p>Agle page par aapka certificate hai — apna naam likho aur share karo.</p></div>`}
      <div class="done"><i class="cb big"></i><div><b>Day ${n} complete! 🎉</b><small>Tick karo aur website par bhi ✅ dabao.</small></div></div>
    </div>
  </section>`);

  // ---------- ANSWERS + LINKS ----------
  const allDocs = [...d.resources, ...L.docs].filter((x, i, a) => a.findIndex((y) => y[1] === x[1]) === i);
  S.push(`<section class="pg brk" style="--c:${C}">
    ${h2('🔑', 'Answer key + useful links', 'Pehle khud try kiya? Ab check karo. Galat hua to explanation padho — wahi asli seekh hai.')}
    <div class="ans">${Q.map(({ opts, ans, ex }, i) => `<div><b>Q${i + 1} → ${String.fromCharCode(65 + ans)}</b><span>${esc(opts[ans])}</span><small>${esc(ex || '')}</small></div>`).join('')}</div>
    ${box('good', '✅ Challenge ka solution', `<p>${esc(sol)}</p>`)}
    ${D ? box('steps', '🧪 Expression sheet ke jawab', `<ol class="tl">${D.lab.map(([t, , e, o]) => `<li><code>${esc(e)}</code> → <b>${esc(o)}</b></li>`).join('')}</ol>`) : ''}
    <div class="g2">
      <div><h3 class="sh">📚 Official docs</h3><ul class="links">${allDocs.map(([t, u]) => `<li><a href="${esc(u)}">${esc(t)} ↗</a></li>`).join('')}</ul>
      <h3 class="sh">▶ Videos</h3><ul class="links">${L.videos.map((q) => `<li><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}">${esc(q)} ↗</a></li>`).join('')}</ul></div>
      <div class="qr-col">${linkCard(wa, '💬', 'Doubt poochho', `WhatsApp: ${cfg.contact.phone}`)}${linkCard(lessonUrl, '🌐', 'Day ' + n + ' lesson page', 'Quiz, copy buttons, videos')}<div class="call"><span>📞</span><div><b>${esc(cfg.contact.phone)}</b><small>Call / WhatsApp — ${esc(cfg.brand)}</small></div></div></div>
    </div>
  </section>`);

  if (n === cfg.totalDays) S.push(certificate());
  return S.join('\n');
}

function certificate() {
  return `<section class="cert">
    <div class="ct-in">
      <span class="ct-logo">${LOGO_FULL}</span>
      <small>${esc(cfg.courseName)}</small>
      <h1>Certificate of Completion</h1>
      <p>Yeh certify kiya jaata hai ki</p>
      <div class="ct-name"></div>
      <p>ne <b>${cfg.totalDays} din</b> ka <b>${esc(cfg.courseName)}</b> course poora kiya — workflows, APIs, AI agents aur real client projects ke saath.</p>
      <div class="ct-sign"><div><i></i><small>Date</small></div><div class="ct-seal">🏆</div><div><i></i><small>Mentor</small></div></div>
    </div>
  </section>`;
}

// ============================================================
//  DOCUMENT WRAPPERS
// ============================================================
function doc({ title, body, header }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/notes.css">
<style>@page { @top-left { content: "${header.replace(/"/g, '')}"; } @bottom-left { content: "📞 ${cfg.contact.phone} · ${cfg.brand} · Doubt? Call / WhatsApp karo"; } }</style>
</head><body><div class="wm" aria-hidden="true">${LOGO_FULL}<span>📞 ${esc(cfg.contact.phone)}</span></div>${body}</body></html>`;
}

function renderNotes(n, { mentor = false } = {}) {
  const d = days.find((x) => x.day === n);
  if (!d || !LESSONS[n]) return null;
  return doc({ title: `Day ${pad(n)} — ${d.title}${mentor ? ' (Mentor)' : ''}`, header: `Day ${pad(n)} · ${d.title}${mentor ? ' · Mentor copy' : ''}`, body: dayBody(n, { mentor }) });
}

function renderBook() {
  const toc = `<section class="pg brk toc">${h2('📚', 'Course index — 25 din, ek jagah', 'Har din ka title aur module. Kisi bhi din par seedha jaane ke liye click karo.')}
    ${modules.map((m) => `<div class="toc-m" style="--c:${m.color}"><b>${m.icon} Module ${m.no} · ${esc(m.title)}</b><ol>${m.days.map((n) => { const d = days.find((x) => x.day === n); return `<li><a href="#day-${n}"><span>Day ${pad(n)}</span>${esc(d.title)}</a></li>`; }).join('')}</ol></div>`).join('')}</section>`;
  const cover = `<section class="cover book" style="--c:${cfg.brandColors.primary}">
    <div class="cv-top"><span class="cv-logo">${LOGO}</span><div><small>${esc(cfg.courseName)}</small><small>📞 ${esc(cfg.contact.phone)}</small></div><span class="cv-badge">📚 COMPLETE NOTES</span></div>
    <div class="cv-mid"><span class="cv-mod">${cfg.totalDays} din · ${cfg.totalDays * cfg.hoursPerClass} ghante · ${modules.length} modules</span><h1>${esc(cfg.courseName)}</h1><p class="cv-hook">“${esc(cfg.tagline)}”</p>
      <div class="cv-chips">${modules.map((m) => `<span>${m.icon} ${esc(m.title)}</span>`).join('')}</div></div>
    <div class="cv-bot"><div class="cv-fill"><span>Naam: <i></i></span><span>Batch: <i></i></span></div></div></section>`;
  const body = cover + toc + days.map((d) => `<div id="day-${d.day}" class="bk-day">${dayBody(d.day, { cover: false }).replace(certificate(), '')}</div>`).join('\n') + certificate();
  return doc({ title: `${cfg.courseName} — Complete Notes`, header: `${cfg.courseName} · Complete notes`, body });
}

module.exports = { renderNotes, renderBook, pdfName, BASE };
