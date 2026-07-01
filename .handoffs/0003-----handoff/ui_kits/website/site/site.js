/* ============================================================
   Zuza Prague Tours — full site, shared behavior
   Injects header + footer, marks the current page, handles the
   solid-on-scroll header, scroll reveals, and the mobile menu.
   Each page: <body class="home|inner" data-page="tours"> and empty
   <header class="nav ..." id="nav"></header> + <footer id="footer">.
   ============================================================ */
(function () {
  var FUNNEL = '../review-funnel.html';
  var NAV = [
    { key: 'tours',   label: 'Touren',       href: 'tours.html' },
    { key: 'zuzana',  label: 'Über Zuzana',  href: 'zuzana.html' },
    { key: 'blog',    label: 'Journal',      href: 'blog.html' },
    { key: 'kontakt', label: 'Kontakt',      href: 'kontakt.html' }
  ];
  var page = document.body.dataset.page || '';

  /* ---- Header ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    var links = NAV.map(function (n) {
      var cur = n.key === page ? ' current' : '';
      return '<a class="' + cur.trim() + '" href="' + n.href + '">' + n.label + '</a>';
    }).join('');
    nav.innerHTML =
      '<a class="nav__brand" href="index.html">Zuza <b>&amp;</b> Pragtour</a>' +
      '<nav class="nav__links">' + links +
        '<a href="kontakt.html" class="nav__cta">Tour buchen</a>' +
      '</nav>' +
      '<details class="m-menu"><summary aria-label="Menü öffnen"><span></span><span></span><span></span></summary>' +
        '<div class="m-menu__panel">' +
          NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }).join('') +
          '<a href="kontakt.html">Tour buchen</a>' +
        '</div>' +
      '</details>';
  }

  /* ---- Footer ---- */
  var footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML =
      '<div class="shell">' +
        '<div class="footer__top">' +
          '<div>' +
            '<div class="footer__brand">Zuza <b>&amp;</b> Pragtour</div>' +
            '<p class="tag">Erleben Sie Prag mit Ihrer deutschsprachigen Expertin und Spezialistin für Prag-Führungen.</p>' +
            '<a class="btn cream sm" href="tours.html" style="display:flex;width:-webkit-fit-content;width:fit-content;margin-bottom:1.1rem">Meine Touren ansehen <span class="material-symbols-outlined">arrow_forward</span></a>' +
            '<a class="ulink" style="color:var(--gold-lamp)" href="https://www.tripadvisor.de" target="_blank" rel="noopener">4,9 ★ TripAdvisor</a>' +
          '</div>' +
          '<div class="footer__col"><h4>Kontakt</h4>' +
            '<a href="tel:+420721231933">+420 721 231 933</a>' +
            '<a href="mailto:zuzanamanova@email.cz">zuzanamanova@email.cz</a>' +
            '<a href="https://wa.me/420721231933" target="_blank" rel="noopener">WhatsApp</a>' +
          '</div>' +
          '<div class="footer__col"><h4>Schnelllinks</h4>' +
            '<a href="index.html">Startseite</a>' +
            '<a href="tours.html">Touren</a>' +
            '<a href="zuzana.html">Über Zuzana</a>' +
            '<a href="blog.html">Journal</a>' +
            '<a href="kontakt.html">Tour buchen</a>' +
          '</div>' +
          '<div class="footer__col"><h4>Mehr</h4>' +
            '<a href="' + FUNNEL + '">Bewertung abgeben</a>' +
            '<a href="https://www.instagram.com/erlebnis_tour_prag/" target="_blank" rel="noopener">@erlebnis_tour_prag</a>' +
            '<a href="https://www.tripadvisor.de" target="_blank" rel="noopener">TripAdvisor</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<p>© 2026 Zuza Prague Tours – Zuzana Manová. Alle Rechte vorbehalten.</p>' +
          '<div style="display:flex;gap:1.5rem">' +
            '<a href="privacy.html">Datenschutz</a><a href="terms.html">AGB</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---- Solid-on-scroll (home only; inner pages ship solid) ---- */
  if (nav && document.body.classList.contains('home')) {
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.7); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll reveals (with fail-safe) ---- */
  var reveals = document.querySelectorAll('.reveal');
  var revealAll = function () { reveals.forEach(function (el) { el.classList.add('in'); }); };
  if (!('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(revealAll, 1500);
  }
})();
