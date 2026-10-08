"""Import a journal design prototype (.dc.html from a design handoff) into the
repo's block model (content/journal/*.json or content/pages/*.json).

  python3 scripts/import-dc-article.py <design.dc.html> <handoff.json> <out.json> [--floating]

The handoff JSON supplies the article metadata (slug, dates, status, tags, …);
the blocks, header texts, hero, CTAs, further reading and sources are read
from the design itself, element by element. Anything the walker does not
recognise stops the import, so no content is silently dropped.

Written for design_handoff_blog_facelift (2026-10); the patterns are the
inline styles of those prototypes.
"""
import html as H
import json
import re
import sys

src, meta_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
floating = '--floating' in sys.argv
s = open(src, encoding='utf8').read()
meta = json.load(open(meta_path, encoding='utf8'))
D = lambda v: {'de': v}

# Design-file links → site URLs.
LINKS = {
    'Blog Journal v4.dc.html': '/blog',
    'Blog Strahov Kloster.dc.html': '/blog/strahov-monastery-prague',
    'Blog Was kann man in Prag machen.dc.html': '/blog/was-kann-man-in-prag-machen',
    'Blog Waldstein Garten.dc.html': '/blog/wallenstein-garden-prague',
    'Blog Kleinseite Karlsbruecke Geheimtipps.dc.html': '/blog/tropfsteinwand-mala-strana-karlsbruecke-geheimtipps',
    'Blog Prag im Winter.dc.html': '/blog/prag-im-winter',
    'Blog Prag besichtigen Stadtfuehrer.dc.html': '/blog/prag-besichtigen-stadtfuehrer',
    'Sehenswuerdigkeiten Prag.dc.html': '/sehenswuerdigkeiten-prag',
}
IMAGES = {
    'img/mala-strana.png': '/images/photo-guests-mala-strana.jpeg',
    'img/blog/blog-tropfsteinwand.jpg': '/images/blog-tropfsteinwand.png',
    'img/blog/vltava-bridges-hero-1080.jpg': '/images/hero/vltava-bridges-hero-1080.jpg',
}
TONE = {'#6B1F2A': 'refuted', '#11457E': 'open', '#5C5650': 'unproven'}


PUBLIC = __import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), '..', 'public')


def img_url(p, web=True):
    """Site path of a design image; prefers the optimized copy in /images/web/*.webp."""
    import os
    if p in IMAGES:
        url = IMAGES[p]
    else:
        m = re.match(r'img/blog/(.+)$', p)
        if not m:
            raise SystemExit('UNKNOWN IMAGE ' + p)
        url = '/images/' + m.group(1)
    if not os.path.exists(os.path.join(PUBLIC, url.lstrip('/'))):
        raise SystemExit('IMAGE NOT IN public/: ' + url)
    webp = '/images/web/' + os.path.splitext(os.path.basename(url))[0] + '.webp'
    if web and os.path.exists(os.path.join(PUBLIC, webp.lstrip('/'))):
        return webp
    return url


def link_url(m):
    href = H.unescape(m.group(1))
    return 'href="' + LINKS.get(href, href) + '"'


def clean(h):
    """Authored inline HTML: keep tags, drop the prototype's inline styles."""
    h = re.sub(r'<span style="color:#6B1F2A">', '<span class="j-num">', h)
    h = re.sub(r'\s(style|style-hover|style-focus|hint-placeholder-val|loading)="[^"]*"', '', h)
    h = re.sub(r'href="([^"]*)"', link_url, h)
    return re.sub(r'\s+', ' ', h).strip()


def text(h):
    return H.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', h))).strip()


def style_of(tag_html):
    m = re.search(r'style="([^"]*)"', tag_html)
    return m.group(1) if m else ''


def css(style, prop):
    m = re.search(r'(?:^|;)\s*' + re.escape(prop) + r'\s*:\s*([^;]+)', style)
    return m.group(1).strip() if m else None


# ── Element tree helpers (balanced-tag slicing) ──────────────────────────────
VOID = {'img', 'br', 'input', 'source', 'meta', 'link', 'hr'}


def element_end(h, start):
    """Index after the element that opens at `start` (balanced by tag name)."""
    m = re.compile(r'<([a-z0-9-]+)\b[^>]*>', re.I).match(h, start)
    tag = m.group(1).lower()
    if tag in VOID or m.group(0).endswith('/>'):
        return m.end()
    depth, pos = 0, start
    rx = re.compile(r'<(/?)' + re.escape(tag) + r'\b[^>]*>', re.I)
    while True:
        t = rx.search(h, pos)
        if not t:
            raise SystemExit('UNBALANCED <%s> at %d' % (tag, start))
        depth += -1 if t.group(1) else 1
        pos = t.end()
        if depth == 0:
            return pos


