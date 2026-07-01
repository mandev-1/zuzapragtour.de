import React from 'react';
import { createPortal } from 'react-dom';

export interface LinkTarget {
  slug: string;
  title: string;
}

const CSS = `
.zst{position:fixed;transform:translate(-50%,-100%);z-index:58;background:var(--ink);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);padding:3px;font-family:var(--font-sans)}
.zst-row{display:flex;align-items:center;gap:1px}
.zst-b{min-width:30px;height:30px;padding:0 .4rem;border:0;background:transparent;color:rgba(245,239,228,.85);border-radius:var(--radius-sm);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px}
.zst-b:hover{background:rgba(245,239,228,.16);color:var(--ivory)}
.zst-b .material-symbols-outlined{font-size:17px}
.zst-sep{width:1px;height:18px;background:rgba(245,239,228,.2);margin:0 3px}
.zst-link{display:flex;flex-direction:column;min-width:288px}
.zst-link input{border:0;outline:0;background:rgba(245,239,228,.1);color:var(--ivory);border-radius:var(--radius-sm);padding:.55rem .6rem;font-family:var(--font-sans);font-size:13px;margin:2px}
.zst-link input::placeholder{color:rgba(245,239,228,.5)}
.zst-go{align-self:flex-end;border:0;background:var(--burgundy);color:var(--ivory);border-radius:var(--radius-sm);padding:.45rem .8rem;margin:2px;font-size:12px;font-weight:600;cursor:pointer}
.zst-list{display:flex;flex-direction:column;max-height:190px;overflow:auto;margin:2px}
.zst-it{display:flex;align-items:center;gap:.5rem;border:0;background:transparent;color:rgba(245,239,228,.85);padding:.5rem;border-radius:var(--radius-sm);cursor:pointer;font-family:var(--font-sans);font-size:12px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zst-it:hover{background:rgba(245,239,228,.16);color:var(--ivory)}
.zst-it .material-symbols-outlined{font-size:15px;color:var(--brass);flex-shrink:0}
.zst-hint{color:rgba(245,239,228,.4);font-size:10px;padding:0 .5rem .35rem}
`;

function closestEditable(node: Node | null): HTMLElement | null {
  let n: Node | null = node;
  while (n) {
    if (n instanceof HTMLElement && n.hasAttribute('contenteditable')) return n;
    n = n.parentNode;
  }
  return null;
}

function commitEl(el: HTMLElement) {
  const fn = (el as any).__commit;
  if (typeof fn === 'function') fn(el.innerHTML);
}

function wrapRange(range: Range, node: HTMLElement) {
  try {
    range.surroundContents(node);
  } catch {
    node.appendChild(range.extractContents());
    range.insertNode(node);
  }
}

function wrapTag(range: Range, tag: string) {
  wrapRange(range, document.createElement(tag));
}

function wrapLink(range: Range, href: string, external: boolean) {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  if (external) {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  }
  wrapRange(range, a);
}

/**
 * SelectionToolbar — a floating bubble that appears when text is selected inside
 * a block. Bold / italic, and a link tool that takes an external URL or filters
 * your own articles to insert an internal /blog/<slug> link. Applies edits on a
 * cloned Range (no focus juggling) and commits via the editable's __commit hook.
 */
export function SelectionToolbar({ editorRef, articles }: { editorRef: React.RefObject<HTMLElement>; articles: LinkTarget[] }) {
  const [box, setBox] = React.useState<{ x: number; y: number } | null>(null);
  const [linkMode, setLinkMode] = React.useState(false);
  const [q, setQ] = React.useState('');
  const saved = React.useRef<{ range: Range; el: HTMLElement } | null>(null);
  const modeRef = React.useRef(false);
  modeRef.current = linkMode;

  React.useEffect(() => {
    const onSel = () => {
      if (modeRef.current) return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setBox(null); return; }
      const range = sel.getRangeAt(0);
      const root = editorRef.current;
      const el = closestEditable(range.commonAncestorContainer);
      if (!root || !el || !root.contains(el)) { setBox(null); return; }
      const rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) { setBox(null); return; }
      setBox({ x: rect.left + rect.width / 2, y: rect.top });
    };
    document.addEventListener('selectionchange', onSel);
    return () => document.removeEventListener('selectionchange', onSel);
  }, [editorRef]);

  React.useEffect(() => {
    const onScroll = () => { if (!modeRef.current) setBox(null); };
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, []);

  const capture = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0).cloneRange();
    const el = closestEditable(range.commonAncestorContainer);
    return el ? { range, el } : null;
  };

  const format = (tag: string) => {
    const cap = capture();
    if (cap) { wrapTag(cap.range, tag); commitEl(cap.el); }
    setBox(null);
  };

  const openLink = () => {
    saved.current = capture();
    if (saved.current) { setLinkMode(true); setQ(''); }
  };

  const close = () => { setLinkMode(false); setBox(null); setQ(''); saved.current = null; };

  const applyLink = (href: string, external: boolean) => {
    const cap = saved.current;
    if (cap && href) { wrapLink(cap.range, href, external); commitEl(cap.el); }
    close();
  };

  if (!box) return null;

  const term = q.trim();
  const isUrl = /^(https?:\/\/|\/|mailto:|tel:)/i.test(term);
  const matches = !isUrl && term ? articles.filter((a) => a.title.toLowerCase().includes(term.toLowerCase())).slice(0, 6) : [];

  return createPortal(
    <div className="zst" style={{ left: box.x, top: box.y - 10 }}>
      <style>{CSS}</style>
      {!linkMode ? (
        <div className="zst-row" onMouseDown={(e) => e.preventDefault()}>
          <button type="button" className="zst-b" title="Fett" onClick={() => format('strong')}><b>B</b></button>
          <button type="button" className="zst-b" title="Kursiv" onClick={() => format('em')}><i>i</i></button>
          <span className="zst-sep" />
          <button type="button" className="zst-b" title="Link einfügen" onClick={openLink}><span className="material-symbols-outlined">link</span></button>
        </div>
      ) : (
        <div className="zst-link">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isUrl) applyLink(term, /^https?:/i.test(term));
              if (e.key === 'Escape') close();
            }}
            onBlur={() => setTimeout(() => { if (modeRef.current) close(); }, 150)}
            placeholder="https://…  ·  oder eigenen Artikel suchen"
          />
          {isUrl && (
            <button type="button" className="zst-go" onMouseDown={(e) => e.preventDefault()} onClick={() => applyLink(term, /^https?:/i.test(term))}>
              Verlinken
            </button>
          )}
          {!isUrl && term !== '' && matches.length === 0 && <div className="zst-hint">Kein Artikel gefunden — oder eine URL eingeben.</div>}
          {matches.length > 0 && (
            <div className="zst-list">
              {matches.map((a) => (
                <button key={a.slug} type="button" className="zst-it" onMouseDown={(e) => e.preventDefault()} onClick={() => applyLink(`/blog/${a.slug}`, false)}>
                  <span className="material-symbols-outlined">article</span>
                  {a.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>,
    document.body
  );
}

export default SelectionToolbar;
