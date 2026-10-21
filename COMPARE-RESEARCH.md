# Comparison research

All facts checked on 2026-10-21 from each company's own pages. Re-check before publishing and on every `lastChecked` update.

**Rule: no pricing on comparison pages.** No prices, free plans, trials, or plan tiers. Compare features, privacy, and data only.

## At a glance

| | Kobbe | Plausible | Fathom | Umami Cloud | DataFast | Google Analytics 4 |
| --- | --- | --- | --- | --- | --- | --- |
| Retention | 3 years | 3 years minimum | Forever while subscribed | 2 years (Pro) | 3 years | 14 months max (event-level) |
| Cookies | No | No | No | No | Yes by default, optional cookieless script | Yes (`_ga`, 2 years) |
| Consent banner needed | Usually no | No (their claim) | No (their claim) | No (their claim) | Maybe, depends on setup | Google requires consent where legally required |
| Bot filtering | 7 checks incl. datacenter, automation, 2,300+ spam referrers | UA, referrer spam, ~40,800 datacenter ranges, patterns | UA, datacenter IPs, missing UA; manual referrer firewall | UA (isbot); IP filters on Pro+ | No automatic filtering documented | Known bots excluded, can't see how many |
| Revenue attribution | Yes, 10 native integrations | Business plan, manual events, no native integrations | Manual event values, no native integrations | Manual event properties, no native integrations | Yes, core feature, 7 native integrations | Manual ecommerce events |
| Funnels | Yes | Business plan | Not found | Yes | Yes | Yes (exploration) |
| Core Web Vitals | Yes | Not found | Not found | Yes | Not found | Not built in |
| Search Console | Yes | Yes | Yes | Not found (open PR) | Yes | Yes |
| MCP server | Yes, read and write | Community-built, not official | Not found | Yes, read-only, Pro+ | Yes | Yes, experimental, read-only |
| CLI | Yes | Not found | Not found | Not maintained | Yes | No |
| Self-hosting | No | Yes, AGPLv3 (fewer features) | Old Lite only (MIT) | Yes, MIT | No | No |
| Data location | Cloudflare network | EU (Hetzner, Germany) | EU processing, anonymized data stored in US | US or EU, your choice | Mostly outside the EU incl. US | Google data centers, EU collection servers |
| Script size (stated) | ~2.6 KB gzipped, 4.8 KB full (measured, minified) | 2.5 KB | ~2 KB | <2 KB | Not stated (~5.3 KB gzipped, measured) | Not stated |
| Imports | Plausible, Fathom, Umami, DataFast | GA4, CSV | GA4 only | Self-hosted Umami, CSV (Pro+) | Plausible | CSV/SFTP data import |

## Where competitors win (say this honestly on each page)

- **Plausible**: open source and self-hostable, EU-hosted on Hetzner, smaller script, running since 2018, 21k paying subscribers.
- **Fathom**: data kept forever while subscribed, EU isolation, running since 2018.
- **Umami**: MIT open source and self-hostable, region choice, session replays and heatmaps.
- **DataFast**: deep revenue focus (MRR, LTV, churn), Meta Ads ROAS, React Native SDK.
- **Google Analytics**: Google Ads and Search integration, huge scale.

## Where Kobbe is weaker or equal (don't overclaim)

- Script is ~2.6 KB gzipped (4.8 KB full): on par with Plausible, slightly larger than Fathom and Umami. Don't call Kobbe the lightest.
- No self-hosting.
- Umami, DataFast, and Google also have MCP servers. Kobbe's angle: read and write tools (create goals and funnels) on every plan, not just "has MCP".

## Sources

### Plausible
- Pricing (homepage widget, /pricing is 404): https://plausible.io/
- No free plan: https://plausible.io/contact
- Trial, plans, billing unit: https://plausible.io/docs/subscription-plans
- Sites per plan: https://plausible.io/docs/agencies-and-freelancers
- Retention: https://plausible.io/vs-cloudflare-web-analytics
- Cookies: https://plausible.io/data-policy
- Bot filtering: https://plausible.io/docs/bot-traffic-filtering
- Revenue: https://plausible.io/docs/ecommerce-revenue-tracking
- Funnels: https://plausible.io/docs/funnel-analysis
- Search Console: https://plausible.io/docs/google-search-console-integration
- API: https://plausible.io/docs/stats-api
- MCP (community): https://plausible.io/docs/data-access
- Self-hosting: https://github.com/plausible/analytics, https://plausible.io/self-hosted-web-analytics
- Hosting: https://plausible.io/eu-hosted-web-analytics
- Script size: https://plausible.io/lightweight-web-analytics
- Imports: https://plausible.io/docs/google-analytics-import, https://plausible.io/docs/csv-import

