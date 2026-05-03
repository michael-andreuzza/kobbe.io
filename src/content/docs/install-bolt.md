---
title: Install on Bolt
description: Add the Kobbe tracker to a Bolt.new / StackBlitz-style exported project.
order: 36
category: Installation guides
navLabel: Bolt
---

After export, inject the script in the **root HTML shell** or framework root layout. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Locate `index.html` or `app/layout.tsx` / `main.tsx` pattern for your stack.
2. Put the script in `<head>` (recommended) for the deployed artifact.
3. Re-deploy.

## Verify

Visit the hosted preview or production URL; check Kobbe.

## Next steps

- Framework-specific: [Next.js](/docs/install-nextjs), [Vue](/docs/install-vue), [Astro](/docs/install-astro)
- [Custom events](/docs/custom-events)
