"""Usage (from the repo root):
  python3 admin/scripts/convert-dc-template.py "design_handoff_admin_dashboard/Admin Dashboard v2.dc.html" admin/src/components/admin/stats/DashboardView.tsx

Converts the DC template of 'Admin Dashboard v2.dc.html' into a React TSX view.

Kept 1:1: every element, inline style, text and binding. sc-if / sc-for become
conditionals / maps, {{ x }} becomes V.x (or the loop variable), style-hover /
style-focus become generated CSS classes. Only the deliberate changes listed in
PATCHES are applied before conversion.
"""
import re, sys, json
from html.parser import HTMLParser

SRC, OUT = sys.argv[1], sys.argv[2]
lines = open(SRC, encoding='utf-8').read().split('\n')
helmet_css = '\n'.join(lines[16:22])  # the <style> block inside <helmet>
tpl = '\n'.join(lines[24:1024])       # root <div> … its closing </div>

# Sidebar items of the other admin areas get wired to the admin's navigation.
NAV = {'article': 'navArticles', 'photo_library': 'navMedia', 'map': 'navTours', 'star': 'navReviews', 'science': 'navAbtest', 'settings': 'navSettings'}
side_end = tpl.index('<main ')
side = tpl[:side_end]
def wire(m):
    icon = m.group(2)
    return m.group(1).replace('<div ', '<div onClick="{{ %s }}" ' % NAV[icon], 1) + m.group(2)
side = re.sub(r'(<div (?:(?!onClick)[^>])*>(?:<span[^>]*>))(%s)(?=</span>)' % '|'.join(NAV), wire, side)
tpl = side + tpl[side_end:]

PATCHES = [
    # "Ukázková data" marks the mock data of the prototype; the admin shows real data.
    ('<span style="font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#8C6A3C; border:1px solid #D9CFBC; border-radius:999px; padding:2px 8px;">Ukázková data</span>', ''),
    # Notes addressed to the developer, now done.
    ('Den v týdnu × hodina, tmavší = víc. Hodinu je potřeba začít ukládat v track.mjs.', 'Den v týdnu × hodina, tmavší = víc.'),
    ('Hodinu návštěvy, hloubku čtení a čas na stránce web zatím neměří – v ukázce jsou simulované a je potřeba je doplnit do analytics.ts a track.mjs. ', 'Hodina návštěvy, čas na stránce a dočtenost se měří od 7. 10. 2026, starší návštěvy je nemají. '),
    ('Měřeno anonymně: žádné cookies, žádné IP adresy. Návštěva = jedna otevřená záložka prohlížeče,', 'Měřeno anonymně: žádné cookies, žádné IP adresy. Návštěva = jedna otevřená záložka prohlížeče (sessionStorage),'),
]
for a, b in PATCHES:
    assert tpl.count(a) == 1, a[:60]
    tpl = tpl.replace(a, b)

ATTR = {'onclick': 'onClick', 'onchange': 'onChange', 'onmouseenter': 'onMouseEnter', 'aria-label': 'aria-label', 'data-screen-label': 'data-screen-label'}
VOID = {'input', 'br', 'img'}
EXPR = re.compile(r'\{\{\s*([A-Za-z_][\w.]*)\s*\}\}')

hover_rules, cls_n = [], [0]
loops = []

def expr(path):
    root = path.split('.')[0]
    return path if root in loops else 'V.' + path

def camel(prop):
    if prop.startswith('--'): return json.dumps(prop)
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), prop)

def js_value(v):
    v = v.strip()
    if EXPR.search(v):
        parts = EXPR.split(v)
        out = ''
        for i, p in enumerate(parts):
            out += ('${%s}' % expr(p)) if i % 2 else p.replace('`', '\\`').replace('${', '\\${')
        return '`' + out + '`'
    return json.dumps(v)

def style_obj(css):
    decls = [d for d in re.split(r';(?![^(]*\))', css) if d.strip()]
    items = []
    for d in decls:
        k, _, v = d.partition(':')
        items.append('%s: %s' % (camel(k.strip()), js_value(v)))
    return '{{ %s }}' % ', '.join(items)

