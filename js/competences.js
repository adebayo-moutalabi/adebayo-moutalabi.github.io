/* =====================================================================
   COMPÉTENCES : la carte de l'infrastructure. Les liaisons entre les blocs sont dessinées en SVG
   à partir de la position réelle des blocs (recalculées si la taille change), avec des « paquets »
   lumineux qui circulent dans le sens de la requête. Survoler un bloc met en avant ses liaisons.
   Sur téléphone, les blocs s'empilent et les liaisons deviennent un fil vertical (CSS).
   Contenu : data/competences.js (familles, outils, carte), data/logos.js.
   ===================================================================== */
(function (S) {
  var carte = S.$('#carte'); if (!carte) return;
  var svg = S.$('#carte-liens'), K = S.data.competences.carte, NS = 'http://www.w3.org/2000/svg', mots = S.$$('.lien-mot', carte);
  function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function ancre(r, c, cote) {
    var x = r.left - c.left, y = r.top - c.top;
    return cote === 'h' ? { x: x + r.width / 2, y: y } : cote === 'b' ? { x: x + r.width / 2, y: y + r.height }
      : cote === 'g' ? { x: x, y: y + r.height / 2 } : { x: x + r.width, y: y + r.height / 2 };
  }
  function dessiner() {
    svg.innerHTML = '';
    if (getComputedStyle(svg).display === 'none') return;
    var c = carte.getBoundingClientRect(); svg.setAttribute('viewBox', '0 0 ' + c.width + ' ' + c.height);
    K.liens.forEach(function (l, i) {
      var A = S.$('#nd-' + l[0]), B = S.$('#nd-' + l[1]); if (!A || !B) return;
      var ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
      var dx = (rb.left + rb.width / 2) - (ra.left + ra.width / 2), dy = (rb.top + rb.height / 2) - (ra.top + ra.height / 2), p, q, d;
      if (Math.abs(dx) > ra.width / 2 + 10 && Math.abs(dy) < ra.height / 2 + rb.height / 2) {   /* côte à côte */
        p = ancre(ra, c, dx > 0 ? 'd' : 'g'); q = ancre(rb, c, dx > 0 ? 'g' : 'd');
        var mx = (p.x + q.x) / 2; d = 'M' + p.x + ' ' + p.y + ' C' + mx + ' ' + p.y + ' ' + mx + ' ' + q.y + ' ' + q.x + ' ' + q.y;
      } else if (Math.abs(dx) > ra.width / 2 + 10) {                                                /* en diagonale */
        p = ancre(ra, c, dy > 0 ? 'b' : 'h'); q = ancre(rb, c, dx > 0 ? 'g' : 'd');
        d = 'M' + p.x + ' ' + p.y + ' C' + p.x + ' ' + q.y + ' ' + p.x + ' ' + q.y + ' ' + q.x + ' ' + q.y;
      } else {                                                                                       /* l'un sous l'autre */
        p = ancre(ra, c, dy > 0 ? 'b' : 'h'); q = ancre(rb, c, dy > 0 ? 'h' : 'b');
        var my = (p.y + q.y) / 2; d = 'M' + p.x + ' ' + p.y + ' C' + p.x + ' ' + my + ' ' + q.x + ' ' + my + ' ' + q.x + ' ' + q.y;
      }
      var g = el('g', { 'class': 'lien', 'data-de': l[0], 'data-vers': l[1] });
      g.appendChild(el('path', { d: d, 'class': 'lien-fond' }));
      g.appendChild(el('path', { d: d, 'class': 'lien-flux' }));
      if (!S.reduce) for (var k = 0; k < 2; k++) {
        var pt = el('circle', { r: 3.6, 'class': 'paquet' }), m = el('animateMotion', { dur: '2.6s', repeatCount: 'indefinite', begin: (-(k * 1.3 + i * .37)) + 's', path: d });
        pt.appendChild(m); g.appendChild(pt);
      }
      svg.appendChild(g);
      var mot = mots[i]; if (mot) { var t = ((p.x + q.x) / 2), u = ((p.y + q.y) / 2); mot.style.left = t + 'px'; mot.style.top = u + 'px'; }
    });
  }
  /* survol d'un bloc : ses liaisons s'allument, le reste s'efface */
  S.$$('.nd', carte).forEach(function (n) {
    var id = n.dataset.nd;
    function on(v) {
      carte.classList.toggle('focus', v); n.classList.toggle('actif', v);
      S.$$('.lien', svg).forEach(function (g) { g.classList.toggle('actif', v && (g.dataset.de === id || g.dataset.vers === id)); });
      K.liens.forEach(function (l, i) { if (mots[i]) mots[i].classList.toggle('actif', v && (l[0] === id || l[1] === id)); });
    }
    n.addEventListener('mouseenter', function () { on(true); }); n.addEventListener('mouseleave', function () { on(false); });
    n.addEventListener('focusin', function () { on(true); }); n.addEventListener('focusout', function () { on(false); });
  });
  var t; function plusTard() { clearTimeout(t); t = setTimeout(dessiner, 120); }
  if ('ResizeObserver' in window) new ResizeObserver(plusTard).observe(carte); else addEventListener('resize', plusTard);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(dessiner);
  dessiner();
})(window.Site);
