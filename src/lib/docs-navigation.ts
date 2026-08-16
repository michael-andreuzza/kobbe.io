import type { CollectionEntry } from "astro:content";

const ALPHABETICAL_NAV_CATEGORIES = new Set([
  "Installation guides",
  "Revenue attribution",
]);

const NAV_HUB_HREF_BY_CATEGORY: Partial<Record<string, string>> = {
  "Installation guides": "/docs/installation-guides",
  "Revenue attribution": "/docs/revenue-attribution",
};

export function docsNavLabel(item: CollectionEntry<"docs">): string {
  if (item.id === "import-analytics-data") return "Import";
  if (item.id === "data-export") return "Export";
  return item.data.navLabel ?? item.data.title;
}

export function docsNavLogo(
  item: CollectionEntry<"docs">,
): { src: string; alt: string } | undefined {
  const logo = item.data.brandLogo;
  if (!logo) return undefined;

  return {
    src: logo.url.src,
    alt: logo.alt,
  };
}

export type DocsNavLink = {
  href: string;
  label: string;
  category: string;
  isActive: boolean;
  logo?: {
    src: string;
    alt: string;
  };
};

export function buildDocsNavLinks(
  items: CollectionEntry<"docs">[],
  currentPath: string,
): DocsNavLink[] {
  return items.map((item) => ({
    href: item.id === "overview" ? "/docs" : `/docs/${item.id}`,
    label: docsNavLabel(item),
    category: item.data.category ?? "Docs",
    isActive:
      currentPath ===
      (item.id === "overview" ? "/docs" : `/docs/${item.id}`).replace(
        /\/$/,
        "",
      ),
    logo: docsNavLogo(item),
  }));
}

function sortGuideGroupItems(category: string, items: DocsNavLink[]) {
  const hubHref = NAV_HUB_HREF_BY_CATEGORY[category];
  const hubItems = hubHref ? items.filter((item) => item.href === hubHref) : [];
  const rest = hubHref
    ? items.filter((item) => item.href !== hubHref)
    : items;

  rest.sort((a, b) => a.label.localeCompare(b.label));

  return [...hubItems, ...rest];
}

export function groupDocsNavLinks(links: DocsNavLink[]) {
  const groups = links.reduce(
    (acc, item) => {
      const existing = acc.find((group) => group.category === item.category);
      if (existing) {
        existing.items.push(item);
        return acc;
      }
      acc.push({ category: item.category, items: [item] });
      return acc;
    },
    [] as { category: string; items: DocsNavLink[] }[],
  );

  for (const group of groups) {
    if (ALPHABETICAL_NAV_CATEGORIES.has(group.category)) {
      group.items = sortGuideGroupItems(group.category, group.items);
    }
  }

  return groups;
}
