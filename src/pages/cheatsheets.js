// ============================================================
//  CHEAT SHEETS + EXPRESSION PLAYGROUND — /cheatsheets
// ============================================================
const cfg = require('../config');
const { layout } = require('../layout');
const { esc, makeBuilder } = require('../kit');
const { glossary } = require('../student');

const EXPR = [
  ['Field padhna', '{{ $json.name }}', 'Current item ka "name"'],
  ['Nested field', '{{ $json.customer.city }}', 'Andar wali value'],
  ['Kisi aur node ka data', "{{ $('Webhook').item.json.body.email }}", 'Pichhle kisi node se'],
  ['Aaj ki date', "{{ $now.toFormat('dd LLL yyyy') }}", '01 Nov 2026'],
  ['Kal ki date', "{{ $now.plus({ days: 1 }).toFormat('yyyy-MM-dd') }}", 'Date math'],
  ['Proper case', '{{ $json.name.toLowerCase().toTitleCase() }}', 'rAHUL SHARMA → Rahul Sharma'],
  ['Valid email?', '{{ $json.email.isEmail() }}', 'true / false'],
  ['Email ka domain', '{{ $json.email.extractDomain() }}', 'gmail.com'],
  ['Sirf digits', "{{ $json.phone.replace(/\\D/g, '') }}", '98765-43210 → 9876543210'],
  ['Default value', "{{ $json.city || 'Unknown' }}", 'Khaali ho to fallback'],
  ['If-else ek line', "{{ $json.score > 70 ? 'hot' : 'cold' }}", 'Ternary'],
  ['Number format', "{{ $json.amount.toLocaleString('en-IN') }}", '125000 → 1,25,000'],
  ['List ki length', '{{ $json.items.length }}', 'Kitne items'],
  ['List ko jodna', "{{ $json.tags.join(', ') }}", '["a","b"] → a, b'],
];
const KEYS = [['Ctrl/⌘ + C / V', 'Nodes copy / paste (workflow JSON bhi)'], ['Ctrl/⌘ + Enter', 'Workflow test karo'], ['Tab', 'Node add karne ka panel'], ['Ctrl/⌘ + S', 'Save'], ['D', 'Node disable / enable'], ['P', 'Data pin karo (test data fix)'], ['Ctrl/⌘ + Z', 'Undo'], ['Shift + drag', 'Canvas move'], ['1 / 0', 'Zoom fit / reset'], ['F2', 'Node rename']];
const PICK = [['Time par chalana hai', 'Schedule Trigger'], ['Form chahiye', 'n8n Form Trigger'], ['Doosra app data bhejega', 'Webhook'], ['Kisi API se data laana', 'HTTP Request'], ['Fields banana/badalna', 'Edit Fields (Set)'], ['Haan/naa decision', 'IF'], ['3+ raaste', 'Switch'], ['Kuch items hataane', 'Filter'], ['Ek list ko alag items mein', 'Split Out'], ['Items ko jodna (sum/list)', 'Aggregate / Code'], ['Ruk ke aage badhna', 'Wait'], ['Custom logic', 'Code'], ['File padhna (CSV/PDF)', 'Extract from File'], ['AI se text likhwana', 'Basic LLM Chain'], ['AI jo tools chalaye', 'AI Agent'], ['Fail par alert', 'Error Trigger']];

