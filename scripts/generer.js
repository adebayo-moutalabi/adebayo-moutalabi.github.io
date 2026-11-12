// Génère TOUT le site statique à partir des fichiers de données js/data/*.js :
//   index.html                      page d'accueil (présentation, réalisations, ce que je fais,
//                                    technologies, parcours, contact)
//   projets/<id>/index.html         une page par réalisation qui a un champ « page »
//   sitemap.xml, robots.txt, llms.txt, site.webmanifest
// Chaque page contient son <head> complet : titre, description, URL canonique, icônes, Open Graph, JSON-LD.
//
// Lancer après chaque modification de js/data :   node scripts/generer.js
// Vérifier sans rien écrire (utilisé par la CI) : node scripts/generer.js --verifier
//
// ADRESSE DU SITE : une seule variable, SITE_URL, juste en dessous. Pour passer à un nom de domaine
// personnel, changez-la puis relancez le script (voir docs/NOM-DE-DOMAINE.md).
const SITE_URL = 'https://adebayo-moutalabi.github.io/';   // ← toujours terminée par « / »

const fs = require('fs'), path = require('path'), vm = require('vm');
const racine = path.resolve(__dirname, '..');
const lire = f => fs.readFileSync(path.join(racine, f), 'utf8');
const verifier = process.argv.includes('--verifier');

// ---------- 1. Charger les données ----------
const Site = { data: {} };
const FICHIERS = ['profil', 'domaines', 'projets', 'competences', 'parcours', 'contact'];
FICHIERS.forEach(f => vm.runInNewContext(lire('js/data/' + f + '.js'), { Site }, { filename: 'js/data/' + f + '.js' }));
const D = Site.data, P = D.profil, C = D.contact;
const NOM = P.prenom + ' ' + P.nomFamille;
const minuscule = s => s.charAt(0).toLowerCase() + s.slice(1);

// ---------- 2. Petits outils HTML ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fr = s => String(s).replace(/ ([?!:;])/g, ' $1');   // espace insécable avant ? ! : ;
const t = s => esc(fr(s));
const liste = arr => '<ul>' + arr.map(x => '<li>' + t(x) + '</li>').join('') + '</ul>';
const chips = arr => '<ul class="chips">' + arr.map(x => '<li class="chip">' + esc(x) + '</li>').join('') + '</ul>';
const externe = (url, texte, rel) => '<a href="' + esc(url) + '"' + (rel ? ' rel="' + rel + '"' : '') + '>' + t(texte) + ' ↗</a>';
// Logo : version sombre et version claire, la bonne s'affiche selon le thème (css/base.css)
const logo = (taille, r) => '<span class="logo"><img class="l-sombre" src="' + r + 'assets/logo/logo-am.svg" alt="' + esc(NOM) + '" width="' + taille + '" height="' + taille + '"><img class="l-clair" src="' + r + 'assets/logo/logo-am-clair.svg" alt="' + esc(NOM) + '" width="' + taille + '" height="' + taille + '"></span>';
const ICONE_THEME = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const ldJSON = o => '<script type="application/ld+json">\n' + JSON.stringify(o, null, 2).replace(/</g, '\\u003c') + '\n</script>';

