---
title: Install on Next.js
description: Add the Kobbe tracker to a Next.js App Router or Pages Router site.
order: 3
category: Installation guides
navLabel: Next.js
brandLogo:
  url: ../../images/brands/nextjs.svg
  alt: Next.js logo
---

Use the site token from Kobbe ([Add the tracker](/docs/add-the-tracker)). Load the script in the **document `<head>`** on every route you want to measure.

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## App Router (recommended)

1. Open `app/layout.tsx` (root layout).
2. Import `Script` from `next/script`.
3. Add a `Script` with your token before `children`, or place the equivalent HTML in your root layout’s `<head>` via the [`metadata` API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) if you prefer a single head source.

Example using `next/script`:

```tsx
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="kobbe-tracker"
          strategy="afterInteractive"
          src="https://app.kobbe.io/tracker.js"
          data-token="YOUR_SITE_TOKEN"
        />
        {children}
      </body>
    </html>
  );
}
```

Use `afterInteractive` so the script runs after hydration; `data-token` maps to the same attribute as the HTML snippet.

## Pages Router

Add the tracker snippet to `pages/_document.tsx` inside `<Head>` from `next/document`, or add a `Script` in `pages/_app.tsx` with `strategy="afterInteractive"` as above.

## SPAs and client navigations

Next.js client-side transitions still fire the initial pageview per full load. If some routes use hash-based URLs only, see [Hash page paths](/docs/hash-page-paths).

## Verify

Deploy or run locally, open a page, then confirm the visit in your Kobbe dashboard.

## Next steps

- [Script options](/docs/script-options) — custom collect URL, hash tracking, etc.
- [Track across subdomains](/docs/track-subdomains)
- [Custom events](/docs/custom-events)
