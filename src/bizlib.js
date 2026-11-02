// ============================================================
//  BUSINESS LIB — industries list, Agent Deck, Level 1 workflow JSON
// ============================================================
const { B, fields, sheet, buildWorkflow } = require('./wf');

const INDUSTRIES = [...require('./business'), ...require('./business2')];

// 6 agent patterns jo har industry mein baar-baar aate hain ("Agent Deck")
const DECK = {
  receptionist: { i: '🙋', t: 'Receptionist', d: 'Enquiry ka turant jawab deta hai, info leta hai, sahi jagah bhejta hai.', days: [2, 15, 21], suit: '♠' },
  qualifier: { i: '🎯', t: 'Qualifier / Scorer', d: 'Lead ya message ko Hot/Warm/Cold ya category mein baant-ta hai.', days: [5, 11, 14], suit: '♦' },
  scheduler: { i: '📅', t: 'Scheduler', d: 'Booking, reminder, reschedule — time ke hisaab se kaam.', days: [9, 23], suit: '♣' },
  nurturer: { i: '🌱', t: 'Nurturer', d: 'Drip follow-up: din-ba-din messages jab tak customer ready na ho.', days: [11, 12], suit: '♥' },
  expert: { i: '📚', t: 'Knowledge Expert (RAG)', d: 'Company ke documents/data se sahi jawab — andaaze se nahi.', days: [16, 17], suit: '♠' },
  reporter: { i: '📊', t: 'Reporter', d: 'Roz/hafte ka summary owner tak — numbers + kya karna hai.', days: [3, 13, 23], suit: '♦' },
};

const toFormField = ([label, type, options]) => {
  const f = { fieldLabel: label, requiredField: !type || ['dropdown', 'date'].includes(type) || /phone|name/i.test(label) };
  if (type) f.fieldType = type;
  if (options) f.fieldOptions = { values: options.map((option) => ({ option })) };
  return f;
};

let cache = null;
function bizBuilds() {
  if (cache) return cache;
  cache = {};
  for (const ind of INDUSTRIES) {
    const idPrefix = ind.schema.sample[0].split('-')[0] || 'ID';
    const spec = {
      name: `${ind.name}: Lead Capture → Sheet + Telegram`,
      nodes: [
        [`${ind.name} Form`, B('formTrigger'), 2.2, { formTitle: `${ind.story.biz.split(',')[0]} — enquiry`, formDescription: 'Apni details bharo, hum turant sampark karenge.', formFields: { values: ind.form.map(toFormField) }, options: {} }],
        ['Add ID + Time', B('set'), 3.4, { ...fields([[ind.schema.cols[0][0], `=${idPrefix}-{{ $now.toFormat("MMddHHmmss") }}`], ['created_at', '={{ $now.toFormat("yyyy-MM-dd HH:mm") }}'], ['stage', 'new'], ['source', 'n8n form']]), includeOtherFields: true }],
        [`Save to ${ind.schema.sheet}`, B('googleSheets'), 4.5, sheet('append', ind.schema.sheet)],
        ['Alert Owner', B('telegram'), 1.2, { chatId: 'YOUR_TELEGRAM_CHAT_ID', text: `=${ind.alert}`, additionalFields: {} }],
      ],
      links: [`${ind.name} Form>Add ID + Time`, `Add ID + Time>Save to ${ind.schema.sheet}`, 'Add ID + Time>Alert Owner'],
      note: `Business Track · ${ind.name} · Level 1 project`,
      setup: [`Google Sheet banao, tab ka naam "${ind.schema.sheet}", pehli row mein form ke labels + ${ind.schema.cols[0][0]}, created_at, stage, source`, 'Sheet ID "Save" node mein paste karo', 'Telegram chat ID @userinfobot se lo'],
    };
    const { json, creds } = buildWorkflow(`biz-${ind.slug}`, spec);
    json.name = `Business — ${ind.name}: Lead Capture`;
    json.nodes[0].parameters.content = json.nodes[0].parameters.content.replace(/^## Day biz-[^:]+:/, '## Business Track —').replace(/Course: Day biz-.*$/, `Course: /business/${ind.slug} (Level 1 project)`);
    const file = `biz-${ind.slug}-lead-capture.json`;
    cache[ind.slug] = { file, url: `/workflows/${file}`, json, creds, jsonText: JSON.stringify(json, null, 2), nodes: spec.nodes.length };
  }
  return cache;
}

module.exports = { INDUSTRIES, DECK, bizBuilds };
