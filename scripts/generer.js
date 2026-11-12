// Génère le contenu « statique » du site à partir des fichiers js/data/*.js :
//   1. le HTML de chaque section, écrit dans index.html entre <!-- genere:xxx --> et <!-- /genere:xxx -->
//      (lisible par Google, les moteurs IA et les visiteurs sans JavaScript ; le JS le remplace ensuite
//      par la version animée, avec le même contenu) ;
//   2. les données structurées JSON-LD (fiche « Person » pour Google), dans le <head> ;
//   3. le fichier llms.txt (résumé factuel pour les moteurs IA) ;
//   4. une page par projet qui a un champ « page » (ex. projets/nox/index.html) ;
//   5. sitemap.xml (accueil + pages de projet), robots.txt et site.webmanifest ;
//   6. les balises du <head> de l'accueil (URL canonique, icônes, Open Graph).
//
// ADRESSE DU SITE : une seule variable, SITE_URL, juste en dessous. Pour passer à un nom de domaine
// personnel, changez-la puis relancez le script (voir docs/NOM-DE-DOMAINE.md).
//
// Lancer après chaque modification de js/data :   node scripts/generer.js
// Vérifier sans rien écrire (utilisé par la CI) : node scripts/generer.js --verifier
const SITE_URL = 'https://adebayo-moutalabi.github.io/';   // ← toujours terminée par « / »

const fs = require('fs'), path = require('path'), vm = require('vm');
const racine = path.resolve(__dirname, '..');
const lire = f => fs.readFileSync(path.join(racine, f), 'utf8');
const verifier = process.argv.includes('--verifier');

// ---------- 1. Exécuter utils.js + données + render.js avec un « faux » navigateur ----------
const elements = {};
const element = sel => (elements[sel] = elements[sel] || { innerHTML: '', textContent: '', src: '', alt: '' });
const ctx = { matchMedia: () => ({ matches: false }), document: { querySelector: element, querySelectorAll: () => [] } };
ctx.window = ctx;
vm.createContext(ctx);
const fichiersData = ['profil', 'visiteurs', 'domaines', 'labo', 'competences', 'methode', 'vignettes', 'projets', 'parcours', 'contact', 'mascotte'];
['js/utils.js', ...fichiersData.map(f => 'js/data/' + f + '.js'), 'js/render.js'].forEach(f => vm.runInContext(lire(f), ctx, { filename: f }));
const S = ctx.Site, D = S.data, esc = S.esc;
D.profil.site = SITE_URL;   // toutes les URL absolues générées partent de SITE_URL
const html = sel => element(sel).innerHTML;

// ---------- 2. Compléter les zones remplies d'habitude par les modules interactifs ----------
const liste = arr => '<ul>' + arr.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul>';

// Compétences : une famille = un titre + la liste des outils et leur rôle
const competences = D.competences.familles.map(f =>
  '<div class="pn-statique"><h3>' + esc(f.nom) + '</h3><p>' + esc(f.resume) + '</p><ul>' +
  D.competences.outils.filter(o => o.famille === f.id).map(o => '<li><b>' + esc(o.nom) + '</b> : ' + esc(o.role) + '</li>').join('') +
  '</ul></div>').join('');

// Projets : la fiche complète (problème, ce que j'ai fait, résultat, stack, liens)
const projets = D.projets.liste.map(p =>
  '<article class="p-statique" id="projet-' + esc(p.id) + '">' + (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || '') + '" width="' + (p.imageTaille || [1200, 678])[0] + '" height="' + (p.imageTaille || [1200, 678])[1] + '" loading="lazy">' : '') + '<span class="caps">' + esc(p.type) + '</span><h3>' + esc(p.titre) + '</h3>' +
  '<p>' + esc(p.intro) + '</p>' +
  (p.probleme ? '<h4>Problème</h4><p>' + esc(p.probleme) + '</p>' : '') +
  '<h4>Ce que j\'ai fait</h4>' + liste(p.points) +
  (p.resultat ? '<h4>Résultat</h4><p>' + esc(p.resultat) + '</p>' : '') +
  '<p><b>Stack :</b> ' + p.techno.map(esc).join(', ') + '</p>' +
  (p.liens ? '<p>' + p.liens.map(l => '<a href="' + esc(l.url) + '">' + esc(l.texte) + '</a>').join(' · ') + '</p>' : '') +
  (p.page ? '<p><a href="' + esc(p.page) + '">Page du projet ' + esc(p.nomCourt) + '</a></p>' : '') +
  '</article>').join('');

