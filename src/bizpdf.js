// ============================================================
//  BUSINESS TRACK PDF — 10 industries, har ek ke 2-3 page
//  Student copy → public/pdf/business-track.pdf
//  Mentor copy  → pdf-mentor/business-track-mentor.pdf (+ Speed Build Battle guide)
// ============================================================
const cfg = require('./config');
const { days } = require('./curriculum');
const { esc, pad } = require('./kit');
const { doc, h2, box, flow, LOGO, BASE } = require('./notes');
const { INDUSTRIES, DECK, bizBuilds } = require('./bizlib');
const { BATTLE } = require('./battle');

const title = Object.fromEntries(days.map((d) => [d.day, d.title]));
const dayTags = (list) => list.map((n) => `<span class="bz-day" title="${esc(title[n] || '')}">D${pad(n)}</span>`).join('');
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const strip = (s) => s.replace(/^"|"$/g, '');

function roiOf(ind) {
  const { perMonth, minsSaved, costPerHour } = ind.roi;
  const hrs = (perMonth * minsSaved) / 60;
  return { hrs, money: hrs * costPerHour };
}

function cover() {
  return `<section class="cover book" style="--c:${cfg.brandColors.primary}">
    <div class="cv-top"><span class="cv-logo">${LOGO}</span><div><small>${esc(cfg.courseName)}</small><small>📞 ${esc(cfg.contact.phone)}</small></div><span class="cv-badge">💼 BUSINESS TRACK</span></div>
    <div class="cv-mid"><span class="cv-mod">${INDUSTRIES.length} industries · 6 agent types · ${INDUSTRIES.length * 3} projects</span>
      <h1>AI Agents for Business</h1>
      <p class="cv-hook">“Har business ka kaam alag dikhta hai, par andar se wahi 6 agents hain. Ek baar pattern samajh liya, to kisi bhi client ka system design kar loge.”</p>
      <div class="cv-chips">${INDUSTRIES.map((ind) => `<span>${ind.i} ${esc(ind.name)}</span>`).join('')}</div></div>
    <div class="cv-bot"><div class="cv-fill"><span>Naam: <i></i></span><span>Batch: <i></i></span></div><small>Kahaniyon ke business naam kalpanik hain. Pricing andaaza hai: apne shehar aur client ke hisaab se badlo.</small></div></section>`;
}

function intro() {
  return `<section class="pg brk" style="--c:${cfg.brandColors.primary}">
    ${h2('🧭', 'Is book ko kaise padhein', 'Har industry = ek mission. Same 8 hisse, same order — taaki pattern dimaag mein baith jaaye.')}
    <div class="g2">
      ${box('steps', '📖 Har industry mein kya milega', `<ol class="bz-ol"><li><b>Story mission</b> — ek kalpanik business ki problem</li><li><b>Pain map</b> — kis kaam mein kitna time jaata hai, n8n ke baad kitna</li><li><b>AI agents</b> — kaunse agent, kaunse nodes, kaunse din seekha</li><li><b>Sheet schema</b> — columns aur har column kyun</li><li><b>3 projects</b> — Easy (1 ghanta) se Pro tak</li><li><b>Level 1 flow</b> — website par ready JSON</li><li><b>ROI</b> — mahine ka time aur paisa</li><li><b>Sell karo</b> — pitch, price, demo, objections</li></ol>`)}
      <div>
        ${box('tip', '🎓 Student ho to', 'Course ke din ke saath chalo. Har agent ke saath <b>D05, D11</b> jaise tag hain: woh din padh liya to woh agent bana sakte ho. Har industry ka Level 1 project website par import karke chalao.')}
        ${box('earn', '💼 Business owner ho to', 'Apni industry ka Pain map aur ROI dekho. Level 1 ek ghante mein lag jaata hai: wahin se shuru karo, phir AI agents jodo.')}
      </div>
    </div>
    <h3 class="sh">📚 Index — ${INDUSTRIES.length} industries</h3>
    <div class="bz-toc">${INDUSTRIES.map((ind, i) => `<a href="#biz-${ind.slug}" style="--c:${ind.color}"><span>${pad(i + 1)}</span><b>${ind.i} ${esc(ind.name)}</b><small>${esc(ind.tagline)}</small></a>`).join('')}</div>
  </section>`;
}

