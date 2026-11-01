// ============================================================
//  SITE CONTENT — saare non-curriculum sections ka data
//  NOTE: testimonials / success stories SAMPLE hain — launch se pehle
//  apne real students ke reviews se replace karna.
// ============================================================

module.exports = {
  heroWords: ['Lead Generation', 'AI Agents', 'WhatsApp Bots', 'CRM Sync', 'Invoice Processing', 'Content Engines', 'RAG Chatbots'],

  marquee: ['Gmail', 'Google Sheets', 'WhatsApp', 'Telegram', 'Slack', 'OpenAI', 'Claude', 'Gemini', 'Notion', 'Airtable', 'HubSpot', 'Zoho', 'Shopify', 'WooCommerce', 'Razorpay', 'Stripe', 'Supabase', 'Postgres', 'Pinecone', 'Qdrant', 'Docker', 'GitHub', 'LinkedIn', 'Meta Ads', 'Calendly', 'Discord', 'Trello', 'Asana', 'Mailchimp', 'Brevo'],

  stats: [
    { n: 25, s: '', l: 'Live classes' },
    { n: 50, s: '+', l: 'Hours of live building' },
    { n: 120, s: '+', l: 'Workflow templates' },
    { n: 40, s: '+', l: 'Apps & APIs covered' },
    { n: 10, s: '', l: 'Portfolio projects' },
    { n: 1, s: '', l: 'Capstone + certificate' },
  ],

  whatIsN8n: [
    { t: 'Visual + Code', d: 'Drag-drop nodes se workflow banao, aur jab zarurat ho to JavaScript/Python likho. Dono duniya ka best.' },
    { t: 'Fair-code & Self-hostable', d: 'Apne server par chalao — data aapka, limits aapki. Cloud version bhi available hai.' },
    { t: '1000+ Integrations', d: 'Ready-made nodes + HTTP Request se literally koi bhi API connect ho jaati hai.' },
    { t: 'AI-Native', d: 'LangChain-powered AI Agent, memory, vector stores aur tools — sab built-in nodes ke roop mein.' },
  ],

  whyNow: [
    { k: '68%', t: 'businesses repetitive kaam automate karna chahte hain', d: 'SMEs se lekar startups tak, sabko automation chahiye — par banane wale log kam hain.' },
    { k: '10x', t: 'faster delivery with AI + n8n', d: 'Jo integration pehle developer 2 hafte mein banata tha, woh ab 2 din mein ban jaati hai.' },
    { k: '₹∞', t: 'freelance & job demand', d: 'Automation Specialist, AI Workflow Engineer, RevOps — naye roles jinke liye skill hi degree hai.' },
  ],

  personas: [
    { i: '🎓', t: 'Students & Freshers', d: 'Coding ke bina high-demand tech skill. Portfolio ke saath job ya freelancing start karo.' },
    { i: '💼', t: 'Working Professionals', d: 'Apna daily kaam automate karo, promotion pao ya naya career switch karo.' },
    { i: '🧑‍💻', t: 'Freelancers', d: 'Automation services add karo aur high-ticket retainers lo.' },
    { i: '🏢', t: 'Business Owners', d: 'Team ka 20–40 hours/week bachao — leads, follow-ups, reports sab auto.' },
    { i: '📣', t: 'Digital Marketers', d: 'Lead funnels, CRM, reporting aur content pipelines automate karo.' },
    { i: '🧠', t: 'Developers', d: 'Integrations 10x fast ship karo, AI agents ko production mein le jao.' },
  ],

  problems: [
    'Roz ghanton copy-paste: Sheets → CRM → WhatsApp',
    'Leads aati hain par follow-up late hota hai — sales lost',
    'YouTube tutorials adhoore hain, real projects nahi milte',
    'AI ke baare mein sunte ho, par use karna nahi aata',
    'Zapier/Make ke bill har mahine badhte ja rahe hain',
    'Portfolio nahi hai, isliye clients/jobs nahi milte',
  ],
  solutions: [
    'Har repetitive task ko 1 baar build, hamesha ke liye automate',
    '60-second lead response system — WhatsApp + email + CRM',
    '25 structured live classes + 10 real client-grade projects',
    'AI Agents, RAG chatbots aur document AI — hands-on',
    'Self-hosted n8n — unlimited workflows, fixed cost',
    'Capstone + case studies + certificate = ready portfolio',
  ],

  methodology: [
    { i: '📘', t: 'Learn', d: 'Har class ka pehla hissa concept ko simple Hinglish analogies se samjhata hai.' },
    { i: '🛠️', t: 'Build', d: 'Instructor ke saath live build — screen share, step-by-step, koi skip nahi.' },
    { i: '🎯', t: 'Practice', d: 'Har class mein “Your Turn” challenge aur daily homework with feedback.' },
    { i: '🚢', t: 'Ship', d: 'Har module ke end mein ek deployable project jo portfolio mein jaata hai.' },
  ],

  comparison: {
    cols: ['n8n', 'Zapier', 'Make'],
    rows: [
      ['Self-hosting option', '✅ Yes', '❌ No', '❌ No'],
      ['Pricing model', 'Per workflow execution / free self-host', 'Per task', 'Per operation'],
      ['Custom code (JS/Python)', '✅ Full Code node', '⚠️ Limited', '⚠️ Limited'],
      ['AI Agents + RAG built-in', '✅ Native LangChain nodes', '⚠️ Basic', '⚠️ Basic'],
      ['Complex branching & loops', '✅ Unlimited', '⚠️ Paths (limited)', '✅ Good'],
      ['Data privacy control', '✅ Full (your server)', '❌ Vendor', '❌ Vendor'],
      ['Best for', 'Power users, agencies, AI', 'Quick simple zaps', 'Visual mid-level flows'],
    ],
  },

  skills: ['Workflow design & process mapping', 'REST APIs & webhooks', 'JSON & data transformation', 'JavaScript in Code node', 'Prompt engineering', 'AI Agents & tools', 'RAG & vector databases', 'Docker self-hosting', 'Error handling & monitoring', 'CRM & marketing automation', 'Client discovery & scoping', 'Pricing & proposals'],

  classFormat: [
    { m: '0–10 min', t: 'Recap & Doubts', d: 'Pichhli class + homework review' },
    { m: '10–45 min', t: 'Concept', d: 'Visual explanation, real-life analogy' },
    { m: '45–90 min', t: 'Live Build', d: 'Instructor ke saath workflow banana' },
    { m: '90–110 min', t: 'Your Turn', d: 'Challenge / quiz / debug lab' },
    { m: '110–120 min', t: 'Q&A + Homework', d: 'Doubts, resources, next class preview' },
  ],

  projects: [
    { t: 'Daily Quote Mailer', c: 'basics', d: 'Schedule + API + email — pehla workflow.', day: 1 },
    { t: 'Smart Lead Router', c: 'business', d: 'Score ke hisaab se Slack, email ya archive.', day: 5 },
    { t: 'GST Invoice Calculator', c: 'basics', d: 'Code node se line items, tax & totals.', day: 6 },
    { t: 'Morning Briefing Bot', c: 'basics', d: 'Weather + news + rates → Telegram.', day: 7 },
    { t: 'Your Own REST API', c: 'business', d: 'Webhook + validation + JSON response.', day: 8 },
    { t: 'Appointment Booking Bot', c: 'business', d: 'Telegram → Calendar → reminders.', day: 9 },
    { t: 'Supabase Mini-CRM', c: 'business', d: 'DB + n8n API layer.', day: 10 },
    { t: '60-Second Lead Engine', c: 'business', d: 'Meta Ads → CRM → WhatsApp drip.', day: 11 },
    { t: 'Content Repurposer', c: 'ai', d: 'Blog → 5 platform posts with AI.', day: 12 },
    { t: 'Payment → Invoice PDF', c: 'business', d: 'Razorpay webhook → PDF → email.', day: 13 },
    { t: 'AI Inbox Triage', c: 'ai', d: 'Classify, sentiment, reply drafts.', day: 14 },
    { t: 'Telegram AI Assistant', c: 'ai', d: 'Agent with Calendar, Gmail, Sheets tools.', day: 15 },
    { t: 'RAG Support Bot', c: 'ai', d: 'Chat with company PDFs + citations.', day: 16 },
    { t: 'Invoice AI Extractor', c: 'ai', d: 'PDF → structured accounting data.', day: 17 },
    { t: 'Global Error Handler', c: 'devops', d: 'Alerts + retries for every workflow.', day: 18 },
    { t: 'Self-hosted n8n Server', c: 'devops', d: 'Docker + Postgres + domain + SSL.', day: 19 },
    { t: 'Git Backup Bot', c: 'devops', d: 'Nightly workflow export to GitHub.', day: 20 },
    { t: 'AI Support Desk', c: 'capstone', d: 'Multi-channel AI + escalation.', day: 21 },
    { t: 'AI Content Engine', c: 'capstone', d: 'Research → approve → publish.', day: 22 },
    { t: 'Ops Autopilot', c: 'capstone', d: 'Invoices, approvals, P&L summary.', day: 23 },
  ],

  capstone: {
    ideas: ['AI receptionist for clinics', 'Real-estate lead qualifier', 'Coaching institute admission bot', 'E-commerce order & support autopilot', 'Recruitment screening agent', 'Restaurant review & reputation manager'],
    rubric: [['Problem & business impact', 20], ['Architecture & design', 20], ['Working live demo', 25], ['Error handling & reliability', 15], ['Documentation & presentation', 20]],
  },

  journey: [
    { w: 'Day 0', t: 'Enroll & Onboard', d: 'Welcome kit, tools setup guide, community access, orientation call.' },
    { w: 'Week 1', t: 'Foundations', d: 'Pehla workflow, triggers, data model, expressions. Confidence build.' },
    { w: 'Week 2', t: 'Integrations', d: 'APIs, webhooks, Google, messaging, databases. Real apps connect.' },
    { w: 'Week 3', t: 'Business + AI', d: 'Lead engines, marketing, e-commerce, LLMs aur AI agents.' },
    { w: 'Week 4', t: 'Production', d: 'RAG, document AI, error handling, self-hosting, scaling.' },
    { w: 'Week 5', t: 'Projects + Career', d: '3 project sprints, freelancing masterclass, Demo Day.' },
    { w: 'Day 26+', t: 'Alumni Life', d: 'Certificate, portfolio, client referrals, alumni community, updates.' },
  ],

  journeyStages: [
    { id: 'before', i: '🔍', t: 'Before You Join', pts: ['Free demo class / webinar attend karo', 'Counsellor se 1:1 career call', 'Course brochure + curriculum review', 'Right plan choose karo (Recorded / Live / Pro)'] },
    { id: 'onboard', i: '🎒', t: 'Onboarding (Day 0)', pts: ['Welcome email + LMS login', 'WhatsApp/Discord community join', 'n8n Cloud trial + local install guide', 'Orientation: rules, schedule, buddy assigned'] },
    { id: 'w1', i: '🌱', t: 'Week 1 — Foundation', pts: ['Day 1 par pehla live workflow', 'Daily homework + mentor feedback', 'Module 1 quiz', '“Why automation” mindset shift'] },
    { id: 'w2', i: '🔗', t: 'Week 2 — Connect Everything', pts: ['Kisi bhi API ko connect karna', 'Apna REST API + webhooks', 'Google Workspace + Telegram bots', 'Database basics + mini CRM'] },
    { id: 'w3', i: '⚡', t: 'Week 3 — Business & AI', pts: ['Lead engine, marketing, e-commerce', 'Pehla AI workflow + prompt library', 'AI Agent with tools', 'Weekly doubt session + peer review'] },
    { id: 'w4', i: '🛡️', t: 'Week 4 — Go Production', pts: ['RAG chatbot apne data par', 'Document & voice AI', 'Error handling + self-hosting', 'Security & scaling audit'] },
    { id: 'w5', i: '🏆', t: 'Week 5 — Ship & Earn', pts: ['3 client-grade project sprints', 'Freelancing & agency masterclass', 'Capstone build + Demo Day', 'Certificate + graduation'] },
    { id: 'after', i: '🚀', t: 'After the Course', pts: ['Alumni community & job/freelance board', 'Course updates for new n8n features', 'Project referrals (Pro plan)', '90-day growth roadmap'] },
  ],

  careers: [
    { r: 'Automation Specialist', s: '₹4–8 LPA', d: 'Companies ke internal processes automate karna.' },
    { r: 'AI Workflow Engineer', s: '₹8–18 LPA', d: 'AI agents, RAG aur LLM pipelines production mein.' },
    { r: 'Freelance n8n Expert', s: '$25–$80 / hour', d: 'Upwork/Fiverr/direct clients ke liye projects.' },
    { r: 'RevOps / Marketing Ops', s: '₹6–14 LPA', d: 'CRM, lead routing, reporting automation.' },
    { r: 'Automation Agency Founder', s: '₹50k–5L+ / month', d: 'Retainer clients ke saath apni agency.' },
    { r: 'No-code Developer', s: '₹5–12 LPA', d: 'Internal tools, integrations, MVPs.' },
  ],

  freelanceSteps: [
    { t: 'Pick a niche', d: 'Real estate, clinics, coaching, e-commerce — ek choose karo.' },
    { t: 'Build 3 demo workflows', d: 'Course projects ko niche ke hisaab se customize karo.' },
    { t: 'Record Loom demos', d: '2–3 min video: problem → workflow → result.' },
    { t: 'Launch gigs & profile', d: 'Upwork, Fiverr, LinkedIn — templates hum denge.' },
    { t: 'Outreach daily', d: '10 personalized messages/day using our scripts.' },
    { t: 'Deliver & retain', d: 'Monthly maintenance retainers se recurring income.' },
  ],

  agency: [
    { t: 'Offer', d: 'Productized packages: Lead Engine, AI Receptionist, Ops Autopilot.' },
    { t: 'Pricing', d: 'Setup fee + monthly retainer. Value-based pricing frameworks.' },
    { t: 'Delivery SOP', d: 'Discovery → SRS → build → UAT → handover → support.' },
    { t: 'Tech stack', d: 'Self-hosted n8n per client, monitoring, backups.' },
    { t: 'Scale', d: 'Templates, junior hiring, white-label partnerships.' },
  ],

  toolGroups: [
    { g: 'Core n8n', items: ['Schedule', 'Webhook', 'HTTP Request', 'Code', 'IF', 'Switch', 'Merge', 'Loop', 'Wait', 'Edit Fields', 'Execute Workflow', 'Error Trigger'] },
    { g: 'Google & Microsoft', items: ['Gmail', 'Sheets', 'Drive', 'Docs', 'Calendar', 'Outlook', 'Excel 365', 'OneDrive'] },
    { g: 'Messaging', items: ['WhatsApp', 'Telegram', 'Slack', 'Discord', 'Twilio SMS', 'Email (SMTP)'] },
    { g: 'CRM & Sales', items: ['HubSpot', 'Zoho CRM', 'Pipedrive', 'Salesforce', 'Meta Lead Ads', 'Calendly'] },
    { g: 'AI & LLM', items: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Groq', 'Ollama', 'Whisper', 'MCP'] },
    { g: 'Data & Vector', items: ['Postgres', 'MySQL', 'Supabase', 'Airtable', 'Notion', 'Pinecone', 'Qdrant', 'Redis'] },
    { g: 'Commerce & Payments', items: ['Shopify', 'WooCommerce', 'Razorpay', 'Stripe', 'PayPal'] },
    { g: 'DevOps', items: ['Docker', 'GitHub', 'n8n API', 'Nginx/Caddy', 'Hostinger VPS'] },
  ],

  resourceLibrary: [
    { i: '📦', t: '120+ Workflow Templates', d: 'Har class ke JSON files — import karo aur chalao.' },
    { i: '🧾', t: 'Expressions Cheat Sheet', d: '50 most-used expressions ek page par.' },
    { i: '🧠', t: 'AI Prompt Library', d: '100+ tested prompts with JSON output formats.' },
    { i: '🗺️', t: 'Process Mapping Canvas', d: 'Client ke process ko workflow mein todne ka template.' },
    { i: '📑', t: 'SRS & Proposal Templates', d: 'Client requirement doc, proposal, contract.' },
    { i: '🐳', t: 'Docker Compose Files', d: 'n8n + Postgres + Redis production stack.' },
    { i: '🔐', t: 'Security Checklist', d: '25-point production audit checklist.' },
    { i: '🎥', t: 'Class Recordings', d: 'Har class ki HD recording + chapters.' },
    { i: '📝', t: 'Class Notes PDFs', d: 'Har din ke concise notes + diagrams.' },
    { i: '❓', t: 'Quiz Bank', d: '8 module quizzes + final assessment.' },
    { i: '💬', t: 'Outreach Scripts', d: 'LinkedIn, email, WhatsApp cold messages.' },
    { i: '📊', t: 'Pricing Calculator', d: 'Project quote banane ka spreadsheet.' },
  ],

  downloads: [
    ['Course Brochure (PDF)', 'brochure'],
    ['25-Day Curriculum Sheet', 'curriculum'],
    ['Pre-course Setup Guide', 'setup'],
    ['Expressions Cheat Sheet', 'cheatsheet'],
    ['Sample Workflow Pack (5 JSON)', 'samples'],
    ['Career Roadmap Poster', 'roadmap'],
  ],

  templatePacks: [
    { t: 'Lead Gen Pack', n: 18, d: 'Forms, ads, enrichment, CRM, drips.' },
    { t: 'AI Agents Pack', n: 22, d: 'Assistants, RAG, extractors, classifiers.' },
    { t: 'Marketing Pack', n: 16, d: 'Social, content, newsletters, reports.' },
    { t: 'E-commerce Pack', n: 14, d: 'Orders, carts, inventory, invoices.' },
    { t: 'Ops & Finance Pack', n: 15, d: 'Approvals, reminders, reconciliation.' },
    { t: 'DevOps Pack', n: 10, d: 'Error handling, backups, monitoring.' },
    { t: 'Messaging Pack', n: 13, d: 'WhatsApp, Telegram, Slack bots.' },
    { t: 'Utilities Pack', n: 12, d: 'Date, text, file & data helpers.' },
  ],

  prompts: [
    { t: 'Lead Classifier', p: 'You are a sales analyst. Classify this lead as HOT, WARM or COLD based on budget, urgency and fit. Return JSON: {"score":0-100,"label":"","reason":""}.' },
    { t: 'Support Reply', p: 'You are a friendly support agent for {{brand}}. Using ONLY the context, answer in the customer\'s language. If unsure, say you will escalate.' },
    { t: 'Invoice Extractor', p: 'Extract vendor, invoice_no, date (YYYY-MM-DD), subtotal, gst, total from this text. Return strict JSON, null for missing.' },
    { t: 'Content Repurposer', p: 'Turn this blog into: 1 LinkedIn post (150 words), 1 X thread (5 tweets), 1 Instagram caption with 10 hashtags. Keep brand voice: {{voice}}.' },
  ],

  cheatsheet: [
    ['{{ $json.email }}', 'Current item ka field'],
    ['{{ $("Webhook").item.json.body.name }}', 'Kisi aur node ka data'],
    ['{{ $now.toFormat("dd-MM-yyyy") }}', 'Aaj ki date format'],
    ['{{ $json.name.toLowerCase().toTitleCase() }}', 'Proper case (pehle lowercase)'],
    ['{{ $json.items.length }}', 'Array length'],
    ['{{ $json.price * 1.18 }}', 'GST add karna'],
    ['{{ $json.tags.join(", ") }}', 'Array → text'],
    ['{{ $input.all().length }}', 'Total items'],
    ['{{ $json.phone.replace(/\\D/g, "") }}', 'Sirf digits'],
    ['{{ $today.minus({days: 7}).toISO() }}', '7 din pehle'],
  ],

  officialLinks: [
    ['n8n Documentation', 'https://docs.n8n.io/'],
    ['n8n Workflow Templates', 'https://n8n.io/workflows/'],
    ['n8n Community Forum', 'https://community.n8n.io/'],
    ['n8n GitHub', 'https://github.com/n8n-io/n8n'],
    ['n8n YouTube', 'https://www.youtube.com/@n8n-io'],
    ['n8n Integrations', 'https://n8n.io/integrations/'],
    ['n8n Release Notes', 'https://docs.n8n.io/release-notes/'],
    ['Docker Docs', 'https://docs.docker.com/'],
  ],

  selfHostSteps: [
    { t: 'Get a VPS', c: 'Ubuntu 22.04+, 2 vCPU, 4 GB RAM (Hostinger KVM 2 ya koi bhi)' },
    { t: 'Install Docker', c: 'curl -fsSL https://get.docker.com | sh' },
    { t: 'Create docker-compose.yml', c: 'services: n8n + postgres (course pack mein ready file)' },
    { t: 'Point your domain', c: 'A record: n8n.yourdomain.com → VPS IP' },
    { t: 'Add reverse proxy + SSL', c: 'Caddy / Nginx + Let\'s Encrypt' },
    { t: 'Launch & secure', c: 'docker compose up -d · set N8N_ENCRYPTION_KEY · backups' },
  ],

  requirements: [
    { t: 'Laptop / Desktop', d: 'Windows, macOS ya Linux — 8 GB RAM recommended (4 GB bhi chalega).' },
    { t: 'Internet', d: 'Stable 10 Mbps+ connection live classes ke liye.' },
    { t: 'Browser', d: 'Latest Chrome / Edge / Firefox.' },
    { t: 'Accounts', d: 'Gmail, n8n Cloud trial (free), GitHub, Telegram.' },
    { t: 'Optional', d: 'OpenAI/Gemini API key (~₹500 credit poore course ke liye kaafi).' },
    { t: 'Skills', d: 'Zero coding needed. Basic computer + English/Hindi samajh.' },
  ],

  preChecklist: ['Gmail account ready', 'n8n Cloud trial created', 'Node.js LTS installed (optional)', 'Telegram installed', 'GitHub account', 'Notebook for notes', 'Community joined', 'Orientation attended'],

  assessments: [
    { t: 'Daily Homework', w: '25%', d: 'Har class ke baad ek practical task.' },
    { t: 'Module Quizzes', w: '15%', d: '8 quizzes, 15 questions each.' },
    { t: 'Project Sprints', w: '25%', d: '3 guided project submissions.' },
    { t: 'Capstone', w: '30%', d: 'Demo Day presentation + live run.' },
    { t: 'Participation', w: '5%', d: 'Attendance, community help, peer reviews.' },
  ],

  certLevels: [
    { t: 'Certificate of Completion', r: '60%+ score & 80% attendance' },
    { t: 'Certificate of Merit', r: '80%+ score' },
    { t: 'Top Automator Award', r: 'Top 3 capstones per batch' },
  ],

  support: [
    { i: '💬', t: 'Community Doubts', d: 'WhatsApp/Discord par mentors 12-hr ke andar reply.' },
    { i: '🎙️', t: 'Weekly Doubt Session', d: 'Har Saturday 1 hour live open Q&A.' },
    { i: '🧑‍🏫', t: 'Homework Review', d: 'Har submission par written/voice feedback.' },
    { i: '🤝', t: 'Study Buddy', d: 'Har student ko ek accountability partner.' },
    { i: '📞', t: '1:1 Calls (Pro)', d: '4 private mentorship calls.' },
    { i: '🐞', t: 'Debug Clinic', d: 'Screen share karke workflow fix karwao.' },
  ],

  community: [
    { t: 'Private Community', d: 'Batch-mates, alumni aur mentors ek jagah.' },
    { t: 'Weekly Challenges', d: 'Fun automation challenges with leaderboard.' },
    { t: 'Job & Gig Board', d: 'Freelance projects aur job openings share hote hain.' },
    { t: 'Alumni Meetups', d: 'Online meetups & guest sessions.' },
  ],

  liveFeatures: [
    { t: 'Interactive Zoom Classes', d: 'Polls, breakout rooms, screen-share debugging.' },
    { t: 'Live Coding, No Slides', d: '80% time n8n canvas par.' },
    { t: 'Real-time Q&A', d: 'Chat mein doubt, turant jawab.' },
    { t: 'Class Checkpoints', d: 'Har 20 min par sync check — koi peeche nahi chhootega.' },
  ],

  lms: [
    'HD recordings with chapters & timestamps',
    'Lifetime access + future n8n updates',
    'Downloadable notes, templates & JSON files',
    'Progress tracking & completion badges',
    'Mobile-friendly — kahin bhi dekho',
    'Searchable resource library',
  ],

  bonuses: [
    { t: 'AI Agents Masterclass', v: '₹4,999', d: 'Advanced multi-agent systems (bonus 3-hr session).' },
    { t: 'Agency Starter Kit', v: '₹2,999', d: 'Proposal, contract, SOP, pricing sheets.' },
    { t: '120+ Template Vault', v: '₹7,999', d: 'Production-ready workflow JSON files.' },
    { t: 'Prompt Library', v: '₹1,999', d: '100+ tested business prompts.' },
    { t: 'VPS Setup Script', v: '₹1,499', d: 'One-command n8n production setup.' },
    { t: 'Interview Prep Pack', v: '₹1,999', d: 'Automation interview Q&A + mock tasks.' },
  ],

  hackathon: [
    { t: 'Mid-course Hackathon', d: 'Day 13 ke baad weekend: 6-hour team challenge.' },
    { t: 'Real Problem Statements', d: 'Local businesses ke actual problems.' },
    { t: 'Prizes & Recognition', d: 'Top teams ko certificates + LinkedIn shoutout.' },
    { t: 'Demo Day', d: 'Day 25: capstone showcase in front of mentors & guests.' },
  ],

  industries: [
    { i: '🏥', t: 'Healthcare & Clinics', u: ['Appointment booking bot', 'Reminder & follow-ups', 'Patient feedback'] },
    { i: '🏠', t: 'Real Estate', u: ['Lead qualifier', 'Site-visit scheduling', 'Property alerts'] },
    { i: '🎓', t: 'Education & Coaching', u: ['Admission funnel', 'Fee reminders', 'Attendance reports'] },
    { i: '🛒', t: 'E-commerce', u: ['Order updates', 'Abandoned cart', 'Review requests'] },
    { i: '🍽️', t: 'Restaurants', u: ['Reservation bot', 'Review management', 'Daily sales report'] },
    { i: '💰', t: 'Finance & CA Firms', u: ['Invoice extraction', 'GST reminders', 'Client document collection'] },
    { i: '🧑‍💼', t: 'HR & Recruitment', u: ['Resume screening AI', 'Interview scheduling', 'Onboarding'] },
    { i: '📢', t: 'Agencies & Marketing', u: ['Client reporting', 'Content pipelines', 'Lead routing'] },
  ],

  aiSpotlight: [
    { t: 'AI Agent Node', d: 'Agent jo khud decide kare kaunsa tool use karna hai.' },
    { t: 'Memory', d: 'Conversation yaad rakhne wale chatbots.' },
    { t: 'Vector Stores', d: 'Apne documents par semantic search.' },
    { t: 'Tools & MCP', d: 'Agents ko APIs, DBs aur workflows ka access.' },
    { t: 'Structured Output', d: 'AI se reliable JSON — automation ke liye perfect.' },
    { t: 'Multi-Agent', d: 'Researcher + writer + reviewer agents ek saath.' },
  ],

  // SAMPLE testimonials — replace with real ones before launch
  testimonials: [
    { n: 'Student Name', r: 'Digital Marketer', q: 'Lead follow-up ka kaam jo 3 ghante leta tha, ab automatic hota hai. Day 11 ka lead engine directly client ko bech diya.', s: 5 },
    { n: 'Student Name', r: 'B.Tech Final Year', q: 'Coding se darr lagta tha, par Code node class ke baad confidence aa gaya. Capstone ki wajah se internship mili.', s: 5 },
    { n: 'Student Name', r: 'Clinic Owner', q: 'Appointment bot ne receptionist ka aadha kaam le liya. Patients ko reminders time par jaate hain.', s: 5 },
    { n: 'Student Name', r: 'Freelancer', q: 'Fiverr gig course ke dauraan hi live kiya, pehla $150 ka order 2nd week mein aaya.', s: 5 },
    { n: 'Student Name', r: 'Operations Manager', q: 'Self-hosting class best thi. Ab company ka apna n8n server hai, Zapier bill zero.', s: 5 },
    { n: 'Student Name', r: 'Content Creator', q: 'Content engine se ek blog se poore hafte ke posts ban jaate hain. Game changer.', s: 5 },
  ],

  // SAMPLE case studies — replace with real ones before launch
  stories: [
    { t: 'From marketer to automation freelancer', b: '₹0 → ₹60k/month', d: 'Lead engine + WhatsApp bot ko 3 local businesses ko retainer par becha.' },
    { t: 'Student to AI Workflow intern', b: 'Internship in 30 days', d: 'RAG support bot capstone ne interview mein selection dilaya.' },
    { t: 'Business owner saved 25 hrs/week', b: '25 hrs/week saved', d: 'Orders, invoices aur reports pura automate.' },
  ],

  batches: [
    { name: 'Evening Batch', start: '01 Dec 2026', time: '7–9 PM IST, Mon–Fri', seats: 'Filling fast' },
    { name: 'Weekend Intensive', start: '05 Dec 2026', time: 'Sat–Sun, 10 AM–2 PM', seats: 'Limited seats' },
    { name: 'Morning Batch', start: '05 Jan 2027', time: '7–9 AM IST, Mon–Fri', seats: 'Open' },
  ],

  emi: [
    { t: 'UPI / Cards / Netbanking', d: 'One-time payment via Razorpay.' },
    { t: 'No-cost EMI', d: '3 / 6 months on major credit cards.' },
    { t: 'Split Payment', d: '2 installments — 50% now, 50% after Day 10.' },
    { t: 'Corporate Billing', d: 'GST invoice for companies & teams.' },
  ],

  selfVsCourse: [
    ['Structure', 'Random videos, no order', '25-day step-by-step roadmap'],
    ['Projects', 'Toy examples', '20 real business projects'],
    ['Doubts', 'Comment karke wait', 'Mentor reply in 12 hrs'],
    ['AI & Agents', 'Outdated quickly', 'Latest n8n AI nodes'],
    ['Career', 'Khud figure out karo', 'Freelancing + agency playbook'],
    ['Proof', 'Kuch nahi', 'Certificate + capstone portfolio'],
  ],

  faqs: [
    ['Kya coding aani zaroori hai?', 'Bilkul nahi. Course zero se start hota hai. Day 6 par basic JavaScript bhi itni simple tarike se sikhaate hain ki non-tech students bhi comfortable ho jaate hain.'],
    ['Classes live hain ya recorded?', 'Live Cohort aur Pro plan mein 25 live classes (2 ghante each) hoti hain, aur har class ki recording lifetime milti hai. Recorded plan mein sirf recordings hain.'],
    ['Agar koi class miss ho jaaye?', 'Recording same din LMS par upload hoti hai. Doubts aap community ya weekly doubt session mein pooch sakte ho.'],
    ['n8n free hai kya?', 'n8n self-hosted Community Edition free hai. n8n Cloud ka free trial milta hai. Course mein hum dono use karte hain aur self-hosting bhi sikhaate hain.'],
    ['AI tools ke liye paise lagenge?', 'OpenAI/Gemini API ke liye thoda credit (approx ₹300–500) poore course ke liye kaafi hai. Free options (Gemini free tier, Groq, Ollama) bhi dikhaate hain.'],
    ['Certificate milega?', 'Haan, 60%+ score aur 80% attendance par verified certificate. Top performers ko merit certificate.'],
    ['Course ke baad kya job milegi?', 'Hum placement guarantee nahi dete, par portfolio, freelancing playbook, interview prep aur referrals (Pro) ke saath aapko poori tayyari karwate hain.'],
    ['Laptop ki kya requirement hai?', 'Koi bhi laptop jismein latest browser chalta ho. 8 GB RAM recommended, par 4 GB par bhi n8n Cloud aaram se chalta hai.'],
    ['Language kya hogi?', 'Hinglish (Hindi + English mix). Notes aur resources English mein.'],
    ['Refund policy kya hai?', 'Pehli 2 live classes attend karne ke baad agar course pasand na aaye, to 7 din ke andar full refund.'],
    ['Kya main apna business automate kar sakta hoon?', 'Yahi to goal hai! Homework aur capstone aap apne business ke liye bana sakte ho.'],
    ['Updates milenge?', 'n8n tezi se update hota hai. Naye features par bonus sessions aur updated recordings alumni ko free milti hain.'],
  ],

  glossary: [
    ['Workflow', 'Nodes ka connected sequence jo ek task automate karta hai.'],
    ['Node', 'Workflow ka ek step — trigger, action ya logic.'],
    ['Trigger', 'Woh event jo workflow start karta hai.'],
    ['Item', 'n8n mein data ki ek unit (JSON object).'],
    ['Expression', '{{ }} ke andar dynamic value / code.'],
    ['Credential', 'App ka secure login (API key / OAuth).'],
    ['Webhook', 'URL jis par koi app data bhejta hai.'],
    ['Execution', 'Workflow ka ek run.'],
    ['Sub-workflow', 'Doosre workflow se call hone wala reusable workflow.'],
    ['AI Agent', 'LLM jo tools use karke tasks complete karta hai.'],
    ['RAG', 'Retrieval Augmented Generation — apne data se AI answers.'],
    ['Vector Store', 'Embeddings store karne wala database.'],
    ['Queue Mode', 'Multiple workers ke saath n8n ko scale karna.'],
    ['Binary Data', 'Files — PDF, images, audio — workflow mein.'],
    ['Pinning', 'Test ke liye node ka output freeze karna.'],
    ['Self-hosting', 'n8n ko apne server par chalana.'],
  ],

  rules: [
    'Camera optional, par participation zaroori',
    'Har class se pehle 10 min pichhla recap dekho',
    'Homework 24 ghante ke andar submit karo',
    'Doubts ko screenshot + error message ke saath poocho',
    'Kisi ke credentials/API keys kabhi share mat karo',
    'Community mein respectful raho — sab seekh rahe hain',
  ],

  enrollSteps: [
    { t: 'Choose Plan', d: 'Recorded, Live ya Pro.' },
    { t: 'Fill the Form', d: 'Naam, phone, email — 30 seconds.' },
    { t: 'Counsellor Call', d: 'Hum aapko call karke doubts clear karenge.' },
    { t: 'Pay & Onboard', d: 'Payment ke baad welcome kit + community access.' },
  ],

  guarantee: {
    t: '7-Day “Love It or Leave It” Guarantee',
    d: 'Pehli 2 live classes attend karo. Agar lage ki course aapke liye nahi hai, to 7 din ke andar ek message karo — full refund, koi sawaal nahi.',
  },
};
