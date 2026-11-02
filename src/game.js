// ============================================================
//  GAME LAYER — XP rules, levels, badges, bonus quiz questions
//  (sab browser mein save hota hai — koi login/server nahi)
// ============================================================

// Kis kaam par kitne XP
const XP = {
  lesson: 50, // "Day complete" tick
  quiz: 10, // har sahi jawab (pehli koshish)
  perfect: 20, // din ke saare quiz sahi
  challenge: 100, // challenge solve (bina hint)
  hintCost: 25, // har hint kholne par challenge XP kam
  solutionXp: 25, // solution dekh ke kiya to bhi kuch XP
  setup: 50, // Day 0 setup poora
  project: 100, // Business Track: industry ka Level 1 project bana liya
};

// Level = XP ki seedhi
const LEVELS = [
  { xp: 0, t: 'Intern', i: '🐣', line: 'Safar shuru! Pehla din complete karo.' },
  { xp: 300, t: 'Builder', i: '🧱', line: 'Aap workflows jodna seekh gaye.' },
  { xp: 1000, t: 'Automator', i: '⚙️', line: 'Data aur logic aapke haath mein hai.' },
  { xp: 2200, t: 'Agent Maker', i: '🤖', line: 'Ab aap AI agents bana sakte ho.' },
  { xp: 3600, t: 'n8n Ninja', i: '🥷', line: 'Client projects ke liye ready!' },
];

// Badges — rule client-side check hota hai (type + value)
// type: day (din complete), days (kitne din), perfect (kitne perfect quiz), chal (kitne challenge),
//       nohint (bina hint challenge), streak (din), setup, world (module ke saare din)
const BADGES = [
  { id: 'first', i: '👣', t: 'Pehla Kadam', d: 'Day 1 complete kiya', type: 'day', v: 1 },
  { id: 'setup', i: '🎮', t: 'Ready Player', d: 'Day 0 setup poora kiya', type: 'setup', v: 1 },
  { id: 'data', i: '📦', t: 'Data Detective', d: 'Day 3 (Items & JSON) complete', type: 'day', v: 3 },
  { id: 'expr', i: '🪄', t: 'Expression Expert', d: 'Day 4 (Expressions) complete', type: 'day', v: 4 },
  { id: 'code', i: '💻', t: 'Code Ninja', d: 'Day 6 (Code node) complete', type: 'day', v: 6 },
  { id: 'api', i: '🔌', t: 'API Explorer', d: 'Day 7 (HTTP & APIs) complete', type: 'day', v: 7 },
  { id: 'hook', i: '🪝', t: 'Webhook Wizard', d: 'Day 8 (Webhooks) complete', type: 'day', v: 8 },
  { id: 'crm', i: '💼', t: 'Lead Machine', d: 'Day 11 (Lead gen & CRM) complete', type: 'day', v: 11 },
  { id: 'ai', i: '🧠', t: 'AI Whisperer', d: 'Day 14 (LLMs & prompts) complete', type: 'day', v: 14 },
  { id: 'agent', i: '🤖', t: 'Agent Maker', d: 'Day 15 (AI Agents) complete', type: 'day', v: 15 },
  { id: 'rag', i: '📚', t: 'RAG Master', d: 'Day 16 (Chat with data) complete', type: 'day', v: 16 },
  { id: 'err', i: '🛡️', t: 'Error Fighter', d: 'Day 18 (Error handling) complete', type: 'day', v: 18 },
  { id: 'server', i: '🖥️', t: 'Server Owner', d: 'Day 19 (Self-hosting) complete', type: 'day', v: 19 },
  { id: 'half', i: '🌗', t: 'Aadha Safar', d: '13 din complete', type: 'days', v: 13 },
  { id: 'grad', i: '🎓', t: 'Graduate', d: 'Saare 25 din complete', type: 'days', v: 25 },
  { id: 'perfect1', i: '💯', t: 'Perfect Score', d: 'Kisi din ke saare quiz sahi', type: 'perfect', v: 1 },
  { id: 'perfect10', i: '🏆', t: 'Quiz Champion', d: '10 din perfect quiz', type: 'perfect', v: 10 },
  { id: 'chal1', i: '🧩', t: 'Problem Solver', d: 'Pehla challenge solve kiya', type: 'chal', v: 1 },
  { id: 'nohint', i: '🦅', t: 'Bina Hint', d: 'Ek challenge bina hint ke', type: 'nohint', v: 1 },
  { id: 'chal10', i: '👑', t: 'Challenge King', d: '10 challenges solve', type: 'chal', v: 10 },
  { id: 'biz1', i: '💼', t: 'Pehla Client Project', d: 'Business Track ka pehla Level 1 project', type: 'biz', v: 1 },
  { id: 'biz5', i: '🏢', t: 'Industry Pro', d: '5 industries ke Level 1 projects', type: 'biz', v: 5 },
  { id: 'streak3', i: '🔥', t: '3 Din Streak', d: 'Lagataar 3 din kuch seekha', type: 'streak', v: 3 },
  { id: 'streak7', i: '☄️', t: 'Hafta Pakka', d: 'Lagataar 7 din streak', type: 'streak', v: 7 },
];