function deckPage() {
  return `<section class="pg brk" style="--c:${cfg.brandColors.primary}">
    ${h2('🃏', 'Agent Deck — sirf 6 type ke agents', 'Har industry ke agents inhi 6 cards se bante hain. Naam alag, pattern same.')}
    <div class="bz-deck">${Object.entries(DECK).map(([k, c]) => {
      const used = INDUSTRIES.flatMap((ind) => ind.agents.filter((a) => a[4] === k).map((a) => `${ind.i} ${a[0]}`));
      return `<div class="bz-card"><div class="bz-card-h"><span>${c.i}</span><b>${esc(c.t)}</b><em>${c.suit}</em></div><p>${esc(c.d)}</p><div class="bz-days">${dayTags(c.days)}</div><small><b>${used.length} agents:</b> ${esc(used.slice(0, 5).join(' · '))}${used.length > 5 ? ' …' : ''}</small></div>`;
    }).join('')}</div>
    ${box('concept', '💡 Design ka 3-step formula (kisi bhi client ke liye)', '<ol class="bz-ol"><li><b>Pain map banao:</b> owner se poochho "roz kaunsa kaam sabse zyada time leta hai?" — top 5 likho.</li><li><b>Card match karo:</b> har pain ke saamne Deck ka ek card rakho (reply = Receptionist, follow-up = Nurturer, report = Reporter…).</li><li><b>Pehle data, phir AI:</b> Google Sheet schema pehle banao, Level 1 (form → sheet → alert) chalao, AI baad mein jodo.</li></ol>')}
  </section>`;
}

function industryPages(ind, i) {
  const wf = bizBuilds()[ind.slug];
  const nodes = wf.json.nodes.filter((n) => n.type !== 'n8n-nodes-base.stickyNote');
  const { hrs, money } = roiOf(ind);
  const before = ind.pains.reduce((a, p) => a + p[1], 0);
  const after = ind.pains.reduce((a, p) => a + p[2], 0);
  const S = ind.sell;
  return `<section class="pg bz-ind" id="biz-${ind.slug}" style="--c:${ind.color}">
    <div class="day-div bz-div"><span>INDUSTRY ${pad(i + 1)} / ${pad(INDUSTRIES.length)}</span><h1>${ind.i} ${esc(ind.name)}</h1><p>${esc(ind.tagline)}</p></div>
    <div class="g2">
      ${box('why', `📖 Kahani — ${esc(ind.story.biz)}`, `<p>${esc(ind.story.text)}</p>`)}
      ${box('good', '🎯 Aapka mission', `<p>${esc(ind.story.mission)}</p>`)}
    </div>
    <h3 class="sh">😩 Pain map — minute per enquiry/kaam</h3>
    <table class="nat bz-pain"><thead><tr><th>Kaam</th><th>Pehle</th><th>n8n ke baad</th><th></th></tr></thead><tbody>
      ${ind.pains.map(([t, b, a]) => `<tr><td>${esc(t)}</td><td>${b} min</td><td><b>${a} min</b></td><td class="bz-bar"><i style="width:${Math.round((b / before) * 100)}%"></i><i class="a" style="width:${Math.round((a / before) * 100)}%"></i></td></tr>`).join('')}
      <tr class="bz-tot"><td><b>Total</b></td><td>${before} min</td><td><b>${after} min</b></td><td><b>${Math.round((1 - after / before) * 100)}% kam</b></td></tr></tbody></table>
    <h3 class="sh">🤖 Is business ke ${ind.agents.length} AI agents</h3>
    <table class="nat"><thead><tr><th>Agent</th><th>Kya karta hai</th><th>Nodes</th><th>Din</th></tr></thead><tbody>
      ${ind.agents.map(([n, d, nd, ds, k]) => `<tr><td><b>${DECK[k].i} ${esc(n)}</b><br><small class="bz-k">${esc(DECK[k].t)}</small></td><td>${esc(d)}</td><td><code>${esc(nd)}</code></td><td class="bz-days">${dayTags(ds)}</td></tr>`).join('')}</tbody></table>

    <h3 class="sh">🗂️ Google Sheet schema — tab "${esc(ind.schema.sheet)}"</h3>
    <table class="nat bz-schema"><thead><tr><th>Column</th><th>Kyun chahiye</th><th>Example</th></tr></thead><tbody>
      ${ind.schema.cols.map(([c, why], k) => `<tr><td><code>${esc(c)}</code></td><td>${esc(why)}</td><td><small>${esc(ind.schema.sample[k] || '')}</small></td></tr>`).join('')}</tbody></table>
    ${ind.schema.more.length ? `<table class="nat bz-more"><thead><tr><th>Aur tabs</th><th>Columns</th><th>Kaun use karta hai</th></tr></thead><tbody>${ind.schema.more.map(([s, c, w]) => `<tr><td><b>${esc(s)}</b></td><td><code>${esc(c)}</code></td><td>${esc(w)}</td></tr>`).join('')}</tbody></table>` : ''}

    <h3 class="sh">🧱 3 projects — Easy se Pro tak</h3>
    <div class="bz-ladder">${ind.projects.map(([t, d, time, ds], k) => `<div class="bz-rung"><span>Level ${k + 1}</span><b>${esc(t)}</b><p>${esc(d)}</p><small>⏱ ${esc(time)} · ${dayTags(ds)}</small></div>`).join('')}</div>

    <h3 class="sh">⚡ Level 1 workflow — ${nodes.length} nodes</h3>
    ${flow(nodes.map((n) => [n.name, n.type.split('.').pop().replace(/Trigger$/, ' trigger')]), ind.color)}
    <p class="bz-note">Ready JSON: <b>${esc(BASE.replace(/^https?:\/\//, ''))}/business/${ind.slug}</b> → "Copy workflow JSON" → n8n mein paste. Setup: Google Sheet tab "${esc(ind.schema.sheet)}" + Telegram chat ID.</p>

    <div class="g2 bz-money">
      ${box('earn', '💰 ROI — ek example', `<p><b>${ind.roi.perMonth}</b> ${esc(ind.roi.unit)} × <b>${ind.roi.minsSaved} min</b> bachat = <b>${Math.round(hrs)} ghante/mahina</b>.<br>₹${ind.roi.costPerHour}/ghanta staff cost par = <b class="bz-big">${inr(money)} / mahina</b> ki bachat.</p><small>Apne numbers website ke ROI calculator mein daalo.</small>`)}
      ${box('good', '🏷️ Kitna charge karein', `<p>Setup: <b>${esc(S.setup)}</b><br>Monthly support: <b>${esc(S.monthly)}</b></p><small>Rule: client ki mahine ki bachat ka 1/4 se zyada mat maango, phir bhi deal aasaan rahegi.</small>`)}
    </div>
    ${box('concept', '🎤 Pitch (client ki language mein)', `<p class="bz-pitch">${esc(strip(S.pitch))}</p>`)}
    <div class="g2">
      ${box('steps', '📱 Demo — 4 step', `<ol class="bz-ol">${S.demo.map((d) => `<li>${esc(d)}</li>`).join('')}</ol>`)}
      ${box('bad', '🙋 Client ke sawaal → aapka jawab', S.objections.map(([q, a]) => `<p class="bz-obj"><b>“${esc(q)}”</b><br>${esc(a)}</p>`).join(''))}
    </div>
  </section>`;
}

