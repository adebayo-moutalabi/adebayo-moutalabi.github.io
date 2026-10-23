# Portfolio d'Adebayo Moutalabi : guide d'utilisation

Ce dossier contient tout le site. **Aucune installation n'est nécessaire** : c'est du HTML, du CSS et du JavaScript « simples ».
Tout le contenu (textes, projets, parcours, compétences, démos…) est dans des **fichiers de données** faciles à modifier. Le design s'adapte tout seul aux écrans (ordinateur, tablette, mobile).

---

## 1. Voir le site chez soi

- **Le plus simple** : double-cliquez sur `index.html`. Il s'ouvre dans le navigateur.
- Si quelque chose ne s'affiche pas, lancez un petit serveur local (nécessite Python, déjà installé sur Mac/Linux) :
  ```
  cd dossier-du-site
  python3 -m http.server 8000
  ```
  puis ouvrez <http://localhost:8000>.
- **Après chaque modification, rechargez la page** (F5 ou Cmd+R).
- **Vérificateur automatique** : ajoutez `?debug` à l'adresse (ex. `index.html?debug`). Un encadré rouge liste les erreurs de cohérence (outil inconnu, catégorie inexistante, champ manquant…), ou affiche « tout est cohérent ✓ ».

---

## 2. Les dépendances (ce dont le site a besoin)

| Dépendance | Rôle | Si elle manque |
|---|---|---|
| **Google Fonts** (polices *Fraunces* et *Inter*), chargées depuis internet | Le style des titres et du texte | Le site reste utilisable avec des polices de secours (Georgia / police système), mais moins élégant |
| **Un navigateur récent** (Chrome, Edge, Safari, Firefox des 2-3 dernières années) | Le site utilise des fonctions modernes (`color-mix`, `inert`, animations web) | Très vieux navigateurs : affichage dégradé |
| **Le fichier `assets/photo.webp`** | Ta photo dans l'ouverture | La photo n'apparaît pas |
| **Ton application de messagerie** | Le bouton « Ouvrir dans ma messagerie » du contact utilise un lien `mailto:` | Le visiteur peut utiliser « Copier mon e-mail » |

**Il n'y a pas** de base de données, pas de serveur, pas de bibliothèque à installer (ni npm, ni React, ni jQuery), pas de clé d'API, pas de cookies, pas de suivi. Le site mémorise seulement, dans le navigateur du visiteur, son profil choisi (« Recruteur », etc.) et le fait d'avoir vu l'écran de chargement.

**Le formulaire de contact n'envoie rien tout seul** : il prépare un e-mail dans la messagerie du visiteur. Pour recevoir des messages sans passer par sa messagerie, il faudrait un service comme Formspree ou Netlify Forms (non inclus).

---

## 3. Comment le dossier est organisé

```
portfolio-adebayo/
├── index.html              ← squelette de la page (rarement modifié)
├── css/                    ← le design
│   ├── base.css            ← COULEURS (variables :root), typographie, ouverture
│   ├── labo-projets.css
│   ├── contact-dock.css
│   ├── parcours-competences.css
│   └── mascotte.css
├── js/
│   ├── data/               ← ★ VOTRE CONTENU : c'est ici que vous modifiez ★
│   │   ├── profil.js         nom, photo, accroche, liste des sections
│   │   ├── visiteurs.js      « Par où commencer ? » (3 profils)
│   │   ├── labo.js           les 4 démos interactives
│   │   ├── competences.js    familles d'outils et outils
│   │   ├── methode.js        les étapes de la méthode
│   │   ├── projets.js        les projets (+ catégories)
│   │   ├── vignettes.js      petits dessins des projets
│   │   ├── parcours.js       expériences, formations, langues, distinctions
│   │   ├── contact.js        e-mail, LinkedIn, fiche de statut
│   │   └── mascotte.js       textes de Atom et réglages du chargement
│   ├── render.js           ← fabrique le HTML à partir des données
│   ├── hero.js, labo.js, competences.js, methode.js, projets.js,
│   │   parcours.js, contact.js, navigation.js, fond.js, atom.js
│   │                       ← le comportement (animations, interactions)
│   ├── verifier.js         ← contrôle de cohérence (?debug)
│   ├── utils.js, main.js   ← outils partagés et démarrage
├── assets/
│   ├── photo.webp          ← ta photo (carrée, 640 px conseillé)
│   └── atom.svg             ← dessin de la mascotte
├── docs/ATOM-persona.md     ← fiche persona de la mascotte
├── outils/construire_fichier_unique.py   ← fabrique un fichier HTML unique
└── dist/                   ← sortie du fichier unique (créé par le script)
```

