#!/usr/bin/env bash
# Construit le dossier _site : uniquement les fichiers publiés (sans docs, outils, scripts).
# Utilisé par la CI (Lighthouse et déploiement) ; lancer en local : bash scripts/construire.sh
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf _site
mkdir _site
# google2f457726f419ac07.html : vérification Google Search Console, ne pas supprimer.
cp -r index.html robots.txt sitemap.xml llms.txt google2f457726f419ac07.html projets css js assets _site/
echo "✓ _site construit ($(find _site -type f | wc -l) fichiers)"
