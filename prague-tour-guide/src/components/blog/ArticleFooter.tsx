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
 * Footer of the article body. Outlined uppercase tags row above an
 * AuthorBio card. Top border separates from the body.
 */
const ArticleFooter: React.FC<ArticleFooterProps> = ({ tags, author }) => {
  return (
    <footer className="mt-[5em] border-t border-rule pt-8">
      {tags && tags.length > 0 && (
        <ul className="m-0 mb-8 flex list-none flex-wrap gap-2 p-0">
          {tags.map((t) => (
            <li
              key={t}
              className="cursor-default border border-rule px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-soft transition-colors duration-200 hover:border-burgundy hover:text-burgundy"
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
