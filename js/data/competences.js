/* =====================================================================
   COMPÉTENCES (section « Ma stack »)
   familles : les panneaux (dans l'ordre d'affichage). ia: true = couleur bleue « IA ».
   outils   : une ligne = un outil. « famille » doit être l'id d'une famille ci-dessus.
   
   Ajouter un outil : copiez une ligne de « outils » et changez nom / famille / role.
   Retirer un outil : supprimez sa ligne. Ajouter une famille : copiez un bloc de « familles ».
   Les projets où l'outil est utilisé se calculent tout seuls à partir du champ « outils »
   de js/data/projets.js (les noms doivent être identiques).
   ===================================================================== */

Site.data.competences = {
  entete: { etiquette: "Compétences", titre: "Ma boîte", accent: "à outils.", texte: "Les outils avec lesquels je construis, rangés en sept familles. Attrapez-les et lancez-les, ou choisissez une famille." },
  familles: [
    { id: "ci", nom: "CI/CD", resume: "Automatiser le chemin entre une modification de code et sa mise en ligne." },
    { id: "cont", nom: "Conteneurs", resume: "Empaqueter les applications et les faire tourner de façon fiable." },
    { id: "cloud", nom: "Cloud", resume: "Héberger et décrire l'infrastructure, sans rien configurer à la main." },
    { id: "sys", nom: "Systèmes", resume: "Administrer les serveurs, puis surveiller que tout tient dans la durée." },
    { id: "net", nom: "Réseaux", resume: "Faire circuler les données entre les machines et les services." },
    { id: "ia", nom: "Agents IA", ia: true, resume: "Concevoir des agents et des automatisations qui répondent à un besoin métier précis." },
    { id: "web", nom: "Web", resume: "Construire les sites et applications que les équipes utilisent." }
  ],
  outils: [
    { nom: "Docker", famille: "cont", role: "Empaqueter chaque service pour qu'il tourne pareil partout." },
    { nom: "Kubernetes", famille: "cont", role: "Orchestrer les conteneurs, les répartir et les relancer en cas de panne." },
    { nom: "Minikube", famille: "cont", role: "Un cluster Kubernetes local pour tester avant de déployer." },
    { nom: "RBAC", famille: "cont", role: "Donner à chacun uniquement les droits dont il a besoin." },
    { nom: "HPA", famille: "cont", role: "Ajouter ou retirer des copies de l'application selon la charge." },
    { nom: "GitLab CI/CD", famille: "ci", role: "Tester, construire et déployer chaque modification automatiquement." },
    { nom: "GitHub Actions", famille: "ci", role: "Vérifier et déployer ce portfolio à chaque modification." },
    { nom: "Git", famille: "ci", role: "Versionner le code et l'infrastructure, travailler à plusieurs." },
    { nom: "Registry", famille: "ci", role: "Stocker et distribuer les images de conteneurs." },
    { nom: "AWS EC2", famille: "cloud", role: "Des serveurs à la demande pour héberger l'application." },
    { nom: "VPC", famille: "cloud", role: "Un réseau privé isolé dans le cloud." },
    { nom: "S3", famille: "cloud", role: "Le stockage de fichiers, durable et bon marché." },
    { nom: "IAM", famille: "cloud", role: "Les identités et les droits sur AWS." },
    { nom: "Terraform", famille: "cloud", role: "Décrire l'infrastructure en code pour la recréer à l'identique." },
    { nom: "Linux", famille: "sys", role: "Administrer les serveurs au quotidien." },
    { nom: "Bash", famille: "sys", role: "Scripter les tâches répétitives." },
    { nom: "Prometheus", famille: "sys", role: "Collecter les métriques des services." },
    { nom: "Grafana", famille: "sys", role: "Des tableaux de bord pour voir l'état du système." },
    { nom: "RIPv2", famille: "net", role: "Le routage dynamique entre réseaux." },
    { nom: "VLAN", famille: "net", role: "Segmenter un réseau physique en réseaux logiques." },
    { nom: "Quagga", famille: "net", role: "Un routeur logiciel sous Linux." },
    { nom: "Wireshark", famille: "net", role: "Analyser le trafic paquet par paquet." },
    { nom: "gRPC", famille: "net", role: "Faire dialoguer des services écrits dans des langages différents." },
    { nom: "n8n", famille: "ia", role: "Des workflows qui relient les outils entre eux." },
    { nom: "API LLM", famille: "ia", role: "Appeler un modèle de langage depuis une application : voix temps réel, appel de fonctions." },
    { nom: "Claude", famille: "ia", role: "Concevoir des agents et prototyper plus vite." },
    { nom: "MCP", famille: "ia", role: "Brancher un agent sur les outils et les données." },
    { nom: "Mistral AI", famille: "ia", role: "Un modèle de langage européen, utilisable en auto-hébergement." },
    { nom: "Python", famille: "ia", role: "Le langage des agents et des scripts." },
    { nom: "Supabase", famille: "ia", role: "Une base PostgreSQL prête à l'emploi." },
    { nom: "RAG", famille: "ia", role: "Faire répondre un agent uniquement à partir de sources fiables." },
    { nom: "Next.js", famille: "web", role: "Des sites rapides et bien référencés." },
    { nom: "Payload CMS", famille: "web", role: "Un CMS pour que l'équipe édite le contenu." },
    { nom: "TypeScript", famille: "web", role: "Du JavaScript typé, plus sûr." },
    { nom: "WordPress", famille: "web", role: "Des sites vitrines que le client met à jour seul." },
    { nom: "Electron", famille: "web", role: "Des applications de bureau en JavaScript, comme Nox." }
  ]
};
