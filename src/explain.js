// ============================================================
//  AGENDA EXPLAINER — har class-plan block ke liye
//  { e: explanation, x: [examples], k: kid/teacher script, q: [class questions] }
// ============================================================
const { days } = require('./curriculum');
const EX = { ...require('./examples'), ...require('./examples2') };
const LESSONS = { ...require('./lessons'), ...require('./lessons2') };

const SPECIAL = {
  '1:0': {
    e: 'Pehle 15 minute mein hum poora safar dekhenge: 25 din, 8 modules, har din 2 ghante, aur end mein aapka apna real project. Saath mein zaroori tools ready karenge (n8n account, Gmail, Google Sheet) aur community group join karenge, taaki koi peeche na rahe.',
    x: ['Roadmap: Day 1–5 basics → 6–13 real business automations → 14–17 AI → 18–20 production → 21–25 projects + clients', 'Tools checklist: n8n account, Google account, Telegram, ek notebook (Day 0 setup page par poori list hai)', 'Socho: aap roz kaunsa kaam baar-baar karte ho? Course ke end tak wahi automate karna hai.'],
    k: '"Jaise school ke pehle din pata chalta hai saal bhar kya padhenge aur bag mein kya laana hai. Bag = tools, syllabus = roadmap."',
    q: ['Aapka roz ka sabse boring repeat kaam kaunsa hai?', 'n8n account ban gaya? (Nahi bana to Day 0 page dekho.)', 'Course ke end tak aap kaunsa ek automation banana chahte ho?'],
    m: 'Ice-breaker karwao: har student apna ek repeat kaam bataye. Tools checklist live check karo aur jinka account nahi bana unki list banao. Community group ka link chat mein bhejo.',
  },
};

function kind(title) {
  const t = title.toLowerCase();
  if (t.startsWith('concept') || t.startsWith('masterclass')) return 'concept';
  if (t.startsWith('recap')) return 'recap';
  if (t.startsWith('live')) return 'live';
  if (t.includes('homework') && t.includes('q&a')) return 'qa';
  if (t === 'homework' || t.includes('capstone brief') || t.includes('check-in')) return 'hw';
  if (t.includes('brief') && t.includes('architecture')) return 'brief';
  if (t.includes('sprint') || t === 'workshop') return 'sprint';
  if (t.includes('demo')) return 'demo';
  if (t.includes('award') || t.includes('graduation')) return 'grad';
  if (t.includes('sales call')) return 'sales';
  if (t.includes('your turn')) return 'turn';
  return 'challenge';
}

