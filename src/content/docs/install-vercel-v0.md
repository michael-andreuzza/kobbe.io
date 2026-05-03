---
title: Install on Vercel v0
description: Add the Kobbe tracker to a Vercel v0 generated Next.js app.
order: 23
category: Installation guides
navLabel: Vercel v0
---

v0 outputs Next.js most of the time — use the **root layout** pattern. Token: [Add the tracker](/docs/add-the-tracker).

## Quick path

Follow [Next.js](/docs/install-nextjs): add `next/script` (or raw `<script>` in `<head>`) in `app/layout.tsx`.

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Deploy

Push to GitHub, connect **Vercel**, and configure env if you read the token from `process.env.NEXT_PUBLIC_KOBBE_TOKEN` instead of hardcoding (recommended).

## Verify

Open the Vercel preview URL; confirm Kobbe.

## Next steps

- [Next.js](/docs/install-nextjs)
- [Script options](/docs/script-options)
