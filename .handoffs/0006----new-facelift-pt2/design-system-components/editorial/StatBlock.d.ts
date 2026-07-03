import * as React from 'react';

export interface StatBlockProps {
  /** The metric, e.g. '40+'. */
  value: React.ReactNode;
  /** Tracked uppercase caption. */
  label: string;
  /** Recolor for dark sections. @default false */
  onDark?: boolean;
}

/** Single headline statistic — burgundy numeral over an uppercase label. */
export function StatBlock(props: StatBlockProps): JSX.Element;
export default StatBlock;
