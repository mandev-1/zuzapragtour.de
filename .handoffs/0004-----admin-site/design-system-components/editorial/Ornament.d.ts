import * as React from 'react';

export interface OrnamentProps {
  /** Center glyph. @default '❦' */
  glyph?: string;
}

/** Brass-ruled fleuron divider between article passages. */
export function Ornament(props: OrnamentProps): JSX.Element;
export default Ornament;
