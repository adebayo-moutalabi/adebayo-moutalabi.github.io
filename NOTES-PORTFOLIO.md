# Notes du portfolio : décisions, état, prochaines étapes

Fichier de suivi tenu à jour à chaque session de travail sur le site
https://adebayo-moutalabi.github.io (dépôt `adebayo-moutalabi/adebayo-moutalabi.github.io`).

## Règles de travail

- On travaille sur une branche, puis pull request (v3.0 : branche `logo-am`).
- Rien n'est fusionné dans `main` sans l'accord d'Adebayo (la fusion dans `main` déclenche le déploiement).
- Aperçu (captures) avant chaque publication.
- Après toute modification de `js/data/` : `node scripts/generer.js` (sinon la CI échoue).

## ⚠️ Retour à la v2.0 (12/11/2026)

Après mise en ligne, Adebayo n'a pas accroché avec la v3.0 (marque personnelle, nouveau design) : **retour au site
de la v2.0** (commit `03dc68a`). Republié immédiatement par `deploy.yml` (champ version), puis code du site remis
à l'état v2.0 par pull request (`git read-tree -u --reset 03dc68a`). Conservés : workflows des versions et du
retour arrière, notes, `docs/NOM-DE-DOMAINE.md`. La v3.0 reste disponible (tag et Release `v3.0`) si on veut en
reprendre des éléments (logo AM, icônes, page ExpoIA, nouvel en-tête…). Les sections ci-dessous sur la v3.0 sont
gardées pour mémoire. Version proposée pour ce retour : **v3.1** (« retour au contenu de la v2.0 »).

## Positionnement : marque personnelle (décision du 12/11/2026, à réévaluer vers juin 2027)

- Le site présente **qui je suis, ce que je construis et ce que j'ai livré**, et laisse chacun me contacter pour sa
  raison. Ni « candidat » (pas de CV en vitrine), ni « prestataire » (pas de section Services, pas de méthode façon
  agence, pas de mentions légales tant qu'il n'y a pas de micro-entreprise).
- En-tête : « Adebayo Moutalabi — Cloud, DevOps & IA » ; phrase : « Je construis et j'automatise des
  infrastructures, des pipelines et des agents IA. » Variantes proposées (non retenues pour l'instant) :
  « Je conçois, déploie et automatise des infrastructures cloud, des pipelines CI/CD et des agents IA. » ;
  « Des infrastructures fiables, des déploiements automatisés et des agents IA utiles : voilà ce que je construis. »
- Jamais « Ingénieur » (M1) ni « étudiant » dans le titre ou l'accroche.
- Contact : « Un projet, une mission ou une opportunité ? Écrivez-moi. » avec, en petit, « Ouvert aux missions
  ponctuelles et à une alternance M2 en 2027. »
- Ne plus mettre en avant le « pont Europe-Afrique francophone » ; jamais présenté comme YouTubeur ou créateur de contenu.
- Aucun témoignage ni chiffre inventé.
- **Juin 2027** (fin du stage Le Casier Français) : réévaluer le positionnement (alternance, missions, micro-entreprise).
- LinkedIn : https://www.linkedin.com/in/adebayo-moutalabi/ ; GitHub : https://github.com/adebayo-moutalabi

## Design v3.0 (12/11/2026)

- Base : l'identité v1.0 (Fraunces éditorial, or et sable, nom animé, frise git, fenêtre de message), améliorée.
  Pas de site générique : sections visuelles, peu de listes à puces.
- En-tête : nom en très grande typographie, lettre par lettre (graisse variable qui suit la souris, révélation à
  l'arrivée) ; logo AM en haut à gauche ; navigation fine et collante (Réalisations, Ce que je fais, Parcours,
  Contact) qui se compacte au défilement, menu replié sur mobile ; photo petite, cerclée d'une orbite (écho au
  logo) ; ligne de déploiement animée (git push → build → tests → déploiement → en ligne).
- Réalisations : Nox en grand, Continental IT et ExpoIA ; vraies captures dans un cadre de navigateur ; une page
  dédiée par réalisation.
