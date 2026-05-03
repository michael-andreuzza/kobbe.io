---
title: Track across subdomains
description: Count traffic from www, app, blog, and other subdomains in one Kobbe site.
order: 28
category: Tracking
navLabel: Subdomains
---

Kobbe rolls **marketing pages, app, and blog** into one site when you use the **same site token** on every host. Each pageview stores the visitor’s page hostname so you can see traffic per subdomain in the dashboard **Hostnames** tab under Sources.

## Setup

1. Open the site in Kobbe and copy the install snippet (same `data-token` everywhere).
2. Add the snippet to every subdomain you want tracked, for example `example.com`, `www.example.com`, `app.example.com`, and `blog.example.com`.
3. No extra attributes are required: the tracker sends the current page hostname automatically.

Unlike some tools, Kobbe does **not** use cookies or cross-domain URL parameters to stitch visitors. Same-day “visitor” counts use the same privacy model as single-host installs (short-lived server-side fingerprint). Subdomains simply share one site and one token.

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
