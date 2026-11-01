// ============================================================
//  AGENDA EXPLAINER — har class-plan block ke liye
//  { e: explanation, x: [examples], k: kid/teacher script, q: [class questions] }
// ============================================================
const { days } = require('./curriculum');
const EX = { ...require('./examples'), ...require('./examples2') };
const LESSONS = { ...require('./lessons'), ...require('./lessons2') };

const SPECIAL = {
  '1:0': {
    e: 'Pehle 15 minute mein student ko poora safar dikhao: 25 din, 8 modules, har din 2 ghante, aur end mein ek real capstone project. Saath hi tools ready karwao (n8n account, Gmail, Google Sheet) aur community group join karwao, taaki koi peeche na rahe.',
    x: ['Roadmap: Day 1–5 basics → 6–13 real business apps → 14–17 AI → 18–20 production → 21–25 projects + clients', 'Tools checklist: n8n cloud trial ya self-host, Google account, Telegram, ek notebook', 'Ice-breaker: "Aap roz kaunsa kaam baar-baar karte ho?" — har student ek kaam bataye'],
    k: '"Jaise school ke pehle din teacher batati hai saal bhar kya padhenge aur bag mein kya laana hai — aaj hum wahi kar rahe hain. Bag = tools, syllabus = roadmap."',
    q: ['Aapka roz ka sabse boring repeat kaam kaunsa hai?', 'n8n account ban gaya? Screenshot group mein daalo.', 'Course ke end tak aap kaunsa ek automation banana chahte ho?'],
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
      };
    case 'recap':
      return {
        e: `${min} minute mein pichhli class (${prev ? `Day ${prev.day}: ${prev.title}` : 'pichhla din'}) ko jaldi se yaad karwao aur homework check karo. ${detail ? detail + '. ' : ''}Recap se naya topic purane se judta hai — "kal yeh seekha, aaj uske upar yeh banayenge."`,
        x: [prev ? `2 students apna homework screen share karein: "${prev.homework}"` : 'Homework share', prev ? `Ek line mein: kal ke 3 topics — ${prev.topics.slice(0, 3).join(', ')}` : 'Kal ke topics', `Bridge: "Aaj hum ${d.title} seekhenge — kal wale workflow mein yeh naya power add hoga."`],
        k: '"Cricket match se pehle warm-up karte ho na? Recap dimaag ka warm-up hai."',
        q: ['Kal wale workflow mein sabse mushkil step kaunsa laga?', 'Homework mein kahan error aaya aur kaise theek kiya?', 'Kal ka ek node naam batao aur woh kya karta hai?'],
      };
    case 'live':
      return {
        e: `Teacher screen share karke live banata hai, students saath-saath apne n8n mein banate hain. Aaj ka build: ${detail || d.lab}. Har node ke baad "Execute step" dabao aur output dikhao — galti bhi live hone do, debugging bhi seekhne ka hissa hai.`,
        x: [steps.length ? `Order: ${steps.join(' → ')}` : d.lab, ...(story.length ? [`Story se jodo: ${story.slice(0, 3).join(' · ')}`] : []), 'Checkpoint: har 10 minute par poocho "sabka green tick aaya?"'],
        k: E.story ? `"Aaj ki kahani yaad hai — '${E.story.t}'? Ab hum wahi kahani n8n mein banayenge. Har scene ek node hai: ek-ek block jodo aur har block ke baad dekho sab chal raha hai ya nahi."` : '"Lego ka set — ek-ek block jodte jao, har block ke baad dekho model khada hai ya nahi."',
        q: ['Is node ka output agle node mein kaise ja raha hai?', 'Agar yeh node fail ho to kya hoga?', 'Isko apne business mein kahan use kar sakte ho?'],
      };
    case 'turn':
      return {
        e: 'Ab student khud karega. Teacher ka workflow copy nahi — apne naam, apne email, apne use-case ke saath customize karo. Teacher ghoom-ghoom ke (ya breakout rooms mein) help kare.',
        x: practice.length ? practice : ['Apna naam aur email lagao', 'Time badlo', 'Ek extra node add karo'],
        k: '"Teacher ne drawing board par banaya, ab tum apni copy mein apne rang bharo."',
        q: ['Aapne kya customize kiya?', 'Kahan atke?', 'Kisi aur ko yeh workflow kaise samjhaoge?'],
      };
    case 'qa':
      return {
        e: `Aakhri ${min} minute: doubts clear karo aur homework samjhao taaki ghar par student akela kar sake. Homework: ${d.homework}`,
        x: ['Har student ek doubt chat mein likhe — top 3 live solve', `Homework ka pehla step class mein hi shuru karwa do`, 'Agle din ka teaser: kal kya banayenge'],
        k: '"Ghar jaane se pehle bag check — sab samajh aaya? Homework diary mein likha?"',
        q: ['Aaj ka sabse useful node kaunsa laga?', 'Homework mein pehla step kya hoga?', 'Aaj ki class 1 line mein summarize karo.'],
      };
    case 'hw':
      return {
        e: `Session ka end: ${detail || 'agle din ki tayyari aur homework'}. Homework: ${d.homework}`,
        x: ['Deadline aur submission format clear karo (screenshot / workflow JSON / Loom)', 'Jo peeche hain unke liye extra help slot', 'Capstone progress: problem → design → build'],
        k: '"Project ka agla page — ghar par likhna hai, kal sabko dikhana hai."',
        q: ['Aapka capstone problem statement kya hai?', 'Kis step par help chahiye?', 'Kal tak kya complete karoge?'],
      };
    case 'brief':
      return {
        e: 'Real client project jaisa: pehle brief padho, sawaal poocho, phir architecture (boxes aur arrows) board par banao. Code/nodes baad mein — pehle naksha.',
        x: [d.lab, `Topics: ${d.topics.slice(0, 3).join(', ')}`, ...(story.length ? [`Story: ${story.slice(0, 2).join(' · ')}`] : [])],
        k: E.concept ? E.concept.k : '"Ghar banane se pehle naksha banta hai."',
        q: E.concept ? E.concept.q : ['Input kya hai?', 'Output kya chahiye?', 'Kaunse nodes lagenge?'],
      };
    case 'sprint':
      return {
        e: `Lamba build session (${min} min). Phases mein bano, har phase ke end par checkpoint. ${detail || ''}`,
        x: (d.topics || []).slice(0, 4).map((t, j) => `Phase ${j + 1}: ${t}`),
        k: '"Marathon ek saath nahi daudte — har kilometer par paani peete hain. Har phase ek kilometer hai."',
        q: ['Kaunsa phase complete hua?', 'Kahan error aa raha hai?', 'Agle 15 minute ka target kya hai?'],
      };
    case 'demo':
      return {
        e: `${detail || 'Students apna kaam dikhate hain'}. Har demo mein: problem, workflow live run, aur result. Baaki students feedback dein — ek tareef, ek sudhaar.`,
        x: ['Format: 1 min problem → 2 min live run → 1 min impact', 'Feedback: "⭐ Yeh achha laga, 🔧 Yeh aur behtar ho sakta hai"', 'Backup: screen recording ready rakho agar live fail ho'],
        k: '"Science fair — model dikhao, batao kaise chalta hai, sawaalon ka jawab do."',
        q: ['Is workflow ne kitna time/paisa bachaya?', 'Error aaya to kya hoga?', 'Isko client ko kitne mein bechoge?'],
      };
    case 'grad':
      return {
        e: `${title}: mehnat ka celebration aur agla raasta. ${detail || ''}`,
        x: ['Top projects ko award + LinkedIn shout-out', 'Certificate n8n workflow se hi auto-generate karke email', '90-day roadmap: clients, retainer, templates'],
        k: '"Annual function — medal milta hai, aur agle saal ki class ka plan bhi."',
        q: ['Agle 30 din mein pehla client kaise laoge?', 'Kaunsa skill aur gehra seekhna hai?', 'Alumni group mein kya contribute karoge?'],
      };
    case 'sales':
      return {
        e: 'Pairs mein role-play: ek client, ek freelancer. Discovery sawaal poocho, problem samjho, solution aur price batao. Phir role badlo.',
        x: ['Client: "Mere leads miss ho jaate hain" → Freelancer: "Abhi kaise aate hain? Kitne/din? Reply kitni der mein?"', 'Price: "Setup ₹25k + ₹5k/mahina maintenance"', 'Close: "Main 2 din mein demo bana ke dikhata hoon"'],
        k: '"Nimbu-paani bechne wala pehle poochta hai — garmi lag rahi hai? Phir glass deta hai."',
        q: ['Client ka asli dard kya tha?', 'Price kaise justify kiya?', 'Agla step kya fix kiya?'],
      };
    default:
      return {
        e: `${title} (${min} min): seekhe hue ko test karne ka time. ${detail ? detail + '. ' : ''}Galti karna allowed hai — yahin seekhte hain.`,
        x: [...practice.slice(0, 2), ...(mistakes[0] ? [`Common galti dhoondo: ${mistakes[0]}`] : [])].slice(0, 3),
        k: '"Practice match — jitna yahan girenge, utna asli match mein kam girenge."',
        q: (L.quiz || []).slice(0, 3).map((x) => x[0]),
      };
  }
}