// Parcours : chaque étape avec son détail
const parcours = D.parcours.liste.map(c =>
  '<li class="cm-statique"><h3>' + esc(c.titre) + '</h3><p>' + esc(c.lieu) + ' · ' + esc(c.date) + ' · ' + esc(c.type) + '</p><p>' + esc(c.resume) + '</p>' + liste(c.points) + '</li>').join('');

// Labo : les questions/réponses de l'agent de démo
const qr = '<dl>' + D.labo.ia.questions.map(q => '<dt>' + esc(q.question) + '</dt><dd>' + q.reponse + '</dd>').join('') + '</dl>';

const remplir = (h, id, contenu) => {
  const vide = 'id="' + id + '"></';
  if (!h.includes(vide)) throw new Error('Zone #' + id + ' introuvable dans le rendu');
  return h.replace(vide, 'id="' + id + '">' + contenu + '</');
};

const sections = {
  h1: esc(element('#h1-txt').textContent),
  r1: esc(element('#r1').textContent),
  r2: esc(element('#r2').textContent),
  over: html('#over .wrap'),
  foot: html('#foot'),
  choix: html('#choix .wrap'),
  domaines: html('#domaines .wrap'),
  labo: remplir(html('#labo .wrap'), 'qs', qr),
  competences: remplir(html('#competences .wrap'), 'panels', competences),
  methode: html('#methode .wrap'),
  projets: remplir(html('#projets .wrap'), 'pgrid', projets),
  parcours: remplir(html('#parcours .wrap'), 'glog', parcours),
  contact: html('#contact .wrap')
};

