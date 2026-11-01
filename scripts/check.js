// Sanity check: har page ke sections, duplicate ids, broken internal links
const { renderAll } = require('../src/site');
const pages = renderAll();
let total = 0; let bad = 0;
const idsOf = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const idMap = Object.fromEntries(Object.entries(pages).map(([r, h]) => [r, new Set(idsOf(h))]));
for (const [route, html] of Object.entries(pages)) {
  if (!html) { console.error('Empty page', route); bad++; continue; }
  const secs = (html.match(/<section /g) || []).length; total += secs;
  const ids = idsOf(html); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) { console.error(route, 'duplicate ids:', [...new Set(dup)]); bad++; }
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [p, h] = href.split('#'); const target = p || route;
    if (!pages[target]) { console.error(route, 'broken page link:', href); bad++; continue; }
    if (h && !idMap[target].has(h)) { console.error(route, 'broken anchor:', href); bad++; }
  }
  console.log(`${route.padEnd(8)} ${String(secs).padStart(4)} sections  ${(html.length / 1024).toFixed(0)} KB`);
}
console.log(`\nPages: ${Object.keys(pages).length} · Total sections: ${total}`);
if (bad) { console.error(`❌ ${bad} problem(s)`); process.exit(1); }
console.log('✅ OK — no duplicate ids, all internal links valid');
