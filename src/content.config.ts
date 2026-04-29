import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Resolve paths relative to this file — `./src/...` against cwd can miss files in dev.
const docsDir = fileURLToPath(new URL("./content/docs", import.meta.url));
const legalDir = fileURLToPath(new URL("./content/legal", import.meta.url));

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: docsDir,
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
    pattern: "**/*.{md,mdx}",
    base: legalDir,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { docs, legal };
