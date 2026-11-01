// ============================================================
//  NODES LIBRARY — 100 n8n nodes jo har automator ko aane chahiye
//  tier: 1 = Top 10 "har project mein", 2 = Top 50 must-know, 3 = Top 100
//  kind: trigger | core | data | app | ai-root | ai-sub
// ============================================================
const D = 'https://docs.n8n.io/integrations/builtin';
const url = {
  core: (s) => `${D}/core-nodes/n8n-nodes-base.${s}/`,
  app: (s) => `${D}/app-nodes/n8n-nodes-base.${s}/`,
  trig: (s) => `${D}/trigger-nodes/n8n-nodes-base.${s}/`,
  lcCore: (s) => `${D}/core-nodes/n8n-nodes-langchain.${s}/`,
  lcApp: (s) => `${D}/app-nodes/n8n-nodes-langchain.${s}/`,
  root: (s) => `${D}/cluster-nodes/root-nodes/n8n-nodes-langchain.${s}/`,
  sub: (s) => `${D}/cluster-nodes/sub-nodes/n8n-nodes-langchain.${s}/`,
};

const nodeTypes = [
  { k: 'trigger', i: '⚡', t: 'Trigger Nodes', d: 'Workflow ko START karte hain. Har workflow mein kam se kam ek trigger hota hai — time (Schedule), event (Webhook, app event) ya manual click.', ex: 'Naya form submit hua → workflow chalu', docs: `${D}/trigger-nodes/` },
  { k: 'core', i: '🧠', t: 'Core / Flow Nodes', d: 'Workflow ka dimaag — IF, Switch, Merge, Loop, Wait. Yeh decide karte hain data kis raaste jayega aur kab.', ex: 'Lead score > 70 hai to Sales ko bhejo', docs: `${D}/core-nodes/` },
  { k: 'data', i: '🧹', t: 'Data Transformation Nodes', d: 'Data ko clean, reshape, filter, sort, aggregate karte hain. Edit Fields, Code, Split Out, Aggregate yahin aate hain.', ex: 'Naam ko Proper Case, phone ko +91 format', docs: 'https://docs.n8n.io/data/' },
  { k: 'app', i: '🔌', t: 'App / Action Nodes', d: 'Bahar ki apps se baat karte hain — Gmail, Sheets, Slack, HubSpot, Shopify. 1000+ ready-made integrations.', ex: 'Google Sheet mein nayi row add karo', docs: `${D}/app-nodes/` },
  { k: 'ai-root', i: '🤖', t: 'AI Root (Cluster) Nodes', d: 'AI ka main node — AI Agent, LLM Chain, Vector Store. Inke andar sub-nodes plug hote hain.', ex: 'AI Agent jo customer ka sawaal samjhe', docs: `${D}/cluster-nodes/root-nodes/` },
  { k: 'ai-sub', i: '🧩', t: 'AI Sub-Nodes', d: 'Root node ki "capabilities": chat model (OpenAI/Claude/Gemini), memory, tools, embeddings, output parser.', ex: 'Agent ko Calculator tool + memory dena', docs: `${D}/cluster-nodes/sub-nodes/` },
];

