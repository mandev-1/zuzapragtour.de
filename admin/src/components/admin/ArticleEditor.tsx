import React from 'react';
import type { Block, JournalArticle, Lang, OverviewItem, Verdict } from '../../types/journal';
import { BLOCK_TYPES, CATEGORIES, VERDICTS, freshBlock, getL, setL, isBilingual, computeReadMinutes } from '../../lib/journal';
import { MapBuilder } from './MapBuilder';
import { ImagePicker } from './ImagePicker';
import { ImageBlockEditor } from './ImageBlockEditor';
import { SelectionToolbar, type LinkTarget } from './SelectionToolbar';
import { mediaUrl } from '../../lib/api';

// Preview images same-origin via get-image (works for not-yet-deployed images).
const img = (src?: string) => mediaUrl(src || '');

const CSS = `
.zpt-article-editor{display:grid;grid-template-columns:1fr 312px;gap:0;min-height:100%;font-family:var(--font-sans);color:var(--ink)}
.zpt-article-editor *{box-sizing:border-box}
[contenteditable][data-ph]:empty::before{content:attr(data-ph);color:var(--stone-400)}
.zpe-scroll{overflow:auto;padding:1.4rem 2.2rem 5rem;display:flex;justify-content:center}
.zpe-paper{width:100%;max-width:740px}
.zpe-langseg{display:inline-flex;background:var(--stone-100);border-radius:var(--radius-md);padding:3px;margin:0 0 1rem}
.zpe-langseg button{border:0;background:transparent;border-radius:calc(var(--radius-md) - 2px);padding:.4rem .95rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-mute);cursor:pointer}
.zpe-langseg button.is-on{background:#fff;color:var(--burgundy);box-shadow:var(--shadow-xs)}
.zpe-langseg button .dot{display:inline-block;width:6px;height:6px;border-radius:999px;background:var(--brass);margin-left:.4rem}
.zpe-cat{display:inline-flex;align-items:center;gap:.4rem;border:1px solid var(--rule);background:#fff;border-radius:var(--radius-pill);padding:.35rem .5rem .35rem .8rem;font-family:var(--font-sans);font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--brass-deep);cursor:pointer}
.zpe-cat select{border:0;background:transparent;font:inherit;color:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer;outline:0}
.zpe-hero{position:relative;margin:1.1rem 0 0;aspect-ratio:16/9;border-radius:var(--radius-lg);overflow:hidden;background:var(--stone-200) center/cover;display:flex;align-items:flex-end;box-shadow:inset 0 0 0 1px rgba(26,23,20,.08)}
.zpe-hero .zpe-herobtn{position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:.35rem;background:rgba(26,23,20,.78);color:var(--ivory);border:0;border-radius:var(--radius-md);padding:.45rem .7rem;font-family:var(--font-sans);font-size:11px;font-weight:500;cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.zpe-hero .zpe-herobtn .material-symbols-outlined{font-size:15px}
.zpe-herocap{position:relative;width:100%;padding:1.4rem 1rem .7rem;background:linear-gradient(transparent,rgba(26,23,20,.55));color:var(--ivory);font-family:var(--font-body);font-style:italic;font-size:12px;border:0;outline:0}
.zpe-herocap:focus{box-shadow:inset 0 -2px 0 var(--gold-lamp)}
.zpe-title{font-family:var(--font-display);font-size:clamp(2rem,4vw,2.9rem);font-weight:400;line-height:1.06;letter-spacing:-.015em;color:var(--ink);margin:1.3rem 0 0;outline:0}
.zpe-title:focus{box-shadow:inset 0 -2px 0 var(--rule)}
.zpe-title em{font-family:var(--font-italic);font-style:italic;color:var(--burgundy)}
.zpe-stand{font-family:var(--font-italic);font-style:italic;font-size:1.3rem;line-height:1.45;color:var(--ink-mute);margin:1rem 0 0;outline:0}
.zpe-stand:focus{box-shadow:inset 0 -2px 0 var(--rule)}
.zpe-blocks{margin-top:1.4rem}
.zpe-ins{height:14px;position:relative;display:flex;align-items:center;justify-content:center}
.zpe-ins::before{content:"";position:absolute;left:0;right:0;height:1px;background:var(--burgundy);opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.zpe-ins button{position:relative;width:22px;height:22px;border-radius:999px;border:1px solid var(--rule);background:#fff;color:var(--burgundy);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}
.zpe-ins button .material-symbols-outlined{font-size:16px}
.zpe-ins:hover::before{opacity:.5}
.zpe-ins:hover button{opacity:1;transform:none}
.zpe-block{position:relative;border-radius:var(--radius-md);transition:background var(--dur-fast) var(--ease-out)}
.zpe-block:hover{background:rgba(168,134,84,.05)}
.zpe-block.is-sel{background:rgba(107,31,42,.05);box-shadow:0 0 0 1px rgba(107,31,42,.2)}
.zpe-block-inner{padding:.5rem .7rem}
.zpe-tools{position:absolute;top:-13px;right:8px;display:flex;align-items:center;gap:1px;background:var(--ink);border-radius:var(--radius-md);padding:2px;box-shadow:var(--shadow-md);opacity:0;pointer-events:none;transform:translateY(3px);transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);z-index:5}
.zpe-block.is-sel .zpe-tools{opacity:1;pointer-events:auto;transform:none}
.zpe-tools .zpe-type{font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,239,228,.55);padding:0 .5rem 0 .4rem}
.zpe-tools button{width:26px;height:26px;border:0;background:transparent;color:rgba(245,239,228,.8);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer}
.zpe-tools button:hover{background:rgba(245,239,228,.14);color:var(--ivory)}
.zpe-tools button.danger:hover{background:var(--burgundy);color:var(--ivory)}
.zpe-tools .material-symbols-outlined{font-size:16px}
.zpe-p{font-family:var(--font-body);font-size:1.0625rem;line-height:1.72;color:var(--ink-soft);margin:0;outline:0}
.zpe-p.is-lead{font-size:1.18rem;color:var(--ink)}
.zpe-h2{font-family:var(--font-display);font-size:1.7rem;font-weight:400;line-height:1.15;color:var(--ink);margin:.4rem 0 0;outline:0}
.zpe-h2 em{font-family:var(--font-italic);font-style:italic;color:var(--burgundy)}
.zpe-quote{border-left:2px solid var(--burgundy);padding-left:1.3rem;margin:.2rem 0}
.zpe-quote .q{font-family:var(--font-italic);font-style:italic;font-size:1.55rem;line-height:1.35;color:var(--ink);outline:0}
.zpe-quote .by{font-family:var(--font-sans);font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--brass-deep);margin-top:.6rem;outline:0}
.zpe-callout{border-left:3px solid var(--brass);background:rgba(168,134,84,.07);border-radius:0 var(--radius-md) var(--radius-md) 0;padding:1rem 1.2rem}
.zpe-callout .cl{font-family:var(--font-sans);font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--brass-deep);margin-bottom:.4rem;outline:0}
.zpe-callout .cb{font-family:var(--font-body);font-size:.95rem;line-height:1.6;color:var(--ink-soft);outline:0}
.zpe-callout .cb p{margin:0 0 .5rem}.zpe-callout .cb p:last-child{margin:0}
.zpe-callout .cb ul{margin:.3rem 0 0;padding-left:1.1rem}
.zpe-img{aspect-ratio:3/2;border-radius:var(--radius-lg);background:var(--stone-100) center/cover;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;border:1px dashed var(--stone-300);color:var(--ink-mute)}
.zpe-img.has-src{border-style:solid;border-color:transparent}
.zpe-img .material-symbols-outlined{font-size:30px;color:var(--stone-400)}
.zpe-imgbtn{border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.4rem .8rem;font-family:var(--font-sans);font-size:12px;color:var(--ink-soft);cursor:pointer}
.zpe-imgcap{font-family:var(--font-body);font-style:italic;font-size:12px;color:var(--ink-mute);text-align:center;margin:.5rem 0 0;outline:0;border:0;width:100%}
.zpe-cost{border:1px solid var(--rule);border-radius:var(--radius-md);overflow:hidden}
.zpe-cost .ct{font-family:var(--font-display);font-size:1rem;padding:.6rem .9rem;border-bottom:1px solid var(--rule);background:var(--stone-50);outline:0}
.zpe-costrow{display:flex;justify-content:space-between;gap:1rem;padding:.55rem .9rem;border-bottom:1px solid var(--rule-soft);font-size:13px}
.zpe-costrow:last-child{border-bottom:0}
.zpe-costrow span{outline:0}.zpe-costrow span:first-child{color:var(--ink-soft)}.zpe-costrow span:last-child{color:var(--ink);font-weight:600}
.zpe-costadd{width:100%;border:0;border-top:1px solid var(--rule-soft);background:transparent;color:var(--brass-deep);padding:.5rem;font-family:var(--font-sans);font-size:12px;cursor:pointer}
.zpe-costadd:hover{background:var(--stone-50)}
.zpe-orn{display:flex;align-items:center;justify-content:center;gap:1rem;color:var(--brass);padding:.6rem 0}
.zpe-orn span{height:1px;width:64px;background:var(--brass);opacity:.5}
.zpe-mapwrap{border:1px solid var(--rule);border-radius:var(--radius-lg);padding:.8rem;background:#fff}
.zpe-maphead{display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem}
.zpe-maphead b{font-family:var(--font-display);font-size:1.05rem;font-weight:400;color:var(--ink);outline:0}
.zpe-mapedit{display:inline-flex;align-items:center;gap:.4rem;border:1px solid var(--burgundy);background:transparent;color:var(--burgundy);border-radius:var(--radius-md);padding:.4rem .75rem;font-family:var(--font-sans);font-size:11px;font-weight:600;letter-spacing:.04em;cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zpe-mapedit:hover{background:var(--burgundy);color:var(--ivory)}
.zpe-mapedit .material-symbols-outlined{font-size:15px}
.zpe-addblock{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;margin-top:1rem;border:1px dashed var(--rule);background:#fff;color:var(--ink-soft);border-radius:var(--radius-md);padding:.85rem;font-family:var(--font-sans);font-size:13px;font-weight:500;cursor:pointer;transition:border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zpe-addblock:hover{border-color:var(--burgundy);color:var(--burgundy)}
.zpe-addblock .material-symbols-outlined{font-size:18px}
.zpe-meta{border-left:1px solid var(--rule);background:#FCFBF8;overflow:auto;padding:1.4rem 1.3rem 3rem}
.zpe-sec{padding:0 0 1.2rem;margin-bottom:1.2rem;border-bottom:1px solid var(--rule-soft)}
.zpe-sec:last-child{border-bottom:0}
.zpe-sl{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-mute);margin:0 0 .7rem}
.zpe-statseg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;background:var(--stone-100);border-radius:var(--radius-md);padding:3px}
.zpe-statseg button{border:0;background:transparent;border-radius:calc(var(--radius-md) - 2px);padding:.45rem .2rem;font-family:var(--font-sans);font-size:11px;font-weight:600;color:var(--ink-mute);cursor:pointer}
.zpe-statseg button.is-on{background:#fff;color:var(--ink);box-shadow:var(--shadow-xs)}
.zpe-statseg button.is-on[data-s="published"]{color:#3F6B4A}
.zpe-bil{display:flex;align-items:center;gap:.5rem;font-size:12px;color:var(--ink-soft);cursor:pointer}
.zpe-bil input{accent-color:var(--burgundy);width:15px;height:15px}
.zpe-field{margin-bottom:.7rem}
.zpe-field label{display:block;font-size:11px;color:var(--ink-mute);margin-bottom:.25rem}
.zpe-inp{display:flex;align-items:center;gap:.3rem;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.5rem .6rem}
.zpe-inp .pre{font-size:12px;color:var(--stone-400)}
.zpe-inp input,.zpe-inp select,.zpe-inp textarea{border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:13px;color:var(--ink);width:100%;resize:none}
.zpe-inp:focus-within{border-color:var(--ink)}
.zpe-thumb{display:flex;gap:.7rem;align-items:center}
.zpe-thumb .t{width:62px;height:46px;border-radius:var(--radius-md);background:var(--stone-200) center/cover;flex-shrink:0;box-shadow:inset 0 0 0 1px rgba(26,23,20,.08)}
.zpe-overlay{position:fixed;inset:0;background:rgba(26,23,20,.42);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;z-index:60;padding:1.5rem}
.zpe-pal{width:480px;max-width:100%;background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);overflow:hidden}
.zpe-pal-h{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.2rem;border-bottom:1px solid var(--rule)}
.zpe-pal-h b{font-family:var(--font-display);font-size:1.2rem;font-weight:400}
.zpe-pal-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;padding:1.1rem}
.zpe-pal-it{display:flex;align-items:center;gap:.8rem;border:1px solid var(--rule);border-radius:var(--radius-md);padding:.8rem;background:#fff;cursor:pointer;text-align:left;transition:border-color var(--dur-fast) var(--ease-out),background var(--dur-fast) var(--ease-out)}
.zpe-pal-it:hover{border-color:var(--burgundy);background:rgba(107,31,42,.04)}
.zpe-pal-it .ic{width:38px;height:38px;border-radius:var(--radius-md);background:var(--stone-100);display:flex;align-items:center;justify-content:center;color:var(--burgundy);flex-shrink:0}
.zpe-pal-it .ic .material-symbols-outlined{font-size:20px}
.zpe-pal-it b{display:block;font-family:var(--font-sans);font-size:13px;font-weight:600;color:var(--ink)}
.zpe-pal-it small{display:block;font-size:11px;color:var(--ink-mute)}
.zpe-iconbtn{width:32px;height:32px;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;display:flex;align-items:center;justify-content:center}
.zpe-iconbtn:hover{background:var(--stone-100);color:var(--ink)}
.zpe-modal{width:880px;max-width:100%;max-height:88vh;overflow:auto;background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl)}
.zpe-modal-h{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.4rem;border-bottom:1px solid var(--rule);position:sticky;top:0;background:#fff;z-index:2}
.zpe-modal-h b{font-family:var(--font-display);font-size:1.35rem;font-weight:400}
.zpe-modal-h .done{border:0;background:var(--burgundy);color:var(--ivory);border-radius:var(--radius-md);padding:.55rem 1.1rem;font-family:var(--font-sans);font-size:12px;font-weight:600;letter-spacing:.04em;cursor:pointer}
.zpe-kicker{font-family:var(--font-sans);font-size:13px;font-weight:700;color:#11457E;margin:1.3rem 0 0;outline:0}
.zpe-kicker + .zpe-title{margin-top:.35rem}
.zpe-sm{border:1px solid var(--rule-soft);border-radius:var(--radius-sm);background:#fff;padding:.2rem .45rem;font-family:var(--font-sans);font-size:11px;color:var(--ink);outline:0;width:7rem}
.zpe-sm:focus{border-color:var(--ink)}
.zpe-anchor{display:inline-flex;align-items:center;gap:.3rem;margin-top:.4rem;font-size:11px;color:var(--ink-mute)}
.zpe-x{flex-shrink:0;width:22px;height:22px;border:0;background:transparent;color:var(--stone-400);border-radius:var(--radius-sm);cursor:pointer;display:flex;align-items:center;justify-content:center}
.zpe-x:hover{background:var(--stone-100);color:var(--burgundy)}
.zpe-x .material-symbols-outlined{font-size:16px}
.zpe-rowx{display:flex;align-items:flex-start;gap:.4rem}
.zpe-rowx > .grow{flex:1;min-width:0;outline:0}
.zpe-check{display:inline-flex;align-items:center;gap:.4rem;font-size:11px;color:var(--ink-mute);margin-bottom:.4rem;cursor:pointer}
.zpe-check input{accent-color:var(--burgundy)}
.zpe-list{margin:0;padding-left:1.3rem;font-family:var(--font-body);font-size:1rem;line-height:1.6;color:var(--ink-soft)}
.zpe-list li{margin:.2rem 0}
.zpe-cost .note{font-size:12px;color:var(--ink-mute);padding:.5rem .9rem;border-top:1px solid var(--rule-soft);outline:0}
.zpe-costrow .zpe-x{margin-left:-.4rem}
.zpe-chap .lab{display:flex;align-items:baseline;gap:.8rem;border-bottom:2px solid var(--ink);padding-bottom:.35rem;font-size:13px}
.zpe-chap .lab .n{font-weight:700;color:var(--burgundy);outline:0}
.zpe-chap .lab .m{flex:1;color:var(--ink-mute);outline:0}
.zpe-fc{background:#F6F4EF;border-top:3px solid #5C5650;padding:.8rem 1rem}
.zpe-fc[data-v="refuted"]{border-top-color:var(--burgundy)}
.zpe-fc[data-v="open"]{border-top-color:#11457E}
.zpe-fc .hd{display:flex;align-items:center;flex-wrap:wrap;gap:.6rem;font-size:12px}
.zpe-fc .hd .l{font-weight:700;outline:0}
.zpe-fc .cl{font-family:var(--font-italic);font-style:italic;font-size:1.25rem;line-height:1.35;color:var(--ink);margin:.5rem 0 0;outline:0}
.zpe-fc .tx{font-size:13px;line-height:1.55;color:var(--ink-soft);margin:.4rem 0 0;outline:0}
.zpe-sel{border:1px solid var(--rule);border-radius:var(--radius-sm);background:#fff;padding:.15rem .3rem;font-family:var(--font-sans);font-size:11px;color:var(--ink)}
.zpe-badge{border:1.5px solid currentColor;border-radius:3px;padding:0 .4rem;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;outline:0;color:#5C5650}
.zpe-badge[data-v="refuted"]{color:var(--burgundy)}
.zpe-badge[data-v="open"]{color:#11457E}
.zpe-ov .ttl{font-family:var(--font-sans);font-size:1.05rem;font-weight:700;color:var(--ink);outline:0}
.zpe-ov .intro{font-size:12px;color:var(--ink-mute);margin:.2rem 0 .5rem;outline:0}
.zpe-ovrows{border-top:2px solid var(--ink)}
.zpe-ovrow{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem .6rem;padding:.45rem 0;border-bottom:1px solid var(--rule-soft);font-size:13px}
.zpe-ovrow .zpe-sm.n{width:2.6rem}
.zpe-ovrow .ti{flex:1 1 12rem;min-width:0;font-weight:600;outline:0}
.zpe-ovrow.is-claim .ti{font-family:var(--font-italic);font-style:italic;font-weight:400;font-size:1rem}
.zpe-ovrow .de{flex:1 1 10rem;min-width:0;color:var(--ink-mute);outline:0}
.zpe-sources{margin-top:2.2rem;padding-top:.8rem;border-top:3px solid var(--ink)}
.zpe-sources ol{margin:.4rem 0 0;padding-left:1.3rem;font-size:13px;line-height:1.55;color:var(--ink-soft)}
.zpe-sources li{margin:.25rem 0}
@media(max-width:980px){.zpt-article-editor{grid-template-columns:1fr}.zpe-meta{border-left:0;border-top:1px solid var(--rule)}}
`;

