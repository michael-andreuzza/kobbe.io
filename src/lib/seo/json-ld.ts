const SITE_NAME = "Kobbe";
const LOGO_PATH = "/images/favicons/android-chrome-512x512.png";

function toTitleCase(input: string): string {
  const safe = input.replace(/[/_-]+/g, " ").trim();

  if (!safe) return SITE_NAME;

  return safe
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ");
}

export type BuildSiteJsonLdOptions = {
  site: string;
  pathname: string;
  title: string;
  description: string;
  extraGraphNodes?: Record<string, unknown>[];
};

export function buildSiteJsonLdGraph({
  site,
  pathname,
  title,
  description,
  extraGraphNodes = [],
}: BuildSiteJsonLdOptions): Record<string, unknown> {
  const normalizedPathname =
    pathname === "/"
      ? "/"
      : pathname
          .replace(/\/index\.html$/, "/")
          .replace(/\.html$/, "")
          .replace(/\/$/, "");
  const pageUrl = new URL(normalizedPathname, site).toString();
  const pathSegments = normalizedPathname.split("/").filter(Boolean);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: SITE_NAME,
      url: site,
      logo: {
        "@type": "ImageObject",
        url: new URL(LOGO_PATH, site).toString(),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: site,
      name: SITE_NAME,
      description,
      publisher: { "@id": `${site}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { "@id": `${site}/#website` },
      about: { "@id": `${site}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        ...pathSegments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: toTitleCase(segment),
          item: new URL(
            `/${pathSegments.slice(0, index + 1).join("/")}`,
            site,
          ).toString(),
        })),
      ],
    },
  ];

  if (normalizedPathname === "/") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${site}/#software`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: site,
      description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${site}/#organization` },
    });
  }

  graph.push(...extraGraphNodes);

  return { "@context": "https://schema.org", "@graph": graph };
}
