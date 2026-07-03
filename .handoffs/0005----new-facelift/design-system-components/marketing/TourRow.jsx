import React from 'react';

/**
 * TourRow — the numbered, hover-reactive tour line from the homepage
 * highlights list. Big italic numeral, title + meta chips on the left,
 * description + a "Details →" link on the right. Hovering lifts the
 * row to white and turns the numeral & title burgundy.
 */
export function TourRow({
  num,
  title,
  duration,
  meta,
  description,
  href = '#',
  ctaLabel = 'Details',
  last = false,
  className = '',
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={`zpt-tour-row ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem', padding: '1.5rem 2rem', background: hover ? 'var(--surface-card)' : 'var(--canvas)',
        borderBottom: last ? 'none' : '1px solid rgba(224,191,188,0.35)',
        transition: 'background var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 30, color: hover ? 'var(--crimson)' : 'var(--rose)', transition: 'color var(--dur-base) var(--ease-out)' }}>
          {num}
        </span>
        <div>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, color: hover ? 'var(--crimson)' : 'var(--ink-2)', transition: 'color var(--dur-base) var(--ease-out)' }}>
            {title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
            {duration && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-olive)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span>{duration}
              </span>
            )}
            {meta && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-warm)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>group</span>{meta}
              </span>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {description && (
          <p style={{ margin: 0, maxWidth: '20rem', fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.5, color: 'var(--ink-warm)' }}>
            {description}
          </p>
        )}
        <a href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: 'var(--crimson)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {ctaLabel}
          <span className="material-symbols-outlined" style={{ fontSize: 18, transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }}>chevron_right</span>
        </a>
      </div>
    </div>
  );
}

export default TourRow;
