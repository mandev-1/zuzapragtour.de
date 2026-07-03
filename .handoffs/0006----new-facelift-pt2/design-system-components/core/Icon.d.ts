import * as React from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols glyph name, e.g. 'arrow_forward'. */
  name: string;
  /** Pixel size. @default 20 */
  size?: number;
  /** Use the filled variant (FILL 1). @default false */
  fill?: boolean;
  /** Optional weight axis 100–700. */
  weight?: number;
  /** CSS color. */
  color?: string;
}

/** Material Symbols icon wrapper. */
export function Icon(props: IconProps): JSX.Element;
export default Icon;
