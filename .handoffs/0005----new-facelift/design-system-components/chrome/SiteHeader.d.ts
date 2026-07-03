import * as React from 'react';

export interface NavLink {
  key?: string;
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  /** Brand wordmark. @default "Zuza & Pragtour" */
  brand?: React.ReactNode;
  /** Where the wordmark links. @default 'index.html' */
  brandHref?: string;
  /** Primary nav links. Defaults to Touren · Über Zuzana · Journal · Kontakt. */
  links?: NavLink[];
  /** `key` of the active link (renders it in the active color). */
  current?: string;
  /** Bordered call-to-action at the end of the nav. Pass null to omit. @default { label: 'Tour buchen', href: 'kontakt.html' } */
  cta?: { label: string; href: string } | null;
  /** Start transparent over a hero and turn glassy after ~70% viewport scroll (homepage). Off = solid from the top (inner pages). @default false */
  solidOnScroll?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Sticky marketing-site header: transparent-over-hero → glassy on scroll,
 * with a responsive hamburger menu. Harvested from the live site's `.nav`.
 */
export function SiteHeader(props: SiteHeaderProps): JSX.Element;
export default SiteHeader;
