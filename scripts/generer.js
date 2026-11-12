// Génère le contenu « statique » du site à partir des fichiers js/data/*.js :
//   1. le HTML de chaque section, écrit dans index.html entre <!-- genere:xxx --> et <!-- /genere:xxx -->
//      (lisible par Google, les moteurs IA et les visiteurs sans JavaScript ; le JS le remplace ensuite
//      par la version animée, avec le même contenu) ;
//   2. les données structurées JSON-LD (fiche « Person » pour Google), dans le <head> ;
//   3. le fichier llms.txt (résumé factuel pour les moteurs IA).
//
// Lancer après chaque modification de js/data :   node scripts/generer.js
// Vérifier sans rien écrire (utilisé par la CI) : node scripts/generer.js --verifier
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
const fichiersData = ['profil', 'visiteurs', 'labo', 'competences', 'methode', 'vignettes', 'projets', 'parcours', 'contact', 'mascotte'];
['js/utils.js', ...fichiersData.map(f => 'js/data/' + f + '.js'), 'js/render.js'].forEach(f => vm.runInContext(lire(f), ctx, { filename: f }));
const S = ctx.Site, D = S.data, esc = S.esc;
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
  '<article class="p-statique" id="projet-' + esc(p.id) + '"><span class="caps">' + esc(p.type) + '</span><h3>' + esc(p.titre) + '</h3>' +
  '<p>' + esc(p.intro) + '</p>' +
  (p.probleme ? '<h4>Problème</h4><p>' + esc(p.probleme) + '</p>' : '') +
  '<h4>Ce que j\'ai fait</h4>' + liste(p.points) +
  (p.resultat ? '<h4>Résultat</h4><p>' + esc(p.resultat) + '</p>' : '') +
  '<p><b>Stack :</b> ' + p.techno.map(esc).join(', ') + '</p>' +
  (p.liens ? '<p>' + p.liens.map(l => '<a href="' + esc(l.url) + '">' + esc(l.texte) + '</a>').join(' · ') + '</p>' : '') +
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
  labo: remplir(html('#labo .wrap'), 'qs', qr),
  competences: remplir(html('#competences .wrap'), 'panels', competences),
  methode: html('#methode .wrap'),
  projets: remplir(html('#projets .wrap'), 'pgrid', projets),
  parcours: remplir(html('#parcours .wrap'), 'glog', parcours),
  contact: html('#contact .wrap')
};

// ---------- 3. JSON-LD : ProfilePage + Person (https://schema.org/Person) ----------
const P = D.profil;
const ecoles = [...new Set(D.parcours.liste.filter(c => c.branche === 'formation').map(c => c.lieu))];
const jsonld = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: P.site,
  inLanguage: 'fr',
  mainEntity: {
    '@type': 'Person',
    '@id': P.site + '#personne',
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
    sameAs: [P.github, P.linkedin]
  }
};
sections.jsonld = '\n<script type="application/ld+json">\n' + JSON.stringify(jsonld, null, 2).replace(/</g, '\\u003c') + '\n</script>\n';

// ---------- 4. llms.txt (format https://llmstxt.org) ----------
const txt = s => String(s).replace(/<[^>]+>/g, '');
const C = D.contact;
const llms = [
  '# ' + P.prenom + ' ' + P.nomFamille,
  '',
  '> ' + P.metier + ', basé à Rennes (France). ' + P.accroche.texte + ' Recherche : ' + C.fiche.recherche + '.',
  '',
  '## Profil',
  '',
  '- Nom complet : ' + P.nomComplet,
  '- Métier : ' + P.metier,
  '- Lieu : ' + C.fiche.lieu,
  '- Recherche : ' + C.fiche.recherche + ' (' + C.fiche.domaines + ')',
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

// ---------- 5. Écrire (ou vérifier) ----------
let index = lire('index.html');
for (const [id, contenu] of Object.entries(sections)) {
  const re = new RegExp('(<!-- genere:' + id + ' -->)[\\s\\S]*?(<!-- /genere:' + id + ' -->)');
  if (!re.test(index)) { console.error('✗ Repère <!-- genere:' + id + ' --> absent de index.html'); process.exit(1); }
  index = index.replace(re, (m, a, b) => a + contenu + b);
}
const sorties = { 'index.html': index, 'llms.txt': llms };
let aJour = true;
for (const [f, contenu] of Object.entries(sorties)) {
  const actuel = fs.existsSync(path.join(racine, f)) ? lire(f) : '';
  if (actuel === contenu) continue;
  aJour = false;
  if (verifier) console.error('✗ ' + f + ' n\'est pas à jour : lancez « node scripts/generer.js » puis commitez le résultat.');
  else { fs.writeFileSync(path.join(racine, f), contenu); console.log('✎ ' + f + ' régénéré'); }
}
if (verifier && !aJour) process.exit(1);
console.log(aJour ? '✓ Contenu généré à jour' : '✓ Génération terminée');