// ---------- 3. JSON-LD : page de profil, personne et réalisations (https://schema.org) ----------
const P = D.profil;
const ID_PERSONNE = P.site + '#personne';
const ecoles = [...new Set(D.parcours.liste.filter(c => c.branche === 'formation').map(c => c.lieu))];
const personne = {
  '@type': 'Person',
  '@id': ID_PERSONNE,
  name: P.prenom + ' ' + P.nomFamille,
  alternateName: P.nomComplet,
  givenName: P.prenom,
  familyName: P.nomFamille,
  jobTitle: P.metier,
  description: P.accroche.texte,
  url: P.site,
  image: P.site + P.photo,
  address: { '@type': 'PostalAddress', addressLocality: 'Rennes', addressCountry: 'FR' },
  alumniOf: ecoles.map(e => ({ '@type': 'EducationalOrganization', name: e })),
  knowsAbout: [...D.competences.familles.map(f => f.nom), ...D.competences.outils.map(o => o.nom)],
  knowsLanguage: D.parcours.langues.map(l => l.nom),
  sameAs: [P.github, P.linkedin],
  brand: { '@type': 'Brand', name: P.prenom + ' ' + P.nomFamille, logo: P.site + 'assets/logo/logo-am-512.png' }
};
// Une réalisation qui a sa page : SoftwareApplication si c'est un logiciel, sinon CreativeWork
const realisation = p => {
  const L = p.logiciel, url = P.site + p.page;
  return Object.assign({
    '@type': L ? 'SoftwareApplication' : 'CreativeWork',
    '@id': url + '#realisation',
    name: p.nomCourt,
    headline: p.titre,
    description: p.resume,
    url,
    image: P.site + p.image,
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
const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'ProfilePage', '@id': P.site + '#page', url: P.site, inLanguage: 'fr', mainEntity: { '@id': ID_PERSONNE } },
    personne,
    ...avecPage.map(realisation)
  ]
};
// Balises communes du <head> : icônes (racineRel = chemin relatif vers la racine, ex. « ../../ »)
const iconesHTML = racineRel => [
  '<link rel="icon" href="' + racineRel + 'assets/favicon.svg" type="image/svg+xml">',
  '<link rel="icon" href="' + racineRel + 'favicon.ico" sizes="32x32">',
  '<link rel="apple-touch-icon" href="' + racineRel + 'assets/icones/apple-touch-icon.png">',
  '<link rel="manifest" href="' + racineRel + 'site.webmanifest">'
].join('\n');
const ldJSON = o => '\n<script type="application/ld+json">\n' + JSON.stringify(o, null, 2).replace(/</g, '\\u003c') + '\n</script>\n';
sections.jsonld = ldJSON(jsonld);
sections.head = '\n' + [
  '<link rel="canonical" href="' + P.site + '">',
  iconesHTML(''),
  '<link rel="me" href="' + P.github + '">',
  '<link rel="me" href="' + P.linkedin + '">',
  '<!-- Aperçu lors d\'un partage (LinkedIn, Slack, WhatsApp…) : protocole Open Graph -->',
  '<meta property="og:type" content="profile">',
  '<meta property="og:locale" content="fr_FR">',
  '<meta property="og:site_name" content="' + esc(P.prenom + ' ' + P.nomFamille) + '">',
  '<meta property="og:url" content="' + P.site + '">',
  '<meta property="og:title" content="' + esc(P.prenom + ' ' + P.nomFamille + ' · ' + P.metier) + '">',
  '<meta property="og:description" content="' + esc(P.accroche.texte) + '">',
  '<meta property="og:image" content="' + P.site + 'assets/partage.png">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="' + esc(P.prenom + ' ' + P.nomFamille + ', ' + P.metier.charAt(0).toLowerCase() + P.metier.slice(1)) + '">',
  '<meta property="profile:first_name" content="' + esc(P.prenom) + '">',
  '<meta property="profile:last_name" content="' + esc(P.nomFamille) + '">',
  '<meta name="twitter:card" content="summary_large_image">'
].join('\n') + '\n';

// ---------- 4. llms.txt (format https://llmstxt.org) ----------
const txt = s => String(s).replace(/<[^>]+>/g, '');
const C = D.contact;
const llms = [
  '# ' + P.prenom + ' ' + P.nomFamille,
  '',
  '> ' + P.prenom + ' ' + P.nomFamille + ' · ' + P.metier + ', basé à Rennes (France). ' + P.accroche.titre + ' ' + P.accroche.accent + ' ' + P.accroche.texte,
  '',
  '## Profil',
  '',
  '- Nom complet : ' + P.nomComplet,
  '- Métier : ' + P.metier,
  '- Lieu : ' + C.fiche.lieu,
  '- Ouvert à : ' + C.fiche.recherche + ' (' + C.fiche.domaines + ')',
  '',
  '## Ce que je fais',
  '',
  ...D.domaines.liste.map(d => '- ' + d.titre + ' : ' + d.texte + ' (' + d.outils.join(', ') + ')'),
  '- Langues : ' + D.parcours.langues.map(l => l.nom + ' (' + l.niveau + ')').join(', '),
  '',
  '## Compétences',
  '',
  ...D.competences.familles.map(f => '- ' + f.nom + ' : ' + D.competences.outils.filter(o => o.famille === f.id).map(o => o.nom).join(', ')),
  '',
  '## Réalisations',
  '',
  ...D.projets.liste.flatMap(p => [
    '### ' + p.titre,
    '',
    p.intro,
    '',
    ...(p.probleme ? ['- Problème : ' + p.probleme] : []),
    '- Ce que j\'ai fait : ' + p.points.join(' ; '),
    ...(p.resultat ? ['- Résultat : ' + p.resultat] : []),
    '- Stack : ' + p.techno.join(', '),
    ...(p.page ? ['- [Page du projet](' + P.site + p.page + ')'] : []),
    ...(p.liens || []).map(l => '- [' + l.texte + '](' + l.url + ')'),
    ''
  ]),
  '## Parcours',
  '',
  ...D.parcours.liste.map(c => '- ' + c.date + ' : ' + c.titre + ', ' + c.lieu + ' (' + c.type + '). ' + c.resume),
  '',
  '## Distinctions',
  '',
  ...D.parcours.distinctions.map(d => '- ' + d.annee + ' : ' + d.titre + '. ' + d.texte),
  '',
  '## Questions fréquentes',
  '',
  ...D.labo.ia.questions.flatMap(q => ['- ' + q.question + ' ' + txt(q.reponse)]),
  '',
  '## Liens',
  '',
  '- [Portfolio](' + P.site + ')',
  '- [GitHub](' + P.github + ')',
  '- [LinkedIn](' + P.linkedin + ')',
  '- [Code source et pipeline CI/CD de ce site](https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io)',
  ''
].join('\n');

