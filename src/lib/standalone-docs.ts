import type { CollectionEntry } from "astro:content";

export const STANDALONE_DOC_CATEGORIES = ["Legal", "Support"] as const;

export type StandaloneDocCategory = (typeof STANDALONE_DOC_CATEGORIES)[number];
export type StandaloneDocSection = "legal" | "support";

const STANDALONE_DOC_SECTION_BY_CATEGORY: Record<
  StandaloneDocCategory,
  StandaloneDocSection
> = {
  Legal: "legal",
  Support: "support",
};

export function isStandaloneDoc(
  entry: Pick<CollectionEntry<"docs">, "data" | "id">,
) {
  const category = entry.data.category;
  return (
    category !== undefined &&
    STANDALONE_DOC_CATEGORIES.includes(category as StandaloneDocCategory)
  );
}

export function getStandaloneDocSection(
  entry: Pick<CollectionEntry<"docs">, "data" | "id">,
): StandaloneDocSection | null {
  const category = entry.data.category;
  if (
    category === undefined ||
    !STANDALONE_DOC_CATEGORIES.includes(category as StandaloneDocCategory)
  ) {
    return null;
  }

  return STANDALONE_DOC_SECTION_BY_CATEGORY[category as StandaloneDocCategory];
}

export function getStandaloneDocSlug(docId: string) {
  if (docId.startsWith("legal-")) {
    return docId.slice("legal-".length);
  }

  if (docId.startsWith("support-")) {
    return docId.slice("support-".length);
  }

  return null;
}

export function getStandaloneDocHref(
  entry: Pick<CollectionEntry<"docs">, "data" | "id">,
) {
  const section = getStandaloneDocSection(entry);
  const slug = getStandaloneDocSlug(entry.id);

  if (!section || !slug) {
    return null;
  }

  return `/${section}/${slug}`;
}

export function getStandaloneDocId(section: StandaloneDocSection, slug: string) {
  return `${section}-${slug}`;
}

export function filterDocsNavigationItems(
  items: CollectionEntry<"docs">[],
) {
  return items.filter((item) => !isStandaloneDoc(item));
}

export const STANDALONE_DOC_REDIRECTS = [
  ["/docs/legal-terms", "/legal/terms"],
  ["/docs/legal-privacy", "/legal/privacy"],
  ["/docs/legal-gdpr-compliance", "/legal/gdpr-compliance"],
  ["/docs/legal-dpa", "/legal/dpa"],
  ["/docs/support-contact", "/support/contact"],
  ["/docs/support-charges", "/support/charges"],
  ["/docs/support-faq", "/support/faq"],
  ["/contact", "/support/contact"],
] as const satisfies ReadonlyArray<readonly [string, string]>;
