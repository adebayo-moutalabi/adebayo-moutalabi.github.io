/* =====================================================================
   CONTACT : coordonnées, fiche de statut et messagerie
   ===================================================================== */

Site.data.contact = {
  etiquette: "Contact",
  titre: "Un projet, une mission ou une opportunité ?",
  accent: "Écrivez-moi.",
  accroche: "Ouvert aux missions ponctuelles et à une alternance M2 en 2027.",

  email: "moutalabihabib2002@gmail.com",
  linkedin: "https://www.linkedin.com/in/adebayo-moutalabi/",
  github: "https://github.com/adebayo-moutalabi",

  /* Fiche à droite. « statut » : texte affiché dans la tuile verte. */
  fiche: {
    statut: "Disponible",
    recherche: "Missions · alternance M2 2027",
    domaines: "Cloud · DevOps · Agents IA",
    lieu: "Rennes, mobile partout en France"
  },

  /* Boutons de la fenêtre de message. L'objet du mail est :
     « <besoin> en <domaine> : échangeons ». Le dernier domaine est affiché en bleu (IA). */
  besoins: ["Un projet", "Une mission", "Une alternance", "Autre"],
  domaines: ["Cloud", "DevOps", "Agents IA"],
  objetSuffixe: " : échangeons",
  salutation: "Bonjour Adebayo,",
  messageVide: "Je souhaiterais échanger avec vous.",
  placeholders: { nom: "Votre nom et votre structure", message: "Décrivez en deux lignes votre besoin…" }
};
