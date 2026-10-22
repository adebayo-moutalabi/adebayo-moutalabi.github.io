/* =====================================================================
   CONTACT : coordonnées, fiche de statut et messagerie
   ===================================================================== */

Site.data.contact = {
  etiquette: "Contact",
  titre: "Une tâche à automatiser ?",
  accent: "Parlons-en.",
  accroche: "Stage, alternance ou mission en DevOps, Cloud ou automatisation IA : parlons de votre besoin.",

  email: "moutalabihabib2002@gmail.com",
  linkedin: "https://www.linkedin.com/in/adebayo-moutalabi/",

  /* Fiche à droite. « statut » : texte affiché dans la tuile verte. */
  fiche: {
    statut: "Disponible",
    recherche: "Stage, alternance ou mission",
    domaines: "DevOps · Cloud · Automatisation IA",
    lieu: "Rennes, mobile partout en France"
  },

  /* Boutons de la fenêtre de message. L'objet du mail est :
     « <besoin> en <domaine> : échangeons ». Le dernier domaine est affiché en bleu (IA). */
  besoins: ["Un stage", "Une alternance", "Une mission", "Autre"],
  domaines: ["DevOps", "Cloud", "Automatisation IA"],
  objetSuffixe: " : échangeons",
  salutation: "Bonjour Adebayo,",
  messageVide: "Je souhaiterais échanger avec vous.",
  placeholders: { nom: "Votre nom et votre structure", message: "Décrivez en deux lignes votre besoin…" }
};