/** Small "remove" button used in repeatable rows. */
function RemoveBtn({ onClick, title = 'Entfernen' }: { onClick: () => void; title?: string }) {
  return (
    <button type="button" className="zpe-x" title={title} onClick={onClick}>
      <span className="material-symbols-outlined">close</span>
    </button>
  );
}

type Tag = 'h1' | 'h2' | 'p' | 'div' | 'span' | 'b';

/** contentEditable field. innerHTML is set imperatively so switching languages
 *  (or reordering blocks) refreshes the text without disturbing the caret while
 *  typing. */
function Editable({ tag, cls, html, onCommit, placeholder }: { tag: Tag; cls?: string; html: string; onCommit: (v: string) => void; placeholder?: string }) {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== html) el.innerHTML = html || '';
  }, [html]);
  // Expose a commit hook so the SelectionToolbar can flush link/format edits.
  React.useEffect(() => {
    if (ref.current) (ref.current as any).__commit = onCommit;
  });
  return React.createElement(tag, {
    ref,
    className: cls,
    contentEditable: true,
    suppressContentEditableWarning: true,
    'data-ph': placeholder,
    onBlur: (e: React.FocusEvent<HTMLElement>) => onCommit(e.currentTarget.innerHTML),
  });
}

export interface ArticleEditorProps {
  doc: JournalArticle;
  onChange: (next: JournalArticle) => void;
  activeLang: Lang;
  onLang: (l: Lang) => void;
  /** Other articles, for internal-link suggestions in the selection toolbar. */
  articles?: LinkTarget[];
}

