/* =====================================================================
   PROFIL : identité, accroche de l'ouverture, navigation
   C'est le premier fichier à modifier pour changer le nom, la photo ou l'accroche.
   Pour le titre de l'onglet du navigateur, voir la balise <title> de index.html.
   ===================================================================== */

Site.data.profil = {
  prenom: "Adebayo",
  nomFamille: "Moutalabi",
  nomComplet: "Adebayo Habib Moutalabi",
  /* Métier : affiché dans le titre principal (h1), le titre de l'onglet et les données pour Google */
  metier: "Ingénieur Cloud, DevOps & IA",
  /* Liens publics (repris dans le contact, le pied de page, les données pour Google et llms.txt) */
  site: "https://adebayo-moutalabi.github.io/",
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
    titre: "Fini les déploiements manuels.",
    accent: "Place à vos pipelines et à vos agents IA.",
    texte: "Je construis des infrastructures fiables, puis j'automatise ce qui fait perdre du temps aux équipes.",
    pied: "Ingénieur Cloud, DevOps & IA · Rennes",
    defiler: "Faites défiler"
  },

  /* Sections affichées sur la barre de progression (dans l'ordre de la page).
     « bulle » = phrase dite par la mascotte quand elle y arrive (facultatif). */
  navigation: [
    { id: "intro", nom: "Accueil" },
    { id: "labo", nom: "Labo", bulle: "Le labo !" },
    { id: "competences", nom: "Compétences", bulle: "Ma stack" },
    { id: "methode", nom: "Méthode", bulle: "La méthode" },
    { id: "projets", nom: "Projets", bulle: "Les projets" },
    { id: "parcours", nom: "Parcours", bulle: "Le parcours" },
    { id: "contact", nom: "Contact", bulle: "Parlons-en !" }
  ]
};
