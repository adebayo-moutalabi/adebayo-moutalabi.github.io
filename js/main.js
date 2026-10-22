/* =====================================================================
   DÉMARRAGE : relie le défilement de la page à tous les modules.
   Chaque module enregistre sa fonction dans Site.frames ; elles sont
   rappelées à chaque défilement ou redimensionnement (une fois par image).
   ===================================================================== */
(function (S) {
  var tk = false;
  function onScroll() {
    if (tk) return; tk = true;
    requestAnimationFrame(function () { tk = false; S.frames.forEach(function (f) { f(); }); });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  S.frames.forEach(function (f) { f(); });
})(window.Site);