def children(h):
    """Top-level elements of an HTML fragment as (tag, open-tag html, full html)."""
    out, pos = [], 0
    while True:
        m = re.compile(r'\s*').match(h, pos)
        pos = m.end()
        if pos >= len(h):
            return out
        if h.startswith('<!--', pos):
            pos = h.index('-->', pos) + 3
            continue
        m = re.compile(r'<([a-z0-9-]+)\b[^>]*>', re.I).match(h, pos)
        if not m:
            raise SystemExit('TEXT OUTSIDE ELEMENT at %d: %r' % (pos, h[pos:pos + 120]))
        end = element_end(h, pos)
        out.append((m.group(1).lower(), m.group(0), h[pos:end]))
        pos = end


def inner(el):
    return el[el.index('>') + 1:el.rindex('<')]


# ── Block builders ───────────────────────────────────────────────────────────
blocks, sources, sources_title = [], [], None


def figure_block(el):
    st = style_of(el)
    grid = re.search(r'<div style="display:grid', el)
    cap_m = re.search(r'<figcaption[^>]*>(.*?)</figcaption>', el, re.S)
    cap_in = cap_m.group(1) if cap_m else ''
    credit = re.search(r'<span style="color:#8A847D">Bild: (.*?)</span>', cap_in)
    cap = clean(re.sub(r'<span style="color:#8A847D">Bild:.*?</span>', '', cap_in))
    imgs = re.findall(r'<img [^>]*>', el)
    if grid:
        items = []
        for im in imgs:
            ist = style_of(im)
            pos = css(ist, 'object-position') or 'center'
            items.append({'src': img_url(re.search(r'src="([^"]+)"', im).group(1)),
                          'alt': D(H.unescape(re.search(r'alt="([^"]*)"', im).group(1))), 'pos': pos})
        b = {'t': 'gallery', 'images': items, 'cap': D(cap)}
        if credit:
            b['credit'] = text(credit.group(1))
        return b
    im = imgs[0]
    ist = style_of(im)
    b = {'t': 'image', 'src': img_url(re.search(r'src="([^"]+)"', im).group(1)),
         'alt': D(H.unescape(re.search(r'alt="([^"]*)"', im).group(1))), 'cap': D(cap)}
    if credit:
        b['credit'] = text(credit.group(1))
    if 'flex-wrap' in st:
        b['layout'] = 'side'
    ar = css(ist, 'aspect-ratio')
    if ar:
        b['aspect'] = ar.replace(' ', '')
        pos = css(ist, 'object-position') or 'center 50%'
        y = re.search(r'(\d+)%', pos)
        b['focus'] = {'x': 50, 'y': int(y.group(1)) if y else 50}
    return b


def facts_block(el, title=None, note=None):
    st = style_of(el)
    rows = re.findall(r'<div style="display:flex;flex-wrap:wrap;gap:2px 16px;padding:(\d+)px 0[^"]*"><div style="flex:0 0 ([\d.]+rem)[^"]*">(.*?)</div><div[^>]*>(.*?)</div></div>', el, re.S)
    if not rows:
        raise SystemExit('FACTS WITHOUT ROWS: ' + el[:200])
    b = {'t': 'facts', 'items': [{'k': D(text(k)), 'v': D(clean(v))} for _, _, k, v in rows]}
    key, pad = rows[0][1], rows[0][0]
    margin = css(st, 'margin') or ''
    top = css(st, 'border-top') or ''
    if st.startswith('margin-top:22px'):
        pass  # the journal's original practical rows (8.5rem labels, 22px above)
    else:
        b['variant'] = 'schedule' if key == '4.5rem' else 'v2'
    if b.get('variant') == 'v2':
        style = {}
        if key != '10rem':
            style['key'] = key
        if pad != '10':
            style['pad'] = int(pad)
        if margin and margin != '8px 0 1.4em':
            style['margin'] = margin
        if '2px solid #1A1714' in top:
            style['rule'] = 'ink'
        if style:
            b['look'] = style
    if title:
        b['title'] = D(title)
    if note:
        b['note'] = D(note)
    return b