- Ce que je fais : 3 domaines, chacun avec une petite visualisation animée (pipeline, jauges Lighthouse, échange avec Nox).
- Technologies : la pile, couche par couche. Parcours : `git log --graph` (filtre par branche, détail du commit).
- Contact : fenêtre de message (ouvre la messagerie du visiteur) et tuiles e-mail, LinkedIn, GitHub, lieu.
- Supprimés (audit) : écran de chargement, robot Atom (remplacé par le logo AM), gros plans du visage, « Par où
  commencer ? », Labo, textes défensifs, fond en réseau de points animé, palette de commandes et dock.
- Corrigés (audit) : libellés de section cachés sous la barre de progression, indicateur qui affichait la section
  précédente (la section active est celle qui traverse le milieu de l'écran).
- Animations coupées si « réduire les animations » ; contenu entièrement lisible sans JavaScript.
- Pas de skill « frontend-design » disponible dans la session (recherche faite le 12/11/2026).

## Décisions de contenu (12/11/2026)

- Stage Le Casier Français (janv.–juin 2027) : **pas affiché pour l'instant**.
- Réalisations (v3.0) : **Nox** (`/projets/nox/`), **Continental IT** (`/projets/continental-it/`),
  **ExpoIA** (`/projets/expoia/`). Le pipeline du portfolio est cité dans « Ce que je fais ».
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
- Disponibilité affichée (contact, en petit) : missions ponctuelles et alternance M2 en 2027.
- Stack : ajout de GitHub Actions, API LLM, Electron ; WordPress gardé (Continental IT) ; retrait de Render, Laravel, Flutter.
- Les entrées du parcours sont inchangées.

## État v2.0 (en ligne depuis le 12/11/2026, avant la v3.0)

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
| v3.0 | fusion de la PR de refonte (branche `logo-am`) | Marque personnelle, nouveau design, logo AM inclus |

La PR #2 (logo seul) est remplacée par la PR de la v3.0, qui contient le logo : il n'y a pas de v2.1.

Règle : **chaque fusion sur `main` = une nouvelle version** (v3.1, v3.2… pour une évolution, v4.0 pour une refonte).

**Créer une version** (après la fusion) : Actions → « Créer une version » → Run workflow → version, titre, notes.
Le workflow `.github/workflows/release.yml` crée le tag annoté sur le dernier commit de `main`, sert cette
version en local, la photographie (bureau 1440 × 900 et mobile) et publie la Release avec les captures.
En ligne de commande (avec l'outil `gh` installé sur ton ordinateur) :

```bash
gh workflow run release.yml -f version=v3.0 -f titre="Marque personnelle, nouveau design et logo AM"
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

1. ✅ Réglage GitHub Pages fait par Adebayo (12/11/2026) : **Source = GitHub Actions**. Seul le pipeline publie.
   À vérifier après la fusion de la v3.0 : un seul run sur `main` (« Vérifier et déployer »), plus de
   « pages build and deployment », et les fichiers de travail (NOTES, docs, scripts) en 404 en ligne.
2. Après la fusion de la v3.0 : lancer « Créer une version » trois fois : v1.0 (commit `5880c02`),
   v2.0 (commit `03dc68a`), v3.0 (dernier commit de `main`).
3. Après déploiement : Search Console → valider avec le fichier HTML, envoyer le sitemap, inspecter `/` et `/projets/nox/`.
4. À la main sur github.com : fermer la PR #2 (remplacée par la v3.0), épingler `nox`, descriptions et topics (portfolio et nox), ajouter Nox au README de profil.
5. Nouveaux projets : un bloc dans `js/data/projets.js` avec sa capture (voir README) : carte et page générées.
6. Plus tard : ajouter le stage Le Casier Français quand Adebayo le décidera.

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
- 12/11/2026 : décision « marque personnelle » ; refonte v3.0 sur la base du design v1.0 (en-tête éditorial, frise git,
  cartes visuelles) ; architecture : pages entièrement générées, un seul script léger ; réglage Pages = GitHub Actions.
- 12/11/2026 : v3.0 publiée puis non retenue ; retour au site v2.0 (republication immédiate + PR de retour du code).
