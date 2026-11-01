# n8n Automation Mastery — Course Landing Page

Ek advanced, animated landing page / digital brochure for a **25-day live n8n & AI automation course** (2 hours per class).
Node.js (Express) app, Hostinger Business **Node.js Web App** par directly deploy hota hai.

## Kya hai andar — 28 pages, 569 sections

| Page | URL | Kya hai |
|------|-----|---------|
| Home / brochure | `/` | 106 sections: hero, curriculum roadmap, lesson library, node types, top 10 nodes, docs hub preview, video library, teacher guide, 8 modules, Day 1–25 summaries, projects, journey, careers, resources, pricing, FAQ, enroll form |
| 25 lesson pages | `/day/1` … `/day/25` | Har din 19 sections: why, objectives (har topic ka real-life + n8n example), concepts + analogies, **story time (animated kahani)**, **animated workflow diagram**, step-by-step build (node docs links), **before vs after**, sample input/output JSON, key snippet, 2-hour plan (**har block clickable: explain + examples + bachche wala script + class questions**), teacher script, common mistakes, pro tips, lab + homework + practice ladder, **interactive quiz**, videos, docs reading list, nodes used |
| Nodes Library | `/nodes` | 6 node types, node anatomy, **Top 10 / Top 50 / Top 100+** (107 nodes) with Hinglish explanation, use case, lesson day aur official docs link; search + filters |
| Docs Hub | `/docs` | n8n official docs ka day-wise organized map (data, code, flow logic, AI, hosting, security, API, community) |

Light theme, brand colors config se. Animations: particle network, animated SVG workflows, typing headline, scroll reveals, counters, progress rings, tilt cards, workflow simulator, countdowns. **Notes PDF / Download Brochure** buttons page ko print-ready PDF bana dete hain.

## Content kahan badlein

| File | Kya hai |
|------|---------|
| `src/config.js` | Brand, **logo path, brand colors**, batch date, price, phone/WhatsApp, email, instructor |
| `public/img/logo.svg` | Apna logo yahan replace karo (PNG ho to `config.logo` mein path badlo) |
| `src/lessons.js`, `src/lessons2.js` | 25 in-depth lessons (concepts, build steps, quiz, docs…) |
| `src/nodes.js` | Nodes library (107 nodes, tiers, docs links) |
| `src/pages/docs.js` | Docs hub links |
| `src/curriculum.js` | 8 modules + 25 days (topics, agenda, lab, homework, resources) |
| `src/content.js` | Baaki saare sections ka text (FAQ, careers, bonuses, etc.) |
| `public/css/style.css`, `public/js/main.js` | Design & animations |

> ⚠️ `src/content.js` mein **testimonials aur success stories SAMPLE hain** — launch se pehle real student reviews daalein. Prices, phone number aur instructor details bhi `config.js` mein apne daalein.

## Local chalana

```bash
npm install
npm run dev      # http://localhost:3000 (content edit turant dikhega)
npm run check    # saare pages ke sections + broken links check
npm run build    # optional: dist/ static export (28 pages)
```

## Hostinger Business (Node.js Web App) par deploy

1. hPanel → **Websites → Add Website → Node.js Apps** (ya existing site par *Node.js* section).
2. Source: **GitHub repository** connect karo (yeh repo + branch) — ya project ka ZIP upload karo (`node_modules` ke bina).
3. Build settings:
   - **Node version:** 18, 20 ya 22
   - **Install / build command:** `npm install`
   - **Start command:** `npm start`  (entry file: `server.js`)
4. **Environment variables:**
   - `NODE_ENV=production` (page cache + fast)
   - `LEAD_WEBHOOK_URL=https://your-n8n.com/webhook/enroll` *(optional — har enrollment aapke n8n workflow mein chala jayega)*
   - `PORT` Hostinger khud set karta hai, kuch karne ki zarurat nahi.
5. Deploy dabao → domain attach karo → SSL on.
6. Test: `https://yourdomain.com/health` par `{"ok":true}` aana chahiye.

### Enrollment leads
- Form `POST /api/enroll` par jaata hai (validation, honeypot, rate-limit).
- Leads `data/leads.jsonl` mein save hoti hain, aur `LEAD_WEBHOOK_URL` set ho to n8n webhook par bhi bheji jaati hain (best: n8n se Google Sheet + WhatsApp alert banao).
- Server down ho to form automatically WhatsApp fallback dikhata hai.

## Tech
Node ≥ 18 · Express 4 · vanilla JS/CSS (no frontend build step) · server-side rendered single HTML (SEO + JSON-LD Course schema).

*n8n is a trademark of n8n GmbH. This course is independent and not affiliated with n8n GmbH.*
