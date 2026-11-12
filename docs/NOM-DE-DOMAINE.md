# Passer à un nom de domaine personnel

Objectif : servir le portfolio sur un domaine à toi (exemple utilisé ici : `exemple.fr`, à remplacer partout),
avec `https://exemple.fr/` comme adresse principale, `www.exemple.fr` qui y renvoie, et l'ancienne adresse
`adebayo-moutalabi.github.io` qui redirige automatiquement.

Durée : 1 h de manipulations, puis jusqu'à 24 h d'attente (propagation DNS et certificat HTTPS).
Ordre conseillé : 1 → 2 → 3 (GitHub) → 4 (code) → 5 (liens) → 6 (Search Console).

---

## 1. Acheter le domaine

- Registrars courants : OVHcloud, Gandi, Cloudflare Registrar, Porkbun, Namecheap.
- Choisis un nom court et pérenne (ton nom : `adebayo-moutalabi.fr`, `moutalabi.dev`…).
  `.fr` demande une adresse dans l'Union européenne ; `.dev` impose HTTPS (aucun souci avec GitHub Pages).
- Active le **renouvellement automatique** : un domaine expiré peut être racheté par quelqu'un d'autre,
  qui récupérerait les liens de ton CV et de LinkedIn.
- Active le **verrouillage du domaine** (« transfer lock ») et l'authentification à deux facteurs sur le registrar.

## 2. Réglages DNS chez le registrar

Dans la zone DNS du domaine, **supprime** d'abord les enregistrements A/AAAA/CNAME « par défaut » du registrar
(page de parking), puis crée :

| Type | Nom (hôte) | Valeur | Rôle |
|---|---|---|---|
| A | `@` (apex) | `185.199.108.153` | Serveurs GitHub Pages (IPv4) |
| A | `@` | `185.199.109.153` | |
| A | `@` | `185.199.110.153` | |
| A | `@` | `185.199.111.153` | |
| AAAA | `@` | `2606:50c0:8000::153` | Serveurs GitHub Pages (IPv6) |
| AAAA | `@` | `2606:50c0:8001::153` | |
| AAAA | `@` | `2606:50c0:8002::153` | |
| AAAA | `@` | `2606:50c0:8003::153` | |
| CNAME | `www` | `adebayo-moutalabi.github.io.` | `www.exemple.fr` → GitHub, qui redirige vers l'apex |

Vérifie ces adresses sur la documentation officielle avant de les saisir : docs.github.com → GitHub Pages →
« Managing a custom domain for your GitHub Pages site ».

**Vérifier le domaine sur GitHub (recommandé, contre la prise de contrôle du domaine)** :
github.com → ta photo → **Settings** → **Pages** → **Add a domain** → GitHub donne un enregistrement **TXT**
(`_github-pages-challenge-adebayo-moutalabi.exemple.fr`) à ajouter dans la zone DNS → **Verify**.

Contrôle depuis un terminal (la propagation prend de quelques minutes à quelques heures) :

```bash
dig exemple.fr +short
```

```bash
dig www.exemple.fr +short
```

## 3. GitHub Pages : domaine personnalisé et HTTPS

Dépôt `adebayo-moutalabi.github.io` → **Settings** → **Pages** :

1. Vérifie que **Source = GitHub Actions** (voir NOTES-PORTFOLIO.md : à corriger de toute façon).
2. **Custom domain** : saisis `exemple.fr` → **Save**. GitHub vérifie le DNS (« DNS check successful »).
   Avec un déploiement par GitHub Actions, aucun fichier `CNAME` n'est nécessaire dans le dépôt.
