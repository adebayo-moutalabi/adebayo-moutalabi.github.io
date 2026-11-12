/* =====================================================================
   CONTACT : coordonnées, fiche de statut et messagerie
   ===================================================================== */

Site.data.contact = {
  etiquette: "Contact",
  titre: "Une alternance, une mission ?",
  accent: "Parlons-en.",
  accroche: "Alternance de M2 à partir de septembre 2027, ou mission en Cloud, DevOps et agents IA : parlons de votre besoin.",

  email: "moutalabihabib2002@gmail.com",
  linkedin: "https://www.linkedin.com/in/adebayo-moutalabi/",
  github: "https://github.com/adebayo-moutalabi",

  /* Fiche à droite. « statut » : texte affiché dans la tuile verte. */
  fiche: {
    statut: "Disponible",
    recherche: "Alternance M2 · septembre 2027",
    domaines: "Cloud · DevOps · Agents IA",
    lieu: "Rennes, mobile partout en France"
  },

  /* Boutons de la fenêtre de message. L'objet du mail est :
     « <besoin> en <domaine> : échangeons ». Le dernier domaine est affiché en bleu (IA). */
  besoins: ["Une alternance", "Une mission", "Autre"],
  domaines: ["Cloud", "DevOps", "Agents IA"],
  objetSuffixe: " : échangeons",
  salutation: "Bonjour Adebayo,",
  messageVide: "Je souhaiterais échanger avec vous.",
  placeholders: { nom: "Votre nom et votre structure", message: "Décrivez en deux lignes votre besoin…" }
};
