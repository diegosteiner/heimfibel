import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { locales } from "./i18n";

const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: z.object({
    nr: z.number(),
    title: z.string(),
    phase: z.string(),
    step: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    locale: z.enum(Object.keys(locales) as [keyof typeof locales]),
    tags: z.array(z.string()).optional(),
    links: z.array(z.number()).optional(),
  }),
});

export const collections = { articles };
