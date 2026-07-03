import React from 'react';

/**
 * UnderlineLink — the brand's signature "ulink": an uppercase, tracked
 * Inter Tight link sitting on a full-width 1px rule that *retracts to the
 * right* on hover, with an optional trailing Material Symbol that nudges
 * up-and-right. Color is inherited (currentColor) so the same link reads
 * correctly on paper and on the dark ink footer; pass `color` to pin it
 * (e.g. var(--gold-lamp) for the TripAdvisor rating in the footer).
 */
export function UnderlineLink({
  children,
  href,
  icon,
  color,
  as,
  className = '',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as || (href ? 'a' : 'span');
  return (
    <Tag
      className={`zpt-underline-link ${className}`}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        color: color || 'currentColor',
        paddingBottom: 4,
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
      {icon && (
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 16,
            transition: 'transform var(--dur-base) var(--ease-out)',
            transform: hover ? 'translate(3px, -3px)' : 'none',
          }}
        >
          {icon}
        </span>
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 1,
          width: '100%',
          background: 'currentColor',
          transform: hover ? 'scaleX(0)' : 'scaleX(1)',
          transformOrigin: hover ? 'right' : 'left',
          transition: 'transform var(--dur-base) var(--ease-out)',
        }}
      ></span>
    </Tag>
  );
}

export default UnderlineLink;
