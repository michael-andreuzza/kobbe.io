---
title: Privacy Policy
description: How Kobbe handles analytics data and visitor privacy.
order: 81
category: Legal
navLabel: Privacy
---

Kobbe is operated by **Michael Alexander Web Agency, trading as Kobbe**. Privacy and account questions can be sent to [support@kobbe.io](mailto:support@kobbe.io).

Kobbe is built to minimize data collection while still providing useful website analytics. This policy explains what the hosted Kobbe service collects, how it is used, and how we handle visitor and account data.

## Default analytics tracking

In its default analytics configuration, Kobbe is designed not to use or store:

- Analytics cookies
- Persistent browser-side visitor identifiers
- Raw IP addresses in the application database
- Raw user agent strings in the application database
- Personal visitor profiles or persistent cross-day visitor identifiers
- Browser fingerprinting techniques such as canvas, WebGL, font enumeration, or installed plugin detection

To count same-day unique visitors and compute session metrics, the server derives a daily-rotating pseudonymous hash from request metadata and a daily secret. The hash is not reversible, is not shared across days, and is not used to build a persistent visitor profile.

Optional features may use limited browser storage only when configured by the site owner. For example, a visitor opt-out may store an opt-out flag in `localStorage`, and cross-domain handoff may use `sessionStorage` when that feature is enabled.

## Analytics information we process

When you visit a site that uses Kobbe, the hosted service may process privacy-minimized analytics data such as:

- Page path, with query strings and fragments removed by default
- Referrer origin or host, not the full referrer URL
- Timestamp of the event
- Browser, operating system, and device category derived from the request user agent
- Country or coarse location derived at the edge from the incoming connection
- Pageviews, custom events, scroll visibility events, performance samples, and opted-in revenue attribution metadata configured by the site owner
- Customer-defined custom event properties that pass server-side validation

Some of this data may be considered personal data under privacy laws depending on the context, configuration, and jurisdiction. Kobbe is designed to reduce and avoid direct visitor identifiers, not to collect everything possible.

## Account, billing, and integration information

If you create or use a Kobbe account, we may process information needed to operate the product, such as:

- Account email address, login method, workspace membership, and authentication records
- Site, workspace, dashboard, team, invite, and share-link settings
- Subscription, checkout, billing, and payment-related records handled through our billing provider
- Support, legal, or account communications you send to us
- Connection metadata, tokens, and report data for optional integrations you enable, such as Google Search Console

## How we use information

We use information to:

- Provide dashboards, reports, shared links, funnels, revenue attribution, and other analytics features
- Count visits, sessions, and events in a privacy-minimized way
- Filter bot, spam, and abusive traffic
- Secure, maintain, debug, and improve the service
- Manage accounts, subscriptions, support, and legal obligations

## Sharing and disclosure

We do not sell analytics data. Analytics data is visible to the site owner, authorized workspace members, project dashboard users, and anyone the site owner gives access to through public or shared dashboard links.

We use service providers, also called sub-processors, to operate Kobbe. These are listed in our [Data Processing Addendum](/docs/legal-dpa). We may also disclose information if required by law or to protect the service, customers, visitors, or others.

## Data storage and retention

Analytics data is stored and processed by Kobbe to provide the dashboard, reports, and shared dashboard links. Analytics event history is retained for as long as the customer keeps the relevant site, workspace, or account active, unless deleted earlier by the customer, required by law, or otherwise agreed.

Account, billing, subscription, integration, support, security, and operational records may be kept for as long as needed to provide the service, comply with legal obligations, resolve disputes, enforce agreements, and operate the product.

## Your rights and customer responsibilities

If you are a visitor to a site that uses Kobbe, the site owner is usually the controller responsible for its use of Kobbe and its privacy notice. Contact the site owner first if you have questions about how that site uses analytics.

The default Kobbe tracker does not use analytics cookies or persistent visitor identifiers. Whether a site needs consent or a banner depends on the site owner's configuration, jurisdiction, legal basis, and other tools used on the site.

If you are a Kobbe account user, you can contact us about access, correction, deletion, or other privacy requests related to your account.

## Changes

We may update this policy from time to time. The most recent revision date will be noted at the top of this page.

## Data processing addendum (organizations)

If you need a processor agreement (GDPR-style DPA) for the **hosted** Kobbe service, see the [Data Processing Addendum](/docs/legal-dpa). It is part of our [Terms of Service](/docs/legal-terms); **using the hosted service** accepts the current DPA, and you can **download a PDF copy** from that page for your files. Organizations should have **their own counsel** review if required for their procurement or jurisdiction.

## Contact

Questions about this Privacy Policy can be sent to [privacy@kobbe.io](mailto:privacy@kobbe.io).
