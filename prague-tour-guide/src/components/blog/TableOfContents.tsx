'use client';

import React from 'react';

export interface TocItem {
  id: string;
  label: string;
  /** Display index — roman numeral, arabic, or letter ("i", "1", "iv") */
  index?: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  /** Label above the list */
  title?: string;
}

/**
 * Sticky left-rail TOC. Active link mirrors scroll position via
 * IntersectionObserver with a -200px / -70% rootMargin window.
 */
const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title = 'In diesem Artikel',
}) => {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? '');

  React.useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-200px 0px -70% 0px', threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Inhaltsverzeichnis" className="sticky top-[100px] font-sans text-[12px]">
      <div className="mb-4 border-b border-rule pb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        {title}
      </div>
      <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={[
                  'block border-l py-0.5 leading-[1.4] no-underline transition-all duration-200',
                  isActive
                    ? 'border-l-2 border-burgundy pl-[11px] text-burgundy'
                    : 'border-rule pl-3 text-ink-soft hover:border-burgundy hover:text-burgundy',
                ].join(' ')}
              >
                {it.index && (
                  <span className="mr-2 font-display text-[13px] italic text-brass">
                    {it.index}
                  </span>
                )}
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
