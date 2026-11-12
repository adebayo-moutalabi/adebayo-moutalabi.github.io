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
   Pour SUPPRIMER un projet : effacez son bloc { ... } en entier.
   ===================================================================== */

Site.data.projets = {
  entete: { etiquette: "Réalisations", titre: "Peu de projets,", accent: "mais vérifiables.", texte: "Seules les réalisations en ligne et vérifiables sont présentées ici. De nouveaux projets Cloud, DevOps et IA arriveront au fil de leur mise en production." },
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
      id: "expoia",
      categorie: "web",
      large: true,
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
