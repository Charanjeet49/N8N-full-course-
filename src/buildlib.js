// ============================================================
//  BUILD LIBRARY — saare 25 builds + generated n8n JSON + prompts
// ============================================================
const { days } = require('./curriculum');
const { buildWorkflow } = require('./wf');
const RAW = { ...require('./builds'), ...require('./builds2') };

const pad = (n) => String(n).padStart(2, '0');
let cache = null;

function all() {
  if (cache) return cache;
  cache = {};
  for (const d of days) {
    const b = RAW[d.day];
    if (!b) continue;
    const { json, creds } = buildWorkflow(d.day, b);
    const file = `day-${pad(d.day)}-${b.slug}.json`;
    const nodeNames = b.nodes.map((n) => n[0]);
    const buildPrompt = `Act as an n8n expert and teacher. Help me build this workflow in n8n step by step (n8n 1.x UI):\n\nGoal: ${b.what}\n\nFlow: ${b.flow.map((f) => `${f[0]} (${f[1]})`).join(' → ')}\n\nFor each node tell me: which node to add, exact settings, and the expressions to use. Then tell me how to test it and the 3 most common errors beginners hit.`;
    const debugPrompt = `I'm building the n8n workflow "${b.name}" (nodes: ${nodeNames.join(', ')}).\nNode "<NODE NAME>" gives this error:\n<PASTE ERROR>\n\nInput JSON of that node:\n<PASTE INPUT>\n\nExplain the cause in simple words and give me the exact fix (settings or expression).`;
    cache[d.day] = {
      ...b, day: d.day, dayTitle: d.title, file, url: `/workflows/${file}`, json, creds,
      jsonText: JSON.stringify(json, null, 2),
      prompts: [...(b.prompts || []), ['Build it with ChatGPT / Claude', buildPrompt], ['Debug helper prompt', debugPrompt]],
    };
  }
  return cache;
}

module.exports = { builds: all, pad };
