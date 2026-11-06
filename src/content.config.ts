import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { phases } from "./utils/articles";
import { locales } from "./utils/i18n";

// Articles live in `src/content/articles/<locale>/<key>.md`.
// Translations of the same article share the file name (the key); the German
// file name doubles as the German URL slug. Other locales set `slug` for a
// localized URL.
const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
    // Keep the id as `<locale>/<file>`; by default the glob loader would use the
    // `slug` frontmatter field as the id, which collides across locales.
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    nr: z.number(),
    title: z.string(),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase ASCII words separated by single dashes")
      .optional(),
    phases: z.array(z.enum(phases)),
    step: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    locale: z.enum(Object.keys(locales) as [keyof typeof locales]),
    tags: z.array(z.string()).optional(),
    // links: z.array(reference("articles")).optional(),
    links: z.array(z.number()).optional(),
  }),
});

export const collections = { articles };
