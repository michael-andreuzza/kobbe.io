---
title: Privacy and cookieless tracking
description: How Kobbe tracks visits without cookies, and how optional revenue attribution changes the privacy posture.
order: 11
category: Get started
navLabel: Privacy
---

Kobbe is designed to be privacy-friendly by default. The standard tracker does not use cookies or browser storage **to count pageviews or build visitor profiles**.

## Default tracker

The default Kobbe tracker collects pageviews and custom events without creating long-lived visitor profiles:

- No analytics cookies.
- No `localStorage` or `sessionStorage` used for measurement or profiling in the default setup.
- No raw IP addresses stored in the database.
- No full URLs with query strings.
- No customer emails, names, or account identifiers unless you send them yourself, which you should avoid.
- No browser fingerprinting techniques such as canvas, WebGL, or font enumeration.
- No analytics request is sent when the visitor's browser has Global Privacy Control or Do Not Track enabled.

## Visitor opt-out

Visitors can stop the tracker from sending events by setting `localStorage.kobbe_ignore = "true"` (see [Exclude visits](/docs/exclude-visits)). That flag is a **do-not-send preference**, not an analytics ID: it does not identify a person or join sessions across sites. Mention it in your privacy notice if you document how people can opt out.

To count same-day unique visitors, Kobbe computes a short-lived anonymous hash on the server from request metadata and a daily-rotating secret. The hash is not reversible, is scoped to the site, and is not shared across days as a long-term profile.

## What this means for accuracy

Cookieless analytics are intentionally less invasive than cookie or user-profile based analytics. That also means Kobbe does not try to recognize the same browser across long periods by default.

For normal traffic reporting, this is usually a good tradeoff: you can still see visits, views, pages, sources, locations, devices, events, and funnels without building personal profiles.

For long sales cycles, attribution can be less complete than systems that use long-lived cookies or identified users. That limitation is part of the privacy posture.

## Optional cross-domain tracking

[Cross-domain tracking](/docs/cross-domain-tracking) is off by default. When you enable it for allowlisted hostnames, the tracker may use `sessionStorage` in the current tab to tie same-day navigation across root domains. This is consent-sensitive: disclose it where required and only turn it on when it matches the rules that apply to your country, region, audience, and legal basis.

## Optional revenue attribution

Revenue attribution is off by default. When enabled, it connects an analytics journey to a later payment webhook so Kobbe can show which pages, sources, locations, and devices contributed to revenue.

This changes the privacy posture:

- It uses `sessionStorage` for a tab-scoped attribution ID.
- The raw attribution ID is hashed server-side before storage.
- Kobbe stores payment amount, currency, provider event IDs, and the hashed attribution key.
- Kobbe does not need customer emails or names for attribution.
- Attribution may still be considered personal data depending on your setup and the rules that apply to your country, region, and audience.

Enable revenue attribution only when it fits your privacy notice, consent setup, payment provider configuration, and applicable country or regional rules.

## What to tell your visitors

If you use Kobbe, your privacy policy should describe analytics in plain language. If visitors can opt out with `localStorage.kobbe_ignore`, say so. If you enable cross-domain tracking or revenue attribution, also disclose `sessionStorage` use and that payment events may be connected to analytics activity in a pseudonymous way where applicable.

Avoid sending personal data in custom event names, event properties, URLs, or payment metadata. Kobbe is built for aggregate analytics, not user profiling.

## Related docs

- [Add the tracker](/docs/add-the-tracker)
- [Script options](/docs/script-options)
- [Exclude visits](/docs/exclude-visits)
- [Performance and Web Vitals](/docs/performance-web-vitals)
- [Revenue attribution](/docs/revenue-attribution)
- [Cross-domain tracking](/docs/cross-domain-tracking)
