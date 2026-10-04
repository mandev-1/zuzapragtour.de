import React from 'react';
import AuthorBio from './AuthorBio';

interface AuthorProps {
  portrait?: { src: string; alt: string };
  portraitInitial?: string;
  kicker?: string;
  name: string;
  bio: string;
  credentials?: string[];
}

interface ArticleFooterProps {
  tags?: string[];
  author: AuthorProps;
}

/**
 * Footer of the article body: tags row above an AuthorBio card, in the
 * journal palette. Top rule separates it from the sources / CTA above.
 */
const ArticleFooter: React.FC<ArticleFooterProps> = ({ tags, author }) => {
  return (
    <footer className="mt-14 border-t border-journal-rule pt-8">
      {tags && tags.length > 0 && (
        <ul className="m-0 mb-8 flex list-none flex-wrap gap-2 p-0">
          {tags.map((t) => (
            <li
              key={t}
              className="cursor-default rounded-[3px] border border-journal-rule px-3 py-1 font-hanken text-[13px] text-journal-mute"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      <AuthorBio {...author} />
    </footer>
  );
};

export default ArticleFooter;
