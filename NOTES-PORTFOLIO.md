# Notes du portfolio : décisions, état, prochaines étapes

Fichier de suivi tenu à jour à chaque session de travail sur le site
https://adebayo-moutalabi.github.io (dépôt `adebayo-moutalabi/adebayo-moutalabi.github.io`).

## Règles de travail

- On travaille sur une branche (`claude/portfolio-seo-audit-ct0caq` pour l'instant), puis pull request.
- Rien n'est fusionné dans `main` sans l'accord d'Adebayo (la fusion dans `main` déclenche le déploiement).
- Aperçu (captures) avant chaque publication.
- Après toute modification de `js/data/` : `node scripts/generer.js` (sinon la CI échoue).

## Positionnement (décidé le 12/11/2026)

- Titre : « Adebayo Moutalabi · Ingénieur Cloud, DevOps & IA ».
- Cloud & DevOps **et** IA : agents IA et automatisations qui répondent à des besoins métier.
- Titre et accroche : jamais « étudiant ».
- Ne plus mettre en avant le « pont Europe-Afrique francophone ».
- Jamais présenté comme YouTubeur ou créateur de contenu.
- Le surnom « Rekj » n'est pas utilisé sur le site (à décider si on veut l'ajouter dans les données Google).
- LinkedIn : https://www.linkedin.com/in/adebayo-moutalabi/ ; GitHub : https://github.com/adebayo-moutalabi

## Décisions de contenu (12/11/2026)

- Stage Le Casier Français (janv.–juin 2027) : **pas affiché pour l'instant**.
- Projets : seules les réalisations en ligne et vérifiables. Aujourd'hui, dans l'ordre : **Nox** (réalisation
  principale, page `/projets/nox/`), **Continental IT** (page `/projets/continental-it/`), **ExpoIA** et
  **ce portfolio** (pipeline CI/CD public).
- Continental IT : site officiel https://continentalit.org (WordPress 7 + Elementor). Contexte et résultat tirés du
  site ; « ce que j'ai fait » repris de l'ancienne fiche du portfolio (le site ne crédite pas son auteur) : à
  confirmer par Adebayo.
- Nox : fiche écrite uniquement à partir du dépôt `adebayo-moutalabi/nox` (README, CHANGELOG, docs) et de
  get-nox.github.io. Points à garder en tête : le README cite le modèle `gpt-realtime-2.1` pour la voix ; le nombre
  de tests diffère selon les documents (26 dans le README, 52 dans docs/SUBMISSION.md), donc le site dit seulement
  « tests de bout en bout automatisés » ; version 1.4.0 d'après package.json et CHANGELOG ; aucun résultat du
  hackathon n'est affiché (non documenté).
- Retirés : Sock Shop, n8n auto-hébergé, BoursIA, AWS hybride, VirtuStage, LogiScout,
  gRPC, multi-VLAN, StageBenin. Adebayo va construire de nouveaux projets de zéro.
- Recherche affichée : alternance M2 à partir de septembre 2027, mobile partout en France.
- Écran de chargement : une fois par visite (onglet).
- Stack : ajout de GitHub Actions, API LLM, Electron ; WordPress gardé (Continental IT) ; retrait de Render, Laravel, Flutter.
- Les entrées du parcours sont inchangées.

## État (12/11/2026) : en ligne

PR #1 fusionnée dans `main` (commit `03dc68a`), déployée par le run « Vérifier et déployer » n° 7 (tout vert).
Vérifié en ligne : accueil, /projets/nox/, /projets/continental-it/, sitemap.xml, robots.txt, llms.txt,
google2f457726f419ac07.html (200) ; NOTES, docs, scripts non publiés (404).

Contenu publié :
- SEO/GEO : contenu lisible sans JS (10 400 caractères au lieu de 52), h1 avec nom + métier, title et
  description, Open Graph + image de partage, JSON-LD ProfilePage/Person, robots.txt, sitemap.xml, llms.txt,
  favicon, URL canonique, liens GitHub et LinkedIn (rel="me").
