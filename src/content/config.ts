import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Convertimos el esquema en una función que recibe { image }
const blogSchema = ({ image }: { image: any }) => z.object({
  title: z.string(),
  description: z.string().max(160),
  // Usamos coerce para que Astro convierta automáticamente el texto del MDX en objeto Date
  publishDate: z.coerce.date(), 
  updatedDate: z.coerce.date().optional(),
  category: z.enum(['inversiones', 'ia']),
  tags: z.array(z.string()),
  image: image(), // Ahora 'image' sí existe porque viene del argumento de arriba
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
  schema: blogSchema, // Astro ejecutará la función y le pasará el helper 'image'
});

const ia = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/ia" }),
  schema: blogSchema,
});

export const collections = { inversiones, ia };