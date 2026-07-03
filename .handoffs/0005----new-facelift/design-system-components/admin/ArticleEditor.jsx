import React from 'react';

const NS = 'ZuzaPragueToursDesignSystem_748186';
const CATEGORIES = ['Reiseführer', 'Reiserouten', 'Wahrzeichen', 'Geschichte', 'Verstecktes Prag', 'Kultur', 'Kulinarik'];

const BLOCK_TYPES = [
  { t: 'p', label: 'Absatz', icon: 'notes', desc: 'Fließtext' },
  { t: 'h2', label: 'Überschrift', icon: 'title', desc: 'Abschnitt' },
  { t: 'quote', label: 'Zitat', icon: 'format_quote', desc: 'Pull-Quote' },
  { t: 'callout', label: 'Hinweis', icon: 'lightbulb', desc: 'Tipp-Box' },
  { t: 'image', label: 'Bild', icon: 'image', desc: 'Foto + Unterschrift' },
  { t: 'costTable', label: 'Kostentabelle', icon: 'table_rows', desc: 'Preise' },
  { t: 'map', label: 'Karte', icon: 'map', desc: 'Tour-Stationen' },
  { t: 'ornament', label: 'Zierde', icon: 'auto_awesome', desc: 'Trenner' },
];

function freshBlock(t) {
  switch (t) {
    case 'h2': return { t: 'h2', html: 'Neue Überschrift' };
    case 'quote': return { t: 'quote', html: 'Ein Satz, der bleibt …', by: 'Zuzana' };
    case 'callout': return { t: 'callout', label: 'Hinweis', html: '<p>Ein praktischer Hinweis für Ihre Gäste.</p>' };
    case 'image': return { t: 'image', src: '', cap: 'Bildunterschrift' };
    case 'costTable': return { t: 'costTable', title: 'Was es kostet', rows: [{ k: 'Eintritt', v: '250 Kč' }, { k: 'Führung', v: 'auf Anfrage' }] };
    case 'map': return { t: 'map', mode: 'illustrated', route: true, list: true, caption: '', points: [{ coord: [50.0875, 14.4213], label: 'Altstädter Ring', note: 'Astronomische Uhr und Teynkirche.' }, { coord: [50.0865, 14.4114], label: 'Karlsbrücke', note: 'Am frühen Morgen am schönsten.' }] };
    case 'ornament': return { t: 'ornament' };
    default: return { t: 'p', html: 'Neuer Absatz — hier schreiben …' };
  }
}

