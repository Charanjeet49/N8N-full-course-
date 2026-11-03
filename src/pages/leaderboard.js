// ============================================================
//  LEADERBOARD — /leaderboard  (opt-in: sirf naam + batch + XP share hota hai)
//  Data server par (/api/leaderboard). Static build mein API nahi hai to message dikhta hai.
// ============================================================
const cfg = require('../config');
const { layout } = require('../layout');
const { makeBuilder } = require('../kit');
const { LEVELS } = require('../game');

function renderLeaderboard() {
  const B = makeBuilder();
  const S = [];

  S.push(B.sec({
    id: 'lb-hero', title: 'Leaderboard', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="lb-hero reveal">
      <div><span class="eyebrow">🏆 Leaderboard · batch ke saath race</span>
        <h1 class="lh-title">Kaun sabse aage?<br><span class="grad">XP kamao, top 10 mein aao</span></h1>
        <p class="lead">Lesson, quiz, challenge aur games se jo XP milta hai, wahi yahan gina jaata hai. Sirf aapka naam, batch aur score dikhta hai. Phone ya email kabhi nahi.</p></div>
      <div class="lb-join panel" data-lb-join>
        <div data-lb-form>
          <h4>🙋 Leaderboard join karo</h4>
          <label>Aapka naam (sabko dikhega)<input type="text" maxlength="30" placeholder="Jaise: Riya S." data-lb-name></label>
          <label>Batch (optional)<input type="text" maxlength="30" placeholder="Jaise: Nov 2026 Morning" data-lb-batch list="lbBatches"></label>
          <datalist id="lbBatches"></datalist>
          <button type="button" class="btn btn-primary" data-lb-save>🏁 Join karo</button>
          <p class="hint" data-lb-msg></p>
        </div>
        <div data-lb-mine hidden>
          <small>Aapka rank</small>
          <div class="lb-me"><b data-lb-rank>#–</b><div><strong data-lb-me-name></strong><em data-lb-me-xp></em></div></div>
          <p class="hint">Score apne aap update hota hai jab bhi aap XP kamate ho.</p>
          <div class="lb-me-act"><button type="button" class="btn btn-ghost sm" data-lb-edit>✏️ Naam/batch badlo</button><button type="button" class="btn btn-link sm" data-lb-leave>Leaderboard chhodo</button></div>
        </div>
      </div></div>`,
  }));

  S.push(B.sec({
    id: 'ranking', group: 'Ranking', eyebrow: 'Top 50', title: '🏆 Ranking',
    sub: 'Barabar XP par jiske zyada din complete hain, woh aage. Batch chuno to sirf apni class dikhegi.',
    body: `<div class="lb-tools reveal"><label>Batch <select data-lb-filter><option value="">Saare students</option></select></label><span class="hint" data-lb-count></span><button type="button" class="btn btn-ghost sm" data-lb-refresh>🔄 Refresh</button></div>
      <div class="lb-podium" data-lb-podium></div>
      <div class="lb-table reveal"><div class="lb-row lb-head"><span>#</span><span>Naam</span><span>Level</span><span>XP</span><span>Din</span><span>🏅</span></div><div data-lb-rows><p class="lb-empty">⏳ Load ho raha hai…</p></div></div>`,
  }));

  S.push(B.sec({
    id: 'lb-rules', group: 'Rules', eyebrow: 'Fair play', title: '🤝 Leaderboard ke rules',
    body: `<div class="grid g2"><div class="panel reveal"><h4>⚡ XP kaise badhaayein</h4><ul class="xp-rules"><li><span>✅</span>Har din ka lesson complete<b>+50</b></li><li><span>🧩</span>Challenge bina hint<b>+100</b></li><li><span>💼</span>Business mission<b>+100</b></li><li><span>🏟️</span>Roz Revision Arena<b>+5/sahi</b></li></ul><p class="hint">Poori list <a href="/progress#xp-rules">Mera progress</a> par hai.</p></div>
      <div class="panel reveal"><h4>🔐 Privacy + fair play</h4><ul class="biz-steps"><li>Sirf naam, batch, XP, din aur badges ki ginti share hoti hai.</li><li>Score isi browser ka hai. Naye phone par <a href="/progress#xp-rules">backup code</a> se progress laao, phir join karo.</li><li>Galat naam ya cheating dikhe to mentor entry hata sakte hain.</li><li>Levels: ${LEVELS.map((l) => `${l.i} ${l.t}`).join(' · ')}</li></ul></div></div>`,
  }));

  return layout({
    title: `Leaderboard — top n8n learners | ${cfg.brand}`,
    desc: 'n8n course leaderboard: XP, level aur badges ke saath batch-wise ranking.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'leaderboard',
  });
}

module.exports = { renderLeaderboard };
