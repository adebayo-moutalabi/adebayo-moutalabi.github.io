/* =====================================================================
   « PAR OÙ COMMENCER ? » : choix du profil de visite
   Trois cartes. Le choix du visiteur fait défiler vers « cible » et adapte le titre du contact.
   cible = identifiant d'une section : #parcours, #projets, #labo, #competences, #contact …
   ===================================================================== */

Site.data.visiteurs = {
  entete: { etiquette: "Par où commencer ?", titre: "Dites-moi qui vous êtes,", accent: "je vous guide.", texte: "Choisissez un profil : la page vous emmène directement vers ce qui vous intéresse." },
  profils: [
    {
      id: "rec",
      etiquette: "Recruteur",
      titre: "Je recrute",
      texte: "Parcours, formations et compétences, l'essentiel pour évaluer un profil.",
      message: "Parfait. Direction le parcours : expériences, formations et distinctions.",
      cible: "#parcours",
      contactTitre: "Un poste en Cloud & DevOps ?",
      contactAccent: "Échangeons."
    },
    {
      id: "pro",
      etiquette: "Client",
      titre: "J'ai un projet",
      texte: "Pipelines, agents IA, sites : ce que je peux construire pour vous.",
      message: "Très bien. Voici les projets, filtrés sur ce que je peux livrer.",
      cible: "#projets",
      contactTitre: "Une tâche à automatiser ?",
      contactAccent: "Parlons-en."
    },
    {
      id: "dev",
      etiquette: "Curieux",
      titre: "Je découvre",
      texte: "Le labo : manipulez des démos Kubernetes, CI/CD et agent IA.",
      message: "Bienvenue dans le labo. Manipulez les démos à votre rythme.",
      cible: "#labo",
      contactTitre: "Envie d'aller plus loin ?",
      contactAccent: "Discutons tech."
    }
  ]
};
