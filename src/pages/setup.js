// ============================================================
//  DAY 0 SETUP — /setup  (class 1 se pehle ka checklist)
// ============================================================
const cfg = require('../config');
const { layout } = require('../layout');
const { esc, pad, makeBuilder } = require('../kit');

const STEPS = [
  { id: 'n8n', i: '⚡', t: 'n8n account banao', need: 'Day 1 se', time: '5 min', steps: ['n8n.io par jao → "Get started free" (Cloud trial) — ya baad mein Day 19 par apna server bhi bana sakte ho', 'Email verify karo aur workspace ka naam do', 'Dashboard khul gaya? "Create workflow" dabake dekho — canvas khulna chahiye'], link: ['n8n Cloud signup', 'https://n8n.io/'] },
  { id: 'google', i: '📧', t: 'Ek Google account (Gmail + Sheets + Drive)', need: 'Day 1, 2, 4…', time: '2 min', steps: ['Practice ke liye alag Gmail banana best hai (personal inbox safe rehta hai)', 'drive.google.com par ek folder "n8n course" banao', 'Usme ek blank Google Sheet banao — Day 2 se kaam aayegi'], link: ['Google account', 'https://accounts.google.com/signup'] },
  { id: 'telegram', i: '✈️', t: 'Telegram + apna bot', need: 'Day 2, 7, 9, 15', time: '5 min', steps: ['Phone/laptop par Telegram install karo', '@BotFather ko message karo → /newbot → naam do → jo token mile use kahin safe save karo', '@userinfobot ko "hi" bhejo — aapka chat ID mil jaayega (alerts ke liye)'], link: ['Telegram BotFather', 'https://t.me/BotFather'] },
  { id: 'openai', i: '🤖', t: 'OpenAI API key (AI wale din ke liye)', need: 'Day 12, 14–17, 21–24', time: '5 min', steps: ['platform.openai.com par sign up karo', 'Billing mein ₹500–1000 ka credit daalo (poore course ke liye kaafi hai)', 'API keys → Create new secret key → copy karke safe rakho (dobara nahi dikhegi)'], link: ['OpenAI platform', 'https://platform.openai.com/'] },
  { id: 'tools', i: '🧰', t: 'Chhote helper tools', need: 'Day 5, 8', time: '3 min', steps: ['Chrome ya Edge browser (latest)', 'API test ke liye hoppscotch.io bookmark karo (Postman jaisa, browser mein)', 'Ek notes app / notebook — har din 3 cheezein likhna jo seekhi'], link: ['Hoppscotch', 'https://hoppscotch.io/'] },
  { id: 'community', i: '👥', t: 'Community group join karo', need: 'Day 1 se', time: '1 min', steps: ['Batch ka WhatsApp group join karo (link enrollment ke baad milega)', 'n8n community forum par account bana lo — doubts ke liye goldmine hai'], link: ['n8n community', 'https://community.n8n.io/'] },
];

function renderSetup() {
  const B = makeBuilder();
  const S = [];
  S.push(B.sec({
    id: 'setup-hero', title: 'Day 0 setup', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">Class 1 se pehle · 20–30 minute</span>
      <h1 class="lh-title">Day 0: Setup<br><span class="grad">sab ready, taaki class mein sirf seekhna ho</span></h1>
      <p class="lead">Yeh ek baar ka kaam hai. Har step ke baad tick lagao — aapka progress isi browser mein save rehta hai. Kahin atke to koi tension nahi, pehli class mein bhi help milegi.</p>
      <div class="setup-meter" data-setup-meter><div><span style="width:0%"></span></div><b>0 / ${STEPS.length} ready</b></div></div>`,
  }));
  S.push(B.sec({
    id: 'checklist', group: 'Checklist', eyebrow: `${STEPS.length} steps`, title: 'Setup checklist',
    body: `<div class="setup-list">${STEPS.map((s, i) => `<div class="setup-item card reveal" data-setup="${s.id}" style="--d:${i * 50}ms">
        <label class="su-head"><input type="checkbox" data-setup-check="${s.id}"><span class="su-ic">${s.i}</span><span class="su-t"><b>${pad(i + 1)}. ${esc(s.t)}</b><small>⏱ ${s.time} · Kab chahiye: ${esc(s.need)}</small></span></label>
        <ol class="su-steps">${s.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
        <a class="su-link" href="${esc(s.link[1])}" target="_blank" rel="noopener">${esc(s.link[0])} ↗</a></div>`).join('')}</div>`,
  }));
  S.push(B.sec({
    id: 'setup-faq', group: 'Help', eyebrow: 'Doubts', title: 'Setup se jude common sawaal',
    body: `<div class="faq">${[['Coding nahi aati — chalega?', 'Bilkul. Pehle 5 din bina code ke chalte hain. Day 6 par jo thoda JavaScript aata hai, woh copy-paste + samjhaane ke saath hai.'], ['Laptop purana hai, chalega?', 'n8n Cloud browser mein chalta hai, isliye koi bhi laptop jisme Chrome chale, kaafi hai. Phone par seekhna mushkil hoga.'], ['OpenAI ka paisa abhi dena zaroori hai?', 'Nahi. Day 12 se pehle zaroorat nahi. Tab tak ruk sakte ho.'], ['Personal Gmail use kar sakte hain?', 'Kar sakte ho, par practice ke liye alag Gmail better hai — galti se koi test email kisi aur ko nahi jaayega.']].map(([q, a]) => `<details class="reveal"><summary>${esc(q)}<i>+</i></summary><p>${esc(a)}</p></details>`).join('')}</div>
    <p class="hint reveal">Sab ready? 🎉 <a href="/day/1">Day 1 shuru karo →</a></p>`,
  }));
  return layout({
    title: `Day 0 Setup — class se pehle ka checklist | ${cfg.brand}`,
    desc: 'n8n course shuru karne se pehle: n8n account, Google, Telegram bot, OpenAI key aur tools — step-by-step Hinglish checklist.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'setup',
  });
}

module.exports = { renderSetup };
