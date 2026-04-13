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
