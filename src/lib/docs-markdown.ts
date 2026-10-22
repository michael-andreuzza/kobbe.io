import type { CollectionEntry } from "astro:content";

/** A doc as standalone Markdown: title, description, then the body. */
export function docMarkdown(entry: CollectionEntry<"docs">): string {
  const { title, description } = entry.data;
  return `# ${title}\n\n${description}\n\n${(entry.body ?? "").trim()}\n`;
}

/** URL of the plain Markdown version served by `docs/[slug].md.ts`. */
export function docMarkdownHref(entry: CollectionEntry<"docs">): string {
  return `/docs/${entry.id}.md`;
}
