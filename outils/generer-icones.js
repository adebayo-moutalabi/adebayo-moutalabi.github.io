// Fabrique toutes les icônes du site à partir du logo assets/logo/logo-am.svg :
//   assets/favicon.svg            favicon vectoriel (logo sur carré sombre arrondi, lisible en thème clair et sombre)
//   favicon.ico                   32 × 32, à la racine (certains navigateurs et robots le demandent là)
//   assets/icones/apple-touch-icon.png   180 × 180 (écran d'accueil iPhone / iPad)
//   assets/icones/icon-192.png, icon-512.png   icônes du manifest (Android, raccourcis)
//   assets/logo/logo-am-512.png   logo seul, fond transparent (données Google JSON-LD)
// Prérequis : Playwright (déjà utilisé par generer-image-partage.js) et Python 3 avec Pillow (pour le .ico).
// Lancer : node outils/generer-icones.js
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const racine = path.resolve(__dirname, '..');
const logo = fs.readFileSync(path.join(racine, 'assets/logo/logo-am.svg'), 'utf8');
const interieur = logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>[\s\S]*?<\/title>/, '');

// Favicon SVG : carré sombre arrondi (couleur --ground du site) + logo centré avec une marge
const favicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
  '<rect width="120" height="120" rx="26" fill="#0D0E10"/>' +
  '<g transform="translate(9 9) scale(.85)">' + interieur + '</g></svg>\n';
fs.writeFileSync(path.join(racine, 'assets/favicon.svg'), favicon);

(async () => {
  const navigateur = await chromium.launch();
  const rendu = async (svg, taille, fichier, transparent) => {
    const page = await navigateur.newPage({ viewport: { width: taille, height: taille } });
    await page.setContent('<html><body style="margin:0;background:transparent">' +
      svg.replace('<svg ', '<svg width="' + taille + '" height="' + taille + '" ') + '</body></html>');
    await page.screenshot({ path: path.join(racine, fichier), omitBackground: !!transparent });
    await page.close();
  };
  fs.mkdirSync(path.join(racine, 'assets/icones'), { recursive: true });
  await rendu(favicon, 180, 'assets/icones/apple-touch-icon.png');
  await rendu(favicon, 192, 'assets/icones/icon-192.png');
  await rendu(favicon, 512, 'assets/icones/icon-512.png');
  await rendu(favicon, 64, 'assets/icones/favicon-64.png');
  await rendu(logo.replace(/ width="120" height="120"/, ''), 512, 'assets/logo/logo-am-512.png', true);
  await navigateur.close();
  // .ico 32 × 32 à partir du rendu 64 px (Pillow réduit proprement)
  execFileSync('python3', ['-I', '-c',
    'import sys; from PIL import Image; Image.open(sys.argv[1]).convert("RGBA").save(sys.argv[2], sizes=[(32, 32)])',
    path.join(racine, 'assets/icones/favicon-64.png'), path.join(racine, 'favicon.ico')]);
  fs.unlinkSync(path.join(racine, 'assets/icones/favicon-64.png'));
  console.log('✓ Icônes générées : favicon.svg, favicon.ico, apple-touch-icon, icon-192, icon-512, logo-am-512.png');
})();
