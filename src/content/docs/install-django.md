---
title: Install on Django
description: Add the Kobbe tracker to Django base templates for site-wide privacy-friendly analytics.
order: 8
category: Installation guides
navLabel: Django
brandLogo:
  url: ../../images/brands/django.svg
  alt: Django logo
---

Put the tracker in your **base template** (`templates/base.html` or equivalent). Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="{{ KOBBE_SITE_TOKEN }}"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Add `KOBBE_SITE_TOKEN` to your settings (from environment / secrets manager).
2. Expose it in template context (e.g. context processor) so `{{ KOBBE_SITE_TOKEN }}` resolves, or hardcode the env read in the template if your project permits.

Example context processor (pattern only — adapt to your app):

```python
def kobbe(request):
    return {"KOBBE_SITE_TOKEN": settings.KOBBE_SITE_TOKEN}
```

## Verify

Run the dev server, load a page, confirm hits in Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Custom events](/docs/custom-events)
