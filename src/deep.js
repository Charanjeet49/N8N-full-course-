// ============================================================
//  DEEP CONTENT — Phase A (Module 1: Day 1–3)
//  concepts: har concept ka 6-hisson wala deep dive
//  nodes:    node anatomy (har important setting)
//  trace:    data ka safar — har node ke baad JSON (Today's Build par based)
//  lab:      expression lab [task, input, expression, result]
// ============================================================

const DEEP = {
  // ---------------------------------------------------------- DAY 1
  1: {
    concepts: [
      {
        t: 'Workflow',
        kya: 'Workflow ek recipe hai jo n8n ke andar save rehti hai. Usme boxes hote hain jinhe "nodes" kehte hain, aur unke beech lines ("connections") hoti hain. Har node ek chhota kaam karta hai — data laana, data badalna ya kahin bhejna. Saare nodes milkar ek poora kaam karte hain, jaise "har subah quote email karna".',
        andar: 'Jab workflow chalta hai, n8n sabse pehle trigger node chalata hai. Trigger jo data deta hai, woh connection ke through agle node mein jaata hai. Har node apna kaam karke naya data aage bhejta hai. Data hamesha left se right flow karta hai — ek node ka output = agle node ka input.',
        kab: 'Jab koi kaam baar-baar, ek hi tareeke se hota hai: roz ki report, har naya lead, har form submit, har naya email.',
        kabNahi: 'Jo kaam sirf ek baar karna hai, ya jisme har baar insaan ka faisla chahiye (jaise "yeh design achha lag raha hai ya nahi"), usko automate karne mein time waste hoga.',
        ex: 'Daily Quote Mailer = 4 nodes ki chain: Schedule Trigger (8 baje) → HTTP Request (quote laao) → Edit Fields (quote + author alag karo) → Gmail (email bhejo).',
        galti: 'Naye log ek hi workflow mein 30–40 nodes daal dete hain. Fir error dhoondhna mushkil ho jaata hai. Fix: ek workflow = ek kaam. Bada kaam ho to chhote workflows banao aur unhe jodo (Day 18 mein seekhenge).',
        yaad: 'Workflow = trigger + steps + result. Data left se right chalta hai.',
      },
      {
        t: 'Trigger vs Action',
        kya: 'Trigger node batata hai workflow KAB chalega. Action node batata hai KYA karna hai. Har workflow mein kam se kam ek trigger hona zaroori hai, warna woh apne aap kabhi nahi chalega.',
        andar: 'Trigger nodes canvas par sabse left mein hote hain aur unke paas ⚡ icon hota hai. Workflow "Active" hone par n8n trigger ko sunta rehta hai — time ka (Schedule), URL ka (Webhook/Form) ya kisi app ka (naya Gmail, naya Sheet row). Trigger fire hote hi ek naya "execution" shuru hota hai aur baaki action nodes ek-ek karke chalte hain.',
        kab: 'Time par chalana hai → Schedule Trigger. Koi form bhare → Form Trigger. Koi app data bheje → Webhook. Khud test karna hai → Manual Trigger ("Execute workflow" button).',
        kabNahi: 'Ek workflow mein bina wajah 2–3 alag triggers mat lagao. Har trigger alag execution banata hai aur data mix ho sakta hai.',
        ex: 'Schedule Trigger "roz 8 baje" fire hota hai → HTTP Request, Edit Fields aur Gmail actions chalte hain.',
        galti: 'Workflow banaya, test bhi ho gaya, par "Active" toggle on karna bhool gaye — fir subah 8 baje kuch nahi hua. Trigger sirf Active workflow mein apne aap chalta hai.',
        yaad: 'Trigger = KAB (alarm). Action = KYA (kaam). Active toggle ON karna mat bhoolna.',
      },
      {
        t: 'Execution',
        kya: 'Workflow ka ek run = ek execution. Workflow roz 8 baje chalta hai to mahine mein 30 executions banenge. n8n har execution ka record rakhta hai — kab chala, kitna time laga, success hua ya error aaya.',
        andar: 'Har execution mein n8n har node ka input aur output save karta hai. "Executions" tab (left menu ya workflow ke upar) mein kisi bhi purane run ko kholo to poora workflow us waqt ke data ke saath dikhta hai — har node par click karke dekh sakte ho ki kya data aaya tha.',
        kab: 'Kuch galat hua ho, client complain kare, ya check karna ho ki subah wala run chala ya nahi — sabse pehle Executions tab kholo.',
        kabNahi: 'Har test run ko production samajh kar mat ghabrao. Test executions alag dikhte hain aur unse kuch kharab nahi hota (bas email/message sach mein jaata hai, dhyan rakho).',
        ex: 'Kal subah email nahi aaya → Executions kholo → laal (error) execution dikha → Gmail node par click → "Credential expired" likha tha → reconnect kiya → fixed.',
        galti: 'Error aane par workflow dobara-dobara chalana, bina Executions mein asli error message padhe. Pehle error padho — 80% baar wahi jawab bata deta hai.',
        yaad: 'Execution = ek run ki poori history. Error aaye to pehle Executions tab.',
      },
      {
        t: 'Cloud vs Self-hosted',
        kya: 'n8n do tareeke se chala sakte ho. n8n Cloud: n8n company ka server, login karo aur shuru — monthly fee lagti hai. Self-hosted: n8n ko apne computer ya VPS server par install karo — software free (Community Edition), bas server ka kharcha.',
        andar: 'Dono mein editor, nodes aur workflows same hain. Farak sirf yeh hai ki server kaun sambhalta hai: Cloud mein updates, backup aur uptime n8n sambhalta hai; self-hosted mein yeh sab aapki zimmedari hai (Day 19 mein Docker se seekhenge).',
        kab: 'Seekhne aur pehle clients ke liye Cloud (ya local install) aasaan hai. Bahut zyada executions, data apne server par rakhna ho, ya kharcha kam karna ho to self-hosted.',
        kabNahi: 'Pehle hi din VPS aur Docker mein mat uljho. Pehle workflows banana seekho, server baad mein.',
        ex: 'Class ke liye: n8n Cloud free trial ya laptop par "npx n8n". Client ke production ke liye: ₹500–800/month ka VPS + Docker.',
        galti: 'Local laptop par bana workflow client ko de diya — laptop band, workflow band. Production hamesha 24×7 chalne wale server (Cloud ya VPS) par.',
        yaad: 'Cloud = rent ka ghar (aasaan). Self-hosted = apna ghar (control + zimmedari).',
      },
    ],
    nodes: [
      { n: 'Schedule Trigger', why: 'Workflow ko tay time par apne aap chalata hai.', s: [
        ['Trigger Interval', 'Kitne gap par chalna hai: Seconds, Minutes, Hours, Days, Weeks, Months ya Custom (Cron)', 'Days', 'Roz ke kaam ke liye Days; har 15 min check ke liye Minutes'],
        ['Days Between Triggers', 'Kitne din chhod kar chalega', '1', '2 likho to ek din chhod kar chalega'],
        ['Trigger at Hour', 'Din ka kaunsa ghanta (24-hour)', '8am', 'Shaam 6 baje ke liye 6pm'],
        ['Trigger at Minute', 'Us ghante ka kaunsa minute', '0', '8:30 ke liye 30'],
        ['Timezone (workflow Settings)', 'Time kis desh ke hisaab se gina jaaye', 'Asia/Kolkata', 'Cloud par default timezone alag ho sakta hai — hamesha check karo'],
      ] },
      { n: 'HTTP Request', why: 'Kisi bhi website/API se data laata ya bhejta hai. "Har app se baat karne wala node".', s: [
        ['Method', 'Kya karna hai: GET (data lo), POST (data bhejo), PUT/PATCH (update), DELETE', 'GET', 'Form data bhejna ho to POST'],
        ['URL', 'API ka address', 'https://zenquotes.io/api/random', 'API ke docs se copy karo'],
        ['Authentication', 'API key / login kaise dena hai', 'None', 'Paid APIs mein "Generic Credential → Header Auth"'],
        ['Send Query Parameters', 'URL ke ? ke baad wale filters', 'Off', 'Jaise ?city=Delhi&limit=10'],
        ['Send Headers', 'Extra info jaise API key ya content type', 'Off', 'Authorization: Bearer xxx'],
        ['Send Body', 'POST mein bhejne wala data (JSON/Form)', 'Off', 'Lead create karte waqt name/phone'],
        ['Options → Response Format', 'Jawab ko kaise padhna hai: Autodetect, JSON, Text, File', 'Autodetect', 'CSV/PDF download ke liye File'],
        ['Options → Timeout', 'Kitni der jawab ka intezaar', 'default', 'Slow API ke liye 30000 ms'],
      ] },
      { n: 'Edit Fields (Set)', why: 'Data ko saaf karta hai: naye fields banana, naam badalna, sirf kaam ke fields rakhna.', s: [
        ['Mode', 'Manual Mapping (form jaisa) ya JSON (khud likho)', 'Manual Mapping', 'Bahut saare fields hon to JSON'],
        ['Fields to Set → Name', 'Naye field ka naam', 'quote', 'Chhota, saaf naam rakho (space ki jagah _)'],
        ['Fields to Set → Type', 'String, Number, Boolean, Array, Object', 'String', 'Amount ke liye Number, warna jodna galat hoga'],
        ['Fields to Set → Value', 'Fixed value ya expression {{ }}', '{{ $json.q }}', 'Pichhle node ke field ko drag karke daal sakte ho'],
        ['Include Other Input Fields', 'Purane fields bhi saath rakhne hain ya sirf naye', 'Off', 'Sab data aage chahiye to On'],
      ] },
      { n: 'Gmail (Send)', why: 'Aapke Gmail account se email bhejta hai.', s: [
        ['Credential', 'Kaunse Gmail account se bhejna hai', 'Gmail account (OAuth)', 'Ek baar connect karo, har workflow mein reuse'],
        ['Resource / Operation', 'Message → Send', 'Message, Send', 'Reply ke liye Operation: Reply'],
        ['To', 'Kisko bhejna hai (comma se kai log)', 'your-email@gmail.com', '{{ $json.email }} se har lead ko alag'],
        ['Subject', 'Email ka subject — expressions bhi chalte hain', '☀️ Aaj ka quote — {{ $now.format("dd LLL yyyy") }}', 'Date daalne se har email unique lagta hai'],
        ['Email Type', 'Text (simple) ya HTML (design wala)', 'Text', 'Table/colors ke liye HTML'],
        ['Message', 'Email ki body', '"{{ $json.quote }}" — {{ $json.author }}', 'Line break ke liye Enter dabao'],
        ['Options → Append n8n Attribution', 'Neeche "sent by n8n" line', 'On (default)', 'Client ke liye Off kar do'],
      ] },
    ],
    trace: [
      ['Every Day 8 AM', 'Schedule Trigger time ki details deta hai. Aage ke nodes is data ko use nahi karte — yeh sirf "chalo" ka signal hai.', { timestamp: '2026-12-01T08:00:00.000+05:30', 'Readable date': 'December 1st 2026, 8:00:00 am', 'Day of week': 'Tuesday', Hour: '08', Timezone: 'Asia/Kolkata (UTC+05:30)' }],
      ['Get Random Quote', 'API ne array [ {...} ] bheja. n8n array ko khol kar har cheez ko alag ITEM bana deta hai — isliye aage $json.q likhte hain, $json[0].q nahi.', { q: 'The best way to get started is to quit talking and begin doing.', a: 'Walt Disney', h: '<blockquote>…</blockquote>' }],
      ['Pick Quote + Author', 'Sirf kaam ke 2 fields bache, saaf naamon ke saath. "h" (HTML) field hat gaya kyunki Include Other Fields off hai.', { quote: 'The best way to get started is to quit talking and begin doing.', author: 'Walt Disney' }],
      ['Send Quote Email', 'Gmail ne email bhej diya aur uski ID wapas di. labelIds mein SENT = email chala gaya.', { id: '18c4f2a9b7e1d3c0', threadId: '18c4f2a9b7e1d3c0', labelIds: ['SENT'] }],
    ],
    lab: [
      ['Quote ka text nikaalo', { q: 'Dream big.', a: 'Anon' }, '{{ $json.q }}', 'Dream big.'],
      ['Author ka naam CAPITAL mein', { q: 'Dream big.', a: 'Anon' }, '{{ $json.a.toUpperCase() }}', 'ANON'],
      ['Quote aur author ek line mein jodo', { q: 'Dream big.', a: 'Anon' }, '"{{ $json.q }}" — {{ $json.a }}', '"Dream big." — Anon'],
      ['Aaj ki date "01 Dec 2026" format mein', {}, '{{ $now.format("dd LLL yyyy") }}', '01 Dec 2026'],
      ['Quote kitne characters ka hai?', { q: 'Dream big.', a: 'Anon' }, '{{ $json.q.length }}', '10'],
    ],
  },

  // ---------------------------------------------------------- DAY 2
  2: {
    concepts: [
      {
        t: 'Polling vs Push',
        kya: 'Kisi app mein naya data aaya, yeh n8n ko do tareeke se pata chalta hai. Polling: n8n khud har kuch minute mein jaakar poochta hai "kuch naya aaya?". Push: app khud n8n ko turant message bhejta hai (webhook).',
        andar: 'Polling triggers (jaise Gmail Trigger, Google Sheets Trigger) ke andar ek "Poll Times" setting hoti hai — har minute/ghante check. Har check ek chhota request hai, chahe kuch naya na ho. Push mein n8n ek URL deta hai (webhook/form URL); app event hote hi us URL par data POST karta hai aur workflow usi second chal jaata hai.',
        kab: 'Push (Webhook/Form) jab turant reaction chahiye — naya lead, payment, order. Polling jab app webhook support nahi karta, ya 5–15 minute ki deri chal jaati hai.',
        kabNahi: 'Polling ko "har minute" par bina zaroorat mat lagao — n8n Cloud par executions/limits jaldi khatam hote hain aur API rate limit bhi lag sakti hai.',
        ex: 'Aaj ka Lead Form = push: form submit hote hi workflow chalta hai. Gmail Trigger (Day 9) = polling: har minute inbox check karta hai.',
        galti: 'Test URL aur Production URL mix karna. Test URL sirf "Listen for test event" ke 2 minute tak chalta hai; website/app mein hamesha Production URL lagao aur workflow Active karo.',
        yaad: 'Polling = baar-baar darwaza kholna. Push = doorbell. Turant chahiye to push.',
      },
      {
        t: 'Cron expression',
        kya: 'Cron ek chhoti si line hai jo time-table batati hai. Isme 5 hisse hote hain: minute, hour, din (date), mahina, hafte ka din. Jaise "0 9 * * 1-5" = Monday se Friday subah 9:00.',
        andar: 'Schedule Trigger mein "Custom (Cron)" chuno to yeh line likhni padti hai. * ka matlab "har", 1-5 ka matlab range, */15 ka matlab "har 15", aur 1,15 ka matlab list. n8n workflow ke timezone ke hisaab se cron padhta hai.',
        kab: 'Jab simple options (Days/Hours) se kaam na chale: sirf weekdays, mahine ki 1 tareekh, har 15 minute office hours mein, waghera.',
        kabNahi: 'Simple "roz 8 baje" ke liye cron likhne ki zaroorat nahi — normal Days option zyada saaf hai aur galti kam hoti hai.',
        ex: '"*/15 9-18 * * 1-6" = Mon–Sat, 9 se 6 baje tak, har 15 minute. "0 10 1 * *" = har mahine ki 1 tareekh, subah 10 baje (invoice reminder).',
        galti: 'Order ulta likh dena (hour pehle, minute baad). Yaad rakho: Minute Hour Date Month Weekday. Shaq ho to crontab.guru par check karo.',
        yaad: 'M H D M W — "Mera Har Din Mast Wala".',
      },
      {
        t: 'Credentials',
        kya: 'Credential = kisi app ka login/permission jo n8n mein ek baar safe save hota hai. Gmail, Google Sheets, Telegram, OpenAI — sabke liye credential chahiye.',
        andar: 'n8n credentials ko encrypt (lock) karke database mein rakhta hai. Workflow JSON mein password kabhi nahi jaata, sirf credential ka naam/ID jaata hai. Isliye jab aap workflow export ya share karte ho, doosre ko apna credential khud connect karna padta hai.',
        kab: 'Jab bhi koi node aapke account ka data padhe ya likhe. Google ke liye "Sign in with Google" (OAuth), Telegram ke liye bot token, OpenAI ke liye API key.',
        kabNahi: 'API key ko kabhi bhi node ke text field ya Code node mein seedha paste mat karo — workflow share karte hi key leak ho jaayegi.',
        ex: 'Aaj do credentials: Google Sheets (OAuth) aur Telegram (BotFather se mila token). Dono ek baar bane, ab har workflow mein dropdown se chun lo.',
        galti: 'Workflow import kiya, node par laal ⚠️ triangle aaya aur log ghabra gaye. Matlab sirf itna: credential select nahi hua. Node kholo → Credential → apna account chuno.',
        yaad: 'Credential = app ki chaabi. Ek baar banao, har jagah use karo, kabhi share mat karo.',
      },
      {
        t: 'Pinned data',
        kya: 'Pin karna = kisi node ka output "freeze" kar dena. Uske baad test karte waqt woh node dobara nahi chalta, n8n wahi purana data use karta hai.',
        andar: 'Node ke output panel mein 📌 (Pin) button dabate hi data workflow ke saath save ho jaata hai. Manual test run mein pinned node skip hota hai aur saved data aage jaata hai. Production (Active) runs pinned data ko ignore karte hain — wahan hamesha asli data aata hai.',
        kab: 'Form ya webhook ko baar-baar bharna na pade; paid API (OpenAI) par har test mein paise na lagein; slow API ka intezaar na karna pade.',
        kabNahi: 'Pin karke bhool jaana. Naye fields aane wale hon to purana pinned data galat result dega — kaam khatam hone par Unpin karo.',
        ex: 'Form ek baar bharo → Form Trigger ka output pin karo → ab Sheets aur Telegram nodes ko 10 baar test karo bina form dobara bhare.',
        galti: '"Mera data update kyun nahi ho raha?" — kyunki node pinned hai (output panel par purple pin dikhega). Unpin karo aur dobara chalao.',
        yaad: 'Pin = rough copy. Testing ke liye best, kaam ke baad hata do.',
      },
    ],
    nodes: [
      { n: 'n8n Form Trigger', why: 'n8n khud ek web form bana deta hai. Form submit = workflow start.', s: [
        ['Authentication', 'Form par password lagana hai ya nahi', 'None', 'Internal team form ke liye Basic Auth'],
        ['Form Title / Description', 'Form ke upar dikhne wala heading aur text', 'Free Demo Class Registration', 'Seedha fayda batao: "2 min mein bharo"'],
        ['Form Elements → Field Label', 'Sawal ka naam — yahi output mein field ka naam banta hai', 'Name, Email, Phone, Interest', 'Label wahi rakho jo Sheet ke column ka naam hai'],
        ['Form Elements → Element Type', 'Text, Email, Number, Dropdown, Date, File, Textarea…', 'Email (Email field ke liye)', 'Email type galat email ko rokta hai'],
        ['Form Elements → Required', 'Bina bhare submit na ho', 'On (Name, Email, Phone)', 'Zaroori fields hi required rakho'],
        ['Respond When', 'User ko jawab kab mile', 'Form Is Submitted', '"Workflow Finishes" jab result dikhana ho'],
        ['Test URL vs Production URL', 'Test = sirf testing ke waqt; Production = Active workflow par hamesha', 'Production URL website par', 'Form ka link WhatsApp/Instagram bio mein daal sakte ho'],
      ] },
      { n: 'Edit Fields — Include Other Fields', why: 'Aaj Edit Fields ka naya setting: purane form fields + naye fields dono aage bhejo.', s: [
        ['submitted_at', 'Abhi ka time saaf format mein', '{{ $now.toFormat("yyyy-MM-dd HH:mm") }}', 'Sheet mein sort karna aasaan'],
        ['source', 'Lead kahan se aaya', 'n8n form', 'Instagram/Website alag-alag likho'],
        ['Include Other Input Fields', 'Name, Email, Phone bhi saath jaayein', 'On', 'Off hota to sirf 2 naye fields bachte'],
      ] },
      { n: 'Google Sheets (Append Row)', why: 'Sheet ke end mein nayi row jodta hai — sabse common "database".', s: [
        ['Credential', 'Google account (OAuth)', 'Google Sheets account', 'Wahi account jisme Sheet hai'],
        ['Resource / Operation', 'Sheet Within Document → Append Row', 'Append Row', 'Duplicate rokne ke liye "Append or Update Row"'],
        ['Document', 'Kaunsi Google Sheet (By ID / URL / list se)', 'PASTE_YOUR_GOOGLE_SHEET_ID', 'ID = URL mein /d/ ke baad wala hissa'],
        ['Sheet', 'Kaunsa tab', 'Leads', 'Naam bilkul same (capital/small bhi)'],
        ['Mapping Column Mode', 'Map Automatically: field naam = column naam; ya Map Each Column Manually', 'Map Automatically', 'Naam alag hon to Manually'],
        ['Header row', 'Sheet ki pehli row mein column naam hone chahiye', 'Name | Email | Phone | Interest | submitted_at | source', 'Pehle headers banao, fir workflow chalao'],
      ] },
      { n: 'Telegram (Send Message)', why: 'Aapke Telegram bot se kisi chat/group mein message bhejta hai.', s: [
        ['Credential', 'BotFather se mila bot token', 'Telegram bot', '@BotFather → /newbot'],
        ['Chat ID', 'Message kis chat mein jaaye', 'YOUR_TELEGRAM_CHAT_ID', 'Apna ID @userinfobot se pata karo; pehle bot ko /start bhejo'],
        ['Text', 'Message — expressions ke saath', '🔔 Naya lead! 👤 {{ $json.Name }}', 'Emoji se message jaldi padha jaata hai'],
        ['Additional Fields → Parse Mode', 'HTML/Markdown formatting', 'none', '<b>bold</b> ke liye HTML'],
      ] },
    ],
    trace: [
      ['Lead Form', 'Form bharte hi har Field Label ek JSON key ban gaya. n8n khud submittedAt aur formMode jodta hai.', { Name: 'Ravi Kumar', Email: 'ravi@gmail.com', Phone: '9876543210', Interest: 'Freelancing', submittedAt: '2026-12-01T19:42:10.123+05:30', formMode: 'production' }],
      ['Add Time + Source', 'Include Other Fields ON hai, isliye purane fields bache aur 2 naye judd gaye.', { Name: 'Ravi Kumar', Email: 'ravi@gmail.com', Phone: '9876543210', Interest: 'Freelancing', submittedAt: '2026-12-01T19:42:10.123+05:30', formMode: 'production', submitted_at: '2026-12-01 19:42', source: 'n8n form' }],
      ['Save to Sheet', 'Sheet mein jo row judi, wahi data wapas aata hai. Jis field ka column Sheet mein nahi tha (jaise formMode), woh Sheet mein nahi gaya.', { Name: 'Ravi Kumar', Email: 'ravi@gmail.com', Phone: '9876543210', Interest: 'Freelancing', submitted_at: '2026-12-01 19:42', source: 'n8n form' }],
      ['Alert Owner', 'Telegram ne message bhejne ki confirmation di. ok: true = message pahunch gaya.', { ok: true, result: { message_id: 512, chat: { id: 123456789, type: 'private' }, date: 1764598330, text: '🔔 Naya lead!\n👤 Ravi Kumar\n📞 9876543210' } }],
    ],
    lab: [
      ['Lead ka pehla naam (first name) nikaalo', { Name: 'Ravi Kumar' }, '{{ $json.Name.split(" ")[0] }}', 'Ravi'],
      ['Phone ke aage +91 lagao', { Phone: '9876543210' }, '+91{{ $json.Phone }}', '+919876543210'],
      ['Abhi ka time "2026-12-01 19:42" format mein', {}, '{{ $now.toFormat("yyyy-MM-dd HH:mm") }}', '2026-12-01 19:42'],
      ['Email ko small letters mein (duplicate rokne ke liye)', { Email: 'Ravi@Gmail.com' }, '{{ $json.Email.toLowerCase() }}', 'ravi@gmail.com'],
      ['Interest "Freelancing" hai? true/false', { Interest: 'Freelancing' }, '{{ $json.Interest === "Freelancing" }}', 'true'],
    ],
  },

  // ---------------------------------------------------------- DAY 3
  3: {
    concepts: [
      {
        t: 'JSON',
        kya: 'JSON data likhne ka ek format hai jo har app samajhta hai. Isme "key": value ke jode hote hain. { } ke andar ek cheez (object) hoti hai, [ ] ke andar list (array).',
        andar: 'n8n mein har node ka data JSON hi hota hai. Output panel mein teen view milte hain: Table, JSON aur Schema. Kisi field tak pahunchne ke liye expression mein raasta likhte hain: $json.city, nested ho to $json.customer.name, list ho to $json.items[0].',
        kab: 'Har jagah — API se data aata hai JSON mein, Sheets ki row JSON banti hai, form ka jawab JSON hai. JSON padhna aana = n8n ka 50% samajh aana.',
        kabNahi: 'JSON khud haath se likhte waqt last comma ya quote bhoolna sabse common galti hai — JSON mein comments (//) bhi allowed nahi hote.',
        ex: '{ "city": "Delhi", "amount": 1200, "paid": true, "tags": ["new", "upi"] } — city text hai, amount number, paid true/false, tags list.',
        galti: '"1200" (quotes mein = text) aur 1200 (number) ko same samajhna. Text ko jodoge to "1200" + "300" = "1200300" banega. Number() se convert karo.',
        yaad: '{ } = ek cheez, [ ] = list, "key": value. Quotes wala number = text.',
      },
      {
        t: 'Items',
        kya: 'n8n mein data hamesha ITEMS ki list mein chalta hai. Ek item = ek JSON object (jaise ek row, ek lead, ek email). Node ko 20 items mile to woh by default har item par alag-alag kaam karta hai.',
        andar: 'Output panel ke upar likha hota hai "20 items". Gmail node ko 20 items mile to 20 emails jaayenge — yeh n8n ka built-in loop hai, alag se Loop lagane ki zaroorat nahi. Code node mein $input.all() se saare items milte hain, aur $json se current item.',
        kab: 'Har us jagah jahan "har ek ke liye" kaam ho: har row ke liye email, har lead ke liye message, har file ke liye upload.',
        kabNahi: 'Jab aapko 20 alag messages nahi, 1 summary chahiye — tab items ko pehle Aggregate/Summarize/Code se ek item mein jodo, warna 20 emails chale jaayenge.',
        ex: 'CSV ki 20 rows → Read CSV ke baad 20 items. City-wise Total (Code) ne unhe 5 items (5 cities) banaya. HTML Table ne 5 ko 1 item banaya → 1 email.',
        galti: 'Report ek bhejni thi, par 20 emails chale gaye — kyunki last node se pehle items ek nahi kiye. Hamesha Gmail se pehle output panel mein "1 item" check karo.',
        yaad: 'Node har item par alag chalta hai. 1 result chahiye to pehle items jodo.',
      },
      {
        t: 'Split Out vs Aggregate',
        kya: 'Split Out: ek item ke andar ki list ko kholkar alag-alag items banata hai. Aggregate: kai items ko jodkar ek item (list) banata hai. Dono ek-doosre ke ulte hain.',
        andar: 'API aksar ek item mein { orders: [10 orders] } bhejti hai — Split Out "orders" field ko 10 items mein tod deta hai taaki har order par alag kaam ho. Summarize node group by + sum/count karta hai; Code node mein yahi kaam JavaScript se karte hain (jaisa aaj ke build mein).',
        kab: 'Split Out: list ke har element par kaam karna ho. Aggregate/Summarize: report, total, ek message mein sab kuch.',
        kabNahi: 'Har baar Code node mat likho — simple group/sum ke liye Summarize node kaafi hai aur galti kam hoti hai. Code tab jab logic zyada ho.',
        ex: 'Aaj: 20 sales rows → Code (group by city) → 5 items → Code (HTML table) → 1 item. Same kaam Summarize node se: Group by "city", Sum "amount", Count rows.',
        galti: 'Split Out mein galat field naam dena (jaise "Orders" jabki field "orders" hai) — output khaali aata hai. Field naam drag karke daalo.',
        yaad: 'Split Out = packet kholna (1 → many). Aggregate = packet bharna (many → 1).',
      },
      {
        t: 'Binary data',
        kya: 'Files (CSV, PDF, image, audio) ko n8n "binary data" kehta hai. Yeh JSON se alag, item ke saath ek attachment ki tarah chalti hain.',
        andar: 'Har item ke do hisse ho sakte hain: json (text data) aur binary (files). Output panel mein "Binary" tab dikhta hai jisme file ka naam, type aur size hota hai. Binary field ka ek naam hota hai (jaise "sales_csv" ya "data") — Extract from File, Gmail attachment, Drive upload sab isi naam se file uthate hain.',
        kab: 'File upload/download, PDF se text nikaalna, image AI ko bhejna, email attachment, Drive par save karna.',
        kabNahi: 'Badi files (100MB+) ko baar-baar workflow mein ghumaana memory khatam kar sakta hai. Zaroorat ho to pehle Drive/S3 par rakho aur link aage bhejo.',
        ex: 'Form par CSV upload → binary field "sales_csv" → Extract from File (Input Binary Field: sales_csv) → har row JSON item ban gayi.',
        galti: 'Extract from File mein binary field ka naam galat ("data" likha, jabki file "sales_csv" naam se aayi) → error "No binary data found". Pichhle node ke Binary tab mein asli naam dekho.',
        yaad: 'json = baat, binary = parcel. Parcel ka naam (binary field) sahi likho.',
      },
    ],
    nodes: [
      { n: 'n8n Form Trigger (File field)', node: 'Upload Sales CSV', why: 'Aaj form se file upload karwaayi.', s: [
        ['Element Type', 'File', 'File', 'Image/PDF/CSV sab chalti hain'],
        ['Field Label', 'Yahi binary field ka naam banta hai', 'sales_csv', 'Space mat rakho, _ use karo'],
        ['Accepted File Types', 'Sirf yeh extensions allowed', '.csv', 'PDF ke liye .pdf; kai ho to .jpg,.png'],
        ['Multiple Files', 'Ek se zyada file', 'Off', 'On karoge to sales_csv_0, sales_csv_1 banenge'],
      ] },
      { n: 'Extract from File', node: 'Read CSV', why: 'File ke andar ka data padhkar JSON items banata hai.', s: [
        ['Operation', 'File ka type: Extract From CSV, XLSX, PDF, JSON, HTML, Text…', 'Extract From CSV', 'Excel ke liye XLSX, invoice ke liye PDF'],
        ['Input Binary Field', 'Kaunsi file padhni hai (binary field ka naam)', 'sales_csv', 'Default "data" hota hai — badalna mat bhoolo'],
        ['Options → Header Row', 'Pehli row column naam hai?', 'On (default)', 'Headers na hon to Off'],
        ['Options → Delimiter', 'Columns kisse alag hain', ', (comma)', 'Kuch files mein ; hota hai'],
        ['Options → Max Rows', 'Kitni rows padhni hain', 'sab', 'Testing mein 10 rakh lo'],
      ] },
      { n: 'Code (JavaScript)', node: 'City-wise Total', why: 'Jab koi ready node kaam na kare, wahan apna logic likho.', s: [
        ['Mode', 'Run Once for All Items (saare items ek saath) ya Run Once for Each Item', 'Run Once for All Items', 'Total/group ke liye All Items'],
        ['Language', 'JavaScript ya Python', 'JavaScript', 'n8n ke examples zyada JS mein'],
        ['$input.all()', 'Saare input items ki list', 'for (const item of $input.all())', 'Har item ka data item.json mein'],
        ['return', 'Hamesha items ki list lautao: [{ json: {...} }]', 'return [{ json: { html, grand } }]', 'Galat format = "Code doesn\'t return items" error'],
      ] },
      { n: 'Gmail — HTML email', node: 'Email Report', why: 'Aaj Gmail ka naya use: design wali HTML table.', s: [
        ['Email Type', 'HTML', 'HTML', 'Table, bold, colors ke liye zaroori'],
        ['Message', 'HTML code expression se', '{{ $json.html }}', 'Pehle node mein HTML banao, yahan sirf daalo'],
        ['Subject', 'Total ke saath', '📊 Sales report — ₹{{ $json.grand }}', 'Subject mein main number = email jaldi khulta hai'],
      ] },
    ],
    trace: [
      ['Upload Sales CSV', 'Form se file aayi. JSON mein sirf submit ki info hai; asli file "Binary" tab mein sales_csv naam se hai.', { submittedAt: '2026-12-02T20:05:00+05:30', formMode: 'test', '[binary] sales_csv': { fileName: 'sample-sales.csv', mimeType: 'text/csv', fileSize: '1.1 kB' } }],
      ['Read CSV', 'File ki har row ek alag ITEM ban gayi (20 items). Dhyan do: amount abhi text ("698") hai.', { order_id: 'ORD-1001', date: '2026-11-02', city: 'Bengaluru', product: 'Mug', amount: '698', '…': '(+19 aur items)' }],
      ['City-wise Total', 'Code ne 20 items ko city ke hisaab se joda → 5 items (5 cities). Number() se amount ko number banaya, isliye sahi total aaya.', { city: 'Bengaluru', orders: 4, sales: 7092, '…': '(+4 aur cities)' }],
      ['Build HTML Table', '5 items ek item mein jud gaye: html (table) + grand (kul total). Ab sirf 1 email jaayega.', { html: '<h2>City-wise Sales Report</h2><table>…</table>', grand: 29109 }],
      ['Email Report', 'Ek HTML email chala gaya.', { id: '18c5a1f0c2b9e7d4', threadId: '18c5a1f0c2b9e7d4', labelIds: ['SENT'] }],
    ],
    lab: [
      ['Kitne items aaye? (Code/expression)', { note: '20 rows' }, '{{ $input.all().length }}', '20'],
      ['Text amount ko number banao', { amount: '1200' }, '{{ Number($json.amount) }}', '1200'],
      ['Nested field: customer ka naam', { customer: { name: 'Asha', city: 'Pune' } }, '{{ $json.customer.name }}', 'Asha'],
      ['List ka pehla tag', { tags: ['new', 'upi'] }, '{{ $json.tags[0] }}', 'new'],
      ['Amount ko ₹ format mein (Indian commas)', { amount: 125000 }, '₹{{ $json.amount.toLocaleString("en-IN") }}', '₹1,25,000'],
    ],
  },
};

Object.assign(DEEP, require("./deep2"), require("./deep3"));

module.exports = { DEEP };