// Har din ka ⭐ Bonus sawaal (5th question) — [q, options, answerIndex, explanation]
const BONUS_Q = {
  1: ['Neeche mein se automation ke liye sabse achha kaam kaunsa hai?', ['Har roz same format ka report bhejna', 'Kisi dost ko birthday gift chunna', 'Naya business idea sochna', 'Client se pehli meeting mein rishta banana'], 0, 'Jo kaam baar-baar, same tareeke se hota hai — wahi automation ka best candidate hai.'],
  2: ['Form Trigger aur Webhook mein kya common hai?', ['Dono time par chalte hain', 'Dono bahar se data aane par workflow start karte hain', 'Dono sirf AI ke liye hain', 'Dono ko credential chahiye hi'], 1, 'Dono "push" triggers hain — data aaya, workflow chala.'],
  3: ['Ek node ke output mein 10 items hain. Agla Gmail node kitni emails bhejega (normally)?', ['1', '10', '0', 'Random'], 1, 'n8n har item ke liye node ek baar chalata hai — 10 items = 10 emails.'],
  4: ['{{ $json.name.toUpperCase() }} — "rahul" ka result kya hoga?', ['rahul', 'Rahul', 'RAHUL', 'Error'], 2, 'toUpperCase() poora text capital kar deta hai.'],
  5: ['Ek field ki 4 alag values par 4 alag raaste chahiye. Kaunsa node best hai?', ['IF', 'Switch', 'Merge', 'Wait'], 1, 'IF sirf 2 raaste deta hai; 3+ ke liye Switch.'],
  6: ['Code node mein "Run Once for All Items" mode mein saare items kaise milte hain?', ['$json', '$input.all()', '$now', '$execution'], 1, '$input.all() saare items ka array deta hai.'],
  7: ['API se "404" status aaya. Iska matlab?', ['Sab theek hai', 'Login galat', 'Jo cheez maangi woh mili nahi (URL/ID galat)', 'Server bahut busy'], 2, '404 = Not Found. URL ya ID check karo.'],
  8: ['API key / password n8n mein kahan rakhna chahiye?', ['Node ke text field mein seedha', 'Credentials mein', 'Sticky note mein', 'Workflow ke naam mein'], 1, 'Credentials encrypted rehte hain aur workflow share karne par leak nahi hote.'],
  9: ['Google Sheets mein "Append or Update" kab use karte hain?', ['Har baar nayi row chahiye', 'Row mile to update, na mile to nayi banao', 'Sheet delete karni ho', 'Sirf padhna ho'], 1, 'Matching column se check hota hai — duplicate rows nahi banti.'],
  10: ['Airtable/Notion ki jagah Postgres/Supabase kab better hai?', ['Jab data bahut zyada ho aur speed chahiye', 'Jab sirf 10 rows ho', 'Jab table dikhni na ho', 'Kabhi nahi'], 0, 'Real database lakhon rows aur complex queries achhe se sambhalta hai.'],
  11: ['Lead scoring ka main fayda kya hai?', ['Leads delete karna', 'Sales team pehle hot leads par time lagaye', 'Email design karna', 'Website fast karna'], 1, 'Score se pata chalta hai kaun abhi khareedne ke kareeb hai.'],
  12: ['AI se social post likhwane ke baad "approval" step kyun?', ['AI hamesha galat hota hai', 'Brand ki galti publish hone se pehle insaan check kar le', 'n8n ka rule hai', 'Post fast hoti hai'], 1, 'Human-in-the-loop = quality aur brand safety.'],
  13: ['Payment webhook duplicate aa jaaye to kya karna chahiye?', ['Do baar invoice bhejo', 'Payment/order ID se check karo ki pehle process hua ya nahi', 'Webhook band karo', 'Kuch nahi'], 1, 'Unique ID se dedupe (idempotency) — double invoice nahi jaata.'],
  14: ['Prompt mein "temperature" kam (0–0.3) rakhne se kya hota hai?', ['Jawab zyada creative/random', 'Jawab zyada consistent/predictable', 'AI fast hota hai', 'Token free ho jaate hain'], 1, 'Classification/extraction jaise kaam mein low temperature best hai.'],
  15: ['AI Agent ko kaunsa tool kab use karna hai, yeh kaise samajhta hai?', ['Random', 'Tool ke naam + description se', 'Tool ke color se', 'Sabse pehla tool hamesha'], 1, 'Saaf description = agent sahi tool chunta hai.'],
  16: ['RAG mein "embeddings" ka kaam kya hai?', ['Text ko numbers (vector) mein badalna taaki similar text dhoondha ja sake', 'PDF print karna', 'Email bhejna', 'Password chhupana'], 0, 'Similar meaning = paas-paas vectors — isi se sahi tukda milta hai.'],
  17: ['Invoice image se total nikaalne ke liye flow kya hoga?', ['Image → Gmail', 'Image → Vision/Extractor AI → structured fields', 'Image → Wait', 'Image → Delete'], 1, 'Vision/Information Extractor image se fields JSON mein deta hai.'],
  18: ['Error Workflow kab chalta hai?', ['Har successful run par', 'Jab koi workflow fail ho', 'Roz subah', 'Kabhi nahi'], 1, 'Error Trigger wala workflow kisi bhi fail run par alert bhej sakta hai.'],
  19: ['Self-hosted n8n ko domain + HTTPS ke saath chalane ke liye aam taur par kya lagta hai?', ['Sirf Excel', 'Reverse proxy (jaise Caddy/Nginx) + SSL', 'Telegram bot', 'Kuch nahi'], 1, 'Reverse proxy domain ko n8n tak le jaata hai aur SSL lagata hai.'],
  20: ['Workflows ka backup GitHub par kyun?', ['Fun ke liye', 'Version history + server crash hone par wapas laana', 'Speed badhane', 'Credentials share karne'], 1, 'Git mein har change ka record rehta hai.'],
  21: ['AI support desk mein "escalate to human" kab hona chahiye?', ['Kabhi nahi', 'Jab AI unsure ho, customer gussa ho ya refund/legal baat ho', 'Har message par', 'Sirf raat mein'], 1, 'Mushkil ya sensitive case insaan ko dena trust banata hai.'],
  22: ['Content engine mein ek idea se kai platform ke posts banane ko kya kehte hain?', ['Repurposing', 'Deleting', 'Scraping', 'Hosting'], 0, 'Ek blog → LinkedIn, Insta, X posts = repurposing.'],
  23: ['Finance automation mein amounts ka calculation kaun kare?', ['AI model', 'Code/expression (exact math)', 'Sticky note', 'Random'], 1, 'Paise ka hisaab exact chahiye — LLM nahi, code.'],
  24: ['Client ko automation bechne ka sabse strong tareeka?', ['Sirf technical words', 'Unke time/paise ki bachat (ROI) dikhana', 'Free mein hamesha', 'Bina demo'], 1, 'Business owner ROI samajhta hai — "har mahine 40 ghante bachenge".'],
  25: ['Capstone demo mein sabse pehle kya dikhana chahiye?', ['Node settings', 'Problem + result (pehle vs baad)', 'Credentials', 'Code'], 1, 'Pehle "kya problem solve hui", phir "kaise" — audience jud jaati hai.'],
};

// Browser ke liye chhota data packet (layout mein embed hota hai)
// Har module = ek "world"; uske saare din + quiz = World cleared badge
const WORLDS = () => {
  const { modules, days } = require('./curriculum');
  return modules.map((m) => ({ no: m.no, i: m.icon, t: m.title, c: m.color, days: days.filter((d) => d.module === m.id).map((d) => d.day) }));
};
const allBadges = () => [...BADGES, ...WORLDS().map((w) => ({ id: `world${w.no}`, i: w.i, t: `World ${w.no} Cleared`, d: `${w.t}: saare din complete`, type: 'world', v: w.no }))];
const clientData = () => ({ XP, LEVELS, WORLDS: WORLDS().map(({ no, days }) => ({ no, days })), BADGES: allBadges().map(({ id, i, t, type, v }) => ({ id, i, t, type, v })) });

module.exports = { XP, LEVELS, BADGES, BONUS_Q, WORLDS, allBadges, clientData };
