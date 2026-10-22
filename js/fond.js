/* =====================================================================
   FOND : constellation de points qui change de forme selon la section visible
   (attribut data-shape de chaque section) et s'écarte de la souris.
   ===================================================================== */
(function (S) {
  var $ = S.$, $$ = S.$$, reduce = S.reduce, fine = S.fine;
  var sky = $('#sky'), sc = sky.getContext('2d'), SW = 0, SH = 0, DPR = Math.min(2, devicePixelRatio || 1);
  var NP = innerWidth < 700 ? 100 : 160, pts = [], curShape = '', smx = -9999, smy = -9999, rotY = 0, rotX = -0.25, colors = {};
  function readCols() { var cs = getComputedStyle(document.documentElement); colors = { gold: cs.getPropertyValue('--gold').trim(), line: cs.getPropertyValue('--line-art').trim(), blue: cs.getPropertyValue('--blue').trim() }; }
  readCols();
  new MutationObserver(readCols).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: light)').addEventListener && matchMedia('(prefers-color-scheme: light)').addEventListener('change', readCols);
  function sizeSky() { SW = innerWidth; SH = innerHeight; sky.width = SW * DPR; sky.height = SH * DPR; sc.setTransform(DPR, 0, 0, DPR, 0, 0); }
  sizeSky(); addEventListener('resize', sizeSky);
  var SHAPES = {
    sphere: function (i, n) { var y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996; return [Math.cos(t) * r, y, Math.sin(t) * r]; },
    ring: function (i, n) { var t = i / n * Math.PI * 2, w = (i % 3 - 1) * .07; return [Math.cos(t) * (1.05 + w), Math.sin(i * 1.7) * .08, Math.sin(t) * (1.05 + w)]; },
    cube: function (i, n) { var e = i % 12, k = ((i / 12) | 0) / Math.ceil(n / 12) * 2 - 1, a = .78, E = [[k, -1, -1], [k, 1, -1], [k, -1, 1], [k, 1, 1], [-1, k, -1], [1, k, -1], [-1, k, 1], [1, k, 1], [-1, -1, k], [1, -1, k], [-1, 1, k], [1, 1, k]][e]; return [E[0] * a, E[1] * a, E[2] * a]; },
    galaxy: function (i, n) { var arm = i % 3, d = (i / n), t = d * 5.2 + arm * 2.094, r = .15 + d * 1.15; return [Math.cos(t) * r, Math.sin(i * 12.9) * .06 * (1.3 - d), Math.sin(t) * r]; },
    helix: function (i, n) { var s = i % 2, k = (i >> 1) / (n / 2), t = k * Math.PI * 5 + s * Math.PI; return [Math.cos(t) * .55, k * 2.2 - 1.1, Math.sin(t) * .55]; },
    wave: function (i, n) { var c = Math.ceil(Math.sqrt(n)), x = (i % c) / (c - 1) * 2.4 - 1.2, z = ((i / c) | 0) / (c - 1) * 2.4 - 1.2; return [x, Math.sin(x * 2.4) * .22 + Math.cos(z * 2.1) * .18, z]; },
    torus: function (i, n) { var u = i / n * Math.PI * 2 * 9, v = i / n * Math.PI * 2; return [(1 + .36 * Math.cos(u)) * Math.cos(v) * .82, .36 * Math.sin(u) * .82, (1 + .36 * Math.cos(u)) * Math.sin(v) * .82]; }
  };
  for (var q = 0; q < NP; q++) { var p0 = SHAPES.sphere(q, NP); pts.push({ x: p0[0] * 1.6, y: p0[1] * 1.6, z: p0[2] * 1.6, tx: p0[0], ty: p0[1], tz: p0[2], c: q % 23 === 0 ? 'blue' : q % 5 === 0 ? 'gold' : 'line', sx: 0, sy: 0, ox: 0, oy: 0 }); }
  function setShape(name) {
    if (name === curShape || !SHAPES[name]) return; curShape = name;
    pts.forEach(function (p, i) { var t = SHAPES[name](i, NP); p.tx = t[0]; p.ty = t[1]; p.tz = t[2]; });
    if (reduce) drawSky(0);
  }
  function skyShape() {
    var best = 'sphere';
    $$('[data-shape]').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight * .55 && r.bottom > innerHeight * .45) best = el.dataset.shape; });
    setShape(best);
  }
  if (fine) addEventListener('mousemove', function (e) { smx = e.clientX; smy = e.clientY; });
  function drawSky(dt) {
    sc.clearRect(0, 0, SW, SH);
    if (!reduce) rotY += dt * .00012 + (smx > 0 ? ((smx / SW) - .5) * .0009 : 0);
    var cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
    var R = Math.min(SW, SH) * (SW < 700 ? .62 : .42), ox = SW * (SW < 700 ? .5 : .62), oy = SH * .5;
    for (var i = 0; i < NP; i++) {
      var p = pts[i], k = reduce ? 1 : .045;
      p.x += (p.tx - p.x) * k; p.y += (p.ty - p.y) * k; p.z += (p.tz - p.z) * k;
      var x1 = p.x * cy - p.z * sy, z1 = p.x * sy + p.z * cy, y1 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
      var f = 2.6 / Math.max(1.2, 2.6 + z2);
      var X = ox + x1 * R * f, Y = oy + y1 * R * f;
      var dx = X - smx, dy = Y - smy, d = Math.hypot(dx, dy);
      if (d < 120 && d > 0) { var push = (1 - d / 120) * 26; p.ox += (dx / d * push - p.ox) * .2; p.oy += (dy / d * push - p.oy) * .2; } else { p.ox *= .92; p.oy *= .92; }
      p.sx = X + p.ox; p.sy = Y + p.oy; p.f = f; p.z2 = z2;
    }
    var L = SW < 700 ? 70 : 96;
    sc.lineWidth = .7;
    for (var a = 0; a < NP; a++) {
      var A = pts[a];
      for (var b = a + 1; b < NP; b++) {
        var B = pts[b], ddx = A.sx - B.sx; if (ddx > L || ddx < -L) continue;
        var ddy = A.sy - B.sy; if (ddy > L || ddy < -L) continue;
        var dd = Math.sqrt(ddx * ddx + ddy * ddy); if (dd > L) continue;
        sc.globalAlpha = (1 - dd / L) * .32 * Math.min(1, (A.f + B.f) * .45);
        sc.strokeStyle = colors.line; sc.beginPath(); sc.moveTo(A.sx, A.sy); sc.lineTo(B.sx, B.sy); sc.stroke();
      }
    }
    for (var c = 0; c < NP; c++) {
      var P = pts[c], r = Math.max(.4, (P.c === 'line' ? 1.3 : 2) * P.f);
      sc.globalAlpha = Math.max(.15, Math.min(.95, .35 + (1 - P.z2) * .35));
      sc.fillStyle = colors[P.c]; sc.beginPath(); sc.arc(P.sx, P.sy, r, 0, 6.283); sc.fill();
    }
    sc.globalAlpha = 1;
  }
  var lastT = performance.now();
  (function skyLoop(t) {
    if (!document.hidden && !reduce) { drawSky(Math.min(50, t - lastT)); }
    lastT = t; if (!reduce) requestAnimationFrame(skyLoop);
  })(lastT);
  if (reduce) { pts.forEach(function (p) { p.x = p.tx; p.y = p.ty; p.z = p.tz; }); drawSky(0); addEventListener('resize', function () { drawSky(0); }); }
  S.frames.push(skyShape);
})(window.Site);
