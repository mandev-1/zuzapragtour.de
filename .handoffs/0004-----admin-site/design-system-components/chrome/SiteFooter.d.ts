import * as React from 'react';

export interface FooterLink {
  label: string;
  href: string;
  /** Open in a new tab with rel="noopener". */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  items: FooterLink[];
}

export interface SiteFooterProps {
  /** Brand wordmark. @default "Zuza & Pragtour" */
  brand?: React.ReactNode;
  /** Tagline under the brand. Pass null to omit. */
  tagline?: React.ReactNode;
  /** Cream outline CTA in the brand cell. Pass null to omit. @default Meine Touren ansehen */
  cta?: { label: string; href: string; icon?: string } | null;
  /** Gold underline rating link. Pass null to omit. @default 4,9 ★ TripAdvisor */
  rating?: { label: string; href: string } | null;
  /** Up to three link columns. Defaults to Kontakt · Schnelllinks · Mehr. */
  columns?: FooterColumn[];
  /** Bottom-bar copyright line. */
  copyright?: React.ReactNode;
  /** Legal links on the bottom bar. @default Datenschutz · AGB */
  bottomLinks?: FooterLink[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Dark ink site footer harvested from the live site's `.footer`:
 * brand + CTA + rating, three link columns, and a legal bottom bar.
 */
export function SiteFooter(props: SiteFooterProps): JSX.Element;
export default SiteFooter;