// ---------- 5. Pages de projet (une par projet qui a un champ « page ») ----------
const pageProjet = p => {
  const url = P.site + p.page, racineRel = p.page.split('/').filter(Boolean).map(() => '..').join('/') + '/';
  const titre = p.nomCourt + ' · ' + P.prenom + ' ' + P.nomFamille + ', ' + P.metier;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: titre, description: p.description || p.resume, inLanguage: 'fr',
        isPartOf: { '@id': P.site + '#page' }, about: { '@id': url + '#realisation' }, author: { '@id': ID_PERSONNE },
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: P.prenom + ' ' + P.nomFamille, item: P.site },
          { '@type': 'ListItem', position: 2, name: 'Réalisations', item: P.site + '#projets' },
          { '@type': 'ListItem', position: 3, name: p.nomCourt, item: url }] } },
      realisation(p),
      { '@type': 'Person', '@id': ID_PERSONNE, name: P.prenom + ' ' + P.nomFamille, jobTitle: P.metier, url: P.site, sameAs: [P.github, P.linkedin] }
    ]
  };
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Page générée par scripts/generer.js à partir de js/data/projets.js : ne pas modifier à la main. -->
<title>${esc(titre)}</title>
<meta name="description" content="${esc(p.description || p.resume)}">
<meta name="author" content="${esc(P.prenom + ' ' + P.nomFamille)}">
<meta name="theme-color" content="#0d0e10">
<link rel="canonical" href="${url}">
${iconesHTML(racineRel)}
<meta property="og:type" content="article">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${esc(P.prenom + ' ' + P.nomFamille)}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(p.titre)}">
<meta property="og:description" content="${esc(p.resume)}">
<meta property="og:image" content="${P.site + (p.partage || 'assets/partage.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.imageAlt || p.titre)}">
<meta name="twitter:card" content="summary_large_image">
${ldJSON(ld).trim()}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200..700;1,9..144,200..700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${racineRel}css/base.css">
<link rel="stylesheet" href="${racineRel}css/page.css">
</head>
<body class="page-projet">
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="pp-top gut">
  <div class="wrap pp-marque"><a class="pp-logo" href="${racineRel}">${S.logo(40, racineRel)}</a></div>
  <nav class="wrap pp-nav" aria-label="Fil d'Ariane">
    <a href="${racineRel}">${esc(P.prenom + ' ' + P.nomFamille)}</a><span aria-hidden="true">/</span><a href="${racineRel}#projets">Réalisations</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.nomCourt)}</span>
  </nav>
