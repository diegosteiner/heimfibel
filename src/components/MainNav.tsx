import { getTranslations, type Locale, locales } from "../utils/i18n";

type Props = {
  locale: Locale;
  /** Paths of the current page in other languages, keyed by locale. */
  alternates?: Partial<Record<Locale, string>>;
};

const itemClass =
  "rounded-handdrawn border-amber-200 hover:border-rust-600 hover:bg-amber-200 hover:text-rust-600 border-4 font-bold border-solid p-3 m-6 block";

export function MainNav({ locale, alternates = {} }: Props) {
  const t = getTranslations(locale);

  return (
    <nav className="text-xl">
      <ul>
        <li>
          <a className={itemClass} href={`/${locale}/goals`}>
            {t("nav.goals")}
          </a>
        </li>
        <li>
          <a className={itemClass} href={`/${locale}/articles`}>
            {t("nav.articles")}
          </a>
        </li>
        <li>
          <a className={itemClass} href={`/${locale}/questions`}>
            {t("nav.questions")}
          </a>
        </li>
        <li>
          <a className={itemClass} href={`/${locale}/about`}>
            {t("nav.about")}
          </a>
        </li>
        <li>
          <a className={itemClass} href="https://forms.office.com/e/W8YRJ5TaAQ">
            {t("nav.feedback")}
          </a>
        </li>
      </ul>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 m-6 text-base" aria-label={t("nav.language")}>
        {(Object.keys(locales) as Locale[]).map((lang) => {
          const path = alternates[lang];
          const isCurrent = lang === locale;
          return (
            <li key={lang}>
              {path ? (
                <a
                  href={path}
                  hrefLang={lang}
                  lang={lang}
                  aria-current={isCurrent ? "page" : undefined}
                  className={isCurrent ? "font-bold underline" : "hover:underline"}
                >
                  {locales[lang]}
                </a>
              ) : (
                <span lang={lang} className="opacity-50">
                  {locales[lang]}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