// [name, docsUrl, kind, category, kya karta hai (Hinglish), real use-case, tier, day]
const raw = [
  // ---------- TRIGGERS ----------
  ['Manual Trigger', url.core('manualworkflowtrigger'), 'trigger', 'Triggers', 'Button dabane par workflow chalata hai — testing ke liye best.', 'Naya workflow banate waqt test run', 1, 1],
  ['Schedule Trigger', url.core('scheduletrigger'), 'trigger', 'Triggers', 'Fixed time/interval par workflow chalata hai (cron bhi).', 'Roz subah 9 baje sales report', 1, 1],
  ['Webhook', url.core('webhook'), 'trigger', 'Triggers', 'Ek URL deta hai; koi bhi app us par data bheje to workflow chalu.', 'Website form → n8n', 1, 8],
  ['n8n Form Trigger', url.core('formtrigger'), 'trigger', 'Triggers', 'Bina coding ke hosted form banata hai aur submission par chalta hai.', 'Lead / feedback form', 2, 2],
  ['Chat Trigger', url.lcCore('chattrigger'), 'trigger', 'Triggers', 'Chat window deta hai jo AI Agent se baat karti hai; website par embed ho sakti hai.', 'Website support chatbot', 2, 15],
  ['Error Trigger', url.core('errortrigger'), 'trigger', 'Triggers', 'Kisi workflow ke fail hone par chalta hai — global error handler.', 'Fail par Telegram alert', 2, 18],
  ['Execute Workflow Trigger', url.core('executeworkflowtrigger'), 'trigger', 'Triggers', 'Sub-workflow ka entry point — doosra workflow ise call karta hai.', 'Reusable "send WhatsApp" module', 3, 18],
  ['Email Trigger (IMAP)', url.core('emailimap'), 'trigger', 'Triggers', 'Kisi bhi mailbox mein naya email aane par chalta hai.', 'Support inbox automation', 3, 9],
  ['RSS Feed Trigger', url.core('rssfeedreadtrigger'), 'trigger', 'Triggers', 'RSS feed mein naya item aate hi chalta hai.', 'Naya blog post → social post', 3, 12],
  ['n8n Trigger', url.core('n8ntrigger'), 'trigger', 'Triggers', 'n8n ke events (workflow activate/update) par chalta hai.', 'Workflow update hone par backup', 3, 20],
  ['Gmail Trigger', url.trig('gmailtrigger'), 'trigger', 'Triggers', 'Gmail mein naya email (filter ke saath) aane par.', 'Invoice email → AI extraction', 2, 17],
  ['Google Sheets Trigger', url.trig('googlesheetstrigger'), 'trigger', 'Triggers', 'Sheet mein row add/update hone par chalta hai.', 'Nayi lead row → WhatsApp', 3, 9],
  ['Facebook Lead Ads Trigger', url.trig('facebookleadadstrigger'), 'trigger', 'Triggers', 'Meta lead form submit hote hi lead deta hai.', '60-second lead follow-up', 3, 11],
  ['Telegram Trigger', url.trig('telegramtrigger'), 'trigger', 'Triggers', 'Telegram bot ko message aane par chalta hai.', 'Telegram AI assistant', 2, 9],
  ['Typeform Trigger', url.trig('typeformtrigger'), 'trigger', 'Triggers', 'Typeform response aane par.', 'Survey → CRM', 3, 11],
  ['Calendly Trigger', url.trig('calendlytrigger'), 'trigger', 'Triggers', 'Meeting book/cancel hone par.', 'Booking → reminder + CRM', 3, 9],
  ['Stripe Trigger', url.trig('stripetrigger'), 'trigger', 'Triggers', 'Payment / subscription events par.', 'Payment → invoice email', 3, 13],
  ['Shopify Trigger', url.trig('shopifytrigger'), 'trigger', 'Triggers', 'Naya order, customer, product events.', 'Order → WhatsApp confirmation', 3, 13],
  // ---------- CORE / FLOW ----------
  ['IF', url.core('if'), 'core', 'Flow logic', 'Condition true/false ke hisaab se 2 raaste banata hai.', 'Paid hai? → invoice, warna reminder', 1, 5],
  ['Switch', url.core('switch'), 'core', 'Flow logic', 'Multiple raaste (cases) — value ke hisaab se routing.', 'Hot/Warm/Cold lead routing', 2, 5],
  ['Merge', url.core('merge'), 'core', 'Flow logic', 'Do branches ka data jodta hai — append, by key, combine.', 'CRM + Sheet data ek saath', 2, 5],
  ['Loop Over Items (Split in Batches)', url.core('splitinbatches'), 'core', 'Flow logic', 'Items ko batches mein process karta hai — rate limits ke liye.', '1000 emails 50-50 karke bhejna', 2, 5],
  ['Wait', url.core('wait'), 'core', 'Flow logic', 'Time ya webhook/approval tak workflow ko rokta hai.', '3 din baad follow-up', 2, 5],
  ['Filter', url.core('filter'), 'core', 'Flow logic', 'Sirf condition match karne wale items aage bhejta hai.', 'Sirf India ke leads', 2, 5],
  ['No Operation, do nothing', url.core('noop'), 'core', 'Flow logic', 'Kuch nahi karta — branch end/label ke liye.', 'IF ka "false" branch band karna', 3, 5],
  ['Stop and Error', url.core('stopanderror'), 'core', 'Flow logic', 'Custom error throw karke workflow rokta hai.', 'Invalid data par fail karna', 3, 18],
  ['Execute Workflow (Sub-workflow)', url.core('executeworkflow'), 'core', 'Flow logic', 'Doosre workflow ko call karta hai — reusable modules.', 'Common "notify" workflow', 2, 18],
  ['Respond to Webhook', url.core('respondtowebhook'), 'core', 'Flow logic', 'Webhook caller ko custom response (JSON/HTML) deta hai.', 'Apna REST API banana', 2, 8],
  ['Execution Data', url.core('executiondata'), 'core', 'Flow logic', 'Execution par custom data save karta hai — search/debug ke liye.', 'Order ID se execution dhoondhna', 3, 20],
  // ---------- DATA ----------
  ['Edit Fields (Set)', url.core('set'), 'data', 'Data transformation', 'Fields add/rename/remove karta hai — sabse zyada use hone wala node.', 'Clean lead object banana', 1, 4],
  ['Code', url.core('code'), 'data', 'Data transformation', 'JavaScript/Python likh ke kuch bhi transform karo.', 'GST calculation, custom parsing', 1, 6],
  ['Split Out', url.core('splitout'), 'data', 'Data transformation', 'Ek item ke andar ki list ko alag items mein todta hai.', 'Order ke line items alag karna', 2, 3],
  ['Aggregate', url.core('aggregate'), 'data', 'Data transformation', 'Kai items ko ek item (list) mein jodta hai.', 'Saare leads ek email mein', 2, 3],
  ['Summarize', url.core('summarize'), 'data', 'Data transformation', 'Pivot table jaisa — count, sum, average group-wise.', 'City-wise sales total', 2, 3],
  ['Remove Duplicates', url.core('removeduplicates'), 'data', 'Data transformation', 'Duplicate items hatata hai (abhi aur past executions mein bhi).', 'Same lead dobara na jaaye', 2, 5],
  ['Sort', url.core('sort'), 'data', 'Data transformation', 'Items ko field ke hisaab se sort karta hai.', 'Top 10 customers', 3, 5],
  ['Limit', url.core('limit'), 'data', 'Data transformation', 'Pehle/aakhri N items rakhta hai.', 'Sirf latest 5 news', 3, 5],
  ['Date & Time', url.core('datetime'), 'data', 'Data transformation', 'Dates format, add/subtract, timezone convert.', '"3 din baad" ki date', 2, 4],
  ['Crypto', url.core('crypto'), 'data', 'Data transformation', 'Hash, HMAC, random string, encryption.', 'Webhook signature verify', 3, 8],
  ['HTML', url.core('html'), 'data', 'Data transformation', 'HTML se data extract (CSS selector) ya HTML template banana.', 'Website scraping, email template', 3, 7],
  ['XML', url.core('xml'), 'data', 'Data transformation', 'XML ↔ JSON convert.', 'Purane ERP ka data', 3, 7],
  ['Markdown', url.core('markdown'), 'data', 'Data transformation', 'Markdown ↔ HTML convert.', 'AI output ko email HTML banana', 3, 14],
  ['Compare Datasets', url.core('comparedatasets'), 'data', 'Data transformation', 'Do lists compare — kya naya, kya badla, kya missing.', 'Inventory sync', 3, 10],
  ['Rename Keys', url.core('renamekeys'), 'data', 'Data transformation', 'Field names badalta hai.', 'API format match karna', 3, 4],
  ['Extract from File', url.core('extractfromfile'), 'data', 'Files', 'PDF, CSV, Excel, JSON file se data nikaalta hai.', 'CSV upload process karna', 2, 3],
  ['Convert to File', url.core('converttofile'), 'data', 'Files', 'JSON data ko CSV/Excel/JSON/HTML file banata hai.', 'Report ko Excel attach karna', 2, 13],
  ['Read/Write Files from Disk', url.core('readwritefile'), 'data', 'Files', 'Server disk par file read/write (self-hosted).', 'Local backups', 3, 19],
  ['Compression', url.core('compression'), 'data', 'Files', 'ZIP/GZIP banana ya kholna.', 'Multiple files ek zip mein', 3, 13],
  ['Edit Image', url.core('editimage'), 'data', 'Files', 'Image resize, crop, text/watermark.', 'Social post image par logo', 3, 12],
  // ---------- NETWORK / UTIL ----------
  ['HTTP Request', url.core('httprequest'), 'core', 'Network', 'Kisi bhi API ko call karo — n8n ka "universal connector".', 'Jis app ka node nahi, uski API', 1, 7],
  ['Send Email (SMTP)', url.core('sendemail'), 'core', 'Network', 'Kisi bhi SMTP se email bhejta hai.', 'Custom domain se emails', 2, 1],
  ['GraphQL', url.core('graphql'), 'core', 'Network', 'GraphQL APIs ko query karta hai.', 'Shopify Admin GraphQL', 3, 7],
  ['FTP', url.core('ftp'), 'core', 'Network', 'FTP/SFTP se files upload/download.', 'Supplier ka daily stock file', 3, 13],
  ['SSH', url.core('ssh'), 'core', 'Network', 'Server par command chalana.', 'Server backup script', 3, 19],
  ['n8n (API node)', url.core('n8n'), 'core', 'Network', 'Apne n8n instance ke workflows/executions manage karo.', 'Nightly workflow export', 3, 20],
  // ---------- APPS ----------
  ['Google Sheets', url.app('googlesheets'), 'app', 'Google & Microsoft', 'Rows read, append, update, upsert — beginner ka database.', 'Leads sheet / reports', 1, 9],
  ['Gmail', url.app('gmail'), 'app', 'Google & Microsoft', 'Email bhejo, padho, label lagao, reply karo.', 'Auto-reply + labels', 1, 9],
  ['Google Drive', url.app('googledrive'), 'app', 'Google & Microsoft', 'Files upload/download/move/share.', 'Invoices month-wise folder', 2, 9],
  ['Google Calendar', url.app('googlecalendar'), 'app', 'Google & Microsoft', 'Events create/check availability.', 'Appointment booking', 2, 9],
  ['Google Docs', url.app('googledocs'), 'app', 'Google & Microsoft', 'Docs create/update — templates se documents.', 'Proposal auto-generate', 3, 9],
  ['Microsoft Outlook', url.app('microsoftoutlook'), 'app', 'Google & Microsoft', 'Outlook mail, calendar, contacts.', 'Corporate email automation', 3, 9],
  ['Microsoft Excel 365', url.app('microsoftexcel'), 'app', 'Google & Microsoft', 'Excel online sheets read/write.', 'Finance team reports', 3, 13],
  ['Slack', url.app('slack'), 'app', 'Messaging', 'Messages, channels, interactive buttons.', 'Sales team alert', 2, 9],
  ['Telegram', url.app('telegram'), 'app', 'Messaging', 'Bot se message, photo, document, buttons bhejo.', 'Owner ko instant alerts', 2, 9],
  ['WhatsApp Business Cloud', url.app('whatsapp'), 'app', 'Messaging', 'WhatsApp template/text messages (Meta Cloud API).', 'Lead ko instant WhatsApp', 2, 9],
  ['Discord', url.app('discord'), 'app', 'Messaging', 'Discord channel messages/webhooks.', 'Community notifications', 3, 9],
  ['Twilio', url.app('twilio'), 'app', 'Messaging', 'SMS / WhatsApp / calls via Twilio.', 'OTP / SMS reminders', 3, 9],
  ['Notion', url.app('notion'), 'app', 'Databases & productivity', 'Notion databases mein pages create/update.', 'Content calendar', 2, 10],
  ['Airtable', url.app('airtable'), 'app', 'Databases & productivity', 'Airtable records CRUD.', 'No-code CRM', 2, 10],
  ['Postgres', url.app('postgres'), 'app', 'Databases & productivity', 'SQL queries, insert, upsert — production database.', 'App backend data', 2, 10],
  ['MySQL', url.app('mysql'), 'app', 'Databases & productivity', 'MySQL database operations.', 'WordPress / legacy DB', 3, 10],
  ['MongoDB', url.app('mongodb'), 'app', 'Databases & productivity', 'NoSQL documents CRUD.', 'Event logs store', 3, 10],
  ['Redis', url.app('redis'), 'app', 'Databases & productivity', 'Fast key-value cache, counters, locks.', 'Rate limit / dedupe', 3, 20],
  ['Supabase', url.app('supabase'), 'app', 'Databases & productivity', 'Supabase (Postgres) rows CRUD.', 'Mini CRM backend', 3, 10],
  ['HubSpot', url.app('hubspot'), 'app', 'CRM & sales', 'Contacts, deals, companies manage.', 'Lead → deal pipeline', 2, 11],
  ['Zoho CRM', url.app('zohocrm'), 'app', 'CRM & sales', 'Zoho leads, contacts, deals.', 'Indian SMB CRM sync', 3, 11],
  ['Pipedrive', url.app('pipedrive'), 'app', 'CRM & sales', 'Deals, persons, activities.', 'Sales follow-up tasks', 3, 11],
  ['Salesforce', url.app('salesforce'), 'app', 'CRM & sales', 'Enterprise CRM objects.', 'Enterprise lead sync', 3, 11],
  ['Shopify', url.app('shopify'), 'app', 'Commerce', 'Orders, products, customers.', 'Order status updates', 3, 13],
  ['WooCommerce', url.app('woocommerce'), 'app', 'Commerce', 'WordPress store orders/products.', 'Woo order → WhatsApp', 3, 13],
  ['Stripe', url.app('stripe'), 'app', 'Commerce', 'Customers, charges, invoices.', 'Subscription management', 3, 13],
  ['GitHub', url.app('github'), 'app', 'Dev & project', 'Files, issues, releases manage.', 'Workflow backup to repo', 3, 20],
  ['ClickUp', url.app('clickup'), 'app', 'Dev & project', 'Tasks, lists create/update.', 'Client onboarding tasks', 3, 23],
  ['Trello', url.app('trello'), 'app', 'Dev & project', 'Cards, lists, boards.', 'Content pipeline board', 3, 22],
  ['Mailchimp', url.app('mailchimp'), 'app', 'Marketing', 'Audience members, tags, campaigns.', 'Newsletter signup sync', 3, 12],
  ['LinkedIn', url.app('linkedin'), 'app', 'Marketing', 'Profile/company page par post.', 'Auto LinkedIn posting', 3, 12],
  // ---------- AI ----------
  ['AI Agent', url.root('agent'), 'ai-root', 'AI', 'LLM jo tools use karke khud decide kare kya karna hai.', 'Support agent, personal assistant', 1, 15],
  ['Basic LLM Chain', url.root('chainllm'), 'ai-root', 'AI', 'Simple prompt → AI answer (bina tools).', 'Email reply draft', 2, 14],
  ['Question and Answer Chain', url.root('chainretrievalqa'), 'ai-root', 'AI', 'Vector store se context lekar jawab (RAG).', 'Company FAQ bot', 2, 16],
  ['Summarization Chain', url.root('chainsummarization'), 'ai-root', 'AI', 'Lambe text/documents ka summary.', 'Meeting notes summary', 3, 14],
  ['Information Extractor', url.root('information-extractor'), 'ai-root', 'AI', 'Text se structured fields nikaalta hai (schema ke saath).', 'Invoice → vendor, amount, GST', 2, 17],
  ['Text Classifier', url.root('text-classifier'), 'ai-root', 'AI', 'Text ko categories mein classify karta hai.', 'Email: sales/support/spam', 2, 14],
  ['Sentiment Analysis', url.root('sentimentanalysis'), 'ai-root', 'AI', 'Positive/negative/neutral detect.', 'Review monitoring', 3, 14],
  ['OpenAI', url.lcApp('openai'), 'app', 'AI', 'OpenAI ke direct actions — text, image, audio transcription.', 'Voice note transcribe', 2, 17],
  ['Pinecone Vector Store', url.root('vectorstorepinecone'), 'ai-root', 'AI', 'Embeddings store + semantic search (Pinecone).', 'RAG knowledge base', 3, 16],
  ['Supabase Vector Store', url.root('vectorstoresupabase'), 'ai-root', 'AI', 'pgvector par embeddings store/search.', 'Sasta RAG setup', 2, 16],
  ['OpenAI Chat Model', url.sub('lmchatopenai'), 'ai-sub', 'AI', 'Agent/chain ko GPT model deta hai.', 'Agent ka dimaag', 2, 14],
  ['Anthropic Chat Model', url.sub('lmchatanthropic'), 'ai-sub', 'AI', 'Claude models plug karo.', 'Lambe documents ka analysis', 3, 14],
  ['Google Gemini Chat Model', url.sub('lmchatgooglegemini'), 'ai-sub', 'AI', 'Gemini models (free tier bhi).', 'Low-cost AI workflows', 3, 14],
  ['Simple Memory (Window Buffer)', url.sub('memorybufferwindow'), 'ai-sub', 'AI', 'Agent ko pichhli kuch baatein yaad rakhwata hai.', 'Chatbot conversation', 2, 15],
  ['Postgres Chat Memory', url.sub('memorypostgreschat'), 'ai-sub', 'AI', 'Conversation history database mein (production).', 'Multi-user WhatsApp bot', 3, 15],
  ['Structured Output Parser', url.sub('outputparserstructured'), 'ai-sub', 'AI', 'AI se fixed JSON format mein output.', 'Reliable lead scoring JSON', 2, 14],
  ['Embeddings OpenAI', url.sub('embeddingsopenai'), 'ai-sub', 'AI', 'Text ko vectors (numbers) mein badalta hai.', 'Documents ingest', 3, 16],
  ['HTTP Request Tool', url.sub('toolhttprequest'), 'ai-sub', 'AI', 'Agent ko kisi bhi API call karne ki power.', 'Agent weather/price check kare', 2, 15],
  ['Call n8n Workflow Tool', url.sub('toolworkflow'), 'ai-sub', 'AI', 'Agent ek poora workflow tool ki tarah chala sake.', 'Agent → "book appointment" workflow', 2, 15],
  ['Recursive Character Text Splitter', url.sub('textsplitterrecursivecharactertextsplitter'), 'ai-sub', 'AI', 'Lambe documents ko chunks mein todta hai.', 'PDF → chunks → vectors', 3, 16],
  ['MCP Client Tool', url.sub('toolmcp'), 'ai-sub', 'AI', 'Agent ko MCP servers ke tools deta hai.', 'External tools ka plug-and-play', 3, 17],
];

