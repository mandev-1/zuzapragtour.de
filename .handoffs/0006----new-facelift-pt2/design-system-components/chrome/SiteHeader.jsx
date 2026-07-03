import React from 'react';

const DEFAULT_LINKS = [
  { key: 'tours', label: 'Touren', href: 'tours.html' },
  { key: 'zuzana', label: 'Über Zuzana', href: 'zuzana.html' },
  { key: 'blog', label: 'Journal', href: 'blog.html' },
  { key: 'kontakt', label: 'Kontakt', href: 'kontakt.html' },
];
const DEFAULT_CTA = { label: 'Tour buchen', href: 'kontakt.html' };

const CSS = `
.zpt-site-header{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.6rem clamp(1.5rem,5vw,5rem);border-bottom:1px solid transparent;transition:background var(--dur-base) var(--ease-out),padding var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out);font-family:var(--font-sans)}
.zpt-site-header .zsh-brand{font-family:var(--font-display);font-size:1.35rem;letter-spacing:.02em;color:var(--ivory);transition:color var(--dur-base) var(--ease-out);text-decoration:none}
.zpt-site-header .zsh-brand b{font-weight:400}
.zpt-site-header .zsh-links{display:flex;align-items:center;gap:2.4rem}
.zpt-site-header .zsh-links a{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,239,228,.82);transition:color var(--dur-fast) var(--ease-out);text-decoration:none}
.zpt-site-header .zsh-links a:hover,.zpt-site-header .zsh-links a.is-current{color:var(--ivory)}
.zpt-site-header .zsh-cta{border:1px solid rgba(245,239,228,.55);padding:.7rem 1.3rem;color:var(--ivory)!important;transition:background var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.zpt-site-header .zsh-cta:hover{background:var(--ivory);color:var(--ink)!important}
.zpt-site-header.is-solid{background:rgba(250,246,236,.82);-webkit-backdrop-filter:blur(16px) saturate(140%);backdrop-filter:blur(16px) saturate(140%);border-bottom-color:rgba(217,207,188,.7);padding-top:1.1rem;padding-bottom:1.1rem}
.zpt-site-header.is-solid .zsh-brand{color:var(--ink)}
.zpt-site-header.is-solid .zsh-links a{color:var(--ink-mute)}
.zpt-site-header.is-solid .zsh-links a:hover,.zpt-site-header.is-solid .zsh-links a.is-current{color:var(--ink)}
.zpt-site-header.is-solid .zsh-cta{border-color:var(--ink);color:var(--ink)!important}
.zpt-site-header.is-solid .zsh-cta:hover{background:var(--ink);color:var(--paper)!important}
.zpt-site-header .zsh-burger{display:none;background:none;border:0;padding:0;width:30px;height:30px;flex-direction:column;justify-content:center;gap:6px;cursor:pointer;color:var(--ivory)}
.zpt-site-header.is-solid .zsh-burger{color:var(--ink)}
.zpt-site-header .zsh-burger span{display:block;width:26px;height:1.5px;background:currentColor;transition:transform var(--dur-base) var(--ease-out),opacity var(--dur-base) var(--ease-out)}
.zpt-site-header.is-open .zsh-burger span:nth-child(1){transform:translateY(7.5px) rotate(45deg)}
.zpt-site-header.is-open .zsh-burger span:nth-child(2){opacity:0}
.zpt-site-header.is-open .zsh-burger span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg)}
.zpt-site-header .zsh-panel{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:rgba(250,246,236,.97);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border-top:1px solid var(--rule);box-shadow:var(--shadow-lg)}
.zpt-site-header.is-open .zsh-panel{display:flex}
.zpt-site-header .zsh-panel a{padding:1.1rem clamp(1.5rem,5vw,5rem);font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);border-bottom:1px solid var(--rule-soft);text-decoration:none}
.zpt-site-header .zsh-panel a:last-child{border-bottom:none;color:var(--burgundy)}
@media(max-width:860px){.zpt-site-header .zsh-links{display:none}.zpt-site-header .zsh-burger{display:flex}}
`;

/**
 * SiteHeader — the marketing site's sticky top navigation. Transparent
 * over a hero, then glassy (paper/90 + backdrop-blur) once scrolled; on
 * inner pages it ships solid from the top. Brand wordmark · links · a
 * bordered CTA, with a native hamburger menu under 860px.
 *
 * Behaviour mirrors the live site's `.nav`: pass `solidOnScroll` for the
 * homepage hero (transparent until ~70% viewport scrolled), or leave it
 * off and the header is solid immediately (inner pages).
 */
export function SiteHeader({
  brand,
  brandHref = 'index.html',
  links = DEFAULT_LINKS,
  current,
  cta = DEFAULT_CTA,
  solidOnScroll = false,
  className = '',
  style = {},
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!solidOnScroll) return undefined;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solidOnScroll]);

  const solid = !solidOnScroll || scrolled;
  const cls = ['zpt-site-header', solid ? 'is-solid' : '', open ? 'is-open' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={cls} style={style}>
      <style>{CSS}</style>
      <a className="zsh-brand" href={brandHref}>
        {brand || (<>Zuza <b>&amp;</b> Pragtour</>)}
      </a>
      <nav className="zsh-links">
        {links.map((l) => (
          <a key={l.key || l.href} className={current === l.key ? 'is-current' : ''} href={l.href}>
            {l.label}
          </a>
        ))}
        {cta && <a className="zsh-cta" href={cta.href}>{cta.label}</a>}
      </nav>
      <button
        className="zsh-burger"
        type="button"
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span><span></span><span></span>
      </button>
      <div className="zsh-panel">
        {links.map((l) => (
          <a key={l.key || l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        {cta && <a href={cta.href} onClick={() => setOpen(false)}>{cta.label}</a>}
      </div>
    </header>
  );
}

export default SiteHeader;
