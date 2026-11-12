// Vérifie le site sans navigateur : syntaxe des fichiers JS + cohérence des données.
// Lancer : node scripts/verifier.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const racine = path.resolve(__dirname, '..');
let erreurs = [];

// 1. Tous les <script src> et <link href> locaux de index.html existent
const html = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');
for (const m of html.matchAll(/(?:src|href)="((?:js|css|assets)\/[^"]+)"/g)) {
  if (!fs.existsSync(path.join(racine, m[1]))) erreurs.push('Fichier introuvable : ' + m[1]);
}

// 1 bis. Les liens absolus vers ce site (canonical, og:image, sitemap…) pointent vers des fichiers qui existent
// L'adresse du site est lue dans la balise canonical (générée à partir de SITE_URL dans scripts/generer.js)
const canon = html.match(/<link rel="canonical" href="(https:\/\/[^"]+\/)">/);
if (!canon) erreurs.push('index.html : balise <link rel="canonical"> absente (lancez node scripts/generer.js)');
const SITE = canon ? canon[1] : 'https://invalide/';
const SITE_RE = new RegExp(SITE.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '([^"\'\\s<>)#?]*)', 'g');
const pagesProjet = fs.existsSync(path.join(racine, 'projets')) ? fs.readdirSync(path.join(racine, 'projets'), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => 'projets/' + d.name + '/index.html').concat(['projets/index.html']) : [];
if (!fs.existsSync(path.join(racine, 'google2f457726f419ac07.html'))) erreurs.push('Fichier de vérification Google Search Console supprimé : google2f457726f419ac07.html');
// Icônes et manifest : chaque fichier cité doit exister
for (const f of ['favicon.ico', 'site.webmanifest', 'assets/favicon.svg', 'assets/icones/apple-touch-icon.png', 'assets/logo/logo-am.svg', 'assets/logo/logo-am-clair.svg', 'assets/logo/logo-am-512.png'])
  if (!fs.existsSync(path.join(racine, f))) erreurs.push('Fichier introuvable : ' + f + ' (lancez node outils/generer-icones.js)');
if (fs.existsSync(path.join(racine, 'site.webmanifest')))
  for (const i of JSON.parse(fs.readFileSync(path.join(racine, 'site.webmanifest'), 'utf8')).icons)
    if (!fs.existsSync(path.join(racine, i.src))) erreurs.push('site.webmanifest : icône introuvable ' + i.src);
for (const f of ['index.html', 'robots.txt', 'sitemap.xml', 'llms.txt', ...pagesProjet]) {
  if (!fs.existsSync(path.join(racine, f))) { erreurs.push('Fichier introuvable : ' + f); continue; }
  for (const m of fs.readFileSync(path.join(racine, f), 'utf8').matchAll(SITE_RE)) {
    const cible = m[1] === '' || m[1].endsWith('/') ? m[1] + 'index.html' : m[1];
    if (!fs.existsSync(path.join(racine, cible))) erreurs.push(f + ' : lien vers ' + SITE + m[1] + ' mais le fichier « ' + cible + ' » n\'existe pas');
  }
}

// 2. Syntaxe de chaque fichier JS
const fichiers = [];
(function lister(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? lister(p) : p.endsWith('.js') && fichiers.push(p); } })(path.join(racine, 'js'));
for (const f of fichiers) { try { new vm.Script(fs.readFileSync(f, 'utf8'), { filename: f }); } catch (e) { erreurs.push('Syntaxe ' + path.relative(racine, f) + ' : ' + e.message); } }

// 3. Cohérence des données (mêmes règles que ?debug)
const Site = { data: {} };
for (const f of fs.readdirSync(path.join(racine, 'js/data'))) vm.runInNewContext(fs.readFileSync(path.join(racine, 'js/data', f), 'utf8'), { Site });
const D = Site.data, outils = new Set(D.competences.outils.map(o => o.nom)), fam = new Set(D.competences.familles.map(f => f.id)), cats = new Set(D.projets.categories.map(c => c.id)), ids = new Set();
D.competences.outils.forEach(o => fam.has(o.famille) || erreurs.push('Outil « ' + o.nom + ' » : famille inconnue'));
D.projets.liste.forEach(p => {
  ids.has(p.id) && erreurs.push('Projet : id en double « ' + p.id + ' »'); ids.add(p.id);
  cats.has(p.categorie) || erreurs.push('Projet « ' + p.titre + ' » : catégorie inconnue');
  D.vignettes[p.vignette] || erreurs.push('Projet « ' + p.titre + ' » : vignette inconnue');
  (p.outils || []).forEach(n => outils.has(n) || erreurs.push('Projet « ' + p.titre + ' » : outil inconnu « ' + n + ' »'));
});
D.parcours.liste.forEach(c => ['experience', 'formation'].includes(c.branche) || erreurs.push('Parcours « ' + c.titre + ' » : branche invalide'));

if (erreurs.length) { console.error(erreurs.map(e => '✗ ' + e).join('\n')); process.exit(1); }
console.log('✓ Site cohérent (' + fichiers.length + ' fichiers JS, ' + D.projets.liste.length + ' projets, ' + D.parcours.liste.length + ' étapes de parcours)');
