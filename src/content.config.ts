import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/docs",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    navLabel: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/legal",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { docs, legal };
