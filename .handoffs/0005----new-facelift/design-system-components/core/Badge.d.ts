import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'gold' */
  variant?: 'gold' | 'burgundy' | 'solid' | 'outline';
  /** Optional leading Material Symbols glyph (filled). */
  icon?: string;
  children?: React.ReactNode;
}

/** Small pill label — e.g. the certified-expert capsule. */
export function Badge(props: BadgeProps): JSX.Element;
export default Badge;
