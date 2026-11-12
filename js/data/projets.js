/* =====================================================================
   PROJETS (section « Projets » + fiches détaillées)
   Pour AJOUTER un projet : copiez un bloc { ... } ci-dessous, collez-le à la suite
   (n'oubliez pas la virgule entre deux blocs) et changez les textes.
   
   id          identifiant unique, sans espace ni accent (ex. "monprojet")
   categorie   "cloud", "ia" ou "web" (voir la liste « categories » plus bas)
   large       true = grande carte sur la première ligne (facultatif)
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
   description phrase courte (balise meta description de la page)
   logiciel    (facultatif) données Google « SoftwareApplication » : { version, systeme, telechargement, site, code }
   Pour SUPPRIMER un projet : effacez son bloc { ... } en entier.
   ===================================================================== */

Site.data.projets = {
  entete: { etiquette: "Réalisations", titre: "Peu de projets,", accent: "mais vérifiables.", texte: "Seules les réalisations en ligne et vérifiables sont présentées ici : code public, site ou application téléchargeable. De nouveaux projets Cloud, DevOps et IA arriveront au fil de leur mise en production." },
  /* filtres: false = pas de boutons de filtre (inutiles avec peu de projets). Remettez true quand il y en aura plus. */
  filtres: false,
  categories: [
    { id: "all", libelle: "Tous" },
    { id: "cloud", libelle: "Cloud & DevOps" },
    { id: "ia", libelle: "IA & automatisation" },
    { id: "web", libelle: "Web" }
  ],
  liste: [
    {
      id: "nox",
      categorie: "ia",
      large: true,
      vignette: "bot",
      type: "Agent IA vocal · OpenAI DevDay Hackathon Paris",
      titre: "Nox, le compagnon de bureau qui aide à démarrer",
      nomCourt: "Nox",
      resume: "Une mascotte de bureau qui parle en premier, découpe une tâche en micro-étapes de 2 à 10 minutes et aide les personnes TDAH à démarrer, rester concentrées et reprendre.",
      description: "Nox, application de bureau Windows réalisée par Adebayo Moutalabi : un agent IA vocal (API Realtime d'OpenAI) qui aide les personnes TDAH à démarrer une tâche, micro-étape par micro-étape.",
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
      id: "expoia",
      categorie: "web",
      vignette: "expo",
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
      outils: ["Next.js", "Payload CMS", "TypeScript", "Git"],
      liens: [
        { url: "https://expo-ia.univ-rennes.fr/fr", texte: "Voir le site" },
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
      resume: "Un site statique dont chaque modification passe par un pipeline GitHub Actions avant d'être mise en ligne.",
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
      outils: ["GitHub Actions", "Git"],
      liens: [
        { url: "https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io", texte: "Voir le code" },
        { url: "https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io/actions", texte: "Voir le pipeline" }
      ]
    }
  ]
};
