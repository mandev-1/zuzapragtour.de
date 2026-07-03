import * as React from 'react';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label shown above the control. */
  label?: string;
  name?: string;
  /** Input type when `as="input"`. @default 'text' */
  type?: string;
  /** Control element. @default 'input' */
  as?: 'input' | 'textarea';
  required?: boolean;
  placeholder?: string;
  /** Rows for textarea. @default 4 */
  rows?: number;
  /** Small helper text below the control. */
  hint?: string;
}

/** Labelled text input / textarea matching the editorial contact form. */
export function Field(props: FieldProps): JSX.Element;
export default Field;
