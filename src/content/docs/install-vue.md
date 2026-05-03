---
title: Install on Vue.js
description: Add the Kobbe tracker to a Vue 3 (Vite) or Vue CLI app.
order: 20
category: Installation guides
navLabel: Vue.js
---

Prefer **`index.html`** so the script loads with the shell. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Vite (recommended)

Edit the root `index.html` and paste the snippet before `</head>`.

## Vue CLI / webpack

Same idea: put the snippet in `public/index.html` `<head>`, not only inside a single-route component.

## Client-only alternative

You can inject from `main.ts` by appending a `<script>` element, but `index.html` is simpler and loads as early as `defer` allows.

## Verify

Run the dev server, open the app, check Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Hash page paths](/docs/hash-page-paths) for Vue Router hash routes
- [Custom events](/docs/custom-events)
