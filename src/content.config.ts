import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.enum(['inversiones', 'ia']),
  tags: z.array(z.string()).optional(),
  image: z.string(),
  readingTime: z.number(),
  author: z.string(),
  draft: z.boolean().default(false),
  schema: z.any().optional(),
});

const inversiones = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/inversiones" }),
  schema: baseSchema
});

const ia = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/ia" }),
  schema: baseSchema
});

export const collections = { inversiones, ia };