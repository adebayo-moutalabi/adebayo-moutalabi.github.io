/* =====================================================================
   COMPÉTENCES : filtre « Utilisés dans » de la carte de la stack.
   Le HTML est produit par js/render.js (et écrit dans index.html par scripts/generer.js).
   Contenu : data/competences.js (familles, outils) et data/projets.js (champ « outils »).
   ===================================================================== */
(function (S) {
  var stack = S.$('#stack'); if (!stack) return;
  S.$$('.stack-filtre button').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.dataset.p;
      S.$$('.stack-filtre button').forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      stack.classList.toggle('filtre', !!p);
      S.$$('.sk-o', stack).forEach(function (o) { o.classList.toggle('on', !!p && (' ' + o.dataset.p + ' ').indexOf(' ' + p + ' ') > -1); });
      S.$$('.sk', stack).forEach(function (c) { c.classList.toggle('vide', !!p && !c.querySelector('.sk-o.on')); });
    });
  });
})(window.Site);
