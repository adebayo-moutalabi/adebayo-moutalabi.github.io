/* =====================================================================
   COMPÉTENCES : la « boîte à outils ». Les outils tombent dans la boîte ; à la souris on les
   attrape et on les lance, sur téléphone un toucher les fait sauter. Les boutons filtrent par famille.
   Moteur physique : Matter.js, chargé seulement quand la section approche (performance).
   Sans Matter.js ou avec « réduire les animations », les outils s'affichent en grille.
   Contenu : data/competences.js (familles, outils), data/logos.js (logos).
   ===================================================================== */
(function (S) {
  var box = S.$('#tb'); if (!box) return;
  var esc = S.esc, C = S.data.competences, LOGOS = S.data.logos || {}, info = S.$('#tb-info');
  var fams = {}; C.familles.forEach(function (f) { fams[f.id] = f; });
  var outils = C.outils.map(function (o) { return { o: o, f: fams[o.famille], ico: LOGOS[o.nom] }; });
  var reduit = matchMedia('(prefers-reduced-motion: reduce)').matches, fin = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var filtre = 'all', moteur = null;

  function setInfo(t) {
    if (t) info.innerHTML = '<b>' + esc(t.o.nom) + '</b><span>' + esc(t.f.nom) + ' · ' + esc(t.o.role) + '</span>';
    else if (filtre !== 'all') info.innerHTML = '<b>' + esc(fams[filtre].nom) + '</b><span>' + esc(fams[filtre].resume) + '</span>';
    else info.innerHTML = '<b>' + outils.length + ' outils</b><span>' + C.familles.map(function (f) { return esc(f.nom); }).join(' · ') + '</span>';
  }
  var choisis = function () { return outils.filter(function (t) { return filtre === 'all' || t.f.id === filtre; }); };

  /* ----- version sans moteur : une grille de tuiles ----- */
  function grille() {
    if (box.querySelector('.tb-grille')) return majGrille();
    box.classList.add('statique');
    var g = document.createElement('ul'); g.className = 'tb-grille';
    g.innerHTML = outils.map(function (t, i) {
      return '<li class="tb-t' + (t.ico ? ' logo' : '') + (t.f.ia ? ' ia' : '') + '" data-i="' + i + '" tabindex="0">' + (t.ico ? '<img src="assets/outils/' + t.ico + '.svg" alt="" width="30" height="30">' : '') + '<span>' + esc(t.o.nom) + '</span></li>';
    }).join('');
    box.appendChild(g);
    g.addEventListener('mouseover', function (e) { var li = e.target.closest('.tb-t'); if (li) setInfo(outils[li.dataset.i]); });
    g.addEventListener('focusin', function (e) { var li = e.target.closest('.tb-t'); if (li) setInfo(outils[li.dataset.i]); });
    g.addEventListener('mouseleave', function () { setInfo(null); });
    majGrille();
  }
  function majGrille() { S.$$('.tb-t', box).forEach(function (li) { li.hidden = filtre !== 'all' && outils[li.dataset.i].f.id !== filtre; }); }

  /* ----- filtres ----- */
  S.$$('.tb-filtres button').forEach(function (b) {
    b.addEventListener('click', function () {
      filtre = b.dataset.f;
      S.$$('.tb-filtres button').forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      setInfo(null);
      if (moteur) moteur.lacher(); else grille();
    });
  });

  /* ----- version avec moteur physique ----- */
  function physique() {
    var M = window.Matter, Engine = M.Engine, Bodies = M.Bodies, Composite = M.Composite, Body = M.Body, Query = M.Query;
    var cv = document.createElement('canvas'); cv.setAttribute('aria-hidden', 'true'); box.prepend(cv);
    var ctx = cv.getContext('2d'), engine = Engine.create({ gravity: { y: 1.1 } });
    var W = 0, H = 0, dpr = 1, murs = [], corps = [], survol = null, enCours = false, dernier = 0, couleurs = {}, n = 0;
    var imgs = {}; outils.forEach(function (t) { if (t.ico && !imgs[t.ico]) { var im = new Image(); im.src = 'assets/outils/' + t.ico + '.svg'; imgs[t.ico] = im; } });
    function lireCouleurs() { var cs = getComputedStyle(document.documentElement); ['--surface', '--ink', '--gold', '--blue', '--hair', '--on-gold'].forEach(function (k) { couleurs[k] = cs.getPropertyValue(k).trim() || '#888'; }); }
    function taille() { return innerWidth < 640 ? 56 : 74; }
    function dimensionner() {
      W = box.clientWidth; H = box.clientHeight; dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      Composite.remove(engine.world, murs); var e = 200;
      murs = [Bodies.rectangle(W / 2, H + e / 2, W * 3, e, { isStatic: true }), Bodies.rectangle(-e / 2, H / 2, e, H * 4, { isStatic: true }), Bodies.rectangle(W + e / 2, H / 2, e, H * 4, { isStatic: true })];
      Composite.add(engine.world, murs);
    }
    function lacher() {
      Composite.remove(engine.world, corps); corps = [];
      var s = taille(); ctx.font = '500 ' + (s < 60 ? 13 : 15) + 'px Inter, system-ui, sans-serif';
      choisis().forEach(function (t, i) {
        setTimeout(function () {
          var w = t.ico ? s : Math.max(s, ctx.measureText(t.o.nom).width + 30), h = t.ico ? s : Math.round(s * .62);
          var b = Bodies.rectangle(w / 2 + Math.random() * Math.max(1, W - w), -h - Math.random() * 220, w, h, { chamfer: { radius: Math.min(w, h) * .3 }, restitution: .45, friction: .3, frictionAir: .01, angle: (Math.random() - .5) * .8 });
          b.t = t; b.w = w; b.h = h; Body.setVelocity(b, { x: (Math.random() - .5) * 4, y: 2 });
          corps.push(b); Composite.add(engine.world, b);
        }, i * 55);
      });
    }
    function arrondi(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function dessiner() {
      if (n++ % 60 === 0) lireCouleurs();
      var s = taille(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.font = '500 ' + (s < 60 ? 13 : 15) + 'px Inter, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      corps.forEach(function (b) {
        var t = b.t, w = b.w, h = b.h, actif = b === survol, r = Math.min(w, h) * .3;
        ctx.save(); ctx.translate(b.position.x, b.position.y); ctx.rotate(b.angle);
        ctx.shadowColor = 'rgba(0,0,0,.22)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 7;
        arrondi(-w / 2, -h / 2, w, h, r);
        ctx.fillStyle = actif ? couleurs['--gold'] : t.ico ? '#ffffff' : couleurs['--surface']; ctx.fill();
        ctx.shadowColor = 'transparent'; ctx.lineWidth = t.f.ia ? 1.5 : 1;
        ctx.strokeStyle = t.f.ia ? couleurs['--blue'] : couleurs['--hair']; ctx.stroke();
        if (t.ico) {
          var im = imgs[t.ico], is = s * .52;
          if (actif) { arrondi(-is / 2 - 6, -is / 2 - 6, is + 12, is + 12, 10); ctx.fillStyle = '#fff'; ctx.fill(); }
          if (im.complete && im.naturalWidth) ctx.drawImage(im, -is / 2, -is / 2, is, is);
        } else { ctx.fillStyle = actif ? couleurs['--on-gold'] : couleurs['--ink']; ctx.fillText(t.o.nom, 0, 1); }
        ctx.restore();
      });
    }
    function boucle(now) { if (!enCours) return; Engine.update(engine, Math.max(4, Math.min(32, now - dernier))); dernier = now; dessiner(); requestAnimationFrame(boucle); }
    function corpsSous(e) { var r = cv.getBoundingClientRect(); return { p: { x: e.clientX - r.left, y: e.clientY - r.top } }; }
    lireCouleurs(); dimensionner();
    if (fin) {
      var souris = M.Mouse.create(cv); souris.pixelRatio = 1;
      ['mousewheel', 'DOMMouseScroll', 'wheel'].forEach(function (ev) { cv.removeEventListener(ev, souris.mousewheel); });
      Composite.add(engine.world, M.MouseConstraint.create(engine, { mouse: souris, constraint: { stiffness: .2, render: { visible: false } } }));
      cv.addEventListener('mousemove', function () {
        var h = Query.point(corps, souris.position)[0] || null;
        if (h !== survol) { survol = h; setInfo(h ? h.t : null); cv.style.cursor = h ? 'grab' : 'default'; }
      });
      cv.addEventListener('mouseleave', function () { survol = null; setInfo(null); });
    } else {
      cv.addEventListener('click', function (e) {
        var p = corpsSous(e).p, h = Query.point(corps, p)[0]; survol = h || null; setInfo(h ? h.t : null);
        corps.forEach(function (b) { var dx = b.position.x - p.x, dy = b.position.y - p.y, d = Math.hypot(dx, dy) || 1; if (d < 220) Body.setVelocity(b, { x: dx / d * 14, y: -Math.abs(dy / d * 14) - 6 }); });
      });
    }
    var lance = false;
    new IntersectionObserver(function (en) {
      enCours = en[0].isIntersecting;
      if (enCours) { if (!lance) { lance = true; lacher(); } dernier = performance.now(); requestAnimationFrame(boucle); }
    }, { threshold: .2 }).observe(box);
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(dimensionner, 200); });
    return { lacher: lacher };
  }

  /* ----- chargement de Matter.js quand la section approche ----- */
  if (reduit || !('IntersectionObserver' in window)) { grille(); return; }
  var obs = new IntersectionObserver(function (en) {
    if (!en[0].isIntersecting) return; obs.disconnect();
    var sc = document.createElement('script');
    sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    sc.onload = function () { try { moteur = physique(); } catch (e) { grille(); } };
    sc.onerror = grille;
    document.head.appendChild(sc);
  }, { rootMargin: '600px 0px' });
  obs.observe(box);
})(window.Site);