### Fathom
- Pricing, trial, sites, plans: https://usefathom.com/pricing
- Retention, cookies: https://usefathom.com/
- Bot filtering: https://usefathom.com/docs/features/bot-detection
- Revenue: https://usefathom.com/docs/events/ecommerce-conversions
- Search Console, hosting: https://usefathom.com/features
- Data location: https://usefathom.com/features/data-isolation
- Script size: https://usefathom.com/why-fathom-analytics/cookieless-analytics
- Imports: https://usefathom.com/docs/features/ga-importer

### Umami
- Pricing, plans, cookies: https://umami.is/pricing
- Trial, billing unit, hosting: https://docs.umami.is/docs/cloud/faq
- Bot filtering: https://docs.umami.is/docs/environment-variables, https://docs.umami.is/docs/cloud/ip-filters
- Revenue: https://docs.umami.is/docs/revenue
- Funnels: https://docs.umami.is/docs/funnel
- Web Vitals: https://docs.umami.is/docs/performance
- API: https://docs.umami.is/docs/api
- MCP: https://docs.umami.is/docs/mcp
- Self-hosting, script size: https://umami.is/compare/google-analytics
- Imports: https://docs.umami.is/docs/cloud/import-data

### DataFast
- Pricing, trial, sites, retention, API: https://datafa.st
- Billing unit: https://datafa.st/tos
- Cookies: https://datafa.st, https://datafa.st/docs/gdpr-cookieless-tracking
- Bots: https://datafa.st/docs/excluding-analytics
- Revenue, MCP: https://datafa.st/llms.txt
- Funnels: https://datafa.st/docs/conversion-funnels.md
- Search Console: https://datafa.st/docs/google-search-console.md
- CLI: https://datafa.st/docs/cli-introduction
- Data location: https://datafa.st/dpa
- Imports: https://datafa.st/docs/import-from-plausible

### Google Analytics 4
- Free: https://marketingplatform.google.com/about/analytics/
- Retention: https://support.google.com/analytics/answer/7667196
- Cookies: https://business.safety.google/adscookies/
- Consent: https://support.google.com/analytics/answer/6004245, https://support.google.com/analytics/answer/9976101
- Bots: https://support.google.com/analytics/answer/9888366
- Thresholds and sampling: https://support.google.com/analytics/answer/9383630, https://support.google.com/analytics/answer/13331292
- Ecommerce: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
- Funnels: https://support.google.com/analytics/answer/9327974
- Web Vitals: https://github.com/GoogleChrome/web-vitals
- Search Console: https://support.google.com/analytics/answer/10737381
- MCP: https://developers.google.com/analytics/devguides/MCP
- Data location: https://support.google.com/analytics/answer/12017362

### PostHog (checked 2026-10-21)
- Cookies (`localStorage+cookie` default, 365 days): https://posthog.com/docs/libraries/js/persistence
- Retention (1 year free, 7 years paid): https://posthog.com/docs/data/events-retention
- Revenue (Stripe only, via data warehouse; dashboard removed): https://posthog.com/docs/revenue-analytics/payment-platforms, https://posthog.com/docs/revenue-analytics
- Web Vitals: https://posthog.com/docs/health-checks/web-vitals
- Search Console (data warehouse source): https://posthog.com/docs/cdp/sources/google-search-console
- MCP (read and write), CLI: https://posthog.com/docs/model-context-protocol
- Hosting (US or EU, Frankfurt): https://posthog.com/docs/privacy/data-storage

### Simple Analytics (checked 2026-10-21)
- Cookies, EU hosting: https://www.simpleanalytics.com/pricing, https://docs.simpleanalytics.com/data-security-and-ownership
- Funnels: https://www.simpleanalytics.com/features
- Script size: https://docs.simpleanalytics.com/light
- Open source (scripts only): https://docs.simpleanalytics.com/script
- MCP: none official (only third-party wrappers such as Pipedream, Cogny). No revenue, Web Vitals, Search Console or CLI in docs or feature list.

### Matomo (checked 2026-10-21)
- Cookies (default `_pk_id` 13 months, can disable): https://matomo.org/faq/general/faq_146/, https://matomo.org/faq/general/faq_157/
- Retention, funnels, Search Engine Keywords Performance, Cloud in Europe: https://matomo.org/pricing/, https://matomo.org/faq/general/configure-data-retention/
- MCP (official, read only unless raw API enabled): https://plugins.matomo.org/McpServer, https://matomo.org/blog/2026/05/matomo-mcp-ai-now-available/

### Cloudflare Web Analytics (checked 2026-10-21)
- No cookies, 6 months access, sampling after 7 days, no custom events or UTM: https://developers.cloudflare.com/web-analytics/faq/
