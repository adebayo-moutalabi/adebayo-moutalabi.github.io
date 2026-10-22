/* =====================================================================
   CONTACT : fenêtre de message (objet composé selon les boutons choisis,
   ouverture de la messagerie du visiteur, copie de l'adresse).
   Contenu : data/contact.js
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, toast = S.toast, C = S.data.contact;
  var needs = C.besoins, doms = C.domaines, selN = 0, selD = 0;

  $('#ch-need').innerHTML = needs.map(function (n, i) { return '<button type="button" data-n="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(n) + '</button>'; }).join('');
  $('#ch-dom').innerHTML = doms.map(function (n, i) { return '<button type="button" data-d="' + i + '" class="' + (i === doms.length - 1 ? 'ia' : '') + '" aria-pressed="' + (i === 0) + '">' + esc(n) + '</button>'; }).join('');
  function subj() { return needs[selN] + ' en ' + doms[selD] + C.objetSuffixe; }
  function paintMail() {
    $('#mw-subj').textContent = subj();
    $$('#ch-need button').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.n === selN); });
    $$('#ch-dom button').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.d === selD); });
  }
  $('#ch-need').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { selN = +b.dataset.n; paintMail(); } });
  $('#ch-dom').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { selD = +b.dataset.d; paintMail(); } });
  paintMail();

  $('#mailwin').addEventListener('submit', function (e) {   /* rien n'est envoyé par le site : on ouvre la messagerie du visiteur */
    e.preventDefault();
    var nm = $('#mw-name').value.trim(), msg = $('#mw-msg').value.trim();
    var body = C.salutation + '\n\n' + (msg || C.messageVide) + '\n\n' + (nm ? 'Cordialement,\n' + nm : '');
    location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subj()) + '&body=' + encodeURIComponent(body);
    toast('Votre messagerie s’ouvre. Sinon, copiez l’adresse.');
  });
  $('#copy-mail').addEventListener('click', function () {
    var b = this;
    function ok() { b.textContent = 'E‑mail copié'; b.classList.add('ok'); setTimeout(function () { b.textContent = 'Copier mon e‑mail'; b.classList.remove('ok'); }, 2000); }
    function sel() { var r = document.createRange(); r.selectNodeContents($('#mail')); var g = getSelection(); g.removeAllRanges(); g.addRange(r); toast('Adresse sélectionnée, copiez-la avec Ctrl+C'); }
    try { navigator.clipboard.writeText(C.email).then(ok, sel); } catch (e) { sel(); }
  });
})(window.Site);
