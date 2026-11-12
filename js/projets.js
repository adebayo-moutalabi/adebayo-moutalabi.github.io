/* =====================================================================
   PROJETS : grille filtrable + fiche détaillée (tiroir latéral / bottom sheet sur mobile)
   Contenu : data/projets.js et data/vignettes.js
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, D = S.data.projets, ART = S.data.vignettes, P = D.liste;

  var grid = $('#pgrid'), filter = 'all';
  function drawP() {
    grid.innerHTML = P.filter(function (p) { return filter === 'all' || p.categorie === filter; }).map(function (p) {
      return '<button type="button" class="pcard' + (p.large && filter === 'all' ? ' wide' : '') + '" id="projet-' + esc(p.id) + '" data-id="' + esc(p.id) + '" aria-haspopup="dialog">' +
        '<div class="pthumb" aria-hidden="true">' + (ART[p.vignette] || '') + '</div><div class="pbody"><span class="caps">' + esc(p.type) + '</span><h3>' + esc(p.titre) + '</h3><p>' + esc(p.resume) + '</p><span class="pmore">Voir la fiche →</span></div></button>';
    }).join('');
  }
  drawP();
  $$('.filters button').forEach(function (b) { b.addEventListener('click', function () { filter = b.dataset.f; $$('.filters button').forEach(function (o) { o.setAttribute('aria-pressed', o === b); }); drawP(); }); });
  grid.addEventListener('mousemove', function (e) {   /* halo qui suit la souris */
    var c = e.target.closest('.pcard'); if (!c) return; var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* ----- fiche détaillée ----- */
  var sheetBg = $('#sheet-bg'), sheet = $('#sheet'), lastF = null;
  function openSheet(id) {
    var p = P.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    lastF = document.activeElement;
    sheet.innerHTML = '<span class="grab"></span><div class="sheet-top"><span class="caps">' + esc(p.type) + '</span><button type="button" class="x" id="sh-x" aria-label="Fermer la fiche">✕</button></div>' +
      '<div class="pthumb" style="border-radius:20px;border:1px solid var(--hair)" aria-hidden="true">' + (ART[p.vignette] || '') + '</div>' +
      '<h3 id="sh-title">' + esc(p.titre) + '</h3><p class="lead">' + esc(p.intro) + '</p>' +
      (p.probleme ? '<span class="caps">Problème</span><p>' + esc(p.probleme) + '</p><span class="caps">Ce que j\'ai fait</span>' : '') +
      '<ul>' + p.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      (p.resultat ? '<span class="caps">Résultat</span><p>' + esc(p.resultat) + '</p>' : '') +
      '<div class="chips">' + p.techno.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
      (p.liens ? '<div style="display:grid;gap:10px">' + p.liens.map(function (l) { return '<a class="btn btn-gold" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.texte) + ' ↗</a>'; }).join('') + '</div>' : '');
    sheetBg.hidden = false; document.body.style.overflow = 'hidden';
    $('#sh-x').focus();
  }
  function closeSheet() { sheetBg.hidden = true; document.body.style.overflow = ''; if (lastF) lastF.focus(); }
  grid.addEventListener('click', function (e) { var c = e.target.closest('.pcard'); if (c) openSheet(c.dataset.id); });
  sheetBg.addEventListener('click', function (e) { if (e.target === sheetBg || e.target.closest('#sh-x')) closeSheet(); });

  /* glisser vers le bas pour fermer (mobile) */
  var sy0 = null;
  sheet.addEventListener('touchstart', function (e) { if (sheet.scrollTop <= 0) sy0 = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchmove', function (e) { if (sy0 === null) return; var dy = e.touches[0].clientY - sy0; if (dy > 0) sheet.style.transform = 'translateY(' + dy + 'px)'; }, { passive: true });
  sheet.addEventListener('touchend', function (e) { if (sy0 === null) return; var dy = e.changedTouches[0].clientY - sy0; sheet.style.transform = ''; sy0 = null; if (dy > 110) closeSheet(); });

  S.openSheet = openSheet; S.closeSheet = closeSheet; S.sheetOpen = function () { return !sheetBg.hidden; };
})(window.Site);
