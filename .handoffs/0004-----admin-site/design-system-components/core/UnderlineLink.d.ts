import * as React from 'react';

export interface UnderlineLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destination. Renders an <a> when set, otherwise a <span>. */
  href?: string;
  /** Trailing Material Symbols glyph that nudges up-and-right on hover (e.g. 'arrow_outward'). */
  icon?: string;
  /** Pin the link color instead of inheriting currentColor (e.g. 'var(--gold-lamp)'). */
  color?: string;
  /** Override the rendered element. @default 'a' when href is set, else 'span' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/**
 * Signature animated-underline text link (the live site's `.ulink`).
 * Uppercase Inter Tight on a 1px rule that retracts on hover.
 */
export function UnderlineLink(props: UnderlineLinkProps): JSX.Element;
export default UnderlineLink;
