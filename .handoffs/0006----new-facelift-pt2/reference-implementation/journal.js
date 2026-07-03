/* ============================================================
   Zuza Prague Tours — Journal engine (magazine build)
   Renders article.html?slug=… and the blog index from
   window.JOURNAL. Features: numbered Leaflet maps + dotted
   walking routes (Carto Positron tiles) with a synced itinerary,
   meta facts bar, "Gut zu wissen" fact boxes, galleries, a sticky
   scroll-spy table of contents, a reading-progress bar and a
   back-to-top button. Pairs with article.css.
   ============================================================ */
(function () {
  var IMG = 'assets/images/';
  var J = window.JOURNAL || [];
  var bySlug = {};
  J.forEach(function (a) { bySlug[a.slug] = a; });

  function qparam(k) { return new URLSearchParams(location.search).get(k); }
  function stripTags(s) { return (s || '').replace(/<[^>]+>/g, ''); }
  function slugify(s) {
    return stripTags(s).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  /* ---------- block → HTML ---------- */
  function stopsList(points) {
    return '<ol class="stops">' + points.map(function (p, i) {
      return '<li><span class="n">' + (i + 1) + '</span><div><div class="t">' + p.label + '</div>' + (p.note ? '<div class="d">' + p.note + '</div>' : '') + '</div></li>';
    }).join('') + '</ol>';
  }
  function renderBlocks(blocks, ctx) {
    return (blocks || []).map(function (b) {
      switch (b.t) {
        case 'p': return '<p' + (b.first ? ' class="first"' : '') + '>' + b.html + '</p>';
        case 'h2':
          var id = slugify(b.html); ctx.toc.push({ id: id, label: stripTags(b.html) });
          return '<h2 id="' + id + '">' + b.html + '</h2>';
        case 'quote': return '<blockquote class="pq"><p>' + b.html + '</p>' + (b.by ? '<span class="by">— ' + b.by + '</span>' : '') + '</blockquote>';
        case 'callout': return '<aside class="callout"><div class="l">' + (b.label || 'Tipp') + '</div>' + (b.html || '') + (b.list ? '<ul>' + b.list.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>' : '') + '</aside>';
        case 'list': return '<ul>' + b.items.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
        case 'facts': return '<div class="facts"><div class="facts__h">' + (b.title || 'Gut zu wissen') + '</div><div class="facts__b">' + b.items.map(function (it) { return '<div class="facts__row"><span class="facts__k">' + it.k + '</span><span class="facts__v">' + it.v + '</span></div>'; }).join('') + '</div></div>';
        case 'ornament': return '<div class="ornament"><span class="r"></span><span class="g">&#10086;</span><span class="r"></span></div>';
        case 'figure': return '<figure class="a-figure" style="margin:2.4em 0"><img src="' + IMG + b.img + '" alt="' + (b.alt || '') + '">' + (b.cap ? '<figcaption>' + b.cap + '</figcaption>' : '') + '</figure>';
        case 'gallery': return '<figure class="gallery2"><div class="gallery2__row">' + b.images.map(function (g) { return '<img src="' + IMG + g.img + '" alt="' + (g.alt || '') + '">'; }).join('') + '</div>' + (b.cap ? '<figcaption>' + b.cap + '</figcaption>' : '') + '</figure>';
        case 'map':
          var idx = ctx.maps.length; ctx.maps.push(b);
          return '<div class="jmap-wrap">' +
            '<div class="jmap-title">' + (b.title || 'Karte') + '</div>' +
            '<div class="jmap" id="jmap-' + idx + '"></div>' +
            (b.cap ? '<div class="jmap-cap">' + b.cap + '</div>' : '') +
            (b.list && b.points ? stopsList(b.points) : '') +
            '</div>';
        default: return '';
      }
    }).join('');
  }

  /* ---------- Leaflet ---------- */
  function initMap(node, spec) {
    if (typeof L === 'undefined') { fallbackMap(node, spec); return; }
    var map = L.map(node, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19
    }).addTo(map);
    var pts = spec.points || [], latlngs = [];
    pts.forEach(function (p, i) {
      var icon = L.divIcon({ className: 'jmark-wrap', html: '<span class="jmark">' + (i + 1) + '</span>', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -15] });
      L.marker(p.coord, { icon: icon }).addTo(map)
        .bindPopup('<span class="pop-t">' + (i + 1) + '. ' + p.label + '</span>' + (p.note ? '<span class="pop-n">' + p.note + '</span>' : ''));
      latlngs.push(p.coord);
    });
    if (spec.route && latlngs.length > 1) {
      L.polyline(latlngs, { color: '#6B1F2A', weight: 3, opacity: 0.85, dashArray: '1 9', lineCap: 'round' }).addTo(map);
    }
    if (latlngs.length > 1) { map.fitBounds(latlngs, { padding: [45, 45], maxZoom: 16 }); }
    else if (latlngs.length === 1) { map.setView(latlngs[0], spec.zoom || 15); }
    else if (spec.center) { map.setView(spec.center, spec.zoom || 14); }
  }
  function fallbackMap(node, spec) {
    node.style.height = 'auto'; node.style.padding = '1.4rem';
    node.innerHTML = '<ul style="margin:0;padding:0;list-style:none;font-family:var(--font-body);color:var(--ink-soft)">' +
      (spec.points || []).map(function (p, i) { return '<li style="padding:.3rem 0"><strong>' + (i + 1) + '. ' + p.label + '</strong>' + (p.note ? ' — ' + p.note : '') + '</li>'; }).join('') + '</ul>';
  }

  /* ---------- related ---------- */
  function relatedCards(slugs) {
    return (slugs || []).map(function (s) {
      var a = bySlug[s]; if (!a) return '';
      return '<a class="mcard" href="article.html?slug=' + a.slug + '"><img src="' + IMG + a.hero + '" alt=""><span class="cat">' + a.category + '</span><h4 class="display">' + a.titlePlain + '</h4><p>' + (a.cardBlurb || '') + '</p></a>';
    }).join('');
  }

  /* ---------- ARTICLE ---------- */
  function renderArticle() {
    var root = document.getElementById('articleRoot');
    if (!root) return;
    var a = bySlug[qparam('slug')] || J[0];
    if (!a) { root.innerHTML = '<div class="shell j-empty">Beitrag nicht gefunden. <a href="blog.html" style="color:var(--burgundy)">Zum Journal</a></div>'; return; }
    document.title = a.titlePlain + ' · Zuza Prague Tours';
    var ctx = { maps: [], toc: [] };
    var body = renderBlocks(a.blocks, ctx);
    var related = (a.related && a.related.length ? a.related : J.filter(function (x) { return x.slug !== a.slug; }).slice(0, 3).map(function (x) { return x.slug; }));

    var metaBar = a.meta ? '<div class="a-meta">' + a.meta.map(function (m) { return '<div><div class="k">' + m.k + '</div><div class="v">' + m.v + '</div></div>'; }).join('') + '</div>' : '';
    var toc = ctx.toc.length > 1 ? '<nav class="toc"><div class="toc__h">Inhalt</div><ol>' + ctx.toc.map(function (h) { return '<li><a class="toc__link" href="#' + h.id + '" data-target="' + h.id + '">' + h.label + '</a></li>'; }).join('') + '</ol></nav>' : '';
    var railFacts = a.railFacts ? '<div class="facts"><div class="facts__h">' + (a.railFacts.title || 'Auf einen Blick') + '</div><div class="facts__b">' + a.railFacts.items.map(function (it) { return '<div class="facts__row"><span class="facts__k">' + it.k + '</span><span class="facts__v">' + it.v + '</span></div>'; }).join('') + '</div></div>' : '';

    root.innerHTML =
      '<article>' +
        '<header class="a-head"><div class="shell shell--prose">' +
          '<span class="crumb"><a href="blog.html">Journal</a> <span>/</span> ' + a.category + '</span>' +
          '<div class="a-kick"><span>' + a.category + '</span><span class="r"></span><span>' + a.readTime + ' Lesezeit</span></div>' +
          '<h1>' + a.title + '</h1>' +
          '<p class="a-stand">' + a.standfirst + '</p>' +
          '<div class="a-byline"><img src="' + IMG + 'zuzana-portrait.jpg" alt="Zuzana Manová"><div><div class="n">Ing. Zuzana Manová</div><div class="r">Zertifizierte Stadtführerin · ' + a.date + '</div></div></div>' +
          metaBar +
        '</div><div class="shell"><figure class="a-figure"><img src="' + IMG + a.hero + '" alt="' + a.titlePlain + '">' + (a.heroCap ? '<figcaption>' + a.heroCap + '</figcaption>' : '') + '</figure></div></header>' +
        '<div class="a-body"><div class="shell"><div class="a-layout">' +
          '<div class="a-col">' + body + '</div>' +
          '<aside class="a-rail"><div class="a-rail__sticky">' + toc + railFacts + '<a class="btn solid a-rail__cta" href="kontakt.html">Tour anfragen</a></div></aside>' +
        '</div></div></div>' +
      '</article>' +
      '<section class="a-foot"><div class="shell"><div class="a-foot__cta">' +
        '<h3>' + (a.ctaTitle || 'Möchten Sie das selbst erleben?') + '</h3>' +
        '<p>' + (a.ctaText || 'Begrenzte Verfügbarkeit für private Führungen. Schreiben Sie mir, und wir finden den richtigen Tag.') + '</p>' +
        '<a href="kontakt.html" class="btn solid">Tour anfragen <span class="material-symbols-outlined">arrow_forward</span></a>' +
      '</div></div></section>' +
      '<section class="a-more"><div class="shell"><span class="kicker">Weiterlesen im Journal</span><div class="a-more__grid">' + relatedCards(related) + '</div></div></section>';

    ctx.maps.forEach(function (spec, i) { var n = document.getElementById('jmap-' + i); if (n) initMap(n, spec); });
    setupReading(ctx.toc);
  }

  /* ---------- reading progress + scroll-spy + back-to-top ---------- */
  function setupReading(toc) {
    var bar = document.querySelector('.read-progress');
    var top = document.querySelector('.to-top');
    var art = document.querySelector('article');
    var links = [].slice.call(document.querySelectorAll('.toc__link'));
    var heads = toc.map(function (h) { return document.getElementById(h.id); }).filter(Boolean);
    var ticking = false;

    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        if (bar && art) {
          var start = art.offsetTop, h = art.offsetHeight - window.innerHeight;
          var p = h > 0 ? (window.scrollY - start) / h : 0;
          bar.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
        }
        if (top) top.classList.toggle('show', window.scrollY > window.innerHeight);
        if (heads.length) {
          var active = heads[0], mid = 140;
          for (var i = 0; i < heads.length; i++) { if (heads[i].getBoundingClientRect().top <= mid) active = heads[i]; }
          links.forEach(function (l) { l.classList.toggle('active', l.dataset.target === active.id); });
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    // smooth-scroll TOC clicks (offset for fixed nav)
    links.forEach(function (l) {
      l.addEventListener('click', function (e) {
        var t = document.getElementById(l.dataset.target);
        if (!t) return; e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
      });
    });
  }

  /* ---------- BLOG INDEX ---------- */
  function renderIndex() {
    var grid = document.getElementById('journalGrid');
    if (!grid) return;
    var feat = document.getElementById('journalFeature');
    var list = J.slice();
    var lead = list.shift();
    if (feat && lead) {
      feat.innerHTML = '<a class="j-feature" href="article.html?slug=' + lead.slug + '"><div class="j-feature__media"><img src="' + IMG + lead.hero + '" alt=""></div><div><span class="cat">' + lead.category + '</span><h2>' + lead.title + '</h2><p>' + (lead.cardBlurb || lead.standfirst) + '</p><span class="meta">' + lead.readTime + ' Lesezeit · ' + lead.date + '</span></div></a>';
    }
    grid.innerHTML = list.map(function (a, i) {
      var d = i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : '';
      return '<a class="post reveal' + d + '" href="article.html?slug=' + a.slug + '"><div class="post__media"><img src="' + IMG + a.hero + '" alt=""></div><span class="cat">' + a.category + '</span><h3 class="display">' + a.titlePlain + '</h3><p>' + (a.cardBlurb || '') + '</p><span class="meta">' + a.readTime + ' · ' + a.date + '</span></a>';
    }).join('');
    var cards = grid.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
      cards.forEach(function (c) { io.observe(c); });
      setTimeout(function () { cards.forEach(function (c) { c.classList.add('in'); }); }, 1500);
    } else { cards.forEach(function (c) { c.classList.add('in'); }); }
  }

  function boot() { renderArticle(); renderIndex(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
