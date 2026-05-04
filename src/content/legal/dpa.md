---
title: Data Processing Addendum
description: DPA for Kobbe-hosted analytics — part of our Terms; online acceptance plus optional PDF for your records.
updatedAt: 2026-05-04
footerLabel: DPA
---

This Data Processing Addendum (**DPA**) is between **Michael Alexandert Web Agency, trading as Kobbe** (**Company**) and the customer using the hosted Kobbe analytics service (**Customer**). Company’s business address is **Riåkervägen 2, Sviby, Åland Islands, Finland**.

## 1. Roles

For personal data processed through the Service:

- Customer acts as the controller, or processor where Customer processes personal data on behalf of another controller.
- Company acts as the processor, or sub-processor where Customer is itself a processor.
- Each party will comply with applicable data protection laws, including the GDPR where applicable.

## 2. Subject matter

The Service provides privacy-focused web analytics for websites and applications configured by Customer.

Company processes analytics events submitted to the Service in order to provide dashboards, metrics, reporting, and related operational features to Customer.

## 3. Duration

Company processes personal data for as long as Customer uses the Service, unless deleted earlier by Customer, deleted through retention controls, or otherwise required by applicable law.

## 4. Categories of data subjects

The Service may process data relating to:

- Visitors to websites or applications configured by Customer.
- Customer account users and administrators.

## 5. Categories of personal data

For website visitors, the Service is designed to minimize personal data and may process:

- Pageview and custom event names.
- URL path, with query strings and fragments removed by default.
- Referrer origin or host, rather than full referrer URLs.
- Timestamp of the event.
- Country and coarse location or device information derived at the edge.
- Browser, operating system, and device category derived from the request user agent.
- A daily-rotating anonymous fingerprint used for short-lived session and visitor counting.
- Customer-defined custom event properties that pass server-side validation.

The Service is designed **not** to store:

- Raw IP addresses in the application database.
- Raw user agent strings in the application database.
- Cookies for analytics tracking.
- Browser `localStorage` or `sessionStorage` identifiers **for analytics tracking or profiling** in the default configuration.
- Persistent cross-day visitor identifiers.

**Operational exceptions (not persistent “profiles”):** In the default tracker configuration, the Service does not use cookies for analytics. Optional product features may use limited browser storage when Customer **explicitly enables** them and discloses them appropriately, for example: visitor **opt-out** may persist a flag in `localStorage`; **cross-domain handoff** may use `sessionStorage` only after it is turned on in the tracker configuration. These are not used to build a persistent cross-session visitor profile in the default setup.

Customer must not send sensitive personal data or direct identifiers to the Service, including names, email addresses, phone numbers, account IDs, payment information, passwords, authentication tokens, health data, or similar information.

## 6. Processing instructions

Company will process personal data only:

- To provide, secure, maintain, and improve the Service.
- In accordance with Customer’s documented instructions.
- As required by applicable law, in which case Company will notify Customer unless prohibited by law.

Customer is responsible for ensuring that its use of the Service has an appropriate legal basis and that required notices are provided to data subjects.

## 7. Confidentiality

Company will ensure that personnel authorized to process personal data are bound by confidentiality obligations or are subject to an appropriate statutory obligation of confidentiality.

## 8. Security measures

Company will maintain appropriate technical and organizational measures designed to protect personal data, including:

- Token-based authentication for analytics ingestion.
- Site-scoped analytics storage.
- No raw IP address storage in the application database.
- No persistent browser-side visitor identifier for analytics tracking in the default configuration.
- Server-side validation and minimization of custom event properties.
- Path and referrer sanitization before storage.
- Data retention controls for deleting old analytics events.
- Access controls for administrative areas of the Service.

## 9. Sub-processors

Customer authorizes Company to use sub-processors necessary to provide the Service.

Current sub-processors:

