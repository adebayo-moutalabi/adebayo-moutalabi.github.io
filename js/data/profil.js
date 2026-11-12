/* =====================================================================
   PROFIL : identité, accroche de l'ouverture, navigation
   C'est le premier fichier à modifier pour changer le nom, la photo ou l'accroche.
   Pour le titre de l'onglet du navigateur, voir la balise <title> de index.html.
   ===================================================================== */

Site.data.profil = {
  prenom: "Adebayo",
  nomFamille: "Moutalabi",
  nomComplet: "Adebayo Habib Moutalabi",
  /* Intitulé : affiché dans le titre principal (h1), le titre de l'onglet et les données pour Google.
     Marque personnelle : ni « Ingénieur », ni « étudiant », ni étiquette « candidat » / « indépendant ». */
  metier: "Cloud, DevOps & IA",
  /* Liens publics (repris dans le contact, les données pour Google et llms.txt).
     L'adresse du site lui-même est la variable SITE_URL de scripts/generer.js. */
  github: "https://github.com/adebayo-moutalabi",
  linkedin: "https://www.linkedin.com/in/adebayo-moutalabi/",
  annee: 2026,
  ville: "Rennes, France",

  /* Photo : remplacez le fichier assets/photo.webp (carré, 640 px conseillé) */
  photo: "assets/photo.webp",
  photoAlt: "Portrait d'Adebayo Habib Moutalabi",

  /* Ouverture (l'écran avec la photo qui s'agrandit au défilement) */
  accroche: {
    sur: "Cloud, DevOps & IA",
    titre: "Je construis, j'automatise,",
    accent: "je livre.",
    texte: "Des infrastructures qui tiennent, des déploiements qui partent seuls et des agents IA qui font gagner du temps, du besoin de départ à la mise en ligne.",
    pied: "Cloud, DevOps & IA · Rennes",
    defiler: "Faites défiler"
  },

  /* Sections affichées sur la barre de progression (dans l'ordre de la page) */
  navigation: [
    { id: "intro", nom: "Accueil" },
    { id: "domaines", nom: "Ce que je fais" },
    { id: "labo", nom: "Labo" },
    { id: "competences", nom: "Compétences" },
    { id: "methode", nom: "Méthode" },
    { id: "projets", nom: "Réalisations" },
    { id: "parcours", nom: "Parcours" },
    { id: "contact", nom: "Contact" }
  ]
};
