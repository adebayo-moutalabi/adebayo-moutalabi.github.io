#!/usr/bin/env python3
"""
Fabrique UN SEUL fichier HTML autonome (page d'accueil avec CSS, JS et images inclus) à partir du site.
Utile pour envoyer le site par e-mail ou le montrer hors ligne. Aucune installation : Python 3 suffit.
Les liens vers les pages de projet (projets/<id>/) restent des liens : ils ne fonctionnent qu'en ligne.

Usage (depuis le dossier du site, après node scripts/generer.js) :
    python3 outils/construire_fichier_unique.py
Résultat : dist/portfolio-fichier-unique.html
"""
import base64, mimetypes, re, pathlib

racine = pathlib.Path(__file__).resolve().parent.parent
html = (racine / "index.html").read_text(encoding="utf-8")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")

# 1. feuilles de style locales -> <style>
html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">',
              lambda m: "<style>\n" + (racine / m.group(1)).read_text(encoding="utf-8") + "\n</style>", html)

# 2. scripts locaux -> <script>
html = re.sub(r'<script src="(js/[^"]+)"[^>]*></script>',
              lambda m: "<script>\n" + (racine / m.group(1)).read_text(encoding="utf-8") + "\n</script>", html)

# 3. images locales (photo, logo, captures, icônes) -> data: URI
def data_uri(m):
    fichier = racine / m.group(2)
    if not fichier.is_file():
        return m.group(0)
    type_mime = mimetypes.guess_type(fichier.name)[0] or "application/octet-stream"
    return m.group(1) + '="data:' + type_mime + ";base64," + base64.b64encode(fichier.read_bytes()).decode() + '"'
html = re.sub(r'(src|href)="((?:assets/)[^"]+\.(?:webp|png|svg|ico))"', data_uri, html)

sortie = racine / "dist" / "portfolio-fichier-unique.html"
sortie.parent.mkdir(exist_ok=True)
sortie.write_text(html, encoding="utf-8")
print("OK :", sortie, "(%d Ko)" % (sortie.stat().st_size // 1024))