// ---------- 3. Mise en page commune ----------
// chemin : '' pour l'accueil, 'projets/nox/' pour une page de projet… ; r = chemin relatif vers la racine
function page({ chemin, titre, description, ogDescription, ogType, ogTitre, ogImage, ogImageAlt, ld, corps, css }) {
  const r = chemin ? chemin.split('/').filter(Boolean).map(() => '..').join('/') + '/' : '';
  const url = SITE_URL + chemin, accueil = chemin === '';
  const nav = P.navigation.map(n => '<li><a href="' + (accueil ? '' : r) + '#' + n.id + '"' + (accueil ? ' data-s="' + [n.id, ...(n.inclut || [])].join(' ') + '"' : '') + '>' + esc(n.nom) + '</a></li>').join('');
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Page générée par scripts/generer.js à partir de js/data : ne pas modifier à la main. -->
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(NOM)}">
<meta name="theme-color" content="#0d0e10">
<link rel="canonical" href="${url}">
<link rel="icon" href="${r}assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="${r}favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="${r}assets/icones/apple-touch-icon.png">
<link rel="manifest" href="${r}site.webmanifest">
<link rel="me" href="${P.github}">
<link rel="me" href="${P.linkedin}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${esc(NOM)}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(ogTitre || titre)}">
<meta property="og:description" content="${esc(ogDescription || description)}">
<meta property="og:image" content="${SITE_URL + ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
${ldJSON(ld)}
<script>document.documentElement.classList.add('js'); try { var t = localStorage.getItem('theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200..700;1,9..144,200..700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${r}css/base.css">
<link rel="stylesheet" href="${r}css/${css}">
<script src="${r}js/site.js" defer></script>
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="entete gut">
  <div class="wrap entete-in">
    <a class="marque" href="${accueil ? '#accueil' : r}">${logo(36, r)}<span class="marque-txt"><b>${esc(NOM)}</b><small>${esc(P.metier)}</small></span></a>
    <nav class="nav" id="nav" aria-label="Navigation principale"><ul>${nav}</ul></nav>
    <button type="button" class="theme" aria-label="Changer de thème (clair ou sombre)">${ICONE_THEME}</button>
    <button type="button" class="menu" aria-controls="nav" aria-expanded="false"><span class="sr">Menu</span><i aria-hidden="true"></i><i aria-hidden="true"></i></button>
  </div>
</header>
<main id="contenu">
${corps}
</main>
<footer class="pied gut">
  <div class="wrap pied-in">
    <span class="pied-id">${logo(28, r)}<span>© ${P.annee} ${esc(P.nomComplet)} · ${esc(P.metier)} · ${esc(P.ville)}</span></span>
    <ul>
      <li><a href="${P.github}" rel="me">GitHub</a></li>
      <li><a href="${P.linkedin}" rel="me">LinkedIn</a></li>
      <li><a href="${accueil ? '' : r}#contact">Contact</a></li>
    </ul>
  </div>
</footer>
</body>
</html>
`;
}
let numero = 0;
const tete = (e, id) => '<div class="tete rev"><span class="caps"><span class="num">' + String(++numero).padStart(2, '0') + '</span>' + (e.etiquette !== e.titre ? esc(e.etiquette) : '') + '</span><h2 id="t-' + id + '">' + t(e.titre) + (e.accent ? ' <span class="it">' + t(e.accent) + '</span>' : '') + '</h2>' + (e.texte ? '<p>' + t(e.texte) + '</p>' : '') + '</div>';
const section = (id, classe, contenu) => '<section class="' + classe + ' gut" id="' + id + '" aria-labelledby="t-' + id + '"><div class="wrap">' + contenu + '</div></section>';

// ---------- 4. Données structurées (JSON-LD, https://schema.org) ----------
const ID_PERSONNE = SITE_URL + '#personne';
const ecoles = [...new Set(D.parcours.liste.filter(c => c.branche === 'formation').map(c => c.lieu))];
const personne = {
  '@type': 'Person',
  '@id': ID_PERSONNE,
  name: NOM,
  alternateName: P.nomComplet,
  givenName: P.prenom,
  familyName: P.nomFamille,
  jobTitle: P.metier,
  description: P.phrase,
  url: SITE_URL,
  image: SITE_URL + P.photo,
  address: { '@type': 'PostalAddress', addressLocality: 'Rennes', addressCountry: 'FR' },
  alumniOf: ecoles.map(e => ({ '@type': 'EducationalOrganization', name: e })),
  knowsAbout: [...D.competences.familles.map(f => f.nom), ...D.competences.outils.map(o => o.nom)],
  knowsLanguage: D.parcours.langues.map(l => l.nom),
  sameAs: [P.github, P.linkedin],
  // Person n'a pas de propriété « logo » dans schema.org : le logo passe par « brand »
  brand: { '@type': 'Brand', name: NOM, logo: SITE_URL + 'assets/logo/logo-am-512.png' }
};
const realisation = p => {
  const L = p.logiciel, url = SITE_URL + p.page;
  return Object.assign({
    '@type': L ? 'SoftwareApplication' : 'CreativeWork',
    '@id': url + '#realisation',
    name: p.nomCourt,
    headline: p.titre,
    description: p.resume,
    url,
    image: SITE_URL + p.image,
    inLanguage: ['fr', 'en'],
    author: { '@id': ID_PERSONNE },
    keywords: p.techno.join(', ')
  }, L ? {
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: L.systeme,
    softwareVersion: L.version,
    downloadUrl: L.telechargement,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    sameAs: [L.site, L.code]
  } : {});
};
const avecPage = D.projets.liste.filter(p => p.page);
const fil = (...niveaux) => ({ '@type': 'BreadcrumbList', itemListElement: niveaux.map(([nom, url], i) => ({ '@type': 'ListItem', position: i + 1, name: nom, item: url })) });

// ---------- 5. Page d'accueil ----------
const R = D.projets, DO = D.domaines, T = D.competences, PA = D.parcours;
// En-tête : le nom, lettre par lettre (graisse variable qui suit la souris, révélation à l'arrivée)
const lettres = mot => [...mot].map((c, i) => '<span class="ch" style="--k:' + i + '">' + esc(c) + '</span>').join('');
const pipeline = '<div class="pipeline" aria-hidden="true"><span class="piste"><i></i></span><ol>' +
  P.pipeline.map((e, i) => '<li style="--i:' + i + '"><span>' + esc(e) + '</span></li>').join('') + '</ol></div>';
const presentation = `<section class="hero gut" id="accueil" aria-labelledby="titre-principal">
  <div class="wrap hero-grille">
    <p class="hero-meta"><span>${esc(P.surTitre)}</span><span class="hero-meta-m">${esc(P.metier)}</span></p>
    <h1 id="titre-principal" class="hero-titre"><span class="sr">${esc(NOM)} — ${esc(P.metier)}</span><span class="ligne" aria-hidden="true"><span class="mot">${lettres(P.prenom)}</span></span><span class="ligne decale" aria-hidden="true"><span class="mot">${lettres(P.nomFamille)}</span></span><span class="ligne intitule" aria-hidden="true"><span>${esc(P.metier)}</span></span></h1>
    <div class="hero-cote">
      <div class="portrait-orbite"><svg class="orbite" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48.5"/><g class="sat"><circle cx="50" cy="1.5" r="2.4"/></g></svg><img class="portrait" src="${P.photo}" alt="${esc(P.photoAlt)}" width="120" height="120" fetchpriority="high"></div>
      <p class="promesse">${t(P.phrase)}</p>
      <div class="actions"><a class="btn btn-gold" href="#realisations">${esc(P.boutons.realisations)}</a><a class="btn" href="#contact">${esc(P.boutons.contact)}</a></div>
      <p class="reseaux">${externe(P.github, 'GitHub', 'me')}${externe(P.linkedin, 'LinkedIn', 'me')}</p>
    </div>
    ${pipeline}
  </div>
</section>`;

// Réalisations : composition asymétrique, vraies captures dans un cadre de navigateur
const domaineDe = u => { try { return new URL(u).host; } catch (e) { return ''; } };
const realisations = section('realisations', 'sec', tete(R.entete, 'realisations') + '<div class="reals">' + R.liste.map((p, i) =>
  '<article class="real rev' + (i === 0 ? ' une' : '') + '" id="realisation-' + esc(p.id) + '">' +
  '<a class="ecran" href="' + esc(p.page) + '" tabindex="-1" aria-hidden="true"><span class="chrome"><i></i><i></i><i></i><span>' + esc(p.liens && p.liens[0] ? domaineDe(p.liens[0].url) : '') + '</span></span>' +
  '<img src="' + esc(p.image) + '" alt="" width="' + p.imageTaille[0] + '" height="' + p.imageTaille[1] + '" loading="lazy"></a>' +
  '<div class="real-txt"><span class="caps">' + esc(p.type) + '</span><h3><a href="' + esc(p.page) + '">' + t(p.titre) + '</a></h3><p>' + t(p.resume) + '</p>' +
  '<p class="real-liens"><a href="' + esc(p.page) + '">Le détail du projet →</a>' + (p.liens && p.liens[0] ? externe(p.liens[0].url, p.liens[0].texte) : '') + '</p></div></article>').join('') + '</div>');

// Ce que je fais : trois cartes, chacune avec une petite visualisation animée à l'apparition
const visuels = {
  infrastructure: '<div class="vis vis-pipe" aria-hidden="true">' + ['commit', 'build', 'tests', 'deploy'].map((e, i) => '<span style="--i:' + i + '"><b></b>' + e + '</span>').join('') + '</div>',
  web: '<div class="vis vis-jauges" aria-hidden="true">' + ['Performance', 'Accessibilité', 'Bonnes pratiques', 'SEO'].map((e, i) => '<span style="--i:' + i + '"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5"/><circle class="arc" cx="18" cy="18" r="15.5"/></svg>' + e + '</span>').join('') + '</div>',
  ia: '<div class="vis vis-chat" aria-hidden="true"><span class="moi">Nox, note que je dois rappeler Sam.</span><span class="agent">C\'est noté. Je te le relirai quand tu veux.</span></div>'
};
const domaines = section('domaines', 'sec', tete(DO.entete, 'domaines') + '<div class="domaines">' + DO.liste.map((d, i) =>
  '<article class="domaine rev" id="domaine-' + esc(d.id) + '" style="--d:' + i + '">' + (visuels[d.id] || '') +
  '<h3>' + t(d.titre) + '</h3><p>' + t(d.texte) + '</p>' + chips(d.outils) +
  (d.exemple ? '<a class="ex" href="' + esc(d.exemple.url) + '">' + t(d.exemple.texte) + ' →</a>' : '') + '</article>').join('') + '</div>');

// Technologies : la pile, couche par couche, comme un schéma d'architecture
const technologies = section('technologies', 'sec', tete(T.entete, 'technologies') + '<ol class="pile">' + T.familles.map((f, i) =>
  '<li class="couche rev' + (f.ia ? ' ia' : '') + '" style="--d:' + i + '"><span class="no">' + String(i + 1).padStart(2, '0') + '</span><div class="couche-nom"><h3>' + esc(f.nom) + '</h3><p>' + t(f.resume) + '</p></div><ul class="chips">' +
  T.outils.filter(o => o.famille === f.id).map(o => '<li class="chip" title="' + esc(o.role) + '">' + esc(o.nom) + '</li>').join('') + '</ul></li>').join('') + '</ol>');

// Parcours : historique façon « git log --graph » (deux branches, un commit sélectionné et son détail)
const hash = c => { let h = 2166136261; for (const ch of c.titre + c.date) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return ('0000000' + (h >>> 0).toString(16)).slice(-7); };
const LISTE = PA.liste, X = { formation: '30%', experience: '70%' }, premier = {}, dernier = {};
LISTE.forEach((c, k) => { if (premier[c.branche] === undefined) premier[c.branche] = k; dernier[c.branche] = k; });
premier.formation = 0;
const voie = k => {
  const c = LISTE[k]; let svg = '';
  ['experience', 'formation'].forEach(b => {
    const cl = b === 'experience' ? 'l-e' : 'l-f';
    if (b === 'formation' && k === 0) { svg += '<line class="l-f" x1="' + X.formation + '" y1="100%" x2="' + X.experience + '" y2="50%"/>'; return; }
    if (k > premier[b] && k <= dernier[b]) svg += '<line class="' + cl + '" x1="' + X[b] + '" y1="0" x2="' + X[b] + '" y2="50%"/>';
    if (k >= premier[b] && k < dernier[b]) svg += '<line class="' + cl + '" x1="' + X[b] + '" y1="50%" x2="' + X[b] + '" y2="100%"/>';
  });
  svg += '<circle class="pt ' + c.branche + '" cx="' + X[c.branche] + '" cy="50%" r="' + (k === 0 ? 7 : 5.5) + '"/>';
  if (k === 0) svg += '<circle class="halo" cx="' + X[c.branche] + '" cy="50%" r="12"/>';
  return '<svg aria-hidden="true">' + svg + '</svg>';
};
const parcours = section('parcours', 'sec', tete(PA.entete, 'parcours') +
  '<div class="gitbar"><span class="pr">~/parcours $</span><code>git log --graph <b id="git-branche">--all</b></code><div class="branches" role="group" aria-label="Filtrer par branche">' +
  PA.branches.map((b, i) => '<button type="button" data-b="' + esc(b.id) + '" aria-pressed="' + (i === 0) + '">' + (b.id !== 'all' ? '<i class="' + b.id + '"></i>' : '') + esc(b.libelle) + '</button>').join('') + '</div></div>' +
  '<div class="git rev"><ol class="glog">' + LISTE.map((c, k) =>
    '<li class="cm ' + c.branche + '" data-b="' + c.branche + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' +
    '<button type="button" aria-expanded="' + (k === 0) + '"><span class="lane">' + voie(k) + '</span>' +
    '<span class="cm-main"><span class="cm-top"><span class="hash">' + hash(c) + '</span>' + (k === 0 ? '<span class="ref h">HEAD</span>' : '') + '<span class="ref ' + c.branche + '">' + c.branche + '</span>' + (c.fusion ? '<span class="ref m">merge</span>' : '') + (c.premier ? '<span class="ref m">initial commit</span>' : '') + '</span>' +
    '<span class="cm-msg">' + t(c.titre) + '</span><span class="cm-org">' + esc(c.lieu) + '</span></span><span class="cm-date">' + esc(c.date) + '</span></button>' +
    '<div class="diff"><div class="d-tete"><span>commit ' + hash(c) + '</span><span class="ref ' + c.branche + '">' + c.branche + '</span></div>' +
    '<dl><dt>Auteur</dt><dd>' + esc(NOM) + '</dd><dt>Date</dt><dd>' + esc(c.date) + '</dd><dt>Lieu</dt><dd>' + esc(c.lieu) + '</dd><dt>Type</dt><dd>' + esc(c.type) + '</dd></dl>' +
    '<h3>' + t(c.titre) + '</h3><p>' + t(c.resume) + '</p><div class="lignes"><span class="dh">' + (c.branche === 'experience' ? 'realisations.md' : 'programme.md') + ' · ' + c.points.length + ' ajout' + (c.points.length > 1 ? 's' : '') + '</span>' +
    c.points.map(x => '<span class="add">' + t(x) + '</span>').join('') + '</div></div></li>').join('') + '</ol></div>' +
  '<div class="plus rev"><div><span class="caps">Langues</span>' + PA.langues.map(l => '<p><b>' + esc(l.nom) + '</b> ' + esc(l.niveau) + '</p>').join('') + '</div>' +
  PA.distinctions.map(d => '<div><span class="caps">' + esc(d.annee) + ' · ' + esc(d.type) + '</span><p><b>' + t(d.titre) + '</b></p><p>' + t(d.texte) + '</p></div>').join('') + '</div>');

// Contact : fenêtre de message (le formulaire ouvre la messagerie du visiteur) et tuiles
const contact = section('contact', 'sec', '<div class="tete rev"><span class="caps"><span class="num">' + String(++numero).padStart(2, '0') + '</span>' + esc(C.etiquette) + '</span><h2 id="t-contact">' + t(C.titre) + ' <span class="it">' + t(C.accent) + '</span></h2><p class="dispo">' + t(C.disponibilite) + '</p></div>' +
  '<div class="contact-grille rev">' +
  '<form class="mailwin" id="form-contact" action="mailto:' + esc(C.email) + '" method="post" enctype="text/plain" data-email="' + esc(C.email) + '" data-objet="' + esc(C.formulaire.objet) + '">' +
  '<div class="mw-bar" aria-hidden="true"><i></i><i></i><i></i><span>Nouveau message</span></div><div class="mw-body">' +
  '<div class="mw-row"><span class="lb">À</span><span>' + esc(C.email) + '</span></div>' +
  '<label class="mw-row"><span class="lb">De</span><input name="nom" type="text" autocomplete="name" placeholder="' + esc(C.formulaire.nom) + '"></label>' +
  '<label class="mw-msg"><span class="sr">' + esc(C.formulaire.message) + '</span><textarea name="message" required placeholder="' + esc(C.formulaire.message) + '…"></textarea></label>' +
  '<div class="mw-acts"><button type="submit" class="btn btn-gold">' + esc(C.formulaire.envoyer) + '</button></div></div></form>' +
  '<div class="tuiles">' +
  '<div class="tuile"><span class="lb">E-mail</span><a class="v" href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a><button type="button" class="btn copier" id="copier-email" data-email="' + esc(C.email) + '" data-ok="' + esc(C.formulaire.copie) + '">' + esc(C.formulaire.copier) + '</button></div>' +
  '<div class="tuiles-2"><a class="tuile lien" href="' + esc(C.linkedin) + '" rel="me"><span class="lb">Réseau</span><span class="v">LinkedIn ↗</span></a><a class="tuile lien" href="' + esc(C.github) + '" rel="me"><span class="lb">Code</span><span class="v">GitHub ↗</span></a></div>' +
  '<div class="tuile"><span class="lb">Lieu</span><span class="v petit">' + esc(C.lieu) + '</span></div>' +
  '</div></div>');

const accueil = page({
  chemin: '', css: 'site.css', ogType: 'profile',
  titre: NOM + ' · ' + P.metier,
  description: NOM + ', Cloud, DevOps & IA (Rennes) : infrastructures, pipelines CI/CD et agents IA. Réalisations : Nox, Continental IT, ExpoIA.',
  ogDescription: P.phrase,
  ogImage: 'assets/partage.png', ogImageAlt: NOM + ' · ' + P.metier,
  ld: { '@context': 'https://schema.org', '@graph': [
    { '@type': 'ProfilePage', '@id': SITE_URL + '#page', url: SITE_URL, name: NOM + ' · ' + P.metier, inLanguage: 'fr', mainEntity: { '@id': ID_PERSONNE } },
    personne,
    ...avecPage.map(realisation)
  ] },
  corps: [presentation, realisations, domaines, technologies, parcours, contact].join('\n')
});

// ---------- 6. Pages de projet ----------
const pageProjet = p => {
  const url = SITE_URL + p.page;
  return page({
    chemin: p.page, css: 'page.css', ogType: 'article',
    titre: p.nomCourt + ' · ' + NOM + ', ' + P.metier,
    description: p.description || p.resume,
    ogTitre: p.titre,
    ogImage: p.partage || 'assets/partage.png', ogImageAlt: p.imageAlt || p.titre,
    ld: { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: p.titre, description: p.description || p.resume, inLanguage: 'fr',
        isPartOf: { '@id': SITE_URL + '#page' }, about: { '@id': url + '#realisation' }, author: { '@id': ID_PERSONNE },
        breadcrumb: fil([NOM, SITE_URL], ['Réalisations', SITE_URL + '#realisations'], [p.nomCourt, url]) },
      realisation(p),
      { '@type': 'Person', '@id': ID_PERSONNE, name: NOM, jobTitle: P.metier, url: SITE_URL, sameAs: [P.github, P.linkedin] }
    ] },
    corps: `<nav class="ariane gut" aria-label="Fil d'Ariane"><ol class="wrap"><li><a href="../../">${esc(NOM)}</a></li><li><a href="../../#realisations">Réalisations</a></li><li aria-current="page">${esc(p.nomCourt)}</li></ol></nav>
<div class="gut"><article class="wrap pp">
  <span class="caps">${esc(p.type)}</span>
  <h1>${t(p.titre)}</h1>
  <p class="pp-lead">${t(p.resume)}</p>
  ${p.liens ? '<div class="pp-liens">' + p.liens.map((l, i) => '<a class="btn' + (i === 0 ? ' btn-gold' : '') + '" href="' + esc(l.url) + '">' + t(l.texte) + ' ↗</a>').join('') + '</div>' : ''}
  <figure class="pp-fig"><img src="../../${esc(p.image)}" alt="${esc(p.imageAlt)}" width="${p.imageTaille[0]}" height="${p.imageTaille[1]}"></figure>
  <section><h2>Contexte</h2><p>${t(p.intro)}</p></section>
  ${p.probleme ? '<section><h2>Problème</h2><p>' + t(p.probleme) + '</p></section>' : ''}
  <section><h2>Ce que j'ai fait</h2>${liste(p.points)}</section>
  ${p.resultat ? '<section><h2>Résultat</h2><p>' + t(p.resultat) + '</p></section>' : ''}
  <section><h2>Stack</h2>${chips(p.techno)}</section>
</article></div>`
  });
};

// ---------- 8. llms.txt (format https://llmstxt.org) ----------
const llms = [
  '# ' + NOM,
  '',
  '> ' + NOM + ' · ' + P.metier + ', basé à Rennes (France). ' + P.phrase,
  '',
  '## Profil',
  '',
  '- Nom complet : ' + P.nomComplet,
  '- Domaines : ' + P.metier,
  '- Lieu : ' + C.lieu,
  '- Langues : ' + PA.langues.map(l => l.nom + ' (' + l.niveau + ')').join(', '),
  '',
  '## Réalisations',
  '',
  ...R.liste.flatMap(p => [
    '### ' + p.titre,
    '',
    p.intro,
    '',
    ...(p.probleme ? ['- Problème : ' + p.probleme] : []),
    '- Ce que j\'ai fait : ' + p.points.join(' ; '),
    ...(p.resultat ? ['- Résultat : ' + p.resultat] : []),
    '- Stack : ' + p.techno.join(', '),
    ...(p.page ? ['- [Page du projet](' + SITE_URL + p.page + ')'] : []),
    ...(p.liens || []).map(l => '- [' + l.texte + '](' + l.url + ')'),
    ''
  ]),
  '## Ce que je fais',
  '',
  ...DO.liste.map(d => '- ' + d.titre + ' : ' + d.texte + ' (' + d.outils.join(', ') + ')'),
  '',
  '## Technologies',
  '',
  ...T.familles.map(f => '- ' + f.nom + ' : ' + T.outils.filter(o => o.famille === f.id).map(o => o.nom).join(', ')),
  '',
  '## Parcours',
  '',
  ...PA.liste.map(c => '- ' + c.date + ' : ' + c.titre + ', ' + c.lieu + ' (' + c.type + '). ' + c.resume),
  ...PA.distinctions.map(d => '- ' + d.annee + ' : ' + d.titre + '. ' + d.texte),
  '',
  '## Contact',
  '',
  '- ' + C.titre + ' ' + C.accent,
  '- E-mail : ' + C.email,
  '- [LinkedIn](' + C.linkedin + ')',
  '- [GitHub](' + C.github + ')',
  '- ' + C.disponibilite,
  '',
  '## Liens',
  '',
  '- [Site](' + SITE_URL + ')',
  '- [Code source et pipeline CI/CD de ce site](https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io)',
  ''
].join('\n');

// ---------- 9. sitemap.xml, robots.txt, site.webmanifest ----------
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  [SITE_URL, ...avecPage.map(p => SITE_URL + p.page)].map(u => '  <url>\n    <loc>' + u + '</loc>\n  </url>\n').join('') + '</urlset>\n';
const robots = '# Tous les robots (moteurs de recherche et moteurs IA) peuvent lire tout le site.\n' +
  '# Fichier généré par scripts/generer.js.\nUser-agent: *\nAllow: /\n\nSitemap: ' + SITE_URL + 'sitemap.xml\n';
const manifest = JSON.stringify({
  name: NOM + ' · ' + P.metier,
  short_name: NOM,
  description: P.phrase,
  lang: 'fr',
  start_url: './',
  display: 'browser',
  background_color: '#0d0e10',
  theme_color: '#0d0e10',
  icons: [
    { src: 'assets/icones/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'assets/icones/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
  ]
}, null, 2) + '\n';

// ---------- 10. Écrire (ou vérifier) ----------
const sorties = { 'index.html': accueil, 'llms.txt': llms, 'sitemap.xml': sitemap, 'robots.txt': robots, 'site.webmanifest': manifest };
avecPage.forEach(p => { sorties[p.page + 'index.html'] = pageProjet(p); });
let aJour = true;
for (const [f, contenu] of Object.entries(sorties)) {
  const actuel = fs.existsSync(path.join(racine, f)) ? lire(f) : '';
  if (actuel === contenu) continue;
  aJour = false;
  if (verifier) console.error('✗ ' + f + ' n\'est pas à jour : lancez « node scripts/generer.js » puis commitez le résultat.');
  else { fs.mkdirSync(path.dirname(path.join(racine, f)), { recursive: true }); fs.writeFileSync(path.join(racine, f), contenu); console.log('✎ ' + f + ' régénéré'); }
}
// Pages de projet orphelines (projet retiré des données) : à supprimer
for (const d of fs.existsSync(path.join(racine, 'projets')) ? fs.readdirSync(path.join(racine, 'projets')) : [])
  if (!avecPage.some(p => p.page === 'projets/' + d + '/')) { aJour = false; console.error('✗ projets/' + d + '/ ne correspond à aucun projet de js/data/projets.js : supprimez ce dossier.'); }
if (verifier && !aJour) process.exit(1);
console.log(aJour ? '✓ Contenu généré à jour' : '✓ Génération terminée');
