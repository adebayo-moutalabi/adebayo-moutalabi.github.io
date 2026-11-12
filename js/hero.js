/* =====================================================================
   OUVERTURE : lettres qui réagissent à la souris, photo en « lentille »
   qui s'agrandit au défilement.
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, esc = S.esc, clamp = S.clamp, reduce = S.reduce, fine = S.fine;

  /* ----- lettres + lentille ----- */
  var r1 = $('#r1'), r2 = $('#r2');
  [r1, r2].forEach(function (r) { r.innerHTML = r.textContent.split('').map(function (c) { return '<span class="ch">' + c + '</span>'; }).join(''); });
  var chars = $$('.name .ch');
  var intro = $('#intro'), lens = $('#lens'), img = $('#lens-img'), over = $('#over'), foot = $('#foot'), orbit = $('.orbit');
  var mx = -9999, my = -9999, px = 0, py = 0, tpx = 0, tpy = 0, prog = 0;

  if (fine && !reduce) {
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; tpx = (e.clientX / innerWidth - .5); tpy = (e.clientY / innerHeight - .5); });
    (function loop() {
      px += (tpx - px) * .08; py += (tpy - py) * .08;
      if (prog < .2) {
        chars.forEach(function (c) {   /* épaisseur des lettres selon la distance à la souris */
          var r = c.getBoundingClientRect(), d = Math.hypot(r.left + r.width / 2 - mx, r.top + r.height / 2 - my);
          var w = 300 + 400 * Math.max(0, 1 - d / 260);
          c.style.fontVariationSettings = '"wght" ' + w.toFixed(0) + ', "opsz" 144';
        });
        lens.style.transform = 'translate(' + (px * 30) + 'px,' + (py * 30) + 'px)';
        img.style.transform = 'scale(1.06) translate(' + (-px * 14) + 'px,' + (-py * 14) + 'px)';
      } else { lens.style.transform = ''; }
      requestAnimationFrame(loop);
    })();
  }

  function frameIntro() {   /* appelé à chaque défilement */
    var vh = innerHeight, vw = innerWidth, ir = intro.getBoundingClientRect();
    prog = clamp(-ir.top / (ir.height - vh));
    if (reduce) return;
    var small = vw <= 700, base = small ? vw * .58 : Math.min(vw * .32, 300);
    var e = clamp((prog - .1) / .72); e = e * e * (3 - 2 * e);
    var size = base + (Math.hypot(vw, vh) - base) * e;
    lens.style.width = size + 'px';
    orbit.style.opacity = 1 - clamp(e * 3);
    var shift = small ? 0 : 60;
    r1.style.transform = 'translateX(' + (-prog * (small ? 110 : shift)) + 'vw)';
    r2.style.transform = 'translateX(' + (prog * (small ? 110 : shift)) + 'vw)';
    foot.style.opacity = 1 - clamp(e * 2.5);
    over.style.opacity = clamp((e - .72) / .22);
  }
  S.frames.push(frameIntro);

})(window.Site);
