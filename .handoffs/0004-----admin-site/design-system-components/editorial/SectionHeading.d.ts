import * as React from 'react';

export interface SectionHeadingProps {
  /** Tracked uppercase kicker above the title. */
  eyebrow?: string;
  /** @default 'brass' */
  eyebrowTone?: 'brass' | 'burgundy' | 'gold';
  /** Optional filled glyph before the eyebrow. */
  eyebrowIcon?: string;
  /** Main heading text (Italiana display). */
  title: React.ReactNode;
  /** Trailing word rendered in burgundy Cormorant italic. */
  emphasis?: string;
  /** Supporting paragraph below the heading. */
  lead?: React.ReactNode;
  /** @default 'left' */
  align?: 'left' | 'center';
  /** Recolor for dark sections. @default false */
  onDark?: boolean;
}

/**
 * Eyebrow + serif headline section opener.
 *
 * @startingPoint section="Editorial" subtitle="Eyebrow + serif section heading" viewport="700x220"
 */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
export default SectionHeading;
