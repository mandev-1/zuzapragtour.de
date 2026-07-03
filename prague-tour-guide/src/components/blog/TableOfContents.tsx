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
  title = 'Inhalt',
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

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const smooth = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 90; // clear the sticky masthead
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    setActiveId(id);
  };

  return (
    <nav aria-label="Inhalt" className="border-t-2 border-ink pt-[1.05rem]">
      <div className="mb-[0.85rem] font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
        {title}
      </div>
      <ol className="m-0 grid list-none gap-[0.2rem] p-0">
        {items.map((it, i) => {
          const isActive = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => jump(e, it.id)}
                className={`flex items-baseline gap-[0.7rem] border-l-2 py-[0.45rem] pl-[0.85rem] font-sans text-[0.98rem] leading-[1.4] no-underline transition-[color,border-color] duration-300 ease-brand hover:text-burgundy ${
                  isActive ? 'border-burgundy font-semibold text-burgundy' : 'border-rule-soft font-normal text-ink-soft'
                }`}
              >
                <span aria-hidden className={`shrink-0 font-display text-[0.92rem] transition-colors duration-300 ${isActive ? 'text-burgundy' : 'text-brass-deep'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{it.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default TableOfContents;
