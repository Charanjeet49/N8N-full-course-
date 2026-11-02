// ============================================================
//  BUSINESS TRACK — industry blueprints (2/2)  · format: business.js dekho
// ============================================================

module.exports = [
  {
    slug: 'restaurant', i: '🍽️', name: 'Restaurant / Cloud Kitchen', color: '#ea580c',
    tagline: 'Table booking, review reply aur roz ka sales report',
    story: {
      biz: 'Tandoor Tales, Indore',
      text: 'Tandoor Tales ke paas dine-in bhi hai aur Swiggy/Zomato bhi. Weekend par table booking ke calls miss ho jaate hain, Google reviews ka koi reply nahi karta, aur owner ko raat ko 3 apps khol ke din ki sale jodni padti hai.',
      mission: 'Table booking bot, review responder, daily sales report aur menu/offer content agent banao.',
    },
    pains: [
      ['Table booking calls', 25, 3],
      ['Google/Zomato reviews ka reply', 12, 2],
      ['Raat ka sales hisaab (3 apps)', 15, 0],
      ['Roz ka offer post banana', 15, 3],
    ],
    agents: [
      ['Table Booking Bot', 'Date, time, log poochta hai, availability check karke booking confirm karta hai.', 'Form/Chat Trigger, Google Sheets (tables), WhatsApp', [2, 15], 'scheduler'],
      ['Review Responder', 'Har naye review ka polite reply draft; 1–2 star par manager ko turant alert.', 'Schedule, HTTP Request, Text Classifier, Telegram', [14, 22], 'qualifier'],
      ['Daily Sales Report', 'POS + aggregator data jod ke raat 11 baje owner ko summary.', 'Schedule, HTTP Request, Merge, Code, Telegram', [3, 7, 13], 'reporter'],
      ['Menu Content Agent', 'Aaj ka special / offer se Instagram caption + WhatsApp broadcast text.', 'AI (LLM), Google Sheets, approval step', [12, 22], 'nurturer'],
    ],
    schema: {
      sheet: 'Bookings',
      cols: [
        ['booking_id', 'Unique ID'], ['name', 'Guest naam'], ['phone', 'Confirm/remind ke liye'], ['date', 'Kis din'],
        ['time', 'Kis time'], ['guests', 'Kitne log — table size'], ['occasion', 'Birthday/anniversary — special touch'],
        ['status', 'requested / confirmed / seated / no_show'], ['source', 'Website / WhatsApp / call'],
      ],
      sample: ['BK-310', 'Arjun Jain', '98xxxxxx88', '2026-11-08', '20:30', '6', 'Birthday', 'confirmed', 'Website'],
      more: [['DailySales', 'date, dine_in, swiggy, zomato, total, top_dish', 'Daily report ka log'], ['Reviews', 'platform, rating, text, reply, alert_sent', 'Review responder']],
    },
    projects: [
      ['Table booking form → Sheet + manager alert', 'Booking form; sheet mein entry; manager ke phone par alert.', '1 ghanta', [2, 9]],
      ['Daily sales report (raat 11 baje)', 'Sheets/APIs se din ka total, top dish, comparison with kal.', '1 din', [3, 7, 13]],
      ['AI Restaurant Assistant', 'Booking bot + review responder + offer content engine with approval.', '3 din', [15, 21, 22]],
    ],
    roi: { unit: 'bookings + reviews / mahina', perMonth: 400, minsSaved: 5, costPerHour: 100 },
    sell: {
      setup: '₹8,000 – ₹25,000', monthly: '₹2,000 – ₹5,000',
      pitch: '"Weekend ka har missed call ek khaali table hai. Online booking + reminders se table bhi bharenge aur reviews ka reply bhi time par jaayega — rating badhegi."',
      demo: ['Booking form bharo (Saturday, 6 log, birthday)', 'Manager ko Telegram alert', 'Sheet mein booking', 'Level 2: raat ka sales report sample'],
      objections: [['Staff kam hai, kaun sambhalega?', 'Sab automatic hai — staff ko sirf alert dekhna hai.'], ['Swiggy/Zomato data milega?', 'Partner dashboards se export / email reports ko n8n padh sakta hai; shuru POS + sheet se karo.']],
    },
    form: [['Name'], ['Phone'], ['Date', 'date'], ['Time'], ['Number of guests', 'number'], ['Occasion', 'dropdown', ['Normal', 'Birthday', 'Anniversary', 'Office party']]],
    alert: '🍽️ Nayi table booking!\n👤 {{ $json.Name }} · 📞 {{ $json.Phone }}\n🗓 {{ $json.Date }} · ⏰ {{ $json.Time }}\n👥 {{ $json["Number of guests"] }} log · 🎉 {{ $json.Occasion }}',
  },

  {
    slug: 'gym', i: '🏋️', name: 'Gym / Fitness Studio', color: '#0d9488',
    tagline: 'Trial se membership, renewal aur diet plan — automatic',
    story: {
      biz: 'FitZone Gym, Chandigarh',
      text: 'FitZone ke paas 350 members hain. Har mahine 40–50 memberships expire hoti hain aur renewal ka yaad dilaana bhool jaate hain. Free trial lene wale 60% log wapas hi nahi aate kyunki koi follow-up nahi karta.',
      mission: 'Trial-to-member nurturer, renewal reminder aur personalised diet plan agent banao.',
    },
    pains: [
      ['Trial leads ka follow-up', 20, 2],
      ['Renewal reminders', 15, 1],
      ['Diet plan banana', 30, 5],
      ['Birthday / inactive member messages', 6, 0],
    ],
    agents: [
      ['Trial-to-Member Nurturer', 'Trial ke din se 7 din tak motivational + offer messages, last din trainer call alert.', 'Form Trigger, Wait, WhatsApp, IF', [11, 12], 'nurturer'],
      ['Renewal Reminder', 'Expiry se 7, 3, 0 din pehle reminder + payment link; expire hone par "comeback offer".', 'Schedule, Filter, WhatsApp/Gmail', [9, 23], 'scheduler'],
      ['Diet Plan Agent', 'Weight, goal, veg/non-veg se 7-din Indian diet plan draft (trainer approve kare).', 'Form Trigger, AI (LLM), Structured Output, Gmail', [14, 17], 'expert'],
      ['Inactive Member Alert', '10 din se check-in nahi kiya to trainer ko alert aur member ko friendly message.', 'Schedule, Google Sheets, Code, WhatsApp', [5, 13], 'reporter'],
    ],
    schema: {
      sheet: 'Members',
      cols: [
        ['member_id', 'Unique ID'], ['name', 'Naam'], ['phone', 'WhatsApp'], ['plan', 'Monthly / Quarterly / Yearly'],
        ['start_date', 'Membership shuru'], ['expiry_date', 'Expiry — renewal reminders isi se'], ['goal', 'Weight loss / muscle gain'],
        ['last_checkin', 'Aakhri baar kab aaye — inactive alert'], ['status', 'trial / active / expired / renewed'], ['trainer', 'Assigned trainer'],
      ],
      sample: ['M-1201', 'Simran Kaur', '98xxxxxx34', 'Quarterly', '2026-08-10', '2026-11-10', 'Weight loss', '2026-10-30', 'active', 'Vikram'],
      more: [['Trials', 'trial_id, name, phone, trial_date, followup_stage, converted', 'Nurturer'], ['DietPlans', 'member_id, created_at, plan_text, approved_by', 'Diet agent ka log']],
    },
    projects: [
      ['Free trial form → Sheet + trainer alert', 'Trial booking form; sheet; trainer ko Telegram.', '1 ghanta', [2, 9]],
      ['Renewal reminder system', 'Daily check, 7/3/0 din reminders, monthly renewal report.', '1 din', [9, 13, 23]],
      ['AI Fitness Assistant', 'Trial nurturer + diet plan agent with approval + inactive alerts.', '3 din', [12, 14, 21]],
    ],
    roi: { unit: 'members + trials / mahina', perMonth: 400, minsSaved: 6, costPerHour: 100 },
    sell: {
      setup: '₹8,000 – ₹25,000', monthly: '₹2,000 – ₹5,000',
      pitch: '"Har mahine jo 10 members renewal bhool jaate hain, woh ₹15,000+ ka nuksaan hai. Automatic reminders se zyada members renew karenge."',
      demo: ['Trial form bharo', 'Trainer ko alert', 'Sheet mein trial', 'Level 2: renewal reminder preview'],
      objections: [['Members ko spam lagega?', 'Mahine mein 2–3 kaam ke messages hi jaate hain, aur "STOP" ka option hota hai.'], ['Diet plan AI se safe hai?', 'Plan sirf draft hai — trainer approve karke hi bhejta hai.']],
    },
    form: [['Name'], ['Phone'], ['Goal', 'dropdown', ['Weight loss', 'Muscle gain', 'General fitness']], ['Trial date', 'date']],
    alert: '🏋️ Naya free trial!\n👤 {{ $json.Name }} · 📞 {{ $json.Phone }}\n🎯 {{ $json.Goal }} · 🗓 {{ $json["Trial date"] }}',
  },

  {
    slug: 'ca-finance', i: '📊', name: 'CA / Finance Services', color: '#2563eb',
    tagline: 'Documents collection, GST deadlines aur invoice data — bina peeche bhaage',
    story: {
      biz: 'Agarwal & Associates (CA firm), Ahmedabad',
      text: 'Firm ke 180 clients hain. Har mahine GST se pehle clients se bills/statements maangne mein staff ka aadha time jaata hai. Invoices PDF/photo mein aate hain jinhe haath se Excel mein bharna padta hai. Deadline miss hone par penalty client ko lagti hai, gussa firm par aata hai.',
      mission: 'Document collector, deadline reminder aur invoice extractor (Document AI) banao.',
    },
    pains: [
      ['Clients se documents maangna', 60, 6],
      ['Deadline reminders', 15, 1],
      ['Invoice data entry', 80, 10],
      ['Client status report', 10, 1],
    ],
    agents: [
      ['Document Collector', 'Har client ko upload link; kaun se documents aaye/baaki — checklist ke saath follow-up.', 'Form Trigger (file upload), Google Drive, Google Sheets, WhatsApp', [2, 9, 10], 'nurturer'],
      ['Deadline Reminder', 'GST/TDS/ITR due dates se pehle client-wise reminder, baaki documents ki list ke saath.', 'Schedule, Google Sheets, Filter, Gmail/WhatsApp', [9, 23], 'scheduler'],
      ['Invoice Extractor', 'PDF/photo invoice se GSTIN, invoice no, date, taxable value, GST nikaal ke sheet mein.', 'Drive Trigger, Extract from File / Vision, Information Extractor', [17, 23], 'expert'],
      ['Client Status Reporter', 'Partner ko hafte ka report: kis client ke documents baaki, kaun si filing pending.', 'Schedule, Google Sheets, Code, Gmail', [3, 13], 'reporter'],
    ],
    schema: {
      sheet: 'Clients',
      cols: [
        ['client_id', 'Unique ID'], ['client_name', 'Business naam'], ['gstin', 'GST number'], ['contact_phone', 'WhatsApp'],
        ['filing_type', 'GSTR-1 / GSTR-3B / TDS / ITR'], ['period', 'Kis mahine/quarter ka'], ['due_date', 'Deadline — reminders isi se'],
        ['docs_status', 'pending / partial / received'], ['filing_status', 'not_started / in_progress / filed'], ['assigned_to', 'Staff'],
      ],
      sample: ['C-077', 'Shree Textiles', '24ABCDE1234F1Z5', '98xxxxxx90', 'GSTR-3B', 'Oct 2026', '2026-11-20', 'partial', 'not_started', 'Nidhi'],
      more: [['Invoices', 'client_id, invoice_no, invoice_date, vendor_gstin, taxable_value, gst_amount, file_link', 'Extractor ka output'], ['DocRequests', 'client_id, period, doc_type, requested_at, received_at', 'Collector ka log']],
    },
    projects: [
      ['Document upload form → Drive + Sheet + alert', 'Client file upload kare; Drive folder mein jaaye; sheet update; staff ko alert.', '1 ghanta', [2, 9]],
      ['Deadline reminder + weekly status report', 'Due dates se reminders, partner ko pending list.', '1 din', [9, 13, 23]],
      ['AI Invoice Desk', 'Invoice extractor + validation (GST math in Code) + error handling + client reports.', '3 din', [17, 18, 23]],
    ],
    roi: { unit: 'documents / mahina', perMonth: 1200, minsSaved: 4, costPerHour: 180 },
    sell: {
      setup: '₹20,000 – ₹60,000', monthly: '₹4,000 – ₹12,000',
      pitch: '"Aapke staff ka aadha mahina documents maangne aur invoice type karne mein jaata hai. Woh kaam automatic ho jaaye to wahi team zyada clients sambhal sakti hai."',
      demo: ['Upload form se ek invoice PDF bhejo', 'Staff ko alert + sheet entry', 'Level 3: extracted invoice fields dikhao'],
      objections: [['Data confidentiality?', 'Self-hosted n8n + aapka Google Drive; data aapke control mein.'], ['AI galat number bharega?', 'Extractor ke baad Code se GST math check hota hai; mismatch par staff review.']],
    },
    form: [['Client name'], ['Phone'], ['Filing type', 'dropdown', ['GSTR-1', 'GSTR-3B', 'TDS', 'ITR']], ['Period (e.g. Oct 2026)'], ['Documents link (Drive / WhatsApp)']],
    alert: '📊 Client ne documents bheje\n🏢 {{ $json["Client name"] }} · 📞 {{ $json.Phone }}\n📄 {{ $json["Filing type"] }} · {{ $json["Period (e.g. Oct 2026)"] }}',
  },

  {
    slug: 'agency', i: '📣', name: 'Digital Marketing Agency', color: '#db2777',
    tagline: 'Client reporting, content engine aur onboarding — scale karo bina team badhaaye',
    story: {
      biz: 'GrowthLab Digital, Delhi',
      text: 'GrowthLab ke 25 clients hain. Har mahine ke end mein 3 log 4 din sirf reports banate hain (Meta, Google Ads, GA4 se screenshots). Har client ke liye roz posts likhne mein time jaata hai, aur naye client ka onboarding (access, brief, folder) har baar alag tareeke se hota hai.',
      mission: 'Report generator, content engine, lead finder aur client onboarding automation banao.',
    },
    pains: [
      ['Monthly client reports', 90, 10],
      ['Post ideas + captions', 60, 15],
      ['Naye client ka onboarding', 12, 2],
      ['Agency ke liye leads dhoondhna', 20, 4],
    ],
    agents: [
      ['Report Generator', 'Ads/Analytics APIs se numbers, AI se summary aur next steps, branded email/PDF report.', 'Schedule, HTTP Request, Merge, AI (LLM), Gmail', [7, 13, 22], 'reporter'],
      ['Content Engine', 'Client brief se mahine ka content calendar, captions aur approval loop.', 'AI (LLM), Google Sheets, Slack/Telegram approval, Wait', [12, 22], 'nurturer'],
      ['Lead Finder', 'Google Maps/website data se businesses list, website audit points ke saath outreach draft.', 'HTTP Request, Code, AI, Google Sheets', [7, 11, 24], 'qualifier'],
      ['Client Onboarding', 'Naya client sign hote hi Drive folder, brief form, Slack channel, welcome email.', 'Form/Webhook, Google Drive, Slack, Gmail', [9, 24], 'receptionist'],
    ],
    schema: {
      sheet: 'Clients',
      cols: [
        ['client_id', 'Unique ID'], ['brand', 'Brand naam'], ['services', 'SEO / Ads / Social'], ['monthly_fee', 'Retainer (₹)'],
        ['ad_account_id', 'Report ke liye'], ['report_email', 'Report kisko jaaye'], ['report_day', 'Mahine ki kis tareekh'],
        ['content_status', 'brief_pending / calendar_ready / approved'], ['account_manager', 'Kaun dekh raha hai'],
      ],
      sample: ['CL-12', 'Urban Brew Cafe', 'Social + Ads', '35000', 'act_123456', 'owner@urbanbrew.in', '2', 'approved', 'Sana'],
      more: [['ContentCalendar', 'client_id, date, platform, idea, caption, status, approved_by', 'Content engine'], ['Prospects', 'business, city, website, rating, audit_notes, outreach_status', 'Lead finder']],
    },
    projects: [
      ['Client brief form → Drive folder + Sheet + Slack', 'Onboarding form; har client ka folder + team alert.', '1 ghanta', [2, 9]],
      ['Automatic monthly report', 'API data + AI summary + branded email report.', '1 din', [7, 13, 14]],
      ['AI Agency OS', 'Content engine with approval + report generator + lead finder + error alerts.', '3 din', [18, 22, 24]],
    ],
    roi: { unit: 'client tasks / mahina', perMonth: 300, minsSaved: 25, costPerHour: 250 },
    sell: {
      setup: '₹25,000 – ₹75,000', monthly: '₹5,000 – ₹15,000',
      pitch: '"Aapki team 4 din reports par lagaati hai — woh 4 din client results par lag sakte hain. Reports automatic, content calendar AI draft, team sirf approve kare."',
      demo: ['Client brief form bharo', 'Slack/Telegram alert + Drive folder', 'Level 2: sample monthly report email'],
      objections: [['Clients ko AI content pasand nahi', 'AI sirf first draft deta hai; brand voice aur final approval team ka.'], ['APIs setup mushkil hai', 'Ek baar credential lagta hai, phir har client ke liye same workflow.']],
    },
    form: [['Brand name'], ['Contact email', 'email'], ['Phone'], ['Services needed', 'dropdown', ['SEO', 'Ads', 'Social media', 'Website']], ['Monthly budget (₹)', 'number']],
    alert: '📣 Naya client brief!\n🏷 {{ $json["Brand name"] }} · 📧 {{ $json["Contact email"] }}\n📞 {{ $json.Phone }} · {{ $json["Services needed"] }}\n💰 ₹{{ $json["Monthly budget (₹)"] }}/mahina',
  },

  {
    slug: 'distributor', i: '🏭', name: 'Manufacturing / Distributor', color: '#65a30d',
    tagline: 'WhatsApp orders, stock alert aur payment follow-up — dealer network ke liye',
    story: {
      biz: 'Bansal Agro Distributors, Ludhiana',
      text: 'Bansal ji 120 dealers ko maal supply karte hain. Orders WhatsApp aur phone par aate hain, staff haath se likhta hai aur galtiyan hoti hain. Stock khatam hone ka pata tab chalta hai jab order aa jaata hai. ₹40 lakh ka payment market mein atka hai, follow-up koi nahi karta.',
      mission: 'WhatsApp order taker, stock alert, payment follow-up aur dealer-wise report banao.',
    },
    pains: [
      ['WhatsApp/phone orders likhna', 50, 6],
      ['Stock check + reorder', 15, 1],
      ['Payment follow-up', 30, 3],
      ['Dealer-wise sales report', 10, 0],
    ],
    agents: [
      ['Order Taker', 'Dealer ka WhatsApp message ("20 bag urea, 10 DAP") padh ke structured order banata hai aur confirm karta hai.', 'WhatsApp/Telegram Trigger, Information Extractor, Google Sheets', [11, 14, 17], 'receptionist'],
      ['Stock Alert', 'Har order ke baad stock minus; reorder level se neeche jaate hi purchase team ko alert.', 'Google Sheets, Code, IF, Telegram', [5, 10], 'reporter'],
      ['Payment Follow-up', 'Due invoices par dealer ko polite reminders (3/7/15 din), bade dues par owner ko alert.', 'Schedule, Filter, WhatsApp, Gmail', [9, 23], 'nurturer'],
      ['Dealer Report', 'Har hafte dealer-wise sales, outstanding aur top products.', 'Schedule, Google Sheets, Code, Gmail', [3, 13], 'reporter'],
    ],
    schema: {
      sheet: 'Orders',
      cols: [
        ['order_id', 'Unique ID'], ['created_at', 'Order time'], ['dealer_id', 'Kaunsa dealer'], ['dealer_name', 'Naam'],
        ['product', 'Product code/naam'], ['qty', 'Quantity'], ['rate', 'Per unit rate (₹)'], ['amount', 'qty × rate — Code se'],
        ['status', 'received / confirmed / dispatched / delivered'], ['payment_due_date', 'Kab tak payment — follow-up isi se'],
        ['paid', 'yes / partial / no'],
      ],
      sample: ['OR-9021', '2026-11-02 09:20', 'D-045', 'Kisan Seva Kendra', 'UREA-45', '20', '266', '5320', 'confirmed', '2026-11-30', 'no'],
      more: [['Stock', 'product, current_qty, reorder_level, supplier', 'Stock alert'], ['Dealers', 'dealer_id, name, phone, city, credit_limit, outstanding', 'Payment follow-up + report']],
    },
    projects: [
      ['Order form → Sheet + dispatch team alert', 'Dealer order form; sheet; dispatch ko Telegram.', '1 ghanta', [2, 9]],
      ['Stock alert + payment reminder', 'Order ke baad stock update, reorder alert, due payment reminders.', '1 din', [5, 9, 23]],
      ['AI Order Desk', 'WhatsApp message se AI order extraction + confirm + stock + dealer reports.', '3 din', [14, 17, 18, 23]],
    ],
    roi: { unit: 'orders / mahina', perMonth: 900, minsSaved: 5, costPerHour: 120 },
    sell: {
      setup: '₹20,000 – ₹60,000', monthly: '₹4,000 – ₹10,000',
      pitch: '"Market mein atka paisa aapka sabse bada nuksaan hai. Automatic payment reminders aur saaf order record se collection bhi tez hoga aur galtiyan bhi kam."',
      demo: ['Dealer order form bharo', 'Dispatch team ko alert', 'Sheet mein order + amount', 'Level 2: payment reminder preview'],
      objections: [['Dealers WhatsApp hi use karte hain', 'Isliye Level 3 mein WhatsApp message se hi order banta hai — dealer ko kuch naya nahi seekhna.'], ['Tally hai hamare paas', 'Sheet se Tally import ya API se jod sakte hain; shuru sheet se karo.']],
    },
    form: [['Dealer name'], ['Phone'], ['Product'], ['Quantity', 'number'], ['Required by', 'date']],
    alert: '🏭 Naya dealer order!\n🏪 {{ $json["Dealer name"] }} · 📞 {{ $json.Phone }}\n📦 {{ $json.Product }} × {{ $json.Quantity }}\n🗓 Chahiye: {{ $json["Required by"] }}',
  },
];
