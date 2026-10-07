/* Zuza & Pragtour · Admin "Klicks & Anfragen" — data layer (mock).
   Simulates anonymous visits with the event model of
   prague-tour-guide/src/utils/analytics.ts (page / click / enquiry · category ·
   label · page area · path · device) and aggregates them like
   prague-tour-guide/netlify/functions/stats.mjs — plus one extension the
   dashboard needs: every counter also records WHICH contact followed
   (after.enquiry / email / whatsapp / phone), not only "converted".
   Replace dataset()+aggregate() with the real /.netlify/functions/stats
   response once the backend returns this shape. */
(function (root) {
  const TOURS = [
    { slug: 'prager-burg', title: 'Prager Burg', w: 10 },
    { slug: 'altstadt-juedisches-viertel', title: 'Altstadt & Jüdisches Viertel', w: 9 },
    { slug: 'individuelle-privattour', title: 'Individuelle Privattour', w: 6 },
    { slug: 'verstecktes-prag', title: 'Verstecktes Prag', w: 5 },
    { slug: 'prag-deutsches-erbe', title: 'Prag – deutsches Erbe', w: 3 },
    { slug: 'vaclav-havel-tour-prag', title: 'Václav-Havel-Tour', w: 2 },
  ];
  const ARTICLES = [["guide-fuer-firmengruppe-prag-buchen","Einen Guide für die Firmengruppe in Prag buchen","Firmengruppe Prag","2026-09-19"],["was-man-in-prag-nicht-tun-sollte","Was man in Prag nicht tun sollte","Prag Reisetipps","2026-05-14"],["prague-visitor-pass-lohnt-sich-nicht","Prague Visitor Pass: 5 Gründe dagegen","Prague Visitor Pass","2026-05-01"],["tropfsteinwand-mala-strana-karlsbruecke-geheimtipps","Tropfsteinwand & Karlsbrücke: Geheimtipps","Tropfsteinwand Prag","2026-04-30"],["was-kann-man-in-prag-machen","Was kann man in Prag machen? Aktivitäten","was kann man in Prag machen","2026-04-26"],["beste-fotospots-prag","Die 12 schönsten Fotospots in Prag","beste Fotospots Prag","2026-04-26"],["ein-tag-in-prag-fuenf-orte","Ein Tag in Prag: Die 5 Orte, die sich lohnen","ein Tag in Prag","2026-04-25"],["bootsfahrt-prag-moldau","Bootsfahrt in Prag: Was die Moldau bietet","Bootsfahrt Prag","2026-04-25"],["drei-gaerten-kleinseite-prag","Drei verborgene Gärten in Malá Strana","Kleinseitner Gärten Prag","2026-04-16"],["waldstein-garten-prag","Waldsteingarten Prag: Tropfsteinwand & Barock","Waldsteingarten Prag","2026-04-16"],["oeffentlicher-verkehr-prag-tickets-apps","Öffentlicher Verkehr Prag: Tickets & Apps","ÖPNV Prag","2026-04-15"],["geld-wechseln-tschechische-kronen","Geld wechseln Prag: Revolut & Bankautomaten","Tschechische Krone","2026-04-14"],["alle-museen-in-prag-kompletter-guide","Prager Museen: Welche lohnen sich wirklich?","Prag Museen","2026-04-13"],["wie-man-den-besten-prag-stadtfuehrer-waehlt","Den richtigen Prag-Stadtführer finden","Prag Stadtführer","2026-04-13"],["prague-visitor-pass-ehrliche-bewertung","Prague Visitor Pass: Meine Empfehlung","Prague Visitor Pass","2026-04-13"],["prag-imax-kafka-grab-vinohrady-guide","Vinohrady: IMAX, Kafkas Grab & Bauernmarkt","IMAX Prag","2026-04-13"],["dan-brown-geheimnis-der-geheimnisse-prag","Dan Brown: Das Geheimnis der Geheimnisse","Dan Brown Prag","2026-04-13"],["prag-im-fruehling","Prag im Frühling: Die besten Aktivitäten","Prag im Frühling","2026-04-01"],["prag-im-sommer","Prag im Sommer: Was tun, sehen & essen","Prag im Sommer","2026-03-15"],["prag-im-herbst","Prag im Herbst: Goldenes Licht & Weinlese","Prag im Herbst","2026-03-01"],["prag-kulinarik-guide","Prag Kulinarik: Was essen & lokale Lieblinge","Prag Essen","2026-02-15"],["prager-burg-vollstaendiger-besucher-guide","Prager Burg: Vollständiger Besucherführer","Prager Burg","2026-02-01"],["beste-tagesausfluege-von-prag","Tagesausflüge von Prag: Kutná Hora & mehr","Tagesausflüge von Prag","2026-01-15"],["top-orte-in-prag-jetzt-besuchen","Top-Orte in Prag 2025: Was Sie sehen müssen","Was tun in Prag jetzt","2025-10-26"],["prag-schoenste-orte-aussichten-im-winter","Prag im Winter: Top 12 Aussichtspunkte","Prag im Winter","2025-10-25"],["strahov-kloster-prag","Strahov-Kloster: Bibliothek & Aussicht","Strahover Kloster","2025-10-19"],["franz-kafka-orte-in-prag","Franz Kafka in Prag: Alle Orte & Rundgang","Kafka","2025-10-19"],["vaclav-havel-prag-spaziergang-der-freiheit","Václav Havel in Prag: Der Weg der Freiheit","Geschichte","2025-10-18"],["klementinum-barock-bibliothek-prag","Prags schönste Bibliothek: das Klementinum","Klementinum","2025-10-18"],["klementinum-astronomical-tower-meridian-room","Klementinum: Astronomischer Turm & Aussicht","Klementinum","2025-10-18"],["top-prague-gardens-to-visit","Die schönsten Prager Gärten","Prager Gärten","2025-10-18"],["what-to-do-in-prague-in-november-2025","Was tun in Prag im November 2025?","Prag im November","2025-10-16"],["top-21-instagrammable-places-in-prague","Top 21 Instagram-taugliche Orte in Prag","Fotografie","2025-10-12"],["beste-reisezeit-prag","Beste Reisezeit für Prag: Ein Saisonführer","Reisetipps","2024-01-15"],["prag-geheimtipps-versteckte-orte","Prag Geheimtipps: Realistisch & schön","Geheimtipps","2024-01-08"],["prague-at-night-magical-experience","Prag bei Nacht: Ein magisches Erlebnis","Nachtführungen","2024-01-01"],["juedisches-viertel-prag-geschichte-und-erbe","Das Jüdische Viertel: Geschichte und Erbe","Geschichte","2023-12-20"]]
    .map(([slug, title, cat, date], i) => ({ slug, title, cat, date, i }));
  const ART = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
  const TOUR = Object.fromEntries(TOURS.map((t) => [t.slug, t]));

  // How often an article is the landing page (search demand) …
  const BOOST = { 'was-man-in-prag-nicht-tun-sollte': 9, 'prague-visitor-pass-lohnt-sich-nicht': 8, 'ein-tag-in-prag-fuenf-orte': 7, 'prag-im-herbst': 7, 'beste-fotospots-prag': 6, 'geld-wechseln-tschechische-kronen': 6, 'oeffentlicher-verkehr-prag-tickets-apps': 5, 'prague-visitor-pass-ehrliche-bewertung': 4, 'was-kann-man-in-prag-machen': 4, 'beste-reisezeit-prag': 4, 'prag-geheimtipps-versteckte-orte': 3.5, 'prager-burg-vollstaendiger-besucher-guide': 3.5, 'what-to-do-in-prague-in-november-2025': 3, 'prag-schoenste-orte-aussichten-im-winter': 3, 'top-21-instagrammable-places-in-prague': 2.5, 'juedisches-viertel-prag-geschichte-und-erbe': 2.5, 'franz-kafka-orte-in-prag': 2.5, 'beste-tagesausfluege-von-prag': 2.5, 'prag-kulinarik-guide': 2.5, 'alle-museen-in-prag-kompletter-guide': 2, 'bootsfahrt-prag-moldau': 2, 'wie-man-den-besten-prag-stadtfuehrer-waehlt': 1.6, 'strahov-kloster-prag': 1.5, 'klementinum-barock-bibliothek-prag': 1.5, 'guide-fuer-firmengruppe-prag-buchen': 1.2, 'klementinum-astronomical-tower-meridian-room': 0.6, 'dan-brown-geheimnis-der-geheimnisse-prag': 0.6, 'prag-imax-kafka-grab-vinohrady-guide': 0.6 };
  // … and how strongly its readers want a guide (CTA propensity).
  const INTENT = { 'guide-fuer-firmengruppe-prag-buchen': 3.4, 'wie-man-den-besten-prag-stadtfuehrer-waehlt': 3, 'prager-burg-vollstaendiger-besucher-guide': 1.8, 'juedisches-viertel-prag-geschichte-und-erbe': 1.7, 'vaclav-havel-prag-spaziergang-der-freiheit': 1.6, 'franz-kafka-orte-in-prag': 1.4, 'ein-tag-in-prag-fuenf-orte': 1.4, 'prag-geheimtipps-versteckte-orte': 1.3, 'was-man-in-prag-nicht-tun-sollte': 0.8, 'prague-visitor-pass-lohnt-sich-nicht': 0.6, 'prague-visitor-pass-ehrliche-bewertung': 0.7, 'geld-wechseln-tschechische-kronen': 0.35, 'oeffentlicher-verkehr-prag-tickets-apps': 0.35, 'beste-fotospots-prag': 0.7, 'top-21-instagrammable-places-in-prague': 0.6 };
  const REL_TOUR = { 'prager-burg-vollstaendiger-besucher-guide': 'prager-burg', 'strahov-kloster-prag': 'prager-burg', 'dan-brown-geheimnis-der-geheimnisse-prag': 'prager-burg', 'juedisches-viertel-prag-geschichte-und-erbe': 'altstadt-juedisches-viertel', 'franz-kafka-orte-in-prag': 'altstadt-juedisches-viertel', 'klementinum-barock-bibliothek-prag': 'altstadt-juedisches-viertel', 'klementinum-astronomical-tower-meridian-room': 'altstadt-juedisches-viertel', 'vaclav-havel-prag-spaziergang-der-freiheit': 'vaclav-havel-tour-prag', 'prag-geheimtipps-versteckte-orte': 'verstecktes-prag', 'drei-gaerten-kleinseite-prag': 'verstecktes-prag', 'waldstein-garten-prag': 'verstecktes-prag', 'tropfsteinwand-mala-strana-karlsbruecke-geheimtipps': 'verstecktes-prag', 'top-prague-gardens-to-visit': 'verstecktes-prag', 'guide-fuer-firmengruppe-prag-buchen': 'individuelle-privattour', 'wie-man-den-besten-prag-stadtfuehrer-waehlt': 'individuelle-privattour', 'ein-tag-in-prag-fuenf-orte': 'individuelle-privattour', 'was-kann-man-in-prag-machen': 'individuelle-privattour' };
  const EXT = { 'prague-visitor-pass-lohnt-sich-nicht': 'praguevisitorpass.eu', 'prague-visitor-pass-ehrliche-bewertung': 'praguevisitorpass.eu', 'oeffentlicher-verkehr-prag-tickets-apps': 'pid.cz', 'geld-wechseln-tschechische-kronen': 'revolut.com', 'alle-museen-in-prag-kompletter-guide': 'ngprague.cz', 'prager-burg-vollstaendiger-besucher-guide': 'hrad.cz', 'bootsfahrt-prag-moldau': 'prague-boats.cz' };
  const CTA = { 'guide-fuer-firmengruppe-prag-buchen': 'Gruppenführung anfragen' };

  const GOALS = ['enquiry', 'email', 'whatsapp', 'phone'];
  const GOAL_META = {
    enquiry: { label: 'Formular gesendet', short: 'Formular', icon: 'edit_note', color: '#6B1F2A', bg: '#F6E7E2' },
    email: { label: 'E-Mail geöffnet', short: 'E-Mail', icon: 'mail', color: '#4A3D7A', bg: '#EAE6F3' },
    whatsapp: { label: 'WhatsApp geöffnet', short: 'WhatsApp', icon: 'chat', color: '#25633A', bg: '#E3F1E6' },
    phone: { label: 'Telefonnummer getippt', short: 'Telefon', icon: 'call', color: '#8C6A3C', bg: '#F3ECDD' },
  };
  const CATS = {
    whatsapp: { label: 'WhatsApp', bg: '#E3F1E6', fg: '#25633A' },
    email: { label: 'E-Mail', bg: '#EAE6F3', fg: '#4A3D7A' },
    phone: { label: 'Telefon', bg: '#F3ECDD', fg: '#8C6A3C' },
    form: { label: 'Zur Anfrage', bg: '#F6E7E2', fg: '#6B1F2A' },
    enquiry: { label: 'Formular gesendet', bg: '#6B1F2A', fg: '#FFFFFF' },
    tour: { label: 'Tour', bg: '#EDE4D3', fg: '#58413F' },
    nav: { label: 'Navigation', bg: '#F0EBE2', fg: '#3A332C' },
    anchor: { label: 'Sprung', bg: '#F0EBE2', fg: '#3A332C' },
    external: { label: 'Extern', bg: '#F0EBE2', fg: '#645849' },
    button: { label: 'Schaltfläche', bg: '#F0EBE2', fg: '#645849' },
  };
  const AREAS = {
    de: { hero: 'Hero oben', header: 'Kopfzeile', footer: 'Fußzeile', 'sticky-bar': 'Leiste unten (Handy)', 'closing-cta': 'Schluss-Aufruf', reviews: 'Bewertungen', gallery: 'Galerie', tours: 'Tourenliste', 'blog-promo': 'Journal-Popup', 'contact-direct': 'Direktkontakt', form: 'Formular', article: 'Artikeltext', 'article-cta': 'Kasten unter dem Artikel', sources: 'Quellen', related: 'Weitere Artikel', 'booking-card': 'Buchungskarte', 'related-tours': 'Weitere Touren', tripadvisor: 'TripAdvisor-Box', main: 'Seiteninhalt', booking: 'Buchungsformular', contact: 'Kontaktformular' },
    cs: { hero: 'Hero nahoře', header: 'Hlavička', footer: 'Patička', 'sticky-bar': 'Lišta dole (mobil)', 'closing-cta': 'Závěrečná výzva', reviews: 'Recenze', gallery: 'Galerie', tours: 'Seznam prohlídek', 'blog-promo': 'Popup Journalu', 'contact-direct': 'Přímý kontakt', form: 'Formulář', article: 'Text článku', 'article-cta': 'Box pod článkem', sources: 'Zdroje', related: 'Další články', 'booking-card': 'Rezervační karta', 'related-tours': 'Další prohlídky', tripadvisor: 'Box TripAdvisor', main: 'Obsah stránky', booking: 'Rezervační formulář', contact: 'Kontaktní formulář' },
  };
  const PAGE_NAMES = {
    de: { '/': 'Startseite', '/tours': 'Touren', '/blog': 'Journal', '/book': 'Buchungsanfrage', '/contact': 'Kontakt', '/zuzana-manova': 'Über Zuzana', '/bewerten': 'Bewerten', '/privacy': 'Datenschutz', '/terms': 'AGB' },
    cs: { '/': 'Úvodní stránka', '/tours': 'Prohlídky', '/blog': 'Journal', '/book': 'Rezervace / poptávka', '/contact': 'Kontakt', '/zuzana-manova': 'O Zuzaně', '/bewerten': 'Hodnocení', '/privacy': 'Ochrana údajů', '/terms': 'Obchodní podmínky' },
  };
  const GOAL_L = {
    cs: { enquiry: ['Formulář odeslán', 'Formulář'], email: ['E-mail otevřen', 'E-mail'], whatsapp: ['WhatsApp otevřen', 'WhatsApp'], phone: ['Klepnuto na telefon', 'Telefon'] },
    de: { enquiry: ['Formular gesendet', 'Formular'], email: ['E-Mail geöffnet', 'E-Mail'], whatsapp: ['WhatsApp geöffnet', 'WhatsApp'], phone: ['Telefonnummer getippt', 'Telefon'] },
  };
  const CAT_L = {
    cs: { whatsapp: 'WhatsApp', email: 'E-mail', phone: 'Telefon', form: 'K poptávce', enquiry: 'Formulář odeslán', tour: 'Prohlídka', nav: 'Navigace', anchor: 'Skok', external: 'Externí', button: 'Tlačítko' },
    de: { whatsapp: 'WhatsApp', email: 'E-Mail', phone: 'Telefon', form: 'Zur Anfrage', enquiry: 'Formular gesendet', tour: 'Tour', nav: 'Navigation', anchor: 'Sprung', external: 'Extern', button: 'Schaltfläche' },
  };

  function pageName(p, lang) {
    const pn = PAGE_NAMES[lang] || PAGE_NAMES.de;
    if (pn[p]) return pn[p];
    let m = p.match(/^\/blog\/(.+)$/);
    if (m) return ART[m[1]] ? ART[m[1]].title : m[1];
    m = p.match(/^\/tours\/(.+)$/);
    if (m) return TOUR[m[1]] ? TOUR[m[1]].title : m[1];
    return p;
  }
  const KIND = { cs: ['Článek', 'Prohlídka', 'Stránka'], de: ['Artikel', 'Tour', 'Seite'] };
  const pageKind = (p, lang) => (KIND[lang] || KIND.de)[p.startsWith('/blog/') ? 0 : p.startsWith('/tours/') ? 1 : 2];
  const areaName = (a, lang) => (AREAS[lang] || AREAS.de)[a] || a || '–';
  const clickLabel = (cat, label) => (cat === 'tour' && TOUR[label] ? TOUR[label].title : label);

  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pickW(r, list) {
    let s = 0;
    for (const o of list) s += o.w;
    let x = r() * s;
    for (const o of list) if ((x -= o.w) <= 0) return o;
    return list[list.length - 1];
  }
  const opt = (c, l, a, to, w) => ({ c, l, a, to, w });

  const header = (m, k) => [
    opt('nav', 'Touren', 'header', '/tours', 3.2 * k),
    opt('nav', 'Journal', 'header', '/blog', 1.8 * k),
    opt('nav', 'Über mich', 'header', '/zuzana-manova', 1 * k),
    opt('form', 'Anfrage senden', 'header', '/book', 1.6 * k),
    opt('phone', 'Anrufen', 'header', null, (m ? 1.1 : 0.3) * k),
  ];
  const footer = () => [
    opt('email', 'zuzanamanova@email.cz', 'footer', null, 0.35),
    opt('phone', '+420 721 231 933', 'footer', null, 0.3),
    opt('nav', 'Datenschutz', 'footer', '/privacy', 0.15),
    opt('nav', 'Bewerten', 'footer', '/bewerten', 0.12),
  ];

  // Scales contact/booking buttons to the real-world rates of a small guide site.
  const CAT_K = { whatsapp: 0.14, email: 0.3, phone: 0.04, form: 0.28 };
  const OPTS = new Map();
  function optionsFor(page, dev) {
    const key = page + '|' + dev;
    if (OPTS.has(key)) return OPTS.get(key);
    const m = dev === 'm';
    let o;
    if (page === '/') {
      o = [opt('form', 'Anfrage senden', 'hero', '/book', 4), opt('nav', 'Touren erkunden', 'hero', '/tours', 5.5),
        ...TOURS.map((t) => opt('tour', t.slug, 'tours', '/tours/' + t.slug, t.w * 0.32)),
        opt('external', 'tripadvisor.de', 'reviews', null, 0.9), opt('external', 'google.com', 'reviews', null, 0.5),
        opt('form', 'Unverbindlich anfragen', 'closing-cta', '/book', 2), opt('whatsapp', 'WhatsApp', 'closing-cta', null, 1),
        opt('nav', ARTICLES[0].title, 'blog-promo', '/blog/' + ARTICLES[0].slug, 0.7), opt('button', 'Schließen', 'blog-promo', null, 1),
        ...header(m, 1), ...footer()];
      if (m) o.push(opt('whatsapp', 'WhatsApp', 'sticky-bar', null, 3.2), opt('phone', 'Anrufen', 'sticky-bar', null, 1), opt('form', 'Anfragen', 'sticky-bar', '/book', 1.8));
    } else if (page === '/tours') {
      o = [...TOURS.map((t) => opt('tour', t.slug, 'main', '/tours/' + t.slug, t.w * 0.45)),
        opt('form', 'Anfrage senden', 'main', '/book', 1.8), opt('form', 'Unverbindliche Anfrage', 'main', '/book', 1.4),
        ...header(m, 0.7), ...footer()];
    } else if (page.startsWith('/tours/')) {
      const slug = page.slice(7);
      const others = TOURS.filter((t) => t.slug !== slug).slice(0, 2);
      o = [opt('form', 'Unverbindliche Anfrage senden', 'booking-card', '/book', 5.5),
        opt('whatsapp', 'Per WhatsApp buchen', 'booking-card', null, m ? 3.2 : 1.6),
        opt('phone', 'Jetzt anrufen', 'booking-card', null, m ? 1.6 : 0.6),
        ...others.map((t) => opt('tour', t.slug, 'related-tours', '/tours/' + t.slug, 1)),
        opt('nav', 'Alle Touren', 'hero', '/tours', 1.2), opt('external', 'tripadvisor.de', 'tripadvisor', null, 0.5),
        ...header(m, 0.6), ...footer()];
    } else if (page === '/blog') {
      o = [...ARTICLES.map((a) => opt('nav', a.title, 'main', '/blog/' + a.slug, (BOOST[a.slug] || 1) * 0.35)),
        opt('form', 'Tour anfragen', 'main', '/book', 0.9), opt('email', 'Mediadaten anfragen', 'main', null, 0.25),
        ...header(m, 0.6), ...footer()];
    } else if (page.startsWith('/blog/')) {
      const a = ART[page.slice(6)];
      const it = INTENT[a.slug] || 1;
      const r1 = ARTICLES[(a.i + 1) % ARTICLES.length], r2 = ARTICLES[(a.i + 4) % ARTICLES.length];
      const tour = REL_TOUR[a.slug] || TOURS[a.i % 2].slug;
      o = [opt('tour', tour, 'article', '/tours/' + tour, 1.8 * it),
        opt('nav', r1.title, 'related', '/blog/' + r1.slug, 2), opt('nav', r2.title, 'related', '/blog/' + r2.slug, 1.4),
        opt('external', EXT[a.slug] || 'maps.google.com', 'article', null, 1.5), opt('external', 'de.wikipedia.org', 'sources', null, 0.3),
        opt('form', CTA[a.slug] || 'Tour anfragen', 'article-cta', '/book', 2.8 * it),
        ...header(m, 0.5), ...footer()];
    } else if (page === '/book' || page === '/contact') {
      o = [opt('phone', '+420 721 231 933', 'contact-direct', null, m ? 2.2 : 1.1),
        opt('whatsapp', 'Direkt schreiben', 'contact-direct', null, m ? 2.6 : 1.4),
        opt('email', 'zuzanamanova@email.cz', 'contact-direct', null, m ? 1 : 1.8),
        ...header(m, 0.5), ...footer()];
      if (m) o.push(opt('whatsapp', 'WhatsApp', 'main', null, 1.5));
    } else if (page === '/zuzana-manova') {
      o = [opt('form', 'Eine Tour anfragen', 'main', '/book', 2.6), ...TOURS.map((t) => opt('tour', t.slug, 'main', '/tours/' + t.slug, t.w * 0.12)), ...header(m, 0.8), ...footer()];
    } else if (page === '/bewerten') {
      o = [opt('external', 'google.com', 'main', null, 2), opt('external', 'tripadvisor.de', 'main', null, 1.5), ...header(m, 0.3)];
    } else {
      o = [...header(m, 1), ...footer()];
    }
    for (const x of o) x.w *= CAT_K[x.c] || 1;
    OPTS.set(key, o);
    return o;
  }

  const ENTRY = (() => {
    const base = [['/', 24], ['/tours', 6], ['/blog', 5], ['/book', 0.6], ['/contact', 0.8], ['/zuzana-manova', 2], ['/bewerten', 1.2], ...TOURS.map((t) => ['/tours/' + t.slug, t.w * 0.3])];
    const sum = ARTICLES.reduce((s, a) => s + (BOOST[a.slug] || 1), 0);
    return [...base, ...ARTICLES.map((a) => ['/blog/' + a.slug, ((BOOST[a.slug] || 1) / sum) * 46])].map(([p, w]) => ({ p, w }));
  })();
  const REFS = {
    article: [['google.com', 55], ['google.de', 14], ['', 12], ['bing.com', 5], ['chatgpt.com', 4], ['duckduckgo.com', 3], ['google.at', 3], ['google.ch', 2], ['pinterest.de', 2]],
    home: [['', 40], ['google.com', 25], ['google.de', 8], ['tripadvisor.de', 8], ['instagram.com', 7], ['facebook.com', 4], ['chatgpt.com', 3], ['bing.com', 3], ['tourhq.com', 2]],
    tour: [['google.com', 45], ['', 25], ['tripadvisor.de', 10], ['google.de', 8], ['chatgpt.com', 6], ['bing.com', 3], ['tourhq.com', 3]],
    other: [['', 55], ['google.com', 30], ['google.de', 10], ['instagram.com', 5]],
    rate: [['', 96], ['google.com', 4]],
  };
  for (const k in REFS) REFS[k] = REFS[k].map(([h, w]) => ({ h, w }));
  const refGroup = (p) => (p.startsWith('/blog/') ? 'article' : p === '/' ? 'home' : p.startsWith('/tours') ? 'tour' : p === '/bewerten' ? 'rate' : 'other');

  function leaveProb(page, first) {
    if (page.startsWith('/blog/')) return first ? 0.8 : 0.55;
    if (page === '/') return 0.4;
    if (page === '/tours') return 0.33;
    if (page.startsWith('/tours/')) return first ? 0.5 : 0.4;
    if (page === '/blog') return 0.35;
    if (page === '/book' || page === '/contact') return 0.55;
    if (page === '/bewerten') return 0.3;
    return 0.5;
  }
  const isGoal = (e) => e.k === 'enquiry' || (e.k === 'click' && (e.c === 'whatsapp' || e.c === 'phone' || e.c === 'email'));
  const goalOf = (e) => (e.k === 'enquiry' ? 'enquiry' : e.c);
  const HOURS_D = [0.2, 0.1, 0.1, 0.1, 0.1, 0.2, 0.5, 1.2, 2.4, 3.2, 3.6, 3.6, 3.4, 3.3, 3.4, 3.3, 3.1, 2.8, 2.6, 2.8, 3, 2.6, 1.6, 0.7].map((w, h) => ({ h, w }));
  const HOURS_M = [0.5, 0.3, 0.2, 0.1, 0.1, 0.2, 0.6, 1.4, 2, 2.3, 2.4, 2.6, 3, 2.8, 2.6, 2.6, 2.8, 3.2, 3.6, 4.2, 4.8, 4.6, 3.4, 1.6].map((w, h) => ({ h, w }));
  const DEPTH = [[25, 3], [50, 3], [75, 2.5], [100, 3]].map(([d, w]) => ({ d, w }));
  const DEPTH_B = [[25, 6], [50, 3], [75, 1.5], [100, 1]].map(([d, w]) => ({ d, w }));
  const srcGroup = (h) => (!h ? 'direct' : /google|bing|duckduckgo/.test(h) ? 'search' : /instagram|facebook|pinterest/.test(h) ? 'social' : /tripadvisor|tourhq/.test(h) ? 'review' : /chatgpt|perplexity|gemini/.test(h) ? 'ai' : 'other');
  const ENQ_TOURS = [...TOURS.map((t) => ({ l: t.title, w: t.w })), { l: 'Ich bin noch unentschlossen', w: 6 }, { l: '(ohne Tour)', w: 1.5 }];

  function simVisit(r, day) {
    const dev = r() < 0.62 ? 'm' : 'd';
    const id = Math.floor(r() * 2176782335).toString(36).padStart(6, '0');
    const hour = pickW(r, dev === 'm' ? HOURS_M : HOURS_D).h, minute = Math.floor(r() * 60);
    const entry = pickW(r, ENTRY).p;
    const ref = pickW(r, REFS[refGroup(entry)]).h;
    const ev = [{ k: 'page', p: entry }];
    let page = entry, first = true, lastTour = null;
    for (let guard = 0; guard < 14; guard++) {
      if (page.startsWith('/tours/')) lastTour = page.slice(7);
      if (page === '/book' || page === '/contact') {
        const pe = (dev === 'm' ? 0.1 : 0.15) * (page === '/book' ? 1.1 : 0.8);
        if (r() < pe) {
          const l = lastTour && r() < 0.75 ? TOUR[lastTour].title : pickW(r, ENQ_TOURS).l;
          ev.push({ k: 'enquiry', c: 'enquiry', l, a: page === '/book' ? 'booking' : 'contact', p: page });
          break;
        }
      }
      if (r() < leaveProb(page, first)) break;
      first = false;
      const o = pickW(r, optionsFor(page, dev));
      ev.push({ k: 'click', c: o.c, l: o.l, a: o.a, p: page });
      if (o.c === 'whatsapp' || o.c === 'phone' || o.c === 'email') { if (r() < 0.85) break; continue; }
      if (o.to) { page = o.to; ev.push({ k: 'page', p: page }); continue; }
      if (o.c === 'external' && r() < 0.75) break;
    }
    for (let i = 0; i < ev.length; i++) {
      const e = ev[i];
      if (e.k !== 'page') continue;
      let j = i + 1;
      while (j < ev.length && ev[j].k !== 'page') j++;
      const here = ev.slice(i + 1, j), bounced = j >= ev.length && !here.length, art = e.p.startsWith('/blog/');
      e.t = Math.round((art ? 70 : 35) * (bounced ? 0.4 : 1) * (0.3 + r() * 1.7) + 5);
      if (art) {
        let depth = pickW(r, bounced ? DEPTH_B : DEPTH).d;
        if (here.some((x) => x.a === 'article-cta' || x.a === 'related' || x.a === 'sources')) depth = 100;
        else if (here.some((x) => x.a === 'article')) depth = Math.max(depth, 50);
        if ((INTENT[e.p.slice(6)] || 1) > 1.5 && depth < 75 && r() < 0.3) depth = 75;
        e.depth = depth;
        e.t = Math.round(e.t * (0.5 + depth / 100));
      }
    }
    return { day, dev, ref, ev, id, hour, minute };
  }

  let DS = null;
  function dataset() {
    if (DS) return DS;
    const r = rng(20261006);
    const now = new Date();
    const y = now.getFullYear(), mo = now.getMonth(), dd = now.getDate();
    const visits = [], dates = [];
    for (let d = 364; d >= 0; d--) {
      const date = new Date(y, mo, dd - d);
      dates[d] = date;
      const doy = Math.round((date - new Date(date.getFullYear(), 0, 0)) / 864e5);
      const season = 1 + 0.2 * Math.sin(((doy - 50) / 365) * 2 * Math.PI);
      const growth = 0.72 + 0.28 * (1 - d / 364);
      const wd = [1.12, 1.07, 1, 0.98, 0.95, 0.85, 0.9][date.getDay()];
      let n = Math.round(80 * season * growth * wd * (0.85 + r() * 0.3));
      if (d === 0) n = Math.round(n * Math.max(0.05, (now - new Date(y, mo, dd)) / 864e5));
      for (let k = 0; k < n; k++) visits.push(simVisit(r, d));
    }
    DS = { visits, dates, now };
    return DS;
  }

  const zg = () => ({ enquiry: 0, email: 0, whatsapp: 0, phone: 0 });
  function bump(map, key, dev, g, extra) {
    let c = map[key];
    if (!c) c = map[key] = Object.assign({ n: 0, m: 0, d: 0, conv: 0, after: zg() }, extra);
    c.n++; c[dev]++;
    if (g) { c.conv++; c.after[g]++; }
    return c;
  }
  const GOAL_PATH = { enquiry: 'Formular gesendet', email: 'E-Mail', whatsapp: 'WhatsApp', phone: 'Anruf' };

  /** days = range length (today included), dev = 'all' | 'm' | 'd'. */
  function aggregate(ds, days, dev, opts) {
    opts = opts || {};
    const off = opts.offset || 0, filter = opts.filter, last = ds.dates[ds.dates.length - 1];
    const series = [];
    for (let d = days - 1; d >= 0; d--) series.push({ date: ds.dates[off + d] || last, visits: 0, conv: 0, goals: zg() });
    const out = { days, from: ds.dates[off + days - 1] || last, to: ds.dates[off] || last, visits: 0, m: 0, d: 0, pageviews: 0, bounces: 0, conv: 0, convM: 0, convD: 0, convFirst: zg(), goals: zg(), goalsM: zg(), goalsD: zg(), clicks: {}, pages: {}, entries: {}, refs: {}, paths: {}, formViews: 0, formSent: 0, enquiryTours: {}, enquiryForms: {}, series, hours: Array.from({ length: 7 }, () => new Array(24).fill(0)), hoursConv: Array.from({ length: 7 }, () => new Array(24).fill(0)), depth: {}, pageDays: {}, src: {}, entryKinds: {}, sawContent: 0, directVisits: 0, flows: {}, timeSum: 0 };
    for (const v of ds.visits) {
      if (v.day < off || v.day >= off + days || (dev !== 'all' && v.dev !== dev) || (filter && !filter(v))) continue;
      const ev = v.ev, dv = v.dev;
      const next = new Array(ev.length);
      let g = null;
      for (let i = ev.length - 1; i >= 0; i--) { if (isGoal(ev[i])) g = goalOf(ev[i]); next[i] = g; }
      const firstG = next[0];
      const s = series[days - 1 - (v.day - off)];
      out.visits++; out[dv]++; s.visits++;
      if (firstG) { out.conv++; out[dv === 'm' ? 'convM' : 'convD']++; out.convFirst[firstG]++; s.conv++; }
      bump(out.entries, ev[0].p, dv, firstG);
      bump(out.refs, v.ref, dv, firstG);
      const kind = ev[0].p.startsWith('/blog/') ? 'article' : ev[0].p.startsWith('/tours/') ? 'tour' : ev[0].p === '/' ? 'home' : 'other';
      const sg = srcGroup(v.ref), fk = sg + '|' + kind + '|' + (firstG || 'none');
      bump(out.src, sg, dv, firstG);
      bump(out.entryKinds, kind, dv, firstG);
      out.flows[fk] = (out.flows[fk] || 0) + 1;
      const wd = (ds.dates[v.day].getDay() + 6) % 7;
      if (v.hour != null) { out.hours[wd][v.hour]++; if (firstG) out.hoursConv[wd][v.hour]++; }
      if (ev.some((e) => e.k === 'page' && (e.p.startsWith('/blog/') || e.p.startsWith('/tours/')))) out.sawContent++;
      if (ev.some((e) => e.k === 'click' && (e.c === 'whatsapp' || e.c === 'phone' || e.c === 'email'))) out.directVisits++;
      const seen = new Set(), steps = [];
      let pv = 0, reached = false, sawForm = false, sent = false;
      ev.forEach((e, i) => {
        if (e.k === 'page') {
          pv++;
          out.timeSum += e.t || 0;
          if (e.depth) { const dp = out.depth[e.p] || (out.depth[e.p] = { n: 0, b: [0, 0, 0, 0], time: 0 }); dp.n++; dp.b[e.depth / 25 - 1]++; dp.time += e.t || 0; }
          if (!seen.has(e.p)) {
            seen.add(e.p);
            bump(out.pages, e.p, dv, next[i]);
            if (e.p.startsWith('/blog/')) (out.pageDays[e.p] || (out.pageDays[e.p] = new Array(days).fill(0)))[days - 1 - (v.day - off)]++;
          }
          if (!reached && steps[steps.length - 1] !== e.p) steps.push(e.p);
          if (e.p === '/book' || e.p === '/contact') sawForm = true;
        } else {
          const cat = e.k === 'enquiry' ? 'enquiry' : e.c;
          bump(out.clicks, [cat, e.l, e.a, e.p].join('\t'), dv, next[i], { cat, label: e.l, area: e.a, page: e.p });
        }
        if (isGoal(e)) {
          const gg = goalOf(e);
          out.goals[gg]++; (dv === 'm' ? out.goalsM : out.goalsD)[gg]++; s.goals[gg]++;
          reached = true;
          if (gg === 'enquiry') { sent = true; out.enquiryTours[e.l] = (out.enquiryTours[e.l] || 0) + 1; out.enquiryForms[e.a] = (out.enquiryForms[e.a] || 0) + 1; }
        }
      });
      out.pageviews += pv;
      if (pv <= 1 && ev.every((e) => e.k === 'page')) out.bounces++;
      if (sawForm) { out.formViews++; if (sent) out.formSent++; }
      const path = steps.length > 6 ? [...steps.slice(0, 2), '…', ...steps.slice(-3)] : steps;
      if (firstG) path.push('✓ ' + GOAL_PATH[firstG]);
      bump(out.paths, path.join(' › '), dv, firstG);
    }
    return out;
  }

  const nowMinute = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
  const happened = (v, nm) => v.day > 0 || v.hour * 60 + v.minute <= nm;
  function sessions(ds, days, dev, filter) {
    const nm = nowMinute();
    return ds.visits.filter((v) => v.day < days && happened(v, nm) && (dev === 'all' || v.dev === dev) && (!filter || filter(v)))
      .sort((a, b) => a.day - b.day || b.hour - a.hour || b.minute - a.minute);
  }

  root.ZptStats = { TOURS, ARTICLES, ART, TOUR, GOALS, GOAL_META, GOAL_L, CATS, CAT_L, AREAS, pageName, pageKind, areaName, clickLabel, dataset, aggregate, sessions, srcGroup, happened, nowMinute };
})(typeof window !== 'undefined' ? window : globalThis);
