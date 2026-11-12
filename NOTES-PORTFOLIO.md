# Notes du portfolio : décisions, état, prochaines étapes

Fichier de suivi tenu à jour à chaque session de travail sur le site
https://adebayo-moutalabi.github.io (dépôt `adebayo-moutalabi/adebayo-moutalabi.github.io`).

## Règles de travail

- On travaille sur une branche (`claude/portfolio-seo-audit-ct0caq` pour l'instant), puis pull request.
- Rien n'est poussé sur `main` sans l'accord d'Adebayo (le push sur `main` déclenche le déploiement).
- Aperçu (capture ou page) avant chaque publication.

## Positionnement (décidé le 12/11/2026)

- Cloud & DevOps **et** IA : agents IA et automatisations qui répondent à des besoins métier.
- Titre et accroche : jamais « étudiant ».
- Ne plus mettre en avant le « pont Europe-Afrique francophone ».
- Jamais présenté comme YouTubeur ou créateur de contenu.
- LinkedIn : https://www.linkedin.com/in/adebayo-moutalabi/ ; GitHub : https://github.com/adebayo-moutalabi

## État actuel (audit du 12/11/2026)

- Site statique (HTML/CSS/JS sans framework), contenu dans `js/data/*.js`, rendu par `js/render.js`.
- Déploiement : `.github/workflows/deploy.yml` (vérification `node scripts/verifier.js`, puis GitHub Pages depuis `main`).
- Sans JavaScript, la page ne contient que 52 caractères de texte : aucun titre, aucun projet. C'est le
  problème SEO/GEO principal.
- Pas de robots.txt, sitemap.xml, llms.txt (404), pas d'Open Graph, pas de JSON-LD, pas de favicon, pas d'URL canonique.
- Aucun lien vers GitHub sur le site.
- Contenu manquant : stage Le Casier Français (janv.–juin 2027), projet Nox.
- Écran de chargement de 3 s à chaque rechargement (`mascotte.js`, `uneFoisParSession: false`).

## Missions

1. Audit : fait (voir ci-dessus).
2. SEO/GEO : en attente des réponses sur le contenu.
3. GitHub (README de profil, bio, épingles, topics) : à faire.
4. CI : validation HTML, liens cassés, Lighthouse : à faire.

## Questions ouvertes

Voir la conversation du 12/11/2026 : réponses attendues sur le contenu avant toute modification.

## Journal

- 12/11/2026 : audit, création de ce fichier.
