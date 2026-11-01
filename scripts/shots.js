// ============================================================
//  ASLI n8n SCREENSHOTS — canvas (har din) + node settings (DEEP wale din)
//  Pehle local n8n chalao (Node 24+), workflows import karo:
//    n8n import:workflow --separate --input=public/workflows
//  Fir:  N8N_URL=http://127.0.0.1:5678 N8N_EMAIL=… N8N_PASSWORD=… node scripts/shots.js
//  Output: public/img/shots/day-XX-canvas.png, day-XX-node-N.png (Python/PIL se trim baad mein)
// ============================================================
const { chromium } = require('playwright');
const { DEEP } = require('../src/deep');
const { builds } = require('../src/buildlib');
const URL = process.env.N8N_URL || 'http://127.0.0.1:5678';
const OUT = require('path').join(__dirname, '..', 'public', 'img', 'shots') + '/';
const pad = (n) => String(n).padStart(2, '0');

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1.6 })).newPage();
  await p.goto(`${URL}/signin`); await p.waitForTimeout(2000);
  await p.fill('input[type=email], input[name=emailOrLdapLoginId]', process.env.N8N_EMAIL);
  await p.fill('input[type=password]', process.env.N8N_PASSWORD); await p.keyboard.press('Enter'); await p.waitForTimeout(3000);
  const list = await p.evaluate(async (u) => (await (await fetch(`${u}/rest/workflows`)).json()).data, URL);
  for (const w of list) {
    const day = Number((w.name.match(/Day (\d+)/) || [])[1]); if (!day) continue;
    await p.goto(`${URL}/workflow/${w.id}`); await p.waitForTimeout(3500);
    const st = p.locator('[data-node-name="Setup Note"]').first();
    if (await st.count()) { await st.click({ force: true, position: { x: 20, y: 10 } }); await p.keyboard.press('Delete'); await p.waitForTimeout(500); }
    await p.mouse.click(700, 180); await p.keyboard.press('1'); await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}day-${pad(day)}-canvas.png`, clip: { x: 60, y: 120, width: 1380, height: 760 } });
    const D = DEEP[day]; if (!D) continue;
    // node anatomy ke har node ke liye workflow ka matching node (type se)
    const wfNodes = builds()[day].json.nodes.filter((x) => !x.type.endsWith('stickyNote'));
    for (const [i, nd] of D.nodes.entries()) {
      const name = (nd.node || (wfNodes[i] || {}).name); if (!name) continue;
      await p.locator('[data-test-id="canvas-node"]').filter({ hasText: name }).first().dblclick({ force: true }); await p.waitForTimeout(1800);
      const bx = await p.locator('[data-test-id="node-parameters"]').boundingBox();
      await p.screenshot({ path: `${OUT}day-${pad(day)}-node-${i + 1}.png`, clip: { x: bx.x - 6, y: 62, width: bx.width + 12, height: Math.min(900, bx.height + 46) } });
      await p.keyboard.press('Escape'); await p.waitForTimeout(700);
    }
  }
  await b.close(); console.log('✅ screenshots ready');
})();
