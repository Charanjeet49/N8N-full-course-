// ============================================================
//  BUSINESS TRACK — /business  +  /business/:slug
//  Har industry ke liye: story mission, pain map, agents, schema,
//  3 projects, Level 1 workflow, ROI calculator, "sell karo"
// ============================================================
const cfg = require('../config');
const { days } = require('../curriculum');
const { layout } = require('../layout');
const { esc, pad, makeBuilder, flowDiagram } = require('../kit');
const { INDUSTRIES, DECK, bizBuilds } = require('../bizlib');
const { XP } = require('../game');

const dayTitle = Object.fromEntries(days.map((d) => [d.day, d.title]));
const dayLinks = (list) => list.map((d) => `<a class="biz-day" href="/day/${d}" title="${esc(dayTitle[d])}">Day ${d}</a>`).join('');
const copyBtn = (text, label = 'Copy') => `<button class="copy" data-copy="${esc(text)}">${label}</button>`;
const LEVELS = [['Level 1', 'Easy', '🟢'], ['Level 2', 'Medium', '🟡'], ['Level 3', 'Pro', '🔴']];

const deckCard = (key, extra = '') => {
  const c = DECK[key];
  return `<div class="deck-card reveal" data-suit="${c.suit}"><span class="dk-suit">${c.suit}</span><span class="dk-ic">${c.i}</span><b>${esc(c.t)}</b><p>${esc(c.d)}</p><div class="dk-days">${dayLinks(c.days)}</div>${extra}</div>`;
};

