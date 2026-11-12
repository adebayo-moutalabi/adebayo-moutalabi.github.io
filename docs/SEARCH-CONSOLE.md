# Référencement : étapes à faire toi-même (après la mise en ligne)

À faire **une fois la pull request fusionnée et le site déployé**.

## 1. Google Search Console

1. Va sur https://search.google.com/search-console et connecte-toi avec ton compte Google.
2. **Ajouter une propriété** → choisis **Préfixe de l'URL** (pas « Domaine » : sur `github.io` tu ne gères pas le DNS)
   → saisis `https://adebayo-moutalabi.github.io/` → **Continuer**.
3. Validation : méthode **Fichier HTML**. Le fichier `google2f457726f419ac07.html` est à la racine du dépôt
   (contenu exact : `google-site-verification: google2f457726f419ac07.html`).
   - Une fois la PR fusionnée et le déploiement terminé (onglet Actions vert), vérifie que
     https://adebayo-moutalabi.github.io/google2f457726f419ac07.html s'affiche, puis clique **Valider**.
   - **Ne jamais supprimer ce fichier** : Google revérifie régulièrement. `scripts/verifier.js` fait échouer
     la CI s'il disparaît. Il n'est volontairement pas dans le sitemap.
4. Menu **Sitemaps** → saisis `sitemap.xml` → **Envoyer**. Le statut doit passer à « Opération réussie ».
5. Menu **Inspection de l'URL** → colle `https://adebayo-moutalabi.github.io/` →
   **Tester l'URL en ligne** → vérifie la capture et le HTML → **Demander l'indexation**.
   Recommence avec `https://adebayo-moutalabi.github.io/projets/nox/`.
6. Quelques jours plus tard :
   - **Performances** : les recherches qui mènent au site (par ex. « Adebayo Moutalabi ») ;
   - **Pages** : la page doit être « Indexée » ;
   - **Améliorations** : la « Page de profil » (données structurées) doit être « Valide ».

## 2. Vérifier les données structurées

https://search.google.com/test/rich-results → URL du site → le test doit détecter **Page de profil**
(ProfilePage avec la personne Adebayo Moutalabi, liens GitHub et LinkedIn).
Pour la page Nox, utilise https://validator.schema.org (SoftwareApplication et fil d'Ariane) : Google n'affiche
de résultat enrichi « logiciel » qu'avec des notes d'utilisateurs, que Nox n'a pas, mais les données restent lues.

## 3. Bing Webmaster Tools (important pour les moteurs IA)

Bing alimente la recherche de ChatGPT et de Copilot.
https://www.bing.com/webmasters → **Importer depuis Google Search Console** (le plus rapide) →
vérifie que le sitemap est bien repris.

## 4. Aperçu LinkedIn

Pour que LinkedIn affiche la nouvelle image de partage :
https://www.linkedin.com/post-inspector/ → URL du site → **Inspect**. À refaire après chaque changement d'image.

## 5. Liens croisés (à la main)

- **LinkedIn** → ton profil → **Coordonnées** → **Site web** : `https://adebayo-moutalabi.github.io` (type « Portfolio »).
- **LinkedIn** → section **Sélection** : ajoute le lien du portfolio.
- **GitHub** : voir `docs/github/A-FAIRE-SUR-GITHUB.md` (site web dans le profil, README de profil).

Plus ces trois profils se citent entre eux (site → GitHub/LinkedIn, et l'inverse), plus Google et les moteurs IA
les relient avec certitude à la même personne.