const nodes = raw.map(([name, docs, kind, category, desc, use, tier, day], i) => ({
  id: 'n-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  rank: i + 1, name, docs, kind, category, desc, use, tier, day,
}));

// Rank: tier ke hisaab se sort (Top 10 pehle, phir Top 50, phir baaki)
nodes.sort((a, b) => a.tier - b.tier || a.rank - b.rank).forEach((n, i) => { n.rank = i + 1; });

// "Har project mein" — top 10 combo patterns
const recipes = [
  { t: 'Lead capture recipe', n: ['Webhook', 'Edit Fields (Set)', 'IF', 'Google Sheets', 'Telegram'] },
  { t: 'Daily report recipe', n: ['Schedule Trigger', 'Google Sheets', 'Summarize', 'Code', 'Gmail'] },
  { t: 'AI assistant recipe', n: ['Chat Trigger', 'AI Agent', 'OpenAI Chat Model', 'Simple Memory (Window Buffer)', 'HTTP Request Tool'] },
  { t: 'API sync recipe', n: ['Schedule Trigger', 'HTTP Request', 'Loop Over Items (Split in Batches)', 'Remove Duplicates', 'Postgres'] },
  { t: 'Document AI recipe', n: ['Gmail Trigger', 'Extract from File', 'Information Extractor', 'Google Sheets', 'Slack'] },
  { t: 'Reliability recipe', n: ['Error Trigger', 'Edit Fields (Set)', 'Telegram', 'Execute Workflow (Sub-workflow)', 'Stop and Error'] },
];

module.exports = { nodes, nodeTypes, recipes };
