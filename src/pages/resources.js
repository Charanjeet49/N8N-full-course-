// ============================================================
//  RESOURCES — /resources  (25 ready workflows, prompts, sample data)
// ============================================================
const cfg = require('../config');
const { modules } = require('../curriculum');
const { layout } = require('../layout');
const { esc, pad, makeBuilder } = require('../kit');
const { builds } = require('../buildlib');
const { promptCards } = require('../buildview');
const assets = require('../assets');

const CRED_HELP = {
  'Gmail (Google OAuth)': ['Google Cloud project → Gmail API enable → OAuth client. n8n Cloud par bas "Sign in with Google".', 'https://docs.n8n.io/integrations/builtin/credentials/google/'],
  'Google Sheets (Google OAuth)': ['Same Google OAuth — Sheets API enable karo.', 'https://docs.n8n.io/integrations/builtin/credentials/google/'],
  'Google Calendar (Google OAuth)': ['Same Google OAuth — Calendar API enable karo.', 'https://docs.n8n.io/integrations/builtin/credentials/google/'],
  'Google Drive (Google OAuth)': ['Same Google OAuth — Drive API enable karo.', 'https://docs.n8n.io/integrations/builtin/credentials/google/'],
  'Telegram bot token (BotFather se)': ['Telegram mein @BotFather → /newbot → token copy.', 'https://docs.n8n.io/integrations/builtin/credentials/telegram/'],
  'OpenAI API key': ['platform.openai.com → API keys → Create. Billing mein ₹500–1000 credit daalo.', 'https://docs.n8n.io/integrations/builtin/credentials/openai/'],
  'Slack (OAuth / bot token)': ['api.slack.com/apps → app banao → Bot token scopes: chat:write.', 'https://docs.n8n.io/integrations/builtin/credentials/slack/'],
  'Supabase (project URL + service key)': ['Supabase project → Settings → API → URL + service_role key.', 'https://docs.n8n.io/integrations/builtin/credentials/supabase/'],
  'WhatsApp Business Cloud (Meta token)': ['developers.facebook.com → WhatsApp app → access token + phone number ID.', 'https://docs.n8n.io/integrations/builtin/credentials/whatsapp/'],
  'GitHub (personal access token)': ['GitHub → Settings → Developer settings → Fine-grained token (Contents: read/write).', 'https://docs.n8n.io/integrations/builtin/credentials/github/'],
  'n8n API key (Settings → n8n API)': ['Apne n8n mein Settings → n8n API → Create API key.', 'https://docs.n8n.io/api/authentication/'],
  'LinkedIn (OAuth)': ['LinkedIn developer app → Share on LinkedIn product enable.', 'https://docs.n8n.io/integrations/builtin/credentials/linkedin/'],
};