/**
 * ArticleEditor — the bilingual block editor. A centred editorial canvas
 * (language switch, category, hero, title, standfirst, reorderable blocks)
 * beside a metadata sidebar. All text is edited in the active language; turning
 * on "Englische Fassung" reveals the DE/EN switch. Ported from the 0004
 * reference; map blocks open the MapBuilder in a modal.
 */
export function ArticleEditor({ doc, onChange, activeLang, onLang, articles = [] }: ArticleEditorProps) {
  const [sel, setSel] = React.useState<number | null>(null);
  const [palAt, setPalAt] = React.useState<number | null>(null);
  const [mapAt, setMapAt] = React.useState<number | null>(null);
  const [imgPick, setImgPick] = React.useState<{ current: string; apply: (src: string) => void } | null>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const lang = activeLang;
  const bilingual = isBilingual(doc);

  const blocks = doc.blocks || [];
  const set = (patch: Partial<JournalArticle>) => onChange({ ...doc, ...patch });
  const setBlock = (i: number, patch: Partial<Block>) => set({ blocks: blocks.map((b, j) => (j === i ? ({ ...b, ...patch } as Block) : b)) });
  const removeBlock = (i: number) => { set({ blocks: blocks.filter((_, j) => j !== i) }); setSel(null); };
  const dupBlock = (i: number) => { const next = blocks.slice(); next.splice(i + 1, 0, JSON.parse(JSON.stringify(blocks[i]))); set({ blocks: next }); };
  const move = (i: number, d: number) => { const j = i + d; if (j < 0 || j >= blocks.length) return; const next = blocks.slice(); const [b] = next.splice(i, 1); next.splice(j, 0, b); set({ blocks: next }); setSel(j); };
  const insert = (at: number, t: Block['t']) => { const next = blocks.slice(); next.splice(at, 0, freshBlock(t)); set({ blocks: next }); setPalAt(null); setSel(at); if (t === 'map') setMapAt(at); };

  const toggleBilingual = (on: boolean) => {
    if (on) set({ languages: ['de', 'en'] });
    else { set({ languages: ['de'] }); onLang('de'); }
  };
  const pickImage = (current: string, apply: (src: string) => void) => setImgPick({ current, apply });
  const readTimeVal = typeof doc.readTime === 'object' && doc.readTime ? doc.readTime[lang] || '' : (doc.readTime as string) || '';
  const setReadTime = (v: string) => {
    const cur = typeof doc.readTime === 'object' && doc.readTime ? { ...doc.readTime } : {};
    (cur as any)[lang] = v;
    set({ readTime: cur });
  };
  const dateDisplayVal = (doc.dateDisplay && doc.dateDisplay[lang]) || '';
  const setDateDisplay = (v: string) => set({ dateDisplay: { ...(doc.dateDisplay || {}), [lang]: v } });

  /** In-page anchor input (ids are shared across languages). */
  const anchorInput = (i: number, id: string | undefined) => (
    <label className="zpe-anchor">
      Anker&nbsp;#
      <input className="zpe-sm" value={id || ''} placeholder="optional" onChange={(e) => setBlock(i, { id: e.target.value.replace(/[^a-z0-9-]/gi, '') || undefined })} />
    </label>
  );

  const verdictSelect = (value: Verdict | undefined, onPick: (v: Verdict) => void) => (
    <select className="zpe-sel" value={value || 'unproven'} onChange={(e) => onPick(e.target.value as Verdict)} title="Farbe des Urteils">
      {VERDICTS.map((x) => <option key={x.v} value={x.v}>{x.label} ({x.hint})</option>)}
    </select>
  );

  /** New verdict tone; also swaps the badge text while it is still a default label. */
  const verdictPatch = (cur: Parameters<typeof getL>[0], v: Verdict) => {
    const label = getL(cur, lang);
    const isDefault = !label || VERDICTS.some((x) => x.label === label);
    const def = VERDICTS.find((x) => x.v === v)!.label;
    return { verdict: v, ...(isDefault && lang === 'de' ? { verdictLabel: setL(cur, 'de', def) } : {}) };
  };

  const renderBlock = (b: Block, i: number) => {
    switch (b.t) {
      case 'h2':
        return (
          <>
            <Editable tag="h2" cls="zpe-h2" html={getL(b.html, lang)} placeholder="Überschrift…" onCommit={(v) => setBlock(i, { html: setL(b.html, lang, v) })} />
            {anchorInput(i, b.id)}
          </>
        );
      case 'list':
        return (
          <div>
            <label className="zpe-check"><input type="checkbox" checked={!!b.ordered} onChange={(e) => setBlock(i, { ordered: e.target.checked || undefined })} /> Nummeriert</label>
            {React.createElement(
              b.ordered ? 'ol' : 'ul',
              { className: 'zpe-list' },
              (b.items || []).map((it, k) => (
                <li key={k}>
                  <div className="zpe-rowx">
                    <Editable tag="div" cls="grow" html={getL(it, lang)} placeholder="Listenpunkt…" onCommit={(v) => setBlock(i, { items: b.items.map((x, j) => (j === k ? setL(x, lang, v) : x)) })} />
                    <RemoveBtn onClick={() => setBlock(i, { items: b.items.filter((_, j) => j !== k) })} />
                  </div>
                </li>
              )),
            )}
            <button type="button" className="zpe-costadd" onClick={() => setBlock(i, { items: [...(b.items || []), { de: '' }] })}>+ Punkt</button>
          </div>
        );
      case 'facts':
        return (
          <div className="zpe-cost">
            <Editable tag="div" cls="ct" html={getL(b.title, lang)} placeholder="Überschrift (optional)…" onCommit={(v) => setBlock(i, { title: v ? setL(b.title, lang, v) : undefined })} />
            {(b.items || []).map((r, ri) => (
              <div className="zpe-costrow" key={ri}>
                <Editable tag="span" html={getL(r.k, lang)} placeholder="Anfahrt" onCommit={(v) => setBlock(i, { items: b.items.map((x, xi) => (xi === ri ? { ...x, k: setL(x.k, lang, v) } : x)) })} />
                <Editable tag="span" html={getL(r.v, lang)} placeholder="…" onCommit={(v) => setBlock(i, { items: b.items.map((x, xi) => (xi === ri ? { ...x, v: setL(x.v, lang, v) } : x)) })} />
                <RemoveBtn onClick={() => setBlock(i, { items: b.items.filter((_, xi) => xi !== ri) })} />
              </div>
            ))}
            <button type="button" className="zpe-costadd" onClick={() => setBlock(i, { items: [...(b.items || []), { k: { de: '' }, v: { de: '' } }] })}>+ Zeile</button>
          </div>
        );
      case 'chapter':
        return (
          <div className="zpe-chap">
            <div className="lab">
              <Editable tag="span" cls="n" html={getL(b.label, lang)} placeholder="Ort 1" onCommit={(v) => setBlock(i, { label: setL(b.label, lang, v) })} />
              <Editable tag="span" cls="m" html={getL(b.meta, lang)} placeholder="Stadtteil · Jahr" onCommit={(v) => setBlock(i, { meta: setL(b.meta, lang, v) })} />
            </div>
            <Editable tag="h2" cls="zpe-h2" html={getL(b.html, lang)} placeholder="Titel des Kapitels…" onCommit={(v) => setBlock(i, { html: setL(b.html, lang, v) })} />
            {anchorInput(i, b.id)}
          </div>
        );
      case 'factcheck':
        return (
          <div className="zpe-fc" data-v={b.verdict}>
            <div className="hd">
              <Editable tag="span" cls="l" html={getL(b.label, lang)} placeholder="Legende im Faktencheck" onCommit={(v) => setBlock(i, { label: v ? setL(b.label, lang, v) : undefined })} />
              <Editable tag="span" cls="zpe-badge" html={getL(b.verdictLabel, lang)} placeholder="Urteil" onCommit={(v) => setBlock(i, { verdictLabel: setL(b.verdictLabel, lang, v) })} />
              {verdictSelect(b.verdict, (v) => setBlock(i, verdictPatch(b.verdictLabel, v)))}
            </div>
            <Editable tag="p" cls="cl" html={getL(b.claim, lang)} placeholder="„Die Behauptung…“" onCommit={(v) => setBlock(i, { claim: setL(b.claim, lang, v) })} />
            <Editable tag="div" cls="tx" html={getL(b.html, lang)} placeholder="Was die Forschung sagt…" onCommit={(v) => setBlock(i, { html: setL(b.html, lang, v) })} />
          </div>
        );
      case 'overview': {
        const claims = b.variant === 'claims';
        const items = b.items || [];
        const setItem = (k: number, patch: Partial<OverviewItem>) => setBlock(i, { items: items.map((x, j) => (j === k ? { ...x, ...patch } : x)) });
        return (
          <div className="zpe-ov">
            <label className="zpe-check">
              <select className="zpe-sel" value={b.variant} onChange={(e) => setBlock(i, { variant: e.target.value as 'index' | 'claims' })}>
                <option value="index">Orte (nummeriert)</option>
                <option value="claims">Behauptungen + Urteil</option>
              </select>
            </label>
            <Editable tag="div" cls="ttl" html={getL(b.title, lang)} placeholder="Überschrift…" onCommit={(v) => setBlock(i, { title: setL(b.title, lang, v) })} />
            <Editable tag="div" cls="intro" html={getL(b.intro, lang)} placeholder="Einleitungssatz (optional)…" onCommit={(v) => setBlock(i, { intro: v ? setL(b.intro, lang, v) : undefined })} />
            <div className="zpe-ovrows">
              {items.map((it, k) => (
                <div className={`zpe-ovrow ${claims ? 'is-claim' : ''}`} key={k}>
                  <input className="zpe-sm" value={it.href} placeholder="#ort-1" title="Link / Anker" onChange={(e) => setItem(k, { href: e.target.value })} />
                  {!claims && <input className="zpe-sm n" value={it.n || ''} placeholder="Nr." onChange={(e) => setItem(k, { n: e.target.value || undefined })} />}
                  <Editable tag="span" cls="ti" html={getL(it.title, lang)} placeholder={claims ? '„Behauptung…“' : 'Name'} onCommit={(v) => setItem(k, { title: setL(it.title, lang, v) })} />
                  {claims && (
                    <>
                      <Editable tag="span" cls="zpe-badge" html={getL(it.verdictLabel, lang)} placeholder="Urteil" onCommit={(v) => setItem(k, { verdictLabel: setL(it.verdictLabel, lang, v) })} />
                      {verdictSelect(it.verdict, (v) => setItem(k, verdictPatch(it.verdictLabel, v)))}
                    </>
                  )}
                  <Editable tag="span" cls="de" html={getL(it.desc, lang)} placeholder={claims ? 'Ort 2' : 'Jahr: Ereignis · Stadtteil'} onCommit={(v) => setItem(k, { desc: setL(it.desc, lang, v) })} />
                  <RemoveBtn onClick={() => setBlock(i, { items: items.filter((_, j) => j !== k) })} />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="zpe-costadd"
              onClick={() => setBlock(i, { items: [...items, claims ? { href: '#', title: { de: '' }, verdict: 'unproven', verdictLabel: { de: 'Unbelegt' } } : { href: '#', n: String(items.length + 1), title: { de: '' } }] })}
            >
              + Zeile
            </button>
            {anchorInput(i, b.id)}
          </div>
        );
      }
      case 'quote':
        return (
          <div className="zpe-quote">
            <Editable tag="div" cls="q" html={getL(b.html, lang)} placeholder="Zitat…" onCommit={(v) => setBlock(i, { html: setL(b.html, lang, v) })} />
            <Editable tag="div" cls="by" html={b.by || ''} placeholder="— Quelle" onCommit={(v) => setBlock(i, { by: v.replace(/<[^>]+>/g, '') })} />
          </div>
        );
      case 'callout':
        return (
          <div className="zpe-callout">
            <Editable tag="div" cls="cl" html={getL(b.label, lang) || 'Hinweis'} onCommit={(v) => setBlock(i, { label: setL(b.label, lang, v) })} />
            <Editable tag="div" cls="cb" html={getL(b.html, lang)} placeholder="Hinweistext…" onCommit={(v) => setBlock(i, { html: setL(b.html, lang, v) })} />
          </div>
        );
      case 'image':
        return (
          <ImageBlockEditor
            block={b}
            lang={lang}
            onChange={(patch) => setBlock(i, patch)}
            onPick={() => pickImage(b.src, (src) => setBlock(i, { src }))}
          />
        );
      case 'costTable':
        return (
          <div className="zpe-cost">
            <Editable tag="div" cls="ct" html={getL(b.title, lang) || 'Kosten'} onCommit={(v) => setBlock(i, { title: setL(b.title, lang, v) })} />
            {(b.rows || []).map((r, ri) => (
              <div className="zpe-costrow" key={ri}>
                <Editable tag="span" html={getL(r.k, lang)} onCommit={(v) => setBlock(i, { rows: b.rows.map((x, xi) => (xi === ri ? { ...x, k: setL(x.k, lang, v) } : x)) })} />
                <Editable tag="span" html={getL(r.v, lang)} onCommit={(v) => setBlock(i, { rows: b.rows.map((x, xi) => (xi === ri ? { ...x, v: setL(x.v, lang, v) } : x)) })} />
                <RemoveBtn onClick={() => setBlock(i, { rows: b.rows.filter((_, xi) => xi !== ri) })} />
              </div>
            ))}
            <Editable tag="div" cls="note" html={getL(b.note, lang)} placeholder="Anmerkung unter der Tabelle (optional)…" onCommit={(v) => setBlock(i, { note: v ? setL(b.note, lang, v) : undefined })} />
            <button type="button" className="zpe-costadd" onClick={() => setBlock(i, { rows: [...(b.rows || []), { k: { de: 'Position' }, v: { de: '—' } }] })}>+ Zeile</button>
          </div>
        );
      case 'ornament':
        return <div className="zpe-orn"><span></span>&#10038;<span></span></div>;
      case 'map':
        return (
          <div className="zpe-mapwrap">
            <div className="zpe-maphead">
              <Editable tag="b" html={getL(b.title, lang) || 'Karte'} onCommit={(v) => setBlock(i, { title: setL(b.title, lang, v) })} />
              <button type="button" className="zpe-mapedit" onClick={() => setMapAt(i)}><span className="material-symbols-outlined">edit_location_alt</span>Karte bearbeiten</button>
            </div>
            {mapAt === i ? (
              <div style={{ padding: '2.2rem', textAlign: 'center', color: 'var(--ink-mute)', fontSize: 13, background: 'var(--stone-50)', borderRadius: 'var(--radius-lg)' }}>
                Karte wird im Dialog bearbeitet …
              </div>
            ) : (
              <MapBuilder data={b} lang={lang} editable={false} />
            )}
          </div>
        );
      default:
        return <Editable tag="p" cls={`zpe-p ${(b as any).lead ? 'is-lead' : ''}`} html={getL((b as any).html, lang)} placeholder="Absatz…" onCommit={(v) => setBlock(i, { html: setL((b as any).html, lang, v) } as Partial<Block>)} />;
    }
  };

  const typeLabel = (t: string) => (BLOCK_TYPES.find((x) => x.t === t) || { label: 'Block' }).label;
  const mapBlock = mapAt !== null ? (blocks[mapAt] as Extract<Block, { t: 'map' }>) : null;

  return (
    <div className="zpt-article-editor" ref={editorRef}>
      <style>{CSS}</style>
      <SelectionToolbar editorRef={editorRef} articles={articles} />

      <div className="zpe-scroll">
        <div className="zpe-paper">
          {bilingual && (
            <div className="zpe-langseg">
              {(['de', 'en'] as Lang[]).map((l) => (
                <button key={l} type="button" className={lang === l ? 'is-on' : ''} onClick={() => onLang(l)}>
                  {l === 'de' ? 'Deutsch' : 'English'}
                  {l === 'en' && !getL(doc.title, 'en') && <span className="dot" title="noch nicht übersetzt"></span>}
                </button>
              ))}
            </div>
          )}

          <div className="zpe-cat">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>sell</span>
            <select value={doc.category} onChange={(e) => set({ category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="zpe-hero" style={doc.hero ? { backgroundImage: `url(${img(doc.hero)})` } : undefined}>
            <button type="button" className="zpe-herobtn" onClick={() => pickImage(doc.hero || '', (src) => set({ hero: src }))}><span className="material-symbols-outlined">image</span>Beitragsbild ändern</button>
            <input className="zpe-herocap" value={getL(doc.heroCap, lang)} onChange={(e) => set({ heroCap: setL(doc.heroCap, lang, e.target.value) })} placeholder="Bildunterschrift des Titelbilds…" />
          </div>

          <Editable tag="div" cls="zpe-kicker" html={getL(doc.kicker, lang)} placeholder="Dachzeile (optional, z. B. Prager Geschichte)…" onCommit={(v) => set({ kicker: v ? setL(doc.kicker, lang, v) : undefined })} />
          <Editable tag="h1" cls="zpe-title" html={getL(doc.title, lang)} placeholder="Titel…" onCommit={(v) => set({ title: setL(doc.title, lang, v) })} />
          <Editable tag="div" cls="zpe-stand" html={getL(doc.excerpt, lang)} placeholder="Vorspann / Teaser…" onCommit={(v) => set({ excerpt: setL(doc.excerpt, lang, v) })} />

          <div className="zpe-blocks">
            <div className="zpe-ins"><button type="button" title="Block einfügen" onClick={() => setPalAt(0)}><span className="material-symbols-outlined">add</span></button></div>
            {blocks.map((b, i) => (
              <div key={i}>
                <div className={`zpe-block ${sel === i ? 'is-sel' : ''}`} onClick={() => setSel(i)}>
                  <div className="zpe-tools" onClick={(e) => e.stopPropagation()}>
                    <span className="zpe-type">{typeLabel(b.t)}</span>
                    <button type="button" title="Nach oben" onClick={() => move(i, -1)}><span className="material-symbols-outlined">keyboard_arrow_up</span></button>
                    <button type="button" title="Nach unten" onClick={() => move(i, 1)}><span className="material-symbols-outlined">keyboard_arrow_down</span></button>
                    <button type="button" title="Duplizieren" onClick={() => dupBlock(i)}><span className="material-symbols-outlined">content_copy</span></button>
                    <button type="button" className="danger" title="Löschen" onClick={() => removeBlock(i)}><span className="material-symbols-outlined">delete</span></button>
                  </div>
                  <div className="zpe-block-inner">{renderBlock(b, i)}</div>
                </div>
                <div className="zpe-ins"><button type="button" title="Block einfügen" onClick={() => setPalAt(i + 1)}><span className="material-symbols-outlined">add</span></button></div>
              </div>
            ))}
            <button type="button" className="zpe-addblock" onClick={() => setPalAt(blocks.length)}>
              <span className="material-symbols-outlined">add</span>Block hinzufügen
            </button>
          </div>

          <div className="zpe-sources">
            <p className="zpe-sl">Quellen (nach dem Abschluss-CTA)</p>
            {(doc.sources || []).length > 0 && (
              <ol>
                {(doc.sources || []).map((s, k) => (
                  <li key={k}>
                    <div className="zpe-rowx">
                      <Editable tag="div" cls="grow" html={getL(s, lang)} placeholder="Quelle, gern mit Link…" onCommit={(v) => set({ sources: (doc.sources || []).map((x, j) => (j === k ? setL(x, lang, v) : x)) })} />
                      <RemoveBtn onClick={() => set({ sources: (doc.sources || []).filter((_, j) => j !== k) })} />
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <button type="button" className="zpe-costadd" onClick={() => set({ sources: [...(doc.sources || []), { de: '' }] })}>+ Quelle</button>
          </div>
        </div>
      </div>

      <aside className="zpe-meta">
        <div className="zpe-sec">
          <p className="zpe-sl">Status</p>
          <div className="zpe-statseg">
            {([['draft', 'Entwurf'], ['scheduled', 'Geplant'], ['published', 'Live']] as [JournalArticle['status'], string][]).map(([s, l]) => (
              <button key={s} type="button" data-s={s} className={doc.status === s ? 'is-on' : ''} onClick={() => set({ status: s })}>{l}</button>
            ))}
          </div>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Sprachen</p>
          <label className="zpe-bil"><input type="checkbox" checked={bilingual} onChange={(e) => toggleBilingual(e.target.checked)} /> Englische Fassung pflegen</label>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Permalink</p>
          <div className="zpe-field"><label>{bilingual ? 'Slug (EN)' : 'Slug'}</label><div className="zpe-inp"><span className="pre">/blog/</span><input value={doc.slug || ''} onChange={(e) => set({ slug: e.target.value })} /></div></div>
          {bilingual && <div className="zpe-field"><label>Slug (DE)</label><div className="zpe-inp"><span className="pre">/blog/</span><input value={doc.slugDe || ''} onChange={(e) => set({ slugDe: e.target.value })} /></div></div>}
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Veröffentlichung</p>
          <div className="zpe-field"><label>Datum (ISO, für Sortierung)</label><div className="zpe-inp"><input type="date" value={doc.date || ''} onChange={(e) => set({ date: e.target.value })} /></div></div>
          <div className="zpe-field"><label>Anzeigedatum · {lang.toUpperCase()}</label><div className="zpe-inp"><input value={dateDisplayVal} onChange={(e) => setDateDisplay(e.target.value)} placeholder={lang === 'de' ? 'Mai 2026' : 'May 2026'} /></div></div>
          <div className="zpe-field"><label>Lesezeit · {lang.toUpperCase()}</label><div className="zpe-inp"><input value={readTimeVal} onChange={(e) => setReadTime(e.target.value)} placeholder={`${computeReadMinutes(doc, lang)} ${lang === 'de' ? 'Min.' : 'min'} · automatisch`} /></div></div>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Beitragsbild</p>
          <div className="zpe-thumb">
            <div className="t" style={doc.hero ? { backgroundImage: `url(${img(doc.hero)})` } : undefined}></div>
            <button type="button" className="zpe-imgbtn" onClick={() => pickImage(doc.hero || '', (src) => set({ hero: src }))}>Ersetzen</button>
          </div>
          <div className="zpe-field" style={{ marginTop: '.7rem' }}>
            <label>Bildnachweis</label>
            <div className="zpe-inp"><span className="pre">Bild:</span><input value={doc.heroCredit || ''} onChange={(e) => set({ heroCredit: e.target.value || undefined })} placeholder="z. B. Zuza Prague Tours" /></div>
          </div>
        </div>
      </aside>

      {palAt !== null && (
        <div className="zpe-overlay" onClick={() => setPalAt(null)}>
          <div className="zpe-pal" onClick={(e) => e.stopPropagation()}>
            <div className="zpe-pal-h">
              <b>Block einfügen</b>
              <button type="button" className="zpe-iconbtn" onClick={() => setPalAt(null)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="zpe-pal-grid">
              {BLOCK_TYPES.map((bt) => (
                <button key={bt.t} type="button" className="zpe-pal-it" onClick={() => insert(palAt, bt.t)}>
                  <span className="ic"><span className="material-symbols-outlined">{bt.icon}</span></span>
                  <span><b>{bt.label}</b><small>{bt.desc}</small></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mapAt !== null && mapBlock && (
        <div className="zpe-overlay" onClick={() => setMapAt(null)}>
          <div className="zpe-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zpe-modal-h">
              <b>Karte bearbeiten · {lang.toUpperCase()}</b>
              <button type="button" className="done" onClick={() => setMapAt(null)}>Fertig</button>
            </div>
            <div style={{ padding: '1.2rem 1.4rem 1.6rem' }}>
              <MapBuilder data={mapBlock} lang={lang} editable onChange={(next) => setBlock(mapAt, next)} />
            </div>
          </div>
        </div>
      )}

      {imgPick && (
        <ImagePicker
          current={imgPick.current}
          onPick={(src) => imgPick.apply(src)}
          onClose={() => setImgPick(null)}
        />
      )}
    </div>
  );
}

export default ArticleEditor;
