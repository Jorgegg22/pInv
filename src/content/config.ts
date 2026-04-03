import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  category: z.enum(['inversiones', 'ia']),
  tags: z.array(z.string()),
  image: z.string(),
  readingTime: z.number(),
  author: z.string().default('Carlos Mendoza'),
  draft: z.boolean().default(false),
  schema: z.object({
    "@type": z.string(),
    mainEntity: z.array(z.any()).optional()
  }).optional(),
});

const inversiones = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/inversiones" }),
  schema: blogSchema,
});

const ia = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/ia" }),
  schema: blogSchema,
});

export const collections = { inversiones, ia };
