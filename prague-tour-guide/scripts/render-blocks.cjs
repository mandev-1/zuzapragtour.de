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

function renderBlock(b, lang) {
  switch (b.t) {
    case 'p':
      return '<p' + (b.lead ? ' class="lead"' : '') + '>' + loc(b.html, lang) + '</p>';

    case 'h2':
      // No id here — BlogPostPage.injectHeadingIds adds heading-N ids + TOC.
      return '<h2>' + loc(b.html, lang) + '</h2>';

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
        '<div class="callout-box">' +
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
      return '<figure class="blog-inline-image">' + imgTag + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
    }

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
      return '<div class="cost-table">' + header + rows + '</div>';
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
      // No dedicated public CSS for facts — reuse the cost-table key/value layout.
      var fh = '<p class="cost-table-header">' + escText(loc(b.title, lang) || 'Gut zu wissen') + '</p>';
      var fr = (b.items || [])
        .map(function (it) {
          return (
            '<div class="cost-table-row">' +
            '<span class="cost-table-label">' + escText(loc(it.k, lang)) + '</span>' +
            '<span class="cost-table-amount">' + escText(loc(it.v, lang)) + '</span>' +
            '</div>'
          );
        })
        .join('');
      return '<div class="cost-table">' + fh + fr + '</div>';
    }

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

/** Render an array of blocks to an HTML string for one language. */
function renderBlocks(blocks, lang) {
  return (blocks || []).map(function (b) { return renderBlock(b, lang); }).join('\n');
}

module.exports = { renderBlocks, loc };
