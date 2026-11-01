// Today's Build — HTML blocks (lesson page + resources page)
const { esc, flowDiagram } = require('./kit');
const { earn } = require('./student');

const copyBtn = (text, label = 'Copy') => `<button class="copy" data-copy="${esc(text)}">${label}</button>`;
const jsonScript = (b) => `<script type="application/json" id="wf-${b.day}">${b.jsonText.replace(/</g, '\\u003c')}</script>`;

function curlFor(b) {
  if (!b.sample || !b.sample.curl) return '';
  return `curl -X POST "https://YOUR-N8N-URL/webhook-test/${b.sample.curl}" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(b.sample.json)}'`;
}

function promptCards(b) {
  return b.prompts.map(([t, p]) => `<div class="code-card prompt-card reveal"><div class="cc-h"><b>💬 ${esc(t)}</b>${copyBtn(p)}</div><pre>${esc(p)}</pre></div>`).join('');
}

function buildBlock(b, color) {
  const curl = curlFor(b);
  const nodeCount = b.json.nodes.length - 1;
  return `<div class="tb reveal" style="--c:${color}">
    <div class="tb-head">
      <div><span class="tb-tag">⚡ Day ${b.day} build · ${nodeCount} nodes</span><h3>${esc(b.name)}</h3><p>${esc(b.what)}</p></div>
      <div class="tb-actions">
        <button class="btn btn-primary" data-copy-el="wf-${b.day}">📋 Copy workflow JSON</button>
        <a class="btn btn-ghost" href="${b.url}" download>⬇ Download .json</a>
      </div>
    </div>
    ${flowDiagram(b.flow, color)}
    ${earn[b.day] ? `<div class="tb-earn"><span>💰</span><div><b>Isse kitna kama sakte ho?</b><p>${esc(earn[b.day][0])} — aam taur par <b>${esc(earn[b.day][1])}</b>. (Andaaza hai; client aur scope ke hisaab se badalta hai.)</p></div></div>` : ''}
    <div class="tb-how"><b>Import kaise karein:</b> n8n mein naya workflow kholo → canvas par click → <kbd>Ctrl</kbd>+<kbd>V</kbd> (Mac: <kbd>⌘</kbd>+<kbd>V</kbd>). Ya … menu → <i>Import from File</i>.</div>
    <div class="grid g2 tb-grid">
      <div class="panel"><h4>🔑 Setup (import ke baad)</h4><ul class="checks">${b.creds.map((c) => `<li>Connect: <b>${esc(c)}</b></li>`).join('')}${(b.setup || []).map((s) => `<li>${esc(s)}</li>`).join('')}${!b.creds.length && !(b.setup || []).length ? '<li>Koi setup nahi — seedha Test karo!</li>' : ''}</ul></div>
      <div class="panel"><h4>✅ Test kaise karein</h4><ol class="tb-steps">${(b.test || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>
    </div>
    ${b.sample && b.sample.json ? `<div class="two io"><div class="code-card"><div class="cc-h"><b>📥 Sample test body</b>${copyBtn(JSON.stringify(b.sample.json, null, 2))}</div><pre>${esc(JSON.stringify(b.sample.json, null, 2))}</pre></div>${curl ? `<div class="code-card"><div class="cc-h"><b>⌨️ curl se test</b>${copyBtn(curl)}</div><pre>${esc(curl)}</pre></div>` : ''}</div>` : ''}
    ${b.sample && b.sample.file ? `<p class="tb-file">📎 <a href="/workflows/${b.sample.file}" download>${esc(b.sample.label)}</a></p>` : ''}
    ${b.files ? `<div class="dl-list">${b.files.map(([t, f]) => `<a class="dl" href="/workflows/${f}" download><span>🐳</span>${esc(t)}<i>⬇</i></a>`).join('')}<a class="dl" href="/workflows/day-19-setup-commands.sh" download><span>⌨️</span>VPS setup commands<i>⬇</i></a></div>` : ''}
    <details class="tb-json"><summary>👀 Poora JSON dekho</summary><pre>${esc(b.jsonText)}</pre></details>
    ${jsonScript(b)}
  </div>`;
}

module.exports = { buildBlock, promptCards, copyBtn };