**Règle d'or : pour changer du contenu, ouvrez un fichier de `js/data/`.** Vous n'avez pas besoin de toucher aux autres.

---

## 4. Modifier le contenu : recettes

Les fichiers de données sont du JavaScript. Quatre règles à respecter :
1. Les textes sont **entre guillemets** `"comme ceci"`.
2. Entre deux éléments d'une liste, une **virgule** (mais pas après le dernier).
3. Pour mettre un guillemet dans un texte, écrivez `\"` ; l'apostrophe `'` ne pose pas de problème dans un texte entre guillemets doubles.
4. Les accolades `{ }` et crochets `[ ]` vont toujours par paire.

Un oubli de virgule est l'erreur la plus fréquente : si la page reste vide, ouvrez la console du navigateur (touche **F12**, onglet « Console ») : elle indique le fichier et la ligne fautive.

### Changer mon nom, ma photo, l'accroche
`js/data/profil.js` : `prenom`, `nomFamille`, `accroche`. Pour la photo, remplacez `assets/photo.webp` par une autre image (même nom), ou changez le chemin `photo`. Le titre de l'onglet est dans `index.html` (balise `<title>`).

### Ajouter une expérience ou une formation
`js/data/parcours.js`, liste `liste`. Copiez un bloc complet et placez-le **à sa place chronologique** (le plus récent en haut) :
```js
{
  branche: "experience",          // ou "formation"
  date: "janv. – juin 2027",
  titre: "Ingénieur DevOps (stage)",
  lieu: "Entreprise · Lille",
  type: "Stage",
  resume: "Une phrase qui résume la mission.",
  points: [
    "Première réalisation",
    "Deuxième réalisation"
  ]
},
```
Options : `fusion: true` pour une étape où formation et expérience se rejoignent ; `premier: true` pour le tout premier commit (dernière ligne). Le détail s'affiche tout seul sur ordinateur et mobile.

### Ajouter une langue
`js/data/parcours.js`, liste `langues` : `{ nom: "Espagnol", niveau: "A2" },`. La mise en page s'adapte.

### Ajouter un programme, une certification, une distinction
`js/data/parcours.js`, liste `distinctions` :
```js
{ annee: "2027", type: "Certification · AWS", titre: "AWS Cloud Practitioner", texte: "Une phrase.", sceau: "AWS Certified" },
```
`sceau` est le court texte qui tourne autour du médaillon.

### Ajouter, modifier ou retirer un projet
`js/data/projets.js`, liste `liste` : copiez un bloc, changez `id` (unique, sans espace), `categorie` (`cloud`, `ia` ou `web`), les textes et `points`. Le champ `vignette` choisit le dessin (voir `vignettes.js`). `outils` doit contenir des noms **exactement identiques** à ceux de `competences.js` : c'est ce qui relie le projet à la stack. Pour retirer : supprimez le bloc.
Pour une nouvelle catégorie de filtre : ajoutez-la dans `categories` du même fichier.

### Ajouter ou retirer une compétence
`js/data/competences.js`, liste `outils` : `{ nom: "Ansible", famille: "sys", role: "Automatiser la configuration des serveurs." },`. `famille` est l'identifiant d'une famille de la liste `familles` (`ci`, `cont`, `cloud`, `sys`, `net`, `ia`, `web`). Pour une nouvelle famille (nouveau panneau), ajoutez un bloc dans `familles` avec un `id` unique. Les boutons de projets sur chaque carte se calculent seuls à partir des projets qui citent l'outil.

### Modifier le labo
`js/data/labo.js` :
- **Textes, pastilles d'outils** : champs `titre`, `texte`, `outils`.
- **Pipeline CI/CD** : liste `etapes` (ajoutez ou retirez des étapes avec leur durée).
- **Agent IA** : liste `questions` (`question` + `reponse`, le `<b>gras</b>` est accepté).
- **Architecture AWS** : liste `briques` (`actif: true` = déjà activée au départ).
- Les curseurs et animations se mettent à jour tout seuls.
> Ajouter une **cinquième démo d'un type nouveau** demande d'écrire du code : voir §7.

### Modifier la méthode, le contact, le choix de visiteur
- `js/data/methode.js` : étapes (la numérotation est automatique).
- `js/data/contact.js` : e-mail, lien LinkedIn, fiche (statut, lieu…), boutons de choix du message.
- `js/data/visiteurs.js` : les 3 cartes « Par où commencer ? ».

### Régler l'écran de chargement et la mascotte
`js/data/mascotte.js` :
- `actif: false` → plus d'écran de chargement du tout ;
- `uneFoisParSession: true` → seulement à la première visite de l'onglet (actuellement : **à chaque rechargement**) ;
- `dureeSecondes`, `clicBonus`, les commandes affichées, les phrases de Atom.

### Changer les couleurs
`css/base.css`, tout début : les blocs `:root` (thème sombre) et `:root[data-theme="light"]` / `@media (prefers-color-scheme: light)` (thème clair). Principales variables : `--gold` (or, accent), `--blue` (bleu « IA »), `--ground` (fond), `--surface` (cartes), `--ink` (texte).

---

## 5. Publier le site en ligne

Le dossier entier est un site statique : déposez-le tel quel chez un hébergeur gratuit.
- **Netlify Drop** (<https://app.netlify.com/drop>) : glissez-déposez le dossier, le site est en ligne en 30 secondes.
- **GitHub Pages**, **Cloudflare Pages**, **Vercel** : créez un dépôt avec ces fichiers, activez la publication.
- Ou construisez **un seul fichier** : `python3 outils/construire_fichier_unique.py` crée `dist/portfolio-fichier-unique.html` (CSS, JS et photo inclus), pratique à envoyer ou à héberger seul.

Après un changement de contenu : refaire la même opération (ré-envoyer le dossier ou le fichier unique).
Pensez à vérifier avec `?debug` avant de publier.

---

## 6. Responsive (adaptation aux écrans)

Rien à faire : toutes les sections se réorganisent automatiquement. Les listes que vous agrandissez (projets, outils, langues, distinctions, étapes) se replient en une colonne sur mobile ; les panneaux de compétences deviennent un accordéon ; le détail des commits s'ouvre sous la ligne touchée ; le dock devient une barre d'onglets en bas. Testez avec la fenêtre du navigateur rétrécie, ou avec l'outil « mode appareil » (F12).

---

## 7. Aller plus loin (code)

| Je veux… | Fichier |
|---|---|
| Changer l'effet d'ouverture de la photo | `js/hero.js` + `css/base.css` |
| Ajouter une commande au terminal (Cmd/Ctrl+K) | `js/navigation.js`, liste `CMDS` |
| Ajouter une section entière | 1) `<section id="…">` dans `index.html` ; 2) une fonction de rendu dans `js/render.js` ; 3) son id dans `navigation` de `profil.js` ; 4) son lien dans le dock de `index.html` |
| Créer un nouveau type de démo dans le labo | `render.js` (fonction `labo`) + `js/labo.js` + `data/labo.js` |
| Modifier le dessin ou les animations de Atom | `js/atom.js` (`botSVG`) + `css/mascotte.css` |
| Changer la forme du fond selon la section | attribut `data-shape` des sections dans `index.html` (formes : sphere, ring, cube, galaxy, helix, wave, torus) |

**Ordre de chargement** (voir la fin de `index.html`) : données → `render.js` (construit le HTML) → modules d'interaction → `atom.js` → `verifier.js` → `main.js`. Chaque module est isolé et communique via l'objet global `Site`.

## 8. En cas de problème

| Symptôme | Cause probable |
|---|---|
| Page blanche / sections vides | Une virgule ou un guillemet manquant dans un fichier de `js/data/` : voir la console (F12) |
| Un projet n'apparaît pas | Mauvaise `categorie` : utilisez `?debug` |
| Une carte de compétence n'a pas de bouton de projet | Le nom de l'outil dans le projet n'est pas **identique** à celui de `competences.js` |
| Les polices sont différentes | Pas de connexion internet (Google Fonts) |
| L'écran de chargement gêne | `uneFoisParSession: true` ou `actif: false` dans `data/mascotte.js` |
| Changement invisible | Rechargez en forçant : Cmd/Ctrl + Maj + R |

*Mascotte : voir `docs/ATOM-persona.md`.*
