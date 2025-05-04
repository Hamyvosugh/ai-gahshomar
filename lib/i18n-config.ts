// lib/i18n-config.ts
export const defaultLocale = 'fa';
export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];

export interface I18nConfig {
  defaultLocale: typeof defaultLocale;
  locales: typeof locales;
}

export const i18nConfig: I18nConfig = {
  defaultLocale,
  locales,
};