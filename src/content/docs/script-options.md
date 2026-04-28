---
title: Script options
description: Configure the Kobbe tracker script.
order: 3
---

The tracker script accepts configuration through `data-*` attributes on the `<script>` tag.

## Required

| Attribute | Description |
| --- | --- |
| `data-api` | The full URL to the collect endpoint, e.g. `https://analytics.example.com/api/collect`. |

## Example

```html
<script
  defer
  data-api="https://analytics.example.com/api/collect"
  src="https://analytics.example.com/tracker.js"
></script>
```

## How it works

- The script fires a pageview on load and on SPA navigation (History API).
- No cookies, localStorage, or fingerprinting are used.
- The script is under 1 KB gzipped and loads asynchronously.
