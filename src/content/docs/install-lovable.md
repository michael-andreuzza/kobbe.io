---
title: Install on Lovable
description: Add the Kobbe tracker to a Lovable-generated web app.
order: 21
category: Installation guides
navLabel: Lovable
brandLogo:
  url: ../../images/brands/lovable.svg
  alt: Lovable logo
---

Export or open your project’s **`index.html`** (or root layout) and inject the tracker in `<head>`. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. In the generated React/Vite tree, edit `index.html` **or** the framework’s root layout where `<head>` is defined.
2. Paste before `</head>`.
3. Deploy via your hosting provider (e.g. Cloudflare, Vercel).

If Lovable only exposes an “Analytics snippet” field in hosting settings, paste the same HTML there.

## Verify

Open production URL; confirm Kobbe.

## Next steps

- [Hash page paths](/docs/hash-page-paths) for client routers
- [Custom events](/docs/custom-events)
