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

export function buildSiteSearchItems(docs: CollectionEntry<"docs">[]) {
  const docItems = docs.map((entry) => ({
    id: entry.id,
    title: entry.data.navLabel ?? entry.data.title,
    description: entry.data.description,
    category: entry.data.category ?? "Docs",
    href: getDocHref(entry),
    logo: entry.data.brandLogo
      ? {
          src: entry.data.brandLogo.url.src,
          alt: entry.data.brandLogo.alt,
        }
      : undefined,
  }));

  return [...SITE_MARKETING_ITEMS, ...docItems];
}
