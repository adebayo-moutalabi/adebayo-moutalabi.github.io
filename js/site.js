/* =====================================================================
   SITE : le seul script chargé par les pages. Tout le contenu est déjà dans le HTML
   (généré par scripts/generer.js) : ce script n'ajoute que des interactions.
     1. thème clair / sombre (choix mémorisé) ;
     2. en-tête : se compacte au défilement, menu mobile ;
     3. menu : lien de la section visible (aria-current) ;
     4. révélation discrète des éléments au défilement ;
     5. nom de l'en-tête : la graisse des lettres suit la souris ;
     6. cartes de réalisations : halo qui suit la souris ;
     7. parcours : commit sélectionné et filtre par branche ;
     8. contact : prépare l'e-mail, copie de l'adresse.
   Sans JavaScript, tout reste lisible ; avec « réduire les animations », rien ne bouge.
   ===================================================================== */
(function () {
  var racine = document.documentElement;
  var calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var souris = matchMedia('(pointer: fine)').matches;
  function tous(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

  /* 1. Thème (le <head> applique déjà le choix mémorisé avant l'affichage) */
  var theme = document.querySelector('.theme');
  if (theme) theme.addEventListener('click', function () {
    var actuel = racine.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var suivant = actuel === 'dark' ? 'light' : 'dark';
    racine.setAttribute('data-theme', suivant);
    try { localStorage.setItem('theme', suivant); } catch (e) {}
  });

  /* 2. En-tête compact + menu mobile */
  var entete = document.querySelector('.entete'), menu = document.querySelector('.menu'), nav = document.getElementById('nav');
  function compacter() { if (entete) entete.classList.toggle('compact', scrollY > 24); }
  addEventListener('scroll', compacter, { passive: true }); compacter();
  function fermer() { if (menu) { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('ouvert'); } }
  if (menu && nav) {
    menu.addEventListener('click', function () { var o = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', o); nav.classList.toggle('ouvert', o); });
    tous('a', nav).forEach(function (a) { a.addEventListener('click', fermer); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
  }

  /* 3. Menu : la section active est celle qui traverse le milieu de l'écran (pas la précédente) */
  var liens = tous('.nav a[data-s]');
  function activer(id) {
    liens.forEach(function (a) { if (a.getAttribute('data-s').split(' ').indexOf(id) > -1) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) activer(e.target.id); }); }, { rootMargin: '-45% 0px -54% 0px' });
    tous('main > section[id]').forEach(function (s) { obs.observe(s); });

    /* 4. Révélation au défilement (sans effet si « réduire les animations ») */
    var vus = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vu'); vus.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    tous('.rev').forEach(function (el) { vus.observe(el); });
  } else tous('.rev').forEach(function (el) { el.classList.add('vu'); });

  /* 5. Nom : graisse variable des lettres selon la distance à la souris (police Fraunces variable) */
  var lettres = tous('.hero-titre .mot .ch');
  if (lettres.length && souris && !calme) {
    var mx = -1e4, my = -1e4, prevu = false, visible = true;
    addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; if (!prevu && visible) { prevu = true; requestAnimationFrame(peindre); } }, { passive: true });
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(document.querySelector('.hero-titre'));
    function peindre() {
      prevu = false;
      lettres.forEach(function (c) {
        var r = c.getBoundingClientRect(), d = Math.hypot(r.left + r.width / 2 - mx, r.top + r.height / 2 - my);
        c.style.fontVariationSettings = '"wght" ' + Math.round(300 + 360 * Math.max(0, 1 - d / 280)) + ', "opsz" 144';
      });
    }
  }

  /* 6. Halo des cartes de réalisations */
  if (souris && !calme) tous('.real').forEach(function (c) {
    c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });

  /* 7. Parcours : sélection d'un commit et filtre par branche */
  var log = document.querySelector('.glog');
  if (log) {
    function choisir(li) {
      tous('.cm', log).forEach(function (o) { var on = o === li; if (on) o.setAttribute('aria-current', 'true'); else o.removeAttribute('aria-current'); o.querySelector('button').setAttribute('aria-expanded', on); });
    }
    tous('.cm > button', log).forEach(function (b) { b.addEventListener('click', function () { choisir(b.parentNode); }); });
    tous('.branches button').forEach(function (b) {
      b.addEventListener('click', function () {
        var choix = b.getAttribute('data-b'), visibles = [];
        tous('.branches button').forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
        log.classList.toggle('filtre', choix !== 'all');
        tous('.cm', log).forEach(function (li) { li.hidden = choix !== 'all' && li.getAttribute('data-b') !== choix; if (!li.hidden) visibles.push(li); });
        var etiquette = document.getElementById('git-branche'); if (etiquette) etiquette.textContent = choix === 'all' ? '--all' : choix;
        var courant = log.querySelector('.cm[aria-current]');
        if (!courant || courant.hidden) choisir(visibles[0]);
      });
    });
  }

  /* 8. Contact */
  var form = document.getElementById('form-contact');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nom = form.elements.nom.value.trim(), message = form.elements.message.value.trim();
    var sujet = form.getAttribute('data-objet') + (nom ? ' : ' + nom : '');
    location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(message + (nom ? '\n\n' + nom : ''));
  });
  var copier = document.getElementById('copier-email');
  if (copier) copier.addEventListener('click', function () {
    var adresse = copier.getAttribute('data-email'), texte = copier.textContent;
    function ok() { copier.textContent = copier.getAttribute('data-ok'); setTimeout(function () { copier.textContent = texte; }, 2200); }
    if (navigator.clipboard) navigator.clipboard.writeText(adresse).then(ok, function () { prompt('Adresse e-mail :', adresse); });
    else prompt('Adresse e-mail :', adresse);
  });
})();
