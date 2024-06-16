import { useTranslations, type Locale } from "../i18n";

export function MainNav({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);

  return (
    <nav className="text-2xl">
      <ul>
        <li>
          <a
            className="rounded-handdrawn border-transparent hover:border-gold-500 border-4 font-bold border-solid p-3 m-3 block"
            href={`/${locale}/goals`}
          >
            {t("nav.goals")}
          </a>
        </li>
        <li>
          <a
            className="rounded-handdrawn border-transparent hover:border-gold-500 border-4 font-bold border-solid p-3 m-3 block"
            href={`/${locale}/articles/`}
          >
            {t("nav.articles")}
          </a>
        </li>
        <li>
          <a
            className="rounded-handdrawn border-transparent hover:border-gold-500 border-4 font-bold border-solid p-3 m-3 block"
            href={`/${locale}/questions`}
          >
            {t("nav.questions")}
          </a>
        </li>
        <li>
          <a
            className="rounded-handdrawn border-transparent hover:border-gold-500 border-4 font-bold border-solid p-3 m-3 block"
            href={`/${locale}/about`}
          >
            {t("nav.about")}
          </a>
        </li>
        <li>
          <a
            className="rounded-handdrawn border-transparent hover:border-gold-500 border-4 font-bold border-solid p-3 m-3 block"
            href="https://forms.office.com/e/W8YRJ5TaAQ"
          >
            {t("nav.feedback")}
          </a>
        </li>
      </ul>
    </nav>
  );
}
