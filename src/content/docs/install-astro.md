---
title: Install on Astro
description: Add the Kobbe tracker to an Astro site (static or SSR).
order: 5
category: Installation guides
navLabel: Astro
brandLogo:
  url: ../../images/brands/astro.svg
  alt: Astro logo
---

Add the tracker once in your **base layout** so all pages include it. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Layout (recommended)

In `src/layouts/Layout.astro` (or your root layout), include the script in `<head>`:

```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
    <script
      defer
      data-token="YOUR_SITE_TOKEN"
      src="https://app.kobbe.io/tracker.js"></script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

For `client:load` islands only, prefer the layout head so prerendered HTML still contains the script.

## Verify

Build or `astro dev`, open a page, confirm traffic in Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Hash page paths](/docs/hash-page-paths) for view transitions
- [Custom events](/docs/custom-events)
