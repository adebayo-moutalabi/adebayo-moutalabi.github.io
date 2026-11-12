// Fabrique assets/partage.png (image affichée quand on partage le site sur LinkedIn, WhatsApp…)
// à partir du modèle outils/image-partage.html.
// Prérequis : Playwright (npm i -D playwright && npx playwright install chromium).
// Lancer : node outils/generer-image-partage.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const navigateur = await chromium.launch();
  const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + path.join(__dirname, 'image-partage.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(__dirname, '..', 'assets', 'partage.png') });
  await navigateur.close();
  console.log('✓ assets/partage.png créé (1200 × 630)');
})();