function agendaExplain(n, i) {
  if (SPECIAL[`${n}:${i}`]) return SPECIAL[`${n}:${i}`];
  const d = days.find((x) => x.day === n);
  const E = EX[n] || {};
  const L = LESSONS[n] || {};
  const [min, title, detail] = d.agenda[i];
  const prev = days.find((x) => x.day === n - 1);
  const story = E.story ? E.story.s.map((s) => `${s[0]} ${s[1]} = ${s[2]}`) : [];
  const steps = (L.steps || []).map(([node]) => node);
  const practice = (L.practice || []).map(([lvl, t]) => `${lvl}: ${t}`);
  const mistakes = L.mistakes || [];

  switch (kind(title)) {
    case 'concept':
      return {
        e: E.concept ? E.concept.e : `${title.replace(/^.*?:\s*/, '')} — aaj ka core idea. ${detail || ''}`,
        x: E.concept ? E.concept.x : d.topics.slice(0, 3),
        k: E.concept ? E.concept.k : (L.concepts && L.concepts[0] ? `"${L.concepts[0][2]}"` : ''),
        q: E.concept ? E.concept.q : (L.quiz || []).slice(0, 3).map((x) => x[0]),
        m: 'Pehle real-life example se shuru karo, phir n8n screen dikhao. Har concept ke baad 1 student se apne shabdon mein dobara bulwao.',
      };
    case 'recap':
      return {
        e: `${min} minute mein pichhli class (${prev ? `Day ${prev.day}: ${prev.title}` : 'pichhla din'}) ko jaldi se yaad karenge aur homework dekhenge. Isse aaj ka naya topic kal wale se jud jaata hai: "kal yeh seekha, aaj uske upar yeh banayenge."`,
        x: [prev ? `Kal ka homework: "${prev.homework}"` : 'Kal ka homework', prev ? `Kal ke 3 topics: ${prev.topics.slice(0, 3).join(', ')}` : 'Kal ke topics', `Aaj: ${d.title} — kal wale workflow mein naya power judega.`],
        k: '"Cricket match se pehle warm-up karte ho na? Recap dimaag ka warm-up hai."',
        q: ['Kal wale workflow mein sabse mushkil step kaunsa laga?', 'Homework mein kahan error aaya aur kaise theek kiya?', 'Kal ka ek node naam batao aur woh kya karta hai?'],
        m: `2 students se homework screen share karwao. ${detail ? detail + '. ' : ''}Galti wala homework bhi dikhao — sabse zyada seekh wahin se aati hai.`,
      };
    case 'live':
      return {
        e: `Ab hum saath-saath banayenge: screen par jo ban raha hai, aap apne n8n mein wahi banao. Aaj ka build: ${detail || d.lab}. Har node ke baad "Execute step" dabao aur output dekho. Error aaye to ghabrana nahi — yahi seekhne ka sabse achha moka hai.`,
        x: [steps.length ? `Order: ${steps.join(' → ')}` : d.lab, ...(story.length ? [`Kahani se jodo: ${story.slice(0, 3).join(' · ')}`] : []), 'Peeche reh gaye? "Today\'s build" section se ready JSON copy karke saath aa jao.'],
        k: E.story ? `"Aaj ki kahani yaad hai — '${E.story.t}'? Ab wahi kahani n8n mein banayenge. Har scene ek node hai: ek-ek block jodo aur har block ke baad dekho sab chal raha hai ya nahi."` : '"Lego ka set — ek-ek block jodte jao, har block ke baad dekho model khada hai ya nahi."',
        q: ['Is node ka output agle node mein kaise ja raha hai?', 'Agar yeh node fail ho to kya hoga?', 'Isko apne kaam/business mein kahan use kar sakte ho?'],
        m: 'Har 10 minute par poocho "sabka green tick aaya?". Jaan-boojh ke ek galti live hone do aur use debug karke dikhao.',
      };
    case 'turn':
      return {
        e: 'Ab aapki baari! Same workflow ko apne naam, apne email aur apne idea ke saath badlo. Copy karna nahi — thoda apna touch dena hai. Atke to haath uthao, help milegi.',
        x: practice.length ? practice : ['Apna naam aur email lagao', 'Time badlo', 'Ek extra node add karo'],
        k: '"Board par drawing ban gayi, ab apni copy mein apne rang bharo."',
        q: ['Aapne kya customize kiya?', 'Kahan atke?', 'Kisi dost ko yeh workflow kaise samjhaoge?'],
        m: 'Ghoom-ghoom ke (ya breakout rooms mein) dekho. Jo jaldi khatam kare use Advanced level do; jo atke unhe ready JSON se start karwao.',
      };
    case 'qa':
      return {
        e: `Aakhri ${min} minute: aapke doubts clear honge aur homework samjhaya jaayega, taaki ghar par aap akele kar sako. Homework: ${d.homework}`,
        x: ['Apna doubt chat mein likho — koi sawaal chhota nahi hota', 'Homework ka pehla step yahin shuru kar lo', 'Kal ka teaser: agla build kya hoga'],
        k: '"Ghar jaane se pehle bag check — sab samajh aaya? Homework diary mein likha?"',
        q: ['Aaj ka sabse useful node kaunsa laga?', 'Homework mein pehla step kya hoga?', 'Aaj ki class 1 line mein summarize karo.'],
        m: 'Chat se top 3 doubts live solve karo. Homework ka pehla step class mein hi karwa do, taaki koi blank na baithe.',
      };
    case 'hw':
      return {
        e: `Session ka end: ${detail || 'agle din ki tayyari aur homework'}. Homework: ${d.homework}`,
        x: ['Submission: screenshot / workflow JSON / 1-min Loom video', 'Peeche ho? Extra help slot mein aao', 'Capstone: problem → design → build — ek-ek step'],
        k: '"Project ka agla page — ghar par likhna hai, kal sabko dikhana hai."',
        q: ['Aapka capstone problem statement kya hai?', 'Kis step par help chahiye?', 'Kal tak kya complete karoge?'],
        m: 'Deadline aur submission format saaf bolo. Jo peeche hain unki list banao aur help slot do.',
      };
    case 'brief':
      return {
        e: 'Bilkul real client project jaisa: pehle brief padhenge, sawaal poochenge, phir architecture (boxes aur arrows) banayenge. Nodes baad mein — pehle naksha.',
        x: [d.lab, `Topics: ${d.topics.slice(0, 3).join(', ')}`, ...(story.length ? [`Kahani: ${story.slice(0, 2).join(' · ')}`] : [])],
        k: E.concept ? E.concept.k : '"Ghar banane se pehle naksha banta hai."',
        q: E.concept ? E.concept.q : ['Input kya hai?', 'Output kya chahiye?', 'Kaunse nodes lagenge?'],
        m: 'Brief padh ke students se hi requirements nikalwao. Architecture board par sab milke banao.',
      };
    case 'sprint':
      return {
        e: `Lamba build session (${min} min). Phases mein banayenge, har phase ke end par check karenge sab chal raha hai. ${detail || ''}`,
        x: (d.topics || []).slice(0, 4).map((t, j) => `Phase ${j + 1}: ${t}`),
        k: '"Marathon ek saath nahi daudte — har kilometer par paani peete hain. Har phase ek kilometer hai."',
        q: ['Kaunsa phase complete hua?', 'Kahan error aa raha hai?', 'Agle 15 minute ka target kya hai?'],
        m: 'Har phase ke end par 2 minute checkpoint. Jo aage hain unse peeche walon ki help karwao.',
      };
    case 'demo':
      return {
        e: `${detail || 'Apna kaam dikhane ka time'}. Har demo mein: problem, workflow live chalana, aur result. Baaki sab feedback denge — ek tareef, ek sudhaar.`,
        x: ['Format: 1 min problem → 2 min live run → 1 min impact', 'Feedback: "⭐ Yeh achha laga, 🔧 Yeh aur behtar ho sakta hai"', 'Backup: screen recording ready rakho agar live fail ho'],
        k: '"Science fair — model dikhao, batao kaise chalta hai, sawaalon ka jawab do."',
        q: ['Is workflow ne kitna time/paisa bachaya?', 'Error aaya to kya hoga?', 'Isko client ko kitne mein bechoge?'],
        m: 'Time strictly rakho. Har demo ke baad pehle tareef, phir ek sudhaar — tone positive.',
      };
    case 'grad':
      return {
        e: `${title}: mehnat ka celebration aur aage ka raasta. ${detail || ''}`,
        x: ['Top projects ko award + LinkedIn shout-out', 'Certificate n8n workflow se hi auto-generate hota hai (Day 25 build!)', '90-day roadmap: clients, retainer, templates'],
        k: '"Annual function — medal milta hai, aur agle saal ka plan bhi."',
        q: ['Agle 30 din mein pehla client kaise laoge?', 'Kaunsa skill aur gehra seekhna hai?', 'Alumni group mein kya contribute karoge?'],
        m: 'Har student ka naam lo aur ek achhi baat bolo. Alumni group ka link aur 90-day plan template share karo.',
      };
    case 'sales':
      return {
        e: 'Pairs mein role-play: ek client, ek freelancer. Sawaal poocho, problem samjho, solution aur price batao. Phir role badlo.',
        x: ['Client: "Mere leads miss ho jaate hain" → Freelancer: "Abhi kaise aate hain? Kitne/din? Reply kitni der mein?"', 'Price: "Setup ₹25k + ₹5k/mahina maintenance"', 'Close: "Main 2 din mein demo bana ke dikhata hoon"'],
        k: '"Nimbu-paani bechne wala pehle poochta hai — garmi lag rahi hai? Phir glass deta hai."',
        q: ['Client ka asli dard kya tha?', 'Price kaise justify kiya?', 'Agla step kya fix kiya?'],
        m: 'Pehle ek pair ka demo khud karke dikhao. Har pair ko 8 minute, phir role swap.',
      };
    default:
      return {
        e: `${title} (${min} min): jo seekha use khud try karne ka time. ${detail ? detail + '. ' : ''}Galti karna bilkul allowed hai — yahin sabse zyada seekhte hain.`,
        x: [...practice.slice(0, 2), ...(mistakes[0] ? [`Yeh galti dhoondo: ${mistakes[0]}`] : [])].slice(0, 3),
        k: '"Practice match — jitna yahan girenge, utna asli match mein kam girenge."',
        q: (L.quiz || []).slice(0, 3).map((x) => x[0]),
        m: 'Pehle 5 minute akele try karne do, phir hint do. Jo solve kare use screen share karwao.',
      };
  }
}

