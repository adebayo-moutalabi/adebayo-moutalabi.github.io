/* =====================================================================
   PROFIL : identité, accroche de l'ouverture, navigation
   C'est le premier fichier à modifier pour changer le nom, la photo ou l'accroche.
   Pour le titre de l'onglet du navigateur, voir la balise <title> de index.html.
   ===================================================================== */

Site.data.profil = {
  prenom: "Adebayo",
  nomFamille: "Moutalabi",
  nomComplet: "Adebayo Habib Moutalabi",
  annee: 2026,
  ville: "Rennes, France",

  /* Photo : remplacez le fichier assets/photo.webp (carré, 640 px conseillé) */
  photo: "assets/photo.webp",
  photoAlt: "Portrait d'Adebayo Habib Moutalabi",

  /* Ouverture (l'écran avec la photo qui s'agrandit au défilement) */
  accroche: {
    sur: "Cloud & DevOps · Agents IA & automatisation",
    titre: "Fini les déploiements manuels.",
    accent: "Place à vos pipelines et à vos agents IA.",
    texte: "Je construis des infrastructures fiables, puis j'automatise ce qui fait perdre du temps aux équipes.",
    pied: "Cloud & DevOps · Agents IA · basé à Rennes",
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
