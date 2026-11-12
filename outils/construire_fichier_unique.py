#!/usr/bin/env python3
"""
Fabrique UN SEUL fichier HTML autonome (CSS, JS et photo inclus) à partir du dossier du site.
Utile pour envoyer le site par e-mail, le déposer sur un hébergeur très simple, ou le publier
comme page unique. Aucune installation : Python 3 suffit.

Usage (depuis le dossier du site) :
    python3 outils/construire_fichier_unique.py
Résultat : dist/portfolio-fichier-unique.html
"""
import base64, re, pathlib

racine = pathlib.Path(__file__).resolve().parent.parent
html = (racine / "index.html").read_text(encoding="utf-8")

# 1. feuilles de style locales -> <style>
def css(m):
    return "<style>\n" + (racine / m.group(1)).read_text(encoding="utf-8") + "\n</style>"
html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', css, html)

# 2. scripts locaux -> <script> (la photo est incluse en base64 dans le script de profil)
def photo_data_uri():
    p = racine / "assets" / "photo.webp"
    return "data:image/webp;base64," + base64.b64encode(p.read_bytes()).decode()

def js(m):
    code = (racine / m.group(1)).read_text(encoding="utf-8")
    if m.group(1).endswith("data/profil.js"):
        code = code.replace('"assets/photo.webp"', '"' + photo_data_uri() + '"')
    return "<script>\n" + code + "\n</script>"
html = re.sub(r'<script src="(js/[^"]+)"></script>', js, html)

sortie = racine / "dist" / "portfolio-fichier-unique.html"
sortie.parent.mkdir(exist_ok=True)
sortie.write_text(html, encoding="utf-8")
print("OK :", sortie, "(%d Ko)" % (sortie.stat().st_size // 1024))
