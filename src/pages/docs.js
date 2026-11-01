// ============================================================
//  DOCS HUB — /docs  (n8n official docs ka organized map)
// ============================================================
const cfg = require('../config');
const { layout } = require('../layout');
const { esc, makeBuilder } = require('../kit');

const D = 'https://docs.n8n.io';
const hub = [
  { id: 'start', i: '🚀', t: 'Getting started', days: [1], d: 'n8n kya hai, pehla workflow, editor UI.', links: [['Docs home', `${D}/`], ['Quickstart: try it out', `${D}/try-it-out/`], ['Choose your n8n (Cloud vs self-host)', `${D}/choose-n8n/`], ['Glossary', `${D}/glossary/`], ['Keyboard shortcuts', `${D}/keyboard-shortcuts/`]] },
  { id: 'courses', i: '🎓', t: 'Official n8n courses', days: [1, 3, 5], d: 'n8n ke khud ke free text courses — homework ke liye perfect.', links: [['Level One (beginner)', `${D}/courses/level-one/`], ['Level Two (intermediate)', `${D}/courses/level-two/`], ['Advanced AI tutorial', `${D}/advanced-ai/intro-tutorial/`]] },
  { id: 'workflows', i: '🧱', t: 'Workflows', days: [1, 2, 18], d: 'Create, settings, executions, templates, sharing.', links: [['Workflows overview', `${D}/workflows/`], ['Executions', `${D}/workflows/executions/`], ['Workflow settings', `${D}/workflows/settings/`], ['Templates', `${D}/workflows/templates/`], ['Export & import', `${D}/workflows/export-import/`]] },
  { id: 'data', i: '📦', t: 'Data', days: [3, 4], d: 'Items, JSON structure, mapping, pinning, binary data.', links: [['Data structure', `${D}/data/data-structure/`], ['Data mapping', `${D}/data/data-mapping/`], ['Item linking', `${D}/data/data-mapping/data-item-linking/`], ['Data pinning', `${D}/data/data-pinning/`], ['Binary data', `${D}/data/binary-data/`]] },
  { id: 'code', i: '👨‍💻', t: 'Expressions & Code', days: [4, 6], d: '{{ }} expressions, built-in methods, Code node, cookbook.', links: [['Expressions', `${D}/code/expressions/`], ['Built-in methods & variables', `${D}/code/builtin/overview/`], ['Code node', `${D}/code/code-node/`], ['Luxon (dates)', `${D}/code/cookbook/luxon/`], ['Code cookbook', `${D}/code/cookbook/`]] },
  { id: 'flow', i: '🔀', t: 'Flow logic', days: [5, 18], d: 'Splitting, merging, looping, waiting, sub-workflows, errors.', links: [['Flow logic overview', `${D}/flow-logic/`], ['Splitting (IF/Switch)', `${D}/flow-logic/splitting/`], ['Merging', `${D}/flow-logic/merging/`], ['Looping', `${D}/flow-logic/looping/`], ['Sub-workflows', `${D}/flow-logic/subworkflows/`], ['Error handling', `${D}/flow-logic/error-handling/`]] },
  { id: 'credentials', i: '🔐', t: 'Credentials', days: [2, 8], d: 'API keys, OAuth2, sharing credentials securely.', links: [['Credentials overview', `${D}/credentials/`], ['Add & manage credentials', `${D}/credentials/add-edit-credentials/`], ['Google OAuth (single service)', `${D}/integrations/builtin/credentials/google/oauth-single-service/`], ['HTTP Request credentials', `${D}/integrations/builtin/credentials/httprequest/`]] },
  { id: 'integrations', i: '🔌', t: 'Integrations (nodes)', days: [7, 9, 10], d: 'Core, app, trigger aur cluster nodes ki poori library.', links: [['All integrations', `${D}/integrations/`], ['Core nodes', `${D}/integrations/builtin/core-nodes/`], ['App nodes', `${D}/integrations/builtin/app-nodes/`], ['Trigger nodes', `${D}/integrations/builtin/trigger-nodes/`], ['Community nodes', `${D}/integrations/community-nodes/`], ['Handling rate limits', `${D}/integrations/builtin/rate-limits/`]] },
  { id: 'ai', i: '🤖', t: 'Advanced AI', days: [14, 15, 16, 17], d: 'LLMs, agents, memory, RAG, vector stores, tools, MCP.', links: [['Advanced AI overview', `${D}/advanced-ai/`], ['What is an agent?', `${D}/advanced-ai/examples/understand-agents/`], ['Memory explained', `${D}/advanced-ai/examples/understand-memory/`], ['RAG in n8n', `${D}/advanced-ai/rag-in-n8n/`], ['Human fallback', `${D}/advanced-ai/human-fallback/`], ['Cluster nodes', `${D}/integrations/builtin/cluster-nodes/`]] },
  { id: 'hosting', i: '🐳', t: 'Hosting & self-hosting', days: [19], d: 'Docker, npm, server setups, configuration, updates.', links: [['Hosting overview', `${D}/hosting/`], ['Docker install', `${D}/hosting/installation/docker/`], ['npm install', `${D}/hosting/installation/npm/`], ['Server setups', `${D}/hosting/installation/server-setups/`], ['Environment variables', `${D}/hosting/configuration/environment-variables/`], ['Updating n8n', `${D}/hosting/installation/updating/`]] },
  { id: 'scale', i: '📈', t: 'Scaling & security', days: [20], d: 'Queue mode, performance, security hardening.', links: [['Queue mode', `${D}/hosting/scaling/queue-mode/`], ['Scaling overview', `${D}/hosting/scaling/overview/`], ['Securing n8n', `${D}/hosting/securing/overview/`], ['Execution data pruning', `${D}/hosting/scaling/execution-data/`]] },
  { id: 'devops', i: '🗂️', t: 'Source control, API & environments', days: [20], d: 'Git-based environments, public REST API.', links: [['Source control & environments', `${D}/source-control-environments/`], ['n8n public API', `${D}/api/`], ['API authentication', `${D}/api/authentication/`]] },
  { id: 'release', i: '🆕', t: 'Release notes & updates', days: [25], d: 'Naye features — har batch se pehle check karo.', links: [['Release notes', `${D}/release-notes/`]] },
  { id: 'community', i: '🌍', t: 'Community, templates & blog', days: [24], d: 'Help forum, 1000s of templates, blog articles, YouTube.', links: [['Community forum', 'https://community.n8n.io/'], ['Workflow templates', 'https://n8n.io/workflows/'], ['n8n blog', 'https://blog.n8n.io/'], ['n8n YouTube', 'https://www.youtube.com/@n8n-io'], ['n8n GitHub', 'https://github.com/n8n-io/n8n'], ['Integrations directory', 'https://n8n.io/integrations/']] },
];

