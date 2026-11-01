// Static export: dist/ folder (agar kabhi bina Node ke host karna ho)
const fs = require('fs');
const path = require('path');
const { renderAll } = require('../src/site');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
const pages = renderAll();
for (const [route, html] of Object.entries(pages)) {
  const dir = path.join(dist, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
console.log(`✅ Built ${Object.keys(pages).length} pages into dist/`);
