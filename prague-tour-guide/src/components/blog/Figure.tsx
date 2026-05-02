import React from 'react';
import Image from 'next/image';

type FigureVariant = 'contained' | 'wide' | 'full';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  variant?: FigureVariant;
  /** Aspect ratio CSS expression — defaults to 3 / 2 */
  aspect?: string;
}

const VARIANT_CLASSES: Record<FigureVariant, string> = {
  contained: '',
  wide: 'lg:-mx-[120px]',
  full:
    'lg:[margin-left:calc(-1*(50vw-330px-24px))] lg:[margin-right:calc(-1*(50vw-330px-24px))] lg:w-auto',
};

/**
 * Inline figure with three bleed variants.
 *  - `contained` stays within the article column.
 *  - `wide` extends -120px each side at desktop.
 *  - `full` extends to viewport edges at desktop.
 *
 * Italic caption with brass left-rule beneath the image.
 */
const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  caption,
  credit,
  variant = 'contained',
  aspect = '3 / 2',
}) => {
  return (
    <figure className={['my-[3em]', VARIANT_CLASSES[variant]].join(' ')}>
      <div
        className="relative w-full overflow-hidden bg-ink-soft"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            variant === 'full'
              ? '100vw'
              : variant === 'wide'
              ? '(max-width: 1100px) 100vw, 900px'
              : '(max-width: 1100px) 100vw, 660px'
          }
          className="object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3.5 max-w-[64ch] border-l border-brass pl-4 font-body text-[14px] italic leading-[1.5] text-ink-mute">
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

export default Figure;
