// ============================================================
//  KIT — shared helpers: escaping, section builder, cards, chips
// ============================================================
const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const pad = (n) => String(n).padStart(2, '0');
const strip = (s) => String(s).replace(/<[^>]+>/g, '');

// Har page ka apna section builder (numbering + drawer index)
function makeBuilder() {
  const registry = [];
  function sec({ id, title, eyebrow = '', sub = '', body = '', cls = '', group = 'Overview', head = true, style = '', mentor = false }) {
    const n = registry.length + 1;
    registry.push({ id, n, title, group, mentor });
    if (mentor) cls += ' mentor-only';
    const header = head
      ? `<header class="sec-head reveal">
          <span class="sec-num">${pad(n)}</span>
          ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
          <h2 class="sec-title">${title}</h2>
          ${sub ? `<p class="sec-sub">${sub}</p>` : ''}
        </header>`
      : '';
    return `<section id="${id}" class="sec ${cls}" data-sec="${n}" ${style ? `style="${style}"` : ''}>
      <div class="wrap">${header}${body}</div>
    </section>`;
  }
  function drawer() {
    const groups = {};
    registry.forEach((r) => { (groups[r.group] = groups[r.group] || []).push(r); });
    return Object.entries(groups).map(([g, items]) => `<div class="dr-g"><h5>${esc(g)}</h5>${items.map((r) => `<a href="#${r.id}"${r.mentor ? ' class="mentor-only"' : ''}><span>${pad(r.n)}</span>${strip(r.title)}</a>`).join('')}</div>`).join('');
  }
  return { sec, registry, drawer, next: () => registry.length + 1 };
}

const cards = (arr, fn, cols = 3, extra = '') =>
  `<div class="grid g${cols} ${extra}">${arr.map((x, i) => `<div class="card tilt reveal" style="--d:${(i % 6) * 70}ms">${fn(x, i)}</div>`).join('')}</div>`;

const chips = (arr) => `<div class="chips">${arr.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>`;

const extLink = (t, u) => `<a href="${esc(u)}" target="_blank" rel="noopener" class="xlink">${esc(t)} <span>↗</span></a>`;

// YouTube search link (verified-safe: hamesha kaam karta hai, video IDs badalte rehte hain)
const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

module.exports = { esc, pad, strip, makeBuilder, cards, chips, extLink, yt };

// ---------- Node icons + animated workflow diagram ----------
const ICONS = [
  [/trigger|webhook|form|schedule|manual/i, '⚡'], [/agent/i, '🤖'], [/chat model|openai|anthropic|gemini|llm/i, '🧠'],
  [/memory/i, '💾'], [/vector|embedding|splitter/i, '🧬'], [/sheets|excel|airtable/i, '📊'], [/gmail|email|outlook/i, '📧'],
  [/telegram/i, '✈️'], [/whatsapp/i, '💬'], [/slack|discord/i, '💼'], [/http|api|graphql/i, '🌐'], [/code/i, '👨‍💻'],
  [/if|switch|filter/i, '🔀'], [/merge/i, '🔗'], [/loop|split in batches/i, '🔁'], [/wait/i, '⏳'], [/set|edit fields|rename/i, '✏️'],
  [/summar|aggregate/i, '📈'], [/extract|file|pdf/i, '📄'], [/calendar/i, '📅'], [/drive|docs/i, '📁'], [/hubspot|zoho|crm|pipedrive/i, '📇'],
  [/postgres|mysql|supabase|database|redis|mongo/i, '🗄️'], [/notion/i, '📝'], [/github/i, '🐙'], [/error|stop/i, '🚨'],
  [/respond/i, '↩️'], [/crypto/i, '🔐'], [/html|xml|markdown/i, '🧾'], [/ssh|docker|disk/i, '🖥️'], [/rss/i, '📰'],
  [/linkedin/i, '💼'], [/classif|sentiment|information/i, '🏷️'], [/clickup|trello/i, '✅'], [/workflow/i, '🧩'], [/n8n/i, '♾️'],
];
let wireSeq = 0;
const iconFor = (name) => (ICONS.find(([re]) => re.test(name)) || [0, '🔧'])[1];

function flowDiagram(steps, color = 'var(--pri)') {
  const W = 150; const G = 56; const H = 150;
  const width = steps.length * W + (steps.length - 1) * G + 40;
  const nodes = steps.map(([n], i) => {
    const x = 20 + i * (W + G);
    return `<g class="fd-node" style="--i:${i}" transform="translate(${x},30)">
      <rect width="${W}" height="88" rx="18"/>
      <text x="${W / 2}" y="40" class="fd-ic">${iconFor(n)}</text>
      <text x="${W / 2}" y="68" class="fd-lb">${esc(n.length > 20 ? n.slice(0, 19) + '…' : n)}</text>
      <circle cx="0" cy="44" r="5" class="fd-port"/><circle cx="${W}" cy="44" r="5" class="fd-port"/>
    </g>`;
  }).join('');
  const wires = steps.slice(1).map((_, i) => {
    const x1 = 20 + i * (W + G) + W; const x2 = x1 + G; const y = 74;
    const id = `w${(wireSeq += 1)}`;
    return `<path id="${id}" class="fd-wire" d="M${x1} ${y} C${x1 + 28} ${y} ${x2 - 28} ${y} ${x2} ${y}"/>
      <circle r="4.5" class="fd-dot"><animateMotion dur="1.4s" begin="${i * 0.35}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`;
  }).join('');
  return `<div class="fd-wrap" style="--c:${color}"><svg class="fd" viewBox="0 0 ${width} ${H}" style="min-width:${Math.min(width, 900)}px">${wires}${nodes}</svg></div>`;
}

module.exports.iconFor = iconFor;
module.exports.flowDiagram = flowDiagram;
