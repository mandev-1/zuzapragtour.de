/* ============================================================================
   render-blocks.cjs — canonical block model → public-site HTML.

   Emits markup that matches src/styles/blog-content.css conventions exactly
   (.lead, .callout-box, .cost-table, .artikel-ornament, <blockquote><cite>,
   <figure><figcaption>) so journal articles render identically to the legacy
   hand-authored posts and flow through the same BlogPostPage pipeline
   (injectHeadingIds + extractHeadings build the table of contents).

   Map blocks emit a `<div class="jmap-wrap" data-jmap="…">` placeholder whose
   JSON spec is hydrated into a real Leaflet map client-side (src/utils/
   journalMaps.ts). Point labels/notes are pre-localized into that JSON so the
   client never needs the Localized helper.

   Plain CommonJS (no deps) so scripts/generate-journal.cjs can require it at
   build time. Block HTML fields are authored HTML and pass through untouched;
   only attribute values and plain-text fields are escaped.
   ============================================================================ */

/** Resolve a Localized value (string | {de,en?}) to one language, de-fallback. */
function loc(v, lang) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  return v[lang] != null && v[lang] !== '' ? v[lang] : (v.de != null ? v.de : (v.en != null ? v.en : ''));
}

/** Escape for use inside an HTML attribute value (double-quoted). */
function escAttr(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape plain text destined for HTML text content. */
function escText(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function stripTags(s) {
  return String(s == null ? '' : s).replace(/<[^>]+>/g, '');
}

/** ' id="…"' when an anchor id is set, else ''. */
function idAttr(id) {
  return id ? ' id="' + escAttr(id) + '"' : '';
}

/** Photo credit appended to a caption: "Bild: …" / "Photo: …". */
function creditHtml(credit, lang) {
  if (!credit) return '';
  return ' <span class="credit">' + (lang === 'en' ? 'Photo: ' : 'Bild: ') + escText(credit) + '</span>';
}

var VERDICTS = { refuted: 1, open: 1, unproven: 1 };

function badge(verdict, label, lang) {
  var tone = VERDICTS[verdict] ? verdict : 'unproven';
  return '<span class="j-badge j-badge--' + tone + '">' + escText(loc(label, lang)) + '</span>';
}

function renderOverview(b, lang) {
  var claims = b.variant === 'claims';
  var variant = b.variant === 'claims' || b.variant === 'toc' || b.variant === 'rank' ? b.variant : 'index';
  var hasTitle = !!loc(b.title, lang);
  var head =
    (hasTitle ? '<h2 class="j-overview__title"' + idAttr(b.id) + '>' + loc(b.title, lang) + '</h2>' : '') +
    (b.intro ? '<p class="j-overview__intro">' + loc(b.intro, lang) + '</p>' : '');
  var rows = (b.items || [])
    .map(function (it) {
      var inner = claims
        ? '<span class="j-overview__claim">' + loc(it.title, lang) + '</span>' +
          '<span class="j-overview__meta">' +
          (it.verdictLabel ? badge(it.verdict, it.verdictLabel, lang) : '') +
          (it.desc ? '<span class="j-overview__ref">' + loc(it.desc, lang) + '</span>' : '') +
          '</span>'
        : variant === 'toc'
        ? '<span class="j-overview__name">' + loc(it.title, lang) + '</span>' +
          (it.desc ? '<span class="j-overview__desc">' + loc(it.desc, lang) + '</span>' : '')
        : variant === 'rank'
        ? '<span class="j-overview__n">' + escText(it.n || '') + '</span>' +
          '<span class="j-overview__name">' + loc(it.title, lang) + '</span>' +
          (it.desc ? '<span class="j-overview__note' + (it.tone === 'blue' ? ' is-blue' : '') + '">' + loc(it.desc, lang) + '</span>' : '')
        : '<span class="j-overview__n">' + escText(it.n || '') + '</span>' +
          '<span class="j-overview__name">' + loc(it.title, lang) + '</span>' +
          (it.desc ? '<span class="j-overview__desc">' + loc(it.desc, lang) + '</span>' : '');
      return '<a class="j-overview__row" href="' + escAttr(it.href || '#') + '">' + inner + '</a>';
    })
    .join('');
  return (
    '<div class="j-overview j-overview--' + variant + '"' + (hasTitle ? '' : idAttr(b.id)) + '>' +
    head +
    '<div class="j-overview__list">' + rows + '</div>' +
    '</div>'
  );
}

function stopsList(points, lang) {
  return (
    '<ol class="jmap-stops">' +
    points
      .map(function (p, i) {
        var label = escText(loc(p.label, lang));
        var note = p.note ? escText(loc(p.note, lang)) : '';
        return (
          '<li><span class="jmap-n">' + (i + 1) + '</span><div>' +
          '<div class="jmap-st">' + label + '</div>' +
          (note ? '<div class="jmap-sn">' + note + '</div>' : '') +
          '</div></li>'
        );
      })
      .join('') +
    '</ol>'
  );
}

function renderMap(b, lang) {
  if (b.src) {
    // Embedded map page (e.g. public/maps/*.html, Leaflet + OSM inside the iframe).
    return (
      (b.caption ? '<p class="j-map-note">' + escText(loc(b.caption, lang)) + '</p>' : '') +
      '<div class="j-map-frame"><iframe src="' + escAttr(b.src) + '" title="' + escAttr(loc(b.title, lang)) + '" loading="lazy"></iframe></div>'
    );
  }
  // Pre-localize the spec so the client hydration needs no Localized logic.
  var spec = {
    mode: b.mode === 'embed' ? 'embed' : 'illustrated',
    route: !!b.route,
    embedUrl: b.embedUrl || '',
    points: (b.points || []).map(function (p) {
      return { coord: p.coord, label: loc(p.label, lang), note: loc(p.note, lang) };
    }),
  };
  var title = b.title ? '<div class="jmap-title">' + escText(loc(b.title, lang)) + '</div>' : '';
  var cap = b.caption ? '<div class="jmap-cap">' + escText(loc(b.caption, lang)) + '</div>' : '';
  var stops = b.list && spec.points.length ? stopsList(b.points, lang) : '';
  return (
    '<div class="jmap-wrap" data-jmap="' + escAttr(JSON.stringify(spec)) + '">' +
    title +
    '<div class="jmap"></div>' +
    cap +
    stops +
    '</div>'
  );
}


/** Verdict text of a `myth` block → badge tone. */
var MYTH_TONE = { falsch: 'refuted', plausibel: 'open', stimmt: 'open', roman: 'unproven', sage: 'unproven' };

/** The facelift handoff's mobile contact card, placed before the 3rd section (visible below 1024px). */
function inlineCta(avatar) {
  return (
    '<aside class="j-inline-cta" data-track-section="mobile-inline">' +
    '<div class="j-inline-cta__who"><img src="' + escAttr(avatar) + '" alt="">' +
    '<div><div class="j-inline-cta__t">Diese Orte mit Zuzana sehen</div><div class="j-inline-cta__s">Privat, auf Deutsch, in Ihrem Tempo</div></div></div>' +
    '<a class="j-inline-cta__main" href="/book#contact-title">Unverbindlich anfragen</a>' +
    '<div class="j-inline-cta__row"><a href="https://wa.me/420721231933">WhatsApp</a><a href="mailto:zuzanamanova@email.cz">E-Mail</a></div>' +
    '</aside>'
  );
}

function renderBlock(b, lang) {
  switch (b.t) {
    case 'p':
      return '<p' + (b.lead ? ' class="lead"' : '') + '>' + loc(b.html, lang) + '</p>';

    case 'h2':
      if (b.section) {
        // Facelift section head: serif H2, optional free/paid badge + grey meta line.
        var pad = typeof b.pad === 'number' && b.pad !== 48 ? ' style="padding-top:' + b.pad + 'px"' : '';
        var hasMeta = b.sub || typeof b.free === 'boolean';
        var meta = '';
        if (typeof b.free === 'boolean') {
          var parts = loc(b.sub, lang).split(' · ').filter(Boolean);
          meta =
            '<div class="j-meta">' +
            '<span class="j-free' + (b.free ? '' : ' j-free--paid') + '">' + (b.free ? (lang === 'en' ? 'Free' : 'Kostenlos') : (lang === 'en' ? 'Admission' : 'Eintritt')) + '</span>' +
            parts.map(function (x, i) { return (i ? '<span aria-hidden="true">·</span>' : '') + '<span>' + escText(x) + '</span>'; }).join('') +
            '</div>';
        } else if (b.sub) {
          meta = '<p class="j-section-sub">' + loc(b.sub, lang) + '</p>';
        }
        return (
          '<h2 class="j-section' + (hasMeta ? (typeof b.free === 'boolean' ? ' j-section--meta' : ' j-section--sub') : '') + '"' + idAttr(b.id) + pad + '>' + loc(b.html, lang) + '</h2>' + meta
        );
      }
      // Without an explicit anchor id, BlogPostPage.injectHeadingIds adds heading-N.
      return (
        '<h2' + idAttr(b.id) + '>' + loc(b.html, lang) + '</h2>' +
        (b.sub ? '<p class="j-subline">' + loc(b.sub, lang) + '</p>' : '')
      );

    case 'h3':
      return '<h3>' + loc(b.html, lang) + '</h3>';

    case 'quote':
      return (
        '<blockquote><p>' + loc(b.html, lang) + '</p>' +
        (b.by ? '<cite>' + escText(b.by) + '</cite>' : '') +
        '</blockquote>'
      );

    case 'callout': {
      var list = b.list && b.list.length
        ? '<ul>' + b.list.map(function (li) { return '<li>' + loc(li, lang) + '</li>'; }).join('') + '</ul>'
        : '';
      return (
        '<div class="callout-box' + (b.variant === 'tip' ? ' callout-box--tip' : '') + '">' +
        '<p class="callout-box__label">' + escText(loc(b.label, lang) || 'Tipp') + '</p>' +
        '<div class="callout-box__text">' + loc(b.html, lang) + list + '</div>' +
        '</div>'
      );
    }

    case 'image': {
      if (!b.src) return '';
      var cap = loc(b.cap, lang);
      var alt = loc(b.alt, lang) || stripTags(cap);
      var ar = /^\d+\s*\/\s*\d+$/.test(b.aspect || '') ? b.aspect : '';
      var imgTag;
      if (ar) {
        var fx = b.focus && typeof b.focus.x === 'number' ? b.focus.x : 50;
        var fy = b.focus && typeof b.focus.y === 'number' ? b.focus.y : 50;
        imgTag =
          '<span class="blog-img-crop" style="aspect-ratio:' + ar + '">' +
          '<img src="' + escAttr(b.src) + '" alt="' + escAttr(alt) + '" loading="lazy" ' +
          'style="width:100%;height:100%;object-fit:cover;object-position:' + fx + '% ' + fy + '%"></span>';
      } else {
        imgTag = '<img src="' + escAttr(b.src) + '" alt="' + escAttr(alt) + '" loading="lazy">';
      }
      var layout = b.layout === 'medium' || b.layout === 'side' ? ' blog-inline-image--' + b.layout : '';
      var capHtml = cap || b.credit ? '<figcaption>' + cap + creditHtml(b.credit, lang) + '</figcaption>' : '';
      return '<figure class="blog-inline-image' + layout + '">' + imgTag + capHtml + '</figure>';
    }

    case 'chapter':
      return (
        '<div class="j-chapter"' + idAttr(b.id) + '>' +
        '<div class="j-chapter__label">' +
        '<span class="j-chapter__n">' + loc(b.label, lang) + '</span>' +
        (b.meta ? '<span class="j-chapter__meta">' + loc(b.meta, lang) + '</span>' : '') +
        '</div>' +
        '<h2 class="j-chapter__title">' + loc(b.html, lang) + '</h2>' +
        '</div>'
      );

    case 'factcheck': {
      var tone = VERDICTS[b.verdict] ? b.verdict : 'unproven';
      var fcLabel = loc(b.label, lang) || (lang === 'en' ? 'Legend, fact-checked' : 'Legende im Faktencheck');
      return (
        '<aside class="j-factcheck j-factcheck--' + tone + '">' +
        '<div class="j-factcheck__head"><span class="j-factcheck__label">' + escText(fcLabel) + '</span>' +
        badge(tone, b.verdictLabel, lang) + '</div>' +
        '<p class="j-factcheck__claim">' + loc(b.claim, lang) + '</p>' +
        '<div class="j-factcheck__text">' + loc(b.html, lang) + '</div>' +
        '</aside>'
      );
    }

    case 'myth': {
      var mhtml = loc(b.html, lang);
      var mclaim = (mhtml.match(/^\s*<p>([\s\S]*?)<\/p>/) || [])[1] || '';
      var mrest = mclaim ? mhtml.replace(/^\s*<p>[\s\S]*?<\/p>/, '') : mhtml;
      return renderBlock({
        t: 'factcheck',
        label: b.label || { de: 'Mythos im Faktencheck', en: 'Myth, fact-checked' },
        verdict: MYTH_TONE[String(b.verdict || '').toLowerCase()] || 'unproven',
        verdictLabel: b.verdict || '',
        claim: mclaim,
        html: mrest,
      }, lang);
    }

    case 'overview':
      return renderOverview(b, lang);

    case 'gallery': {
      var gcap = loc(b.cap, lang);
      var gimgs = (b.images || [])
        .map(function (im) {
          return '<img src="' + escAttr(im.src) + '" alt="' + escAttr(loc(im.alt, lang)) + '" loading="lazy"' +
            (im.pos ? ' style="object-position:' + escAttr(im.pos) + '"' : '') + '>';
        })
        .join('');
      return (
        '<figure class="j-gallery"><div class="j-gallery__grid">' + gimgs + '</div>' +
        (gcap || b.credit ? '<figcaption>' + gcap + creditHtml(b.credit, lang) + '</figcaption>' : '') +
        '</figure>'
      );
    }

    case 'cta':
      return (
        '<aside class="j-cta' + (b.tight ? ' j-cta--tight' : '') + '" data-track-section="article-cta">' +
        '<div class="j-cta__body"><div class="j-cta__title">' + escText(loc(b.title, lang)) + '</div>' +
        '<p class="j-cta__text">' + loc(b.html, lang) + '</p></div>' +
        '<a class="j-cta__btn" href="' + escAttr(b.href || '/book#contact-title') + '">' + escText(loc(b.button, lang)) + '</a>' +
        '</aside>'
      );

    case 'links':
      return (
        '<section class="j-links" data-track-section="related">' +
        (b.title ? '<h2 class="j-links__title">' + escText(loc(b.title, lang)) + '</h2>' : '') +
        '<div class="j-links__list">' +
        (b.items || []).map(function (it) { return '<a href="' + escAttr(it.href) + '">' + escText(loc(it.text, lang)) + '</a>'; }).join('') +
        '</div></section>'
      );

    case 'costTable': {
      var header = b.title ? '<p class="cost-table-header">' + escText(loc(b.title, lang)) + '</p>' : '';
      var rows = (b.rows || [])
        .map(function (r) {
          return (
            '<div class="cost-table-row">' +
            '<span class="cost-table-label">' + escText(loc(r.k, lang)) + '</span>' +
            '<span class="cost-table-amount">' + escText(loc(r.v, lang)) + '</span>' +
            '</div>'
          );
        })
        .join('');
      var note = b.note ? '<p class="cost-table-footnote">' + loc(b.note, lang) + '</p>' : '';
      return '<div class="cost-table">' + header + rows + note + '</div>';
    }

    case 'list': {
      var tag = b.ordered ? 'ol' : 'ul';
      return (
        '<' + tag + '>' +
        (b.items || []).map(function (li) { return '<li>' + loc(li, lang) + '</li>'; }).join('') +
        '</' + tag + '>'
      );
    }

    case 'facts': {
      // Label column + value rows (practical info, or a time plan). Header only
      // when titled; values are authored HTML (may link to in-page anchors).
      var fh = b.title ? '<p class="facts-table__header">' + escText(loc(b.title, lang)) + '</p>' : '';
      var fr = (b.items || [])
        .map(function (it) {
          return (
            '<div class="facts-table__row">' +
            '<div class="facts-table__k">' + escText(loc(it.k, lang)) + '</div>' +
            '<div class="facts-table__v">' + loc(it.v, lang) + '</div>' +
            '</div>'
          );
        })
        .join('');
      var fv = b.variant === 'schedule' ? ' facts-table--schedule' : b.variant === 'v2' ? ' facts-table--v2' : '';
      var look = b.variant === 'v2' && b.look ? b.look : {};
      if (look.rule === 'ink') fv += ' facts-table--ink';
      var fs = [];
      if (look.key && /^[\d.]+rem$/.test(look.key)) fs.push('--fk:' + look.key);
      if (typeof look.pad === 'number') fs.push('--fp:' + look.pad + 'px');
      if (look.margin && /^[\d.]+(px|em|rem)?( [\d.]+(px|em|rem)?){0,3}$/.test(look.margin)) fs.push('margin:' + look.margin);
      var fnote = b.note ? '<p class="facts-table__note">' + loc(b.note, lang) + '</p>' : '';
      return '<div class="facts-table' + fv + '"' + (fs.length ? ' style="' + fs.join(';') + '"' : '') + '>' + fh + fr + fnote + '</div>';
    }

    case 'faq':
      return (
        '<div class="j-faq' + (b.variant === 'v2' ? ' j-faq--v2' : '') + '">' +
        (b.items || [])
          .map(function (it) {
            return (
              '<div class="j-faq__item">' +
              '<h3 class="j-faq__q">' + loc(it.q, lang) + '</h3>' +
              '<p class="j-faq__a">' + loc(it.a, lang) + '</p>' +
              '</div>'
            );
          })
          .join('') +
        '</div>'
      );

    case 'map':
      return renderMap(b, lang);

    case 'ornament':
      return (
        '<div class="artikel-ornament" aria-hidden="true">' +
        '<span class="artikel-ornament-line"></span>' +
        '<span class="artikel-ornament-glyph">&#10086;</span>' +
        '<span class="artikel-ornament-line"></span>' +
        '</div>'
      );

    default:
      return '';
  }
}

/** A block that opens a chapter/section (the facelift's <section>). */
function opensSection(b) {
  return (b.t === 'h2' && b.section) || b.t === 'chapter';
}

/**
 * Render an array of blocks to an HTML string for one language.
 * opts.inlineCta = avatar URL → the mobile contact card goes before the 3rd section.
 */
function renderBlocks(blocks, lang, opts) {
  var seen = 0;
  return (blocks || [])
    .map(function (b) {
      var pre = '';
      if (opts && opts.inlineCta && opensSection(b) && ++seen === 3) pre = inlineCta(opts.inlineCta) + '\n';
      return pre + renderBlock(b, lang);
    })
    .join('\n');
}

module.exports = { renderBlocks, loc, stripTags };
