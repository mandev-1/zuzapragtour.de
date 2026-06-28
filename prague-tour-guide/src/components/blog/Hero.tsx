import React from 'react';

interface HeroProps {
  kicker?: string;
  /** Plain text or React node fallback when titleHtml is not provided */
  title: React.ReactNode;
  /** Optional raw HTML (supports <em>...</em> for burgundy italic emphasis) */
  titleHtml?: string;
  deck?: string;
  authorName: string;
  authorMeta?: string;
  publishedLabel?: string;
  publishedDate: string;
  /** Single character displayed inside the avatar (defaults to first letter of authorName) */
  avatarLetter?: string;
}

/**
 * Editorial hero: kicker rule, large display title, italic deck,
 * and a byline row with brass-gradient avatar + publish date.
 */
const Hero: React.FC<HeroProps> = ({
  kicker = 'Reise-Journal · Praktischer Rat',
  title,
  titleHtml,
  deck,
  authorName,
  authorMeta,
  publishedLabel = 'Veröffentlicht am',
  publishedDate,
  avatarLetter,
}) => {
  const letter = avatarLetter ?? authorName.trim().charAt(0).toUpperCase();

  return (
    <section className="mx-auto max-w-shell px-6 pb-[60px] pt-[80px] md:px-12">
      {kicker && (
        <div className="mb-7 flex items-center gap-[14px] font-sans text-[11px] uppercase tracking-[0.24em] text-burgundy">
          <span aria-hidden="true" className="block h-px w-9 bg-burgundy" />
          <span>{kicker}</span>
        </div>
      )}

      {titleHtml ? (
        <h1
          className="m-0 mb-8 max-w-[16ch] font-display text-[clamp(44px,5.4vw,78px)] font-normal leading-[1.05] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.01em] [&_em]:text-burgundy"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : (
        <h1 className="m-0 mb-8 max-w-[16ch] font-display text-[clamp(44px,5.4vw,78px)] font-normal leading-[1.05] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.01em] [&_em]:text-burgundy">
          {title}
        </h1>
      )}

      {deck && (
        <p className="m-0 mb-10 max-w-[52ch] font-italic text-[22px] font-normal italic leading-[1.5] text-ink-soft">
          {deck}
        </p>
      )}

      <div className="flex max-w-measure items-center gap-5 border-t border-rule pt-6 font-sans text-[13px] text-ink-mute">
        <div
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[18px] italic text-ivory"
          style={{ background: 'linear-gradient(135deg, #C9A87A 0%, #8C6A3C 100%)' }}
        >
          {letter}
        </div>
        <div className="min-w-0">
          <div className="font-sans text-[13px] font-medium tracking-[0.02em] text-ink">
            {authorName}
          </div>
          {authorMeta && <div className="text-ink-mute">{authorMeta}</div>}
        </div>
        <div className="ml-auto text-right">
          <div className="text-ink-mute">{publishedLabel}</div>
          <div className="font-sans text-[13px] font-medium tracking-[0.02em] text-ink">
            {publishedDate}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
