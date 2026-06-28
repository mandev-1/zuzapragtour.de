'use client';

import React from 'react';

interface NewsletterCardProps {
  kicker?: string;
  /** Title — string or HTML (supports <em>...</em>) */
  title?: string;
  titleHtml?: string;
  deck?: string;
  placeholder?: string;
  buttonLabel?: string;
  confirmedLabel?: string;
}

/**
 * Inline newsletter card on ink (near-black) background, decorative
 * brass vertical frame lines at 16px insets, centered content with a
 * borderless email input + button on a single brass underline.
 */
const NewsletterCard: React.FC<NewsletterCardProps> = ({
  kicker = 'Das Pragtour-Journal',
  title,
  titleHtml = 'Briefe aus <em>Praha</em>, einmal monatlich.',
  deck = 'Reise-Notizen, Restaurant-Empfehlungen abseits der Pfade und kleine Geschichten aus zwölf Jahren Stadtführungen — direkt in Ihren Posteingang.',
  placeholder = 'Ihre E-Mail-Adresse',
  buttonLabel = 'Abonnieren →',
  confirmedLabel = 'Bestätigt ✓',
}) => {
  const [confirmed, setConfirmed] = React.useState(false);

  return (
    <div className="relative my-[4em] overflow-hidden bg-ink px-12 py-[60px] text-center text-ivory">
      <span aria-hidden="true" className="absolute bottom-4 left-4 top-4 w-px bg-brass opacity-50" />
      <span aria-hidden="true" className="absolute bottom-4 right-4 top-4 w-px bg-brass opacity-50" />
      <div className="mb-[18px] font-sans text-[11px] uppercase tracking-[0.3em] text-brass">
        {kicker}
      </div>
      {titleHtml ? (
        <h3
          className="mx-auto mb-3 max-w-[22ch] font-display text-[38px] font-normal leading-[1.2] tracking-[0.005em] text-ivory [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.005em] [&_em]:text-brass"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : (
        <h3 className="mx-auto mb-3 max-w-[22ch] font-display text-[38px] font-normal leading-[1.2] tracking-[0.005em] text-ivory [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.005em] [&_em]:text-brass">
          {title}
        </h3>
      )}
      <p className="mx-auto mb-8 max-w-[52ch] font-body text-[17px] italic leading-[1.55] text-ivory/75">
        {deck}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmed(true);
        }}
        className="mx-auto flex max-w-[460px] items-stretch border-b border-brass"
      >
        <label className="sr-only" htmlFor="zpt-newsletter-email">
          E-Mail
        </label>
        <input
          id="zpt-newsletter-email"
          type="email"
          required
          placeholder={placeholder}
          className="flex-1 bg-transparent px-1 py-3.5 font-body text-[17px] text-ivory outline-none placeholder:italic placeholder:text-ivory/40"
        />
        <button
          type="submit"
          className="bg-transparent px-0 py-3.5 pl-5 font-sans text-[11px] uppercase tracking-[0.2em] text-brass transition-colors hover:text-ivory"
        >
          {confirmed ? confirmedLabel : buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default NewsletterCard;
