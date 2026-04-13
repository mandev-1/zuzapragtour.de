import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translate, TranslationKey } from '../utils/translations';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize from localStorage if available; default to German
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('zpt.lang');
      if (saved === 'en' || saved === 'de') return saved;
    } catch {}
    return 'de';
  });

  // Persist language changes
  useEffect(() => {
    try {
      localStorage.setItem('zpt.lang', language);
      // Also reflect on document element immediately for SSR-like correctness
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
