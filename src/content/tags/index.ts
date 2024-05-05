import { getArticles } from "../articles";
import { type Locale, locales } from "../../i18n";
import kebabCase from "lodash/kebabCase";

export async function getTags2() {
  const localeTags = Object.fromEntries(Object.keys(locales).map((locale) => [locale, new Set<string>()]));
  const articles = await getArticles({});
  articles.forEach((article) => article.data.tags?.forEach((tag) => localeTags[article.data.locale].add(tag)));

  return Object.fromEntries(
    Object.entries(localeTags).flatMap(([locale, tags]) => {
      return Array.from(tags).map((tag) => {
        const id = kebabCase(tag.toLowerCase());
        return [
          id,
          {
            id,
            color: "#3377FF",
            label: tag,
            locale,
            slug: encodeURIComponent(id),
          },
        ];
      });
    })
  );
}

export type Tag = {
  id: string;
  color?: string;
  label: string;
  locale: keyof Locale;
  slug: string;
};
