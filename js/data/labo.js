/* =====================================================================
   LABO : les démos interactives
   Quatre démos : k8s (curseur d'autoscaling), ci (pipeline), ia (agent de démo), aws (architecture).
   Vous pouvez modifier tous les textes, ajouter/retirer des étapes de pipeline, des questions de l'agent,
   des briques AWS, ou des pastilles d'outils (« outils »).
   Créer un nouveau TYPE de démo demande d'écrire du code dans js/labo.js (voir le README).
   ===================================================================== */

Site.data.labo = {
  entete: { etiquette: "Le labo", titre: "Ne me croyez pas sur parole.", accent: "Essayez.", texte: "Quatre démos interactives pour comprendre mon métier en dix secondes chacune." },

  k8s: {
    onglet: "Kubernetes", etiquette: "Conteneurs & orchestration", titre: "Votre trafic monte,", accent: "l'infra suit.",
    texte: "Avec l'autoscaling horizontal (HPA), Kubernetes ajoute ou retire des copies de votre application selon la charge. Faites glisser le curseur.",
    outils: ["Docker", "Kubernetes", "RBAC", "HPA", "Prometheus"],
    libelleCharge: "Charge CPU moyenne", libelleCible: "Cible : 60 % de CPU par pod",
    note: "Simulation pédagogique de l'autoscaling horizontal (HPA)."
  },

  ci: {
    onglet: "CI/CD", etiquette: "Intégration & déploiement continus", titre: "Un commit,", accent: "et c'est en ligne.",
    texte: "Chaque modification est testée, empaquetée puis déployée automatiquement. Lancez le pipeline pour voir les étapes s'enchaîner.",
    outils: ["GitLab CI/CD", "GitHub Actions", "Docker", "Registry", "Kubernetes"],
    bouton: "Lancer git push", boutonEnCours: "Pipeline en cours…", boutonRelancer: "Relancer",
    messageFin: "Déployé en production, sans intervention manuelle",
    etapes: [
      { nom: "lint & tests", duree: "00:42" },
      { nom: "docker build", duree: "01:18" },
      { nom: "push registry", duree: "00:21" },
      { nom: "deploy kubernetes", duree: "00:57" }
    ]
  },

  ia: {
    onglet: "Agent IA", etiquette: "Agents IA & automatisation", titre: "Posez une question", accent: "à mon agent.",
    texte: "Je conçois des agents reliés à vos outils et à vos données, qui répondent uniquement à partir de sources fiables. Voici une petite démo sur mon propre profil.",
    outils: ["n8n", "Claude", "MCP", "Mistral AI", "RAG"],
    bonjour: "Bonjour, je suis l'agent de démo d'Adebayo. Choisissez une question ci-dessous.",
    note: "Démo : réponses préparées à partir de son profil, sans appel à un modèle.",
    /* les réponses acceptent <b>gras</b> */
    questions: [
      {
        question: "Que sais-tu faire ?",
        reponse: "Adebayo travaille d'abord en <b>Cloud &amp; DevOps</b> : Linux, Docker, Kubernetes, pipelines GitLab CI/CD et GitHub Actions, AWS et supervision Prometheus/Grafana. Il conçoit aussi des <b>agents IA</b> et des automatisations (n8n, API de LLM, RAG) qui répondent à des besoins métier précis."
      },
      {
        question: "Ta réalisation phare ?",
        reponse: "Le site <b>ExpoIA</b> du Musée des Transmissions (projet France 2030 / ANR) : coordination technique, Next.js et Payload CMS, et le jeu Floriale. Ce portfolio est aussi vérifié et déployé par un pipeline <b>GitHub Actions</b>. D'autres projets Cloud, DevOps et IA sont en préparation."
      },
      {
        question: "Comment travailles-tu ?",
        reponse: "Il part d'un problème réel, rédige le cahier des charges, puis livre un prototype qui fonctionne. Il se décrit comme <b>résilient, curieux et minutieux</b>."
      },
      {
        question: "Quelle formation ?",
        reponse: "Master 1 <b>Cloud &amp; Réseaux</b> à l'ISTIC (Université de Rennes), après une Licence 3 Informatique à l'ISTIC et une Licence Informatique de gestion à l'ENEAM (Université d'Abomey-Calavi)."
      },
      {
        question: "Comment te contacter ?",
        reponse: "Le plus simple : un message sur <b>LinkedIn</b>. Le lien est dans la section Contact, en bas de page."
      }
    ]
  },

  aws: {
    onglet: "Cloud AWS", etiquette: "Cloud AWS", titre: "Une architecture", accent: "couche par couche.",
    texte: "Activez les briques une à une pour construire une architecture hybride : un environnement local relié à AWS.",
    outils: ["VPC", "EC2", "S3", "IAM", "Terraform"],
    messageComplet: "Architecture complète. Chaque brique est en place et sécurisée.",
    messageFin: "Architecture hybride prête",
    /* actif: true = brique déjà activée au départ */
    briques: [
      { nom: "VPC", detail: "Réseau privé isolé", actif: true },
      { nom: "Sous-réseaux", detail: "Public et privé", actif: true },
      { nom: "EC2", detail: "Serveurs de l'application", actif: false },
      { nom: "S3", detail: "Stockage des fichiers", actif: false },
      { nom: "IAM", detail: "Droits minimaux par rôle", actif: false },
      { nom: "Lien hybride", detail: "Connexion à l'environnement local", actif: false }
    ]
  }
};
