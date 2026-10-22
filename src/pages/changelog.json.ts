/**
 * The latest changelog entries as JSON, read by the app's "What's new" card.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { changelogSlug } from "@/lib/changelog";

export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection("changelog"))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 5)
    .map((entry) => {
      const slug = changelogSlug(entry.id);
      return {
        slug,
        title: entry.data.title,
        description: entry.data.description,
        date: entry.data.date.toISOString().slice(0, 10),
        url: new URL(`/changelog/${slug}`, site).toString(),
      };
    });

  return new Response(JSON.stringify({ entries }), {
    headers: { "content-type": "application/json" },
  });
};
