// Static export: dist/ folder banata hai (agar kabhi bina Node ke host karna ho)
const fs = require('fs');
const path = require('path');
const { render, sectionCount } = require('../src/render');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), render());
console.log(`✅ Built dist/index.html with ${sectionCount()} sections`);