const CSS = `
.zpt-article-editor{display:grid;grid-template-columns:1fr 312px;gap:0;min-height:100%;font-family:var(--font-sans);color:var(--ink)}
.zpt-article-editor *{box-sizing:border-box}
.zpe-scroll{overflow:auto;padding:2rem 2.2rem 5rem;display:flex;justify-content:center}
.zpe-paper{width:100%;max-width:740px}
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
/* insert line */
.zpe-ins{height:14px;position:relative;display:flex;align-items:center;justify-content:center}
.zpe-ins::before{content:"";position:absolute;left:0;right:0;height:1px;background:var(--burgundy);opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.zpe-ins button{position:relative;width:22px;height:22px;border-radius:999px;border:1px solid var(--rule);background:#fff;color:var(--burgundy);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}
.zpe-ins button .material-symbols-outlined{font-size:16px}
.zpe-ins:hover::before{opacity:.5}
.zpe-ins:hover button{opacity:1;transform:none}
/* block shell */
.zpe-block{position:relative;border-radius:var(--radius-md);transition:background var(--dur-fast) var(--ease-out)}
.zpe-block:hover{background:rgba(168,134,84,.05)}
.zpe-block.is-sel{background:rgba(107,31,42,.05);box-shadow:0 0 0 1px rgba(107,31,42,.2)}
.zpe-block-inner{padding:.5rem .7rem}
.zpe-handle{position:absolute;left:-26px;top:6px;color:var(--stone-400);cursor:grab;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.zpe-block:hover .zpe-handle{opacity:1}
.zpe-handle .material-symbols-outlined{font-size:19px}
.zpe-tools{position:absolute;top:-13px;right:8px;display:flex;align-items:center;gap:1px;background:var(--ink);border-radius:var(--radius-md);padding:2px;box-shadow:var(--shadow-md);opacity:0;pointer-events:none;transform:translateY(3px);transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);z-index:5}
.zpe-block.is-sel .zpe-tools{opacity:1;pointer-events:auto;transform:none}
.zpe-tools .zpe-type{font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,239,228,.55);padding:0 .5rem 0 .4rem}
.zpe-tools button{width:26px;height:26px;border:0;background:transparent;color:rgba(245,239,228,.8);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer}
.zpe-tools button:hover{background:rgba(245,239,228,.14);color:var(--ivory)}
.zpe-tools button.danger:hover{background:var(--burgundy);color:var(--ivory)}
.zpe-tools .material-symbols-outlined{font-size:16px}
/* block content */
.zpe-p{font-family:var(--font-body);font-size:1.0625rem;line-height:1.72;color:var(--ink-soft);margin:0;outline:0}
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
/* meta sidebar */
.zpe-meta{border-left:1px solid var(--rule);background:#FCFBF8;overflow:auto;padding:1.4rem 1.3rem 3rem}
.zpe-sec{padding:0 0 1.2rem;margin-bottom:1.2rem;border-bottom:1px solid var(--rule-soft)}
.zpe-sec:last-child{border-bottom:0}
.zpe-sl{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-mute);margin:0 0 .7rem}
.zpe-statseg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;background:var(--stone-100);border-radius:var(--radius-md);padding:3px}
.zpe-statseg button{border:0;background:transparent;border-radius:calc(var(--radius-md) - 2px);padding:.45rem .2rem;font-family:var(--font-sans);font-size:11px;font-weight:600;color:var(--ink-mute);cursor:pointer}
.zpe-statseg button.is-on{background:#fff;color:var(--ink);box-shadow:var(--shadow-xs)}
.zpe-statseg button.is-on[data-s="published"]{color:#3F6B4A}
.zpe-field{margin-bottom:.7rem}
.zpe-field label{display:block;font-size:11px;color:var(--ink-mute);margin-bottom:.25rem}
.zpe-inp{display:flex;align-items:center;gap:.3rem;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.5rem .6rem}
.zpe-inp .pre{font-size:12px;color:var(--stone-400)}
.zpe-inp input,.zpe-inp select,.zpe-inp textarea{border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:13px;color:var(--ink);width:100%;resize:none}
.zpe-inp:focus-within{border-color:var(--ink)}
.zpe-thumb{display:flex;gap:.7rem;align-items:center}
.zpe-thumb .t{width:62px;height:46px;border-radius:var(--radius-md);background:var(--stone-200) center/cover;flex-shrink:0;box-shadow:inset 0 0 0 1px rgba(26,23,20,.08)}
.zpe-chips{display:flex;flex-wrap:wrap;gap:.4rem}
.zpe-chip{font-size:11px;color:var(--ink-soft);background:#fff;border:1px solid var(--rule);border-radius:var(--radius-pill);padding:.25rem .6rem}
/* palette + modal */
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
@media(max-width:980px){.zpt-article-editor{grid-template-columns:1fr}.zpe-meta{border-left:0;border-top:1px solid var(--rule)}}
`;

function Editable({ tag, cls, html, onCommit, placeholder }) {
  const ref = React.useRef(null);
  const Tag = tag;
  return (
    <Tag
      ref={ref}
      className={cls}
      contentEditable
      suppressContentEditableWarning
      data-ph={placeholder}
      dangerouslySetInnerHTML={{ __html: html }}
      onBlur={(e) => onCommit(e.currentTarget.innerHTML)}
    />
  );
}

/**
 * ArticleEditor — the block-based article editor. A centred editorial canvas
 * (category, hero, title, standfirst, then a reorderable stack of blocks:
 * paragraph, heading, pull-quote, callout, image, cost table, map and
 * ornament) beside a metadata sidebar (status, slug, category, date, read
 * time, featured image, SEO). Blocks are added from an insert palette; map
 * blocks open the MapBuilder in a modal. Fully controlled via `doc` +
 * `onChange`.
 */
