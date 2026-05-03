---
title: Install on React Router
description: Add the Kobbe tracker to a React Router (v7 / Remix-style) app.
order: 4
category: Installation guides
navLabel: React Router
---

Emit the tracker on **every document shell** so first paint and hard navigations both count. Use the token from [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## SPA (framework mode)

1. Open your root HTML template (for example `index.html` or the shell your framework generates).
2. Paste the snippet in `<head>` before `</head>`.

React Router client navigations send a new document only on hard refresh; the tracker records the initial pageview. If you rely on **client-side** route changes without full reloads, follow any framework guidance for “route change analytics” or trigger custom page views with [Custom events](/docs/custom-events) if Kobbe exposes an API you wire manually — otherwise full reloads and first-visit flows are tracked automatically for standard setups.

## Full-stack / SSR

If you render HTML on the server (e.g. `root.tsx` layout with `<html>`), inject the same `<script>` in the server-rendered head so every response includes it.

## Verify

Load the app, visit a route, and check the Kobbe dashboard.

## Next steps

- [Script options](/docs/script-options)
- [Hash page paths](/docs/hash-page-paths)
- [Custom events](/docs/custom-events)
