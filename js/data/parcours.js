/* =====================================================================
   PARCOURS : expériences, formations, langues, distinctions
   « liste » = l'historique façon Git, du plus récent (en haut) au plus ancien (en bas).
   Pour AJOUTER une expérience ou une formation : copiez un bloc { ... } et placez-le à la bonne
   position chronologique (les plus récentes en premier).
   
   branche   "experience" (stage, emploi…) ou "formation" (diplôme, cursus)
   fusion    true = commit « merge » (une étape où formation et expérience se rejoignent) — facultatif
   premier   true = « initial commit » (à mettre sur la toute dernière ligne) — facultatif
   date, titre, lieu, type, resume, points   textes affichés dans le détail du commit
   
   LANGUES et DISTINCTIONS : ajoutez ou retirez des lignes dans les listes en bas de ce fichier.
   ===================================================================== */

Site.data.parcours = {
  entete: { etiquette: "Parcours", titre: "Mon historique,", accent: "commit par commit.", texte: "Expériences et formations, versionnées comme un dépôt Git. Choisissez une branche, puis ouvrez un commit pour voir ce qu'il a apporté." },
  auteur: "Adebayo Moutalabi",
  branches: [
    { id: "all", libelle: "Tout" },
    { id: "experience", libelle: "Expériences" },
    { id: "formation", libelle: "Formations" }
  ],
  liste: [
    {
      branche: "experience",
      fusion: true,
      date: "oct. 2025 – mai 2026",
      titre: "Développeur full-stack & appui à la coordination",
      lieu: "ExpoIA / TIARe · Rennes",
      type: "Projet de master",
      resume: "Projet France 2030 / ANR pour le Musée des Transmissions, confié dans le cadre du master : la formation et l'expérience se rejoignent.",
      points: [
        "Lien entre porteurs de projet et équipe de développement",
        "Contributions Next.js 16, Payload CMS 3 et PostgreSQL",
        "Accessibilité WCAG, e-mails transactionnels, contenus bilingues",
        "Conception et développement du jeu Floriale"
      ]
    },
    {
      branche: "formation",
      date: "2025 – aujourd'hui",
      titre: "Master 1 Cloud & Réseaux",
      lieu: "ISTIC · Université de Rennes",
      type: "Master",
      resume: "Formation spécialisée en infrastructures cloud, réseaux et systèmes distribués.",
      points: [
        "Programmation parallèle : PRAM, OpenMP, CUDA",
        "Systèmes distribués : services gRPC multi-langages",
        "Projet d'école ExpoIA, financé par France 2030 / ANR"
      ]
    },
    {
      branche: "experience",
      date: "mai – juin 2025",
      titre: "Stage à distance",
      lieu: "RHS Conseil-Formation · Lyon",
      type: "Stage",
      resume: "Mission menée à distance pour un cabinet de conseil et de formation.",
      points: ["Refonte de la proposition de site web du cabinet"]
    },
    {
      branche: "formation",
      date: "2024 – 2025",
      titre: "Licence 3 Informatique",
      lieu: "ISTIC · Université de Rennes",
      type: "Licence",
      resume: "L'année où j'ai choisi de construire mon parcours vers le Cloud et le DevOps.",
      points: ["Orientation Cloud & DevOps", "Admission en master Cloud & Réseaux"]
    },
    {
      branche: "experience",
      date: "déc. 2023 – juin 2025",
      titre: "Développeur web",
      lieu: "ICT-Consulting",
      type: "CDD",
      resume: "Conception, déploiement et maintenance de sites et d'applications web pour des clients.",
      points: ["Sites vitrines et applications web", "Déploiement et maintenance en production"]
    },
    {
      branche: "experience",
      date: "mai – sept. 2023",
      titre: "Administration réseaux & systèmes",
      lieu: "SPTIC · Université d'Abomey-Calavi",
      type: "Stage",
      resume: "Stage au service des technologies de l'information et de la communication de l'université.",
      points: ["Administration de l'infrastructure réseau", "Exploitation et maintenance des serveurs"]
    },
    {
      branche: "experience",
      date: "juil. – août 2022",
      titre: "Développement web & mobile",
      lieu: "PayPlus Africa · Cotonou",
      type: "Stage",
      resume: "Premier stage en entreprise, entre web, mobile et formation.",
      points: [
        "Plateforme StageBenin en Laravel / PHP",
        "Déploiement complet d'une application WordPress",
        "Apps Flutter : quiz de révision, calculatrice, jeux",
        "Formation d'un collaborateur à WordPress, cahiers des charges"
      ]
    },
    {
      branche: "formation",
      premier: true,
      date: "2020 – 2023",
      titre: "Licence Informatique de gestion",
      lieu: "ENEAM · Université d'Abomey-Calavi",
      type: "Licence",
      resume: "Formation en informatique appliquée à la gestion des organisations. Le premier commit.",
      points: ["Mémoire : architecture réseau sécurisée", "Algèbre linéaire, probabilités et statistiques"]
    }
  ],

  /* Langues : une ligne = une langue (la mise en page s'adapte toute seule) */
  langues: [
    { nom: "Français", niveau: "courant" },
    { nom: "Anglais", niveau: "B1, lecture technique quotidienne" }
  ],

  /* Distinctions, programmes, certifications : une ligne = une carte.
     sceau = texte qui tourne autour du médaillon (court). */
  distinctions: [
    { annee: "2023", type: "Programme · Huawei", titre: "Huawei Seeds for the Future", texte: "Participant au programme. Notre projet d'équipe TODJUMI, une plateforme de suivi des patients pour les médecins béninois, a été sélectionné.", sceau: "Seeds for the Future" },
    { annee: "2026", type: "Statut · Pépite Bretagne", titre: "Statut étudiant-entrepreneur", texte: "Obtenu via Pépite Bretagne pour le projet VirtuStage.", sceau: "Étudiant-entrepreneur" }
  ]
};
