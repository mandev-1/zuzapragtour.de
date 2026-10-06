import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  TRIPADVISOR_LISTING_URL,
  tripAdvisorContainerId,
  tripAdvisorWidgetEmbedSrc,
} from '../constants/tripAdvisor';

declare global {
  interface Window {
    taValidate?: () => void;
  }
}

/**
 * The injected widget markup has an empty link and <dl>s that wrap a <dt> in an
 * <a> (dl > a > dt), which breaks the accessibility tree (Lighthouse "Agentic
 * Browsing"). Name the bare links, move such links inside their <dt> (the
 * widget CSS styles dt by tag, so the elements themselves stay) and mark the
 * decorative lists role="none".
 */
function repairWidgetA11y(root: HTMLElement, linkLabel: string) {
  root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
    const named = a.textContent?.trim() || a.getAttribute('aria-label') || a.querySelector('img[alt]:not([alt=""])');
    if (!named) a.setAttribute('aria-label', linkLabel);
  });
  root.querySelectorAll('dl > a').forEach((a) => {
    const dt = a.querySelector(':scope > dt');
    if (!dt || !a.parentElement) return;
    a.parentElement.replaceChild(dt, a);
    while (dt.firstChild) a.appendChild(dt.firstChild);
    dt.appendChild(a);
  });
  root.querySelectorAll('dl:not([role])').forEach((dl) => dl.setAttribute('role', 'none'));
}

/**
 * TripAdvisor “Self-Serve” widget.
 * Requires a node `#TA_selfserveprop{uniq}` matching `uniq` in the script URL (see constants).
 * In SPAs, `window.onload` has already fired, so we call `taValidate()` after the embed script loads.
 */
const TripAdvisorWidget: React.FC = () => {
  const { t, language } = useLanguage();
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const container = document.getElementById(tripAdvisorContainerId());
    if (container) {
      container.innerHTML = '';
    }

    // Patch the third-party markup as soon as TripAdvisor injects it.
    const linkLabel = t('home.tripadvisor.viewAll');
    const observer = new MutationObserver(() => {
      observer.disconnect();
      repairWidgetA11y(shell, linkLabel);
      observer.observe(shell, { childList: true, subtree: true });
    });
    observer.observe(shell, { childList: true, subtree: true });

    shell.querySelectorAll('script[data-zpt-ta]').forEach((el) => el.remove());

    const script = document.createElement('script');
    script.async = true;
    script.src = tripAdvisorWidgetEmbedSrc(language);
    script.dataset.zptTa = '1';

    const onLoad = () => {
      requestAnimationFrame(() => {
        window.taValidate?.();
      });
    };
    script.addEventListener('load', onLoad);

    shell.appendChild(script);

    return () => {
      observer.disconnect();
      script.removeEventListener('load', onLoad);
      script.remove();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [language]);

  return (
    <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-sm md:p-6">
      <div
        ref={shellRef}
        className="w-full overflow-x-auto [&_a]:text-primary [&_iframe]:max-w-full [&_.widSSP]:mx-auto"
      >
        <div
          id={tripAdvisorContainerId()}
          className="TA_selfserveprop flex min-h-[120px] justify-center"
        />
      </div>

      {/* Static badge — always visible regardless of third-party script status */}
      <div className="mt-6 flex flex-col items-center gap-1 border-t border-outline-variant/20 pt-5">
        <a
          href={TRIPADVISOR_LISTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('home.tripadvisor.viewAll')}
          className="flex flex-col items-center gap-1 no-underline"
        >
          <span className="text-2xl leading-none text-primary" aria-hidden="true">
            ★★★★★
          </span>
          <span className="font-semibold text-on-surface">
            {t('home.tripadvisor.badge.rating')}
          </span>
          <span className="font-label text-sm text-on-surface-variant">
            {t('home.tripadvisor.badge.reviewCount')}
          </span>
          <span className="mt-1 font-label text-xs font-semibold text-primary underline-offset-4 hover:underline">
            {t('home.tripadvisor.viewAll')}
          </span>
        </a>
      </div>
    </div>
  );
};

export default TripAdvisorWidget;
