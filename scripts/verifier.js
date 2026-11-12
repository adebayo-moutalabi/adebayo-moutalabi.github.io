// Vérifie le site sans navigateur (utilisé par la CI) :
//   1. syntaxe des fichiers JavaScript ;
//   2. cohérence des données (ids uniques, outils connus, captures présentes) ;
//   3. tous les liens et fichiers internes de toutes les pages HTML existent (CSS, JS, images, pages, ancres) ;
//   4. les liens absolus vers le site lui-même (canonical, og:image, sitemap, llms.txt) pointent vers des fichiers présents ;
//   5. fichiers indispensables : vérification Google Search Console, icônes, manifest.
// Lancer : node scripts/verifier.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const racine = path.resolve(__dirname, '..');
const existe = f => fs.existsSync(path.join(racine, f));
const lire = f => fs.readFileSync(path.join(racine, f), 'utf8');
const erreurs = [];

// ---------- 1. Syntaxe JavaScript ----------
const fichiersJS = [];
(function lister(d) { for (const f of fs.readdirSync(path.join(racine, d))) { const p = d + '/' + f; fs.statSync(path.join(racine, p)).isDirectory() ? lister(p) : p.endsWith('.js') && fichiersJS.push(p); } })('js');
for (const f of fichiersJS) { try { new vm.Script(lire(f), { filename: f }); } catch (e) { erreurs.push('Syntaxe ' + f + ' : ' + e.message); } }

// ---------- 2. Cohérence des données ----------
const Site = { data: {} };
for (const f of fs.readdirSync(path.join(racine, 'js/data'))) vm.runInNewContext(lire('js/data/' + f), { Site }, { filename: 'js/data/' + f });
const D = Site.data;
const outils = new Set(D.competences.outils.map(o => o.nom)), familles = new Set(D.competences.familles.map(f => f.id)), ids = new Set();
D.competences.outils.forEach(o => familles.has(o.famille) || erreurs.push('Outil « ' + o.nom + ' » : famille inconnue « ' + o.famille + ' »'));
D.projets.liste.forEach(p => {
  ids.has(p.id) && erreurs.push('Projet : id en double « ' + p.id + ' »'); ids.add(p.id);
  (p.outils || []).forEach(n => outils.has(n) || erreurs.push('Projet « ' + p.nomCourt + ' » : outil inconnu « ' + n + ' » (voir js/data/competences.js)'));
  for (const champ of ['image', 'partage']) if (p[champ] && !existe(p[champ])) erreurs.push('Projet « ' + p.nomCourt + ' » : fichier introuvable ' + p[champ]);
  if (!p.image || !p.imageTaille) erreurs.push('Projet « ' + p.nomCourt + ' » : capture d\'écran (image, imageTaille) manquante');
});
D.domaines.liste.forEach(d => d.outils.forEach(n => outils.has(n) || erreurs.push('Domaine « ' + d.titre + ' » : outil inconnu « ' + n + ' »')));
D.parcours.liste.forEach(c => ['experience', 'formation'].includes(c.branche) || erreurs.push('Parcours « ' + c.titre + ' » : branche invalide'));

// ---------- 3. Liens et fichiers internes de chaque page ----------
const pages = ['index.html', ...(existe('projets') ? fs.readdirSync(path.join(racine, 'projets')).map(d => 'projets/' + d + '/index.html') : [])];
const ancres = {};
const idsDe = f => ancres[f] || (ancres[f] = new Set([...lire(f).matchAll(/ id="([^"]+)"/g)].map(m => m[1])));
for (const pageHTML of pages) {
  if (!existe(pageHTML)) { erreurs.push('Page introuvable : ' + pageHTML + ' (lancez node scripts/generer.js)'); continue; }
  const html = lire(pageHTML), dossier = path.posix.dirname(pageHTML);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const lien = m[1];
    if (/^(https?:|mailto:|data:|\/\/)/.test(lien)) continue;
    const [chemin, ancre] = lien.split('#');
    let cible = chemin ? path.posix.normalize(path.posix.join(dossier, chemin)) : pageHTML;
    if (chemin && (chemin.endsWith('/') || cible === '.')) cible = (cible === '.' ? '' : cible.replace(/\/?$/, '/')) + 'index.html';
    if (!existe(cible)) { erreurs.push(pageHTML + ' : lien vers « ' + lien + ' » mais « ' + cible + ' » n\'existe pas'); continue; }
    if (ancre && cible.endsWith('.html') && !idsDe(cible).has(ancre)) erreurs.push(pageHTML + ' : ancre « #' + ancre + ' » absente de ' + cible);
  }
}

// ---------- 4. Liens absolus vers le site lui-même ----------
// L'adresse du site est lue dans la balise canonical (générée à partir de SITE_URL dans scripts/generer.js)
const canon = lire('index.html').match(/<link rel="canonical" href="(https:\/\/[^"]+\/)">/);
if (!canon) erreurs.push('index.html : balise <link rel="canonical"> absente (lancez node scripts/generer.js)');
const SITE = canon ? canon[1] : 'https://invalide/';
const SITE_RE = new RegExp(SITE.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '([^"\'\\s<>)#?]*)', 'g');
for (const f of [...pages, 'robots.txt', 'sitemap.xml', 'llms.txt']) {
  if (!existe(f)) { erreurs.push('Fichier introuvable : ' + f); continue; }
  for (const m of lire(f).matchAll(SITE_RE)) {
    const cible = m[1] === '' || m[1].endsWith('/') ? m[1] + 'index.html' : m[1];
    if (!existe(cible)) erreurs.push(f + ' : lien vers ' + SITE + m[1] + ' mais le fichier « ' + cible + ' » n\'existe pas');
  }
}

// ---------- 5. Fichiers indispensables ----------
if (!existe('google2f457726f419ac07.html')) erreurs.push('Fichier de vérification Google Search Console supprimé : google2f457726f419ac07.html (ne jamais le supprimer)');
for (const f of ['favicon.ico', 'site.webmanifest', 'assets/favicon.svg', 'assets/icones/apple-touch-icon.png', 'assets/logo/logo-am.svg', 'assets/logo/logo-am-clair.svg', 'assets/logo/logo-am-512.png', 'assets/partage.png'])
  if (!existe(f)) erreurs.push('Fichier introuvable : ' + f + ' (lancez node outils/generer-icones.js)');
if (existe('site.webmanifest')) for (const i of JSON.parse(lire('site.webmanifest')).icons) if (!existe(i.src)) erreurs.push('site.webmanifest : icône introuvable ' + i.src);

if (erreurs.length) { console.error(erreurs.map(e => '✗ ' + e).join('\n')); process.exit(1); }
console.log('✓ Site cohérent (' + fichiersJS.length + ' fichiers JS, ' + D.projets.liste.length + ' réalisations, ' + pages.length + ' pages, liens internes vérifiés)');
