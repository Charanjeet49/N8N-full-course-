/* ============================================================
   n8n Automation Mastery — interactions & animations
   ============================================================ */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
  };

  // ---------- Preloader ----------
  const hidePre = () => $('#preloader')?.classList.add('done');
  window.addEventListener('load', () => setTimeout(hidePre, 350));
  setTimeout(hidePre, 2500);

  // ---------- Toast ----------
  const toast = (msg) => {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
  };

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  // ---------- Counters ----------
  const cio = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; const end = +el.dataset.count; const suf = el.dataset.suffix || '';
      const dur = 1600; const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur); const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v + suf; if (p < 1) requestAnimationFrame(step);
      };
      reduce ? (el.textContent = end + suf) : requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  // ---------- Typed words ----------
  const typed = $('.typed');
  if (typed) {
    const words = JSON.parse(typed.dataset.words); let wi = 0; let ci = typed.textContent.length; let del = true;
    typed.textContent = words[0]; ci = words[0].length;
    const tick = () => {
      let delay = 85;
      if (del) {
        ci--; typed.textContent = words[wi].slice(0, ci) || '\u00a0'; delay = 45;
        if (ci <= 0) { del = false; wi = (wi + 1) % words.length; }
      } else {
        ci++; typed.textContent = words[wi].slice(0, ci);
        if (ci >= words[wi].length) { del = true; delay = 1800; }
      }
      setTimeout(tick, delay);
    };
    if (!reduce) setTimeout(tick, 2200);
  }

  // ---------- Nav, progress, indicator, to-top ----------
  const nav = $('#nav'); const bar = $('#progressBar'); const toTop = $('#toTop');
  const ind = $('#secIndicator b'); const secs = $$('section[data-sec]');
  const navLinks = $$('.nav-links a'); const drLinks = $$('.dr-g a');
  let ticking = false;
  const onScroll = () => {
    const y = scrollY; const h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 30);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    toTop.classList.toggle('show', y > 800);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const sio = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      const n = e.target.dataset.sec; const id = e.target.id;
      ind.textContent = String(n).padStart(2, '0');
      drLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + id));
      const map = { curriculum: 'curriculum', projects: 'projects', journey: 'journey', resources: 'resources', pricing: 'pricing', faq: 'faq' };
      const key = id.startsWith('day-') ? 'day-1' : map[id];
      if (key) navLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + key));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => sio.observe(s));

  // ---------- Drawer (all sections) ----------
  const drawer = $('#drawer');
  const openD = () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); $('.dr-g a.on')?.scrollIntoView({ block: 'center' }); };
  const closeD = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); };
  $('#openIndex').addEventListener('click', openD);
  $('#closeIndex').addEventListener('click', closeD);
  drawer.addEventListener('click', (e) => { if (e.target === drawer || e.target.closest('a')) closeD(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeD(); });

  // ---------- Print brochure ----------
  $$('[data-print]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault(); $$('.reveal').forEach((el) => el.classList.add('in')); $$('.faq details').forEach((d) => (d.open = true));
    setTimeout(() => print(), 200);
  }));

  // ---------- Cursor glow, card spotlight, tilt, magnetic ----------
  if (fine && !reduce) {
    const glow = $('.cursor-glow');
    addEventListener('pointermove', (e) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }, { passive: true });
    $$('.card').forEach((c) => c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
    }));
    $$('.tilt').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
    $$('.magnetic').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  // ---------- Background node network ----------
  const cv = $('#bgCanvas');
  if (cv && !reduce) {
    const hexRgb = (h) => { h = h.trim().replace('#', ''); if (h.length === 3) h = h.split('').map((c) => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(','); };
    const cs = getComputedStyle(document.documentElement);
    let C1 = '106,92,255'; let C2 = '255,109,90';
    try { C1 = hexRgb(cs.getPropertyValue('--pri2')) || C1; C2 = hexRgb(cs.getPropertyValue('--pri')) || C2; } catch { /* keep defaults */ }
    const ctx = cv.getContext('2d'); let W, H, pts; const DPR = Math.min(devicePixelRatio || 1, 2);
    const init = () => {
      W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
      const n = Math.min(70, Math.floor((innerWidth * innerHeight) / 22000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25 * DPR, vy: (Math.random() - 0.5) * 0.25 * DPR }));
    };
    let mx = -1e4; let my = -1e4;
    addEventListener('pointermove', (e) => { mx = e.clientX * DPR; my = e.clientY * DPR; }, { passive: true });
    const draw = () => {
      ctx.clearRect(0, 0, W, H); const L = 140 * DPR;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]; const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < L) { ctx.strokeStyle = `rgba(${C1},${(1 - d / L) * 0.3})`; ctx.lineWidth = DPR; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        const dm = Math.hypot(p.x - mx, p.y - my);
        if (dm < L * 1.4) { ctx.strokeStyle = `rgba(${C2},${(1 - dm / (L * 1.4)) * 0.45})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke(); }
        ctx.fillStyle = `rgba(${C1},.45)`; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * DPR, 0, 7); ctx.fill();
      }
      if (!document.hidden) requestAnimationFrame(draw); else setTimeout(() => requestAnimationFrame(draw), 500);
    };
    init(); draw(); addEventListener('resize', init);
  }

  // ---------- Live demo ----------
  const D = window.__DEMO__ || {}; let scn = 'lead'; let running = false;
  const canvas = $('#demoCanvas'); const log = $('#demoLog');
  const drawDemo = () => {
    canvas.innerHTML = D[scn].nodes.map(([i, l]) => `<div class="dn"><div class="box">${i}</div><small>${l}</small></div>`).join('');
    log.textContent = '// "Execute Workflow" dabao…';
  };
  if (canvas) {
    drawDemo();
    $$('.demo-tabs button').forEach((b) => b.addEventListener('click', () => {
      if (running) return; $$('.demo-tabs button').forEach((x) => x.classList.remove('active')); b.classList.add('active'); scn = b.dataset.scn; drawDemo();
    }));
    $('#demoRun').addEventListener('click', async () => {
      if (running) return; running = true; drawDemo(); const nodes = $$('.dn', canvas); log.textContent = '';
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add('run'); log.textContent += `▶ [${new Date().toLocaleTimeString()}] ${D[scn].nodes[i][1]} … running\n`;
        await wait(650);
        nodes[i].classList.remove('run'); nodes[i].classList.add('done'); log.textContent += `  ✓ success · 1 item · ${Math.floor(40 + Math.random() * 300)}ms\n`;
        log.scrollTop = log.scrollHeight;
      }
      log.textContent += '\n// Output:\n' + JSON.stringify([{ json: D[scn].out }], null, 2);
      log.scrollTop = log.scrollHeight; running = false; toast('✅ Workflow executed successfully');
    });
  }

  // ---------- Project filters ----------
  $$('.filters button').forEach((b) => b.addEventListener('click', () => {
    $$('.filters button').forEach((x) => x.classList.remove('active')); b.classList.add('active');
    const f = b.dataset.filter;
    $$('.proj').forEach((p) => { const show = f === 'all' || p.dataset.cat === f; p.classList.toggle('hide', !show); if (show) p.classList.add('in'); });
  }));

  // ---------- Copy buttons ----------
  $$('.copy').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); toast('📋 Copied!'); } catch { toast('Copy nahi hua — manually select karein'); }
  }));

  // ---------- Pre-course checklist (saved locally) ----------
  const cks = $$('[data-ck]'); const saved = store.get('n8n-checklist') || [];
  const upd = () => {
    const done = cks.filter((c) => c.checked).length;
    $('#cprogBar').style.width = (done / cks.length) * 100 + '%';
    $('#cprogTxt').textContent = `${done} / ${cks.length} done${done === cks.length ? ' — aap ready ho! 🎉' : ''}`;
    store.set('n8n-checklist', cks.map((c) => c.checked));
  };
  cks.forEach((c, i) => { c.checked = !!saved[i]; c.addEventListener('change', upd); });
  if (cks.length) upd();

  // ---------- Calculators ----------
  $$('[data-calc]').forEach((calc) => {
    const ins = $$('input[type=range]', calc);
    const run = () => {
      const v = {}; ins.forEach((i) => { v[i.name] = +i.value; i.previousElementSibling.textContent = (+i.value).toLocaleString('en-IN'); });
      if (calc.dataset.calc === 'income') {
        const m = v.p * v.v + v.r * v.rv;
        $('#incomeOut').textContent = inr(m); $('#incomeYr').textContent = `≈ ${inr(m * 12)} per year`;
      } else {
        const hrs = v.h * (v.a / 100) * 52;
        $('#roiOut').textContent = inr(hrs * v.c); $('#roiHrs').textContent = `${Math.round(hrs).toLocaleString('en-IN')} hours saved per year · ${Math.round(hrs / 8)} working days`;
      }
    };
    ins.forEach((i) => i.addEventListener('input', run)); run();
  });

  // ---------- Countdowns ----------
  const cds = $$('[data-countdown]'); const shorts = $$('[data-countdown-short]');
  const tickCd = () => {
    cds.forEach((c) => {
      let s = Math.max(0, (new Date(c.dataset.countdown) - Date.now()) / 1000);
      const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s = Math.floor(s - m * 60);
      const set = (u, val) => { const el = $(`[data-u="${u}"]`, c); if (el) el.textContent = String(val).padStart(2, '0'); };
      set('d', d); set('h', h); set('m', m); set('s', s);
    });
    shorts.forEach((el) => {
      const ms = new Date(el.dataset.countdownShort) - Date.now(); const d = Math.ceil(ms / 86400000);
      el.textContent = ms <= 0 ? 'started — next soon' : d <= 1 ? 'tomorrow' : `in ${d} days`;
    });
  };
  tickCd(); setInterval(tickCd, 1000);

  // ---------- Testimonials slider ----------
  $$('[data-slider]').forEach((sl) => {
    const track = $('.slides', sl); const items = $$('.tcard', sl); const dots = $('.sl-dots', sl); let idx = 0; let timer;
    const per = () => (innerWidth <= 860 ? 1 : 3);
    const max = () => Math.max(0, items.length - per());
    const go = (i) => {
      idx = i < 0 ? max() : i > max() ? 0 : i;
      track.style.transform = `translateX(${-(100 / per()) * idx}%)`;
      $$('i', dots).forEach((d, k) => d.classList.toggle('on', k === idx));
    };
    const mkDots = () => { dots.innerHTML = Array.from({ length: max() + 1 }, () => '<i></i>').join(''); $$('i', dots).forEach((d, k) => d.addEventListener('click', () => go(k))); go(Math.min(idx, max())); };
    $('[data-prev]', sl).addEventListener('click', () => go(idx - 1));
    $('[data-next]', sl).addEventListener('click', () => go(idx + 1));
    const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(idx + 1), 5000); };
    sl.addEventListener('pointerenter', () => clearInterval(timer)); sl.addEventListener('pointerleave', auto);
    let sx = null;
    sl.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1)); sx = null; });
    addEventListener('resize', mkDots); mkDots(); auto();
  });

  // ---------- Glossary search ----------
  const gs = $('#glossSearch');
  gs?.addEventListener('input', () => {
    const q = gs.value.toLowerCase().trim();
    $$('.gl').forEach((g) => { g.classList.toggle('hide', !!q && !g.textContent.toLowerCase().includes(q)); g.classList.add('in'); });
  });

  // ---------- Plan buttons preselect form ----------
  $$('[data-plan]').forEach((a) => a.addEventListener('click', () => { const s = $('#enrollForm select[name=plan]'); if (s) s.value = a.dataset.plan; }));

  // ---------- Enrollment form ----------
  const form = $('#enrollForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault(); const msg = $('#formMsg'); msg.className = 'form-msg'; msg.textContent = '';
    let ok = true;
    $$('input[required]', form).forEach((i) => { const v = i.checkValidity(); i.classList.toggle('err', !v); if (!v) ok = false; });
    if (!ok) { msg.classList.add('bad'); msg.textContent = 'Please sahi details bharo (naam, phone, email).'; return; }
    const data = Object.fromEntries(new FormData(form)); const btn = $('button[type=submit]', form);
    btn.disabled = true; btn.textContent = 'Submitting…';
    try {
      const r = await fetch('/api/enroll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || 'Server error');
      msg.classList.add('ok'); msg.textContent = `🎉 Thank you ${data.name}! Hamari team 24 ghante mein call karegi.`; form.reset(); toast('Seat request received!');
    } catch (err) {
      // Fallback: WhatsApp par details bhejo (static hosting par bhi kaam karega)
      const txt = `Hi! Mujhe n8n course join karna hai.\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPlan: ${data.plan}\nBatch: ${data.batch}`;
      msg.classList.add('bad'); msg.innerHTML = `Server tak nahi pahunch paaye. <a href="https://wa.me/${window.__WA__}?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener" style="text-decoration:underline">WhatsApp par bhejo →</a>`;
    } finally { btn.disabled = false; btn.textContent = 'Reserve My Seat →'; }
  });

  // ---------- Lesson quiz ----------
  $$('[data-quiz]').forEach((qz) => {
    const score = $('[data-score]', qz); const items = $$('.qz', qz); let right = 0;
    items.forEach((q) => {
      const ans = +q.dataset.ans;
      $$('.opts button', q).forEach((b) => b.addEventListener('click', () => {
        if (q.classList.contains('done')) return;
        q.classList.add('done');
        const k = +b.dataset.k;
        $$('.opts button', q)[ans].classList.add('right');
        if (k !== ans) b.classList.add('wrong'); else right++;
        score.textContent = `Score: ${right} / ${items.length}${$$('.qz.done', qz).length === items.length ? (right === items.length ? ' — Perfect! 🎉' : ' — Lesson dobara dekho aur retry karo') : ''}`;
      }));
    });
  });

  // ---------- Nodes library filters ----------
  const ns = $('#nodeSearch');
  if (ns) {
    let tier = 'all'; let kind = 'all';
    const apply = () => {
      const q = ns.value.toLowerCase().trim();
      $$('.ncard').forEach((c) => {
        const ok = (!q || c.dataset.name.includes(q)) && (tier === 'all' || +c.dataset.tier <= +tier) && (kind === 'all' || c.dataset.kind === kind);
        c.classList.toggle('hide', !ok); if (ok) c.classList.add('in');
      });
      $$('.nodes-grid').forEach((g) => { const sec = g.closest('section'); sec.style.display = $$('.ncard:not(.hide)', g).length ? '' : 'none'; });
    };
    const group = (id, key, set) => $$(`#${id} button`).forEach((b) => b.addEventListener('click', () => {
      $$(`#${id} button`).forEach((x) => x.classList.remove('active')); b.classList.add('active'); set(b.dataset[key]); apply();
      if (ns.value || tier !== 'all' || kind !== 'all') document.querySelector('.nodes-grid')?.closest('section').scrollIntoView({ behavior: 'smooth' });
    }));
    group('tierFilter', 'tier', (v) => { tier = v; });
    group('kindFilter', 'kind', (v) => { kind = v; });
    ns.addEventListener('input', apply);
  }

  // Deep-link to a node card: reveal it immediately
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); t?.classList.add('in'); }
})();
