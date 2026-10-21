/** Old /docs addresses of pages that moved to their own collections. */
export const STANDALONE_DOC_REDIRECTS = [
  ["/docs/legal-terms", "/legal/terms"],
  ["/docs/legal-privacy", "/legal/privacy"],
  ["/docs/legal-gdpr-compliance", "/legal/gdpr-compliance"],
  ["/docs/legal-dpa", "/legal/dpa"],
  ["/docs/support-contact", "/support/contact"],
  ["/docs/support-charges", "/support/charges"],
  ["/docs/support-faq", "/support/faq"],
  ["/docs/insights", "/docs/dashboard-overview"],
  ["/contact", "/support/contact"],
] as const satisfies ReadonlyArray<readonly [string, string]>;
