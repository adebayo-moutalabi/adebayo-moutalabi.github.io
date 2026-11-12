/* =====================================================================
   PROJETS (section « Projets » + fiches détaillées)
   Pour AJOUTER un projet : copiez un bloc { ... } ci-dessous, collez-le à la suite
   (n'oubliez pas la virgule entre deux blocs) et changez les textes.
   
   id          identifiant unique, sans espace ni accent (ex. "monprojet")
   categorie   "cloud", "ia" ou "web" (voir la liste « categories » plus bas)
   couleur     teinte de la carte sur l'accueil (projets « à la une »), ex. "#5b8def"
   une         true = projet « à la une » sur l'accueil (grande ligne avec capture). Les autres
               apparaissent en petit sous la sélection. Tous figurent sur la page projets/.
   vignette    nom du dessin dans js/data/vignettes.js (expo, k8s, aws, net, bot, flow, web, shield, elo)
   type        petit texte au-dessus du titre
   nomCourt    nom court (boutons dans la section Compétences)
   resume      phrase affichée sur la carte
   intro       paragraphe en haut de la fiche
   probleme    le besoin de départ (une ou deux phrases factuelles)
   points      ce que j'ai fait (liste à puces de la fiche)
   resultat    ce qui existe à la fin, vérifiable (lien, mise en ligne…)
   techno      pastilles de technologies affichées dans la fiche
   outils      noms EXACTS des outils de js/data/competences.js : ils relient la fiche aux cartes de la stack
   liens       boutons (facultatif) : { url: "https://…", texte: "Voir le site" }
   page        (facultatif) chemin d'une page dédiée, ex. "projets/nox/" : générée par scripts/generer.js,
               ajoutée au sitemap, à llms.txt et aux données Google. Avec page, renseignez aussi :
   image, imageAlt, partage   capture affichée sur la page, son texte alternatif, image de partage 1200 × 630
   imageTaille [largeur, hauteur] de la capture (évite que la page « saute » au chargement)
   description phrase courte (balise meta description de la page)
   logiciel    (facultatif) données Google « SoftwareApplication » : { version, systeme, telechargement, site, code }
   Pour SUPPRIMER un projet : effacez son bloc { ... } en entier.
   ===================================================================== */

