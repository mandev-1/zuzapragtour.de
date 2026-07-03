import * as React from 'react';

export interface CalloutProps {
  /** Tracked uppercase label. @default 'Vorab in einer Zeile' */
  label?: string;
  children?: React.ReactNode;
}

/** Paper aside with a brass left rule — for tips and asides in articles. */
export function Callout(props: CalloutProps): JSX.Element;
export default Callout;
