// ============================================================
//  VIEW MODE — /mentor  (Student view ↔ Mentor view, ek click mein)
// ============================================================
const cfg = require('../config');
const { days } = require('../curriculum');
const { layout } = require('../layout');
const { esc, pad, makeBuilder } = require('../kit');

const switcher = () => `<div class="vm-switch" role="group" aria-label="View mode">
  <button type="button" data-set-mode="student"><span>🎓</span><b>Student view</b><small>Bachche yahi dekhte hain</small></button>
  <button type="button" data-set-mode="mentor"><span>👨‍🏫</span><b>Mentor view</b><small>Sirf aapke teaching notes ke saath</small></button>
</div>`;

function renderMentor() {
  const B = makeBuilder();
  const S = [];
  S.push(B.sec({
    id: 'mode-hero', title: 'View mode', head: false, cls: 'lesson-hero', group: 'Start',
    body: `<div class="reveal"><span class="eyebrow">Teacher ke liye · ek click switch</span>
      <h1 class="lh-title">Student view ya Mentor view?<br><span class="grad">neeche button dabao, bas</span></h1>
      <p class="lead">Website ke do roop hain. <b>Student view</b> mein sirf seekhne wala content hai. <b>Mentor view</b> mein har class block ke saath aapke liye "👨‍🏫 Mentor note" aur poora teacher script bhi dikhta hai.</p>
      ${switcher()}
      <p class="vm-status" data-mode-status></p></div>`,
  }));
  S.push(B.sec({
    id: 'mode-days', group: 'Days', eyebrow: 'Seedha kholo', title: 'Kis din ki class lena hai?',
    sub: 'Upar jo mode chuna hai, usi mode mein din khulega. Students ko link bhejna ho to "Copy student link" dabao — woh hamesha student view mein khulega.',
    body: `<div class="vm-days">${days.map((d) => `<div class="vm-day reveal"><a href="/day/${d.day}"><span>Day ${pad(d.day)}</span>${esc(d.title)}</a><button class="mini-btn" data-copy-student="/day/${d.day}">📋 Copy student link</button></div>`).join('')}</div>`,
  }));
  S.push(B.sec({
    id: 'mode-tips', group: 'Tips', eyebrow: 'Dhyan rakhein', title: 'Class lete waqt 3 tips',
    body: `<div class="list-x">${['Mentor view aapke browser mein yaad rehta hai. Screen share karne se pehle Student view par switch kar lo (ya mentor notes doosre tab/phone par kholo).', 'Students ko link hamesha "Copy student link" se bhejo — usme ?mentor=0 hota hai, isliye unke browser mein student view hi khulega.', 'Kisi bhi page par neeche left mein "👨‍🏫 Mentor mode ON ✕" dikhe to samjho mentor view chalu hai. Uspar click = wapas student view.'].map((t, i) => `<div class="li good reveal" style="--d:${i * 60}ms"><span>✓</span>${esc(t)}</div>`).join('')}</div>`,
  }));
  return layout({
    title: `Student / Mentor view | ${cfg.brand}`,
    desc: 'Ek click mein website ko Student view ya Mentor view (teaching notes ke saath) mein badlo.',
    body: S.join('\n'), total: B.registry.length, drawerHtml: B.drawer(), active: 'mentor',
  });
}

module.exports = { renderMentor, switcher };
