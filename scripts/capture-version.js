// Capture d'écran d'une version du site servie en local (utilisé par .github/workflows/release.yml).
// Usage : node scripts/capture-version.js <url> <dossier-de-sortie> <version>
// Produit <version>-bureau.png (1440 × 900) et <version>-mobile.png (390 × 844).
const path = require('path');
const { chromium, devices } = require('playwright');
const [url, sortie, version] = process.argv.slice(2);
if (!url || !sortie || !version) { console.error('Usage : node scripts/capture-version.js <url> <dossier> <version>'); process.exit(1); }

(async () => {
  const navigateur = await chromium.launch();
  const formats = [
    ['bureau', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ['mobile', { ...devices['iPhone 13'] }]
  ];
  for (const [nom, options] of formats) {
    const page = await (await navigateur.newContext({ ...options, colorScheme: 'dark' })).newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(6000);   // laisse passer l'écran de chargement des anciennes versions
    const fichier = path.join(sortie, version + '-' + nom + '.png');
    await page.screenshot({ path: fichier });
    console.log('✓ ' + fichier);
  }
  await navigateur.close();
})();
