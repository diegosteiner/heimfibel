import type { CollectionEntry } from "astro:content";
import { defaultLocale, type Locale, locales } from "./i18n";

export type Article = CollectionEntry<"articles">;

/** Project phases, in the order they are shown on the overview page. */
export const phases = ["Konzeptionsphase", "Planungsphase", "Betriebsphase"] as const;
export type Phase = (typeof phases)[number];

type ArticleFilter = {
  tag?: string;
  locale?: Locale;
  published?: boolean;
};

export function getArticleFilter(filter: ArticleFilter) {
  return (article: Article) => {
    if (filter.locale && getArticleLocale(article) !== filter.locale) return false;
    if (filter.tag && !article.data.tags?.includes(filter.tag)) return false;
    if (filter.published && !article.data.pubDate) return false;

    return true;
  };
}

/** The locale is the first path segment of the entry id (`de/heizsysteme` -> `de`). */
export function getArticleLocale(article: Article): Locale {
  const [locale] = article.id.split("/");
  return locale in locales ? (locale as Locale) : defaultLocale;
}

/** The key is the file name without locale folder; all translations of an article share it. */
export function getArticleKey(article: Article): string {
  return article.id.split("/").slice(1).join("/");
}

/** The URL slug: an explicit `slug` from the frontmatter, else the file name. */
export function getArticleSlug(article: Article): string {
  return article.data.slug ?? getArticleKey(article);
}

export function getArticlePath(article: Article): string {
  return `/${getArticleLocale(article)}/articles/${getArticleSlug(article)}`;
}

/** Paths of all translations of this article (including itself), keyed by locale. */
export function getArticleAlternates(article: Article, all: Article[]): Partial<Record<Locale, string>> {
  const key = getArticleKey(article);
  return Object.fromEntries(
    all.filter((a) => getArticleKey(a) === key).map((a) => [getArticleLocale(a), getArticlePath(a)]),
  );
}
