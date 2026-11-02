// public/workflows/ mein saare n8n JSON + sample files + ek ZIP generate karta hai
// Run: npm run workflows   (curriculum/builds badalne ke baad)
const fs = require('fs');
const path = require('path');
const { builds } = require('../src/buildlib');
const assets = require('../src/assets');

const out = path.join(__dirname, '..', 'public', 'workflows');
fs.mkdirSync(out, { recursive: true });
const files = [];
for (const b of Object.values(builds())) files.push([b.file, b.jsonText + '\n']);
for (const b of Object.values(require('../src/bizlib').bizBuilds())) files.push([b.file, b.jsonText + '\n']);
for (const [name, content] of Object.entries(assets)) files.push([name, content]);
files.push(['README.txt', 'n8n Course — Workflow Pack\n\nImport kaise karein:\n1. n8n kholo → naya workflow\n2. .json file ka poora content copy karo → canvas par Ctrl+V (Mac: Cmd+V)\n   YA: ... menu → Import from File\n3. Har workflow ke "Setup Note" (peela sticky) mein likhe credentials connect karo\n4. Test workflow → sab green → Active\n\nFiles:\n' + files.map((f) => ' - ' + f[0]).join('\n') + '\n']);
for (const [name, content] of files) fs.writeFileSync(path.join(out, name), content);

// ---- minimal ZIP writer (store, no compression) ----
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const local = []; const central = []; let offset = 0;
const DOS_TIME = 0; const DOS_DATE = ((2026 - 1980) << 9) | (11 << 5) | 1; // fixed date → reproducible zip
for (const [name, content] of files) {
  const data = Buffer.from(content); const fname = Buffer.from('n8n-course-workflows/' + name); const crc = crc32(data);
  const h = Buffer.alloc(30); h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(0, 8); h.writeUInt16LE(DOS_TIME, 10); h.writeUInt16LE(DOS_DATE, 12); h.writeUInt32LE(crc, 14); h.writeUInt32LE(data.length, 18); h.writeUInt32LE(data.length, 22); h.writeUInt16LE(fname.length, 26); h.writeUInt16LE(0, 28);
  local.push(h, fname, data);
  const c = Buffer.alloc(46); c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(0, 10); c.writeUInt16LE(DOS_TIME, 12); c.writeUInt16LE(DOS_DATE, 14); c.writeUInt32LE(crc, 16); c.writeUInt32LE(data.length, 20); c.writeUInt32LE(data.length, 24); c.writeUInt16LE(fname.length, 28); c.writeUInt32LE(offset, 42);
  central.push(c, fname);
  offset += 30 + fname.length + data.length;
}
const cd = Buffer.concat(central);
const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10); end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
fs.writeFileSync(path.join(out, 'n8n-course-all-workflows.zip'), Buffer.concat([...local, cd, end]));
console.log(`✅ ${files.length} files + ZIP → public/workflows/`);