export function ArticleEditor({ doc, onChange, imageBase = '', className = '', style = {} }) {
  const [sel, setSel] = React.useState(null);
  const [palAt, setPalAt] = React.useState(null);
  const [mapAt, setMapAt] = React.useState(null);
  const MapBuilder = (typeof window !== 'undefined' && window[NS] && window[NS].MapBuilder) || null;

  const blocks = doc.blocks || [];
  const set = (patch) => onChange({ ...doc, ...patch });
  const setBlock = (i, patch) => set({ blocks: blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) });
  const removeBlock = (i) => { set({ blocks: blocks.filter((_, j) => j !== i) }); setSel(null); };
  const dupBlock = (i) => { const next = blocks.slice(); next.splice(i + 1, 0, JSON.parse(JSON.stringify(blocks[i]))); set({ blocks: next }); };
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= blocks.length) return; const next = blocks.slice(); const [b] = next.splice(i, 1); next.splice(j, 0, b); set({ blocks: next }); setSel(j); };
  const insert = (at, t) => { const next = blocks.slice(); next.splice(at, 0, freshBlock(t)); set({ blocks: next }); setPalAt(null); setSel(at); if (t === 'map') setMapAt(at); };

  const renderBlock = (b, i) => {
    switch (b.t) {
      case 'h2': return <Editable tag="h2" cls="zpe-h2" html={b.html} onCommit={(v) => setBlock(i, { html: v })} />;
      case 'quote': return (
        <div className="zpe-quote">
          <Editable tag="div" cls="q" html={b.html} onCommit={(v) => setBlock(i, { html: v })} />
          <Editable tag="div" cls="by" html={b.by || ''} onCommit={(v) => setBlock(i, { by: v })} />
        </div>
      );
      case 'callout': return (
        <div className="zpe-callout">
          <Editable tag="div" cls="cl" html={b.label || 'Hinweis'} onCommit={(v) => setBlock(i, { label: v })} />
          <Editable tag="div" cls="cb" html={b.html} onCommit={(v) => setBlock(i, { html: v })} />
        </div>
      );
      case 'image': return (
        <div>
          <div className={`zpe-img ${b.src ? 'has-src' : ''}`} style={b.src ? { backgroundImage: `url(${b.src})` } : undefined}>
            {!b.src && <><span className="material-symbols-outlined">add_photo_alternate</span>
              <button type="button" className="zpe-imgbtn" onClick={() => setBlock(i, { src: `${imageBase}charles-bridge-statue.jpg` })}>Bild wählen</button></>}
          </div>
          <Editable tag="div" cls="zpe-imgcap" html={b.cap || ''} onCommit={(v) => setBlock(i, { cap: v })} />
        </div>
      );
      case 'costTable': return (
        <div className="zpe-cost">
          <Editable tag="div" cls="ct" html={b.title || 'Kosten'} onCommit={(v) => setBlock(i, { title: v })} />
          {(b.rows || []).map((r, ri) => (
            <div className="zpe-costrow" key={ri}>
              <Editable tag="span" html={r.k} onCommit={(v) => setBlock(i, { rows: b.rows.map((x, xi) => xi === ri ? { ...x, k: v } : x) })} />
              <Editable tag="span" html={r.v} onCommit={(v) => setBlock(i, { rows: b.rows.map((x, xi) => xi === ri ? { ...x, v } : x) })} />
            </div>
          ))}
          <button type="button" className="zpe-costadd" onClick={() => setBlock(i, { rows: [...(b.rows || []), { k: 'Position', v: '—' }] })}>+ Zeile</button>
        </div>
      );
      case 'ornament': return <div className="zpe-orn"><span></span>&#10038;<span></span></div>;
      case 'map': return (
        <div className="zpe-mapwrap">
          <div className="zpe-maphead">
            <Editable tag="b" html={b.title || 'Karte'} onCommit={(v) => setBlock(i, { title: v })} />
            <button type="button" className="zpe-mapedit" onClick={() => setMapAt(i)}><span className="material-symbols-outlined">edit_location_alt</span>Karte bearbeiten</button>
          </div>
          {MapBuilder ? <MapBuilder data={b} editable={false} /> : <div style={{ padding: 20, color: 'var(--ink-mute)' }}>Karte</div>}
        </div>
      );
      default: return <Editable tag="p" cls="zpe-p" html={b.html} onCommit={(v) => setBlock(i, { html: v })} />;
    }
  };

  const typeLabel = (t) => (BLOCK_TYPES.find((x) => x.t === t) || {}).label || 'Block';

  return (
    <div className={`zpt-article-editor ${className}`} style={style}>
      <style>{CSS}</style>

      <div className="zpe-scroll">
        <div className="zpe-paper">
          <div className="zpe-cat">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>sell</span>
            <select value={doc.category} onChange={(e) => set({ category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="zpe-hero" style={doc.hero ? { backgroundImage: `url(${imageBase}${doc.hero})` } : undefined}>
            <button type="button" className="zpe-herobtn"><span className="material-symbols-outlined">image</span>Beitragsbild ändern</button>
            <input className="zpe-herocap" value={doc.heroCap || ''} onChange={(e) => set({ heroCap: e.target.value })} placeholder="Bildunterschrift des Titelbilds…" />
          </div>

          <Editable tag="h1" cls="zpe-title" html={doc.title || ''} onCommit={(v) => set({ title: v, titlePlain: v.replace(/<[^>]+>/g, '') })} />
          <Editable tag="div" cls="zpe-stand" html={doc.standfirst || ''} onCommit={(v) => set({ standfirst: v })} />

          <div className="zpe-blocks">
            <div className="zpe-ins"><button type="button" title="Block einfügen" onClick={() => setPalAt(0)}><span className="material-symbols-outlined">add</span></button></div>
            {blocks.map((b, i) => (
              <div key={i}>
                <div className={`zpe-block ${sel === i ? 'is-sel' : ''}`} onClick={() => setSel(i)}>
                  <div className="zpe-handle"><span className="material-symbols-outlined">drag_indicator</span></div>
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
        </div>
      </div>

      <aside className="zpe-meta">
        <div className="zpe-sec">
          <p className="zpe-sl">Status</p>
          <div className="zpe-statseg">
            {[['draft', 'Entwurf'], ['scheduled', 'Geplant'], ['published', 'Live']].map(([s, l]) => (
              <button key={s} type="button" data-s={s} className={doc.status === s ? 'is-on' : ''} onClick={() => set({ status: s })}>{l}</button>
            ))}
          </div>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Permalink</p>
          <div className="zpe-inp"><span className="pre">/journal/</span><input value={doc.slug || ''} onChange={(e) => set({ slug: e.target.value })} /></div>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Veröffentlichung</p>
          <div className="zpe-field"><label>Datum</label><div className="zpe-inp"><input value={doc.date || ''} onChange={(e) => set({ date: e.target.value })} placeholder="Mai 2026" /></div></div>
          <div className="zpe-field"><label>Lesezeit</label><div className="zpe-inp"><input value={doc.readTime || ''} onChange={(e) => set({ readTime: e.target.value })} placeholder="9 Min." /></div></div>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">Beitragsbild</p>
          <div className="zpe-thumb">
            <div className="t" style={doc.hero ? { backgroundImage: `url(${imageBase}${doc.hero})` } : undefined}></div>
            <button type="button" className="zpe-imgbtn">Ersetzen</button>
          </div>
        </div>
        <div className="zpe-sec">
          <p className="zpe-sl">SEO · Kurzbeschreibung</p>
          <div className="zpe-inp"><textarea rows="3" value={doc.cardBlurb || ''} onChange={(e) => set({ cardBlurb: e.target.value })} placeholder="Teaser für Übersicht & Suchmaschinen…"></textarea></div>
        </div>
        {doc.related && doc.related.length > 0 && (
          <div className="zpe-sec">
            <p className="zpe-sl">Verwandte Artikel</p>
            <div className="zpe-chips">{doc.related.map((r) => <span key={r} className="zpe-chip">{r}</span>)}</div>
          </div>
        )}
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

      {mapAt !== null && MapBuilder && (
        <div className="zpe-overlay" onClick={() => setMapAt(null)}>
          <div className="zpe-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zpe-modal-h">
              <b>Karte bearbeiten</b>
              <button type="button" className="done" onClick={() => setMapAt(null)}>Fertig</button>
            </div>
            <div style={{ padding: '1.2rem 1.4rem 1.6rem' }}>
              <MapBuilder data={blocks[mapAt]} editable onChange={(next) => setBlock(mapAt, next)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleEditor;
