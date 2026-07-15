export type DocsSearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
};

const NAV_GROUP_ORDER = [
  "Get started",
  "Dashboard stats",
  "Installation guides",
  "Tracking",
  "Analyze",
  "Sharing",
  "Revenue attribution",
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

  return items.filter((item) => {
    const haystack = normalize(
      [item.title, item.description, item.category, item.id].join(" "),
    );
    return tokens.every((token) => haystack.includes(token));
  });
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
