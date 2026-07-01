import * as React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Color register. @default 'brass' */
  tone?: 'brass' | 'burgundy' | 'gold' | 'onDark' | 'mute';
  /** Optional leading Material Symbols glyph (rendered filled). */
  icon?: string;
  /** Element tag. @default 'span' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Tracked uppercase kicker label above headings. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
export default Eyebrow;
