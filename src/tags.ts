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
