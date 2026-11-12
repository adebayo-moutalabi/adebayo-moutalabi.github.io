#!/usr/bin/env bash
# Construit le dossier _site : uniquement les fichiers publiés (sans docs, outils, scripts).
# Utilisé par la CI (Lighthouse et déploiement) ; lancer en local : bash scripts/construire.sh
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf _site
mkdir _site
cp -r index.html robots.txt sitemap.xml llms.txt css js assets _site/
echo "✓ _site construit ($(find _site -type f | wc -l) fichiers)"