def overview_block(el, h2=None, sub=None):
    rows = re.findall(r'<a href="([^"]+)" style="([^"]*)">(.*?)</a>', el, re.S)
    items, variant = [], 'index'
    for href, ast, ri in rows:
        spans = re.findall(r'<span style="([^"]*)">(.*?)</span>(?=<span|$)', ri, re.S)
        if 'flex:1 1 380px' in ri:  # claims
            variant = 'claims'
            claim = text(re.search(r'<span style="flex:1 1 380px[^>]*>(.*?)</span>', ri, re.S).group(1))
            bm = re.search(r'color:(#[0-9A-F]{6});border:1\.5px[^>]*>(.*?)</span><span[^>]*>(.*?)</span>', ri, re.S)
            items.append({'href': href, 'title': D(claim), 'verdict': TONE[bm.group(1)], 'verdictLabel': D(text(bm.group(2))), 'desc': D(text(bm.group(3)))})
        elif 'flex:0 0 13rem' in ri:  # two columns, no number
            variant = 'toc'
            parts = re.findall(r'<span[^>]*>(.*?)</span>', ri, re.S)
            items.append({'href': href, 'title': D(text(parts[0])), 'desc': D(text(parts[1]))})
        elif 'flex:0 0 1.6rem' in ri:  # ranking: number · name · right note
            variant = 'rank'
            parts = re.findall(r'<span style="([^"]*)">(.*?)</span>', ri, re.S)
            it = {'href': href, 'n': text(parts[0][1]), 'title': D(text(parts[1][1]))}
            if len(parts) > 2:
                it['desc'] = D(text(parts[2][1]))
                if '#11457E' in parts[2][0]:
                    it['tone'] = 'blue'
            items.append(it)
        else:
            parts = re.findall(r'<span[^>]*>(.*?)</span>', ri, re.S)
            n, name, desc = [text(x) for x in parts]
            items.append({'href': href, 'n': n, 'title': D(name), 'desc': D(desc)})
    b = {'t': 'overview', 'variant': variant, 'items': items}
    if h2:
        b['id'] = h2[0]
        b['title'] = D(h2[1])
    if sub:
        b['intro'] = D(sub)
    return b


def cta_block(el):
    title = text(re.search(r'font-size:15px;font-weight:700;color:#1A1714">(.*?)</div>', el, re.S).group(1))
    body = clean(re.search(r'<p[^>]*>(.*?)</p>', el, re.S).group(1))
    a = re.search(r'</div>\s*<a href="([^"]+)"[^>]*>(.*?)</a>\s*$', inner(el).strip() + '\n', re.S)
    b = {'t': 'cta', 'title': D(title), 'html': D(body), 'button': D(text(a.group(2))), 'href': H.unescape(a.group(1))}
    if style_of(el).startswith('margin:2em 0 0'):
        b['tight'] = True
    return b


def faq_block(el):
    qa = re.findall(r'<h3[^>]*>(.*?)</h3>\s*<p[^>]*>(.*?)</p>', el, re.S)
    if not qa:
        raise SystemExit('FAQ WITHOUT ITEMS')
    b = {'t': 'faq', 'items': [{'q': D(text(q)), 'a': D(clean(a))} for q, a in qa]}
    if style_of(el).startswith('border-top:1px solid #E4DFD6'):
        b['variant'] = 'v2'
    return b


def h2_meta(el):
    """The meta row under a numbered heading: optional free/paid badge + parts."""
    badge = re.search(r'<span style="display:inline-flex[^"]*">(.*?)</span>', el)
    rest = re.sub(r'<span style="display:inline-flex[^"]*">.*?</span>', '', inner(el))
    parts = [text(x) for x in re.findall(r'<span(?: aria-hidden="true")?>(.*?)</span>', rest, re.S)]
    parts = [p for p in parts if p != '·']
    return (text(badge.group(1)) if badge else None), ' · '.join(parts)


