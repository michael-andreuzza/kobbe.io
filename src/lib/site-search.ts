import type { CollectionEntry } from "astro:content";

import type { DocsSearchItem } from "@/lib/docs-search";
import { getStandaloneDocHref } from "@/lib/standalone-docs";

const SITE_MARKETING_ITEMS: DocsSearchItem[] = [
  {
    id: "home",
    title: "Home",
    description:
      "Privacy-first web analytics with traffic and revenue in one place.",
    category: "Site",
    href: "/",
  },
  {
    id: "features",
    title: "Features",
    description: "See everything Kobbe tracks and how the dashboard is organized.",
    category: "Site",
    href: "/#benefits",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Compare plans, trials, and billing options for Kobbe.",
    category: "Site",
    href: "/#pricing",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Answers to common questions about setup, billing, and privacy.",
    category: "Site",
    href: "/#faq",
  },
  {
    id: "documentation",
    title: "Documentation",
    description: "Guides for setup, tracking, dashboards, and integrations.",
    category: "Site",
    href: "/docs",
  },
  {
    id: "llms-txt",
    title: "llms.txt",
    description: "Machine-readable overview of Kobbe for AI tools and agents.",
    category: "Site",
    href: "/llms.txt",
  },
];

function getDocHref(entry: CollectionEntry<"docs">) {
  if (entry.id === "overview") {
    return "/docs";
  }

  return getStandaloneDocHref(entry) ?? `/docs/${entry.id}`;
}

/** Common words that add no search signal for the keyword bag. */
const KEYWORD_STOPWORDS = new Set([
  "about", "after", "also", "and", "any", "are", "back", "been", "before",
  "but", "can", "click", "does", "each", "every", "example", "for", "from",
  "get", "has", "have", "here", "how", "into", "its", "just", "kobbe", "like",
  "make", "more", "most", "need", "new", "not", "one", "only", "open", "other",
  "our", "out", "over", "page", "pages", "same", "see", "set", "show", "site",
  "some", "than", "that", "the", "their", "them", "then", "there", "these",
  "they", "this", "under", "use", "used", "uses", "using", "want", "what",
  "when", "where", "which", "will", "with", "you", "your",
]);

const KEYWORD_LIMIT = 160;

/**
 * Compact word bag from the doc body: unique lowercase words, stopwords and
 * words already covered by the title/description stripped, capped so the
 * serialized island props stay small.
 */
function buildKeywordBag(body: string | undefined, covered: string) {
  if (!body) return undefined;
  const coveredWords = new Set(covered.toLowerCase().split(/[^a-z0-9]+/));
  const seen = new Set<string>();
  const words: string[] = [];
  for (const word of body.toLowerCase().split(/[^a-z0-9]+/)) {
    if (word.length < 3 || word.length > 24) continue;
    if (seen.has(word) || coveredWords.has(word) || KEYWORD_STOPWORDS.has(word))
      continue;
    seen.add(word);
    words.push(word);
    if (words.length >= KEYWORD_LIMIT) break;
  }
  return words.length > 0 ? words.join(" ") : undefined;
}

export function buildSiteSearchItems(docs: CollectionEntry<"docs">[]) {
  const docItems = docs.map((entry) => {
    const title = entry.data.navLabel ?? entry.data.title;
    const category = entry.data.category ?? "Docs";
    // Provider guides should match "payment" even when the body never says
    // it (e.g. Paddle only talks about "checkout").
    const implicitKeywords =
      category === "Revenue attribution" && entry.data.brandLogo
        ? " payment payments provider"
        : "";
    return {
      id: entry.id,
      title,
      description: entry.data.description,
      category,
      href: getDocHref(entry),
      keywords:
        ((buildKeywordBag(
          entry.body,
          [title, entry.data.title, entry.data.description].join(" "),
        ) ?? "") + implicitKeywords).trim() || undefined,
      logo: entry.data.brandLogo
        ? {
            src: entry.data.brandLogo.url.src,
            alt: entry.data.brandLogo.alt,
          }
        : undefined,
    };
  });

  return [...SITE_MARKETING_ITEMS, ...docItems];
}
