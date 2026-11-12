/* =====================================================================
   COMPÉTENCES : la pile de couches. Au défilement, la pile s'ouvre et la couche courante
   monte et se détaille à côté. Survoler une couche dans la liste la montre aussi.
   Sur téléphone (ou avec « réduire les animations ») : pile ouverte, fiches les unes sous les autres.
   Contenu : data/competences.js (familles, outils, ordre de la pile), data/logos.js.
   ===================================================================== */
(function (S) {
  var pile = S.$('#pile'); if (!pile) return;
  var couches = S.$$('.couche', pile), fiches = S.$$('.pd', pile), liens = S.$$('.pile-index a', pile), n = couches.length, actif = -1, force = -1;
  var mobile = function () { return innerWidth <= 900 || S.reduce; };
  function montrer(i) {
    if (i === actif) return; actif = i;
    couches.forEach(function (c, k) { c.classList.toggle('on', k === i); c.classList.toggle('dessus', k > i); });
    fiches.forEach(function (f, k) { f.classList.toggle('on', k === i); });
    liens.forEach(function (a) { a.classList.toggle('on', +a.dataset.i === i); });
  }
  function auDefilement() {
    if (mobile()) { pile.style.setProperty('--ecart', '34px'); return; }
    var r = pile.getBoundingClientRect(), course = r.height - innerHeight, p = S.clamp(-r.top / Math.max(1, course));
    pile.style.setProperty('--ecart', (12 + 46 * S.clamp(p * 3.2)).toFixed(1) + 'px');
    montrer(force > -1 ? force : Math.min(n - 1, Math.floor(p * n)));
  }
  S.frames.push(auDefilement);
  liens.forEach(function (a) {
    var i = +a.dataset.i;
    a.addEventListener('mouseenter', function () { force = i; montrer(i); });
    a.addEventListener('mouseleave', function () { force = -1; auDefilement(); });
    a.addEventListener('click', function (e) {
      if (mobile()) return; e.preventDefault(); force = -1;
      var r = pile.getBoundingClientRect(), course = r.height - innerHeight;
      scrollTo({ top: scrollY + r.top + (i + .5) / n * course, behavior: S.reduce ? 'auto' : 'smooth' });
    });
  });
  montrer(0); auDefilement();
})(window.Site);
