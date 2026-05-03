---
title: Install on Replit
description: Add the Kobbe tracker to a Replit-hosted web app.
order: 38
category: Installation guides
navLabel: Replit
---

Replit templates vary (static HTML, Express, React/Vite, etc.). Put Kobbe in the **HTML head** your server sends, or in `index.html` for SPA stacks. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Static / multi-page

If you serve `.html` files, paste into each template’s `<head>` or a shared layout partial.

## Node / Express

Inject the snippet into your main layout EJS/Pug template, or concatenate into HTML responses.

## Verify

Open the Replit published URL (or dev URL) and check Kobbe.

## Next steps

- Match your stack: [Next.js](/docs/install-nextjs), [Vue](/docs/install-vue), [Django](/docs/install-django)
- [Custom events](/docs/custom-events)