def walk_body(h, in_section=False):
    kids = children(h)
    i = 0
    while i < len(kids):
        tag, open_, el = kids[i]
        st = style_of(open_)
        nxt = kids[i + 1] if i + 1 < len(kids) else None

        if tag == 'p' and st.startswith('margin:0 0 1.1em'):
            blocks.append({'t': 'p', 'html': D(clean(inner(el)))})
        elif tag == 'aside' and 'background:#EEF3F9' in st:  # "Das Wichtigste in Kürze"
            label = text(re.search(r'<div[^>]*>(.*?)</div>', el, re.S).group(1))
            items = [clean(x) for x in re.findall(r'<li[^>]*>(.*?)</li>', el, re.S)]
            blocks.append({'t': 'callout', 'label': D(label), 'html': D(''), 'list': [D(x) for x in items]})
        elif tag == 'aside' and st.startswith('margin:1.6em 0;padding:18px 22px;background:#F6F4EF'):  # tip box
            label = text(re.search(r'<div[^>]*>(.*?)</div>', el, re.S).group(1))
            body = ''.join('<p>' + clean(x) + '</p>' for x in re.findall(r'<p[^>]*>(.*?)</p>', el, re.S))
            blocks.append({'t': 'callout', 'variant': 'tip', 'label': D(label), 'html': D(body)})
        elif tag == 'aside' and 'display:flex;flex-wrap:wrap;align-items:center' in st:  # CTA
            blocks.append(cta_block(el))
        elif tag == 'sc-if' and 'mob' in open_:
            pass  # mobile contact card: rendered by the template, not content
        elif tag == 'sc-if' and ('showOverview' in open_ or 'showPractical' in open_):
            walk_body(inner(el), in_section)
        elif tag == 'blockquote':
            q = clean(re.search(r'<p[^>]*>(.*?)</p>', el, re.S).group(1))
            by = text(re.search(r'<div[^>]*>(.*?)</div>', el, re.S).group(1))
            blocks.append({'t': 'quote', 'html': D(q), 'by': by})
        elif tag == 'h2' and "font-family:'Hanken" in st and 'font-size:24px' in st:
            hid = re.search(r'id="([^"]+)"', open_)
            title = text(inner(el))
            sub = None
            if nxt and nxt[0] == 'p' and style_of(nxt[1]).startswith('margin:0 0 0.6em'):
                sub = text(inner(nxt[2]))
                i += 1
                nxt = kids[i + 1] if i + 1 < len(kids) else None
            if nxt and nxt[0] == 'div' and 'border-top:2px solid #1A1714' in style_of(nxt[1]) and '<a href=' in nxt[2]:
                blocks.append(overview_block(nxt[2], (hid.group(1) if hid else None, title), sub))
                i += 1
            else:
                b = {'t': 'h2', 'html': D(title)}
                if hid:
                    b['id'] = hid.group(1)
                if sub:
                    b['sub'] = D(sub)
                blocks.append(b)
        elif tag == 'div' and st.startswith('border-top:2px solid #1A1714') and '<a href=' in el:
            blocks.append(overview_block(el))
        elif tag == 'p' and st.startswith("margin:0 0 12px;font-family:'Hanken") and nxt and 'iframe' in nxt[2]:
            note = text(inner(el))
            fr = re.search(r'<iframe src="([^"]+)" title="([^"]*)"', nxt[2])
            blocks.append({'t': 'map', 'src': LINKS.get(fr.group(1), '/maps/sehenswuerdigkeiten-prag.html'), 'title': D(H.unescape(fr.group(2))), 'caption': D(note), 'points': []})
            i += 1
        elif tag == 'figure':
            blocks.append(figure_block(el))
        elif tag == 'div' and (st.startswith('margin:8px 0 1.4em') or st.startswith('margin:14px 0 1.4em') or st.startswith('margin-top:22px') or st.startswith('margin:0.6em 0 2em;border-top:2px')) and 'flex:0 0' in el:
            blocks.append(facts_block(el))
        elif tag == 'div' and st.startswith('margin:1.6em 0 2em'):  # dated list with title + note
            ttl = text(re.search(r'font-weight:700">(.*?)</div>', el, re.S).group(1))
            rows = re.findall(r'<div style="display:flex;flex-wrap:wrap;justify-content:space-between[^"]*"><span>(.*?)</span><span[^>]*>(.*?)</span></div>', el, re.S)
            note = text(re.search(r'<div style="margin-top:8px;font-size:14px[^>]*>(.*?)</div>', el, re.S).group(1))
            blocks.append({'t': 'costTable', 'title': D(ttl), 'rows': [{'k': D(text(k)), 'v': D(text(v))} for k, v in rows], 'note': D(note)})
        elif tag == 'div' and (st.startswith('margin-top:0.6em;border-top:2px') or ('padding:16px 0' in el and '<h3' in el and 'border-top' in st)):
            blocks.append(faq_block(el))
        elif tag == 'div' and 'padding:18px 22px 20px;background:#F6F4EF;border-top:3px' in st:  # myth / fact-check
            c = re.search(r'border-top:3px solid (#[0-9A-F]{6})', st).group(1)
            label = text(re.search(r'font-size:14px;font-weight:700[^>]*>(.*?)</span>', el, re.S).group(1))
            vlabel = text(re.search(r'text-transform:uppercase[^>]*>(.*?)</span>', el, re.S).group(1))
            ps = re.findall(r'<p[^>]*>(.*?)</p>', el, re.S)
            blocks.append({'t': 'factcheck', 'label': D(label), 'verdict': TONE[c], 'verdictLabel': D(vlabel),
                           'claim': D(clean(ps[0])), 'html': D(''.join('<p>' + clean(p) + '</p>' for p in ps[1:]) if len(ps) > 2 else clean(ps[1]))})
        elif tag == 'h3':
            blocks.append({'t': 'h3', 'html': D(clean(inner(el)))})
        elif tag in ('ol', 'ul') and not st.startswith('margin:14px 0 0'):
            b = {'t': 'list', 'items': [D(clean(x)) for x in re.findall(r'<li[^>]*>(.*?)</li>', el, re.S)]}
            if tag == 'ol':
                b['ordered'] = True
            blocks.append(b)
        elif tag == 'section':
            walk_section(open_, el)
        else:
            raise SystemExit('UNRECOGNISED <%s style="%s"> %r' % (tag, st[:80], text(el)[:100]))
        i += 1


