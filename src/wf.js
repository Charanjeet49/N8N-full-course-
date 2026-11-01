// ============================================================
//  n8n WORKFLOW JSON GENERATOR
//  Compact spec → real n8n workflow JSON (copy → n8n canvas par Ctrl+V)
// ============================================================
const crypto = require('crypto');

const B = (n) => `n8n-nodes-base.${n}`;
const LC = (n) => `@n8n/n8n-nodes-langchain.${n}`;

// deterministic uuid (same input → same id, taaki git diff saaf rahe)
const uuid = (seed) => {
  const h = crypto.createHash('md5').update(seed).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

// ---------- param helpers ----------
const fields = (pairs) => ({
  assignments: { assignments: pairs.map(([name, value, type = 'string']) => ({ id: '?', name, value, type })) },
  options: {},
});
const op = (type, operation) => ({ type, operation });
const condBlock = (rules, combinator = 'and') => ({
  options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
  conditions: rules.map(([left, oper, right]) => ({ id: '?', leftValue: left, rightValue: right === undefined ? '' : right, operator: oper })),
  combinator,
});
const ifp = (rules, combinator) => ({ conditions: condBlock(rules, combinator), options: {} });
const switchp = (outs) => ({
  rules: { values: outs.map(([key, rules]) => ({ conditions: condBlock(rules), renameOutput: true, outputKey: key })) },
  options: {},
});
const rl = (value, mode = 'id') => ({ __rl: true, value, mode });
const sheet = (operation, sheetName, extra = {}) => ({
  operation,
  documentId: rl('PASTE_YOUR_GOOGLE_SHEET_ID'),
  sheetName: rl(sheetName, 'name'),
  ...(operation === 'append' || operation === 'appendOrUpdate'
    ? { columns: { mappingMode: 'autoMapInputData', value: {}, matchingColumns: extra.match || [], schema: [] } }
    : {}),
  options: {},
});
const model = (m = 'gpt-4o-mini') => ({ model: rl(m, 'list'), options: {} });

// credential needed per node type (setup checklist ke liye)
const CREDS = {
  [B('gmail')]: 'Gmail (Google OAuth)', [B('gmailTrigger')]: 'Gmail (Google OAuth)',
  [B('googleSheets')]: 'Google Sheets (Google OAuth)', [B('googleSheetsTool')]: 'Google Sheets (Google OAuth)',
  [B('googleCalendar')]: 'Google Calendar (Google OAuth)', [B('googleCalendarTool')]: 'Google Calendar (Google OAuth)',
  [B('googleDrive')]: 'Google Drive (Google OAuth)',
  [B('telegram')]: 'Telegram bot token (BotFather se)', [B('telegramTrigger')]: 'Telegram bot token (BotFather se)',
  [B('slack')]: 'Slack (OAuth / bot token)', [B('supabase')]: 'Supabase (project URL + service key)',
  [B('whatsApp')]: 'WhatsApp Business Cloud (Meta token)', [B('github')]: 'GitHub (personal access token)',
  [B('n8n')]: 'n8n API key (Settings → n8n API)', [B('linkedIn')]: 'LinkedIn (OAuth)',
  [LC('lmChatOpenAi')]: 'OpenAI API key', [LC('embeddingsOpenAi')]: 'OpenAI API key', [LC('openAi')]: 'OpenAI API key',
};

// ---------- builder ----------
// spec: { name, nodes: [[name, type, version, params, extra?]], links: ['A>B', 'IF>B:1', 'Model~Agent:ai_languageModel'], note }
function buildWorkflow(day, spec) {
  const seed = `day${day}:`;
  let k = 0;
  const fillIds = (o) => {
    if (Array.isArray(o)) return o.map(fillIds);
    if (o && typeof o === 'object') {
      const out = {};
      for (const [key, v] of Object.entries(o)) out[key] = key === 'id' && v === '?' ? uuid(seed + 'p' + k++) : fillIds(v);
      return out;
    }
    return o;
  };

  const nodes = spec.nodes.map(([name, type, typeVersion, parameters = {}, extra = {}]) => {
    const n = { parameters: fillIds(parameters), id: uuid(seed + name), name, type, typeVersion, position: [0, 0] };
    if (/(webhook|formTrigger|chatTrigger|telegramTrigger)$/i.test(type) || extra.webhook) n.webhookId = uuid(seed + 'hook' + name);
    if (extra.alwaysOutputData) n.alwaysOutputData = true;
    if (extra.onError) n.onError = extra.onError;
    if (extra.retry) { n.retryOnFail = true; n.maxTries = 3; n.waitBetweenTries = 3000; }
    return n;
  });
  const byName = Object.fromEntries(nodes.map((n) => [n.name, n]));

  // connections
  const connections = {};
  const mainEdges = []; const aiEdges = [];
  for (const l of spec.links) {
    const ai = l.includes('~');
    const [from, rest] = l.split(ai ? '~' : '>');
    const [to, tag] = rest.split(':');
    if (!byName[from] || !byName[to]) throw new Error(`Day ${day}: bad link ${l}`);
    const type = ai ? tag : 'main';
    const idx = ai ? 0 : Number(tag || 0);
    connections[from] = connections[from] || {};
    connections[from][type] = connections[from][type] || [];
    while (connections[from][type].length <= idx) connections[from][type].push([]);
    connections[from][type][idx].push({ node: to, type, index: 0 });
    (ai ? aiEdges : mainEdges).push([from, to, idx]);
  }

  // auto layout: main graph left→right, AI sub-nodes neeche
  const aiNodes = new Set(aiEdges.map((e) => e[0]));
  const depth = {}; const order = nodes.filter((n) => !aiNodes.has(n.name)).map((n) => n.name);
  order.forEach((n) => (depth[n] = 0));
  for (let pass = 0; pass < order.length; pass++) for (const [a, b] of mainEdges) if (depth[b] < depth[a] + 1) depth[b] = depth[a] + 1;
  const cols = {};
  order.forEach((n) => (cols[depth[n]] = cols[depth[n]] || []).push(n));
  for (const [d, list] of Object.entries(cols)) {
    list.forEach((n, i) => { byName[n].position = [Number(d) * 260, 300 + (i - (list.length - 1) / 2) * 200]; });
  }
  const subCount = {};
  for (const [a, b] of aiEdges) {
    if (byName[a].position[0] || byName[a].position[1]) continue;
    const j = (subCount[b] = (subCount[b] || 0) + 1) - 1;
    const p = byName[b].position;
    byName[a].position = [p[0] - 100 + j * 150, p[1] + 220];
  }
  nodes.forEach((n) => { n.position = n.position.map((v) => Math.round(v)); });

  // setup sticky note
  const creds = [...new Set(nodes.map((n) => CREDS[n.type]).filter(Boolean))];
  const minX = Math.min(...nodes.map((n) => n.position[0]));
  const minY = Math.min(...nodes.map((n) => n.position[1]));
  const noteText = `## Day ${day}: ${spec.name}\n${spec.note || ''}\n\n**Setup:**\n${creds.length ? creds.map((c) => `- Connect: ${c}`).join('\n') : '- Koi credential nahi chahiye'}\n${(spec.setup || []).map((s) => `- ${s}`).join('\n')}\n\nCourse: Day ${day} lesson page`;
  nodes.unshift({
    parameters: { content: noteText, height: 300, width: 420, color: 5 },
    id: uuid(seed + 'sticky'), name: 'Setup Note', type: B('stickyNote'), typeVersion: 1,
    position: [minX - 40, minY - 360],
  });

  return {
    json: { name: `Day ${String(day).padStart(2, '0')} — ${spec.name}`, nodes, connections, pinData: {}, settings: { executionOrder: 'v1' }, meta: { templateCredsSetupCompleted: false } },
    creds,
  };
}

module.exports = { B, LC, fields, op, ifp, switchp, condBlock, rl, sheet, model, buildWorkflow, CREDS };