</header>
<main id="contenu" class="gut">
  <article class="wrap pp">
    <span class="caps">${esc(p.type)}</span>
    <h1>${esc(p.titre)}</h1>
    <p class="pp-lead">${esc(p.resume)}</p>
    ${p.liens ? '<div class="pp-liens">' + p.liens.map((l, i) => '<a class="pp-btn' + (i === 0 ? ' or' : '') + '" href="' + esc(l.url) + '">' + esc(l.texte) + ' ↗</a>').join('') + '</div>' : ''}
    ${p.image ? '<figure class="pp-fig"><img src="' + racineRel + esc(p.image) + '" alt="' + esc(p.imageAlt || '') + '" width="' + (p.imageTaille || [1200, 678])[0] + '" height="' + (p.imageTaille || [1200, 678])[1] + '"></figure>' : ''}
    <section><h2>Contexte</h2><p>${esc(p.intro)}</p></section>
    ${p.probleme ? '<section><h2>Problème</h2><p>' + esc(p.probleme) + '</p></section>' : ''}
    <section><h2>Ce que j'ai fait</h2>${liste(p.points)}</section>
    ${p.resultat ? '<section><h2>Résultat</h2><p>' + esc(p.resultat) + '</p></section>' : ''}
    <section><h2>Stack</h2><div class="chips">${p.techno.map(t => '<span class="chip">' + esc(t) + '</span>').join('')}</div></section>
  </article>
</main>
<footer class="gut pp-pied">
  <div class="wrap">
    <a class="pp-logo" href="${racineRel}">${S.logo(32, racineRel)}</a>
    <p>Réalisé par <a href="${racineRel}">${esc(P.prenom + ' ' + P.nomFamille)}</a>, ${esc(P.metier.charAt(0).toLowerCase() + P.metier.slice(1))}, basé à Rennes.</p>
    <p><a href="${racineRel}">Portfolio</a> · <a href="${P.github}" rel="me">GitHub</a> · <a href="${P.linkedin}" rel="me">LinkedIn</a> · <a href="${racineRel}#contact">Contact</a></p>
  </div>
</footer>
</body>
</html>
`;
};

// ---------- 6. sitemap.xml (le fichier de vérification Google n'y figure pas) ----------
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  [P.site, ...avecPage.map(p => P.site + p.page)].map(u => '  <url>\n    <loc>' + u + '</loc>\n  </url>\n').join('') + '</urlset>\n';

const robots = '# Tous les robots (moteurs de recherche et moteurs IA) peuvent lire tout le site.\n' +
  '# Fichier généré par scripts/generer.js.\nUser-agent: *\nAllow: /\n\nSitemap: ' + P.site + 'sitemap.xml\n';
const manifest = JSON.stringify({
  name: P.prenom + ' ' + P.nomFamille + ' · ' + P.metier,
  short_name: P.prenom + ' ' + P.nomFamille,
  description: P.accroche.texte,
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

// ---------- 7. Écrire (ou vérifier) ----------
let index = lire('index.html');
for (const [id, contenu] of Object.entries(sections)) {
  const re = new RegExp('(<!-- genere:' + id + ' -->)[\\s\\S]*?(<!-- /genere:' + id + ' -->)');
  if (!re.test(index)) { console.error('✗ Repère <!-- genere:' + id + ' --> absent de index.html'); process.exit(1); }
  index = index.replace(re, (m, a, b) => a + contenu + b);
}
const sorties = { 'index.html': index, 'llms.txt': llms, 'sitemap.xml': sitemap, 'robots.txt': robots, 'site.webmanifest': manifest };
avecPage.forEach(p => { sorties[p.page + 'index.html'] = pageProjet(p); });
let aJour = true;
for (const [f, contenu] of Object.entries(sorties)) {
  const actuel = fs.existsSync(path.join(racine, f)) ? lire(f) : '';
  if (actuel === contenu) continue;
  aJour = false;
  if (verifier) console.error('✗ ' + f + ' n\'est pas à jour : lancez « node scripts/generer.js » puis commitez le résultat.');
  else { fs.mkdirSync(path.dirname(path.join(racine, f)), { recursive: true }); fs.writeFileSync(path.join(racine, f), contenu); console.log('✎ ' + f + ' régénéré'); }
}
if (verifier && !aJour) process.exit(1);
console.log(aJour ? '✓ Contenu généré à jour' : '✓ Génération terminée');
