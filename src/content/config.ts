import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		phase: z.string(),
		step: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		locale: z.string(), 
		tags: z.array(z.string()).optional(),
		links: z.array(z.string()).optional()
	}),
});

export const collections = { articles };
