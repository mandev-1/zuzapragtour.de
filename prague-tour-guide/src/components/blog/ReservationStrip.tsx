import React from 'react';
import Link from 'next/link';

interface ReservationStripProps {
  /** Plain text fallback */
  text?: string;
  /** Raw HTML — supports <em>...</em> highlighted in brass display */
  textHtml?: string;
  cta?: { label: string; href: string };
}

/**
 * Full-bleed burgundy band before the footer with a single italic
 * line of copy and an ivory CTA button. Hover swaps to brass + ivory.
 */
const ReservationStrip: React.FC<ReservationStripProps> = ({
  text,
  textHtml = 'Bereit, <em>Prag</em> richtig zu erleben?',
  cta = { label: 'Privattour reservieren →', href: '/book' },
}) => {
  return (
    <section className="bg-burgundy px-6 py-[50px] text-ivory md:px-12">
      <div className="mx-auto flex max-w-shell flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-10">
        {textHtml ? (
          <p
            className="m-0 font-italic text-[34px] italic text-ivory [&_em]:font-display [&_em]:not-italic [&_em]:tracking-[0.01em] [&_em]:text-brass"
            dangerouslySetInnerHTML={{ __html: textHtml }}
          />
        ) : (
          <p className="m-0 font-italic text-[34px] italic text-ivory">{text}</p>
        )}
        <Link
          href={cta.href}
          className="shrink-0 bg-ivory px-8 py-[18px] font-sans text-[12px] uppercase tracking-[0.2em] text-burgundy no-underline transition-colors duration-200 hover:bg-brass hover:text-ivory"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
};

export default ReservationStrip;
