/* =====================================================================
   PAGES DE PROJET ET « TOUS LES PROJETS » : la barre de navigation se cache quand on descend
   et revient quand on remonte ; la ligne dorée montre la progression de lecture ;
   sur téléphone, le bouton « Menu » ouvre la liste des liens.
   Pages générées par scripts/generer.js.
   ===================================================================== */
(function () {
  var top = document.getElementById('pp-top'), lecture = document.getElementById('pp-lecture'), burger = document.getElementById('pp-burger');
  if (!top) return;
  var avant = 0;
  function ouvrir(v) { top.classList.toggle('ouvert', v); burger.setAttribute('aria-expanded', v); burger.textContent = v ? 'Fermer' : 'Menu'; }
  addEventListener('scroll', function () {
    var y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (!top.classList.contains('ouvert')) top.classList.toggle('cache', y > 160 && y > avant + 4 ? true : y < avant - 4 ? false : top.classList.contains('cache'));
    avant = y;
    if (lecture) lecture.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
  }, { passive: true });
  burger.addEventListener('click', function () { ouvrir(!top.classList.contains('ouvert')); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') ouvrir(false); });
  document.addEventListener('click', function (e) { if (!top.contains(e.target)) ouvrir(false); });
})();
