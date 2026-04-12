import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TOURHQ_GUIDE_URL } from '../constants/tourHq';

const TourHqWidget: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-sm md:p-6">
      <div className="flex flex-col items-center gap-5 py-6 text-center">
        {/* TourHQ wordmark */}
        <div className="flex items-center gap-2">
          <span className="rounded bg-primary px-2 py-0.5 font-headline text-lg font-bold tracking-wide text-on-primary">
            Tour
          </span>
          <span className="font-headline text-lg font-bold text-on-surface">HQ</span>
        </div>

        <p className="max-w-xs font-label text-sm text-on-surface-variant">
          {t('home.tourhq.cardText')}
        </p>

        <a
          href={TOURHQ_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-on-primary shadow-sm hover:opacity-90 active:opacity-80 transition-opacity"
        >
          {t('home.tourhq.viewProfile')}
          <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
        </a>
      </div>
    </div>
  );
};

export default TourHqWidget;
