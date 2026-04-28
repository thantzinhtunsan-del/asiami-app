import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ja', 'my', 'vi', 'zh', 'ne', 'th', 'id'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  my: 'မြန်မာဘာသာ',
  vi: 'Tiếng Việt',
  zh: '中文',
  ne: 'नेपाली',
  th: 'ภาษาไทย',
  id: 'Bahasa Indonesia',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
});
