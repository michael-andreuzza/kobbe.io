import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/docs",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      order: z.number(),
      category: z.string().optional(),
      navLabel: z.string().optional(),
      brandLogo: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
    }),
});

const changelog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/changelog",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
  }),
});

export const collections = { docs, changelog };
