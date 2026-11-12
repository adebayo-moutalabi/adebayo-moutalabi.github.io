/* =====================================================================
   RENDU : fabrique le HTML des sections à partir des fichiers js/data/*.js
   Vous n'avez normalement PAS besoin de modifier ce fichier pour changer le contenu.
   ===================================================================== */
(function (S) {
  var D = S.data, esc = S.esc, head = S.head, chips = S.chips;

  /* ---------- Ouverture (hero) ---------- */
  function hero() {
    var p = D.profil, a = p.accroche;
    S.$('#h1-txt').textContent = p.prenom + ' ' + p.nomFamille + ' · ' + p.metier;
    S.$('#r1').textContent = p.prenom; S.$('#r2').textContent = p.nomFamille;
    var img = S.$('#lens-img'); img.src = p.photo; img.alt = p.photoAlt;
    S.$('#over .wrap').innerHTML = '<span class="caps" style="color:#e6cfa8">' + esc(a.sur) + '</span><h2>' + esc(a.titre) + ' <em>' + esc(a.accent) + '</em></h2><p>' + esc(a.texte) + '</p>';
    S.$('#foot').innerHTML = '<p class="tag">' + esc(a.pied) + '</p><span class="hint"><i></i>' + esc(a.defiler) + '</span>';
  }

  /* ---------- Ce que je fais : une phrase, puis trois panneaux reliés par un fil (js/domaines.js) ---------- */
  function domaines() {
    var Dm = D.domaines, ART = D.vignettes;
    var phrase = Dm.phrase.map(function (m) {
      if (typeof m === 'string') return esc(m);
      if (m.accent) return '<span class="it">' + esc(m.accent) + '</span>';
      return '<span class="ph-logos" aria-hidden="true">' + m.logos.map(function (n) { return S.icone(n).replace('width="14" height="14"', 'width="30" height="30"'); }).join('') + '</span>';
    }).join(' ').replace(/ ,/g, ',');
    S.$('#domaines .wrap').innerHTML = '<div class="head ph-head"><span class="caps">' + esc(Dm.etiquette) + '</span><h2 class="ph">' + phrase + '</h2></div>' +
      '<p class="fil-titre">' + esc(Dm.fil) + '</p>' +
      '<div class="fil" id="fil"><div class="fil-ligne" aria-hidden="true"><i id="fil-point"></i></div>' + Dm.liste.map(function (d, i) {
        return '<article class="dom' + (d.ia ? ' ia' : '') + (i === 0 ? ' on' : '') + '" id="domaine-' + esc(d.id) + '" data-i="' + i + '">' +
          '<div class="dom-art" aria-hidden="true">' + (ART[d.vignette] || '') + '</div>' +
          '<h3><button type="button" class="dom-btn" aria-expanded="' + (i === 0) + '" aria-controls="dom-c-' + esc(d.id) + '"><span class="dom-no">0' + (i + 1) + '</span><span class="dom-t">' + esc(d.titre) + '</span></button></h3>' +
          '<div class="dom-c" id="dom-c-' + esc(d.id) + '"><p>' + esc(d.texte) + '</p>' + chips(d.outils) +
          (d.exemple ? '<a class="dom-ex" href="' + esc(d.exemple.url) + '">' + esc(d.exemple.texte) + ' →</a>' : '') + '</div></article>';
      }).join('') + '</div>';
  }

  /* ---------- Compétences : « boîte à outils » (moteur physique dans js/competences.js) ----------
     La liste complète (familles, outils, rôles) reste dans la page, repliée, pour la lecture et le référencement. */
  function competences() {
    var C = D.competences;
    var filtres = '<div class="tb-filtres" role="group" aria-label="Choisir une famille d\'outils"><button type="button" data-f="all" aria-pressed="true">Tout</button>' +
      C.familles.map(function (f) { return '<button type="button" data-f="' + esc(f.id) + '" aria-pressed="false"' + (f.ia ? ' class="ia"' : '') + '>' + esc(f.nom) + '</button>'; }).join('') + '</div>';
    var liste = '<details class="tb-liste"><summary>Voir la liste complète des outils</summary><div class="tb-fams">' + C.familles.map(function (f) {
      return '<section><h3>' + esc(f.nom) + '</h3><p>' + esc(f.resume) + '</p><ul>' + C.outils.filter(function (o) { return o.famille === f.id; }).map(function (o) {
        return '<li><b>' + esc(o.nom) + '</b> ' + esc(o.role) + '</li>';
      }).join('') + '</ul></section>';
    }).join('') + '</div></details>';
    S.$('#competences .wrap').innerHTML = head(C.entete) + filtres +
      '<div class="tb" id="tb"><p class="tb-astuce" aria-hidden="true">Attrapez-les, lancez-les.</p><div class="tb-info" id="tb-info" aria-live="polite"><b>' + C.outils.length + ' outils</b><span>' + C.familles.map(function (f) { return esc(f.nom); }).join(' · ') + '</span></div></div>' + liste;
  }

  /* ---------- Méthode ---------- */
  function methode() {
    var m = D.methode;
    S.$('#methode .wrap').innerHTML = head(m.entete) + '<ol class="method" id="method"><li class="mline" aria-hidden="true"><i id="mline"></i></li>' + m.etapes.map(function (e, i) {
      return '<li class="mstep"><span class="ghost" aria-hidden="true">' + (i + 1) + '</span><span class="mnum">0' + (i + 1) + '</span><h3>' + esc(e.titre) + '</h3><p>' + esc(e.texte) + '</p>' + chips(e.outils).replace('class="chips"', 'class="mtools"') + '<div class="mliv"><small>Livrable</small>' + esc(e.livrable) + '</div></li>';
    }).join('') + '</ol>';
  }

  /* ---------- Projets ---------- */
  function projets() {
    var p = D.projets, L = p.liste, ART = D.vignettes;
    var une = L.filter(function (x) { return x.une; }), autres = L.filter(function (x) { return !x.une; });
    var hote = function (x) { var u = (x.liens || [])[0]; return u ? u.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : x.nomCourt; };
    var visuel = function (x) {
      return x.image ? '<img src="' + esc(x.image) + '" alt="' + esc(x.imageAlt || '') + '" loading="lazy" width="' + (x.imageTaille || [1200, 678])[0] + '" height="' + (x.imageTaille || [1200, 678])[1] + '">'
        : '<div class="cs-art" aria-hidden="true">' + (ART[x.vignette] || '') + '</div>';
    };
    var lignes = une.map(function (x, i) {
      var lien = (x.liens || [])[0];
      return '<article class="cs" id="projet-' + esc(x.id) + '" style="--i:' + i + ';--c:' + esc(x.couleur || 'var(--gold)') + '"><span class="cs-ghost" aria-hidden="true">0' + (i + 1) + '</span>' +
        '<div class="cs-txt"><div class="cs-meta"><span class="cs-no">0' + (i + 1) + '<small> / 0' + une.length + '</small></span><span class="cs-tag">' + esc(x.type) + '</span></div>' +
        '<h3>' + (x.page ? '<a href="' + esc(x.page) + '">' + esc(x.nomCourt) + '</a>' : esc(x.nomCourt)) + '</h3><p>' + esc(x.resume) + '</p>' + chips(x.techno.slice(0, 5), true) +
        '<div class="cs-act">' + (x.page ? '<a class="btn btn-gold" href="' + esc(x.page) + '">Lire l\'étude de cas →</a>' : '') +
        '<button type="button" class="cs-fiche" data-fiche="' + esc(x.id) + '" aria-haspopup="dialog">Aperçu rapide</button>' +
        (lien ? '<a class="cs-lien" href="' + esc(lien.url) + '" target="_blank" rel="noopener">' + esc(lien.texte) + ' ↗</a>' : '') + '</div></div>' +
        '<div class="cs-vis"><div class="cs-bar" aria-hidden="true"><i></i><i></i><i></i><span>' + esc(hote(x)) + '</span></div><div class="cs-img">' + visuel(x) + '</div></div></article>';
    }).join('');
    var plus = (autres.length ? '<div class="cs-autres">' + autres.map(function (x) {
      return '<button type="button" class="cs-mini" id="projet-' + esc(x.id) + '" data-fiche="' + esc(x.id) + '" aria-haspopup="dialog">' + (x.image ? '<span class="cs-mini-img"><img src="' + esc(x.image) + '" alt="" loading="lazy" width="' + (x.imageTaille || [1200, 750])[0] + '" height="' + (x.imageTaille || [1200, 750])[1] + '"></span>' : '') + '<span class="caps">' + esc(x.type.split(' · ')[0]) + '</span><b>' + esc(x.nomCourt) + '</b><span class="cs-mini-r">' + esc(x.resume) + '</span><span class="cs-mini-go">En savoir plus →</span></button>';
    }).join('') + '</div>' : '') + '<div class="cs-plus"><a class="btn cs-tous" href="projets/">Tous les projets <span>' + L.length + '</span> →</a></div>';
    S.$('#projets .wrap').innerHTML = head(p.entete) + '<div class="cases">' + lignes + '</div>' + plus;
  }

  /* ---------- Parcours + langues + distinctions ---------- */
  function parcours() {
    var P = D.parcours;
    S.$('#parcours .wrap').innerHTML = head(P.entete) +
      '<div class="gitbar"><span class="pr">~/parcours $</span><code id="gcmd">git log --graph <b>--all</b></code><div class="branches" id="branches" role="group" aria-label="Branche">' +
      P.branches.map(function (b, i) { var dot = b.id === 'experience' ? '<i style="background:var(--gold)"></i>' : b.id === 'formation' ? '<i style="background:var(--line-art)"></i>' : ''; return '<button type="button" data-b="' + esc(b.id) + '" aria-pressed="' + (i === 0) + '">' + dot + esc(b.libelle) + '</button>'; }).join('') + '</div></div>' +
      '<div class="git" id="git"><ol class="glog" id="glog"></ol><aside class="gshow" id="gshow" aria-live="polite"></aside></div>' +
      '<div class="langs">' + P.langues.map(function (l) { return '<span><b>' + esc(l.nom) + '</b>' + esc(l.niveau) + '</span>'; }).join('') + '</div>' +
      '<div class="honors" id="honors">' + P.distinctions.map(function (d, i) {
        return '<article class="tk"><div class="top"><span class="kind">' + esc(d.type) + '</span><span class="seal" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="sc' + i + '" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"/></defs><g class="ring"><text><textPath href="#sc' + i + '">' + esc(d.sceau + ' · ' + d.annee + ' · ') + '</textPath></text></g><circle class="core" cx="50" cy="50" r="9"/></svg></span></div><h3>' + esc(d.titre) + '</h3><p>' + esc(d.texte) + '</p><span class="yr" aria-hidden="true">' + esc(d.annee) + '</span></article>';
      }).join('') + '</div>';
  }

  /* ---------- Contact ---------- */
  function contact() {
    var c = D.contact, f = c.fiche;
    S.$('#contact .wrap').innerHTML = '<span class="caps">' + esc(c.etiquette) + '</span>' +
      '<h2 id="c-title" style="margin-top:16px;font-size:clamp(38px,5.6vw,80px);line-height:1;font-weight:300">' + S.fr(esc(c.titre)) + ' <span class="it">' + esc(c.accent) + '</span></h2>' +
      '<p class="c-lead">' + esc(c.accroche) + '</p><div class="cwrap">' +
      '<form class="mailwin" id="mailwin" autocomplete="off"><div class="mw-bar"><i></i><i></i><i></i><span>Nouveau message</span></div><div class="mw-body">' +
      '<div class="mw-row"><span class="lb">À</span><code id="mail">' + esc(c.email) + '</code></div>' +
      '<div class="mw-row"><span class="lb">Objet</span><span class="subj" id="mw-subj"></span></div>' +
      '<div><span class="lb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted)">Vous proposez</span><div class="chips" id="ch-need" style="margin-top:8px"></div></div>' +
      '<div><span class="lb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted)">Domaine</span><div class="chips" id="ch-dom" style="margin-top:8px"></div></div>' +
      '<input id="mw-name" type="text" placeholder="' + esc(c.placeholders.nom) + '" aria-label="' + esc(c.placeholders.nom) + '">' +
      '<textarea id="mw-msg" placeholder="' + esc(c.placeholders.message) + '" aria-label="Votre message"></textarea>' +
      '<div class="mw-acts"><button type="submit" class="btn btn-gold">Ouvrir dans ma messagerie</button><button type="button" class="btn" id="copy-mail">Copier mon e&#8209;mail</button></div></div></form>' +
      '<div class="fiche"><div class="ft stat"><div><span class="lb">Statut</span><div class="v">' + esc(f.statut) + '</div></div><span class="live"><i></i></span></div>' +
      '<div class="ft"><span class="lb">Recherche</span><span class="v">' + esc(f.recherche) + '</span></div>' +
      '<div class="ft"><span class="lb">Domaines</span><span class="v">' + esc(f.domaines) + '</span></div>' +
      '<div class="ft"><span class="lb">Lieu</span><span class="v" style="font-size:22px">' + esc(f.lieu) + '</span></div>' +
      '<div class="ft-2"><a class="ft link" href="' + esc(c.linkedin) + '" target="_blank" rel="noopener me"><span class="lb">Réseau</span><span class="v">LinkedIn ↗</span></a>' +
      '<a class="ft link" href="' + esc(c.github) + '" target="_blank" rel="noopener me"><span class="lb">Code</span><span class="v">GitHub ↗</span></a></div></div></div>' +
      '<div class="legal"><span class="legal-id">' + S.logo(28) + '<span>© ' + D.profil.annee + ' ' + esc(D.profil.nomComplet) + ' · ' + esc(D.profil.metier) + '</span></span><span>' + esc(D.profil.ville) + '</span></div>';
  }

  hero(); domaines(); competences(); methode(); projets(); parcours(); contact();
})(window.Site);
