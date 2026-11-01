// ============================================================
//  SITE — saare pages ek jagah (server + static build dono yahi use karte hain)
// ============================================================
const PAGES = () => {
  const { render } = require('./render');
  const { renderLesson } = require('./pages/lesson');
  const { renderNodes } = require('./pages/nodes');
  const { renderDocs } = require('./pages/docs');
  const { renderResources } = require('./pages/resources');
  const { totalDays } = require('./config');
  const map = { '/': render, '/nodes': renderNodes, '/docs': renderDocs, '/resources': renderResources };
  for (let d = 1; d <= totalDays; d++) map[`/day/${d}`] = () => renderLesson(d);
  return map;
};

function renderAll() {
  const out = {};
  for (const [route, fn] of Object.entries(PAGES())) out[route] = fn();
  return out;
}

module.exports = { renderAll };
