/* =====================================================================
   CE QUE JE FAIS : trois domaines présentés simplement (ni offres commerciales, ni CV)
   vignette  : dessin de js/data/vignettes.js
   outils    : noms EXACTS de js/data/competences.js (affichés en pastilles)
   exemple   : lien vers une réalisation ou une preuve publique (facultatif)
   ===================================================================== */

Site.data.domaines = {
  entete: { etiquette: "Ce que je fais", titre: "Trois domaines,", accent: "un même fil : automatiser.", texte: "Du serveur à l'interface, jusqu'aux agents qui travaillent à votre place." },
  liste: [
    {
      id: "infrastructure",
      vignette: "k8s",
      titre: "Infrastructure et déploiement",
      texte: "Mettre une application en ligne et l'y garder : conteneurs, cloud, pipelines CI/CD qui testent et déploient chaque modification, supervision.",
      outils: ["Docker", "Kubernetes", "AWS EC2", "GitLab CI/CD", "GitHub Actions", "Prometheus"],
      exemple: { texte: "Exemple : le pipeline public de ce site", url: "#projets" }
    },
    {
      id: "web",
      vignette: "web",
      titre: "Web",
      texte: "Des sites et des applications rapides, accessibles et bien référencés, dont le contenu reste simple à mettre à jour.",
      outils: ["Next.js", "Payload CMS", "TypeScript", "WordPress"],
      exemple: { texte: "Exemples : Continental IT et ExpoIA", url: "#projets" }
    },
    {
      id: "ia",
      vignette: "bot",
      ia: true,
      titre: "Agents IA et automatisations",
      texte: "Des agents reliés aux outils du quotidien (e-mail, agenda, messagerie) et des workflows qui prennent en charge les tâches répétitives.",
      outils: ["API LLM", "n8n", "Python", "RAG"],
      exemple: { texte: "Exemple : Nox, un agent vocal pour Windows", url: "projets/nox/" }
    }
  ]
};
