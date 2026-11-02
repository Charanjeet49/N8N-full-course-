// ============================================================
//  SITE — saare pages ek jagah (server + static build dono yahi use karte hain)
// ============================================================
const PAGES = () => {
  const { render } = require('./render');
  const { renderLesson } = require('./pages/lesson');
  const { renderNodes } = require('./pages/nodes');
  const { renderDocs } = require('./pages/docs');
  const { renderResources } = require('./pages/resources');
  const { renderSetup } = require('./pages/setup');
  const { renderCheatsheets } = require('./pages/cheatsheets');
  const { renderMentor } = require('./pages/mentor');
  const { renderProgress } = require('./pages/progress');
  const { renderBusiness, renderIndustry } = require('./pages/business');
  const { INDUSTRIES } = require('./bizlib');
  const { renderArena } = require('./pages/arena');
  const { renderLibrary } = require('./pages/library');
  const { totalDays } = require('./config');
  const map = { '/': render, '/nodes': renderNodes, '/docs': renderDocs, '/resources': renderResources, '/setup': renderSetup, '/cheatsheets': renderCheatsheets, '/mentor': renderMentor, '/progress': renderProgress, '/business': renderBusiness, '/arena': renderArena, '/library': renderLibrary };
  for (const ind of INDUSTRIES) map[`/business/${ind.slug}`] = () => renderIndustry(ind.slug);
  for (let d = 1; d <= totalDays; d++) map[`/day/${d}`] = () => renderLesson(d);
  return map;
};

function renderAll() {
  const out = {};
  for (const [route, fn] of Object.entries(PAGES())) out[route] = fn();
  return out;
}

module.exports = { renderAll };
