import React from 'react';

type CalloutVariant = 'info' | 'tip' | 'warning';

interface CalloutProps {
  variant?: CalloutVariant;
  label?: string;
  children: React.ReactNode;
}

const DEFAULT_LABELS: Record<CalloutVariant, string> = {
  info: 'Vorab in einer Zeile',
  tip: 'Tipp',
  warning: 'Achtung',
};

/**
 * Paper-bg callout with a 3px brass left rule and a small uppercase
 * label preceded by a 14×1px brass dash. Body uses serif body 17px.
 */
const Callout: React.FC<CalloutProps> = ({ variant = 'info', label, children }) => {
  const computedLabel = label ?? DEFAULT_LABELS[variant];
  return (
    <aside className="relative my-[2.5em] border border-rule-soft border-l-[3px] border-l-brass bg-paper px-8 py-7">
      <div className="mb-2.5 flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.24em] text-brass-deep">
        <span aria-hidden="true" className="block h-px w-[14px] bg-brass" />
        {computedLabel}
      </div>
      <div className="font-body text-[17px] leading-[1.6] text-ink-soft [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </aside>
  );
};

export default Callout;
