---
title: GDPR and privacy-friendly analytics
description: How Kobbe is designed to support GDPR-conscious website analytics with data minimization, cookieless tracking, and processor terms.
order: 83
category: Legal
navLabel: GDPR
---

Kobbe is built to help teams understand website traffic without collecting more visitor data than the product needs.

This page explains the privacy and GDPR-oriented design choices behind the hosted Kobbe analytics service. It is product information, not legal advice. Your own GDPR obligations depend on your organization, audience, jurisdiction, site configuration, and the other tools you use.

## Kobbe's role

When you use Kobbe on your website, you are usually the controller for your site visitors' personal data. You decide whether to use analytics, what sites to track, what events to send, and what privacy notices or consent flows are required.

For the hosted analytics service at [app.kobbe.io](https://app.kobbe.io), Kobbe generally acts as a processor for analytics data submitted on your behalf. Our [Data Processing Addendum](/docs/legal-dpa) describes that processor relationship and is incorporated into our [Terms of Service](/docs/legal-terms).

## Data minimization by default

The default Kobbe tracker is designed around minimization:

- No analytics cookies.
- No persistent browser-side visitor identifiers.
- No raw IP addresses stored in the application database.
- No raw user agent strings stored in the application database.
- No personal visitor profiles or cross-site visitor profiles.
- No browser fingerprinting techniques such as canvas, WebGL, font enumeration, or installed plugin detection.

To count same-day unique visitors and sessions, Kobbe derives a daily-rotating pseudonymous identifier from minimized request metadata and a daily secret. The identifier is scoped to the site, changes each day, is not reversible, and is not used to build a long-term visitor profile.

## What analytics data may be processed

Depending on your configuration, the hosted service may process privacy-minimized analytics information such as:

- Page path, with query strings and fragments removed by default.
- Referrer origin or host, not the full referrer URL.
- Timestamp of the event.
- Browser, operating system, and device category derived from the request user agent.
- Country or coarse location derived at the edge from the incoming connection.
- Pageviews, custom events, scroll visibility events, performance samples, and opted-in revenue attribution metadata configured by the site owner.
- Customer-defined custom event properties that pass server-side validation.

Some of this information may still be considered personal data under privacy laws depending on context. Kobbe's goal is to reduce direct identifiers and avoid behavioral profiling, not to remove every possible compliance obligation from your website.

## Cookies, storage, and consent

Kobbe's default analytics tracking does not use analytics cookies or browser storage to count visits.

Optional features can change that privacy posture. For example, visitor opt-out uses `localStorage` to remember a do-not-send preference, cross-domain tracking may use `sessionStorage` for allowlisted domains, and revenue attribution may use a tab-scoped attribution value before server-side hashing.

Whether you need consent, a cookie banner, or additional privacy notice language depends on your jurisdiction, audience, legal basis, and enabled features. Review [Privacy and cookieless tracking](/docs/privacy-and-cookieless-tracking) before enabling optional tracking features.

## Customer responsibilities

Kobbe is designed to support privacy-conscious analytics, but your implementation still matters. You should:

- Describe your use of analytics in your privacy notice.
- Choose a lawful basis where required.
- Decide whether consent is needed for your country, region, audience, and configuration.
- Avoid sending personal data in URLs, custom event names, event properties, payment metadata, or other analytics fields.
- Review optional features such as cross-domain tracking and revenue attribution before enabling them.
- Keep your account, team access, and shared dashboard links limited to the people who need them.

## Data processing terms

The [Data Processing Addendum](/docs/legal-dpa) explains the subject matter, roles, categories of data, security measures, sub-processors, breach notification, deletion, and related processing terms for hosted Kobbe analytics.

Customers that need a PDF copy for internal records can use the DPA page to generate one with their organization details.

## Related pages

- [Privacy Policy](/docs/legal-privacy)
- [Data Processing Addendum](/docs/legal-dpa)
- [Terms of Service](/docs/legal-terms)
- [Privacy and cookieless tracking](/docs/privacy-and-cookieless-tracking)
- [Exclude visits](/docs/exclude-visits)