// Clickable agenda list (home day sections + lesson class-plan)
function agendaHtml(d) {
  const { esc, pad } = require('./kit');
  const fmt = (min) => `${Math.floor(min / 60)}:${pad(min % 60)}`;
  let acc = 0;
  return `<div class="ag-tools"><button type="button" class="ag-all" data-ag-all>📖 Saare explain kholo</button><small>Har block par click karo — explanation, examples, script aur class questions.</small></div>
  <ol class="agenda ag-click">${d.agenda.map((a, i) => {
    const s = acc; acc += a[0];
    const X = agendaExplain(d.day, i);
    return `<li><time>${fmt(s)}–${fmt(acc)}</time><div><b>${esc(a[1])}</b>${a[2] ? `<small>${esc(a[2])}</small>` : ''}</div><em>${a[0]}m</em>
      <details class="ag-d"><summary>💡 Samjho + Example</summary><div class="ag-x">
        <p class="ag-e">${esc(X.e)}</p>
        ${X.x && X.x.length ? `<h5>🌍 Examples</h5><ul>${X.x.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        ${X.k ? `<div class="ag-k"><b>🧒 Bachche ko aise samjhao</b><p>${esc(X.k)}</p></div>` : ''}
        ${X.q && X.q.length ? `<h5>🙋 Class se poocho</h5><ol class="ag-q">${X.q.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}
      </div></details></li>`;
  }).join('')}</ol>`;
}

module.exports = { agendaExplain, agendaHtml, EXAMPLES: EX };
