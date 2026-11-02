// ============================================================
//  REVISION ARENA — /arena  (purane din ke mixed sawaal, 10 ka round)
// ============================================================
const cfg = require('../config');
const { days } = require('../curriculum');
const { layout } = require('../layout');
const { makeBuilder } = require('../kit');
const { BONUS_Q, XP } = require('../game');
const LESSONS = { ...require('../lessons'), ...require('../lessons2') };

function renderArena() {
  const B = makeBuilder();
  const S = [];
  const bank = days.flatMap((d) => [...LESSONS[d.day].quiz, BONUS_Q[d.day]].map(([q, o, a, ex]) => ({ d: d.day, q, o, a, ex: ex || '' })));
  S.push(B.sec({
    id: 'arena-hero', title: 'Revision Arena', head: false, cls: 'lesson-hero', group: 'Arena',
    body: `<div class="reveal"><span class="eyebrow">🏟️ Revision Arena · ${bank.length} sawaal ka bank</span>
      <h1 class="lh-title">Revision Arena<br><span class="grad">10 sawaal, purane din mix</span></h1>
      <p class="lead">Jo din aap complete kar chuke ho, unke sawaal mix hokar aate hain (abhi koi din complete nahi to saare din se). Bhoolne se pehle dohraana hi asli trick hai. Din ka pehla round = <b>+${XP.arena} XP har sahi jawab</b>.</p></div>`,
  }));
  S.push(B.sec({
    id: 'arena', group: 'Arena', eyebrow: 'Round', title: '⚔️ Round shuru karo',
    body: `<script type="application/json" id="arenaBank">${JSON.stringify(bank).replace(/</g, '\\u003c')}</script>
      <div class="arena card reveal" data-arena>
        <div class="ar-top"><span data-ar-count>Sawaal 1 / 10</span><span data-ar-day></span><span data-ar-score>Score: 0</span></div>
        <div class="ar-bar"><span data-ar-bar></span></div>
        <b class="ar-q" data-ar-q>Taiyaar? Neeche button dabao.</b>
        <div class="opts" data-ar-opts></div>
        <p class="ar-ex" data-ar-ex></p>
        <div class="ar-act"><button type="button" class="btn btn-primary" data-ar-start>▶ Round shuru karo</button><button type="button" class="btn btn-ghost" data-ar-next hidden>Agla sawaal →</button></div>
      </div>
      <p class="hint reveal">Tip: Day 7, 14 aur 21 ke baad ek round zaroor khelo. 🎮 <a href="/progress">Mera progress →</a></p>`,
  }));
  return layout({
    title: `Revision Arena — mixed revision quiz | ${cfg.brand}`,
    desc: 'n8n course ke purane din ke mixed sawaal — 10 sawaal ka round, XP ke saath.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'arena',
  });
}

module.exports = { renderArena };
