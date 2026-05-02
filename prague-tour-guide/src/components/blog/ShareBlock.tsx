'use client';

import React from 'react';

interface ShareBlockProps {
  /** Article URL — used for copy-to-clipboard and email subject */
  url?: string;
  /** Article title — used for email subject */
  title?: string;
  /** Optional reader-save count (display string, e.g. "247") */
  saveCount?: string;
  saveLabel?: string;
  shareLabel?: string;
}

const Btn: React.FC<{
  label: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}> = ({ label, onClick, href, children }) => {
  const cls =
    'grid h-8 w-8 place-items-center rounded-full border border-rule bg-transparent text-ink-soft transition-all duration-200 hover:border-burgundy hover:bg-burgundy/[0.04] hover:text-burgundy';
  if (href) {
    return (
      <a href={href} aria-label={label} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      {children}
    </button>
  );
};

/**
 * Share row + save-count. Email / copy-link / print / save buttons,
 * each a 32×32 round outlined button. Calmer than coloured social
 * pills — meant for the right rail of editorial articles.
 */
const ShareBlock: React.FC<ShareBlockProps> = ({
  url,
  title,
  saveCount,
  saveLabel = 'Leser haben diesen Artikel gespeichert',
  shareLabel = 'Teilen',
}) => {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      const target = url ?? (typeof window !== 'undefined' ? window.location.href : '');
      await navigator.clipboard.writeText(target);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const onPrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const mailHref = `mailto:?subject=${encodeURIComponent(title ?? '')}&body=${encodeURIComponent(
    url ?? ''
  )}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="border-b border-rule pb-[10px] font-sans text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        {shareLabel}
      </div>
      <div className="flex gap-[10px]">
        <Btn label="Per E-Mail teilen" href={mailHref}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 6h16v12H4z" />
            <path d="M4 6l8 7 8-7" />
          </svg>
        </Btn>
        <Btn label={copied ? 'Kopiert' : 'Link kopieren'} onClick={onCopy}>
          {copied ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12l5 5L20 7" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="8" y="8" width="12" height="12" rx="1" />
              <path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3" />
            </svg>
          )}
        </Btn>
        <Btn label="Drucken" onClick={onPrint}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 9V3h12v6" />
            <rect x="4" y="9" width="16" height="8" rx="1" />
            <path d="M6 17h12v4H6z" />
          </svg>
        </Btn>
        <Btn label="Speichern">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 3h12v18l-6-4-6 4z" />
          </svg>
        </Btn>
      </div>
      {saveCount && (
        <div className="font-sans text-[10px] leading-[1.5] tracking-[0.06em] text-ink-mute">
          <strong className="font-medium text-ink">{saveCount}</strong> {saveLabel}
        </div>
      )}
    </div>
  );
};

export default ShareBlock;