| Sub-processor | Purpose | Location / transfer notes |
| --- | --- | --- |
| Cloudflare, Inc. | Hosting, Cloudflare Workers, D1 database, edge infrastructure, security, and request processing | See Cloudflare’s applicable data processing terms and transfer safeguards |
| Polar | Subscription checkout, billing, and payment-related account operations | See Polar’s applicable terms and data processing documentation |
| Google | Google sign-in / authentication for customer account users who choose that method | See Google’s applicable data processing terms and transfer safeguards |

Company will make information about sub-processors available to Customer and will provide notice of material changes where required by applicable law or contract.

## 10. International transfers

Where personal data is transferred outside the European Economic Area, United Kingdom, or Switzerland, Company will rely on appropriate transfer mechanisms, such as Standard Contractual Clauses, adequacy decisions, or other lawful safeguards.

Customer acknowledges that Cloudflare may process data through global infrastructure according to Cloudflare’s own data processing terms and transfer safeguards.

## 11. Assistance

Taking into account the nature of processing, Company will provide reasonable assistance to Customer for:

- Responding to data subject requests.
- Security and data protection impact assessments.
- Consultation with supervisory authorities where required.
- Demonstrating compliance with this DPA.

## 12. Deletion and return

Customer may delete analytics data by using Service controls, including site deletion or statistics reset features where available.

Company may also delete analytics events according to configured retention periods. The default retention period for analytics event rows is **180 days**, unless Customer configures or agrees to another period. Account, billing, subscription, and operational records may be retained for as long as needed to provide the Service, comply with legal obligations, resolve disputes, and enforce agreements.

Upon termination of the Service, Company will delete or return personal data in accordance with the agreement, unless retention is required by applicable law.

## 13. Personal data breach

Company will notify Customer without undue delay after becoming aware of a personal data breach affecting Customer personal data.

The notice will include information reasonably available to Company, including:

- The nature of the breach.
- The categories and approximate volume of affected data, where known.
- Likely consequences, where known.
- Measures taken or proposed to address the breach.

## 14. Audits

Company will make available information reasonably necessary to demonstrate compliance with this DPA.

Audits must be conducted during normal business hours, with reasonable prior notice, and in a manner that does not compromise the security, confidentiality, or availability of the Service or other customers’ data.

## 15. Customer responsibilities

Customer is responsible for:

- Configuring the Service correctly.
- Avoiding transmission of personal data in custom event names, properties, URL paths, or referrers.
- Providing appropriate privacy notices to visitors.
- Selecting an appropriate legal basis for analytics processing.
- Configuring retention periods suitable for Customer’s use case.
- Honoring data subject rights requests where applicable.

## 16. Governing law

This DPA is governed by the laws of **Finland**, including applicable law of the **Åland Islands** where relevant, unless mandatory applicable law requires otherwise.

## 17. Contact

For privacy or data protection questions regarding this DPA or the hosted Service:

[privacy@kobbe.io](mailto:privacy@kobbe.io)

For support or legal notice questions:

[support@kobbe.io](mailto:support@kobbe.io)

## 18. Incorporation, acceptance, and signatory warranty

- **Part of the Terms.** This DPA is an **addendum** to Kobbe’s [Terms of Service](/legal/terms) and, together with those Terms, governs processing of visitor and account data for **vendor-hosted** Kobbe (the Service at [app.kobbe.io](https://app.kobbe.io)).

- **Online acceptance.** Customer’s **use of the hosted Service** after the date this DPA is published—including maintaining an account or subscription there—**constitutes Customer’s acceptance** of this DPA as then posted at kobbe.io/legal/dpa, **unless** Customer and Kobbe have a **separate written agreement** that expressly governs processing instead. **No wet or electronic signature is required** for that online acceptance, to the extent permitted by applicable law.

- **Optional PDF.** The fields and “Download PDF” (print) control on this page are for Customer’s **records and procurement** only. Generating a PDF does not replace the Terms or change how online acceptance applies.

- **Signatory warranty.** If an individual enters organization details on this page or represents Customer in procurement, they warrant that: (a) they have authority to bind Customer to this DPA; (b) they have read and understand it; and (c) they agree to it on behalf of Customer.
