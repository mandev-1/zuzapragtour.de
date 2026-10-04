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
 * Card-style author bio in the journal palette. 96×96 round portrait (real
 * photo via next/image, or an initial fallback) on the left, kicker / serif
 * name / bio / credential list on the right. Stacks to one column on mobile.
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
    <div className="mt-8 grid grid-cols-1 items-start gap-6 bg-journal-panel p-[22px] sm:grid-cols-[96px_1fr]">
      <div className="relative h-24 w-24 overflow-hidden rounded-full">
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="96px"
            className="object-cover [object-position:center_18%]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid h-full w-full place-items-center font-news text-[44px] italic text-white"
            style={{ background: '#6B1F2A' }}
          >
            {portraitInitial}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="mb-1 font-hanken text-[14px] font-bold text-journal-blue">
          {kicker}
        </div>
        <h4 className="m-0 mb-2 font-news text-[24px] font-semibold leading-[1.2] text-journal-ink">
          {name}
        </h4>
        <p className="m-0 mb-4 font-hanken text-[16px] leading-[1.55] text-journal-ink">
          {bio}
        </p>
        {credentials && credentials.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-hanken text-[14px] text-journal-mute">
            {credentials.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span aria-hidden="true" className="block h-[5px] w-[5px] rounded-full bg-journal-burgundy" />
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