function renderCheatsheets() {
  const B = makeBuilder();
  const S = [];
  S.push(B.sec({
    id: 'cs-hero', title: 'Cheat sheets', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">Print karo · pin karo · roz kaam aayega</span>
      <h1 class="lh-title">Cheat Sheets<br><span class="grad">+ Expression Playground</span></h1>
      <p class="lead">Woh sab cheezein jo baar-baar bhool jaate hain — ek page par. Neeche playground mein expressions bina n8n khole try karo.</p>
      <div class="hero-cta"><a class="btn btn-primary magnetic" href="#playground">🧪 Playground kholo</a><button class="btn btn-ghost" data-print>⬇ PDF / Print</button></div></div>`,
  }));
  const sample = { name: 'rahul sharma', email: 'Rahul@Gmail.com', phone: '98765-43210', city: 'Delhi', score: 82, amount: 125000, tags: ['lead', 'website'], customer: { city: 'Jaipur', plan: 'pro' }, items: [{ sku: 'A1', qty: 2 }, { sku: 'B7', qty: 1 }] };
  S.push(B.sec({
    id: 'playground', group: 'Practice', eyebrow: 'Try karo', title: '🧪 Expression playground',
    sub: 'Left mein sample data ($json), right mein expression likho — result turant dikhega. Galat ho gaya to bhi kuch nahi tootega 🙂',
    body: `<div class="pg reveal" data-playground>
      <div class="pg-col"><label>📥 Sample data ($json)</label><textarea class="pg-json" spellcheck="false">${esc(JSON.stringify(sample, null, 2))}</textarea></div>
      <div class="pg-col"><label>✍️ Expression</label><input class="pg-expr" spellcheck="false" value="{{ $json.name.toTitleCase() }} — {{ $json.city }}">
        <div class="pg-chips">${EXPR.slice(0, 8).map(([t, e]) => `<button type="button" data-pg-try="${esc(e)}">${esc(t)}</button>`).join('')}</div>
        <label>📤 Result</label><pre class="pg-out">…</pre>
        <small class="pg-note">Note: yeh n8n ka chhota browser version hai — common methods chalte hain, asli n8n mein aur bhi zyada.</small></div></div>`,
  }));
  S.push(B.sec({
    id: 'expressions', group: 'Cheat sheets', eyebrow: 'Expressions', title: '{{ }} Expressions cheat sheet',
    body: `<div class="table-wrap reveal"><table class="tbl cs-tbl"><thead><tr><th>Kaam</th><th>Expression</th><th>Result / note</th></tr></thead><tbody>${EXPR.map(([t, e, r]) => `<tr><td>${esc(t)}</td><td><code>${esc(e)}</code> <button class="copy" data-copy="${esc(e)}">Copy</button></td><td>${esc(r)}</td></tr>`).join('')}</tbody></table></div>`,
  }));
  S.push(B.sec({
    id: 'node-picker', group: 'Cheat sheets', eyebrow: 'Kaunsa node?', title: 'Kaunsa node kab use karein',
    body: `<div class="grid g4 pick">${PICK.map(([w, nd], i) => `<div class="card reveal" style="--d:${(i % 8) * 40}ms"><small>${esc(w)}</small><b>${esc(nd)}</b></div>`).join('')}</div><p class="hint">Poori list: <a href="/nodes">Nodes Library →</a></p>`,
  }));
  S.push(B.sec({
    id: 'shortcuts', group: 'Cheat sheets', eyebrow: 'Keyboard', title: 'n8n keyboard shortcuts',
    body: `<div class="grid g2 keys">${KEYS.map(([k, d]) => `<div class="li good reveal"><kbd>${esc(k)}</kbd><span>${esc(d)}</span></div>`).join('')}</div>`,
  }));
  S.push(B.sec({
    id: 'glossary-list', group: 'Cheat sheets', eyebrow: `${glossary.length} shabd`, title: '📖 Shabdkosh — mushkil shabdon ka aasaan matlab',
    sub: 'Lesson pages par in shabdon ke neeche dotted line dikhegi — un par mouse le jao ya tap karo, matlab khul jaayega.',
    body: `<div class="grid g2 gloss">${glossary.map(([t, d]) => `<div class="gl-item reveal"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>`,
  }));
  return layout({
    title: `n8n Cheat Sheets + Expression Playground (Hinglish) | ${cfg.brand}`,
    desc: 'n8n expressions cheat sheet, kaunsa node kab, keyboard shortcuts, shabdkosh aur browser mein expression playground.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'cheatsheets',
  });
}

module.exports = { renderCheatsheets };
