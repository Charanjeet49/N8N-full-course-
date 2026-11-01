// ============================================================
//  EXAMPLES — har din ke real-life examples (Day 1–12)
//  story:  animated story (emoji, scene, n8n mapping)
//  ba:     Before (manual) vs After (automation) — [step, minutes]
//  concept: "Concept" block ka explain — e: explanation, x: examples,
//           k: bachche ko kaise samjhayein (script), q: class mein sawaal
//  topics: har topic ke liye [real-life example, n8n example]
// ============================================================
module.exports = {
  1: {
    story: { t: 'Gaadi aur automation — same soch', s: [['🔑', 'Chaabi ghumayi', 'Trigger (kab shuru ho)'], ['⚙️', 'Engine chalu hua', 'Action node'], ['🛣️', 'Gaadi road par chali', 'Data flow (connections)'], ['🚦', 'Signal laal hai? Ruk jao', 'IF node (decision)'], ['🏁', 'Manzil par pahunche', 'Output (email/message)']] },
    ba: { before: [['Roz quote website kholna', 5], ['Quote copy karna', 2], ['Gmail kholke email likhna', 5], ['Bhejna aur yaad rakhna kal bhi karna hai', 3]], after: [['n8n khud 8 baje chalta hai', 0], ['Quote fetch + email automatic', 0], ['Aap sirf inbox mein padhte ho', 1]], note: 'Roz 15 minute → 1 minute. Saal mein ~85 ghante bache.' },
    concept: {
      e: 'Automation thinking ka matlab hai har kaam ko 3 hisson mein todna: KAB shuru hota hai (trigger), KYA-KYA steps hote hain (actions), aur END mein kya milta hai (output). Jo kaam roz same tareeke se hota hai, woh automate ho sakta hai.',
      x: ['Washing machine: button dabaya (trigger) → paani, wash, rinse, spin (actions) → saaf kapde (output)', 'School bell: 8 baje (trigger) → ghanti bajti hai (action) → class shuru (output)', 'Dukaan: customer ne UPI kiya (trigger) → "₹500 received" bolne wala speaker (action)'],
      k: '"Beta, subah alarm bajta hai to tum uthte ho, brush karte ho, nahate ho, school jaate ho. Alarm = trigger, baaki sab = steps. Agar ek robot yeh sab tumhare liye kar de — wahi automation hai."',
      q: ['Aapke ghar mein kaunsi cheez already automatic hai?', 'Aapke kaam ka kaunsa task roz same tareeke se hota hai?', 'Us task ka trigger kya hai?'],
    },
    topics: [
      ['Ek coaching owner roz 2 ghante students ko fee reminder WhatsApp karta hai — yahi kaam automation 0 minute mein karta hai, isliye businesses pay karte hain.', 'Schedule Trigger + Google Sheets + WhatsApp: har mahine 5 tareekh ko pending fees walon ko reminder.'],
      ['Zapier = ready-made tiffin (easy, mehenga), Make = restaurant thali (visual), n8n = apni kitchen (thodi mehnat, poora control, sasta).', 'Simple 2-step zap → Zapier theek; AI agent + 20 steps + self-host → n8n.'],
      ['Cloud = rent ka ghar (turant shift), self-host = apna ghar (setup lagta hai, par kiraya nahi).', 'n8n.io par trial account ya terminal mein: npx n8n → localhost:5678'],
      ['Canvas ek whiteboard hai, nodes us par chipke sticky notes, connections unke beech ki lines.', 'Canvas par "+" dabao → node add, drag karke connect, "Executions" tab mein history.'],
      ['Doorbell (trigger) bajti hai → aap darwaza kholte ho (action).', 'Schedule Trigger (trigger) → Gmail "Send" (action).'],
      ['Subah ka akhbaar: hawker roz 6 baje (schedule) laata hai (HTTP), darwaze par daal deta hai (email).', 'Schedule Trigger → HTTP Request (quote API) → Gmail.'],
    ],
  },
  2: {
    story: { t: 'Doorbell vs baar-baar darwaza kholna', s: [['🚪', 'Har 5 min darwaza kholke dekhna', 'Polling trigger (Schedule)'], ['🔔', 'Doorbell lagwa li', 'Webhook (push)'], ['📦', 'Courier aaya, ghanti baji', 'Event aaya → workflow chalu'], ['📝', 'Register mein entry', 'Google Sheets append'], ['📱', 'Papa ko message', 'Telegram notification']] },
    ba: { before: [['Form responses check karna', 10], ['Sheet mein copy-paste', 10], ['Owner ko call/WhatsApp', 5]], after: [['Form submit → Sheet auto', 0], ['Owner ko Telegram auto', 0]], note: 'Har lead par 25 min bache, aur koi lead miss nahi.' },
    concept: {
      e: 'Trigger 3 tarah ke hote hain: Manual (aap button dabao), Schedule (time par — roz 9 baje), Event/Webhook (kuch hua tab — form bhara, payment aaya). Sahi trigger chunna = workflow sahi time par chalna.',
      x: ['Manual: microwave ka start button', 'Schedule: roz raat 10 baje street lights on', 'Event: koi aaya to motion-sensor light on'],
      k: '"Mummy ka alarm subah 6 baje bajta hai (schedule), doorbell kisi ke aane par (event), aur TV remote tum dabate ho (manual)."',
      q: ['Fee reminder ke liye kaunsa trigger?', 'Website form ke liye kaunsa trigger?', 'Testing ke time kaunsa trigger use karein?'],
    },
    topics: [
      ['Alarm (schedule), doorbell (webhook), light switch (manual), WhatsApp notification (app trigger).', '"0 9 * * 1-5" cron = weekdays 9 AM; Webhook URL = form ka pata.'],
      ['TV ke settings: volume, channel (parameters), parental lock password (credential).', 'Gmail node: To/Subject (parameters), Google account (credential), Retry on fail (settings).'],
      ['Rehearsal vs real show — rehearsal mein galti chalti hai, show mein nahi.', '"Test workflow" = manual run; Active/Publish = production mein khud chalega.'],
      ['CCTV recording — kya hua, kab hua, wapas dekh sakte ho.', 'Executions tab → failed run kholo → kaunsa node laal hai dekho → Retry.'],
      ['Fridge par chipki note: "Doodh khatam, laana hai".', 'Canvas par Sticky Note: "Yeh workflow leads ko Sheet mein daalta hai".'],
      ['Almirah mein labelled folders — "Bills 2026", "School".', 'Naam: "Leads – Form to Sheet", folder: "Client – ABC Gym".'],
    ],
  },
  3: {
    story: { t: 'Tiffin factory ki assembly line', s: [['📦', 'Ek bada dabba aaya (CSV)', 'Extract from File'], ['📤', 'Dabba khola, 50 tiffin nikle', 'Split Out → 50 items'], ['🧹', 'Toote tiffin hataye', 'Filter'], ['🏙️', 'City-wise ginti', 'Summarize'], ['🚚', 'Report bhej di', 'Gmail']] },
    ba: { before: [['Excel kholna', 2], ['City-wise filter + total', 20], ['Summary type karna', 10], ['Email bhejna', 3]], after: [['CSV aate hi summary email', 0]], note: 'Har report par 35 min bache, calculation galti zero.' },
    concept: {
      e: 'n8n mein data "items" ki list ke roop mein chalta hai. Har item ek JSON object hai — jaise ek form ka ek jawab. Agar 10 items aaye, to agla node 10 baar chalega. Yeh samajh aa gaya to n8n 50% aa gaya.',
      x: ['Attendance register: har line = ek student = ek item', 'Shopping list: har cheez = ek item', 'WhatsApp group ke 20 messages = 20 items'],
      k: '"Teacher ke paas 30 copies hain. Woh har copy par same kaam karti hai — check karna, marks dena. n8n bhi har item par wahi karta hai."',
      q: ['5 items Gmail node mein jaayein to kitne emails jaayenge?', 'JSON mein list kis bracket mein hoti hai?', 'PDF file n8n mein kahan rehti hai?'],
    },
    topics: [
      ['Visiting card: Naam, Phone, Email — har field ka ek label aur value.', '{ "name": "Aman", "phones": ["98…", "99…"], "address": { "city": "Pune" } }'],
      ['Conveyor belt par 10 boxes — machine har box par same kaam karti hai.', 'HTTP se 10 users aaye → Edit Fields har user par chala → 10 output items.'],
      ['Order slip aur uska bill — dono ek doosre se jude hain.', 'Paired items se pata rehta hai ki output item kis input item se bana.'],
      ['Courier mein letter (JSON) + parcel attached (binary).', 'Gmail attachment → binary.data → Extract from File → text.'],
      ['Mithai ka dabba kholna (split), wapas bharna (aggregate), ginti karna (summarize).', 'Order ke line items Split Out → Summarize by product → Aggregate into one email.'],
      ['Rough copy par practice — final copy kharab nahi hoti.', 'API ka output pin karo → aage ke nodes bina API call ke test karo.'],
    ],
  },
  4: {
    story: { t: 'Shaadi ke card par naam bharna', s: [['💌', 'Ek hi card design', 'Template (message)'], ['✍️', 'Har card par alag naam', '{{ $json.name }}'], ['📅', 'Date likhna', '{{ $now.toFormat() }}'], ['🔠', 'Naam ka spelling theek', '.toTitleCase()'], ['📮', '100 card ready', '100 personalised items']] },
    ba: { before: [['Har lead ka naam/phone manually theek karna', 30], ['Invalid emails dhoondhna', 15]], after: [['Expressions se sab auto-clean', 0], ['Invalid alag sheet mein', 0]], note: '100 leads par 45 min → 0, aur data hamesha clean.' },
    concept: {
      e: 'Expression {{ }} ek "khaali jagah" hai jo har item ke data se bhar jaati hai. $json = current item, $("Node") = kisi pichhle node ka data, $now = abhi ka time. Isse ek hi workflow har customer ke liye alag message bana deta hai.',
      x: ['Bank SMS: "Dear {{name}}, ₹{{amount}} debited"', 'School report card: "{{student}} ne {{marks}} laaye"', 'Birthday wish: "Happy birthday {{name}}, aaj aap {{age}} saal ke ho gaye!"'],
      k: '"Mad-libs game jaisa — sentence mein khaali jagah hai, har baar alag word bharo, alag sentence ban jaata hai."',
      q: ['Customer ka email kaise likhenge expression mein?', '3 din baad ki date ka expression?', 'Naam ko Proper Case kaise karein?'],
    },
    topics: [
      ['Form ka "Naam" box — har form mein alag value.', '{{ $json.email }} → current item ka email.'],
      ['Pichhle page par wapas jaake dekhna kisne bheja tha.', '{{ $("Webhook").item.json.body.phone }}'],
      ['Calculator: plus, minus, uppercase, ginti.', '{{ $json.price * 1.18 }}, {{ $json.tags.join(", ") }}, {{ $json.name.toUpperCase() }}'],
      ['Calendar mein "aaj se 7 din baad" dekhna.', '{{ $now.plus({days: 7}).toFormat("dd LLL yyyy") }} → "08 Dec 2026"'],
      ['Form ke columns ka naam badalna: "Mob No" → "phone".', 'Edit Fields: phone = {{ $json["Mob No"] }}, source = "website"'],
      ['Puzzle piece ko sahi jagah drag karna.', 'Input panel se field ko parameter box mein drag → expression khud ban jaata hai.'],
    ],
  },
  5: {
    story: { t: 'Railway junction — kaun si train kis platform', s: [['🚆', 'Train aayi (lead)', 'Webhook'], ['🧮', 'Ticket check (score)', 'Code / Set'], ['🔀', 'Junction: 3 raaste', 'Switch'], ['🔥', 'Express → Platform 1', 'HOT → Slack sales'], ['🐢', 'Passenger → Platform 3', 'COLD → archive']] },
    ba: { before: [['Har lead padh ke decide karna', 5], ['Sahi insaan ko forward', 3], ['Follow-up yaad rakhna', 5]], after: [['Score + routing auto', 0], ['Follow-up Wait node se', 0]], note: 'Har lead par 13 min bache, hot lead 1 minute mein sales tak.' },
    concept: {
      e: 'Flow control = workflow ka dimaag. IF 2 raaste banata hai (haan/naa), Switch kai raaste, Merge raaston ko wapas jodta hai, Loop bade data ko chhote batches mein chalata hai, Wait ruk ke baad mein chalata hai.',
      x: ['IF: baarish ho rahi hai? → chhata lo, warna nahi', 'Switch: marks 90+ A, 75+ B, baaki C', 'Wait: chai ubalne tak 3 minute ruko'],
      k: '"Traffic police: green to chalo, red to ruko (IF). Chauraha: left, right, seedha (Switch)."',
      q: ['5 categories ke liye IF ya Switch?', '1000 emails ek saath bhejne mein kya problem?', 'Follow-up 3 din baad kaise?'],
    },
    topics: [
      ['Paise hain AUR dukaan khuli hai → shopping. (AND); chai YA coffee → kuch bhi chalega (OR).', 'IF: {{ $json.paid }} is true AND amount > 0 → invoice branch.'],
      ['Post office sorting: har letter pin code ke hisaab se alag bag mein.', 'Switch on city: Delhi → rep A, Mumbai → rep B, fallback → manager.'],
      ['Do registers ko roll number se milana.', 'Merge (matching fields: email) → CRM data + Sheet data ek item mein.'],
      ['Lift mein ek baar 8 log — baaki agli baar.', 'Loop Over Items batch 50 + Wait 1s → API rate limit safe.'],
      ['Doctor: "3 din baad wapas aana".', 'Wait 3 days → follow-up email; ya Wait "on webhook" → approval ke baad aage.'],
      ['Chhalni se kankad nikaalna, duplicate photos delete, marks ke hisaab se rank, top 10.', 'Filter (city = Pune) → Remove Duplicates (email) → Sort (score desc) → Limit 10.'],
    ],
  },
  6: {
    story: { t: 'Dukaan ka hisaab — calculator wala munshi', s: [['🧾', 'Order list aayi', 'Webhook'], ['👨‍💻', 'Munshi ne hisaab lagaya', 'Code node'], ['➕', 'Total + GST + discount', 'reduce() / math'], ['🏷️', 'Bill number diya', 'Edit Fields'], ['↩️', 'Customer ko bill', 'Respond to Webhook']] },
    ba: { before: [['Calculator se har item jodna', 10], ['GST alag nikaalna', 5], ['Galti dobara check', 5]], after: [['Code node 1 second mein', 0]], note: 'Har bill par 20 min bache, calculation galti zero.' },
    concept: {
      e: 'Code node mein thoda JavaScript likh ke woh kaam karo jo 5-6 nodes mein hota. Bas 3 cheezein yaad rakho: data $input/$json se lo, map/filter/reduce se badlo, aur [{ json: {...} }] return karo. AI se code likhwana bhi allowed hai — samajhna zaroori hai.',
      x: ['map: har item ka price double karna', 'filter: sirf 18+ age wale', 'reduce: saare amounts ka total'],
      k: '"Recipe likhna jaisa hai: pehle ingredients lo, phir step-by-step karo, end mein plate mein serve karo — yahi return hai."',
      q: ['Code node ka return format kya hota hai?', 'Saare items kaise milte hain?', 'Total nikaalne ka method?'],
    },
    topics: [
      ['Recipe mein ingredients (variables), "agar namak kam ho to daalo" (if), "5 baar hilao" (loop).', 'const total = $json.price * $json.qty; if (total > 1000) { … }'],
      ['Poori class ki copies ek saath check vs har bachche ko alag bulana.', 'All items: $input.all() · Each item: $json'],
      ['Courier ka fixed packing format — galat packing = reject.', 'return [{ json: { total: 500 } }];'],
      ['map = har aam ko kaatna, filter = kharab aam hatana, reduce = sabka juice ek glass mein.', 'items.map(i => i.price), items.filter(i => i.qty > 0), items.reduce((s, i) => s + i.price, 0)'],
      ['Tuition teacher se homework samajhna — copy nahi, samajh ke likhna.', 'Code node mein "Ask AI": "GST 18% add karo aur 2 decimal mein round karo".'],
      ['Hindi aur English — dono se baat ho sakti hai.', 'Python mode: for item in _input.all(): item.json["x"] = 1'],
    ],
  },
  7: {
    story: { t: 'Restaurant ka waiter = API', s: [['🧑', 'Aap order dete ho', 'HTTP Request (GET/POST)'], ['🧑‍🍳', 'Waiter kitchen jaata hai', 'API server'], ['📜', 'Menu card padha', 'API docs'], ['🍛', 'Khana aaya', 'JSON response'], ['🙅', '"Aaj khatam" bola', 'Error code (404/429)']] },
    ba: { before: [['Weather app kholna', 2], ['News app kholna', 5], ['Family group par likhna', 5]], after: [['7 AM briefing Telegram par auto', 0]], note: 'Roz 12 min bache, family ko daily update.' },
    concept: {
      e: 'API do software ke beech baat karne ka tareeka hai. Aap request bhejte ho (method + URL + headers + body), server response deta hai (JSON + status code). HTTP Request node se n8n kisi bhi API se baat kar sakta hai.',
      x: ['Zomato app restaurant ki API se menu laata hai', 'Weather app mausam ki API se temperature', 'UPI app bank ki API se payment'],
      k: '"Restaurant mein tum kitchen mein nahi jaate — waiter jaata hai. API waiter hai, n8n customer hai."',
      q: ['Data laane ka method kaunsa?', '429 ka matlab?', 'API docs se fast setup kaise?'],
    },
    topics: [
      ['Library: kitaab lena (GET), nayi kitaab dena (POST), update (PUT), wapas karna (DELETE).', 'GET /users, POST /leads, PUT /leads/12, DELETE /leads/12'],
      ['Courier: lifafe par pata (URL), stamp (header), andar chitthi (body).', 'Header: Authorization: Bearer KEY · Query: ?city=Pune · Body: { "name": "Aman" }'],
      ['Naye phone ka manual — pehle "Getting started", phir features.', 'Docs mein dhoondho: Base URL, Authentication, Endpoints, Example request.'],
      ['Recipe ka photo bhej do, cook khud bana dega.', 'Docs se cURL copy → HTTP node → "Import cURL" → sab fields bhar gayi.'],
      ['Kitaab ke 10 pages — ek-ek palatna; ek din mein limit.', 'Pagination: page=1,2,3… · 429 aaye to Wait + retry.'],
      ['Doctor ki report: normal (200), "mila nahi" (404), "pass nahi hai" (401).', '200 OK · 400 bad input · 401 auth · 404 not found · 429 rate limit · 500 server'],
    ],
  },
  8: {
    story: { t: 'Society gate aur security guard', s: [['🏠', 'Ghar ka pata diya', 'Webhook URL'], ['💂', 'Guard ID check karta hai', 'Header Auth / HMAC'], ['🗝️', 'Valet ko sirf gaadi ki chaabi', 'OAuth2 (limited permission)'], ['📋', 'Visitor register', 'Google Sheets'], ['✅', 'Guard bola "andar aao"', 'Respond to Webhook']] },
    ba: { before: [['Website form email mein aata', 5], ['Manually Sheet mein', 5], ['Customer ko reply', 5]], after: [['Webhook → validate → Sheet → auto-reply → response', 0]], note: 'Har submission par 15 min bache, apna mini API ready.' },
    concept: {
      e: 'Authentication = "aap kaun ho" proof (API key, token, OAuth). Webhook = n8n ka public pata jahan apps data bhejte hain. Respond to Webhook se n8n wapas jawab deta hai — yaani n8n khud ek API ban jaata hai.',
      x: ['API key = gym membership card', 'OAuth = "Google se login karo" button', 'Webhook = Swiggy restaurant ko order notification'],
      k: '"Tumhare ghar ka pata (webhook) sabko pata hai, par andar sirf woh aa sakta hai jiske paas pass (auth) hai."',
      q: ['Website par test URL ya production URL?', 'Google login ke liye kaunsa auth?', 'Webhook secure kaise karein?'],
    },
    topics: [
      ['Gym card (API key), movie ticket (bearer token), ghar ki chaabi (basic auth: user+password).', 'HTTP Request → Authentication: Header Auth → x-api-key: ••••'],
      ['Valet parking key — gaadi chala sakta hai, dikki nahi khol sakta.', 'Google OAuth2 credential → sirf Sheets scope.'],
      ['Ghar ki chaabiyon ka ek locked box — family ko share.', 'Credentials → New → ek baar banao, har workflow mein select.'],
      ['Rehearsal ka stage vs asli show ka stage.', '/webhook-test/lead (sirf Listen mode) vs /webhook/lead (active).'],
      ['Courier ko receipt dena.', 'Respond to Webhook: 200 { "ok": true, "id": "lead_12" }'],
      ['Note par watermark — asli hai ya nakli.', 'Crypto node: HMAC-SHA256(body, secret) === header signature?'],
    ],
  },
  9: {
    story: { t: 'Clinic ka smart receptionist bot', s: [['📱', 'Patient ne Telegram kiya "/book"', 'Telegram Trigger'], ['📅', 'Free slots check', 'Google Calendar'], ['🔘', 'Buttons mein slots bheje', 'Telegram (inline keyboard)'], ['✅', 'Slot book', 'Calendar create event'], ['⏰', '1 ghanta pehle reminder', 'Wait + Telegram']] },
    ba: { before: [['Phone uthana, slots dekhna', 5], ['Diary mein likhna', 2], ['Reminder call', 3]], after: [['Bot 24×7 booking + reminder', 0]], note: 'Har appointment par 10 min, aur no-shows kam.' },
    concept: {
      e: 'Google Workspace (Sheets, Gmail, Drive, Calendar) aur messaging apps (Telegram, WhatsApp, Slack) — yahi Indian businesses ke daily tools hain. In sab ke n8n nodes ready hain; bas credential connect karo aur operation chuno.',
      x: ['Sheets = digital register', 'Gmail labels = almirah ke folders', 'Telegram bot = 24×7 receptionist'],
      k: '"Socho tumhare paas ek robot hai jo tumhari diary (Calendar), register (Sheet), aur phone (Telegram) sab sambhaal leta hai."',
      q: ['Row hai to update, nahi to add — operation ka naam?', 'Telegram bot token kahan se milta hai?', 'WhatsApp par 24 ghante baad message kaise?'],
    },
    topics: [
      ['Attendance register: naam dhoondho (lookup), hai to tick, nahi to naya naam (upsert).', 'Sheets → "Append or Update Row", match column = phone.'],
      ['Personal assistant jo inbox padhe, label lagaye, jawab de.', 'Gmail Trigger (has:attachment) → label "Invoices" → reply.'],
      ['Office almirah mein month-wise files.', 'Drive: folder "Invoices/2026-12" create → file upload.'],
      ['Doctor ki appointment diary.', 'Calendar: Get availability → Create event (start, end, attendee).'],
      ['Apna chhota employee jo chat par jawab de.', '@BotFather → token → Telegram Trigger + Telegram Send.'],
      ['Office group (Slack) aur customer ka official WhatsApp.', 'Slack #sales message · WhatsApp template "order_confirmed".'],
    ],
  },
  10: {
    story: { t: 'Library aur smart librarian', s: [['📚', 'Library = database', 'Postgres / Supabase'], ['🗂️', 'Almirah = table', 'leads table'], ['📖', 'Kitaab = row', 'Ek lead record'], ['🙋', 'Librarian se sawaal', 'SQL SELECT'], ['🔁', 'Kitaab hai to update, nahi to nayi', 'Upsert']] },
    ba: { before: [['10,000 rows ki slow Sheet', 10], ['Duplicate dhoondhna', 20]], after: [['DB mein fast search + auto dedupe', 0]], note: 'Search seconds mein, duplicates automatic band.' },
    concept: {
      e: 'Jab data bada ho jaata hai (hazaaron rows), Sheets slow aur risky ho jaati hain. Database (Postgres/Supabase) fast, safe aur multi-user hai. Airtable/Notion beech ka raasta hain — non-tech client ke liye easy UI.',
      x: ['Sheets = notebook, Database = bank ka ledger system', 'Airtable = sundar register jismein filters', 'Upsert = attendance: naam hai to tick, nahi to add'],
      k: '"Notebook mein 10 naam dhoondhna easy, 10,000 mein mushkil. Database ek super-fast librarian hai."',
      q: ['Data padhne ka SQL command?', 'SQL injection se kaise bachein?', 'Non-tech client ke liye kaunsa DB?'],
    },
    topics: [
      ['Librarian se: "Delhi wale saare students do" (SELECT), "naya student jodo" (INSERT).', "SELECT name, phone FROM leads WHERE city = 'Delhi';"],
      ['Bank ka main computer system.', 'Postgres node → Execute Query / Insert / Upsert; Supabase node → rows CRUD.'],
      ['Sundar register (Airtable), digital diary (Notion).', 'Airtable → Create record; Notion → Database page create.'],
      ['Contact list mein same number do baar save na ho.', 'ON CONFLICT (email) DO UPDATE … / Remove Duplicates node.'],
      ['Ghar mein chhota locker — bahar jaane ki zarurat nahi.', 'n8n Data Tables: chhote projects ka built-in storage.'],
      ['Chhote kaam ke liye cycle, bade ke liye truck.', '< 5k rows + non-tech → Airtable; app backend / scale → Postgres/Supabase.'],
    ],
  },
  11: {
    story: { t: 'Garam samose ki dukaan — speed sab kuch', s: [['📣', 'Ad dekh ke customer aaya', 'Facebook Lead Ads Trigger'], ['🧽', 'Naam-number saaf kiya', 'Edit Fields'], ['🔍', 'Customer ki jaankari', 'Enrichment (HTTP)'], ['📇', 'Register mein entry', 'HubSpot CRM'], ['💬', 'Turant "Namaste!" WhatsApp', 'WhatsApp Cloud'], ['📆', '1 aur 3 din baad yaad dilaya', 'Wait + follow-ups']] },
    ba: { before: [['Leads Excel download', 10], ['Har lead ko call/WhatsApp', 60], ['Follow-up bhool jaana', 0]], after: [['60 second mein WhatsApp + CRM', 0], ['Drip auto', 0]], note: 'Roz 70 min bache, conversion badha kyunki reply turant.' },
    concept: {
      e: 'Sales funnel = Lead aaya → saaf kiya → jaankari badhayi → score diya → CRM mein → turant contact → follow-ups. Jo business pehle reply karta hai, wahi jeet-ta hai. Automation yeh speed deta hai.',
      x: ['Gym enquiry par 1 min mein WhatsApp vs agle din call', 'Real estate lead ko site-visit link turant', 'Coaching enquiry → demo class booking link'],
      k: '"Do dukaan: ek turant chai deti hai, doosri 1 ghanta baad. Customer kahan jaayega? Automation tumhe pehli dukaan banata hai."',
      q: ['Speed-to-lead kyun important hai?', 'Duplicate contacts kaise rokein?', 'Follow-up delay ke liye node?'],
    },
    topics: [
      ['Dukaan mein customer 4 darwazon se aate hain — ad, website, WhatsApp, referral.', 'Facebook Lead Ads Trigger, Webhook, n8n Form, WhatsApp Trigger.'],
      ['Visiting card ke peeche notes: company, designation.', 'HTTP → enrichment/verify API → company_size, email_valid.'],
      ['Customer ki file ek almirah (CRM) mein.', 'HubSpot: Create or update contact (email) + deal stage "New".'],
      ['Exam marks se rank; kaam 3 salesmen mein barabar.', 'Score = budget + urgency; round-robin: index % 3.'],
      ['Dheere-dheere paani dena (drip irrigation).', 'Day 0 WhatsApp → Wait 1d → email → Wait 2d → WhatsApp.'],
      ['Dukaan ka scoreboard: aaj kitne customer, kitne jaldi attend.', 'Sheet mein lead_time aur reply_time → daily average report.'],
    ],
  },
  12: {
    story: { t: 'Ek dal se paanch dishes', s: [['📰', 'Naya blog post aaya', 'RSS Feed Trigger'], ['🍲', 'Dal = original content', 'HTTP (full article)'], ['👩‍🍳', 'Chef ne 5 dishes banayi', 'AI: LinkedIn, X, newsletter…'], ['👀', 'Maalik ne taste kiya', 'Slack approval'], ['🍽️', 'Serve kiya', 'Publish + schedule']] },
    ba: { before: [['Blog padh ke har platform ka post likhna', 90], ['Har jagah post karna', 20]], after: [['AI drafts + 1-click approve', 5]], note: 'Har post par ~1.5 ghante bache.' },
    concept: {
      e: 'Content ops = content banana, alag formats mein badalna, approve karna, publish karna aur performance track karna — ek pipeline mein. AI drafts banata hai, insaan approve karta hai.',
      x: ['YouTube video → reel script + blog + tweet', 'Product launch → email + WhatsApp + Instagram', 'Weekly newsletter auto from best posts'],
      k: '"Ek kahani ko tum dost ko short mein, dadi ko detail mein, aur teacher ko formally sunaate ho — yahi repurposing hai."',
      q: ['Publish se pehle human check kyun?', 'Naya blog detect karne ka trigger?', 'Campaign track kaise karein?'],
    },
    topics: [
      ['Ek kahani — dost ko short, dadi ko detail mein.', 'RSS → AI (JSON: linkedin, thread, newsletter) → har platform.'],
      ['Ek letter kai logon ko post karna.', 'LinkedIn node, X node, Facebook Graph API — schedule time ke saath.'],
      ['Favourite channel ki bell icon.', 'YouTube RSS feed → naya video → caption draft.'],
      ['Society ka notice board — sabko ek saath message.', 'Mailchimp/Brevo: add subscriber + tag, campaign send.'],
      ['Customer se poochna "humare baare mein kahan se suna?"', 'Link?utm_source=linkedin&utm_campaign=dec_launch → Sheet report.'],
      ['Padosi dukaan ke offers par nazar.', 'Competitor RSS/website HTML → naya offer → Telegram alert.'],
    ],
  },
};
