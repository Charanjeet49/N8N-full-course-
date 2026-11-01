// Quick sanity check: sections count + duplicate ids
const { render, registry } = require('../src/render');
const html = render();
const ids = registry.map((r) => r.id);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log(`Sections: ${registry.length}`);
if (dup.length) { console.error('Duplicate ids:', dup); process.exit(1); }
const links = [...html.matchAll(/<a\b[^>]*href="#([^"]+)"/g)].map((m) => m[1]).filter((h) => h && !ids.includes(h));
if (links.length) { console.error('Broken anchors:', [...new Set(links)]); process.exit(1); }
console.log('OK — no duplicate ids, all in-page links valid. HTML size:', (html.length / 1024).toFixed(0) + ' KB');
