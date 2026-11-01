// ============================================================
//  Express server — Hostinger Node.js Web App ke liye
//  Start: npm start  (PORT env var Hostinger khud deta hai)
// ============================================================
const path = require('path');
const fs = require('fs');
const express = require('express');
const { render } = require('./src/render');

const app = express();
const PORT = process.env.PORT || 3000;
const LEADS_FILE = path.join(__dirname, 'data', 'leads.jsonl');
// Optional: apna n8n webhook URL daalo — har enrollment wahan bhi chala jayega
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || '';

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json({ limit: '20kb' }));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Page ko startup par ek baar render karke cache karte hain (fast)
let html = render();
if (process.env.NODE_ENV !== 'production') {
  // Dev mode: har request par fresh render (content edit turant dikhe)
  app.get(['/', '/index.html'], (req, res) => {
    Object.keys(require.cache).forEach((k) => { if (k.includes(`${path.sep}src${path.sep}`)) delete require.cache[k]; });
    res.type('html').send(require('./src/render').render());
  });
} else {
  app.get(['/', '/index.html'], (req, res) => res.type('html').set('Cache-Control', 'public, max-age=300').send(html));
}

app.use(express.static(path.join(__dirname, 'public'), { maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0 }));

app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Simple in-memory rate limit: 5 submissions / 10 min per IP
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 5;
};

app.post('/api/enroll', async (req, res) => {
  const b = req.body || {};
  if (b.company) return res.json({ ok: true }); // honeypot (bots)
  if (limited(req.ip)) return res.status(429).json({ ok: false, error: 'Too many requests, thodi der baad try karein.' });

  const clean = (v, n = 200) => String(v || '').trim().slice(0, n);
  const lead = {
    name: clean(b.name, 80),
    phone: clean(b.phone, 20).replace(/[^\d+ ]/g, ''),
    email: clean(b.email, 120).toLowerCase(),
    plan: clean(b.plan, 20),
    profile: clean(b.profile, 60),
    batch: clean(b.batch, 80),
    goal: clean(b.goal, 1000),
    at: new Date().toISOString(),
    ip: req.ip,
  };
  if (lead.name.length < 2) return res.status(400).json({ ok: false, error: 'Name required' });
  if (lead.phone.replace(/\D/g, '').length < 10) return res.status(400).json({ ok: false, error: 'Valid phone required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return res.status(400).json({ ok: false, error: 'Valid email required' });

  try {
    fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
    fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n');
  } catch (e) {
    console.error('Lead save failed:', e.message);
  }

  if (LEAD_WEBHOOK_URL) {
    fetch(LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      .catch((e) => console.error('Webhook failed:', e.message));
  }
  res.json({ ok: true });
});

app.use((req, res) => res.status(404).type('html').send('<h1 style="font-family:sans-serif;text-align:center;margin-top:20vh">404 — <a href="/">Go home</a></h1>'));

app.listen(PORT, () => console.log(`✅ n8n course site running on http://localhost:${PORT}`));
