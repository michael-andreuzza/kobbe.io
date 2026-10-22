import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

import { docMarkdown } from "@/lib/docs-markdown";

export const getStaticPaths = (async () => {
  const docs = await getCollection("docs");
  return docs.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(docMarkdown(props.entry), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
