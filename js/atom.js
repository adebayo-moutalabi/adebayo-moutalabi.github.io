/* =====================================================================
   MASCOTTE « ATOM » : dessin, écran de chargement, barre de progression du haut
   de page (Atom marche dessus en suivant le défilement).
   Textes et réglages : data/mascotte.js. Navigation : data/profil.js.
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, reduce = S.reduce, fine = S.fine, toast = S.toast;

  /* ----- dessin de Atom (SVG). Couleurs : variables CSS --gold / --blue ----- */
  function botSVG() {
    return '<svg class="bot" viewBox="0 0 64 64" aria-hidden="true">' +
      '<g class="b-arm l"><path class="b-line" d="M13 40 L7 47"/></g><g class="b-arm r"><path class="b-line" d="M51 40 L57 47"/></g>' +
      '<g class="b-leg l"><path class="b-line" d="M25 55 L25 61"/></g><g class="b-leg r"><path class="b-line" d="M39 55 L39 61"/></g>' +
      '<rect class="b-body" x="17" y="42" width="30" height="15" rx="7"/>' +
      '<path class="b-line" d="M32 14 L32 8"/><circle class="b-ant" cx="32" cy="6" r="3.6"/>' +
      '<rect class="b-head" x="7" y="13" width="50" height="35" rx="15"/><circle class="b-head" cx="7" cy="31" r="4.5"/><circle class="b-head" cx="57" cy="31" r="4.5"/>' +
      '<rect class="b-face" x="13" y="19" width="38" height="23" rx="11"/>' +
      '<g class="b-eyes"><ellipse class="b-eye" cx="24" cy="29" rx="3.6" ry="4.4"/><ellipse class="b-eye" cx="40" cy="29" rx="3.6" ry="4.4"/></g>' +
      '<path class="b-mouth" d="M28 36 Q32 39.5 36 36"/></svg>';
  }
  var botNodes = [];
  function mountBot(el) { el.innerHTML = botSVG(); botNodes.push(el.querySelector('.b-eyes')); return el; }
  function lookAt(x, y, el) {
    var g = el.querySelector('.b-eyes'); if (!g) return; var r = el.getBoundingClientRect(), dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 220);
    g.style.transform = 'translate(' + (dx / d * 3.2 * m).toFixed(2) + 'px,' + (dy / d * 2.2 * m).toFixed(2) + 'px)';
  }
  function hopBot(el) { el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop'); }

  /* ===== rail de progression ===== */
  var rail = $('#rail'), railFill = $('#rail-fill'), railBot = $('#rail-bot'), railFlip = $('#rail-flip'), railSay = $('#rail-say'), railNow = $('#rail-now'), railMks = $('#rail-mks');
  mountBot($('#rail-b'));
  var NAV = S.data.profil.navigation;
  var RS = NAV.map(function (n) { return [n.id, n.nom]; }), SAY = {};
  NAV.forEach(function (n) { if (n.bulle) SAY[n.id] = n.bulle; });
  railMks.innerHTML = RS.map(function (r, i) { return '<button type="button" class="rail-mk" data-s="' + r[0] + '" aria-label="Aller à ' + r[1] + '"><b></b><em>' + r[1] + '</em></button>'; }).join('');
  var mkEls = $$('#rail-mks .rail-mk'), rW = 0, rLast = 0, rP = 0, rDir = 1, rIdle = null, rSayT = null, rCur = -1, rWave = null;
  function railMeasure() {
    var inn = rail.querySelector('.rail-in'); rW = inn.clientWidth; var max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    mkEls.forEach(function (m, i) {
      var el = document.getElementById(RS[i][0]); var y = i === 0 ? 0 : (el ? el.getBoundingClientRect().top + scrollY : 0);
      var p = Math.max(0, Math.min(1, y / max)); m._p = p; m.style.left = (p * 100) + '%';
    });
  }
  function railSayNow(t) { railSay.textContent = t; railSay.classList.add('on'); clearTimeout(rSayT); rSayT = setTimeout(function () { railSay.classList.remove('on'); }, 1900); }
  var rMeas = 0;
  function railFrame() {
    if (performance.now() - rMeas > 500) { rMeas = performance.now(); railMeasure(); }
    var max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = Math.max(0, Math.min(1, scrollY / max));
    if (p !== rP) { rDir = p > rP ? 1 : -1; railFlip.style.transform = rDir < 0 ? 'scaleX(-1)' : ''; }
    rP = p; railFill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    railBot.style.transform = 'translateX(' + (p * rW).toFixed(1) + 'px)';
    var cur = 0; mkEls.forEach(function (m, i) { var on = p >= m._p - .001; m.classList.toggle('on', on); if (on) cur = i; });
    if (cur !== rCur) { var first = rCur === -1; rCur = cur; railNow.textContent = '0' + (cur + 1) + ' / ' + RS[cur][1]; if (!first && SAY[RS[cur][0]] && rail.classList.contains('show')) railSayNow(SAY[RS[cur][0]]); }
    rail.classList.toggle('done', p > .985); railBot.firstElementChild.nextElementSibling.classList.toggle('wave', p > .985);
    railBot.classList.add('walk'); clearTimeout(rIdle); rIdle = setTimeout(function () { railBot.classList.remove('walk'); }, 220);
  }
  rail.addEventListener('click', function (e) { var b = e.target.closest('.rail-mk'); if (b) { var el = document.getElementById(b.dataset.s); if (el) { if (b.dataset.s === 'intro') scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); } } });
  railBot.addEventListener('mouseenter', function () { hopBot(railBot.firstElementChild.nextElementSibling); });
  addEventListener('resize', function () { railMeasure(); railFrame(); });
  addEventListener('load', function () { railMeasure(); railFrame(); });
  setTimeout(function () { railMeasure(); railFrame(); }, 600);
  if (fine) addEventListener('pointermove', function (e) { if (rail.classList.contains('show')) lookAt(e.clientX, e.clientY, railBot); }, { passive: true });

  /* ===== preloader ===== */
  var M = S.data.mascotte, CH = M.chargement, pre = null;
  function preHTML() {
    return '<div class="pre" id="pre" role="status" aria-live="polite" aria-label="Chargement du site"><canvas id="pre-cv" aria-hidden="true"></canvas><div class="pre-c">' +
      '<div class="pre-bot" id="pre-bot" role="button" tabindex="0" aria-label="' + esc(M.nom) + ', la mascotte : cliquez pour accélérer le chargement"></div>' +
      '<div class="pre-n" aria-hidden="true"><span id="pre-n">0</span><small>%</small></div>' +
      '<div class="pre-lab" id="pre-lab"><b>$</b><span id="pre-t">' + esc(CH.commandes[0][1]) + '</span><i class="caret"></i></div>' +
      '<div class="pre-bar" aria-hidden="true"><i id="pre-f"></i>' + CH.commandes.slice(1).map(function (c) { return '<span style="left:' + c[0] + '%"></span>'; }).join('') + '</div>' +
      '<p class="pre-hint" id="pre-hint">' + esc(CH.indice) + '</p></div><button type="button" class="pre-skip" id="pre-skip">' + esc(CH.passer) + '</button></div>';
  }
  function removeBoot() { var b = document.getElementById('pre-boot'); if (b) b.remove(); }
  function lockScroll(on) { document.documentElement.style.overflow = on ? 'hidden' : ''; }
  function showRail(msg) { rail.classList.add('show'); railMeasure(); railFrame(); if (msg) setTimeout(function () { railSayNow(msg); }, 350); }
  function runPre(replay) {
    var seen = false; try { seen = sessionStorage.getItem('site-pre') === '1'; } catch (e) {}
    if (!replay && (!CH.actif || reduce || (CH.uneFoisParSession && seen))) { removeBoot(); showRail(); return; }
    try { sessionStorage.setItem('site-pre', '1'); } catch (e) {}
    var host = document.createElement('div'); host.innerHTML = preHTML(); pre = host.firstChild; document.body.insertBefore(pre, document.body.firstChild); removeBoot();
    lockScroll(true); if (replay) scrollTo(0, 0);
    var botEl = mountBot($('#pre-bot')), nEl = $('#pre-n'), fEl = $('#pre-f'), tEl = $('#pre-t'), lab = $('#pre-lab'), hint = $('#pre-hint'), dots = $$('.pre-bar span');
    var STG = CH.commandes, speed = 3 / (CH.dureeSecondes || 3);   /* vitesse relative à la durée voulue */
    var v = 0, last = performance.now(), done = false, raf = 0, boosts = 0, fin = false;
    /* constellation interactive */
    var cv = $('#pre-cv'), cx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(2, devicePixelRatio || 1), mx = -999, my = -999, P = [], cs = getComputedStyle(document.documentElement), colL = (cs.getPropertyValue('--line-art') || '#c9a86a').trim(), colG = (cs.getPropertyValue('--gold') || '#e8b65f').trim();
    function size() { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); var n = Math.round(Math.min(70, W * H / 15000)); P = []; for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.4 + .6 }); }
    size(); addEventListener('resize', size);
    function onMove(e) { mx = e.clientX; my = e.clientY; lookAt(mx, my, botEl); }
    pre.addEventListener('pointermove', onMove);
    function drawNet() {
      cx.clearRect(0, 0, W, H); var conn = 130 + v * 1.2;
      P.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        var dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy); if (d < 120) { p.x += dx / d * (120 - d) * .04; p.y += dy / d * (120 - d) * .04; }
      });
      cx.lineWidth = 1;
      for (var i = 0; i < P.length; i++) { for (var j = i + 1; j < P.length; j++) { var d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y); if (d < conn) { cx.globalAlpha = (1 - d / conn) * .35; cx.strokeStyle = colL; cx.beginPath(); cx.moveTo(P[i].x, P[i].y); cx.lineTo(P[j].x, P[j].y); cx.stroke(); } } }
      cx.globalAlpha = .75; cx.fillStyle = colG; P.forEach(function (p) { cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill(); }); cx.globalAlpha = 1;
    }
    function boost() { if (fin) return; boosts++; v = Math.min(99.5, v + CH.clicBonus); hopBot(botEl); if (boosts === 3) hint.textContent = CH.indiceMerci; }
    botEl.addEventListener('click', boost);
    botEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); boost(); } });
    function tick(t) {
      var dt = Math.min(60, t - last); last = t;
      if (!fin) { var sp = v < 25 ? .031 : v < 55 ? .026 : v < 82 ? .035 : .024; v = Math.min(100, v + dt * sp * speed); }
      var shown = Math.floor(v); nEl.textContent = shown; fEl.style.width = v + '%';
      for (var i = STG.length - 1; i >= 0; i--) if (v >= STG[i][0]) { if (tEl.textContent !== STG[i][1] && !fin) tEl.textContent = STG[i][1]; break; }
      dots.forEach(function (d, i) { d.classList.toggle('on', v >= STG[i + 1][0]); });
      drawNet();
      if (v >= 100 && !fin) { fin = true; finish(); }
      if (!done) raf = requestAnimationFrame(tick);
    }
    function finish() {
      lab.classList.add('ok'); lab.innerHTML = '<b>✓</b><span>' + esc(CH.termine) + '</span>'; hint.textContent = ''; nEl.textContent = 100; fEl.style.width = '100%'; hopBot(botEl);
      setTimeout(exit, 650);
    }
    function exit() {
      if (done) return; done = true; cancelAnimationFrame(raf);
      railMeasure(); railFrame(); var tr = railBot.getBoundingClientRect(); /* cible : rail (même hors affichage) */
      var tw = railBot.offsetWidth, th = railBot.offsetHeight, tl = railBot.getBoundingClientRect().left, tt = railBot.getBoundingClientRect().top;
      var r = botEl.getBoundingClientRect(); botEl.style.animation = 'none';
      var fl = document.createElement('div'); fl.className = 'fly'; fl.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px'; fl.innerHTML = botSVG(); document.body.appendChild(fl);
      botEl.style.visibility = 'hidden';
      var sc = tw / r.width, dx = tl - r.left, dy = tt - r.top, dur = 950;
      var anim = fl.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: 'translate(' + (dx * .5) + 'px,' + (dy * .5 - 90) + 'px) scale(' + ((1 + sc) / 2 + .1) + ')', offset: .55 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')' }], { duration: dur, easing: 'cubic-bezier(.55,0,.25,1)', fill: 'forwards' });
      var hole = Math.hypot(innerWidth, innerHeight) / 2 + 40, t0 = performance.now();
      pre.querySelector('.pre-c').style.transition = 'opacity .4s'; pre.querySelector('.pre-c').style.opacity = 0; $('#pre-skip').style.display = 'none';
      (function reveal(t) {
        var k = Math.min(1, (t - t0 - 150) / 850); if (k < 0) k = 0; var e = k * k * (3 - 2 * k), r2 = e * hole;
        var m = 'radial-gradient(circle at 50% 50%, transparent ' + r2 + 'px, #000 ' + (r2 + 2) + 'px)'; pre.style.webkitMaskImage = m; pre.style.maskImage = m;
        if (k < 1) requestAnimationFrame(reveal); else { pre.remove(); lockScroll(false); removeEventListener('resize', size); }
      })(t0);
      anim.onfinish = function () { fl.remove(); showRail(replay ? M.bulles.retour : M.bulles.arrivee); railBot.classList.add('walk'); setTimeout(function () { railBot.classList.remove('walk'); }, 600); };
    }
    function skip() { if (fin) return; v = 100; }
    $('#pre-skip').addEventListener('click', skip);
    addEventListener('keydown', function sk(e) { if (!document.getElementById('pre')) { removeEventListener('keydown', sk); return; } if (e.key === 'Escape') skip(); });
    raf = requestAnimationFrame(tick);
  }
  function replayPre() {
    if (document.getElementById('pre')) return;
    rail.classList.remove('show'); runPre(true);
  }
  S.atom = { replay: replayPre };
  S.frames.push(railFrame);
  runPre(false);   /* lancé une fois la page construite */
})(window.Site);
