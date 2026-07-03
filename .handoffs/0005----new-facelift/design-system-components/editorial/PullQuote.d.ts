import * as React from 'react';

export interface PullQuoteProps {
  children?: React.ReactNode;
  /** Source line shown below the quote (tracked uppercase). */
  attribution?: string;
}

/** Large burgundy-ruled italic pull quote with a decorative glyph. */
export function PullQuote(props: PullQuoteProps): JSX.Element;
export default PullQuote;
