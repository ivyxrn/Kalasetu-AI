import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { en } from './locales/en';
import { hi } from './locales/hi';

const dictionaries = { en, hi };

export const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    description: 'All menus, buttons, and guided instructions will be shown in clear English.',
    isDefault: true,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    description: 'सभी मेनू, बटन और मार्गदर्शक निर्देश सरल और स्पष्ट हिन्दी में दिखाए जाएंगे।',
    isDefault: false,
  },
];

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Initialise language from localStorage with fallback to English
  const [language, setLanguageState] = useState(() => {
    try {
      // 1. Direct language key
      const storedLang = localStorage.getItem('kalasetu_language');
      if (storedLang === 'hi' || storedLang === 'en') return storedLang;

      // 2. Settings preferences key
      const settingsRaw = localStorage.getItem('kalasetu_settings_preferences');
      if (settingsRaw) {
        const parsed = JSON.parse(settingsRaw);
        if (parsed?.language?.interfaceLanguage === 'hi') return 'hi';
      }
    } catch (e) {
      console.warn('Failed to read language preference from localStorage:', e);
    }
    return 'en';
  });

  // Switch language and persist
  const setLanguage = useCallback((newLang) => {
    if (newLang !== 'en' && newLang !== 'hi') {
      console.warn(`Unsupported language "${newLang}". Only 'en' and 'hi' are supported.`);
      return;
    }

    setLanguageState(newLang);

    try {
      localStorage.setItem('kalasetu_language', newLang);

      // Keep settings preferences synced
      const settingsRaw = localStorage.getItem('kalasetu_settings_preferences');
      if (settingsRaw) {
        const parsed = JSON.parse(settingsRaw);
        parsed.language = { ...(parsed.language || {}), interfaceLanguage: newLang };
        localStorage.setItem('kalasetu_settings_preferences', JSON.stringify(parsed));
      }
    } catch (e) {
      console.warn('Failed to persist language preference:', e);
    }

    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
      if (newLang === 'hi') {
        document.documentElement.classList.add('lang-hi');
      } else {
        document.documentElement.classList.remove('lang-hi');
      }
    }
  }, []);

  // Sync on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (language === 'hi') {
        document.documentElement.classList.add('lang-hi');
      } else {
        document.documentElement.classList.remove('lang-hi');
      }
    }
  }, [language]);

  // Deep key lookup helper
  const resolvePath = (obj, path) => {
    if (!obj || !path) return undefined;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  };

  // Translation function
  const t = useCallback(
    (keyPath, paramsOrFallback, explicitFallback) => {
      let params = {};
      let fallback = '';

      if (typeof paramsOrFallback === 'string') {
        fallback = paramsOrFallback;
      } else if (typeof paramsOrFallback === 'object' && paramsOrFallback !== null) {
        params = paramsOrFallback;
        fallback = explicitFallback || '';
      } else if (explicitFallback) {
        fallback = explicitFallback;
      }

      // Lookup in selected language dictionary
      const activeDict = dictionaries[language] || dictionaries.en;
      let text = resolvePath(activeDict, keyPath);

      // Fallback to English dictionary if missing in Hindi
      if (text === undefined || text === null) {
        text = resolvePath(dictionaries.en, keyPath);
      }

      // Final fallback to provided default or key itself
      if (text === undefined || text === null) {
        text = fallback || keyPath;
      }

      // Variable interpolation: replaces {variable} with params.variable
      if (typeof text === 'string' && Object.keys(params).length > 0) {
        return text.replace(/\{(\w+)\}/g, (match, paramName) => {
          return params[paramName] !== undefined ? params[paramName] : match;
        });
      }

      return text;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isHindi: language === 'hi',
      isEnglish: language === 'en',
      supportedLanguages,
    }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const useTranslation = useLanguage;
