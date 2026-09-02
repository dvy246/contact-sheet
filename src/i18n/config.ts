export const LOCALES = ["en", "es", "de", "fr", "ja", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const NON_DEFAULT_LOCALES: Locale[] = ["es", "de", "fr", "ja", "pt"];

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  langAttr: string;
  ogLocale: string;
  dir?: "ltr" | "rtl";
}

export const LOCALE_MAP: Record<Locale, LocaleConfig> = {
  en: { code: "en", name: "English", nativeName: "English", langAttr: "en", ogLocale: "en_US", dir: "ltr" },
  es: { code: "es", name: "Spanish", nativeName: "Español", langAttr: "es", ogLocale: "es_ES", dir: "ltr" },
  de: { code: "de", name: "German", nativeName: "Deutsch", langAttr: "de", ogLocale: "de_DE", dir: "ltr" },
  fr: { code: "fr", name: "French", nativeName: "Français", langAttr: "fr", ogLocale: "fr_FR", dir: "ltr" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", langAttr: "ja", ogLocale: "ja_JP", dir: "ltr" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", langAttr: "pt", ogLocale: "pt_BR", dir: "ltr" },
};
