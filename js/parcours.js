/* =====================================================================
   PARCOURS : historique façon « git log --graph » (2 branches : expériences / formations),
   détail du commit à droite (sous la ligne sur mobile), et cartes de distinctions inclinables.
   Contenu : data/parcours.js
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, reduce = S.reduce, fine = S.fine, D = S.data.parcours;

  /* Chaque entrée reçoit un « hash » court, calculé à partir de son titre et de sa date */
  var CM = D.liste;
  CM.forEach(function (c) { var h = 2166136261; (c.titre + c.date).split('').forEach(function (ch) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }); c.h = ('0000000' + (h >>> 0).toString(16)).slice(-7); });

  var glog = $('#glog'), gshow = $('#gshow'), gwrap = $('#git'), gBranch = 'all', gSel = 0;
  function vis(c) { return gBranch === 'all' || c.branche === gBranch; }
  function isE(c) { return c.branche === 'experience'; }

  function drawLog() {
    var rows = CM.map(function (c, i) { return { c: c, i: i }; }).filter(function (r) { return vis(r.c); });
    var X = { formation: '30%', experience: '70%' };
    if (gBranch !== 'all') X = { formation: '50%', experience: '50%' };
    var first = {}, last = {};
    rows.forEach(function (r, k) { var b = r.c.branche; if (first[b] === undefined) first[b] = k; last[b] = k; });
    if (gBranch === 'all') first.formation = 0;
    glog.innerHTML = rows.map(function (r, k) {
      var c = r.c, svg = '';
      ['experience', 'formation'].forEach(function (b) {   /* lignes verticales des branches */
        if (first[b] === undefined) return;
        var cls = 'l-' + (b === 'experience' ? 'e' : 'f');
        if (gBranch === 'all' && b === 'formation' && k === 0) { svg += '<line class="l-f" x1="' + X.formation + '" y1="100%" x2="' + X.experience + '" y2="50%"/>'; return; }
        if (k > first[b] && k <= last[b]) svg += '<line class="' + cls + '" x1="' + X[b] + '" y1="0" x2="' + X[b] + '" y2="50%"/>';
        if (k >= first[b] && k < last[b]) svg += '<line class="' + cls + '" x1="' + X[b] + '" y1="50%" x2="' + X[b] + '" y2="100%"/>';
      });
      var head = k === 0, e = isE(c);
      svg += '<circle cx="' + X[c.branche] + '" cy="50%" r="' + (head ? 8 : 6) + '" style="fill:' + (e ? 'var(--gold)' : 'var(--ground)') + ';stroke:' + (e ? 'var(--gold)' : 'var(--line-art)') + ';stroke-width:2"/>';
      if (head) svg += '<circle cx="' + X[c.branche] + '" cy="50%" r="13" style="fill:none;stroke:var(--gold);stroke-opacity:.35;stroke-width:1.5"/>';
      return '<li class="cm" data-i="' + r.i + '"' + (r.i === gSel ? ' aria-current="true"' : '') + '><button type="button" aria-expanded="' + (r.i === gSel) + '"><span class="lane" aria-hidden="true"><svg>' + svg + '</svg></span><span class="cm-main"><span class="cm-top"><span class="hash">' + c.h + '</span>' + (head ? '<span class="ref h">HEAD</span>' : '') + '<span class="ref ' + (e ? 'e' : 'f') + '">' + c.branche + '</span>' + (c.fusion && gBranch === 'all' ? '<span>merge</span>' : '') + (c.premier ? '<span>initial commit</span>' : '') + '</span><span class="cm-msg">' + esc(c.titre) + '</span><span class="cm-org">' + esc(c.lieu) + '</span></span><span class="cm-date">' + esc(c.date) + '</span></button></li>';
    }).join('');
    if (!vis(CM[gSel])) gSel = rows[0].i;
    show(gSel, false);
  }

  function show(i, anim) {   /* détail d'un commit */
    gSel = i; var c = CM[i], e = isE(c), cl = e ? 'e' : 'f';
    $$('#glog .cm').forEach(function (li) { var on = +li.dataset.i === i; li.setAttribute('aria-current', on); li.querySelector('button').setAttribute('aria-expanded', on); });
    gshow.innerHTML = '<div class="gs-head"><span class="l1">commit ' + c.h + '<span class="ref ' + cl + '">' + c.branche + '</span></span><dl><dt>Auteur</dt><dd>' + esc(D.auteur) + '</dd><dt>Date</dt><dd>' + esc(c.date) + '</dd><dt>Lieu</dt><dd>' + esc(c.lieu) + '</dd><dt>Type</dt><dd>' + esc(c.type) + '</dd></dl></div>' +
      '<div class="gs-body"><h3>' + esc(c.titre) + '</h3><p>' + esc(c.resume) + '</p><div class="diff"><div class="dh">' + (e ? 'realisations.md' : 'programme.md') + ' · ' + c.points.length + ' ajout' + (c.points.length > 1 ? 's' : '') + '</div>' + c.points.map(function (t, k) { return '<div class="add" style="animation-delay:' + (k * 80) + 'ms">' + esc(t) + '</div>'; }).join('') + '</div></div>';
    if (anim) { gshow.classList.remove('anim'); void gshow.offsetWidth; gshow.classList.add('anim'); }
    var li = glog.querySelector('.cm[data-i="' + i + '"]');
    if (innerWidth <= 900) { if (li) li.appendChild(gshow); }   /* mobile : le détail s'ouvre sous la ligne */
    else if (gshow.parentNode !== gwrap) gwrap.appendChild(gshow);
  }

  glog.addEventListener('click', function (e) { var li = e.target.closest('.cm'); if (!li || e.target.closest('#gshow')) return; show(+li.dataset.i, true); });
  $$('#branches button').forEach(function (b) {
    b.addEventListener('click', function () {
      gBranch = b.dataset.b; $$('#branches button').forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      $('#gcmd').innerHTML = 'git log --graph ' + (gBranch === 'all' ? '<b>--all</b>' : '<b>' + esc(gBranch) + '</b>');
      drawLog();
    });
  });
  var gNarrow = innerWidth <= 900;
  addEventListener('resize', function () { var n = innerWidth <= 900; if (n !== gNarrow) { gNarrow = n; show(gSel, false); } });
  drawLog();

  /* ----- distinctions : cartes qui s'inclinent vers la souris (ordinateur) ----- */
  if (fine && !reduce) $$('.tk').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.classList.add('tilting'); c.style.setProperty('--ry', ((x - .5) * 9).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 7).toFixed(2) + 'deg');
      c.style.setProperty('--gx', (x * 100) + '%'); c.style.setProperty('--gy', (y * 100) + '%');
    });
    c.addEventListener('pointerleave', function () { c.classList.remove('tilting'); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
  });
})(window.Site);
