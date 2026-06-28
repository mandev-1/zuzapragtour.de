'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translate, TranslationKey } from '../utils/translations';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  t: (key: TranslationKey) => translate(key, 'de'),
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Always start with 'de' to match server-rendered HTML (avoids hydration mismatch).
  // localStorage is read after mount in useEffect.
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zpt.lang') as Language | null;
      if (saved === 'en' || saved === 'de') setLanguage(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('zpt.lang', language);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = language;
      }
    } catch {}
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translate(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
