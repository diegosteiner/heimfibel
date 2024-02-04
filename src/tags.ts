import { getArticles } from "./articles";
import { type Locale, defaultLocale } from "./i18n"

export const tags: Tag[] = [
  {
    "slug": "test",
    "color": "#3377FF",
    "label_i18n": {
      "de": "Test",
      "fr": "TEste"
    }
  }
]


export async function getTags(locale: Locale) {
const articles = await getArticles({ locale })
const tags = Array.from(new Set(articles.flatMap(article => article.data.tags || [])))
return tags.map(tag => ({
    slug: tag.toLowerCase().replace(/\W/g, ''),
    color: "#3377FF",
    label_i18n: {
      de: tag,
      fr: tag
  }
}))
}

export type Tag = {
  slug: string;
  color: string;
  label_i18n: { [key in Locale]: string }
}

export function getTag(id: string) {
  return tags.find(tag => tag.slug == id)
}


export function getTagLabel(tag: Tag, locale: Locale) {
  tag.label_i18n[locale] ?? tag.label_i18n[defaultLocale] ?? tag.slug
}