3. Attends que le certificat soit émis (jusqu'à 24 h), puis coche **Enforce HTTPS**.
4. **Redirection automatique** : une fois le domaine enregistré, GitHub redirige `adebayo-moutalabi.github.io/…`
   vers `exemple.fr/…` (redirection 301, chemin conservé), et `www.exemple.fr` vers `exemple.fr`.
   Vérification :

```bash
curl -sI https://adebayo-moutalabi.github.io/projets/nox/ | grep -i "^location"
```

Le résultat attendu est `location: https://exemple.fr/projets/nox/`.

## 4. Mettre à jour le site (par git, une pull request)

L'adresse du site est **une seule variable** : `SITE_URL` en haut de `scripts/generer.js`.

1. Remplace `const SITE_URL = 'https://adebayo-moutalabi.github.io/';` par `const SITE_URL = 'https://exemple.fr/';`
   (toujours avec le `/` final).
2. Lance `node scripts/generer.js`. Sont alors régénérés automatiquement :
   - l'**URL canonique** et les balises **Open Graph** (`og:url`, `og:image`) de l'accueil et des pages de projet ;
   - le **JSON-LD** (personne, logo, réalisations, fil d'Ariane) ;
   - `sitemap.xml`, `robots.txt` (ligne `Sitemap:`), `llms.txt`.
   `scripts/verifier.js` lit l'adresse dans la balise canonique : rien à changer dedans.
3. À modifier à la main (une seule ligne chacun) :
   - `lychee.toml` : la ligne `exclude` ignore les liens vers le site lui-même → remplace
     `^https://adebayo-moutalabi\\.github\\.io` par `^https://exemple\\.fr`.
   - `outils/image-partage.html` : le texte `adebayo-moutalabi.github.io` en bas de l'image, puis
     `node outils/generer-image-partage.js`.
   - `README.md` et `docs/*.md` : les mentions de l'ancienne adresse (cherche « github.io »).
4. Vérifie en local (`node scripts/verifier.js`, `node scripts/generer.js --verifier`), ouvre la pull request,
   attends les 4 contrôles verts, fusionne.
5. Contrôle en ligne : `https://exemple.fr/`, `/projets/nox/`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`,
   `/google2f457726f419ac07.html` (le fichier de vérification Google reste à la racine, ne pas le supprimer).

## 5. Liens à changer ailleurs (à la main)

| Où | Quoi |
|---|---|
| GitHub, profil (**Edit profile**) | Champ **Website** → `https://exemple.fr` |
| GitHub, dépôt du portfolio (roue ⚙️ de **About**) | **Website** → `https://exemple.fr` |
| GitHub, README de profil (`adebayo-moutalabi/adebayo-moutalabi`) | Liens « Mon portfolio » et « Me contacter » |
| Dépôt `nox` et site get-nox.github.io | Liens vers le portfolio (README, pied de page, docs/SUBMISSION.md) |
| LinkedIn | **Coordonnées** → **Site web** (type « Portfolio »), section **Sélection**, liens dans tes posts épinglés |
| CV (PDF), signature e-mail, profils de candidature | Adresse du portfolio |

L'ancienne adresse continuant de rediriger, rien ne casse si un lien est oublié, mais chaque lien direct évite
un détour et renforce le lien entre ton nom et le nouveau domaine.

## 6. Google Search Console

1. **Nouvelle propriété « Domaine »** : Search Console → **Ajouter une propriété** → **Domaine** → `exemple.fr`.
   Google donne un enregistrement **TXT** (`google-site-verification=…`) à ajouter à l'apex (`@`) chez le
   registrar → **Valider**. Cette propriété couvre `https://`, `http://`, `www` et tous les sous-domaines.
2. **Sitemaps** (dans la nouvelle propriété) → `https://exemple.fr/sitemap.xml` → **Envoyer**.
3. **Inspection de l'URL** → `https://exemple.fr/` puis `/projets/nox/` et `/projets/continental-it/` →
   **Demander l'indexation**.
4. **Outil de changement d'adresse** : il s'utilise depuis l'**ancienne** propriété
   (`https://adebayo-moutalabi.github.io/`, déjà validée par le fichier HTML) → **Paramètres** →
   **Changement d'adresse** → choisis la nouvelle propriété. Conditions : la redirection 301 de l'étape 3 doit
   fonctionner et l'ancienne propriété doit être la racine du site (c'est le cas). Si l'outil refuse, les
   redirections 301 suffisent : Google transfère le classement en quelques semaines.
5. Garde l'ancienne propriété quelques mois pour suivre la bascule (rapport **Pages** : les anciennes URL
   passent en « Page avec redirection », c'est normal).
6. **Bing Webmaster Tools** : ajoute le nouveau domaine (ou réimporte depuis Search Console) et renvoie le sitemap.
7. LinkedIn **Post Inspector** sur `https://exemple.fr/` pour rafraîchir l'aperçu de partage.

## Récapitulatif

| Étape | Où | Par git ? |
|---|---|---|
| Achat, DNS (A, AAAA, CNAME www, TXT GitHub et Google) | Registrar | Non |
| Custom domain, Enforce HTTPS, vérification du domaine | GitHub → Settings → Pages | Non |
| `SITE_URL`, `lychee.toml`, image de partage, docs | Ce dépôt | Oui (pull request) |
| GitHub profil et About, LinkedIn, CV, dépôt nox | Chaque service | Non (sauf dépôts) |
| Propriété Domaine, sitemap, changement d'adresse | Search Console | Non |
