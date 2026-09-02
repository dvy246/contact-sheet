import { DEFAULT_LOCALE, type Locale } from './config';
import { en, type TranslationDict } from './locales/en';
import { es } from './locales/es';
import { de } from './locales/de';
import { fr } from './locales/fr';
import { ja } from './locales/ja';
import { pt } from './locales/pt';

const dictionaries: Record<Locale, TranslationDict> = {
  en,
  es,
  de,
  fr,
  ja,
  pt,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): TranslationDict {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

/**
 * Hook to retrieve a translator function for a given locale.
 * Supports dot notation: t('nav.startCreating')
 * With automatic fallback to English if key is missing in target locale.
 */
export function useTranslations(locale: Locale = DEFAULT_LOCALE) {
  const dict = getDictionary(locale);
  const fallbackDict = dictionaries[DEFAULT_LOCALE];

  return function t(keyPath: string, params?: Record<string, string | number>): string {
    const segments = keyPath.split('.');
    
    let current: any = dict;
    for (const segment of segments) {
      if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        current = undefined;
        break;
      }
    }

    if (current === undefined || typeof current !== 'string') {
      // Fallback to English dictionary
      let fallbackCurrent: any = fallbackDict;
      for (const segment of segments) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && segment in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[segment];
        } else {
          fallbackCurrent = undefined;
          break;
        }
      }
      current = typeof fallbackCurrent === 'string' ? fallbackCurrent : keyPath;
    }

    let result: string = current;
    if (params) {
      for (const [paramKey, paramVal] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      }
    }

    return result;
  };
}

export * from './config';
export * from './utils';
