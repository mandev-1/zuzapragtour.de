import * as React from 'react';

export interface TourRowProps {
  /** Two-digit numeral, e.g. '01'. */
  num: string;
  title: string;
  /** Duration chip, e.g. '4 Stunden'. */
  duration?: string;
  /** Group/meta chip, e.g. 'Private Gruppe'. */
  meta?: string;
  /** Short description shown on the right (desktop). */
  description?: string;
  href?: string;
  /** CTA link label. @default 'Details' */
  ctaLabel?: string;
  /** Drop the bottom hairline on the final row. @default false */
  last?: boolean;
}

/**
 * Numbered, hover-reactive tour row from the homepage highlights list.
 *
 * @startingPoint section="Marketing" subtitle="Numbered tour highlight row" viewport="700x130"
 */
export function TourRow(props: TourRowProps): JSX.Element;
export default TourRow;