Site.data.projets = {
  entete: { etiquette: "Réalisations", titre: "Des projets en ligne,", accent: "du besoin au résultat.", texte: "Chaque fiche raconte un projet : le problème de départ, ce que j'ai construit, et ce qui tourne aujourd'hui." },
  /* Page « Tous les projets » (projets/index.html, générée par scripts/generer.js) */
  catalogue: {
    titre: "Tous les projets",
    texte: "Les réalisations en ligne, des agents IA aux pipelines de déploiement. Un projet n'entre ici qu'une fois publié et vérifiable.",
    description: "Tous les projets d'Adebayo Moutalabi : agents IA, sites web, pipelines CI/CD. Chaque fiche renvoie au résultat en ligne."
  },
  /* catégories : filtres de la page « Tous les projets » */
  categories: [
    { id: "all", libelle: "Tous" },
    { id: "cloud", libelle: "Cloud & DevOps" },
    { id: "ia", libelle: "IA & automatisation" },
    { id: "web", libelle: "Web" }
  ],
  liste: [
    {
      id: "nox",
      une: true,
      couleur: "#5b8def",
      categorie: "ia",
      vignette: "bot",
      type: "Agent IA vocal · OpenAI DevDay Hackathon Paris",
      titre: "Nox, le compagnon de bureau qui aide à démarrer",
      nomCourt: "Nox",
      resume: "Un agent IA vocal pour Windows qui aide les personnes TDAH à passer à l'action : il parle en premier, découpe la tâche en micro-étapes de 2 à 10 minutes et lance le minuteur.",
      description: "Nox, application Windows d'Adebayo Moutalabi : un agent IA vocal (API Realtime d'OpenAI) qui aide les personnes TDAH à démarrer une tâche par micro-étapes.",
      intro: "Application de bureau pour Windows, réalisée pour l'OpenAI DevDay Community Hackathon Paris (piste Impact / inclusion). Pensée d'abord pour les personnes TDAH, utile à toute personne qui a du mal à démarrer.",
      probleme: "Pour beaucoup de personnes TDAH, le plus difficile n'est pas le travail lui-même : c'est démarrer, rester sur la tâche après une notification, et reprendre après une interruption. Les outils de productivité (listes, agendas, minuteurs) attendent qu'on les ouvre : ils aident surtout les personnes déjà organisées.",
      points: [
        "Application Electron pour Windows : une mascotte animée qui vit sur le bureau et parle en premier, avec un onboarding parlé de 5 questions en moins d'une minute",
        "Découpage d'une tâche en micro-étapes de 2 à 10 minutes, une seule affichée à la fois, avec un minuteur visible et 7 méthodes (Pomodoro, règle des 5 minutes, body doubling…)",
        "Voix temps réel avec l'API Realtime d'OpenAI en WebRTC : le processus principal crée un jeton éphémère, la clé n'est jamais exposée à l'interface ; les actions (minuteur, étape, ouverture d'une appli) passent par l'appel de fonctions",
        "Conversation et repli sans voix temps réel avec gpt-4o-mini",
        "Mémoire locale (profil, souvenirs, historique), secrets chiffrés sur le PC, surveillance de la fenêtre active uniquement avec l'accord de la personne",
        "Tableau de bord : étape en cours, étapes cochées, minutes de concentration sur 7 jours, historique",
        "Intégrations Google Agenda (iCal), Gmail (IMAP) et Telegram (bot relié par QR code)",
        "Tests de bout en bout automatisés qui jouent tout le parcours dans la vraie application, et installeur Windows en un clic"
      ],
      resultat: "Nox est téléchargeable gratuitement pour Windows 10 et 11 (installeur dans les Releases GitHub, version 1.4.0), en français et en anglais, avec un mode démo qui fonctionne sans clé OpenAI. Le code, le site de présentation et une vidéo de démonstration de 2 minutes sont publics.",
      techno: ["Electron", "JavaScript", "OpenAI Realtime API", "WebRTC", "gpt-4o-mini", "Function calling", "IMAP", "iCal", "Telegram Bot API"],
      outils: ["API LLM", "Electron", "Git"],
      page: "projets/nox/",
      image: "assets/projets/nox-tableau-de-bord.webp",
      imageAlt: "Tableau de bord de Nox : étape en cours, minutes de concentration sur 7 jours et tâches terminées",
      partage: "assets/projets/nox-partage.png",
      imageTaille: [1200, 678],
      logiciel: {
        version: "1.4.0",
        systeme: "Windows 10, Windows 11",
        telechargement: "https://github.com/adebayo-moutalabi/nox/releases/latest",
        site: "https://get-nox.github.io/",
        code: "https://github.com/adebayo-moutalabi/nox"
      },
      liens: [
        { url: "https://get-nox.github.io/", texte: "Voir le site" },
        { url: "https://get-nox.github.io/#video", texte: "Regarder la vidéo (2 min)" },
        { url: "https://github.com/adebayo-moutalabi/nox/releases/latest", texte: "Télécharger pour Windows" },
        { url: "https://github.com/adebayo-moutalabi/nox", texte: "Voir le code" }
      ]
    },
    {
      id: "continental-it",
      une: true,
      couleur: "#e07a3f",
      categorie: "web",
      vignette: "shield",
      type: "Site vitrine · Cybersécurité · Bénin",
      titre: "Continental IT, le site d'un cabinet de cybersécurité à Cotonou",
      nomCourt: "Continental IT",
      resume: "Le site d'un cabinet de cybersécurité à Cotonou : six pôles d'expertise, masterclasses et demande d'audit, en ligne sur continentalit.org.",
      description: "Site vitrine de Continental IT, cabinet de conseil en cybersécurité à Cotonou (Bénin), réalisé par Adebayo Moutalabi sous WordPress et Elementor.",
      intro: "Continental IT est un cabinet basé à Cotonou (Bénin) qui accompagne les organisations publiques et privées d'Afrique de l'Ouest en gouvernance des systèmes d'information, gestion des risques et cybersécurité (ISO/IEC 27001, EBIOS RM, formations certifiantes PECB).",
      probleme: "Le cabinet devait présenter en ligne ses six pôles d'expertise, ses certifications et ses masterclasses en cybersécurité, et permettre aux visiteurs de le contacter ou de demander un audit gratuit.",
      points: [
        "Création et enrichissement du site vitrine sous WordPress et Elementor",
        "Animations d'en-tête et effets au survol",
        "Pages de services et système de boutons",
        "Contenus des masterclasses et corrections éditoriales"
      ],
      resultat: "Le site est officiellement en ligne sur continentalit.org : accueil, services, à propos, équipe, masterclasses, contact et demande d'audit gratuit.",
      techno: ["WordPress", "Elementor"],
      outils: ["WordPress"],
      page: "projets/continental-it/",
      image: "assets/projets/continental-it-accueil.webp",
      imageAlt: "Page d'accueil de continentalit.org : « Sécurisez votre souveraineté numérique »",
      partage: "assets/projets/continental-it-partage.png",
      imageTaille: [1200, 750],
      liens: [
        { url: "https://continentalit.org/", texte: "Voir le site" }
      ]
    },
    {
      id: "expoia",
      une: true,
      couleur: "#e8b65f",
      categorie: "web",
      vignette: "expo",
      type: "Web · France 2030 / ANR",
      titre: "ExpoIA, l'exposition sur l'IA du Musée des Transmissions",
      nomCourt: "ExpoIA",
      resume: "Le site bilingue et accessible de l'exposition sur l'IA du Musée des Transmissions, à Rennes, et son jeu Floriale.",
      intro: "Projet confié dans le cadre du master Cloud & Réseaux de l'ISTIC (Université de Rennes), d'octobre 2025 à mai 2026, au sein du projet TIARe financé par France 2030 et l'ANR.",
      probleme: "Le Musée des Transmissions avait besoin d'un site public pour son exposition sur l'intelligence artificielle : bilingue, accessible, et dont l'équipe du musée peut modifier le contenu sans développeur.",
      points: [
        "Coordination technique entre les porteurs du projet et l'équipe de développement TIARe",
        "Développement sur Next.js 16, Payload CMS 3 et PostgreSQL",
        "Accessibilité (WCAG) et e-mails transactionnels avec React Email",
        "Contenus bilingues gérés dans le CMS",
        "Conception et développement du jeu Floriale"
      ],
      resultat: "Le site est en ligne sur expo-ia.univ-rennes.fr et le jeu Floriale y est jouable.",
      techno: ["Next.js 16", "Payload CMS 3", "PostgreSQL", "TypeScript", "Tailwind", "Framer Motion"],
      description: "ExpoIA, site bilingue et accessible de l'exposition sur l'IA du Musée des Transmissions (Rennes), développé par Adebayo Moutalabi avec Next.js et Payload CMS.",
      outils: ["Next.js", "Payload CMS", "TypeScript", "Git"],
      page: "projets/expoia/",
      image: "assets/projets/expoia-accueil.webp",
      imageAlt: "Page d'accueil du site de l'exposition ExpoIA : « Qu'est-ce qu'IA ? »",
      partage: "assets/projets/expoia-partage.png",
      imageTaille: [1200, 750],
      liens: [
        { url: "https://expo-ia.univ-rennes.fr/fr", texte: "Voir le site" },
        { url: "https://expo-ia.univ-rennes.fr/fr/jeu/floriale", texte: "Jouer à Floriale" }
      ]
    },
    {
      id: "floriale",
      categorie: "web",
      vignette: "expo",
      couleur: "#e8b65f",
      type: "Jeu web · ExpoIA",
      titre: "Floriale, le jeu de l'exposition ExpoIA",
      nomCourt: "Floriale",
      resume: "Le jeu de l'exposition ExpoIA, conçu et développé pour le Musée des Transmissions.",
      intro: "Floriale (« Apprends comme une IA ! ») met le visiteur à la place d'une IA : observer des fleurs étiquetées, en déduire une règle de classification, puis la tester sur de nouvelles fleurs.",
      points: [
        "Conception et développement du jeu",
        "Un parcours en six étapes : intro, entraînement, règle, test, récapitulatif, fin",
        "Intégration au site bilingue de l'exposition (Next.js, TypeScript)"
      ],
      image: "assets/projets/floriale-accueil.webp",
      imageAlt: "Écran d'accueil du jeu Floriale : « Apprends comme une IA ! »",
      imageTaille: [1200, 750],
      resultat: "Le jeu est jouable en ligne sur le site d'ExpoIA.",
      techno: ["Next.js", "TypeScript"],
      outils: ["Next.js", "TypeScript"],
      liens: [
        { url: "https://expo-ia.univ-rennes.fr/fr/jeu/floriale", texte: "Jouer à Floriale" }
      ]
    },
    {
      id: "portfolio",
      categorie: "cloud",
      vignette: "flow",
      type: "CI/CD · GitHub Actions",
      titre: "Ce portfolio, vérifié et déployé par un pipeline",
      nomCourt: "Portfolio CI/CD",
      resume: "Ce site lui-même : chaque modification est contrôlée (HTML, liens, Lighthouse) puis déployée par GitHub Actions.",
      intro: "Le site que vous lisez est aussi une démonstration : son code source est public sur GitHub.",
      probleme: "Publier un site à la main laisse passer des erreurs : HTML invalide, liens cassés, baisse de performance ou d'accessibilité.",
      points: [
        "Pipeline GitHub Actions déclenché à chaque push et à chaque pull request",
        "Contrôles automatiques : cohérence des données, validation HTML, liens cassés (lychee), audit Lighthouse",
        "Contenu lisible sans JavaScript, généré à partir des fichiers de données",
        "Déploiement sur GitHub Pages uniquement si tous les contrôles passent"
      ],
      resultat: "Chaque version en ligne a passé les mêmes contrôles ; l'historique des exécutions est public dans l'onglet Actions du dépôt.",
      techno: ["GitHub Actions", "GitHub Pages", "Node.js", "html-validate", "lychee", "Lighthouse CI"],
      image: "assets/projets/portfolio-accueil.webp",
      imageAlt: "Page d'accueil de ce portfolio",
      imageTaille: [1200, 750],
      outils: ["GitHub Actions", "Git"],
      liens: [
        { url: "https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io", texte: "Voir le code" },
        { url: "https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io/actions", texte: "Voir le pipeline" }
      ]
    }
  ]
};
