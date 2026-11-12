/* =====================================================================
   MÉTHODE : le pipeline se lance quand la section arrive à l'écran. Les jobs passent
   « en cours » puis « réussi » l'un après l'autre, comme une exécution de CI.
   Sans JavaScript ou avec « réduire les animations », tout est affiché « réussi ».
   Contenu : data/methode.js
   ===================================================================== */
(function (S) {
  var run = S.$('#run'); if (!run || S.reduce || !('IntersectionObserver' in window)) return;
  var jobs = S.$$('.job', run), fil = S.$('#run-fil'), statut = S.$('#run-statut'), lance = false;
  function etat(cl) { run.className = 'run ' + cl; }
  etat('attente'); statut.textContent = 'En attente'; jobs.forEach(function (j) { j.className = 'job'; }); fil.style.transform = 'scaleX(0)';
  function jouer() {
    etat('cours'); statut.textContent = 'En cours';
    jobs.forEach(function (j, i) {
      setTimeout(function () { j.className = 'job cours'; fil.style.transform = 'scaleX(' + ((i + .5) / jobs.length) + ')'; }, i * 1100);
      setTimeout(function () { j.className = 'job ok'; }, i * 1100 + 900);
    });
    setTimeout(function () { etat('ok'); statut.textContent = 'Réussi'; fil.style.transform = 'scaleX(1)'; }, jobs.length * 1100 + 100);
  }
  new IntersectionObserver(function (en, obs) { if (en[0].isIntersecting && !lance) { lance = true; obs.disconnect(); jouer(); } }, { threshold: .35 }).observe(run);
})(window.Site);
