/* =====================================================================
   OUTILS PARTAGÉS (ne pas modifier sauf besoin technique)
   Définit l'objet global « Site » utilisé par tous les autres fichiers.
   ===================================================================== */
(function (S) {
  S.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;   /* visiteur qui réduit les animations */
  S.fine = matchMedia('(pointer: fine)').matches;                       /* souris (et non tactile) */
  S.$ = function (s) { return document.querySelector(s); };
  S.$$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  S.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  S.clamp = function (v) { return Math.max(0, Math.min(1, v)); };
  S.toast = function (t) {
    var d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = t;
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 3100);
  };
  /* Typographie française : espace insécable avant ? ! : ; */
  S.fr = function (s) { return String(s).replace(/ ([?!:;])/g, '\u00a0$1'); };
  S.go = function (h) { var el = S.$(h); if (el) el.scrollIntoView({ behavior: S.reduce ? 'auto' : 'smooth' }); };

  /* Les modules ajoutent ici leur fonction « à chaque défilement » (voir main.js) */
  S.frames = [];

  /* En-tête de section : « étiquette / titre + accent / texte » */
  S.head = function (e) {
    return '<div class="head"><span class="caps">' + S.esc(e.etiquette) + '</span><h2>' + S.esc(e.titre) + ' <span class="it">' + S.esc(e.accent) + '</span></h2><p>' + S.esc(e.texte) + '</p></div>';
  };
  /* Logo : version sombre et version claire (la bonne s'affiche selon le thème, voir css/base.css) */
  S.logo = function (taille, prefixe) {
    var p = prefixe || '', t = taille || 32;
    return '<span class="logo"><img class="l-sombre" src="' + p + 'assets/logo/logo-am.svg" alt="Adebayo Moutalabi" width="' + t + '" height="' + t + '"><img class="l-clair" src="' + p + 'assets/logo/logo-am-clair.svg" alt="Adebayo Moutalabi" width="' + t + '" height="' + t + '"></span>';
  };
  S.chips = function (arr) { return '<div class="chips">' + arr.map(function (t) { return '<span class="chip">' + S.esc(t) + '</span>'; }).join('') + '</div>'; };
})(window.Site = window.Site || { data: {} });
