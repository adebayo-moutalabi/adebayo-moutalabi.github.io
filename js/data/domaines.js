/* =====================================================================
   CE QUE JE FAIS : trois domaines présentés simplement (ni offres commerciales, ni CV)
   outils : noms EXACTS de js/data/competences.js (affichés en pastilles)
   exemple : lien vers une réalisation ou une preuve publique (facultatif)
   Après modification : node scripts/generer.js
   ===================================================================== */

Site.data.domaines = {
  entete: { etiquette: "Ce que je fais", titre: "Trois domaines, un même fil : automatiser." },
  liste: [
    {
      id: "infrastructure",
      titre: "Infrastructure et déploiement",
      texte: "Mettre une application en ligne et l'y garder : conteneurs, cloud, pipelines CI/CD qui testent et déploient chaque modification, supervision.",
      outils: ["Docker", "Kubernetes", "AWS EC2", "GitHub Actions", "GitLab CI/CD", "Prometheus"],
      exemple: { texte: "Exemple : le pipeline public de ce site", url: "https://github.com/adebayo-moutalabi/adebayo-moutalabi.github.io/actions" }
    },
    {
      id: "web",
      titre: "Web",
      texte: "Des sites et des applications rapides, accessibles et bien référencés, dont le contenu reste simple à mettre à jour.",
      outils: ["Next.js", "TypeScript", "Payload CMS", "WordPress"],
      exemple: { texte: "Exemples : Continental IT et ExpoIA", url: "#realisations" }
    },
    {
      id: "ia",
      titre: "Agents IA et automatisations",
      texte: "Des agents reliés aux outils du quotidien (e-mail, agenda, messagerie) et des workflows qui prennent en charge les tâches répétitives.",
      outils: ["API LLM", "n8n", "Python", "RAG"],
      exemple: { texte: "Exemple : Nox, un agent vocal pour Windows", url: "projets/nox/" }
    }
  ]
};
