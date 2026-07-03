import React from 'react';

const DEFAULT_COLUMNS = [
  {
    title: 'Kontakt',
    items: [
      { label: '+420 721 231 933', href: 'tel:+420721231933' },
      { label: 'zuzanamanova@email.cz', href: 'mailto:zuzanamanova@email.cz' },
      { label: 'WhatsApp', href: 'https://wa.me/420721231933', external: true },
    ],
  },
  {
    title: 'Schnelllinks',
    items: [
      { label: 'Startseite', href: 'index.html' },
      { label: 'Touren', href: 'tours.html' },
      { label: 'Über Zuzana', href: 'zuzana.html' },
      { label: 'Journal', href: 'blog.html' },
      { label: 'Tour buchen', href: 'kontakt.html' },
    ],
  },
  {
    title: 'Mehr',
    items: [
      { label: 'Bewertung abgeben', href: 'review-funnel.html' },
      { label: '@erlebnis_tour_prag', href: 'https://www.instagram.com/erlebnis_tour_prag/', external: true },
      { label: 'TripAdvisor', href: 'https://www.tripadvisor.de', external: true },
    ],
  },
];

const DEFAULT_BOTTOM = [
  { label: 'Datenschutz', href: 'privacy.html' },
  { label: 'AGB', href: 'terms.html' },
];

const CSS = `
.zpt-site-footer{background:var(--ink);color:var(--ivory);padding:clamp(3.5rem,7vh,5.5rem) 0 2.5rem;font-family:var(--font-sans)}
.zpt-site-footer .zsf-shell{max-width:1240px;margin:0 auto;padding-inline:clamp(1.5rem,5vw,5rem)}
.zpt-site-footer .zsf-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:2.5rem;padding-bottom:3rem;border-bottom:1px solid rgba(245,239,228,.13)}
.zpt-site-footer .zsf-brand{font-family:var(--font-display);font-size:1.5rem;margin-bottom:1rem}
.zpt-site-footer .zsf-brand b{font-weight:400}
.zpt-site-footer .zsf-tag{font-family:var(--font-body);font-size:.95rem;line-height:1.6;color:rgba(245,239,228,.6);max-width:22rem;margin:0 0 1.2rem}
.zpt-site-footer h4{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,239,228,.45);margin:0 0 1.1rem}
.zpt-site-footer .zsf-col a,.zpt-site-footer .zsf-col span{display:block;font-size:.9rem;color:rgba(245,239,228,.78);margin-bottom:.65rem;transition:color var(--dur-fast) var(--ease-out);text-decoration:none}
.zpt-site-footer .zsf-col a:hover{color:var(--ivory)}
.zpt-site-footer .zsf-btn{display:inline-flex;align-items:center;gap:.7rem;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;padding:.8rem 1.4rem;border:1px solid var(--ivory);color:var(--ivory);width:-webkit-fit-content;width:fit-content;margin-bottom:1.1rem;transition:background var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out);text-decoration:none}
.zpt-site-footer .zsf-btn:hover{background:var(--ivory);color:var(--ink)}
.zpt-site-footer .zsf-btn .material-symbols-outlined{font-size:16px;transition:transform var(--dur-base) var(--ease-out)}
.zpt-site-footer .zsf-btn:hover .material-symbols-outlined{transform:translateX(4px)}
.zpt-site-footer .zsf-rating{position:relative;display:inline-flex;align-items:center;gap:.5rem;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-lamp);text-decoration:none;padding-bottom:4px}
.zpt-site-footer .zsf-rating::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:100%;background:currentColor;transform:scaleX(1);transform-origin:left;transition:transform var(--dur-base) var(--ease-out)}
.zpt-site-footer .zsf-rating:hover::after{transform:scaleX(0);transform-origin:right}
.zpt-site-footer .zsf-bottom{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding-top:1.8rem;flex-wrap:wrap}
.zpt-site-footer .zsf-bottom p,.zpt-site-footer .zsf-bottom a{font-size:11px;letter-spacing:.04em;color:rgba(245,239,228,.45);margin:0;text-decoration:none}
.zpt-site-footer .zsf-bottom a:hover{color:rgba(245,239,228,.8)}
@media(max-width:820px){.zpt-site-footer .zsf-top{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.zpt-site-footer .zsf-top{grid-template-columns:1fr;gap:2rem}}
`;

const ext = (it) => (it.external ? { target: '_blank', rel: 'noopener' } : {});

/**
 * SiteFooter — the dark ink footer that closes every page: brand block
 * with tagline, a "Touren ansehen" CTA and the gold TripAdvisor rating,
 * then up to three link columns and a legal bottom bar. Data-driven but
 * ships with the live site's exact content as defaults.
 */
export function SiteFooter({
  brand,
  tagline = 'Erleben Sie Prag mit Ihrer deutschsprachigen Expertin und Spezialistin für Prag-Führungen.',
  cta = { label: 'Meine Touren ansehen', href: 'tours.html', icon: 'arrow_forward' },
  rating = { label: '4,9 ★ TripAdvisor', href: 'https://www.tripadvisor.de' },
  columns = DEFAULT_COLUMNS,
  copyright = '© 2026 Zuza Prague Tours – Zuzana Manová. Alle Rechte vorbehalten.',
  bottomLinks = DEFAULT_BOTTOM,
  className = '',
  style = {},
}) {
  return (
    <footer className={`zpt-site-footer ${className}`} style={style}>
      <style>{CSS}</style>
      <div className="zsf-shell">
        <div className="zsf-top">
          <div>
            <div className="zsf-brand">{brand || (<>Zuza <b>&amp;</b> Pragtour</>)}</div>
            {tagline && <p className="zsf-tag">{tagline}</p>}
            {cta && (
              <a className="zsf-btn" href={cta.href}>
                {cta.label}
                {cta.icon && <span className="material-symbols-outlined">{cta.icon}</span>}
              </a>
            )}
            {rating && (
              <div>
                <a className="zsf-rating" href={rating.href} target="_blank" rel="noopener">{rating.label}</a>
              </div>
            )}
          </div>
          {columns.map((col) => (
            <div className="zsf-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.items.map((it) => (
                <a key={it.label} href={it.href} {...ext(it)}>{it.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="zsf-bottom">
          <p>{copyright}</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {bottomLinks.map((it) => (
              <a key={it.label} href={it.href}>{it.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
