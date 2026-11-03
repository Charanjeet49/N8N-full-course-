// ============================================================
//  Express server — Hostinger Node.js Web App ke liye
//  Start: npm start  (PORT env var Hostinger khud deta hai)
// ============================================================
const path = require('path');
const fs = require('fs');
const express = require('express');

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

// Saare pages (home, 25 lessons, nodes, docs) startup par render karke cache
const loadSite = () => {
  Object.keys(require.cache).forEach((k) => { if (k.includes(`${path.sep}src${path.sep}`)) delete require.cache[k]; });
  return require('./src/site').renderAll();
};
const PROD = process.env.NODE_ENV === 'production';
let pages = loadSite();
app.get(['/', '/index.html', '/nodes', '/docs', '/resources', '/setup', '/cheatsheets', '/mentor', '/progress', '/business', '/business/:slug', '/arena', '/library', '/leaderboard', '/day/:n'], (req, res, next) => {
  if (!PROD) pages = loadSite(); // dev: har request par fresh (content edit turant dikhe)
  const route = req.path === '/index.html' ? '/' : req.path.replace(/\/$/, '') || '/';
  const html = pages[route];
  if (!html) return next();
  res.type('html');
  if (PROD) res.set('Cache-Control', 'public, max-age=300');
  res.send(html);
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: PROD ? '7d' : 0 }));

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

// ================= LEADERBOARD (opt-in, sirf naam + batch + XP) =================
//  Data: data/leaderboard.json (git mein nahi). Moderation: LB_ADMIN_KEY env set karo,
//  phir POST /api/leaderboard/remove { key, name } se koi entry hatao.
const LB_FILE = path.join(__dirname, 'data', 'leaderboard.json');
const LB_ADMIN_KEY = process.env.LB_ADMIN_KEY || '';
const LB_MAX_XP = 15000;
let board = {};
try { board = JSON.parse(fs.readFileSync(LB_FILE, 'utf8')); } catch (e) { board = {}; }
let lbTimer = null;
const saveBoard = () => {
  clearTimeout(lbTimer);
  lbTimer = setTimeout(() => {
    try { fs.mkdirSync(path.dirname(LB_FILE), { recursive: true }); fs.writeFileSync(LB_FILE, JSON.stringify(board)); } catch (e) { console.error('Leaderboard save failed:', e.message); }
  }, 1000);
};
const lbHits = new Map();
const lbLimited = (ip) => {
  const now = Date.now();
  const arr = (lbHits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now); lbHits.set(ip, arr);
  return arr.length > 30;
};
const lbClean = (v, n) => String(v || '').replace(/[<>"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const lbInt = (v, max) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));
const ranked = (batch) => Object.entries(board)
  .filter(([, e]) => !batch || e.batch.toLowerCase() === batch.toLowerCase())
  .sort((a, b) => b[1].xp - a[1].xp || b[1].days - a[1].days || a[1].at.localeCompare(b[1].at));

app.get('/api/leaderboard', (req, res) => {
  const batch = lbClean(req.query.batch, 30);
  const id = String(req.query.id || '');
  const list = ranked(batch);
  const me = list.findIndex(([k]) => k === id);
  const pub = ([, e]) => ({ name: e.name, batch: e.batch, xp: e.xp, days: e.days, badges: e.badges, level: e.level });
  const batches = [...new Set(Object.values(board).map((e) => e.batch).filter(Boolean))].sort().slice(0, 50);
  res.set('Cache-Control', 'no-store');
  res.json({ ok: true, total: list.length, top: list.slice(0, 50).map(pub), me: me >= 0 ? { rank: me + 1, ...pub(list[me]) } : null, batches });
});

app.post('/api/leaderboard', (req, res) => {
  const b = req.body || {};
  if (lbLimited(req.ip)) return res.status(429).json({ ok: false, error: 'Bahut zyada requests, thodi der baad try karo.' });
  const id = String(b.id || '');
  if (!/^[a-f0-9]{16,32}$/.test(id)) return res.status(400).json({ ok: false, error: 'Invalid id' });
  if (b.leave) { delete board[id]; saveBoard(); return res.json({ ok: true }); }
  const name = lbClean(b.name, 30);
  if (name.length < 2) return res.status(400).json({ ok: false, error: 'Naam kam se kam 2 letter ka ho' });
  if (!board[id] && Object.keys(board).length >= 5000) return res.status(503).json({ ok: false, error: 'Leaderboard full hai' });
  board[id] = { name, batch: lbClean(b.batch, 30), xp: lbInt(b.xp, Math.min(LB_MAX_XP, 2500 + lbInt(b.days, 25) * 400)), days: lbInt(b.days, 25), badges: lbInt(b.badges, 60), level: lbClean(b.level, 4), at: (board[id] && board[id].at) || new Date().toISOString(), upd: new Date().toISOString() };
  saveBoard();
  res.json({ ok: true });
});

app.post('/api/leaderboard/remove', (req, res) => {
  const b = req.body || {};
  if (!LB_ADMIN_KEY || b.key !== LB_ADMIN_KEY) return res.status(403).json({ ok: false });
  const name = lbClean(b.name, 30).toLowerCase(); let n = 0;
  for (const [k, e] of Object.entries(board)) if (e.name.toLowerCase() === name) { delete board[k]; n++; }
  saveBoard(); res.json({ ok: true, removed: n });
});

app.use((req, res) => res.status(404).type('html').send('<h1 style="font-family:sans-serif;text-align:center;margin-top:20vh">404 — <a href="/">Go home</a></h1>'));

app.listen(PORT, () => console.log(`✅ n8n course site running on http://localhost:${PORT}`));
