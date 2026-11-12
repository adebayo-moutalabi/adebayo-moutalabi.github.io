/* =====================================================================
   VÉRIFICATEUR DE CONTENU (aide à la modification, sans effet sur le site)
   Contrôle que les fichiers js/data/*.js sont cohérents entre eux
   (ex. un projet qui cite un outil inexistant, une catégorie inconnue…).
   Les problèmes sont écrits dans la console du navigateur (touche F12),
   et affichés dans un encadré rouge si l'adresse se termine par  ?debug
   ===================================================================== */
(function (S) {
  var D = S.data, bad = [];
  function chk(cond, msg) { if (!cond) bad.push(msg); }

  var outils = {}; D.competences.outils.forEach(function (o) { outils[o.nom] = 1; });
  var fams = {}; D.competences.familles.forEach(function (f) { fams[f.id] = 1; });
  var cats = {}; D.projets.categories.forEach(function (c) { cats[c.id] = 1; });
  var ids = {};

  D.competences.outils.forEach(function (o) { chk(fams[o.famille], 'Compétences : l\'outil « ' + o.nom + ' » a une famille inconnue (« ' + o.famille + ' »).'); });
  D.projets.liste.forEach(function (p) {
    chk(!ids[p.id], 'Projets : l\'identifiant « ' + p.id + ' » est utilisé deux fois.'); ids[p.id] = 1;
    chk(cats[p.categorie], 'Projets : « ' + p.titre + ' » a une catégorie inconnue (« ' + p.categorie + ' »).');
    chk(D.vignettes[p.vignette], 'Projets : « ' + p.titre + ' » utilise une vignette inconnue (« ' + p.vignette + ' »).');
    (p.outils || []).forEach(function (n) { chk(outils[n], 'Projets : « ' + p.titre + ' » cite l\'outil « ' + n + ' » qui n\'existe pas dans data/competences.js (vérifiez l\'orthographe exacte).'); });
    ['id', 'categorie', 'type', 'titre', 'resume', 'intro', 'points', 'techno'].forEach(function (k) { chk(p[k], 'Projets : « ' + (p.titre || p.id) + ' » : le champ « ' + k + ' » est manquant.'); });
  });
  D.parcours.liste.forEach(function (c, i) {
    chk(c.branche === 'experience' || c.branche === 'formation', 'Parcours : l\'entrée n°' + (i + 1) + ' (« ' + c.titre + ' ») doit avoir branche: "experience" ou "formation".');
    ['date', 'titre', 'lieu', 'type', 'resume', 'points'].forEach(function (k) { chk(c[k], 'Parcours : « ' + (c.titre || 'entrée ' + (i + 1)) + ' » : le champ « ' + k + ' » est manquant.'); });
  });
  D.profil.navigation.forEach(function (n) { chk(document.getElementById(n.id), 'Profil : la section « ' + n.id + ' » (navigation) n\'existe pas dans index.html.'); });

  if (bad.length) {
    console.warn('[Vérificateur] ' + bad.length + ' point(s) à corriger :\n- ' + bad.join('\n- '));
    if (/[?&]debug/.test(location.search)) {
      var b = document.createElement('div'); b.setAttribute('role', 'alert');
      b.style.cssText = 'position:fixed;z-index:9999;left:12px;right:12px;top:12px;max-height:60vh;overflow:auto;padding:14px 18px;border-radius:14px;background:#7a1f1f;color:#fff;font:14px/1.5 system-ui,sans-serif';
      b.innerHTML = '<b>' + bad.length + ' point(s) à corriger dans les fichiers de données :</b><ul style="margin:8px 0 0 18px">' + bad.map(function (m) { return '<li>' + S.esc(m) + '</li>'; }).join('') + '</ul>';
      document.body.appendChild(b);
    }
  } else if (/[?&]debug/.test(location.search)) { S.toast('Vérificateur : tout est cohérent ✓'); }
})(window.Site);
