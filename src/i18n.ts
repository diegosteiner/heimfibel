export const locales = {
  de: 'Deutsch',
  fr: 'Français',
} as const;


export type Locale = keyof typeof locales

export const defaultLocale = 'de';

export const translations = {
  de: {
    'nav.home': 'Home',
    'nav.about': 'Über die Stiftung',
    'nav.articles': 'Artikel',
    'nav.goals': 'Ziele',
    'nav.questions': 'Fragen'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.articles': 'Artikel',
    'nav.goals': 'Ziele',
    'nav.questions': 'Fragen'
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLocale;
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: keyof typeof translations[typeof defaultLocale]) {
    return translations[lang][key] || translations[defaultLocale][key];
  }
}
