---
title: Install on Laravel
description: Add the Kobbe tracker to Laravel Blade layouts so every page sends analytics.
order: 7
category: Installation guides
navLabel: Laravel
brandLogo:
  url: ../../images/brands/laravel.svg
  alt: Laravel logo
---

Add the script to a **Blade layout** every response uses (for example `resources/views/layouts/app.blade.php`). Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="{{ config('services.kobbe.token', env('KOBBE_SITE_TOKEN')) }}"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Store your site token in `.env` as `KOBBE_SITE_TOKEN=...` (or use your own config key).
2. Expose it via `config/services.php` if you prefer `config('services.kobbe.token')`.
3. Paste the snippet in the layout `<head>` or just before `</body>`.

Never commit real tokens to git; use env + deployment secrets.

## Verify

Load any page, then check Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Custom events](/docs/custom-events)
