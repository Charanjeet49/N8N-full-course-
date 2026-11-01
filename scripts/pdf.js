// ============================================================
//  NOTES PDF GENERATOR — 25 student PDFs + 1 combined e-book (+ mentor copies)
//  Usage:  npm run pdf            (sab)
//          npm run pdf -- 1 5     (sirf Day 1 aur 5)
//  Student PDFs → public/pdf/ (website se download)
//  Mentor PDFs  → pdf-mentor/ (public NAHI — sirf aapke liye)
//  Needs Playwright + Chromium (sirf PDF banate waqt; website ko nahi chahiye).
// ============================================================
const path = require('path');
const fs = require('fs');
const express = require('express');
const { chromium } = require('playwright');
const { renderNotes, renderBook, pdfName } = require('../src/notes');
const { totalDays } = require('../src/config');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'pdf');
const OUT_M = path.join(ROOT, 'pdf-mentor');
const args = process.argv.slice(2).map(Number).filter(Boolean);
const list = args.length ? args : Array.from({ length: totalDays }, (_, i) => i + 1);
const withBook = !args.length;

const app = express();
app.get('/notes/:n', (req, res) => res.type('html').send(renderNotes(Number(req.params.n), { mentor: req.query.mentor === '1' })));
app.get('/book', (req, res) => res.type('html').send(renderBook()));
app.use(express.static(path.join(ROOT, 'public')));

(async () => {
  fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(OUT_M, { recursive: true });
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const make = async (url, file) => {
    await page.goto(base + url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
    console.log(`  ✓ ${path.relative(ROOT, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
  };
  for (const n of list) {
    await make(`/notes/${n}`, path.join(OUT, pdfName(n, false)));
    await make(`/notes/${n}?mentor=1`, path.join(OUT_M, pdfName(n, true)));
  }
  if (withBook) await make('/book', path.join(OUT, 'n8n-course-complete-notes.pdf'));
  await browser.close(); server.close();
  console.log('✅ PDFs ready');
})().catch((e) => { console.error(e); process.exit(1); });
