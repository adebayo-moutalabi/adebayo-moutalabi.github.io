/* =====================================================================
   PROJETS : fiche « Aperçu rapide » (tiroir latéral / bottom sheet sur mobile).
   Les lignes de la section sont produites par js/render.js
   Contenu : data/projets.js et data/vignettes.js
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, D = S.data.projets, ART = S.data.vignettes, P = D.liste;

  /* Vraie capture d'écran du projet si elle existe (champ « image »), sinon le dessin de vignettes.js */
  function vignette(p) { return p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy" width="' + (p.imageTaille || [1200, 678])[0] + '" height="' + (p.imageTaille || [1200, 678])[1] + '">' : (ART[p.vignette] || ''); }

  /* ----- fiche détaillée ----- */
  var sheetBg = $('#sheet-bg'), sheet = $('#sheet'), lastF = null;
  function openSheet(id) {
    var p = P.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    lastF = document.activeElement;
    sheet.innerHTML = '<span class="grab"></span><div class="sheet-top"><span class="caps">' + esc(p.type) + '</span><button type="button" class="x" id="sh-x" aria-label="Fermer la fiche">✕</button></div>' +
      '<div class="pthumb' + (p.image ? ' shot' : '') + '" style="border-radius:20px;border:1px solid var(--hair)" aria-hidden="true">' + vignette(p) + '</div>' +
      '<h3 id="sh-title">' + esc(p.titre) + '</h3><p class="lead">' + esc(p.intro) + '</p>' +
      (p.probleme ? '<span class="caps">Problème</span><p>' + esc(p.probleme) + '</p><span class="caps">Ce que j\'ai fait</span>' : '') +
      '<ul>' + p.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      (p.resultat ? '<span class="caps">Résultat</span><p>' + esc(p.resultat) + '</p>' : '') +
      '<div class="chips">' + p.techno.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
      ((p.liens || p.page) ? '<div style="display:grid;gap:10px">' + (p.page ? '<a class="btn" href="' + esc(p.page) + '">Page complète du projet →</a>' : '') + (p.liens || []).map(function (l) { return '<a class="btn btn-gold" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.texte) + ' ↗</a>'; }).join('') + '</div>' : '');
    sheetBg.hidden = false; document.body.style.overflow = 'hidden';
    $('#sh-x').focus();
  }
  function closeSheet() { sheetBg.hidden = true; document.body.style.overflow = ''; if (lastF) lastF.focus(); }
  document.addEventListener('click', function (e) { var c = e.target.closest('[data-fiche]'); if (c) openSheet(c.dataset.fiche); });
  sheetBg.addEventListener('click', function (e) { if (e.target === sheetBg || e.target.closest('#sh-x')) closeSheet(); });

  /* glisser vers le bas pour fermer (mobile) */
  var sy0 = null;
  sheet.addEventListener('touchstart', function (e) { if (sheet.scrollTop <= 0) sy0 = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchmove', function (e) { if (sy0 === null) return; var dy = e.touches[0].clientY - sy0; if (dy > 0) sheet.style.transform = 'translateY(' + dy + 'px)'; }, { passive: true });
  sheet.addEventListener('touchend', function (e) { if (sy0 === null) return; var dy = e.changedTouches[0].clientY - sy0; sheet.style.transform = ''; sy0 = null; if (dy > 110) closeSheet(); });

  S.openSheet = openSheet; S.closeSheet = closeSheet; S.sheetOpen = function () { return !sheetBg.hidden; };
})(window.Site);
