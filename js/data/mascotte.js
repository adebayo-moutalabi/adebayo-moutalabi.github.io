/* =====================================================================
   MASCOTTE « ATOM » et ÉCRAN DE CHARGEMENT
   ===================================================================== */

Site.data.mascotte = {
  nom: "Atom",

  chargement: {
    actif: true,               /* false = pas d'écran de chargement du tout */
    uneFoisParSession: false,  /* true = seulement à la première visite de l'onglet ; false = à chaque rechargement */
    dureeSecondes: 3,          /* durée approximative sans clic sur Atom */
    clicBonus: 5,              /* % gagnés à chaque clic sur Atom */
    commandes: [               /* [pourcentage de départ, texte affiché] */
      [0, "git clone adebayo/site"],
      [25, "docker build -t portfolio ."],
      [55, "kubectl apply -f ciel.yaml"],
      [82, "agent en ligne · vérification"]
    ],
    termine: "Déployé · bienvenue",
    indice: "Atom prépare le site. Cliquez sur lui pour accélérer.",
    indiceMerci: "Merci, ça va plus vite !",
    passer: "Passer"
  },

  bulles: {
    arrivee: "Bonjour, je suis Atom !",
    retour: "Re-bonjour !"
  }
};
