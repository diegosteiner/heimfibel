import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "./i18n";

export type Article = CollectionEntry<"articles">;

type ArticleFilter = {
  tag?: string;
  locale?: Locale;
  published?: boolean;
};

export function getArticleFilter(filter: ArticleFilter) {
  return (article: Article) => {
    if (filter.locale && article.data.locale !== filter.locale) return false;
    if (filter.tag && !article.data.tags?.includes(filter.tag)) return false;
    if (filter.published && !article.data.pubDate) return false;

    return true;
  };
}
