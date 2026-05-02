import React from 'react';
import Image from 'next/image';

interface AuthorBioProps {
  portrait?: { src: string; alt: string };
  /** Initial used inside the brass-gradient placeholder when no portrait given */
  portraitInitial?: string;
  kicker?: string;
  name: string;
  bio: string;
  credentials?: string[];
}

/**
 * Card-style author bio. 120×120 round portrait (real photo via
 * next/image, or a brass-gradient initial fallback) on the left,
 * kicker / italic name / serif bio / brass-dotted credential list
 * on the right. Stacks to single column under 720px.
 */
const AuthorBio: React.FC<AuthorBioProps> = ({
  portrait,
  portraitInitial = 'Z',
  kicker = 'Über die Autorin',
  name,
  bio,
  credentials,
}) => {
  return (
    <div className="my-[3em] grid grid-cols-1 items-start gap-8 border border-rule-soft bg-paper p-9 sm:grid-cols-[120px_1fr]">
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="120px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid h-full w-full place-items-center font-display text-[56px] font-light italic text-ivory"
            style={{ background: 'linear-gradient(135deg, #C9A87A 0%, #6B4329 100%)' }}
          >
            {portraitInitial}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="mb-2 font-sans text-[10px] uppercase tracking-[0.24em] text-ink-mute">
          {kicker}
        </div>
        <h4 className="m-0 mb-3 font-italic text-[30px] font-normal italic leading-[1.15] text-ink">
          {name}
        </h4>
        <p className="m-0 mb-4 font-body text-[16px] leading-[1.6] text-ink-soft">
          {bio}
        </p>
        {credentials && credentials.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-4 p-0 font-sans text-[11px] uppercase tracking-[0.1em] text-ink-mute">
            {credentials.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span aria-hidden="true" className="block h-[5px] w-[5px] rounded-full bg-brass" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AuthorBio;
