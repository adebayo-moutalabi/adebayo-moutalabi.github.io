/* =====================================================================
   LOGO AM ANIMÉ : écran de chargement et barre de progression
   ===================================================================== */

Site.data.mascotte = {
  nom: "Logo AM",

  chargement: {
    actif: true,               /* false = pas d'écran de chargement du tout */
    uneFoisParSession: true,   /* true = seulement à la première visite de l'onglet ; false = à chaque rechargement */
    dureeSecondes: 3,          /* durée approximative sans clic sur le logo */
    clicBonus: 5,              /* % gagnés à chaque clic sur le logo */
    commandes: [               /* [pourcentage de départ, texte affiché] */
      [0, "git clone adebayo/site"],
      [25, "docker build -t portfolio ."],
      [55, "kubectl apply -f ciel.yaml"],
      [82, "agent en ligne · vérification"]
    ],
    termine: "Déployé · bienvenue",
    indice: "Le site se déploie. Cliquez sur le logo pour accélérer.",
    indiceMerci: "Accéléré.",
    passer: "Passer"
  },

  bulles: {
    arrivee: "Bienvenue !",
    retour: "Re-bonjour !"
  }
};
