/* =====================================================================
   NAVIGATION : dock (barre du bas), thème clair/sombre, terminal ⌘K / Ctrl+K
   et la simulation « git push » (commande deploy).
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, reduce = S.reduce, fine = S.fine, toast = S.toast, go = S.go;

  /* ----- dock : effet de zoom (macOS) sur ordinateur ----- */
  var dock = $('#dock'), dks = $$('.dock .dk');
  if (fine && !reduce && innerWidth > 640) {
    dock.addEventListener('mousemove', function (e) {
      dks.forEach(function (d) { var r = d.getBoundingClientRect(), dist = Math.abs(e.clientX - (r.left + r.width / 2)); var s = 48 + 22 * Math.max(0, 1 - dist / 140); d.style.width = s + 'px'; d.style.height = s + 'px'; });
    });
    dock.addEventListener('mouseleave', function () { dks.forEach(function (d) { d.style.width = ''; d.style.height = ''; }); });
  }
  /* ----- section active (met en valeur l'icône du dock) ----- */
  var secs = S.data.profil.navigation.map(function (n) { return n.id; });
  function activeSec() {
    var cur = 'intro';
    secs.forEach(function (id) { var el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * .45) cur = id; });
    if (document.getElementById('choix').getBoundingClientRect().top < innerHeight * .45 && cur === 'intro') cur = 'intro';
    $$('.dock a.dk').forEach(function (a) { var m = { competences: 'labo', methode: 'labo' }[cur] || cur; a.classList.toggle('on', a.dataset.s === m); if (a.dataset.s === m) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  $('#dk-theme').addEventListener('click', function () {
    var root = document.documentElement, cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });
  S.frames.push(activeSec);

  /* ----- terminal de commandes : pour ajouter une commande, copiez une ligne de CMDS ----- */
  var bg = $('#pal-bg'), inp = $('#pal-in'), list = $('#pal-list'), sel = 0, lastP = null;
  var CMDS = [
    { k: 'deploy', l: 'Lancer un déploiement', h: 'git push origin main', r: deploy },
    { k: 'labo demo', l: 'Ouvrir le labo', h: 'section', r: function () { go('#labo'); } },
    { k: 'projets', l: 'Voir les projets', h: 'section', r: function () { go('#projets'); } },
    { k: 'parcours formations', l: 'Voir le parcours', h: 'section', r: function () { go('#parcours'); } },
    { k: 'competences stack orbite', l: 'Explorer les compétences', h: 'section', r: function () { go('#competences'); } },
    { k: 'methode', l: 'Voir ma méthode', h: 'section', r: function () { go('#methode'); } },
    { k: 'contact email mail linkedin', l: 'Me contacter', h: 'section', r: function () { go('#contact'); } },
    { k: 'theme sombre clair', l: 'Changer de thème', h: 'apparence', r: function () { $('#dk-theme').click(); } },
    { k: 'intro preloader chargement rejouer logo', l: 'Rejouer le chargement', h: 'le logo AM se déploie', r: function () { S.atom && S.atom.replay(); } },
    { k: 'whoami', l: 'whoami', h: 'qui est derrière ce site ?', r: function () { toast(S.data.profil.nomComplet + ' · ' + S.data.profil.accroche.pied); } }
  ];
  function fl() { var q = inp.value.trim().toLowerCase(); return CMDS.filter(function (c) { return !q || (c.k + ' ' + c.l).toLowerCase().indexOf(q) > -1; }); }
  function rd() { var f = fl(); if (sel >= f.length) sel = Math.max(0, f.length - 1); list.innerHTML = f.length ? f.map(function (c, i) { return '<li><button type="button" role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + esc(c.l) + '<small>' + esc(c.h) + '</small></button></li>'; }).join('') : '<li class="ph">Aucune commande. Essayez « deploy ».</li>'; }
  function openP() { lastP = document.activeElement; bg.hidden = false; inp.value = ''; sel = 0; rd(); setTimeout(function () { inp.focus(); }, 20); }
  function closeP() { bg.hidden = true; if (lastP) lastP.focus(); }
  function runP() { var c = fl()[sel]; if (c) { closeP(); c.r(); } }
  $('#dk-term').addEventListener('click', openP);
  inp.addEventListener('input', function () { sel = 0; rd(); });
  list.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { sel = +b.dataset.i; runP(); } });
  bg.addEventListener('click', function (e) { if (e.target === bg) closeP(); });
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); bg.hidden ? openP() : closeP(); return; }
    if (e.key === 'Escape') { if (!bg.hidden) closeP(); else if (S.sheetOpen()) S.closeSheet(); return; }
    if (bg.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(fl().length - 1, sel + 1); rd(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); rd(); }
    else if (e.key === 'Enter') { e.preventDefault(); runP(); }
  });
  var dBusy = false;
  function deploy() {
    if (dBusy) return; dBusy = true;
    var ov = document.createElement('div'); ov.className = 'deploy'; ov.setAttribute('role', 'status');
    ov.innerHTML = '<div class="dbox"><span class="caps" style="color:#a8a49c">Pipeline #31 · main</span><div class="dlog"></div><div class="pbar"><i></i></div></div>';
    document.body.appendChild(ov);
    var L = [['$ git push origin main', 'm'], ['Enumerating objects: 42, done.', 'm'], ['remote: pipeline #31 déclenché', 'm'], ['✓ lint & tests          00:42', 'o'], ['✓ docker build          01:18', 'o'], ['✓ push registry         00:21', 'o'], ['✓ deploy kubernetes     00:57', 'o'], ['Déployé. Sans intervention manuelle.', 'g']];
    var log = ov.querySelector('.dlog'), bar = ov.querySelector('.pbar i'), i = 0;
    var id = setInterval(function () {
      var d = document.createElement('div'); d.className = L[i][1]; d.textContent = L[i][0]; log.appendChild(d); i++; bar.style.width = (i / L.length * 100) + '%';
      if (i >= L.length) { clearInterval(id); setTimeout(function () { var f = document.createElement('div'); f.className = 'flash'; document.body.appendChild(f); setTimeout(function () { ov.remove(); }, 350); setTimeout(function () { f.remove(); dBusy = false; toast('Déploiement terminé en 3 min 18 s'); }, 1000); }, 700); }
    }, reduce ? 120 : 340);
  }
})(window.Site);
