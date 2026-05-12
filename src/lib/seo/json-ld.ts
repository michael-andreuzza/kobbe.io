const SITE_NAME = "Kobbe";
const SITE_DESCRIPTION =
  "Privacy-friendly, cookie-free website analytics for teams that want useful traffic, conversion, and revenue insights without invasive tracking.";
const LOGO_PATH = "/images/favicons/android-chrome-512x512.png";
const ACRONYMS: Record<string, string> = {
  ai: "AI",
  api: "API",
  cli: "CLI",
  csp: "CSP",
  dpa: "DPA",
  faq: "FAQ",
  gdpr: "GDPR",
  mcp: "MCP",
  utm: "UTM",
};

function toTitleCase(input: string): string {
  const safe = input.replace(/[/_-]+/g, " ").trim();

  if (!safe) return SITE_NAME;

  return safe
    .split(" ")
    .map((word) =>
      ACRONYMS[word.toLowerCase()] ??
      (word ? word[0].toUpperCase() + word.slice(1) : ""),
    )
    .join(" ");
}

export type JsonLdBreadcrumb = {
  name: string;
  item: string;
};

export type BuildSiteJsonLdOptions = {
  site: string;
  pathname: string;
  title: string;
  description: string;
  breadcrumbs?: JsonLdBreadcrumb[];
  extraGraphNodes?: Record<string, unknown>[];
};

export function buildSiteJsonLdGraph({
  site,
  pathname,
  title,
  description,
  breadcrumbs,
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
  const breadcrumbItems =
    breadcrumbs ??
    pathSegments.map((segment, index) => ({
      name: toTitleCase(segment),
      item: `/${pathSegments.slice(0, index + 1).join("/")}`,
    }));

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
      description: SITE_DESCRIPTION,
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
      breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: new URL("/", site).toString(),
        },
        ...breadcrumbItems.map((breadcrumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: breadcrumb.name,
          item: new URL(breadcrumb.item, site).toString(),
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
        "@type": "AggregateOffer",
        lowPrice: "15",
        highPrice: "470",
        priceCurrency: "USD",
        offerCount: "10",
        url: new URL("/pricing", site).toString(),
      },
      publisher: { "@id": `${site}/#organization` },
    });
  }

  graph.push(...extraGraphNodes);

  return { "@context": "https://schema.org", "@graph": graph };
}
