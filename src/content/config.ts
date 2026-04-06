import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = ({ image }: { image: any }) => z.object({
  title: z.string(),
  description: z.string().max(160),
  publishDate: z.coerce.date(), 
  updatedDate: z.coerce.date().optional(),
  category: z.enum(['inversiones', 'ia', 'negocio']),
  tags: z.array(z.string()),
  image: image(),
  readingTime: z.number(),
  author: z.string().default('Carlos Mendoza'),
  draft: z.boolean().default(false),
  schema: z.object({
    "@type": z.string(),
    mainEntity: z.array(z.any()).optional()
  }).optional(),
});

export const collections = {
  negoc: defineCollection({
    loader: glob({ pattern: "*.mdx", base: "./src/content/negoc" }),
    schema: blogSchema,
  }),
  inversiones: defineCollection({
    loader: glob({ pattern: "*.mdx", base: "./src/content/inversiones" }),
    schema: blogSchema,
  }),
  ia: defineCollection({
    loader: glob({ pattern: "*.mdx", base: "./src/content/ia" }),
    schema: blogSchema,
  }),
};