// Clickable agenda list (home day sections + lesson class-plan)
function agendaHtml(d) {
  const { esc, pad } = require('./kit');
  const fmt = (min) => `${Math.floor(min / 60)}:${pad(min % 60)}`;
  let acc = 0;
  return `<div class="ag-tools"><button type="button" class="ag-all" data-ag-all>📖 Saare explain kholo</button><small>Har block par click karo — aasaan explanation, examples aur khud ko check karne ke sawaal.</small></div>
  <ol class="agenda ag-click">${d.agenda.map((a, i) => {
    const s = acc; acc += a[0];
    const X = agendaExplain(d.day, i);
    return `<li><time>${fmt(s)}–${fmt(acc)}</time><div><b>${esc(a[1])}</b>${a[2] ? `<small>${esc(a[2])}</small>` : ''}</div><em>${a[0]}m</em>
      <details class="ag-d"><summary>💡 Samjho + Example</summary><div class="ag-x">
        <p class="ag-e">${esc(X.e)}</p>
        ${X.x && X.x.length ? `<h5>🌍 Examples</h5><ul>${X.x.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        ${X.k ? `<div class="ag-k"><b>🪄 Ek line mein samjho</b><p>${esc(X.k)}</p></div>` : ''}
        ${X.q && X.q.length ? `<h5>🤔 Khud ko check karo</h5><ol class="ag-q">${X.q.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}
        ${X.m ? `<div class="ag-m mentor-only"><b>👨‍🏫 Mentor note</b><p>${esc(X.m)}</p></div>` : ''}
      </div></details></li>`;
  }).join('')}</ol>`;
}

module.exports = { agendaExplain, agendaHtml, EXAMPLES: EX };
