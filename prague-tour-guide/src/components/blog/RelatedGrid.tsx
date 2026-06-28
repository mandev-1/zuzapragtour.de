import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface RelatedItem {
  id: string;
  href: string;
  image?: { src: string; alt: string };
  kicker?: string;
  /** Title — plain string */
  title?: string;
  /** Title — raw HTML (supports <em>...</em> for italic burgundy) */
  titleHtml?: string;
  meta?: string;
}

interface RelatedGridProps {
  items: RelatedItem[];
  title?: string;
  allLink?: { label: string; href: string };
}

/**
 * Three-column grid of related-article cards. 4:3 cover image with
 * subtle 1.02 scale on hover, kicker / italic-aware title / meta.
 * Collapses to single column under 720px.
 */
const RelatedGrid: React.FC<RelatedGridProps> = ({
  items,
  title = 'Weiterlesen',
  allLink = { label: 'Gesamtes Journal →', href: '/blog' },
}) => {
  if (!items.length) return null;
  return (
    <section className="mx-auto mt-20 max-w-shell border-t border-rule px-6 py-20 md:px-12">
      <div className="mb-12 flex items-baseline justify-between gap-4">
        <h3 className="m-0 font-italic text-[40px] font-normal italic text-ink">{title}</h3>
        {allLink && (
          <Link
            href={allLink.href}
            className="border-b border-burgundy pb-1 font-sans text-[11px] uppercase tracking-[0.2em] text-burgundy no-underline transition-colors hover:text-burgundy-deep"
          >
            {allLink.label}
          </Link>
        )}
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-3">
        {items.map((it) => (
          <li key={it.id}>
            <Link href={it.href} className="group block no-underline">
              {it.image && (
                <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-ink-soft">
                  <Image
                    src={it.image.src}
                    alt={it.image.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>
              )}
              {it.kicker && (
                <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.24em] text-burgundy">
                  {it.kicker}
                </div>
              )}
              {it.titleHtml ? (
                <h4
                  className="m-0 mb-3 font-display text-[22px] font-normal leading-[1.25] tracking-[0.01em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.005em] [&_em]:text-burgundy"
                  dangerouslySetInnerHTML={{ __html: it.titleHtml }}
                />
              ) : (
                <h4 className="m-0 mb-3 font-display text-[22px] font-normal leading-[1.25] tracking-[0.01em] text-ink">
                  {it.title}
                </h4>
              )}
              {it.meta && (
                <div className="font-sans text-[11px] uppercase tracking-[0.1em] text-ink-mute">
                  {it.meta}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedGrid;
