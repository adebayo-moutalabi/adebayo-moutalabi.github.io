/* =====================================================================
   CE QUE JE FAIS : trois domaines présentés simplement (ni offres commerciales, ni CV)
   vignette  : dessin de js/data/vignettes.js
   outils    : noms EXACTS de js/data/competences.js (affichés en pastilles)
   exemple   : lien vers une réalisation ou une preuve publique (facultatif)
   ===================================================================== */

Site.data.domaines = {
  /* Phrase d'ouverture : texte, { logos: [...] } (pastille de logos, voir data/logos.js) ou { accent: "..." } */
  etiquette: "Ce que je fais",
  phrase: [
    "Je fais passer une idée", { logos: ["Git"] }, "du premier commit à la production", { logos: ["Kubernetes", "AWS EC2"] },
    ", puis j'automatise", { accent: "tout ce qui peut l'être" }, { logos: ["OpenAI Realtime API"] }, "pour qu'elle y reste."
  ],
  fil: "Trois domaines, un même fil : automatiser.",
  liste: [
    {
      id: "infrastructure",
      vignette: "k8s",
      titre: "Infrastructure et déploiement",
      texte: "Mettre une application en ligne et l'y garder : conteneurs, cloud, pipelines CI/CD qui testent et déploient chaque modification, supervision.",
      outils: ["Docker", "Kubernetes", "AWS EC2", "GitLab CI/CD", "GitHub Actions", "Prometheus"],
      exemple: { texte: "Exemple : le pipeline public de ce site", url: "#projet-portfolio" }
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