- Accessibilité : lien « Aller au contenu », titres dans le bon ordre, HTML valide.
- CI : 4 contrôles (cohérence + contenu généré, html-validate, lychee, Lighthouse CI) avant déploiement.
- Lighthouse en local : performance 99, accessibilité 100, bonnes pratiques 100, SEO 100.
- Profil GitHub : README de profil, bio, lien LinkedIn et épingle du portfolio **faits par Adebayo**.
  Reste : épingler `nox`, description/topics des dépôts (voir `docs/github/A-FAIRE-SUR-GITHUB.md`).
- Search Console : fichier de vérification `google2f457726f419ac07.html` à la racine (**ne jamais le supprimer**,
  hors sitemap, contrôlé par `scripts/verifier.js`). Procédure dans `docs/SEARCH-CONSOLE.md`.
- Page projet générée : `projets/nox/index.html` (JSON-LD WebPage + SoftwareApplication + fil d'Ariane),
  ajoutée au sitemap, à llms.txt, au JSON-LD de l'accueil et aux contrôles CI (html-validate, lychee, Lighthouse).
- Lighthouse local : accueil 99/100/100/100, pages Nox et Continental IT 100/100/100/100.

## Versions (tags Git annotés + Releases GitHub)

| Version | Commit | Contenu |
|---|---|---|
| v1.0 | `5880c02` | Site d'origine (avant la PR #1) |
| v2.0 | `03dc68a` | Positionnement Cloud, DevOps & IA, SEO/GEO, pipeline (PR #1) |
| v2.1 | fusion de la PR #2 | Logo AM, icônes, SITE_URL unique |
| v3.0 | fusion de la PR de refonte | Site prestataire Cloud, DevOps & IA |

Règle : **chaque fusion sur `main` = une nouvelle version** (v2.1, v2.2… pour une évolution, v3.0 pour une refonte).

**Créer une version** (après la fusion) : Actions → « Créer une version » → Run workflow → version, titre, notes.
Le workflow `.github/workflows/release.yml` crée le tag annoté sur le dernier commit de `main`, sert cette
version en local, la photographie (bureau 1440 × 900 et mobile) et publie la Release avec les captures.
En ligne de commande (avec l'outil `gh` installé sur ton ordinateur) :

```bash
gh workflow run release.yml -f version=v2.1 -f titre="Logo AM et icônes"
```

Note 12/11/2026 : les tags v1.0 et v2.0 n'ont pas pu être poussés depuis la session Claude (le proxy Git de
l'environnement refuse les tags). Ils seront créés par ce workflow, une fois sur `main`, avec
`commit=5880c02` pour v1.0 et `commit=03dc68a` pour v2.0.

**Revenir à une version, en une commande :**

- Remettre **le site en ligne** dans l'état d'une version (le code de `main` ne change pas) :

  ```bash
  gh workflow run deploy.yml -f version=v2.0
  ```

  (ou Actions → « Vérifier et déployer » → Run workflow → version = v2.0). Les contrôles sont sautés, le tag est
  republié tel quel. Le prochain push sur `main` remettra la version courante.
- Remettre **le code** dans l'état d'une version (sur une branche, puis pull request) :

  ```bash
  git read-tree -u --reset v2.0 && git commit -m "Retour au contenu de v2.0"
  ```

  `read-tree -u --reset` remplace tous les fichiers suivis par ceux de v2.0 (y compris en supprimant les fichiers
  ajoutés depuis), sans réécrire l'historique : le retour est lui-même un commit, annulable.

## Logo (12/11/2026)

- Source : `assets/logo/logo-am.svg` (monogramme AM doré, orbite, check), fourni par Adebayo sur la branche `logo-am`.
- Variante claire `assets/logo/logo-am-clair.svg` : orbite arrière et nœuds en brun doré (#8A6A3A), sinon
  invisibles sur fond clair. La bonne variante s'affiche selon le thème (CSS `.logo .l-sombre / .l-clair`).
- Présent : en-tête et pied de page de l'accueil et des pages de projet, image de partage, JSON-LD
  (`Person.brand.logo` : Person n'a pas de propriété `logo` dans schema.org).
- Icônes générées par `node outils/generer-icones.js` : favicon.svg (logo sur carré sombre arrondi, lisible
  dans les deux thèmes), favicon.ico 32 px, apple-touch-icon 180 px, icônes 192 et 512 px, `site.webmanifest`.

## Nom de domaine (plus tard)

Démarche complète dans `docs/NOM-DE-DOMAINE.md`. En bref :
1. Acheter le domaine (renouvellement automatique, verrouillage).
2. DNS : 4 × A et 4 × AAAA vers GitHub Pages pour l'apex, CNAME `www` → `adebayo-moutalabi.github.io`,
   TXT de vérification du domaine sur GitHub.
3. GitHub → Settings → Pages : Custom domain, puis Enforce HTTPS ; github.io redirige alors tout seul (301).
4. Code : changer **une seule variable**, `SITE_URL` en haut de `scripts/generer.js`, puis
   `node scripts/generer.js` (canonical, Open Graph, JSON-LD, sitemap, robots.txt, llms.txt) ; à la main :
   `lychee.toml`, texte de l'image de partage, docs.
5. Liens : GitHub (profil, About, README de profil, dépôt nox), LinkedIn, CV.
6. Search Console : propriété « Domaine » validée par TXT DNS, renvoi du sitemap, outil de changement d'adresse
   depuis l'ancienne propriété ; Bing Webmaster Tools.

## Prochaines étapes

1. **Réglage GitHub Pages à corriger (à la main)** : Settings → Pages → Build and deployment → Source :
   « GitHub Actions ». Aujourd'hui la source est encore « Deploy from a branch » : à chaque push sur `main`,
   « pages build and deployment » publie tout le dépôt sans contrôle, environ 2 min 30 avant que le pipeline
   ne republie la version vérifiée. Après le changement, seul le pipeline publie.
2. Après déploiement : Search Console → valider avec le fichier HTML, envoyer le sitemap, inspecter `/` et `/projets/nox/`.
3. À la main sur github.com : épingler `nox`, descriptions et topics (portfolio et nox), ajouter Nox au README de profil.
4. Nouveaux projets : chaque projet aura une fiche (problème, stack, résultat, lien) ; avec plusieurs projets,
   lui donner une page (`page: "projets/<id>/"`, comme Nox) pour le référencement, et remettre `filtres: true`.
5. Plus tard : ajouter le stage Le Casier Français quand Adebayo le décidera.

## Journal

- 12/11/2026 : audit, création de ce fichier.
- 12/11/2026 : décisions sur le stage et les projets.
- 12/11/2026 : missions 2 (SEO/GEO), 3 (GitHub, préparé) et 4 (CI) réalisées sur la branche ; PR #1 ouverte, CI verte.
- 12/11/2026 : profil GitHub fait par Adebayo ; ajout du fichier Google Search Console ; Nox en réalisation
  principale avec page `/projets/nox/`.
- 12/11/2026 : Continental IT ajouté en 2e réalisation (`/projets/continental-it/`) ; relecture complète avant fusion.
- 12/11/2026 : PR #1 fusionnée par Claude (autorisation d'Adebayo), déploiement vérifié en ligne ; double publication Pages constatée.
- 12/11/2026 : logo AM intégré partout (variante claire, icônes, manifest, JSON-LD) ; SITE_URL unique ; docs/NOM-DE-DOMAINE.md.
- 12/11/2026 : versions (workflow release.yml, retour arrière via deploy.yml -f version=…) ; tags v1.0 et v2.0 à créer par le workflow.
