---
title: Track across subdomains
description: Count traffic from www, app, blog, and other subdomains in one Kobbe site.
order: 28
category: Tracking
navLabel: Subdomains
---

Use the **same site token** on every subdomain you want rolled into one site. Each pageview records the hostname so you can split traffic under **Sources → Hostnames**.

## Setup

1. Open the site in Kobbe and copy the install snippet (same `data-token` everywhere).
2. Add the snippet to every subdomain you want tracked, for example `example.com`, `www.example.com`, `app.example.com`, and `blog.example.com`.
3. No extra attributes are required: the tracker sends the current page hostname automatically.

Kobbe does **not** rely on cookies or cross-domain URL parameters for this—same-day visitor logic matches single-host installs.

## Dashboard

Under **Sources**, open the **Hostnames** tab to see distinct visitors per hostname. Older events collected before hostname was stored on each row may appear only in aggregate until new traffic arrives.

## Exclusions

Hostname exclusion rules apply to this value. See [Exclude visits](/docs/exclude-visits).

## Different root domains

Different root domains (for example `example.com` and `other-brand.io`) need explicit opt-in because they require a URL handoff to link the journey. See [Cross-domain tracking](/docs/cross-domain-tracking).

## Related

- [Add the tracker](/docs/add-the-tracker)
- [Script options](/docs/script-options)
- [Cross-domain tracking](/docs/cross-domain-tracking)
