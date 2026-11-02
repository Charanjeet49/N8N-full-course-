// ============================================================
//  SPEED BUILD BATTLE — mentor class guide (website mentor view + mentor PDF)
//  Ek fun class: teams industry card kheenchti hain, Level 1 banati hain,
//  twist card milta hai, phir 2 minute ka demo + pitch.
// ============================================================

const BATTLE = {
  when: 'Day 11 ke baad kabhi bhi (form, Sheets, Telegram, IF aa chuke ho). Day 15 ke baad chalao to AI twist cards bhi khol do.',
  team: '2-3 students ki team. Ek "builder" (keyboard), ek "tester" (form bharta hai), ek "pitcher" (demo bolta hai). Har round mein role badlo.',
  need: ['Har team ke paas n8n account (cloud trial ya self-host) chalu ho', 'Ek Google Sheet + Telegram bot pehle se connect ho (Day 2 wala)', 'Projector par timer (phone ka stopwatch bhi chalega)', '10 industry chits + 8 twist chits (neeche wali list print karke kaat lo)', 'Score sheet ki 1 copy (is guide ke end mein)'],
  plan: [
    ['0–10', '🎲 Teams + card draw', 'Teams banao. Har team ek industry chit kheenchti hai. Wahi industry ka /business page kholo: story aur schema 3 minute padho.'],
    ['10–40', '⚡ Round 1 — Level 1 build', 'Form → Set (ID + time) → Google Sheet → Telegram alert. Schema ke columns sheet mein banao. Pehli working row par haath upar karo — speed bonus.'],
    ['40–45', '🃏 Twist card', 'Har team ek twist chit kheenchti hai. Mentor 1 minute mein samjhata hai ki kaunsa node lagega (hint ke roop mein).'],
    ['45–70', '🔧 Round 2 — twist jodo', 'Twist ko apne workflow mein jodo. Sticky note mein likho kya badla. Test 2 baar karo: ek sahi, ek galat input se.'],
    ['70–90', '🎤 Demo + pitch', 'Har team 2 minute: tester live form bharta hai, alert dikhta hai, pitcher client wali line bolta hai. Baaki class "client" banke 1 sawaal poochti hai.'],
    ['90–120', '🏆 Score + review', 'Score sheet bharo, winner announce. Phir sab milkar 2 sabse achhe workflows ka JSON dekhte hain: naming, IF logic, error handling.'],
  ],
  twists: [
    ['🔥', 'Hot lead alag', 'Budget/amount ek limit se zyada ho to Telegram mein "🔥 HOT" alag message.', 'IF', 5],
    ['🔁', 'Duplicate rokna', 'Same phone dobara aaye to nayi row nahi, purani update ho.', 'Google Sheets: Append or Update', 9],
    ['🌅', 'Subah ka summary', 'Roz 9 baje owner ko kal ki saari enquiries ki ginti + list.', 'Schedule Trigger, Aggregate', 3],
    ['🤖', 'AI reply draft', 'Customer ke liye 3 line ka friendly reply AI se banao aur alert ke saath bhejo.', 'OpenAI / AI Agent', 14],
    ['🧯', 'Error alert', 'Sheet node fail ho to mentor ko Telegram par error message.', 'Error Trigger, Error Workflow', 18],
    ['⏳', 'Follow-up', '1 din baad (demo mein 1 minute baad) customer ko follow-up message.', 'Wait', 11],
    ['🔀', 'Category routing', 'Form mein dropdown jodo (jaise service type) aur har option ka alag alert.', 'Switch', 5],
    ['🧮', 'Auto calculation', 'Quantity × rate ya log × budget nikaal ke sheet mein total column bharo.', 'Set / Code', 6],
  ],
  score: [
    ['Workflow end-to-end chalta hai (form → sheet → alert)', 30],
    ['Schema saaf: sahi columns, ID + time + stage', 15],
    ['Twist card poora hua', 20],
    ['Node naam + sticky note samajh aate hain', 10],
    ['2 minute pitch (client ki language mein)', 15],
    ['Speed bonus: Round 1 sabse pehle (10), doosre (6), teesre (3)', 10],
  ],
  tips: [
    'Battle se pehle khud ek industry ka Level 1 bana ke rakho, taaki koi team atke to 30 second mein dikha sako.',
    'Jo team bahut peeche ho, use industry page ka ready JSON import karne do, par twist khud banana hoga (Round 1 ke 30 mein se 15 points milenge).',
    'Kamzor students ko "tester" role do pehle round mein: form bharna aur bug pakadna bhi seekhna hai.',
    'Pitch mein tech words (node, JSON, webhook) bole to −2: client ki language mein bolna practice karwana hai.',
    'Winner team ko certificate ki jagah "Client Ready" sticker/shoutout + agle class mein apna workflow sabko sikhane ka mauka do.',
  ],
};

module.exports = { BATTLE };
