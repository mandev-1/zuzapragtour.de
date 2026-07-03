import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual register. @default 'primary' */
  variant?: 'primary' | 'accent' | 'ink' | 'outline' | 'onDark' | 'link';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Material Symbols glyph name rendered alongside the label (e.g. 'arrow_forward'). */
  icon?: string;
  /** Place the icon before the label instead of after. @default false */
  iconLeading?: boolean;
  /** Render as an <a> with this href instead of a <button>. */
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action control for Zuza Prague Tours.
 *
 * @startingPoint section="Core" subtitle="Buttons in every brand variant" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
export default Button;
