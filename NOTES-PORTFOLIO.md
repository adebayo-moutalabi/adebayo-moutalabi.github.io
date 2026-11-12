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
- Projets : seules les réalisations en ligne et vérifiables. Aujourd'hui : **ExpoIA** et **ce portfolio**
  (pipeline CI/CD public). Retirés : Sock Shop, n8n auto-hébergé, BoursIA, AWS hybride, VirtuStage, LogiScout,
  gRPC, multi-VLAN, Continental IT, StageBenin. Adebayo va construire de nouveaux projets de zéro.
- Recherche affichée : alternance M2 à partir de septembre 2027, mobile partout en France.
- Écran de chargement : une fois par visite (onglet).
- Stack : ajout de GitHub Actions et API LLM ; retrait de Render, Laravel, WordPress, Flutter (hors positionnement).
- Les entrées du parcours sont inchangées.

## État (12/11/2026, branche `claude/portfolio-seo-audit-ct0caq`)

Fait sur la branche (pull request à valider) :
- SEO/GEO : contenu lisible sans JS (10 400 caractères au lieu de 52), h1 avec nom + métier, title et
  description, Open Graph + image de partage, JSON-LD ProfilePage/Person, robots.txt, sitemap.xml, llms.txt,
  favicon, URL canonique, liens GitHub et LinkedIn (rel="me").
- Accessibilité : lien « Aller au contenu », titres dans le bon ordre, HTML valide.
- CI : 4 contrôles (cohérence + contenu généré, html-validate, lychee, Lighthouse CI) avant déploiement.
- Lighthouse en local : performance 99, accessibilité 100, bonnes pratiques 100, SEO 100.
- Profil GitHub : README prêt dans `docs/github/`, consignes manuelles dans `docs/github/A-FAIRE-SUR-GITHUB.md`.
- Search Console : procédure dans `docs/SEARCH-CONSOLE.md`.

## Prochaines étapes

1. Adebayo relit l'aperçu et la pull request, puis fusionne.
2. Search Console : envoyer la valeur `google-site-verification` pour l'ajouter dans `index.html`.
3. Créer le dépôt `adebayo-moutalabi/adebayo-moutalabi` → pousser le README de profil.
4. Bio, épingles, description et topics à faire à la main sur github.com.
5. Nouveaux projets : chaque projet aura une fiche (problème, stack, résultat, lien) ; avec plusieurs projets,
   envisager une page par projet (`/projets/<id>/`) pour le référencement, et remettre `filtres: true`.
6. Plus tard : ajouter le stage Le Casier Français quand Adebayo le décidera.

## Journal

- 12/11/2026 : audit, création de ce fichier.
- 12/11/2026 : décisions sur le stage et les projets.
- 12/11/2026 : missions 2 (SEO/GEO), 3 (GitHub, préparé) et 4 (CI) réalisées sur la branche.
