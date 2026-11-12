/* =====================================================================
   RÉALISATIONS (section « Réalisations » + une page par projet : projets/<id>/)
   Pour AJOUTER une réalisation : copiez un bloc { ... }, changez les textes, ajoutez une capture d'écran
   dans assets/projets/, puis lancez node scripts/generer.js (la page, le sitemap, llms.txt et les données
   Google sont mis à jour tout seuls). Ajoutez aussi l'URL de la page dans lighthouserc.json.

   id          identifiant unique, sans espace ni accent (sert aussi d'adresse : projets/<id>/)
   type        petit texte au-dessus du titre
   titre, nomCourt, resume   titre complet, nom court, phrase de la carte
   description phrase courte (balise meta description de la page)
   intro       paragraphe « Contexte »
   probleme    le besoin de départ ; points : ce que j'ai fait ; resultat : ce qui existe, vérifiable
   techno      pastilles « Stack » ; outils : noms EXACTS de js/data/competences.js
   page        chemin de la page dédiée (ex. "projets/nox/")
   image, imageAlt, imageTaille, partage   capture d'écran, texte alternatif, [largeur, hauteur], image de partage
   logiciel    (facultatif) données Google « SoftwareApplication »
   liens       boutons : { url: "https://…", texte: "Voir le site" }
   Écrivez des phrases factuelles et vérifiables : aucun chiffre ni témoignage inventé.
   ===================================================================== */

Site.data.projets = {
  entete: { etiquette: "Réalisations", titre: "Réalisations" },
  liste: [
    {
      id: "nox",
      categorie: "ia",
      type: "Agent IA vocal · OpenAI DevDay Hackathon Paris",
      titre: "Nox, le compagnon de bureau qui aide à démarrer",
      nomCourt: "Nox",
      resume: "Une mascotte de bureau qui parle en premier, découpe une tâche en micro-étapes de 2 à 10 minutes et aide les personnes TDAH à démarrer, rester concentrées et reprendre.",
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
      categorie: "web",
      type: "Site vitrine · Cybersécurité · Bénin",
      titre: "Continental IT, le site d'un cabinet de cybersécurité à Cotonou",
      nomCourt: "Continental IT",
      resume: "Site vitrine de Continental IT, cabinet béninois de conseil en gouvernance des SI, gestion des risques et cybersécurité, en ligne sur continentalit.org.",
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
      categorie: "web",
      type: "Web · France 2030 / ANR",
      titre: "ExpoIA, l'exposition sur l'IA du Musée des Transmissions",
      nomCourt: "ExpoIA",
      resume: "Site bilingue et accessible de l'exposition du Musée des Transmissions à Rennes, avec le jeu Floriale.",
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
    }
  ]
};
