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
   points      liste à puces de la fiche
   techno      pastilles de technologies affichées dans la fiche
   outils      noms EXACTS des outils de js/data/competences.js : ils relient la fiche aux cartes de la stack
   liens       boutons (facultatif) : { url: "https://…", texte: "Voir le site" }
   Pour SUPPRIMER un projet : effacez son bloc { ... } en entier.
   ===================================================================== */

Site.data.projets = {
  entete: { etiquette: "Projets", titre: "Plus de trente réalisations.", accent: "Ouvrez-en une.", texte: "Touchez une carte pour afficher la fiche complète : contexte, rôle, technologies et liens." },
  categories: [
    { id: "all", libelle: "Tous" },
    { id: "cloud", libelle: "Cloud & DevOps" },
    { id: "ia", libelle: "IA & automatisation" },
    { id: "web", libelle: "Web" }
  ],
  liste: [
    {
      id: "expo",
      categorie: "web",
      large: true,
      vignette: "expo",
      type: "Web · France 2030 / ANR",
      titre: "ExpoIA, l'exposition sur l'IA",
      nomCourt: "ExpoIA",
      resume: "Site de l'exposition du Musée des Transmissions à Rennes, et son jeu Floriale.",
      intro: "Projet d'école confié dans le cadre du master, d'octobre 2025 à mai 2026, financé par France 2030 et l'ANR.",
      points: [
        "Coordination technique entre porteurs de projet et équipe TIARe",
        "Contributions Next.js 16, Payload CMS 3 et PostgreSQL",
        "Accessibilité WCAG, e-mails transactionnels React Email",
        "Contenus bilingues dans le CMS",
        "Conception et développement du jeu Floriale"
      ],
      techno: ["Next.js 16", "Payload CMS 3", "PostgreSQL", "TypeScript", "Tailwind", "Framer Motion"],
      outils: ["Next.js", "Payload CMS", "TypeScript", "Git"],
      liens: [
        { url: "https://expo-ia.univ-rennes.fr/fr", texte: "Voir le site" },
        { url: "https://expo-ia.univ-rennes.fr/fr/jeu/floriale", texte: "Jouer à Floriale" }
      ]
    },
    {
      id: "sock",
      categorie: "cloud",
      vignette: "k8s",
      type: "Kubernetes",
      titre: "Sock Shop en microservices",
      nomCourt: "Sock Shop",
      resume: "Une boutique en microservices sur Kubernetes, avec RBAC et autoscaling.",
      intro: "Déploiement de l'application de démonstration Sock Shop, une boutique découpée en microservices.",
      points: [
        "Déploiement des services sur un cluster Kubernetes",
        "Contrôle d'accès par rôles (RBAC)",
        "Mise à l'échelle automatique avec HPA"
      ],
      techno: ["Kubernetes", "Docker", "Minikube", "RBAC", "HPA"],
      outils: ["Kubernetes", "Docker", "Minikube", "RBAC", "HPA"]
    },
    {
      id: "boursia",
      categorie: "ia",
      vignette: "bot",
      type: "Agent IA · prototype",
      titre: "BoursIA",
      nomCourt: "BoursIA",
      resume: "Agent Telegram de recherche de bourses d'études, en cours de prototypage.",
      intro: "Un agent qui aide les étudiants à trouver des bourses, accessible depuis Telegram.",
      points: [
        "Architecture RAG qui ne répond qu'à partir de sources vérifiées",
        "Limitation des hallucinations au cœur de la conception",
        "Prototype partiel, encore en développement"
      ],
      techno: ["Python", "Mistral AI", "Supabase", "Telegram"],
      outils: ["Python", "Mistral AI", "Supabase", "RAG"]
    },
    {
      id: "aws",
      categorie: "cloud",
      vignette: "aws",
      type: "AWS",
      titre: "Architecture cloud hybride",
      nomCourt: "Cloud hybride",
      resume: "Un environnement local relié à AWS, du réseau aux identités.",
      intro: "Conception d'une architecture qui relie une infrastructure locale aux services AWS.",
      points: [
        "Réseau virtuel VPC et sous-réseaux",
        "Instances EC2 et stockage S3",
        "Gestion des identités et des droits avec IAM"
      ],
      techno: ["VPC", "EC2", "S3", "IAM"],
      outils: ["AWS EC2", "VPC", "S3", "IAM"]
    },
    {
      id: "n8n",
      categorie: "ia",
      vignette: "flow",
      type: "Automatisation",
      titre: "n8n auto-hébergé",
      nomCourt: "n8n",
      resume: "n8n sur Render avec PostgreSQL Supabase, en production.",
      intro: "Mise en place d'une instance n8n auto-hébergée pour faire tourner des workflows d'automatisation.",
      points: [
        "Déploiement sur Render avec base PostgreSQL Supabase",
        "Résolution de problèmes IPv6, SSL et webhooks"
      ],
      techno: ["n8n", "Render", "Supabase", "PostgreSQL"],
      outils: ["n8n", "Render", "Supabase"]
    },
    {
      id: "conti",
      categorie: "web",
      vignette: "shield",
      type: "Site vitrine",
      titre: "Continental IT",
      nomCourt: "Continental IT",
      resume: "Site d'un cabinet de conseil en cybersécurité à Cotonou.",
      intro: "Création et enrichissement du site vitrine d'un cabinet de cybersécurité.",
      points: [
        "Animations d'en-tête et effets au survol",
        "Pages de services et système de boutons",
        "Contenus de masterclass et corrections éditoriales"
      ],
      techno: ["WordPress", "Elementor"],
      outils: ["WordPress"],
      liens: [
        { url: "https://continentalit.olaxio.com/", texte: "Voir le site" }
      ]
    },
    {
      id: "virtu",
      categorie: "ia",
      vignette: "elo",
      type: "Produit",
      titre: "VirtuStage",
      nomCourt: "VirtuStage",
      resume: "Mises en situation professionnelles notées par un score de type Elo.",
      intro: "Projet entrepreneurial soutenu par le statut national étudiant-entrepreneur (Pépite Bretagne, 2026).",
      points: [
        "Prototypes d'interface et modèle de données",
        "Système de notation des compétences de type Elo",
        "Travail de marque : vision, manifeste, naming"
      ],
      techno: ["React", "Scoring Elo"],
      outils: []
    },
    {
      id: "logi",
      categorie: "ia",
      vignette: "flow",
      type: "Bot Telegram",
      titre: "LogiScout",
      nomCourt: "LogiScout",
      resume: "Aide à la recherche de logement étudiant, construit dans n8n.",
      intro: "Bot Telegram pour accompagner les étudiants dans leur recherche de logement.",
      points: ["Workflows n8n", "Parcours d'accueil retravaillé pour les utilisateurs"],
      techno: ["n8n", "Telegram"],
      outils: ["n8n"]
    },
    {
      id: "grpc",
      categorie: "cloud",
      vignette: "net",
      type: "Systèmes distribués",
      titre: "Services gRPC multi-langages",
      nomCourt: "Services gRPC",
      resume: "Les quatre types d'appels gRPC, entre plusieurs langages.",
      intro: "Projet de groupe en master sur la communication entre services.",
      points: [
        "Les quatre types de services gRPC",
        "Interopérabilité entre plusieurs langages",
        "Prototype fonctionnel et manuel utilisateur"
      ],
      techno: ["gRPC", "Protobuf"],
      outils: ["gRPC"]
    },
    {
      id: "vlan",
      categorie: "cloud",
      vignette: "net",
      type: "Réseaux",
      titre: "Réseau routé multi-VLAN",
      nomCourt: "Multi-VLAN",
      resume: "Segmentation par VLAN et routage dynamique RIPv2.",
      intro: "Conception et analyse d'un réseau segmenté.",
      points: [
        "Segmentation par VLAN",
        "Routage dynamique RIPv2 sur Quagga",
        "Analyse du trafic avec Wireshark"
      ],
      techno: ["RIPv2", "VLAN", "Quagga", "Wireshark"],
      outils: ["RIPv2", "VLAN", "Quagga", "Wireshark"]
    },
    {
      id: "stage",
      categorie: "web",
      vignette: "web",
      type: "Web & mobile",
      titre: "StageBenin & apps Flutter",
      nomCourt: "StageBenin",
      resume: "Plateforme de stages en Laravel et applications mobiles.",
      intro: "Réalisé pendant le stage chez PayPlus Africa en 2022.",
      points: [
        "Plateforme StageBenin en Laravel / PHP",
        "Apps Flutter : quiz de révision, calculatrice, jeux",
        "Déploiement complet d'une application WordPress"
      ],
      techno: ["Laravel", "PHP", "Flutter", "WordPress"],
      outils: ["Laravel", "WordPress", "Flutter"]
    }
  ]
};
