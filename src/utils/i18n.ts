export const locales = {
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "de";

export const translations = {
  de: {
    "nav.about": "Über die Stiftung",
    "nav.articles": "Artikel",
    "nav.goals": "Ziele",
    "nav.questions": "Fragen",
    "nav.feedback": "Feedback",
    "nav.language": "Sprache",
    "home.title": "Übersicht",
    "home.brand_prefix": "Pfadiheim-",
    "home.brand": "Fibel",
    "home.brand_suffix": "",
    "home.tool_by": "Ein Tool der",
    "home.foundation": "Stiftung Pfadiheime Schweiz",
    "home.foundation_url": "https://www.stiftung-pfadiheime.ch/de",
    "home.subtitle": "Der Wissensspeicher für den Bau und den Betrieb von Pfadiheimen",
    "home.intro":
      "Die Fibel ist ein Wissensspeicher rund um die Fragen zum Pfadiheimumbau oder Pfadiheimneubau! Es kann auch für eine Reflektion oder Neuausrichtung bei einem bestehenden Haus verwendet und als Input für neue Themen verwendet werden. Die Artikel hier sind nicht als «fixfertiges Rezept» zu betrachten, sondern als Sammlung von Erfahrungen, Tipps und Tricks. Zu den unterschiedlichsten Themen, welche bei einem Bauprojekt, in der Planung, Umsetzung oder im laufenden Betrieb wichtig sind gibt es Artikel.",
    "search.placeholder": "Suche",
    "phase.Konzeptionsphase": "Konzeptionsphase",
    "phase.Planungsphase": "Planungsphase",
    "phase.Betriebsphase": "Betriebsphase",
  },
  fr: {
    "nav.about": "À propos de la Fondation",
    "nav.articles": "Articles",
    "nav.goals": "Objectifs",
    "nav.questions": "Questions",
    "nav.feedback": "Feedback",
    "nav.language": "Langue",
    "home.title": "Aperçu",
    "home.brand_prefix": "",
    "home.brand": "Fibel",
    "home.brand_suffix": " des maisons scoutes",
    "home.tool_by": "Un outil de la",
    "home.foundation": "Fondation des maisons scoutes de Suisse",
    "home.foundation_url": "https://www.stiftung-pfadiheime.ch/fr",
    "home.subtitle": "La base de connaissances pour la construction et l'exploitation des maisons scoutes",
    "home.intro":
      "La Fibel est une base de connaissances autour des questions liées à la transformation ou à la construction d'une maison scoute! Elle peut aussi servir à réfléchir à une maison existante ou à la réorienter, et donner des idées pour de nouveaux thèmes. Les articles ne sont pas à prendre comme une «recette toute faite», mais comme un recueil d'expériences, de conseils et d'astuces. Ils couvrent les thèmes les plus variés qui comptent dans un projet de construction, lors de la planification, de la réalisation ou de l'exploitation courante.",
    "search.placeholder": "Recherche",
    "phase.Konzeptionsphase": "Phase de conception",
    "phase.Planungsphase": "Phase de planification",
    "phase.Betriebsphase": "Phase d'exploitation",
  },
  it: {
    "nav.about": "La Fondazione",
    "nav.articles": "Articoli",
    "nav.goals": "Obiettivi",
    "nav.questions": "Domande",
    "nav.feedback": "Feedback",
    "nav.language": "Lingua",
    "home.title": "Panoramica",
    "home.brand_prefix": "",
    "home.brand": "Fibel",
    "home.brand_suffix": " delle case scout",
    "home.tool_by": "Uno strumento della",
    "home.foundation": "Fondazione case scout svizzere",
    "home.foundation_url": "https://www.stiftung-pfadiheime.ch/it",
    "home.subtitle": "La raccolta di conoscenze per la costruzione e la gestione delle case scout",
    "home.intro":
      "La Fibel è una raccolta di conoscenze sulle domande legate alla ristrutturazione o alla costruzione di una casa scout! Può servire anche per riflettere su una casa esistente o riorientarla, e come spunto per nuovi temi. Gli articoli non vanno intesi come una «ricetta pronta», ma come una raccolta di esperienze, consigli e trucchi. Trattano i temi più diversi che contano in un progetto edilizio, nella pianificazione, nella realizzazione o nell'esercizio corrente.",
    "search.placeholder": "Cerca",
    "phase.Konzeptionsphase": "Fase di concezione",
    "phase.Planungsphase": "Fase di pianificazione",
    "phase.Betriebsphase": "Fase di esercizio",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)[typeof defaultLocale];

// Every locale must define every key (an empty string is a valid, intentional value).
type _CompleteTranslations = typeof translations extends Record<Locale, Record<TranslationKey, string>> ? true : never;
const _complete: _CompleteTranslations = true;
void _complete;

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Locale;
  return defaultLocale;
}

export function getTranslations(lang: Locale) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations[defaultLocale][key];
  };
}

/** Replace the locale segment of a path: `/de/about` -> `/fr/about`. A trailing `.html` is dropped. */
export function swapLocale(pathname: string, locale: Locale): string {
  const [, first, ...rest] = pathname.replace(/\.html$/, "").split("/");
  if (first in locales) return `/${[locale, ...rest].join("/")}`;
  return `/${locale}${pathname}`;
}
