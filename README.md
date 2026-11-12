# Portfolio d'Adebayo Moutalabi · Cloud, DevOps & IA

Site en ligne : <https://adebayo-moutalabi.github.io>

Site statique (HTML, CSS, un petit script JavaScript), **généré** à partir de fichiers de données, vérifié et
déployé par GitHub Actions. Aucune base de données, aucun framework, aucune dépendance à installer pour le site.

---

## 1. Voir le site chez soi

```
python3 -m http.server 8000
```

puis ouvrez <http://localhost:8000>. Les pages sont du HTML pur : elles s'affichent aussi sans JavaScript.

## 2. Modifier le contenu : la règle d'or

1. Modifiez un fichier de **`js/data/`** (voir le tableau ci-dessous).
2. Lancez **`node scripts/generer.js`** : toutes les pages sont régénérées.
3. Vérifiez avec **`node scripts/verifier.js`**, puis commitez **les données et les pages régénérées**.

Si vous oubliez l'étape 2, la CI échoue avec le message « index.html n'est pas à jour ».

| Fichier | Contenu |
|---|---|
| `js/data/profil.js` | Nom, intitulé (« Cloud, DevOps & IA »), phrase d'accroche, boutons, photo, liens GitHub/LinkedIn, menu |
| `js/data/projets.js` | Réalisations : une carte sur l'accueil **et une page** `projets/<id>/` chacune (problème, ce que j'ai fait, résultat, stack, capture) |
| `js/data/domaines.js` | « Ce que je fais » : les trois domaines |
| `js/data/competences.js` | Technologies, groupées par famille |
| `js/data/parcours.js` | Frise du parcours, langues, distinctions |
| `js/data/contact.js` | Titre du contact, e-mail, liens, ligne de disponibilité |

Écrivez des phrases factuelles et vérifiables : aucun chiffre ni témoignage inventé.

### Ajouter une réalisation

1. Une capture d'écran dans `assets/projets/` (WebP, 1200 px de large) et une image de partage 1200 × 630 (PNG).
2. Un bloc dans `js/data/projets.js` (copiez un bloc existant : `id`, `page: "projets/<id>/"`, `image`, `imageTaille`…).
3. `node scripts/generer.js` : la carte, la page, le sitemap, `llms.txt` et les données Google sont créés.
4. Ajoutez l'URL de la page dans `lighthouserc.json` (`collect.url`) pour qu'elle soit auditée.

## 3. Ce que produit `scripts/generer.js`

| Fichier généré | Rôle |
|---|---|
| `index.html` | Page d'accueil : présentation, réalisations, ce que je fais, technologies, parcours, contact |
| `projets/<id>/index.html` | Page de chaque réalisation (URL propre, citable par les moteurs) |
| `<head>` de chaque page | Titre, description, URL canonique, icônes, Open Graph (aperçu de partage), JSON-LD (données Google) |
| `sitemap.xml`, `robots.txt` | Liste des pages, autorisation des robots |
| `llms.txt` | Résumé factuel pour les moteurs IA |
| `site.webmanifest` | Nom et icônes de l'application (Android, raccourcis) |

**Adresse du site** : une seule variable, `SITE_URL`, en haut de `scripts/generer.js`
(nom de domaine personnel : voir `docs/NOM-DE-DOMAINE.md`).

Fichier à ne **jamais** supprimer : `google2f457726f419ac07.html` (vérification Google Search Console).

## 4. Organisation du dossier

```
├── index.html, projets/          ← pages GÉNÉRÉES (ne pas modifier à la main)
├── js/
│   ├── data/                     ← ★ LE CONTENU : c'est ici que vous modifiez ★
│   └── site.js                   ← le seul script des pages : thème, menu actif, formulaire de contact
├── css/
│   ├── base.css                  ← COULEURS (blocs :root), typographie, en-tête, pied de page, boutons
│   ├── site.css                  ← page d'accueil
│   └── page.css                  ← pages de projet
├── assets/
│   ├── logo/                     ← logo AM (sombre, clair, PNG 512 px)
│   ├── projets/                  ← captures d'écran et images de partage des réalisations
│   ├── icones/, favicon.svg      ← icônes (générées par outils/generer-icones.js)
│   ├── photo.webp                ← photo (carrée, 640 px conseillé)
│   └── partage.png               ← image d'aperçu de l'accueil (outils/generer-image-partage.js)
├── scripts/
│   ├── generer.js                ← génère les pages, le sitemap, llms.txt…
│   ├── verifier.js               ← contrôles : données, liens internes, fichiers indispensables
│   ├── construire.sh             ← prépare le dossier publié _site
│   └── capture-version.js        ← captures d'écran d'une version (workflow des versions)
├── outils/                       ← icônes, image de partage, fichier HTML unique (dist/)
├── .github/workflows/            ← deploy.yml (contrôles + déploiement), release.yml (versions)
├── docs/                         ← Search Console, nom de domaine, profil GitHub
└── NOTES-PORTFOLIO.md            ← décisions, versions, prochaines étapes
```

Couleurs : uniquement dans les blocs `:root` au début de `css/base.css` (thème sombre, puis thème clair).
Logo : après une modification de `assets/logo/logo-am.svg`, lancez `node outils/generer-icones.js`,
`node outils/generer-image-partage.js` puis `node scripts/generer.js`.

## 5. Le pipeline CI/CD

Chaque pull request et chaque push sur `main` lancent 4 contrôles en parallèle ; sur `main`, le site n'est déployé
sur GitHub Pages que s'ils sont tous verts.

| Contrôle | Outil | Échoue si… | Réglages |
|---|---|---|---|
| Cohérence | `node scripts/verifier.js` + `node scripts/generer.js --verifier` | donnée incohérente, lien interne cassé, page pas régénérée, fichier indispensable absent | les scripts |
| HTML | [html-validate](https://html-validate.org) | HTML invalide | `.htmlvalidate.json` |
| Liens | [lychee](https://lychee.cli.rs) | lien externe cassé | `lychee.toml` |
| Lighthouse | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | accessibilité < 95, SEO < 95, bonnes pratiques < 90 (performance < 90 = avertissement) | `lighthouserc.json` |

Lancer les contrôles chez soi (Node.js requis) :

```
node scripts/verifier.js
node scripts/generer.js --verifier
npx html-validate@11.21.0 index.html projets/*/index.html
bash scripts/construire.sh && npx @lhci/cli@0.16.1 autorun
```

**Versions** : chaque fusion sur `main` devient une version (tag Git annoté + Release GitHub avec captures),
créée par le workflow « Créer une version ». Retour à une version en une commande : voir `NOTES-PORTFOLIO.md`.

Autre option : `python3 outils/construire_fichier_unique.py` crée `dist/portfolio-fichier-unique.html`
(page d'accueil avec CSS, JS et images inclus), pratique à envoyer.