function battlePages() {
  const B = BATTLE;
  return `<section class="pg brk" style="--c:#f59e0b">
    ${h2('🏁', 'Speed Build Battle — mentor class guide', 'Sirf mentor copy. 2 ghante ki fun class: teams, card draw, 2 build rounds, demo + pitch.', 'mentor')}
    <div class="g2">${box('why', '🗓️ Kab chalayein', `<p>${esc(B.when)}</p>`)}${box('tip', '👥 Teams', `<p>${esc(B.team)}</p>`)}</div>
    ${box('steps', '🧰 Class se pehle taiyaari', `<ul class="bz-ol">${B.need.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`)}
    <h3 class="sh">⏱️ Class plan (minute)</h3>
    <table class="nat"><thead><tr><th>Minute</th><th>Kya</th><th>Kaise</th></tr></thead><tbody>${B.plan.map(([t, a, d]) => `<tr><td><b>${t}</b></td><td><b>${esc(a)}</b></td><td>${esc(d)}</td></tr>`).join('')}</tbody></table>
    <h3 class="sh">🃏 Twist cards — print karke kaato</h3>
    <div class="bz-twists">${B.twists.map(([i, t, d, n, day]) => `<div class="bz-tw"><span>${i}</span><b>${esc(t)}</b><p>${esc(d)}</p><small>Hint: <code>${esc(n)}</code> · D${pad(day)}</small></div>`).join('')}</div>
    <h3 class="sh">🎲 Industry chits</h3>
    <div class="bz-chits">${INDUSTRIES.map((ind) => `<span style="--c:${ind.color}">${ind.i} ${esc(ind.name)}</span>`).join('')}</div>
  </section>
  <section class="pg brk" style="--c:#f59e0b">
    ${h2('🏆', 'Score sheet + mentor tips', '100 points. Har team ke liye ek column.', 'mentor')}
    <table class="nat bz-score"><thead><tr><th>Kya check karna hai</th><th>Max</th>${[1, 2, 3, 4, 5].map((t) => `<th>Team ${t}</th>`).join('')}</tr></thead><tbody>
      ${B.score.map(([t, m]) => `<tr><td>${esc(t)}</td><td><b>${m}</b></td>${'<td></td>'.repeat(5)}</tr>`).join('')}
      <tr class="bz-tot"><td><b>Total</b></td><td><b>100</b></td>${'<td></td>'.repeat(5)}</tr></tbody></table>
    ${box('tip', '👨‍🏫 Mentor tips', `<ul class="bz-ol">${B.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`)}
  </section>`;
}

function renderBizPdf({ mentor = false } = {}) {
  const body = cover() + intro() + deckPage() + INDUSTRIES.map(industryPages).join('\n') + (mentor ? battlePages() : '');
  return doc({ title: `Business Track — AI Agents for Business${mentor ? ' (Mentor)' : ''}`, header: `Business Track · ${INDUSTRIES.length} industries${mentor ? ' · Mentor copy' : ''}`, body });
}

module.exports = { renderBizPdf, BIZ_PDF: 'business-track.pdf', BIZ_PDF_MENTOR: 'business-track-mentor.pdf' };