function renderResources() {
  const B = makeBuilder();
  const S = [];
  const all = Object.values(builds());
  const modById = Object.fromEntries(modules.map((m) => [m.id, m]));
  const { days } = require('../curriculum');
  const dayMod = Object.fromEntries(days.map((d) => [d.day, modById[d.module]]));
  const totalPrompts = all.reduce((a, b) => a + b.prompts.length, 0);

  S.push(B.sec({
    id: 'res-hero', title: 'Workflow pack', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">Student resources · copy → paste → automation ready</span>
      <h1 class="lh-title">25 Ready n8n Workflows<br><span class="grad">+ prompts, sample data & configs</span></h1>
      <p class="lead">Har din ka live build yahan ready hai. JSON copy karo, n8n canvas par paste karo — poora workflow ban ke aa jaayega. Bas apne accounts connect karo aur chalao.</p>
      <div class="hero-cta"><a class="btn btn-primary magnetic" href="/workflows/n8n-course-all-workflows.zip" download>⬇ Saare workflows (ZIP)</a><a class="btn btn-ghost" href="#builds">Day-wise builds ↓</a><a class="btn btn-link" href="#prompt-library">💬 Prompt library</a></div>
      <div class="res-stats"><div><b>${all.length}</b><small>workflows</small></div><div><b>${all.reduce((a, b) => a + b.json.nodes.length - 1, 0)}</b><small>nodes</small></div><div><b>${totalPrompts}</b><small>prompts</small></div><div><b>${Object.keys(assets).length}</b><small>extra files</small></div></div></div>`,
  }));

  S.push(B.sec({
    id: 'how-to-import', group: 'Start', eyebrow: '2 minute setup', title: 'Workflow import kaise karein',
    body: `<div class="steps-h">${[['📋', 'Copy', 'Kisi bhi build par "Copy JSON" dabao (ya .json download karo).'], ['🖱️', 'Paste', 'n8n mein naya workflow → canvas par click → Ctrl+V. Ya … → Import from File.'], ['🔑', 'Connect', 'Peele "Setup Note" mein likhe accounts connect karo, IDs badlo.'], ['▶️', 'Test → Active', '"Test workflow" dabao, sab green ho to Active on karo.']].map(([i, t, d], k) => `<div class="step card reveal" style="--d:${k * 80}ms"><span class="st-ic">${i}</span><b>${pad(k + 1)}. ${t}</b><p>${d}</p></div>`).join('')}</div>
      <p class="hint reveal">ℹ️ Security ke liye JSON mein koi password/API key nahi hoti — har student apne credentials khud connect karta hai. Yeh n8n ka normal tareeka hai.</p>`,
  }));

  S.push(B.sec({
    id: 'builds', group: 'Workflows', eyebrow: 'Day-wise', title: 'Saare 25 builds — ek jagah',
    sub: 'Card par click → us din ka poora lesson (setup, test steps, prompts). Copy / Download yahin se bhi.',
    body: `<div class="grid g3 res-grid">${all.map((b, i) => { const m = dayMod[b.day]; return `<div class="card res-card reveal" style="--c:${m.color};--d:${(i % 6) * 50}ms"><span class="rc-day">Day ${pad(b.day)}</span><h3><a href="/day/${b.day}#todays-build">${esc(b.name)}</a></h3><p>${esc(b.what.split('. ')[0])}.</p><div class="rc-meta">${b.json.nodes.length - 1} nodes${b.creds.length ? ' · ' + b.creds.length + ' account' + (b.creds.length > 1 ? 's' : '') : ' · no setup'}</div><div class="rc-act"><button class="mini-btn" data-copy-url="${b.url}">📋 Copy</button><a class="mini-btn" href="${b.url}" download>⬇ .json</a><a class="mini-btn" href="/day/${b.day}#todays-build">Lesson →</a></div></div>`; }).join('')}</div>`,
  }));

  S.push(B.sec({
    id: 'prompt-library', group: 'Prompts', eyebrow: `${totalPrompts} prompts`, title: 'Prompt library — copy karo aur use karo',
    sub: 'Workflow ke andar wale AI prompts, "ChatGPT/Claude se banwao" prompts, debug helper aur freelancing prompts. {{ }} wali jagah apni details bharo.',
    body: `<div class="pl-filter reveal"><input type="search" id="promptSearch" class="search" placeholder="🔍 Prompt search karo (e.g. proposal, RAG, invoice)"></div>
      ${all.map((b) => `<details class="pl-day reveal" data-pl><summary><span>Day ${pad(b.day)}</span>${esc(b.name)}<em>${b.prompts.length} prompts</em></summary><div class="pl-body">${promptCards(b)}</div></details>`).join('')}`,
  }));

  S.push(B.sec({
    id: 'files', group: 'Files', eyebrow: 'Downloads', title: 'Sample data & self-hosting files',
    body: `<div class="dl-list">${[['sample-sales.csv', '📊 Sample sales CSV (Day 3)'], ['sample-leads-sheet.csv', '🧾 Leads sheet headers (Day 2)'], ['sample-ledger.csv', '📒 Sample ledger (Day 23)'], ['day-19-docker-compose.yml', '🐳 docker-compose.yml — n8n + Postgres + Caddy'], ['day-19-env.example', '⚙️ .env example'], ['day-19-Caddyfile', '🔒 Caddyfile (auto HTTPS)'], ['day-19-setup-commands.sh', '⌨️ VPS setup commands'], ['README.txt', '📄 Pack README'], ['n8n-course-all-workflows.zip', '📦 Everything (ZIP)']].map(([f, t], i) => `<a class="dl reveal" href="/workflows/${f}" download style="--d:${i * 40}ms"><span>⬇</span>${t}<i>${esc(f)}</i></a>`).join('')}</div>`,
  }));

  const usedCreds = [...new Set(all.flatMap((b) => b.creds))];
  S.push(B.sec({
    id: 'credentials-guide', group: 'Setup', eyebrow: 'Accounts', title: 'Credentials guide — kaunsa account kahan se',
    body: `<div class="grid g2">${usedCreds.map((c, i) => { const [how, url] = CRED_HELP[c] || ['n8n docs dekho.', 'https://docs.n8n.io/credentials/']; const ds = all.filter((b) => b.creds.includes(c)).map((b) => b.day); return `<div class="card reveal" style="--d:${(i % 4) * 50}ms"><h3>🔑 ${esc(c)}</h3><p>${esc(how)}</p><p class="hint">Days: ${ds.map((d) => `<a href="/day/${d}#todays-build">${d}</a>`).join(', ')} · <a href="${url}" target="_blank" rel="noopener">Docs ↗</a></p></div>`; }).join('')}</div>`,
  }));

  S.push(B.sec({
    id: 'import-troubleshooting', group: 'Setup', eyebrow: 'Help', title: 'Import ke baad problem? Yeh check karo',
    body: `<div class="list-x">${['Paste par kuch nahi hua → pehle canvas par ek baar click karo, phir Ctrl+V. Ya Import from File use karo.', 'Node par laal triangle → us node ka credential select/connect nahi hua.', '"Sheet not found" → Sheet ID aur tab ka naam (case-sensitive) check karo.', 'Webhook test nahi ho raha → "Listen for test event" dabake 2 minute ke andar request bhejo; production URL sirf Active workflow par chalta hai.', 'AI node error 429/401 → OpenAI billing/credit aur API key check karo.', 'Purana n8n version → kuch nodes "?" dikhenge. n8n update karo (Cloud par automatic).'].map((p, i) => `<div class="li good reveal" style="--d:${i * 50}ms"><span>✓</span>${esc(p)}</div>`).join('')}</div>`,
  }));

  return layout({
    title: `25 Ready n8n Workflows + Prompts (Student Resources) | ${cfg.brand}`,
    desc: 'Course ke 25 din ke live builds: copy-paste n8n workflow JSON, AI prompts, sample data, docker-compose aur credentials guide.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'resources',
  });
}

module.exports = { renderResources };
