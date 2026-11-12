/* =====================================================================
   PAGE « TOUS LES PROJETS » (projets/index.html) : filtre par catégorie et
   aperçu de la capture qui suit la souris sur ordinateur.
   La page est générée par scripts/generer.js à partir de js/data/projets.js.
   ===================================================================== */
(function () {
  var boutons = [].slice.call(document.querySelectorAll('.pc-filtres button'));
  var lignes = [].slice.call(document.querySelectorAll('.pc-l'));
  boutons.forEach(function (b) {
    b.addEventListener('click', function () {
      boutons.forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      lignes.forEach(function (l) { l.hidden = b.dataset.f !== 'all' && l.dataset.c !== b.dataset.f; });
    });
  });
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  lignes.forEach(function (l) {
    var img = l.querySelector('.pc-apercu'); if (!img) return;
    l.addEventListener('mousemove', function (e) {
      var r = l.getBoundingClientRect();
      img.style.transform = 'translate(' + (e.clientX - r.left + 24) + 'px,' + (e.clientY - r.top - 90) + 'px) rotate(-3deg)';
    });
  });
})();
