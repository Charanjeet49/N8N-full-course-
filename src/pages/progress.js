// ============================================================
//  MERA PROGRESS — /progress  (XP, level, game map, badges)
//  Saara data browser (localStorage) se aata hai; page sirf dhaancha deta hai.
// ============================================================
const cfg = require('../config');
const { days } = require('../curriculum');
const { layout } = require('../layout');
const { esc, pad, makeBuilder } = require('../kit');
const { XP, LEVELS, WORLDS, allBadges } = require('../game');

function renderProgress() {
  const B = makeBuilder();
  const S = [];
  const title = Object.fromEntries(days.map((d) => [d.day, d.title]));

  S.push(B.sec({
    id: 'progress-hero', title: 'Mera progress', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="pg-hero reveal">
      <div><span class="eyebrow">🎮 Game mode · sab isi browser mein save</span>
        <h1 class="lh-title">Mera progress<br><span class="grad">seekho, XP kamao, level up karo</span></h1>
        <p class="lead">Har lesson, quiz aur challenge par XP milta hai. 25 din = 8 worlds. Har world poora karo aur badge jeeto.</p></div>
      <div class="lvl-card" data-level-card>
        <div class="lvl-top"><span class="lvl-ic" data-lvl-icon>${LEVELS[0].i}</span><div><small>Aapka level</small><b data-lvl-name>${esc(LEVELS[0].t)}</b><em data-lvl-line>${esc(LEVELS[0].line)}</em></div></div>
        <div class="lvl-bar"><span data-lvl-bar style="width:0%"></span></div>
        <p class="lvl-next" data-lvl-next>Agle level tak ${LEVELS[1].xp} XP</p>
        <div class="lvl-stats">
          <div><b data-stat="xp">0</b><small>XP</small></div>
          <div><b data-stat="days">0</b><small>/ ${cfg.totalDays} din</small></div>
          <div><b data-stat="streak">0</b><small>🔥 streak</small></div>
          <div><b data-stat="badges">0</b><small>/ ${allBadges().length} badges</small></div>
        </div>
      </div></div>`,
  }));

  S.push(B.sec({
    id: 'game-map', group: 'Map', eyebrow: '8 worlds · 25 levels', title: '🗺️ Game map — aapka safar',
    sub: 'Har gola ek din hai. Hara = complete, ⭐ = quiz perfect, 🧩 = challenge solved. Kisi bhi din par click karke wahin pahuncho.',
    body: `<div class="gmap">${WORLDS().map((w, wi) => `<div class="world reveal" data-world="${w.no}" style="--c:${w.c};--d:${wi * 60}ms">
        <div class="w-h"><span class="w-ic">${w.i}</span><div><small>World ${w.no}</small><b>${esc(w.t)}</b></div><span class="w-boss" data-world-badge="${w.no}" title="World clear badge">🔒</span></div>
        <div class="w-days">${w.days.map((d) => `<a href="/day/${d}" class="w-day" data-map-day="${d}" title="Day ${d}: ${esc(title[d])}"><b>${pad(d)}</b><i data-map-marks></i></a>`).join('')}</div>
        <div class="w-bar"><span data-world-bar="${w.no}"></span></div></div>`).join('')}</div>`,
  }));

  S.push(B.sec({
    id: 'badges', group: 'Badges', eyebrow: `${allBadges().length} badges`, title: '🏅 Badges — kitne collect kiye?',
    sub: 'Locked badge par hover/tap karo — likha hai kaise unlock hoga.',
    body: `<div class="badges">${allBadges().map((b, i) => `<div class="badge reveal" data-badge="${b.id}" style="--d:${(i % 8) * 40}ms" title="${esc(b.d)}"><span class="bd-ic">${b.i}</span><b>${esc(b.t)}</b><small>${esc(b.d)}</small></div>`).join('')}</div>`,
  }));

  const rules = [
    ['✅', 'Din complete (lesson ke end mein tick)', `+${XP.lesson} XP`],
    ['🧠', 'Quiz ka har sahi jawab (pehli koshish)', `+${XP.quiz} XP`],
    ['💯', 'Din ke saare 5 quiz sahi', `+${XP.perfect} XP bonus`],
    ['🧩', 'Challenge solve, bina hint', `+${XP.challenge} XP`],
    ['💡', 'Har hint kholne par', `−${XP.hintCost} XP (challenge se)`],
    ['✅', 'Solution dekh ke challenge kiya', `+${XP.solutionXp} XP`],
    ['🧰', 'Day 0 setup poora', `+${XP.setup} XP`],
    ['🐞', 'Bug Hunt / Flow Builder jeeto (har din)', `+${XP.game} XP`],
    ['🏟️', 'Revision Arena — har sahi jawab (din ka pehla round)', `+${XP.arena} XP`],
    ['💼', 'Business Track: industry ka Level 1 project', `+${XP.project} XP`],
  ];
  S.push(B.sec({
    id: 'xp-rules', group: 'Rules', eyebrow: 'XP kaise milta hai', title: '⚡ XP rules aur levels',
    body: `<div class="grid g2"><div class="panel reveal"><h4>XP kaise kamayein</h4><ul class="xp-rules">${rules.map(([i, t, x]) => `<li><span>${i}</span>${esc(t)}<b>${esc(x)}</b></li>`).join('')}</ul></div>
      <div class="panel reveal"><h4>Levels</h4><ol class="lvl-list">${LEVELS.map((l) => `<li data-lvl-row="${l.xp}"><span>${l.i}</span><b>${esc(l.t)}</b><small>${l.xp} XP se</small></li>`).join('')}</ol></div></div>
      <div class="pg-tools reveal"><p>🔐 Aapka progress sirf isi browser mein hai. Naya phone/laptop = naya progress. Backup chahiye to code copy karke rakh lo.</p>
        <div><button type="button" class="btn btn-ghost sm" data-progress-export>📋 Backup code copy karo</button><button type="button" class="btn btn-ghost sm" data-progress-import>📥 Backup code daalo</button><button type="button" class="btn btn-link sm" data-progress-reset>Sab reset karo</button></div>
        <div class="pg-import" data-import-box hidden><textarea rows="3" placeholder="Yahan backup code paste karo"></textarea><button type="button" class="btn btn-primary sm" data-import-go>Restore karo</button></div></div>`,
  }));

  return layout({
    title: `Mera progress — XP, level & badges | ${cfg.brand}`,
    desc: 'n8n course ka game mode: XP, levels, badges, streak aur 25 din ka game map.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'progress',
  });
}

module.exports = { renderProgress };
