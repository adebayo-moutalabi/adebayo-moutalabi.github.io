/* =====================================================================
   LABO : onglets + 4 démos (autoscaling Kubernetes, pipeline CI/CD,
   agent IA de démo, architecture AWS). Les textes viennent de data/labo.js.
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, reduce = S.reduce, toast = S.toast, L = S.data.labo;

  /* ----- onglets ----- */
  $$('.lab-tabs button').forEach(function (t) {
    t.addEventListener('click', function () {
      $$('.lab-tabs button').forEach(function (o) { o.setAttribute('aria-selected', o === t); $('#p-' + o.dataset.p).hidden = o !== t; });
      var p = $('#p-' + t.dataset.p); p.classList.remove('panel-anim'); void p.offsetWidth; p.classList.add('panel-anim');
    });
  });

  /* ----- 1. Kubernetes : curseur de charge -> nombre de pods ----- */
  var podsEl = $('#pods'), cpu = $('#cpu');
  for (var i = 0; i < 12; i++) { var d = document.createElement('div'); d.className = 'pod'; d.textContent = 'pod ' + (i + 1); podsEl.appendChild(d); }
  function hpa() {
    var v = +cpu.value, n = Math.max(1, Math.min(12, Math.ceil(v * 12 / 100 * (100 / 60) / 1.7)));
    cpu.style.setProperty('--v', ((v - 5) / 95 * 100) + '%');
    $('#cpu-v').textContent = v + ' %'; $('#pods-v').textContent = n + (n > 1 ? ' pods' : ' pod');
    Array.prototype.forEach.call(podsEl.children, function (p, k) { p.classList.toggle('on', k < n); });
  }
  cpu.addEventListener('input', hpa); hpa();

  /* ----- 2. CI/CD : pipeline animé ----- */
  var ST = L.ci.etapes, pipe = $('#pipe');
  pipe.innerHTML = ST.map(function (s, k) { return '<div class="step done" id="st' + k + '"><span class="dot">✓</span><span>' + esc(s.nom) + '</span><span class="t">' + esc(s.duree) + '</span></div>'; }).join('');
  $('#pbar').style.width = '100%';
  var ciBusy = false;
  $('#run-ci').addEventListener('click', function () {
    if (ciBusy) return; ciBusy = true; var btn = this; btn.textContent = L.ci.boutonEnCours;
    ST.forEach(function (s, k) { var e = $('#st' + k); e.className = 'step'; e.querySelector('.t').textContent = '—'; });
    $('#pbar').style.width = '0';
    var k = 0;
    (function next() {
      if (k > 0) { var p = $('#st' + (k - 1)); p.className = 'step done'; p.querySelector('.t').textContent = ST[k - 1].duree; }
      $('#pbar').style.width = (k / ST.length * 100) + '%';
      if (k >= ST.length) { ciBusy = false; btn.textContent = L.ci.boutonRelancer; toast(L.ci.messageFin); return; }
      var c = $('#st' + k); c.className = 'step run'; c.querySelector('.t').textContent = 'en cours';
      k++; setTimeout(next, reduce ? 150 : 850);
    })();
  });

  /* ----- 3. Agent IA : questions / réponses préparées ----- */
  var QA = L.ia.questions, chat = $('#chat'), qs = $('#qs'), asked = {};
  function drawQs() { qs.innerHTML = QA.map(function (q, k) { return '<button type="button" data-i="' + k + '"' + (asked[k] ? ' disabled' : '') + '>' + esc(q.question) + '</button>'; }).join(''); }
  drawQs();
  qs.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) return;
    var k = +b.dataset.i; asked[k] = 1; drawQs();
    $$('#qs button').forEach(function (x) { x.disabled = true; });
    var m = document.createElement('div'); m.className = 'msg me'; m.textContent = QA[k].question; chat.appendChild(m);
    var t = document.createElement('div'); t.className = 'msg bot'; t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>'; chat.appendChild(t);
    chat.scrollTop = chat.scrollHeight;
    setTimeout(function () { t.innerHTML = QA[k].reponse; chat.scrollTop = chat.scrollHeight; drawQs(); }, reduce ? 100 : 900);
  });

  /* ----- 4. AWS : interrupteurs de briques ----- */
  var LY = L.aws.briques, layersEl = $('#layers');
  layersEl.innerHTML = LY.map(function (l, k) { return '<div class="layer"><span>' + esc(l.nom) + '<small>' + esc(l.detail) + '</small></span><button type="button" class="sw" role="switch" id="sw' + k + '" aria-checked="' + (!!l.actif) + '" aria-label="Activer ' + esc(l.nom) + '"></button></div>'; }).join('');
  function arch() {
    var on = $$('.sw').filter(function (s) { return s.getAttribute('aria-checked') === 'true'; }).length;
    $('#arch').innerHTML = on === LY.length ? '<b>' + esc(L.aws.messageComplet.split('.')[0]) + '.</b> ' + esc(L.aws.messageComplet.split('. ').slice(1).join('. ')) : '<b>' + on + ' / ' + LY.length + '</b> briques activées. Activez-les toutes pour compléter l\'architecture.';
  }
  layersEl.addEventListener('click', function (e) { var s = e.target.closest('.sw'); if (!s) return; s.setAttribute('aria-checked', s.getAttribute('aria-checked') !== 'true'); arch(); if ($$('.sw[aria-checked="true"]').length === LY.length) toast(L.aws.messageFin); });
  arch();
})(window.Site);
