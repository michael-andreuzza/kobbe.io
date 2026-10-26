---
title: Sale pings
description: Get a Slack or Discord message for every new sale, with the source and pages from the visit that led to it.
order: 37.6
category: Revenue attribution
navLabel: Sale pings
---

Sale pings post a short message to a Slack or Discord channel each time a new paid sale arrives from your payment provider. They need [revenue attribution](/docs/revenue-attribution) connected for the site.

A ping looks like this:

```text
💰 New sale on kobbe.io: $49 for Kobbe Pro
Source: google.com
Landing page: /features
Last page before checkout: /pricing
View revenue in Kobbe
```

## What a ping includes

- The amount, currency, and product name from your provider.
- The source: the `utm_source` of the visit, or the referring site, or **Direct**.
- The landing page and the last page before checkout, when they differ.
- A link to the site's Revenue page in Kobbe.

When a sale has no matching visit, the ping says so instead of showing a source. Pings never include the buyer's name, email, or any other personal data.

## Get a webhook URL

### Discord

1. Open the channel's settings: **Edit Channel → Integrations → Webhooks**.
2. Click **New Webhook**, pick the channel, and optionally rename it.
3. Click **Copy Webhook URL**.

### Slack

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps) and choose your workspace.
2. Open **Incoming Webhooks** and turn it on.
3. Click **Add New Webhook to Workspace**, pick the channel, and allow it.
4. Copy the webhook URL.

## Connect it in Kobbe

1. Open **Site settings → Reports & alerts**.
2. Paste the URL into the **Sale pings** card.
3. Click **Send test** to check the channel, then **Save**.

Only Slack and Discord webhook URLs are accepted. After saving, the URL is shown masked. Click **Remove** to stop pings.

## Limits

- One ping per order, even if your provider sends the webhook more than once.
- Refunds and zero amount orders don't send a ping.
- Up to 30 pings per site per hour. Sales beyond that still count in Kobbe.
- Pings pause after 5 failed deliveries in a row, for example when the webhook was deleted. Save the URL again to resume.

## Availability

Sale pings are available on paid plans, per site.
