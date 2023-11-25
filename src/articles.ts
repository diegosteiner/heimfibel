import { getCollection } from "astro:content";
import { locales  } from "./i18n";

export async function getArticles({ tag, locale, published = true }: { tag?: string, locale?: keyof typeof locales, published?: boolean }) {
	let articles = await getCollection("articles")

	if(locale) articles = articles.filter(article => article.data.locale == locale)
	if(tag) articles = articles.filter(article => article.data.tags?.includes(tag))
	if(published) articles = articles.filter(article => article.data.pubDate)

	return articles.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf())
}
