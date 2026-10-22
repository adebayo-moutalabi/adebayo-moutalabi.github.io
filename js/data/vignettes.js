/* =====================================================================
   VIGNETTES DES PROJETS (petits dessins SVG)
   Chaque clé correspond au champ « vignette » d'un projet.
   Pour en ajouter : nouvelle ligne  nom: '<svg viewBox="0 0 200 120">…</svg>',
   Classes utiles : "ln" = trait, "gd" = point doré.
   ===================================================================== */

Site.data.vignettes = {
  expo: '<svg viewBox="0 0 200 120"><rect class="ln" x="20" y="10" width="160" height="100" rx="12"/><circle class="gd" cx="36" cy="24" r="3"/><text x="38" y="66" font-family="Fraunces, Georgia, serif" font-size="28" style="fill:var(--ink)">Expo<tspan font-style="italic" style="fill:var(--accent-ink)">IA</tspan></text><path class="ln" d="M40 86h90M40 96h60"/></svg>',
  k8s: '<svg viewBox="0 0 200 120"><path class="ln" d="M100 10l50 28v56l-50 28-50-28V38z"/><path class="ln" d="M50 38l50 28 50-28M100 66v56"/><rect class="gd" x="88" y="46" width="24" height="16" rx="4"/></svg>',
  aws: '<svg viewBox="0 0 200 120"><path class="ln" d="M60 86h80a20 20 0 0 0 2-40 30 30 0 0 0-57-7 24 24 0 0 0-25 47z"/><circle class="gd" cx="140" cy="46" r="6"/></svg>',
  net: '<svg viewBox="0 0 200 120"><circle class="ln" cx="100" cy="60" r="16"/><circle class="ln" cx="40" cy="24" r="10"/><circle class="ln" cx="160" cy="24" r="10"/><circle class="ln" cx="40" cy="96" r="10"/><circle class="ln" cx="160" cy="96" r="10"/><path class="ln" d="M49 29l37 23M151 29l-37 23M49 91l37-23M151 91l-37-23"/><circle class="gd" cx="100" cy="60" r="5"/></svg>',
  bot: '<svg viewBox="0 0 200 120"><rect class="ln" x="66" y="34" width="68" height="54" rx="16"/><path class="ln" d="M100 18v16"/><circle cx="88" cy="60" r="5" style="fill:var(--blue)"/><circle cx="112" cy="60" r="5" style="fill:var(--blue)"/></svg>',
  flow: '<svg viewBox="0 0 200 120"><circle class="ln" cx="30" cy="60" r="12"/><circle class="ln" cx="100" cy="30" r="12"/><circle class="ln" cx="100" cy="90" r="12"/><circle class="gd" cx="170" cy="60" r="12"/><path class="ln" d="M42 56l46-22M42 64l46 22M112 34l46 22M112 86l46-22"/></svg>',
  web: '<svg viewBox="0 0 200 120"><rect class="ln" x="30" y="14" width="140" height="92" rx="10"/><path class="ln" d="M30 34h140"/><rect class="gd" x="44" y="48" width="50" height="10" rx="5"/><path class="ln" d="M44 72h110M44 84h80"/></svg>',
  shield: '<svg viewBox="0 0 200 120"><path class="ln" d="M100 10l44 16v32c0 28-19 44-44 52-25-8-44-24-44-52V26z"/><path d="M84 60l11 11 22-24" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  elo: '<svg viewBox="0 0 200 120"><path class="ln" d="M20 100h160"/><path class="ln" d="M20 92c22-4 30-22 52-25s30 7 44-15 22-37 64-42"/><circle class="gd" cx="180" cy="10" r="7"/></svg>'
};