function renderDocs() {
  const B = makeBuilder();
  const S = [];
  S.push(B.sec({
    id: 'docs-hero', title: 'Docs hub', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">Official n8n documentation · organized</span>
      <h1 class="lh-title">n8n Docs Hub<br><span class="grad">har topic ka official link</span></h1>
      <p class="lead">n8n ke official docs ko course ke hisaab se organize kiya hai — kaunsa docs page kis din kaam aayega. Class mein samjhate waqt seedha yahan se kholo.</p>
      <div class="chips">${hub.map((h) => `<a class="chip" href="#docs-${h.id}">${h.i} ${esc(h.t)}</a>`).join('')}</div></div>`,
  }));
  S.push(B.sec({
    id: 'learning-path', group: 'Start', eyebrow: 'Reading order', title: 'Docs learning path (day-wise)',
    body: `<div class="timeline docs-tl">${hub.slice(0, 7).map((h, i) => `<div class="tl reveal" style="--d:${i * 60}ms"><span class="tl-dot"></span><small>Day ${h.days.join(', ')}</small><h3>${h.i} ${esc(h.t)}</h3><p>${esc(h.d)}</p></div>`).join('')}</div>`,
  }));
  hub.forEach((h) => {
    S.push(B.sec({
      id: `docs-${h.id}`, group: 'Docs sections', eyebrow: `Day ${h.days.join(', ')}`, title: `${h.i} ${esc(h.t)}`, sub: esc(h.d),
      body: `<div class="dl-list">${h.links.map(([t, u], i) => `<a href="${esc(u)}" target="_blank" rel="noopener" class="dl reveal" style="--d:${i * 40}ms"><span>📚</span>${esc(t)}<i>↗</i></a>`).join('')}</div>
        <p class="hint">Related lessons: ${h.days.map((d) => `<a href="/day/${d}">Day ${d}</a>`).join(' · ')}</p>`,
    }));
  });
  S.push(B.sec({
    id: 'how-to-read-docs', group: 'Tips', eyebrow: 'Skill', title: 'Docs padhne ka smart tareeka',
    body: `<ul class="checks reveal"><li>Pehle "Overview" padho, phir "Operations"</li><li>Node docs ke end mein "Templates and examples" zaroor dekho</li><li>Error aaye to message copy karke community forum mein search karo</li><li>Release notes har mahine skim karo — naye nodes/features</li><li>Browser translate se Hindi mein bhi padh sakte ho</li></ul>`,
  }));
  return layout({
    title: `n8n Docs Hub — official documentation organized (Hinglish) | ${cfg.brand}`,
    desc: 'n8n official docs ka day-wise organized map: data, expressions, flow logic, AI, hosting, security, API aur community links.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'docs',
  });
}

module.exports = { renderDocs, hub };
