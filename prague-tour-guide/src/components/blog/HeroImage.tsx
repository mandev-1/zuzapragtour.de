import React from 'react';
import Image from 'next/image';

interface HeroImageProps {
  src: string;
  alt: string;
  caption?: string;
  /** Photo credit, displayed as a small uppercase trailing tag */
  credit?: string;
  /** Hint to next/image — eager-loads the hero. */
  priority?: boolean;
}

/**
 * Full-width hero photograph constrained to 1240px, 16:9 aspect.
 * Optional italic caption with brass left rule beneath.
 */
const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  caption,
  credit,
  priority = true,
}) => {
  return (
    <figure className="mx-auto mt-5 max-w-[1240px] px-0">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-soft">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1240px) 100vw, 1240px"
          className="object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mx-auto mt-4 max-w-[64ch] border-l border-brass px-6 py-1 pl-4 font-body text-[14px] italic leading-[1.5] text-ink-mute md:px-12">
          {caption}
          {credit && (
            <span className="ml-3 inline-block font-sans text-[10px] not-italic uppercase tracking-[0.16em] text-ink-mute opacity-70">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default HeroImage;
