export type DocsSearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  /** Compact word bag from the page body, so content terms also match. */
  keywords?: string;
  logo?: {
    src: string;
    alt: string;
  };
};

const NAV_GROUP_ORDER = [
  "Site",
  "Get started",
  "Dashboard stats",
  "Installation guides",
  "Tracking",
  "Analyze",
  "Data",
  "Sharing",
  "Revenue attribution",
  "Reports and alerts",
  "Manage",
  "Support",
  "Legal",
  "Docs",
] as const;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function filterDocsSearchItems(
  items: readonly DocsSearchItem[],
  query: string,
) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return [...items];
  }

  return items
    .map((item) => {
      const primary = normalize(
        [item.title, item.description, item.category, item.id].join(" "),
      );
      const title = normalize(item.title);
      const body = normalize(item.keywords ?? "");
      if (!tokens.every((token) => primary.includes(token) || body.includes(token))) {
        return null;
      }
      // Title hits outrank description/category hits, which outrank
      // body-keyword-only hits.
      const score = tokens.every((token) => title.includes(token))
        ? 2
        : tokens.every((token) => primary.includes(token))
          ? 1
          : 0;
      return { item, score };
    })
    .filter((entry) => entry != null)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

export function groupDocsSearchItems(items: readonly DocsSearchItem[]) {
  const groups = new Map<string, DocsSearchItem[]>();

  for (const item of items) {
    const existing = groups.get(item.category);
    if (existing) {
      existing.push(item);
      continue;
    }
    groups.set(item.category, [item]);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => {
      const ai = NAV_GROUP_ORDER.indexOf(
        a as (typeof NAV_GROUP_ORDER)[number],
      );
      const bi = NAV_GROUP_ORDER.indexOf(
        b as (typeof NAV_GROUP_ORDER)[number],
      );
      const ar = ai === -1 ? NAV_GROUP_ORDER.length : ai;
      const br = bi === -1 ? NAV_GROUP_ORDER.length : bi;
      return ar - br || a.localeCompare(b);
    })
    .map(([category, groupItems]) => ({
      category,
      items: groupItems,
    }));
}

export function flattenGroupedDocsSearchItems(
  groups: ReturnType<typeof groupDocsSearchItems>,
) {
  return groups.flatMap((group) => group.items);
}
