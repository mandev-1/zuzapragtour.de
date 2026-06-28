import React from 'react';

interface ArticleProps {
  /** Left rail — typically a TableOfContents */
  toc?: React.ReactNode;
  /** Right rail — typically RailCard×2 + ShareBlock */
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Three-column editorial article shell.
 *
 *   ┌──────────┬───────────────┬──────────┐
 *   │  TOC     │   article     │  rail    │
 *   │  200px   │   1fr         │  260px   │
 *   └──────────┴───────────────┴──────────┘
 *
 * Collapses to single column under 1100px (TOC + rail hide).
 * The `gap` and outer paddings match the reference design tokens.
 */
const Article: React.FC<ArticleProps> = ({ toc, sidebar, children }) => {
  return (
    <div className="mx-auto max-w-shell px-6 pb-20 pt-8 md:px-12 md:pt-12">
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[200px_1fr_260px]">
        <aside className="hidden lg:sticky lg:top-[100px] lg:block">{toc}</aside>
        <article className="mx-auto w-full max-w-measure">{children}</article>
        <aside className="hidden flex-col gap-6 lg:sticky lg:top-[100px] lg:flex">
          {sidebar}
        </aside>
      </div>
    </div>
  );
};

export default Article;
