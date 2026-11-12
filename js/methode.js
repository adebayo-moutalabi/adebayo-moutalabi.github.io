/* =====================================================================
   MÉTHODE : la ligne et les étapes se remplissent au défilement.
   Contenu : data/methode.js
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, clamp = S.clamp, reduce = S.reduce;
  var mEl = $('#method'), mLine = $('#mline'), mSteps = $$('.mstep');
  function methodScroll() {
    var r = mEl.getBoundingClientRect(), vh = innerHeight, mob = innerWidth <= 980;
    var p = clamp((vh * .8 - r.top) / (r.height + vh * .2));
    if (reduce) p = 1;
    mLine.style.transform = mob ? 'scaleY(' + p + ')' : 'scaleX(' + p + ')';
    mSteps.forEach(function (s, i) { s.classList.toggle('on', p >= (mob ? i / mSteps.length + .05 : i / (mSteps.length - 1) * .92 + .02)); });
  }
  S.frames.push(methodScroll);
})(window.Site);
