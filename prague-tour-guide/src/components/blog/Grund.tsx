import React from 'react';

interface GrundProps {
  /** Anchor id, used by the TOC */
  id: string;
  /** Roman numeral or arabic display, e.g. "I.", "II." */
  number: string;
  /** Small label above the title, e.g. "Erster Grund" */
  label: string;
  /** Display title — either a string or React node */
  title?: React.ReactNode;
  /** Optional raw HTML title (supports <em>...</em> for italic burgundy) */
  titleHtml?: string;
  children?: React.ReactNode;
}

/**
 * Numbered editorial section ("Grund") — large display roman numeral
 * baseline-aligned with a stacked label + title. Underlined by a single
 * rule. Body content follows in `children`.
 */
const Grund: React.FC<GrundProps> = ({ id, number, label, title, titleHtml, children }) => {
  return (
    <section id={id} className="my-[5em] mb-[4em]">
      <div className="mb-6 flex items-baseline gap-6 border-b border-rule pb-5">
        <div className="shrink-0 font-display text-[64px] font-normal leading-[0.9] tracking-[0.02em] text-burgundy">
          {number}
        </div>
        <div className="min-w-0">
          <div className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.24em] text-ink-mute">
            {label}
          </div>
          {titleHtml ? (
            <h2
              className="m-0 max-w-[22ch] font-display text-[32px] font-normal leading-[1.2] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.005em] [&_em]:text-burgundy"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          ) : (
            <h2 className="m-0 max-w-[22ch] font-display text-[32px] font-normal leading-[1.2] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.005em] [&_em]:text-burgundy">
              {title}
            </h2>
          )}
        </div>
      </div>
      {children}
    </section>
  );
};

export default Grund;
