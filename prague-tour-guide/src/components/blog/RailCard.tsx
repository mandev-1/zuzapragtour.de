import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RailCardProps {
  image?: { src: string; alt: string };
  kicker?: string;
  title: string;
  body: string;
  cta: {
    label: string;
    href: string;
    fullWidth?: boolean;
  };
}

/**
 * Calm, paper-bg right-rail block. Optional 4:3 bleed image at the top,
 * then kicker / display title / body / pill CTA. Used twice on the
 * article page (a tour recommendation and a contact card).
 */
const RailCard: React.FC<RailCardProps> = ({ image, kicker, title, body, cta }) => {
  return (
    <div className="border border-rule-soft bg-paper p-[22px]">
      {image && (
        <div className="relative -mx-[22px] -mt-[22px] mb-[18px] aspect-[4/3] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      )}
      {kicker && (
        <div className="mb-2 font-sans text-[10px] uppercase tracking-[0.2em] text-ink-mute">
          {kicker}
        </div>
      )}
      <h4 className="m-0 mb-[10px] font-display text-[21px] font-normal leading-[1.2] tracking-[0.005em] text-ink">
        {title}
      </h4>
      <p className="m-0 mb-4 font-body text-[14px] leading-[1.55] text-ink-soft">
        {body}
      </p>
      <Link
        href={cta.href}
        className={[
          'rounded-full bg-burgundy px-[22px] py-[11px] font-sans text-[13px] font-medium tracking-[0.02em] text-ivory no-underline transition-colors hover:bg-burgundy-deep',
          cta.fullWidth ? 'block w-full text-center' : 'inline-block',
        ].join(' ')}
      >
        {cta.label}
      </Link>
    </div>
  );
};

export default RailCard;