def bang(css):
    return ';'.join(d.strip() + ' !important' for d in css.split(';') if d.strip())

def attr_value(v):
    m = EXPR.fullmatch(v.strip())
    if m: return '{%s}' % expr(m.group(1))
    if EXPR.search(v): return '{%s}' % js_value(v)
    return '{%s}' % json.dumps(v, ensure_ascii=False)

out = []
def emit(s): out.append(s)

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'sc-if':
            emit('{%s ? (<>' % expr(EXPR.fullmatch(a['value'].strip()).group(1)))
            self.stack.append('sc-if'); return
        if tag == 'sc-for':
            var = a['as']; lst = expr(EXPR.fullmatch(a['list'].strip()).group(1))
            emit('{(%s || []).map((%s: any, %s_i: number) => (<React.Fragment key={%s_i}>' % (lst, var, var, var))
            loops.append(var); self.stack.append('sc-for'); return
        parts, classes = [tag], []
        for k, v in attrs:
            if k.startswith('hint-'): continue
            if k == 'style': parts.append('style=' + style_obj(v)); continue
            if k in ('style-hover', 'style-focus'):
                cls_n[0] += 1; c = 'zkd-%s%d' % ('h' if k == 'style-hover' else 'f', cls_n[0])
                hover_rules.append('.%s:%s{%s}' % (c, 'hover' if k == 'style-hover' else 'focus', bang(v)))
                classes.append(c); continue
            name = ATTR.get(k, k)
            if name == 'ref': parts.append('ref=%s' % attr_value(v)); continue
            parts.append('%s=%s' % (name, attr_value(v if v is not None else '')))
        if classes: parts.append('className="%s"' % ' '.join(classes))
        if tag == 'input' and 'onChange' not in ' '.join(parts) and any(p.startswith('value=') for p in parts):
            parts.append('readOnly')
        emit('<' + ' '.join(parts) + (' />' if tag in VOID else '>'))
        if tag not in VOID: self.stack.append(tag)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def handle_endtag(self, tag):
        if tag in VOID: return
        t = self.stack.pop()
        assert t == tag, (t, tag)
        if t == 'sc-if': emit('</>) : null}')
        elif t == 'sc-for': loops.pop(); emit('</React.Fragment>))}')
        else: emit('</%s>' % tag)
    def handle_data(self, data):
        if not data.strip():
            if '\n' not in data and data: emit('{" "}')
            return
        parts = EXPR.split(data)
        for i, p in enumerate(parts):
            if i % 2: emit('{%s}' % expr(p))
            elif p: emit('{%s}' % json.dumps(re.sub(r'\s*\n\s*', ' ', p), ensure_ascii=False))

p = P(); p.feed(tpl); p.close()
assert not p.stack, p.stack

body = ''.join(out)
# Global rules of the prototype's <helmet>, scoped to the dashboard root.
scoped = (helmet_css.replace('<style>', '').replace('</style>', '').replace('html, body { margin: 0; background: #FBF9F5; }', '')
          .replace('*, *::before, *::after', '.zkd, .zkd *, .zkd *::before, .zkd *::after')
          .replace('button, input', '.zkd button, .zkd input').replace('a {', '.zkd a {').replace('a:hover', '.zkd a:hover'))
css = scoped.strip() + '\n' + '\n'.join(hover_rules)
body = body.replace('<div style={{ display: "flex", minHeight: "100vh"', '<div className="zkd" style={{ display: "flex", minHeight: "100vh"', 1)

open(OUT, 'w', encoding='utf-8').write('''/* eslint-disable */
// GENERATED from design_handoff_admin_dashboard/Admin Dashboard v2.dc.html by
// admin/scripts/convert-dc-template.py (every element, inline style and text
// kept 1:1). Bindings come from StatsDashboard.renderVals(); edit the logic
// there, and regenerate rather than hand-edit if the design changes.
import React from 'react';

export const DASHBOARD_CSS = %s;

export function DashboardView({ V }: { V: any }) {
  return (%s);
}
''' % (json.dumps(css, ensure_ascii=False), body))
print('ok', len(body), 'chars,', len(hover_rules), 'hover rules')
