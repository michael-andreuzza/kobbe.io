---
title: Raycast extension
description: Connect Kobbe to Raycast with a read-only API token.
order: 15
category: Get started
navLabel: Raycast
---

Use the Kobbe Raycast extension if you want to check analytics from Raycast without opening the dashboard.

This is optional. You do not need Raycast to use Kobbe, install the tracker, or view your dashboard.

## What it can show

The extension can:

- Search your Kobbe sites.
- Show overview metrics such as visitors, views, visits, bounce rate, and session time.
- List top pages for a site.
- Open the full Kobbe dashboard when you need more detail.

## Create an API token

- Open profile menu → Agent access (or go to [app.kobbe.io/settings/agent-access](https://app.kobbe.io/settings/agent-access))
- Create a token named `Raycast`
- Enable Read sites and Read analytics scopes only
- Copy the token when shown (shown once)

You do not need management scopes for the Raycast extension.

## Configure Raycast

Open a Kobbe command in Raycast. When Raycast asks for extension preferences, enter:

- **API Token:** the token that starts with `kbpat`
- **Kobbe Base URL:** `https://app.kobbe.io`
- **Default Range:** the range you usually want, such as `Last 7 days`

After saving preferences, start with **Search Sites** to confirm the token works.

## Change the default range

The extension uses the **Default Range** preference for overview and top pages commands.

To change it later, open Raycast settings, go to **Extensions**, search for **Kobbe**, select the main **Kobbe** extension row, and update **Default Range** in the preferences panel.

## Revoke a token

If a token is exposed or a device no longer needs access, open **profile menu → Agent access** and revoke it.

Create a new token when you need to connect Raycast again.

## Related

- [Kobbe CLI](/docs/cli)
- [AI agents](/docs/ai-agents)
- [Dashboard overview](/docs/dashboard-overview)
