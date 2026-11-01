// ============================================================
//  NODES LIBRARY PAGE — /nodes
// ============================================================
const cfg = require('../config');
const { nodes, nodeTypes, recipes } = require('../nodes');
const { layout } = require('../layout');
const { esc, pad, makeBuilder, iconFor } = require('../kit');

const byName = Object.fromEntries(nodes.map((n) => [n.name, n]));
const tierLabel = { 1: 'TOP 10', 2: 'TOP 50', 3: 'TOP 100' };

const nodeCard = (n, i = 0) => `<article class="card ncard reveal" id="${n.id}" data-kind="${n.kind}" data-tier="${n.tier}" data-name="${esc((n.name + ' ' + n.category + ' ' + n.desc).toLowerCase())}" style="--d:${(i % 8) * 40}ms">
  <div class="nc-top"><span class="nc-ic">${iconFor(n.name)}</span><span class="nc-rank">#${n.rank}</span><span class="nc-tier t${n.tier}">${tierLabel[n.tier]}</span></div>
  <h3>${esc(n.name)}</h3><small class="nc-cat">${esc(n.category)}</small>
  <p>${esc(n.desc)}</p>
  <div class="nc-use">💡 <b>Use case:</b> ${esc(n.use)}</div>
  <div class="nc-foot"><a href="/day/${n.day}">📘 Day ${n.day} mein</a><a href="${esc(n.docs)}" target="_blank" rel="noopener">Docs ↗</a></div>
</article>`;

