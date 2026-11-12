/* =====================================================================
   « PAR OÙ COMMENCER ? » : choix du profil de visite
   Trois cartes. Le choix du visiteur fait défiler vers « cible » et adapte le titre du contact.
   cible = identifiant d'une section : #parcours, #projets, #labo, #competences, #contact …
   ===================================================================== */

Site.data.visiteurs = {
  entete: { etiquette: "Par où commencer ?", titre: "Chacun vient pour sa raison.", accent: "Choisissez la vôtre.", texte: "La page vous emmène directement à ce qui vous intéresse." },
  profils: [
    {
      id: "rec",
      etiquette: "Recrutement",
      titre: "Je recrute",
      texte: "Parcours, formations et compétences : l'essentiel pour évaluer un profil.",
      message: "Parfait. Direction le parcours : expériences, formations et distinctions.",
      cible: "#parcours",
      contactTitre: "Un poste, une alternance ?",
      contactAccent: "Écrivez-moi."
    },
    {
      id: "pro",
      etiquette: "Projet",
      titre: "J'ai un besoin",
      texte: "Infrastructure, site web, agent IA : ce que je construis, et comment.",
      message: "Très bien. Voici ce que je fais, du besoin de départ à la mise en ligne.",
      cible: "#domaines",
      contactTitre: "Un projet, une mission ?",
      contactAccent: "Parlons-en."
    },
    {
      id: "dev",
      etiquette: "Curieux",
      titre: "Je découvre",
      texte: "Le labo : manipulez des démos Kubernetes, CI/CD et agent IA.",
      message: "Bienvenue dans le labo. Manipulez les démos à votre rythme.",
      cible: "#labo",
      contactTitre: "Envie d'échanger ?",
      contactAccent: "Écrivez-moi."
    }
  ]
};
