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

## État (12/11/2026, branche `claude/portfolio-seo-audit-ct0caq`)

Fait sur la branche (pull request à valider) :
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

## Prochaines étapes

1. PR #1 : relecture complète faite ; fusion autorisée par Adebayo (12/11/2026), faite par Claude une fois la CI verte.
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