function renderNodes() {
  const B = makeBuilder();
  const S = [];

  S.push(B.sec({
    id: 'nodes-hero', title: 'Nodes library', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">Nodes encyclopedia · ${nodes.length} nodes</span>
      <h1 class="lh-title">n8n Nodes Library<br><span class="grad">Top 10 · Top 50 · Top 100</span></h1>
      <p class="lead">Har node kya karta hai, kab use karna hai, real use-case, kis din padhaya jaata hai — aur official docs ka link. Class mein bas yeh page kholo aur samjhao.</p>
      <div class="nfilter">
        <input class="search" id="nodeSearch" placeholder="🔍 Node search karo… (e.g. sheets, agent, webhook)">
        <div class="filters" id="tierFilter"><button class="active" data-tier="all">All</button><button data-tier="1">Top 10</button><button data-tier="2">Top 50</button><button data-tier="3">Top 100</button></div>
        <div class="filters" id="kindFilter"><button class="active" data-kind="all">All types</button>${nodeTypes.map((t) => `<button data-kind="${t.k}">${t.i} ${esc(t.t.replace(' Nodes', '').replace(' (Cluster)', ''))}</button>`).join('')}</div>
      </div></div>`,
  }));

  S.push(B.sec({
    id: 'node-types', group: 'Start', eyebrow: 'Basics', title: 'n8n mein kitne type ke nodes hote hain?',
    sub: 'Simple rule: <b>Trigger</b> se shuru → <b>Core/Data</b> se logic & cleaning → <b>App</b> se action → <b>AI</b> se intelligence.',
    body: `<div class="grid g3">${nodeTypes.map((t, i) => `<div class="card reveal" style="--d:${i * 60}ms"><div class="ic">${t.i}</div><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p><div class="analogy">Example: ${esc(t.ex)}</div><a class="xl" href="${esc(t.docs)}" target="_blank" rel="noopener">Docs ↗</a></div>`).join('')}</div>`,
  }));

  S.push(B.sec({
    id: 'anatomy', group: 'Start', eyebrow: 'Node anatomy', title: 'Ek node ke andar kya hota hai?',
    body: `<div class="anat reveal"><div class="anat-node"><span>🌐</span><b>HTTP Request</b><i class="p-in">input</i><i class="p-out">output</i></div>
      <ul class="checks"><li><b>Parameters</b> — node ki settings (URL, operation, fields)</li><li><b>Credentials</b> — app ka secure login</li><li><b>Input / Output</b> — items aate hain, items jaate hain</li><li><b>Settings</b> — Retry on fail, Always output data, Notes</li><li><b>Expressions</b> — {{ }} se dynamic values</li><li><b>Execute step</b> — sirf yeh node test karo</li></ul></div>`,
  }));

  const top10 = nodes.filter((n) => n.tier === 1);
  S.push(B.sec({
    id: 'top-10', group: 'Rankings', eyebrow: 'Har project mein', title: 'Top 10 nodes jo har project mein lagte hain',
    sub: 'Inko pehle hafte mein master karwao — 80% workflows inhi se bante hain.',
    body: `<ol class="top10">${top10.map((n, i) => `<li class="reveal" style="--d:${i * 60}ms"><b>${pad(i + 1)}</b><span>${iconFor(n.name)}</span><div><a href="#${n.id}"><h3>${esc(n.name)}</h3></a><p>${esc(n.desc)}</p></div><a href="${esc(n.docs)}" target="_blank" rel="noopener" class="b-doc">Docs ↗</a></li>`).join('')}</ol>`,
  }));

  S.push(B.sec({
    id: 'recipes', group: 'Rankings', eyebrow: 'Combos', title: 'Node recipes — kaunse nodes saath mein use hote hain',
    body: `<div class="grid g2">${recipes.map((r, i) => `<div class="card reveal" style="--d:${i * 60}ms"><h3>🍳 ${esc(r.t)}</h3><div class="recipe">${r.n.map((x) => { const nd = byName[x]; return `<a href="#${nd ? nd.id : ''}" class="rc-node">${iconFor(x)} ${esc(x)}</a>`; }).join('<i>→</i>')}</div></div>`).join('')}</div>`,
  }));

  const top50 = nodes.filter((n) => n.tier <= 2);
  S.push(B.sec({
    id: 'top-50', group: 'Rankings', eyebrow: 'Must-know', title: 'Top 50 must-know nodes',
    sub: 'Course khatam hone tak student ko yeh 50 nodes confidently use karne aane chahiye.',
    body: `<div class="t50">${top50.map((n, i) => `<a href="#${n.id}" class="t50-i reveal" style="--d:${(i % 10) * 30}ms"><b>${pad(n.rank)}</b><span>${iconFor(n.name)}</span>${esc(n.name)}</a>`).join('')}</div>`,
  }));

  // Category sections — full library
  const cats = [...new Set(nodes.map((n) => n.category))];
  cats.forEach((c) => {
    const list = nodes.filter((n) => n.category === c).sort((a, b) => a.rank - b.rank);
    S.push(B.sec({
      id: 'cat-' + c.toLowerCase().replace(/[^a-z]+/g, '-'), group: 'Full library (by category)', eyebrow: `${list.length} nodes`, title: esc(c),
      body: `<div class="grid g3 nodes-grid">${list.map(nodeCard).join('')}</div>`,
    }));
  });

  S.push(B.sec({
    id: 'learn-any-node', group: 'Tips', eyebrow: 'Self-learning', title: 'Kisi bhi naye node ko 10 minute mein kaise seekhein',
    body: `<div class="steps-v">${[['Docs kholo', 'Node ke docs mein "Operations" aur "Parameters" padho'], ['Template dhoondho', 'n8n.io/workflows par us node ka ready template import karo'], ['Credential banao', 'Credentials docs follow karke connect karo'], ['Pin + test', 'Sample data pin karke har operation try karo'], ['Community', 'Atke to community.n8n.io par search/post karo']].map(([t, d], i) => `<div class="sv reveal" style="--d:${i * 70}ms"><b>${i + 1}</b><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>`,
  }));

  S.push(B.sec({
    id: 'community-nodes', group: 'Tips', eyebrow: 'Beyond built-in', title: 'Community nodes & HTTP Request fallback',
    body: `<div class="grid g2"><div class="card reveal"><h3>🧩 Community nodes</h3><p>Community dwara banaye gaye extra nodes (self-hosted par install). Production se pehle trust & maintenance check karo.</p><a class="xl" href="https://docs.n8n.io/integrations/community-nodes/" target="_blank" rel="noopener">Community nodes docs ↗</a></div>
      <div class="card reveal"><h3>🌐 Node nahi hai? HTTP Request!</h3><p>Kisi app ka node nahi mila to uski API docs se cURL copy karo aur HTTP Request mein import karo.</p><a class="xl" href="/day/7">Day 7 lesson →</a></div></div>`,
  }));

  return layout({
    title: `n8n Nodes Library — Top 10, Top 50, Top 100 nodes (Hinglish) | ${cfg.brand}`,
    desc: `${nodes.length} n8n nodes explained in Hinglish: node types, top 10 essential, top 50 must-know, use cases and official docs links.`,
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'nodes',
  });
}

module.exports = { renderNodes };