// ---------------- /business (index) ----------------
function renderBusiness() {
  const B = makeBuilder();
  const S = [];
  S.push(B.sec({
    id: 'biz-hero', title: 'Business Track', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">💼 Business Track · ${INDUSTRIES.length} industries</span>
      <h1 class="lh-title">Har business ke liye<br><span class="grad">AI agents ka ready blueprint</span></h1>
      <p class="lead">Travel company ho, real estate ya clinic — yahan har industry ka ek "mission" hai: unki asli problem, kaunse AI agents banenge, Google Sheet ka schema, 3 level ke projects aur ek ready n8n workflow. Students ke liye practice, business owners ke liye roadmap.</p>
      <div class="hero-cta"><a href="#industries" class="btn btn-primary magnetic">🏢 Apni industry chuno</a><a href="#agent-deck" class="btn btn-ghost">🃏 Agent Deck</a></div></div>`,
  }));
  S.push(B.sec({
    id: 'industries', group: 'Industries', eyebrow: `${INDUSTRIES.length} missions`, title: '🏢 Industry chuno, mission shuru karo',
    sub: 'Har card ek business ki kahani hai. Kholo, padho, aur Level 1 project aaj hi bana lo.',
    body: `<div class="biz-grid">${INDUSTRIES.map((ind, i) => `<a href="/business/${ind.slug}" class="biz-card reveal" data-biz-card="${ind.slug}" style="--c:${ind.color};--d:${(i % 5) * 50}ms">
        <span class="bz-ic">${ind.i}</span><b>${esc(ind.name)}</b><p>${esc(ind.tagline)}</p>
        <div class="bz-meta"><span>🤖 ${ind.agents.length} agents</span><span>🧱 3 projects</span><span class="bz-done" data-biz-done>✅ Mission done</span></div></a>`).join('')}</div>`,
  }));
  S.push(B.sec({
    id: 'agent-deck', group: 'Agent Deck', eyebrow: '6 cards · har industry mein yahi', title: '🃏 Agent Deck — sirf 6 type ke agents',
    sub: 'Sab industries mein agents alag dikhte hain, par andar se yahi 6 pattern hain. Yeh 6 samajh liye to kisi bhi business ka system design kar loge.',
    body: `<div class="deck">${Object.keys(DECK).map((k) => {
      const used = INDUSTRIES.flatMap((ind) => ind.agents.filter((a) => a[4] === k).map((a) => `<a href="/business/${ind.slug}#agents">${ind.i} ${esc(a[0])}</a>`));
      return deckCard(k, `<details class="dk-more"><summary>Kahan-kahan use hota hai (${used.length})</summary><div>${used.join('')}</div></details>`);
    }).join('')}</div>`,
  }));
  S.push(B.sec({
    id: 'how-to-use', group: 'Kaise padhein', eyebrow: 'Kaise use karein', title: '🧭 Is track ko kaise use karein',
    body: `<div class="grid g2"><div class="panel reveal"><h4>🎓 Student ho to</h4><ol class="biz-steps"><li>Course ke din ke saath chalo — har agent ke neeche likha hai kaunse din seekha.</li><li>Ek industry chuno aur uska <b>Level 1</b> project banao (JSON ready hai).</li><li>"Mission done" tick karo — <b>+${XP.project} XP</b> aur badge milega.</li><li>Level 2/3 ko apne portfolio project ki tarah banao.</li></ol></div>
      <div class="panel reveal"><h4>💼 Business owner ho to</h4><ol class="biz-steps"><li>Apni industry ka page kholo aur "Pain map" dekho — kitna time bach sakta hai.</li><li>ROI calculator mein apne numbers daalo.</li><li>Level 1 se shuru karo (1 ghanta), phir AI agents jodo.</li><li>Madad chahiye? <a href="https://wa.me/${esc(cfg.contact.whatsapp)}?text=${encodeURIComponent('Mujhe apne business ke liye AI automation chahiye')}" target="_blank" rel="noopener">WhatsApp karo</a>.</li></ol></div></div>
      <p class="hint reveal">ℹ️ Kahaniyon ke business naam kalpanik hain aur pricing andaaza hai — apne shehar aur client ke hisaab se badlo.</p>`,
  }));
  return layout({
    title: `Business Track — industry-wise AI agents & n8n projects | ${cfg.brand}`,
    desc: 'Travel, real estate, clinic, coaching, e-commerce aur 5 aur industries ke liye AI agents, data schema, projects aur ready n8n workflows (Hinglish).',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'business',
  });
}

// ---------------- /business/:slug ----------------
function renderIndustry(slug) {
  const ind = INDUSTRIES.find((x) => x.slug === slug);
  if (!ind) return null;
  const wf = bizBuilds()[slug];
  const B = makeBuilder();
  const S = [];
  const G = ind.name;
  const idx = INDUSTRIES.indexOf(ind);

  S.push(B.sec({
    id: 'mission', title: 'Story mission', head: false, cls: 'lesson-hero', group: G, style: `--c:${ind.color}`,
    body: `<nav class="crumbs reveal"><a href="/">Home</a> / <a href="/business">Business Track</a> / <b>${esc(ind.name)}</b></nav>
      <div class="biz-hero reveal">
        <div><span class="eyebrow">${ind.i} ${esc(ind.name)} · Story mission</span>
          <h1 class="lh-title">${esc(ind.name)}<br><span class="grad">${esc(ind.tagline)}</span></h1>
          <div class="biz-story"><b>📖 ${esc(ind.story.biz)}</b><p>${esc(ind.story.text)}</p></div>
          <div class="biz-mission"><span>🎯 Aapka mission</span><p>${esc(ind.story.mission)}</p></div>
          <div class="hero-cta"><a href="#level-1" class="btn btn-primary magnetic">⚡ Level 1 workflow (JSON)</a><a href="#agents" class="btn btn-ghost">🤖 Agents</a><a href="#roi" class="btn btn-ghost">💰 ROI</a></div></div>
        <div class="biz-badge" style="--c:${ind.color}"><span>${ind.i}</span><b>${ind.agents.length} agents</b><small>3 projects · 1 ready workflow</small></div>
      </div>`,
  }));

  const maxH = Math.max(...ind.pains.map((p) => p[1]));
  const before = ind.pains.reduce((a, p) => a + p[1], 0); const after = ind.pains.reduce((a, p) => a + p[2], 0);
  S.push(B.sec({
    id: 'pain-map', group: G, eyebrow: 'Pain → Automation', title: '😩 Kahan time ja raha hai, aur n8n kitna bachata hai',
    sub: 'Har line ek roz ka kaam hai. Laal = abhi kitne ghante/mahina, hara = automation ke baad (andaaza).',
    body: `<div class="pain-map">${ind.pains.map(([t, b, a], i) => `<div class="pm-row reveal" style="--d:${i * 50}ms"><span class="pm-t">${esc(t)}</span><div class="pm-bars"><i class="pm-b" style="--w:${(b / maxH) * 100}%"><em>${b}h</em></i><i class="pm-a" style="--w:${Math.max(2, (a / maxH) * 100)}%"><em>${a}h</em></i></div></div>`).join('')}</div>
      <p class="ba-note reveal">⏱ Kul: <b>${before} ghante/mahina → ${after} ghante</b>. Yaani har mahine lagbhag <b>${before - after} ghante</b> (≈ ${Math.round((before - after) / 8)} working din) bachenge.</p>`,
  }));

  S.push(B.sec({
    id: 'agents', group: G, eyebrow: `${ind.agents.length} agents`, title: '🤖 Is business ke AI agents',
    sub: 'Har agent ke saath likha hai woh Agent Deck ka kaunsa type hai aur course ke kis din seekha.',
    body: `<div class="grid g2">${ind.agents.map(([n, d, nodes, dl, type], i) => `<div class="card biz-agent reveal" style="--c:${ind.color};--d:${i * 60}ms"><div class="bag-h"><span class="bag-type" title="${esc(DECK[type].t)}">${DECK[type].i} ${esc(DECK[type].t)}</span><h3>${esc(n)}</h3></div><p>${esc(d)}</p><p class="bag-nodes">🧩 <b>Nodes:</b> ${esc(nodes)}</p><div class="dk-days"><small>Seekho:</small>${dayLinks(dl)}</div></div>`).join('')}</div>`,
  }));

  const csv = [ind.schema.cols.map((c) => c[0]).join(','), ind.schema.sample.map((v) => (/,/.test(v) ? `"${v}"` : v)).join(',')].join('\n');
  S.push(B.sec({
    id: 'schema', group: G, eyebrow: 'Data schema', title: `🗂️ Google Sheet schema — "${esc(ind.schema.sheet)}"`,
    sub: 'Schema matlab register ke columns. Sahi columns pehle din se rakhoge to baad mein reports aur AI dono aasaan.',
    body: `<div class="two biz-schema"><div class="na-t reveal"><table><thead><tr><th>Column</th><th>Kyun zaroori hai</th><th>Example</th></tr></thead><tbody>${ind.schema.cols.map(([c, w], i) => `<tr><td><code>${esc(c)}</code></td><td>${esc(w)}</td><td>${esc(ind.schema.sample[i] || '')}</td></tr>`).join('')}</tbody></table></div>
      <div><div class="code-card reveal"><div class="cc-h"><b>📋 Headers + 1 sample row (CSV)</b>${copyBtn(csv)}</div><pre>${esc(csv)}</pre></div>
        <p class="hint reveal">Copy karo → Google Sheet ki pehli cell par paste → <i>Data → Split text to columns</i>.</p>
        <h4 class="stk-h reveal">➕ Saath mein aur sheets</h4><div class="biz-more">${ind.schema.more.map(([s, c, w]) => `<div class="bm reveal"><b>▦ ${esc(s)}</b><code>${esc(c)}</code><small>${esc(w)}</small></div>`).join('')}</div></div></div>`,
  }));

  S.push(B.sec({
    id: 'projects', group: G, eyebrow: '3 levels', title: '🧱 3 projects — Easy se Pro tak',
    sub: 'Level 1 aaj hi bana sakte ho (JSON neeche hai). Level 2 aur 3 course ke aage ke din seekhne ke baad.',
    body: `<div class="ladder biz-ladder">${ind.projects.map(([t, d, time, dl], i) => `<div class="rung reveal r${i}" style="--d:${i * 90}ms"><small>${LEVELS[i][2]} ${LEVELS[i][0]} · ${LEVELS[i][1]} · ⏱ ${esc(time)}</small><b>${esc(t)}</b><p>${esc(d)}</p><div class="dk-days">${dayLinks(dl)}</div></div>`).join('')}</div>`,
  }));

  const flow = [[`n8n Form Trigger`, ind.form.map((f) => f[0]).slice(0, 3).join(', ') + '…'], ['Edit Fields', `${ind.schema.cols[0][0]} + time`], ['Google Sheets', `"${ind.schema.sheet}" mein row`], ['Telegram', 'Owner ko alert']];
  S.push(B.sec({
    id: 'level-1', group: G, eyebrow: 'Ready workflow', title: '⚡ Level 1 — import karo aur chalao',
    sub: 'Copy karo → n8n canvas par paste karo → Google Sheets + Telegram connect karo → form test karo.',
    body: `<script type="application/json" id="wf-biz-${ind.slug}">${wf.jsonText.replace(/</g, '\\u003c')}</script>
      <div class="tb reveal" style="--c:${ind.color}"><div class="tb-head"><div><span class="tb-tag">⚡ Level 1 · ${wf.nodes} nodes</span><h3>${esc(ind.projects[0][0])}</h3><p>${esc(ind.projects[0][1])}</p></div>
        <div class="tb-actions"><button class="btn btn-primary" data-copy-el="wf-biz-${ind.slug}">📋 Copy workflow JSON</button><a class="btn btn-ghost" href="${wf.url}" download>⬇ Download .json</a></div></div>
        ${flowDiagram(flow, ind.color)}
        <div class="tb-how"><b>Setup:</b> ${wf.creds.map((c) => esc(c)).join(' · ')} · Sheet mein tab "${esc(ind.schema.sheet)}" banao.</div></div>
      <div class="chl reveal biz-done-box" data-biz="${ind.slug}" style="--c:${ind.color}"><p class="chl-task">🏁 Mission check: form bharo → sheet mein row aayi? Telegram par alert aaya?</p><div class="chl-done"><button type="button" class="btn btn-primary sm" data-biz-done-btn="${ind.slug}">✅ Maine Level 1 bana liya</button><span class="xp-tag">+${XP.project} XP · business badge</span></div></div>`,
  }));

  S.push(B.sec({
    id: 'roi', group: G, eyebrow: 'ROI calculator', title: '💰 Is business mein kitna bachega?',
    sub: 'Apne (ya client ke) numbers daalo. Yahi calculation client ko dikhao — business owner ROI samajhta hai.',
    body: `<div class="calc reveal" data-calc="biz">
      <label>${esc(ind.roi.unit)} <output>${ind.roi.perMonth}</output><input type="range" min="10" max="${ind.roi.perMonth * 4}" step="10" value="${ind.roi.perMonth}" name="n"></label>
      <label>Har ek par bachne wale minute <output>${ind.roi.minsSaved}</output><input type="range" min="1" max="60" value="${ind.roi.minsSaved}" name="m"></label>
      <label>Staff ka kharcha per ghanta (₹) <output>${ind.roi.costPerHour}</output><input type="range" min="50" max="1000" step="10" value="${ind.roi.costPerHour}" name="c"></label>
      <div class="calc-out"><small>Har mahine bachat</small><b data-biz-out>₹0</b><small data-biz-hrs></small></div></div>`,
  }));

  S.push(B.sec({
    id: 'sell', group: G, eyebrow: 'Sell karo', title: '🤝 Yeh service client ko kaise bechein',
    sub: 'Freelancer / agency ke liye: pitch, demo, pricing aur common sawaal.',
    body: `<div class="grid g2"><div class="panel reveal"><h4>🎤 Ek line ka pitch</h4><p class="biz-pitch">${esc(ind.sell.pitch)}</p>
        <h4>💵 Indicative pricing</h4><ul class="xp-rules"><li><span>🧱</span>Setup (ek baar)<b>${esc(ind.sell.setup)}</b></li><li><span>🔁</span>Maintenance / mahina<b>${esc(ind.sell.monthly)}</b></li></ul></div>
      <div class="panel reveal"><h4>📱 5 minute ka demo</h4><ol class="biz-steps">${ind.sell.demo.map((d) => `<li>${esc(d)}</li>`).join('')}</ol></div></div>
      <div class="faq reveal">${ind.sell.objections.map(([q, a]) => `<details><summary>🙋 "${esc(q)}"<i>+</i></summary><p>${esc(a)}</p></details>`).join('')}</div>`,
  }));

  const prev = INDUSTRIES[(idx - 1 + INDUSTRIES.length) % INDUSTRIES.length]; const next = INDUSTRIES[(idx + 1) % INDUSTRIES.length];
  S.push(B.sec({
    id: 'next-industry', group: G, eyebrow: 'Aage', title: '🗺️ Agla mission',
    body: `<nav class="lesson-next reveal"><a href="/business/${prev.slug}" class="btn btn-ghost">← ${prev.i} ${esc(prev.name)}</a><a href="/business" class="btn btn-ghost">💼 Saari industries</a><a href="/business/${next.slug}" class="btn btn-primary magnetic">${next.i} ${esc(next.name)} →</a></nav>`,
  }));

  return layout({
    title: `${ind.name} ke liye AI agents & n8n automation | ${cfg.brand}`,
    desc: `${ind.name}: ${ind.tagline}. AI agents, Google Sheet schema, 3 projects, ready n8n workflow aur ROI calculator (Hinglish).`,
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'business', label: 'sections',
  });
}

module.exports = { renderBusiness, renderIndustry, pad };
