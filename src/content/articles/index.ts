import { getCollection, type CollectionEntry } from "astro:content";
import { type Locale } from "../../i18n";

export type Article = CollectionEntry<"article">;

type ArticleFilter = {
  tag?: string;
  locale?: Locale;
  published?: boolean;
};

export async function getArticles(filter?: ArticleFilter) {
  let articles = (await getCollection("articles")) as Article[];

  if (filter?.locale) articles = articles.filter((article) => article.data.locale == filter.locale);
  if (filter?.tag) articles = articles.filter((article) => article.data.tags?.includes(filter.tag as string));
  if (filter?.published) articles = articles.filter((article) => article.data.pubDate);

  return articles.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
}
