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

  /* ---------- « Par où commencer ? » ---------- */
  function choix() {
    var v = D.visiteurs;
    S.$('#choix .wrap').innerHTML = head(v.entete) + '<div class="choices" role="group" aria-label="Profil de visite">' + v.profils.map(function (c) {
      return '<button type="button" class="choice" data-v="' + esc(c.id) + '" aria-pressed="false"><span class="go">→</span><span class="caps">' + esc(c.etiquette) + '</span><span class="ct">' + esc(c.titre) + '</span><span class="cp">' + esc(c.texte) + '</span></button>';
    }).join('') + '</div><p class="choice-out" id="choice-out" aria-live="polite"></p>';
  }

  /* ---------- Ce que je fais : trois domaines ---------- */
  function domaines() {
    var Dm = D.domaines, ART = D.vignettes;
    S.$('#domaines .wrap').innerHTML = head(Dm.entete) + '<div class="doms">' + Dm.liste.map(function (d, i) {
      return '<article class="dom' + (d.ia ? ' ia' : '') + '" id="domaine-' + esc(d.id) + '"><div class="dom-vis" aria-hidden="true"><span class="dom-no">0' + (i + 1) + '</span>' + (ART[d.vignette] || '') + '</div>' +
        '<h3>' + esc(d.titre) + '</h3><p>' + esc(d.texte) + '</p>' + chips(d.outils) +
        (d.exemple ? '<a class="dom-ex" href="' + esc(d.exemple.url) + '">' + esc(d.exemple.texte) + ' →</a>' : '') + '</article>';
    }).join('') + '</div>';
  }

  /* ---------- Labo ---------- */
  function labo() {
    var L = D.labo, ids = ['k8s', 'ci', 'ia', 'aws'];
    function txt(d) { return '<div class="lab-txt"><span class="caps">' + esc(d.etiquette) + '</span><h3>' + esc(d.titre) + ' <span class="it">' + esc(d.accent) + '</span></h3><p>' + esc(d.texte) + '</p>' + chips(d.outils) + '</div>'; }
    function panel(id, inner, hidden) { return '<div class="lab" id="p-' + id + '" role="tabpanel" aria-labelledby="t-' + id + '"' + (hidden ? ' hidden' : '') + '>' + inner + '</div>'; }
    var k = L.k8s, c = L.ci, i = L.ia, a = L.aws;
    S.$('#labo .wrap').innerHTML = head(L.entete) +
      '<div class="lab-tabs" role="tablist" aria-label="Démos">' + ids.map(function (id, n) { return '<button type="button" role="tab" id="t-' + id + '" aria-selected="' + (n === 0) + '" data-p="' + id + '">' + esc(L[id].onglet) + '</button>'; }).join('') + '</div>' +
      panel('k8s', txt(k) + '<div class="lab-demo"><div class="demo-label"><span>' + esc(k.libelleCharge) + '</span><b id="cpu-v">35 %</b></div><input type="range" id="cpu" min="5" max="100" value="35" aria-label="' + esc(k.libelleCharge) + '"><div class="pods" id="pods"></div><div class="demo-label"><span>' + esc(k.libelleCible) + '</span><b id="pods-v">2 pods</b></div><p class="note">' + esc(k.note) + '</p></div>') +
      panel('ci', txt(c) + '<div class="lab-demo"><div class="pipe" id="pipe"></div><div class="pbar"><i id="pbar"></i></div><button type="button" class="btn btn-gold" id="run-ci">' + esc(c.bouton) + '</button></div>', true) +
      panel('ia', txt(i) + '<div class="lab-demo"><div class="chat" id="chat" aria-live="polite"><div class="msg bot">' + esc(i.bonjour) + '</div></div><div class="qs" id="qs"></div><p class="note">' + esc(i.note) + '</p></div>', true) +
      panel('aws', txt(a) + '<div class="lab-demo"><div class="layers" id="layers"></div><p class="arch" id="arch"></p></div>', true);
  }

  /* ---------- Compétences (le contenu des panneaux est fait dans competences.js) ---------- */
  function competences() { S.$('#competences .wrap').innerHTML = head(D.competences.entete) + '<div class="panels" id="panels"></div>'; }

  /* ---------- Méthode ---------- */
  function methode() {
    var m = D.methode;
    S.$('#methode .wrap').innerHTML = head(m.entete) + '<ol class="method" id="method"><li class="mline" aria-hidden="true"><i id="mline"></i></li>' + m.etapes.map(function (e, i) {
      return '<li class="mstep"><span class="ghost" aria-hidden="true">' + (i + 1) + '</span><span class="mnum">0' + (i + 1) + '</span><h3>' + esc(e.titre) + '</h3><p>' + esc(e.texte) + '</p>' + chips(e.outils).replace('class="chips"', 'class="mtools"') + '<div class="mliv"><small>Livrable</small>' + esc(e.livrable) + '</div></li>';
    }).join('') + '</ol>';
  }

  /* ---------- Projets ---------- */
  function projets() {
    var p = D.projets;
    var filtres = p.filtres === false ? '' : '<div class="filters" role="group" aria-label="Filtrer les projets">' + p.categories.map(function (c, i) { return '<button type="button" data-f="' + esc(c.id) + '" aria-pressed="' + (i === 0) + '">' + esc(c.libelle) + '</button>'; }).join('') + '</div>';
    S.$('#projets .wrap').innerHTML = head(p.entete) + filtres + '<div class="pgrid" id="pgrid"></div>';
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

  hero(); choix(); domaines(); labo(); competences(); methode(); projets(); parcours(); contact();
})(window.Site);
