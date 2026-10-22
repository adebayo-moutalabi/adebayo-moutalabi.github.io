/* =====================================================================
   COMPÉTENCES : panneaux dépliables (un par famille d'outils)
   Contenu : data/competences.js. Les boutons de projets sont déduits de
   data/projets.js (champ « outils »).
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, reduce = S.reduce, fine = S.fine, C = S.data.competences, PRJ = S.data.projets.liste;

  var pnEl = $('#panels'), curP = 0, N = C.familles.length;
  pnEl.innerHTML = C.familles.map(function (f, i) {
    var list = C.outils.filter(function (o) { return o.famille === f.id; });
    return '<div class="pn' + (f.ia ? ' ai' : '') + '" data-p="' + i + '"><button type="button" class="pn-tab" id="pt-' + i + '" aria-expanded="false" aria-controls="pb-' + i + '"><span class="no">0' + (i + 1) + '</span><span class="vt">' + esc(f.nom) + '</span><span class="ct">' + list.length + '</span></button>' +
      '<div class="pn-body" id="pb-' + i + '" role="region" aria-labelledby="pt-' + i + '"><div class="pn-head"><span class="caps">Couche 0' + (i + 1) + ' sur ' + N + '</span><h3>' + esc(f.nom) + '</h3><p>' + esc(f.resume) + '</p></div><div class="pt">' +
      list.map(function (o, k) {
        var used = PRJ.filter(function (p) { return (p.outils || []).indexOf(o.nom) > -1; });
        return '<div class="tcard" style="--k:' + k + '"><h4>' + esc(o.nom) + '</h4><p>' + esc(o.role) + '</p>' + (used.length ? '<div class="used">' + used.map(function (p) { return '<button type="button" data-open="' + esc(p.id) + '">' + esc(p.nomCourt || p.titre) + '</button>'; }).join('') + '</div>' : '') + '</div>';
      }).join('') + '</div></div></div>';
  }).join('');

  var pns = $$('#panels .pn');
  function openP(i, scroll) {
    curP = i;
    pns.forEach(function (p, k) { p.classList.toggle('on', k === i); p.querySelector('.pn-tab').setAttribute('aria-expanded', k === i); p.querySelector('.pn-body').toggleAttribute('inert', k !== i); });
    if (scroll && innerWidth <= 980) setTimeout(function () { pns[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }); }, 120);
  }
  pnEl.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) { S.openSheet(o.dataset.open); return; }
    var p = e.target.closest('.pn'); if (p && !p.classList.contains('on')) openP(+p.dataset.p, true);
  });
  /* survol à la souris (ordinateur) : ouvre le panneau, avec un petit délai anti-saccade */
  if (fine) pnEl.addEventListener('mouseover', function (e) {
    if (innerWidth <= 980) return; var p = e.target.closest('.pn');
    if (p && !p.classList.contains('on') && !pnEl._lock) { pnEl._lock = 1; openP(+p.dataset.p); setTimeout(function () { pnEl._lock = 0; }, 450); }
  });
  pnEl.addEventListener('keydown', function (e) {
    var k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k || !e.target.classList.contains('pn-tab')) return;
    e.preventDefault(); var n = (curP + k + pns.length) % pns.length; openP(n); pns[n].querySelector('.pn-tab').focus();
  });
  openP(0);
})(window.Site);
