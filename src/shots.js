// Asli n8n screenshots (scripts/shots.js banata hai) → public/img/shots/
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'public', 'img', 'shots');
const pad = (n) => String(n).padStart(2, '0');
// kind: 'canvas' | 'node' (i = node anatomy index)
function shotFor(day, kind, i = 0) {
  const f = kind === 'canvas' ? `day-${pad(day)}-canvas.png` : `day-${pad(day)}-node-${i + 1}.png`;
  return fs.existsSync(path.join(DIR, f)) ? `/img/shots/${f}` : null;
}
module.exports = { shotFor };
