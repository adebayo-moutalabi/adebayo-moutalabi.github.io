/* =====================================================================
   PROFIL : identité, en-tête de la page d'accueil, navigation
   C'est le premier fichier à modifier pour changer le nom, l'intitulé ou la phrase d'accroche.
   Après modification : node scripts/generer.js
   ===================================================================== */

Site.data.profil = {
  prenom: "Adebayo",
  nomFamille: "Moutalabi",
  nomComplet: "Adebayo Habib Moutalabi",
  annee: 2026,
  ville: "Rennes, France",

  /* Intitulé : affiché à côté du nom, dans le titre de l'onglet et les données pour Google.
     Positionnement « marque personnelle » (décision du 12/11/2026) : ni « Ingénieur », ni « étudiant ». */
  metier: "Cloud, DevOps & IA",

  /* Phrase d'accroche. Variantes proposées (même ton) :
     « Je conçois, déploie et automatise des infrastructures cloud, des pipelines CI/CD et des agents IA. »
     « Des infrastructures fiables, des déploiements automatisés et des agents IA utiles : voilà ce que je construis. » */
  phrase: "Je construis et j'automatise des infrastructures, des pipelines et des agents IA.",
  surTitre: "Portfolio · Rennes",
  boutons: { realisations: "Voir mes réalisations", contact: "Me contacter" },

  /* Photo : petite et sobre dans l'en-tête (remplacez assets/photo.webp, carré, 640 px conseillé) */
  photo: "assets/photo.webp",
  photoAlt: "Portrait d'Adebayo Moutalabi",

  /* Liens publics (en-tête, contact, pied de page, données pour Google, llms.txt).
     L'adresse du site lui-même est la variable SITE_URL de scripts/generer.js. */
  github: "https://github.com/adebayo-moutalabi",
  linkedin: "https://www.linkedin.com/in/adebayo-moutalabi/",

  /* Menu de l'en-tête (dans l'ordre de la page). id = identifiant de la section ;
     inclut = autres sections qui allument le même lien quand elles sont à l'écran. */
  navigation: [
    { id: "realisations", nom: "Réalisations" },
    { id: "domaines", nom: "Ce que je fais", inclut: ["technologies"] },
    { id: "parcours", nom: "Parcours" },
    { id: "contact", nom: "Contact" }
  ],

  /* Détail visuel de l'en-tête : les étapes d'un déploiement, parcourues par une petite animation */
  pipeline: ["git push", "build", "tests", "déploiement", "en ligne"]
};
