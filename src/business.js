// ============================================================
//  BUSINESS TRACK — industry-wise AI automation blueprints (1/2)
//  Har industry: story mission, pain map, agents, schema, 3 projects,
//  ROI defaults, "sell karo", aur Level 1 workflow ka form.
//  Note: business naam fictional hain; pricing indicative hai.
// ============================================================
//  pains:    [kaam, manual ghante/mahina, n8n ke baad ghante/mahina]
//  agents:   [naam, kya karta hai, n8n nodes, course days[], agent deck type]
//  schema:   { sheet, cols: [[column, kyun]], sample: [values...], more: [[sheet, columns, kaam]] }
//  projects: [title, kya banega, time, course days[]]   (Easy, Medium, Pro)
//  roi:      { unit, perMonth, minsSaved, costPerHour }
//  sell:     { setup, monthly, pitch, demo: [steps], objections: [[sawaal, jawab]] }
//  form:     Level 1 workflow ke form fields: [label, type?, options?]
// ============================================================

module.exports = [
  {
    slug: 'travel', i: '✈️', name: 'Travel & Tours', color: '#0ea5e9',
    tagline: 'WhatsApp enquiry se itinerary aur quote tak — 5 minute mein',
    story: {
      biz: 'Sharma Holidays, Jaipur',
      text: 'Sharma ji ki travel company ko har mahine 400+ enquiries aati hain: WhatsApp, Instagram aur website se. 2 log poora din "kitne log, kab, budget kya hai" poochte rehte hain. Itinerary Word mein banti hai, quote Excel mein. Jawab dene mein 1 din lag jaata hai — tab tak customer doosri agency se book kar leta hai.',
      mission: 'Ek AI system banao jo har enquiry ko 2 minute mein reply kare, details nikaale, itinerary + quote draft kare aur trip se pehle reminders bheje.',
    },
    pains: [
      ['Enquiry ka pehla reply + details poochna', 60, 5],
      ['Itinerary banana (day-wise plan)', 50, 8],
      ['Quote / price calculate karna', 30, 4],
      ['Booking ke baad documents + reminders', 20, 2],
      ['Trip ke baad review maangna', 8, 0],
    ],
    agents: [
      ['Enquiry Qualifier', 'WhatsApp/Form message padh ke destination, dates, log, budget nikaalta hai aur lead Hot/Warm/Cold karta hai.', 'Webhook / WhatsApp Trigger, Information Extractor, IF', [5, 11, 14], 'qualifier'],
      ['Itinerary Builder', 'Destination + din + budget se day-wise itinerary draft karta hai (hotel, sightseeing, travel time).', 'AI Agent, Google Sheets Tool (packages), Code', [14, 15], 'receptionist'],
      ['Quote Generator', 'Package rates sheet se exact price nikaal ke GST ke saath PDF/HTML quote banata hai.', 'Google Sheets, Code (calculation), Gmail', [6, 13], 'reporter'],
      ['Booking Reminder', 'Trip se 7 din, 1 din pehle documents checklist aur pickup details bhejta hai.', 'Schedule Trigger, Filter, WhatsApp/Telegram', [9, 23], 'scheduler'],
      ['Review Collector', 'Trip khatam hone ke 1 din baad feedback + Google review link bhejta hai.', 'Schedule Trigger, Wait, WhatsApp', [11, 12], 'nurturer'],
    ],
    schema: {
      sheet: 'Enquiries',
      cols: [
        ['enquiry_id', 'Har enquiry ki unique pehchaan (ENQ-1001) — follow-up mein yahi use hoti hai'],
        ['created_at', 'Kab aayi — "24 ghante mein reply" track karne ke liye'],
        ['name', 'Customer ka naam'], ['phone', 'WhatsApp par reply/reminder ke liye'],
        ['source', 'WhatsApp / Insta / Website — kaunsa channel zyada leads deta hai'],
        ['destination', 'Kahan jaana hai — packages sheet se match karne ke liye'],
        ['travel_date', 'Kab — reminders isi se nikalte hain'],
        ['pax', 'Kitne log — price ka base'],
        ['budget', 'Per person budget — Hot/Cold decide karne mein madad'],
        ['stage', 'new / quoted / booked / lost — funnel report ke liye'],
        ['quote_amount', 'Bheja gaya price — conversion ka hisaab'],
        ['assigned_to', 'Kaunsa sales person dekh raha hai'],
      ],
      sample: ['ENQ-1001', '2026-11-02 10:15', 'Neha Gupta', '98xxxxxx21', 'Instagram', 'Manali', '2026-12-20', '4', '18000', 'quoted', '72000', 'Ravi'],
      more: [['Packages', 'package_id, destination, nights, hotel_category, price_per_person, inclusions', 'Itinerary/Quote agent yahin se rate padhta hai'], ['Bookings', 'booking_id, enquiry_id, travel_date, paid_amount, documents_status, pickup_point', 'Reminder agent isi se chalta hai']],
    },
    projects: [
      ['Enquiry Form → Sheet + Telegram alert', 'Website/Insta link par form; har enquiry sheet mein, owner ko turant alert.', '1 ghanta', [2, 9]],
      ['AI Enquiry Qualifier + auto WhatsApp reply', 'Message se details nikaalna, Hot/Warm/Cold, aur 2 minute mein personalised reply with 2 matching packages.', '1 din', [11, 14, 15]],
      ['Poora AI Travel Desk', 'Itinerary + quote agent, booking reminders, review collector, weekly funnel report, error alerts.', '3 din', [15, 16, 18, 21]],
    ],
    roi: { unit: 'enquiries / mahina', perMonth: 400, minsSaved: 15, costPerHour: 150 },
    sell: {
      setup: '₹15,000 – ₹40,000', monthly: '₹3,000 – ₹8,000',
      pitch: '"Sir, aapki agency ko jo enquiry raat 11 baje aati hai, uska reply bhi 2 minute mein jaayega — itinerary aur price ke saath. Customer doosri agency tak pahunchne se pehle aapka ho jaayega."',
      demo: ['Apne phone se form bharo (Manali, 4 log, Dec)', 'Turant owner ke phone par Telegram alert dikhao', 'Sheet mein row dikhao', 'Level 2 ho to AI ka bheja hua itinerary reply dikhao'],
      objections: [['AI galat price bata dega?', 'Price hamesha aapki Packages sheet se aata hai, AI sirf text likhta hai. Final quote aap approve karte ho.'], ['Hamara staff to hai hi', 'Staff ab sirf hot leads par call karega — same staff zyada bookings close karega.']],
    },
    form: [['Name'], ['Phone'], ['Destination'], ['Travel date', 'date'], ['Number of travellers', 'number'], ['Budget per person (₹)', 'number']],
    alert: '✈️ Nayi travel enquiry!\n👤 {{ $json.Name }} · 📞 {{ $json.Phone }}\n📍 {{ $json.Destination }} · 🗓 {{ $json["Travel date"] }}\n👥 {{ $json["Number of travellers"] }} log · 💰 ₹{{ $json["Budget per person (₹)"] }}/person',
  },

  {
    slug: 'real-estate', i: '🏠', name: 'Real Estate', color: '#7c3aed',
    tagline: 'Har lead ko 2 minute mein reply, score aur site visit booking',
    story: {
      biz: 'Gupta Realty, Noida',
      text: 'Gupta Realty ko har mahine 600 leads aati hain: 99acres, Facebook ads aur website se. 3 sales log hain, sirf 30% leads ko 24 ghante mein call jaata hai. Site visit ke din aadhe log aate hi nahi, aur purani leads ko koi follow-up nahi karta.',
      mission: 'Ek AI sales desk banao jo har lead ko 2 minute mein reply kare, budget/location se score kare, matching property bheje aur site visit book + remind kare.',
    },
    pains: [
      ['Har lead ko pehla call/message', 80, 6],
      ['Requirement ke hisaab se property dhoondhna', 40, 5],
      ['Site visit schedule + reminder', 25, 2],
      ['Cold leads ka follow-up', 30, 3],
      ['Weekly sales report', 6, 0],
    ],
    agents: [
      ['Lead Capture', 'Har source (form, Facebook Lead Ads, portal email) se lead ek sheet/CRM mein laata hai.', 'Webhook, Facebook Lead Ads Trigger, Gmail Trigger', [2, 8, 11], 'receptionist'],
      ['Lead Scorer (AI)', 'Budget, location, timeline aur loan status se 0–100 score aur Hot/Warm/Cold.', 'Information Extractor, Code, IF', [5, 11, 14], 'qualifier'],
      ['Property Matcher', 'Lead ki requirement se Properties sheet ki 3 best listings chun ke brochure ke saath bhejta hai.', 'AI Agent, Google Sheets Tool, WhatsApp', [15, 16], 'expert'],
      ['Site Visit Scheduler', 'Slot book karta hai, 1 din aur 2 ghante pehle reminder, aur visit ke baad feedback.', 'Google Calendar, Wait, WhatsApp/Telegram', [9], 'scheduler'],
      ['Follow-up Nurturer', 'Cold leads ko 30 din tak har hafte naya project / offer update.', 'Schedule Trigger, Loop, Gmail/WhatsApp', [11, 12], 'nurturer'],
    ],
    schema: {
      sheet: 'Leads',
      cols: [
        ['lead_id', 'Unique ID (L-1001) — har system mein same lead pehchaanne ke liye'],
        ['created_at', 'Lead kab aayi — response time track karna'],
        ['name', 'Naam'], ['phone', 'Call / WhatsApp'],
        ['source', '99acres / Facebook / Website — kis source ka ROI achha hai'],
        ['budget_min', 'Budget range — property match ke liye (number, ₹)'],
        ['budget_max', 'Budget range upper limit'],
        ['location_pref', 'Sector / area — matcher isi se filter karta hai'],
        ['bhk', '2 / 3 / 4 BHK'],
        ['timeline', 'Kab khareedna hai — score ka bada factor'],
        ['score', 'AI ka 0–100 score'],
        ['stage', 'new / contacted / visit_booked / negotiation / won / lost'],
        ['assigned_to', 'Sales person'],
        ['next_followup', 'Agla follow-up kab — nurturer yahi padhta hai'],
        ['visit_date', 'Site visit date'],
      ],
      sample: ['L-1001', '2026-11-02 10:15', 'Rohit Verma', '98xxxxxx01', '99acres', '6000000', '8000000', 'Sector 150', '3', '3 months', '82', 'visit_booked', 'Amit', '2026-11-03', '2026-11-05'],
      more: [['Properties', 'property_id, project, location, bhk, price, carpet_area, status, brochure_link', 'Matcher yahin se listings chunta hai'], ['Visits', 'visit_id, lead_id, property_id, slot, reminder_sent, attended, feedback', 'Scheduler + no-show report']],
    },
    projects: [
      ['Website lead form → Sheet + Telegram alert', 'Har lead turant sheet mein aur sales head ke phone par.', '1 ghanta', [2, 9]],
      ['AI lead score + property match + auto WhatsApp', 'Lead aate hi score, 3 matching properties ka message, Hot lead par sales ko call alert.', '1 din', [11, 14, 15]],
      ['Poora AI Sales Desk', 'Scorer + matcher + visit scheduler + 30-din nurturer + weekly report, error handling ke saath.', '3 din', [16, 18, 21]],
    ],
    roi: { unit: 'leads / mahina', perMonth: 600, minsSaved: 8, costPerHour: 200 },
    sell: {
      setup: '₹20,000 – ₹50,000', monthly: '₹4,000 – ₹10,000',
      pitch: '"Aap har mahine ads par lakhon kharch karte ho. Jo lead 1 ghante baad call hoti hai, uske convert hone ke chance bahut gir jaate hain. Hum har lead ko 2 minute mein reply aur site visit booking de denge."',
      demo: ['Form bharo (3 BHK, ₹70 lakh, Sector 150)', 'Telegram par "🔥 Hot lead" alert dikhao', 'Level 2: WhatsApp par 3 property suggestions dikhao', 'Sheet mein score + stage dikhao'],
      objections: [['Hamara CRM pehle se hai', 'n8n aapke CRM (Zoho, HubSpot, LeadSquared) se bhi judta hai — data wahin jaayega.'], ['Customer ko robot jaisa lagega?', 'Message aapke tone mein, aapke naam se jaata hai, aur Hot lead par insaan hi call karta hai.']],
    },
    form: [['Name'], ['Phone'], ['Preferred location'], ['BHK', 'dropdown', ['1 BHK', '2 BHK', '3 BHK', '4+ BHK']], ['Budget (₹ lakh)', 'number'], ['Buying timeline', 'dropdown', ['Turant', '3 mahine', '6 mahine', 'Sirf dekh rahe hain']]],
    alert: '🏠 Naya property lead!\n👤 {{ $json.Name }} · 📞 {{ $json.Phone }}\n📍 {{ $json["Preferred location"] }} · {{ $json.BHK }}\n💰 ₹{{ $json["Budget (₹ lakh)"] }} lakh · ⏱ {{ $json["Buying timeline"] }}',
  },

  {
    slug: 'clinic', i: '🩺', name: 'Clinic / Hospital', color: '#e11d48',
    tagline: 'Appointment, reminder aur report — bina phone ki ghanti ke',
    story: {
      biz: 'Dr. Mehta Skin Clinic, Pune',
      text: 'Clinic ki receptionist poora din phone par appointments leti hai. 25% patients aate hi nahi (no-show), reports WhatsApp par haath se bhejni padti hain, aur "fees kitni hai, timing kya hai" jaise sawaal din mein 50 baar aate hain.',
      mission: 'Appointment bot, no-show reminders, report sender aur FAQ agent banao — taaki receptionist sirf clinic mein aaye patients par dhyan de.',
    },
    pains: [
      ['Phone par appointment lena', 60, 8],
      ['Reminder calls (no-show kam karna)', 20, 1],
      ['Reports bhejna', 15, 2],
      ['Same FAQ ka jawab (fees, timing, address)', 25, 3],
    ],
    agents: [
      ['Appointment Bot', 'WhatsApp/website par slot dikhata hai, book karta hai aur calendar mein daalta hai.', 'Chat Trigger / WhatsApp, Google Calendar Tool, AI Agent', [9, 15], 'scheduler'],
      ['No-show Reminder', 'Appointment se 1 din pehle aur 2 ghante pehle reminder, "reschedule karna hai?" option ke saath.', 'Schedule Trigger, Filter, WhatsApp', [9, 23], 'scheduler'],
      ['Report Sender', 'Lab report PDF Drive folder mein aate hi patient ko secure link bhejta hai.', 'Google Drive Trigger, Google Sheets lookup, WhatsApp/Gmail', [9, 17], 'reporter'],
      ['Clinic FAQ Agent', 'Fees, timing, treatments, address jaise sawaalon ka clinic ke document se jawab (medical advice nahi).', 'AI Agent, Vector Store (RAG), Chat Trigger', [16], 'expert'],
    ],
    schema: {
      sheet: 'Appointments',
      cols: [
        ['appt_id', 'Unique appointment ID'], ['patient_name', 'Naam'], ['phone', 'Reminder ke liye'],
        ['doctor', 'Kis doctor ke paas'], ['date', 'Appointment date'], ['slot', 'Time slot (10:30)'],
        ['reason', 'Visit ka reason (short) — doctor ke liye'], ['status', 'booked / reminded / visited / no_show / cancelled'],
        ['reminder_sent', 'yes/no — double reminder na jaaye'], ['source', 'WhatsApp / website / walk-in'],
      ],
      sample: ['AP-2201', 'Kavita Rao', '98xxxxxx45', 'Dr. Mehta', '2026-11-04', '11:00', 'Acne follow-up', 'booked', 'no', 'WhatsApp'],
      more: [['Patients', 'patient_id, name, phone, age, last_visit, notes', 'Repeat patient pehchaanne ke liye'], ['Reports', 'report_id, patient_id, file_link, sent_at', 'Report sender ka log']],
    },
    projects: [
      ['Appointment form → Sheet + doctor ko alert', 'Online booking form, sheet mein entry, clinic ko Telegram alert.', '1 ghanta', [2, 9]],
      ['Reminder system + no-show report', 'Daily schedule se reminders, aur hafte ka no-show report.', '1 din', [9, 13, 23]],
      ['AI Clinic Receptionist', 'WhatsApp par booking + FAQ (RAG) + report sender + human handover.', '3 din', [15, 16, 17, 21]],
    ],
    roi: { unit: 'appointments / mahina', perMonth: 500, minsSaved: 6, costPerHour: 120 },
    sell: {
      setup: '₹12,000 – ₹35,000', monthly: '₹3,000 – ₹7,000',
      pitch: '"Doctor sahab, 4 mein se 1 patient aata hi nahi — woh slot khaali jaata hai. Automatic reminders se no-show aadhe ho sakte hain, aur receptionist ko phone se fursat milegi."',
      demo: ['Form se appointment book karo', 'Clinic ke phone par alert dikhao', 'Sheet mein status "booked"', 'Level 2: reminder message ka preview'],
      objections: [['Patient data safe hai?', 'Self-hosted n8n par data aapke server par rehta hai; AI ko sirf zaroori text jaata hai, medical history nahi.'], ['AI galat medical advice de dega?', 'FAQ agent ko sirf clinic info ka jawab dene ka rule hai; medical sawaal par "doctor se baat karein" bolta hai.']],
    },
    form: [['Patient name'], ['Phone'], ['Doctor', 'dropdown', ['Dr. Mehta', 'Dr. Shah']], ['Preferred date', 'date'], ['Reason for visit']],
    alert: '🩺 Naya appointment request\n👤 {{ $json["Patient name"] }} · 📞 {{ $json.Phone }}\n👨‍⚕️ {{ $json.Doctor }} · 🗓 {{ $json["Preferred date"] }}\n📝 {{ $json["Reason for visit"] }}',
  },

  {
    slug: 'coaching', i: '🎓', name: 'Coaching / Education', color: '#f59e0b',
    tagline: 'Demo class lead se admission aur fees tak — sab automatic',
    story: {
      biz: 'Bright Future Academy, Lucknow',
      text: 'Academy Facebook ads chalaati hai aur roz 30–40 demo class leads aati hain. Counsellor sabko call nahi kar paata. Fees ki due dates Excel mein hain aur reminders bhool jaate hain. Raat ko students ke doubts ka koi jawab nahi deta.',
      mission: 'Admission counsellor bot, demo reminders, fees reminder aur ek doubt solver (RAG) banao jo academy ke notes se jawab de.',
    },
    pains: [
      ['Demo lead ko call + details', 50, 6],
      ['Demo class reminder', 10, 0],
      ['Fees reminder + receipt', 20, 2],
      ['Attendance alert parents ko', 15, 1],
      ['Repeat doubts ka jawab', 30, 6],
    ],
    agents: [
      ['Admission Counsellor Bot', 'Course, fees, batch timing batata hai, demo book karta hai aur interested lead ko counsellor ko deta hai.', 'Chat/WhatsApp Trigger, AI Agent, Google Sheets Tool', [11, 15], 'receptionist'],
      ['Demo + Fees Reminder', 'Demo se pehle reminder; fees due date se 3 din pehle aur due date par polite reminder.', 'Schedule Trigger, Filter, WhatsApp/Gmail', [9, 23], 'scheduler'],
      ['Doubt Solver (RAG)', 'Academy ke PDF notes se student ke sawaal ka jawab, source ke saath.', 'Vector Store, Embeddings, AI Agent', [16], 'expert'],
      ['Attendance Alert', 'Student absent ho to parent ko same din message; hafte ka attendance summary.', 'Google Sheets Trigger, IF, WhatsApp', [5, 13], 'reporter'],
    ],
    schema: {
      sheet: 'Students',
      cols: [
        ['student_id', 'Unique ID'], ['name', 'Student naam'], ['parent_phone', 'Parent ka WhatsApp'],
        ['course', 'Kaunsa course / class'], ['batch', 'Batch timing'], ['stage', 'lead / demo_booked / enrolled / dropped'],
        ['fees_total', 'Total fees (₹)'], ['fees_paid', 'Ab tak jama (₹)'], ['next_due_date', 'Agli kisht kab — reminder isi se'],
        ['source', 'Facebook / referral / walk-in'],
      ],
      sample: ['ST-501', 'Aman Singh', '97xxxxxx12', 'Class 12 Physics', 'Evening 5 PM', 'enrolled', '24000', '12000', '2026-11-10', 'Facebook'],
      more: [['Attendance', 'date, student_id, present', 'Attendance alert yahin se'], ['Payments', 'payment_id, student_id, amount, date, mode', 'Receipt + fees report']],
    },
    projects: [
      ['Demo class form → Sheet + counsellor alert', 'Ad link par form; har lead sheet mein + counsellor ko Telegram.', '1 ghanta', [2, 9]],
      ['Fees reminder + monthly collection report', 'Due date se reminders aur mahine ka "kitna aaya, kitna baaki" report.', '1 din', [9, 13, 23]],
      ['AI Academy Assistant', 'Admission bot + doubt solver (RAG) + attendance alerts + human handover.', '3 din', [15, 16, 21]],
    ],
    roi: { unit: 'leads + students / mahina', perMonth: 900, minsSaved: 5, costPerHour: 120 },
    sell: {
      setup: '₹10,000 – ₹30,000', monthly: '₹2,500 – ₹6,000',
      pitch: '"Aapke ads ki har lead ko 2 minute mein reply aur demo booking milegi, aur fees reminders apne aap jaayenge — collection time par hoga."',
      demo: ['Demo form bharo', 'Counsellor ke phone par alert', 'Sheet mein lead', 'Level 2: fees reminder message preview'],
      objections: [['Parents ko bot pasand nahi aayega', 'Bot sirf info aur reminders deta hai; counselling call insaan hi karta hai.'], ['Hamare notes copy ho jaayenge?', 'Doubt solver sirf enrolled students ke liye, aur notes aapke apne server/database mein rehte hain.']],
    },
    form: [['Student name'], ['Parent phone'], ['Class / course', 'dropdown', ['Class 10', 'Class 11', 'Class 12', 'Competitive exam']], ['Preferred demo date', 'date']],
    alert: '🎓 Naya demo class lead\n👤 {{ $json["Student name"] }} · 📞 {{ $json["Parent phone"] }}\n📚 {{ $json["Class / course"] }} · 🗓 {{ $json["Preferred demo date"] }}',
  },

  {
    slug: 'ecommerce', i: '🛒', name: 'E-commerce / D2C', color: '#16a34a',
    tagline: 'Order status, COD confirm aur cart recovery — 24×7',
    story: {
      biz: 'DesiCraft (handmade decor brand), Jaipur',
      text: 'DesiCraft Shopify par roz 60 orders leta hai. 40% COD hain aur unme se kaafi return ho jaate hain (RTO). Customer "order kahan hai?" poochne ke liye roz 30 messages bhejte hain. Abandoned carts ko koi yaad nahi dilaata.',
      mission: 'COD confirmation, order status agent, cart recovery aur review reply automation banao.',
    },
    pains: [
      ['COD orders confirm karna (call)', 40, 3],
      ['"Order kahan hai?" ka jawab', 30, 3],
      ['Abandoned cart follow-up', 15, 1],
      ['Reviews ka reply', 10, 2],
      ['Daily sales report', 8, 0],
    ],
    agents: [
      ['COD Confirmer', 'COD order aate hi WhatsApp par "Confirm / Cancel" button; jawab ke hisaab se order tag.', 'Shopify Trigger / Webhook, WhatsApp, Wait, IF', [8, 13], 'qualifier'],
      ['Order Status Agent', 'Order number se courier status nikaal ke simple bhasha mein batata hai.', 'Chat/WhatsApp Trigger, HTTP Request (courier API), AI Agent', [7, 15], 'receptionist'],
      ['Cart Recovery', 'Cart chhodne ke 1 ghante aur 24 ghante baad reminder, dusre mein chhota discount.', 'Webhook, Wait, WhatsApp/Gmail', [11, 12], 'nurturer'],
      ['Review Reply Agent', 'Naye review ka tone samajh ke reply draft; negative review par owner ko alert.', 'Schedule, HTTP Request, Text Classifier, Gmail', [14, 22], 'qualifier'],
      ['Daily Sales Report', 'Roz raat orders, revenue, COD vs prepaid aur top products ka summary.', 'Schedule, Shopify/HTTP, Code, Gmail/Telegram', [3, 13], 'reporter'],
    ],
    schema: {
      sheet: 'Orders',
      cols: [
        ['order_id', 'Shopify order number'], ['created_at', 'Order time'], ['customer_name', 'Naam'], ['phone', 'WhatsApp ke liye'],
        ['amount', 'Order value (₹)'], ['payment_mode', 'COD / prepaid — COD par hi confirm flow chalega'],
        ['cod_status', 'pending / confirmed / cancelled'], ['awb', 'Courier tracking number'],
        ['ship_status', 'packed / shipped / delivered / rto'], ['city', 'City-wise report'],
      ],
      sample: ['#1458', '2026-11-02 13:40', 'Pooja Nair', '99xxxxxx67', '1899', 'COD', 'confirmed', 'DL123456789', 'shipped', 'Kochi'],
      more: [['Carts', 'cart_id, phone, items, value, abandoned_at, reminder_stage, recovered', 'Cart recovery'], ['Reviews', 'review_id, rating, text, sentiment, reply, replied_at', 'Review agent']],
    },
    projects: [
      ['Order webhook → Sheet + Telegram "naya order"', 'Har order sheet mein aur owner ke phone par turant.', '1 ghanta', [2, 8]],
      ['COD confirmation flow', 'WhatsApp confirm/cancel, Wait, aur cancelled par order tag + report.', '1 din', [8, 9, 13]],
      ['AI Store Assistant', 'Order status agent + cart recovery + review replies + daily report.', '3 din', [15, 21, 22, 23]],
    ],
    roi: { unit: 'orders / mahina', perMonth: 1800, minsSaved: 3, costPerHour: 120 },
    sell: {
      setup: '₹15,000 – ₹45,000', monthly: '₹3,000 – ₹9,000',
      pitch: '"Har RTO par aapka shipping dono taraf ka paisa jaata hai. COD confirmation se fake orders pehle hi ruk jaate hain — sirf isse hi setup ka kharcha nikal aata hai."',
      demo: ['Test order ka form bharo (COD)', 'Owner ko Telegram alert', 'Sheet mein order', 'Level 2: WhatsApp confirm message preview'],
      objections: [['Shopify apps already hain', 'Apps har mahine per-order fees lete hain; n8n mein ek baar setup, aur aap jo chahe customise karo.'], ['WhatsApp API mehenga hai?', 'Utility messages sasti hain; shuru Telegram/email se karke baad mein WhatsApp jod sakte ho.']],
    },
    form: [['Customer name'], ['Phone'], ['Order amount (₹)', 'number'], ['Payment mode', 'dropdown', ['COD', 'Prepaid']], ['City']],
    alert: '🛒 Naya order!\n👤 {{ $json["Customer name"] }} · 📞 {{ $json.Phone }}\n💰 ₹{{ $json["Order amount (₹)"] }} · {{ $json["Payment mode"] }}\n📍 {{ $json.City }}',
  },
];
