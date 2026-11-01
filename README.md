# n8n Automation Mastery — Course Landing Page

Ek advanced, animated landing page / digital brochure for a **25-day live n8n & AI automation course** (2 hours per class).
Node.js (Express) app, Hostinger Business **Node.js Web App** par directly deploy hota hai.

## Kya hai andar (100 sections)

| # | Group | Sections |
|---|-------|----------|
| 1–15 | Overview | Hero (animated workflow), apps marquee, stats, what is n8n, why now, who it's for, problems, transformation, at-a-glance, method, **live workflow simulator**, n8n vs Zapier vs Make, skills, roadmap, class format |
| 16–23 | Modules | 8 module deep-dives (outcomes + day links) |
| 24–48 | Day-wise classes | **Day 1 → Day 25**: topics, minute-by-minute 2-hour plan, live lab, homework, resources (official docs), tools |
| 49–50 | Projects | 20 filterable projects, capstone + rubric |
| 51–59 | Student journey | Day 0 → alumni timeline + 8 stage sections |
| 60–62 | Career | Career paths, freelancing roadmap, agency blueprint |
| 63–70 | Resources | Tools, library, downloads, template vault, prompt library, expressions cheat sheet, official links, self-hosting |
| 71–75 | Prep & certification | Requirements, interactive checklist, assessments, cert levels, certificate preview |
| 76–80 | Support | Mentor, support system, community, live class, LMS |
| 81–93 | Offer | Bonuses, hackathon, industries, AI spotlight, testimonials, stories, 2 calculators, batches + countdown, pricing, EMI, guarantee, vs YouTube |
| 94–100 | Help & enroll | FAQ, glossary search, rules, enroll steps, **lead form**, final CTA, footer |

Animations: preloader, particle network background, animated SVG workflow, typing headline, scroll reveals, counters, progress rings, 3D tilt cards, magnetic buttons, cursor glow, marquee, orbit, slider, countdowns. `prefers-reduced-motion` respected. **Download Brochure** button page ko print-ready PDF bana deta hai.

## Content kahan badlein

| File | Kya hai |
|------|---------|
| `src/config.js` | Brand, batch date, price, phone/WhatsApp, email, instructor |
| `src/curriculum.js` | 8 modules + 25 days (topics, agenda, lab, homework, resources) |
| `src/content.js` | Baaki saare sections ka text (FAQ, careers, bonuses, etc.) |
| `public/css/style.css`, `public/js/main.js` | Design & animations |

> ⚠️ `src/content.js` mein **testimonials aur success stories SAMPLE hain** — launch se pehle real student reviews daalein. Prices, phone number aur instructor details bhi `config.js` mein apne daalein.

## Local chalana

```bash
npm install
npm run dev      # http://localhost:3000 (content edit turant dikhega)
npm run check    # 100 sections + broken links check
npm run build    # optional: dist/ static export
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
