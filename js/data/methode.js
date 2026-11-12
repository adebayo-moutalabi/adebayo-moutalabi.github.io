/* =====================================================================
   MÉTHODE : les étapes de travail (section « Méthode »)
   Une étape = un bloc { ... }. Ajoutez, retirez ou réordonnez : la numérotation
   et la mise en page (2 colonnes, 1 colonne sur mobile) se font toutes seules.
   ===================================================================== */

Site.data.methode = {
  entete: { etiquette: "Méthode", titre: "Quatre temps,", accent: "toujours les mêmes.", texte: "Je pars du besoin réel, je livre vite quelque chose qui fonctionne, et je ne laisse rien que l'équipe ne sache faire tourner seule." },
  etapes: [
    { titre: "Écouter", texte: "Comprendre le métier, l'existant et ce qui fait perdre du temps, puis l'écrire noir sur blanc.", outils: ["Entretiens", "Cartographie"], livrable: "Un cahier des charges clair" },
    { titre: "Prototyper", texte: "Construire rapidement une première version qui fonctionne, pour valider l'idée avant d'investir.", outils: ["Docker", "n8n", "Next.js"], livrable: "Un prototype utilisable" },
    { titre: "Automatiser", texte: "Brancher le pipeline, décrire l'infrastructure et confier les tâches répétitives à un agent.", outils: ["GitLab CI/CD", "Kubernetes", "Agents IA"], livrable: "Un déploiement sans intervention" },
    { titre: "Mesurer & transmettre", texte: "Superviser, documenter et former l'équipe pour qu'elle reste autonome au quotidien.", outils: ["Prometheus", "Grafana", "Documentation"], livrable: "Tableaux de bord et guide d'usage" }
  ]
};