def walk_section(open_, el):
    global sources_title
    st = style_of(open_)
    sid = re.search(r'id="([^"]+)"', open_)
    body = inner(el)
    kids = children(body)
    if 'border-top:3px solid #1A1714' in st:  # sources
        sources_title = text(inner(kids[0][2]))
        sources.extend(D(clean(x)) for x in re.findall(r'<li[^>]*>(.*?)</li>', kids[1][2], re.S))
        return
    if st.startswith('margin-top:48px') and 'Hanken' in st:  # further reading
        title = text(inner(kids[0][2]))
        links = re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', kids[1][2], re.S)
        blocks.append({'t': 'links', 'title': D(title), 'items': [{'href': LINKS.get(H.unescape(h), H.unescape(h)), 'text': D(text(t))} for h, t in links]})
        return
    if not st.startswith('padding-top:'):
        raise SystemExit('UNKNOWN SECTION ' + st)
    pad = int(re.search(r'padding-top:(\d+)px', st).group(1))
    first = kids[0]
    rest_from = 1
    if first[0] == 'div' and 'border-bottom:2px solid #1A1714' in style_of(first[1]):  # chapter label row
        lab = re.findall(r'<span[^>]*>(.*?)</span>', first[2], re.S)
        h2 = kids[1]
        b = {'t': 'chapter', 'label': D(text(lab[0])), 'meta': D(text(lab[1])), 'html': D(clean(inner(h2[2])))}
        if sid:
            b['id'] = sid.group(1)
        blocks.append(b)
        rest_from = 2
    elif first[0] == 'h2':
        b = {'t': 'h2', 'section': True, 'html': D(clean(inner(first[2])))}
        if sid:
            b['id'] = sid.group(1)
        if pad != 48:
            b['pad'] = pad
        nxt = kids[1] if len(kids) > 1 else None
        if nxt and nxt[0] == 'p' and style_of(nxt[1]).startswith("margin:0 0 14px;font-family:'Hanken"):
            b['sub'] = D(text(inner(nxt[2])))
            rest_from = 2
        elif nxt and nxt[0] == 'div' and style_of(nxt[1]).startswith('margin:0 0 14px;display:flex'):
            badge, sub = h2_meta(nxt[2])
            if badge:
                b['free'] = badge == 'Kostenlos'
                if badge not in ('Kostenlos', 'Eintritt'):
                    raise SystemExit('UNKNOWN BADGE ' + badge)
            b['sub'] = D(sub)
            rest_from = 2
        blocks.append(b)
    else:
        raise SystemExit('SECTION WITHOUT HEADING: ' + first[1][:120])
    walk_body(''.join(k[2] for k in kids[rest_from:]), True)


# ── Header ───────────────────────────────────────────────────────────────────
a0 = s.find('<article')
head = s[a0:s.find('</header>', a0)]
crumb = text(re.search(r'<span aria-hidden="true">›</span>(.*?)</div>', head, re.S).group(1))
kicker = text(re.search(r'margin-top:22px[^>]*>(.*?)</div>', head, re.S).group(1))
title = text(re.search(r'<h1[^>]*>(.*?)</h1>', head, re.S).group(1))
dek = text(re.search(r'</h1>\s*<p[^>]*>(.*?)</p>', head, re.S).group(1))
right = re.search(r'<div style="margin-left:auto[^>]*>(.*?)</div>\s*</div>\s*$', head.strip(), re.S)
right_html = right.group(1) if right else re.search(r'text-align:right">(.*?)</div>', head, re.S).group(1)
updated_label = re.search(r'background:#11457E"></span>(.*?)</span>', right_html)
dateline = [text(x) for x in re.findall(r'<span>(.*?)</span>', right_html, re.S)] or [text(x) for x in right_html.split('<br>')]
read_m = re.search(r'Lesezeit (\d+) Minuten', ' '.join(dateline))

