/* =====================================================================
   CE QUE JE FAIS : les trois panneaux. Le panneau actif s'élargit, le point doré glisse le long
   du fil jusqu'à lui. Défilement automatique tant que le visiteur n'a pas touché aux panneaux.
   Sur téléphone, les trois panneaux sont ouverts les uns sous les autres.
   ===================================================================== */
(function (S) {
  var fil = S.$('#fil'); if (!fil) return;
  var doms = S.$$('.dom', fil), point = S.$('#fil-point'), actif = 0, auto = !matchMedia('(prefers-reduced-motion: reduce)').matches, minuteur = null, visible = false;
  function ouvrir(i) {
    actif = i;
    doms.forEach(function (d, k) { d.classList.toggle('on', k === i); S.$('.dom-btn', d).setAttribute('aria-expanded', k === i); });
    point.style.left = ((i + .5) / doms.length * 100) + '%';
  }
  function stop() { auto = false; clearInterval(minuteur); }
  doms.forEach(function (d, i) {
    S.$('.dom-btn', d).addEventListener('click', function () { stop(); ouvrir(i); });
    d.addEventListener('mouseenter', function () { if (matchMedia('(hover: hover)').matches) { stop(); ouvrir(i); } });
  });
  ouvrir(0);
  new IntersectionObserver(function (en) {
    visible = en[0].isIntersecting; clearInterval(minuteur);
    if (visible && auto) minuteur = setInterval(function () { ouvrir((actif + 1) % doms.length); }, 4500);
  }, { threshold: .4 }).observe(fil);
})(window.Site);