fig = s[s.find('</header>', a0):s.find('</figure>', a0)]
him = re.search(r'<img src="([^"]+)" alt="([^"]*)" style="([^"]*)"', fig)
hcap = re.search(r'<figcaption[^>]*>(.*?)</figcaption>', fig, re.S).group(1)
hcredit = re.search(r'<span style="color:#8A847D">Bild: (.*?)</span>', hcap)

seo_title = H.unescape(re.search(r'<title>(.*?)</title>', s).group(1))
seo_title = re.sub(r'\s*\|\s*Zuza.*$', '', seo_title)
seo_desc = H.unescape(re.search(r'<meta name="description" content="([^"]*)"', s).group(1))

# ── Body ─────────────────────────────────────────────────────────────────────
start = re.search(r'<div style="margin:0 auto;max-width:860px;margin-top:32px[^>]*>', s)
body_end = element_end(s, start.start())
walk_body(inner(s[start.start():body_end]))

# ── Assemble ─────────────────────────────────────────────────────────────────
art = {k: v for k, v in meta.items() if k != 'blocks'}
art['status'] = 'published'
art['layout'] = 'v2'
art['category'] = crumb
art['kicker'] = D(kicker)
art['title'] = D(title)
art['dek'] = D(dek)
art['seoTitle'] = D(seo_title)
art['seoDescription'] = D(seo_desc)
if read_m:
    art['readTime'] = {'de': read_m.group(1) + ' Min.'}
art['hero'] = img_url(him.group(1))
art['heroAlt'] = D(H.unescape(him.group(2)))
hst = him.group(3)
art['heroLook'] = {'pos': css(hst, 'object-position') or 'center 50%', 'maxH': int(re.search(r'max-height:(\d+)px', hst).group(1))}
art['heroCap'] = D(clean(re.sub(r'<span style="color:#8A847D">Bild:.*?</span>', '', hcap)))
if hcredit:
    art['heroCredit'] = text(hcredit.group(1))
if updated_label:
    art['updatedDisplay'] = D(text(updated_label.group(1)))
    first_pub = re.search(r'Erstmals veröffentlicht am (.*?)( ·|$)', ' '.join(dateline))
    if first_pub:
        art['dateDisplay'] = D(first_pub.group(1).strip())
elif dateline and dateline[0].startswith('Veröffentlicht am '):
    art['dateDisplay'] = D(dateline[0][len('Veröffentlicht am '):])
    art['datePrefix'] = True
else:
    art['dateDisplay'] = D(dateline[0])
if floating:
    art['floatingCta'] = True
if sources:
    art['sources'] = sources
    if sources_title and sources_title != 'Quellen':
        art['sourcesTitle'] = D(sources_title)
art.pop('thumb', None)
# Social preview stays JPG/PNG (WebP previews are poorly supported).
if art.get('ogImage'):
    art['ogImage'] = img_url('img/blog/' + art['ogImage'].rsplit('/', 1)[-1], web=False)
art['blocks'] = blocks
order = ['slug', 'slugDe', 'path', 'canonical', 'languages', 'status', 'layout', 'date', 'dateDisplay', 'datePrefix', 'updated', 'updatedDisplay',
         'redirectFrom', 'category', 'kicker', 'readTime', 'hero', 'heroAlt', 'heroLook', 'heroCap', 'heroCredit', 'title', 'excerpt', 'dek',
         'seoTitle', 'seoDescription', 'tags', 'author', 'ogImage', 'floatingCta', 'sourcesTitle', 'sources', 'blocks']
art = {k: art[k] for k in order if k in art} | {k: v for k, v in art.items() if k not in order}
open(out, 'w', encoding='utf8').write(json.dumps(art, ensure_ascii=False, indent=2) + '\n')

from collections import Counter
print('%-52s %s | sources %d | %s' % (art['slug'], dict(Counter(b['t'] for b in blocks)), len(sources), ' / '.join(dateline)))
