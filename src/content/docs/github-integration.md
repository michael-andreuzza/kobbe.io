---
title: GitHub integration
description: Connect a repository to show commit markers on your site analytics charts.
order: 15
category: Analyze
navLabel: GitHub
---

Connect one GitHub repository per Kobbe site to sync **commit metadata** (not source code). Commits appear as markers on the main traffic chart, in the same time buckets as your pageviews and revenue. Open a marker to browse commits, filter by message, and follow links to GitHub.

## What you get

- **Chart markers** on buckets that include at least one commit.
- **Tooltip**: traffic metric for the bucket plus a short preview of the latest commit message.
- **Modal**: full list for that bucket with branch, author, time, line additions/deletions when available, and links to GitHub.

## Permissions and privacy

The Kobbe GitHub App should request **read-only access to repository metadata and contents** enough to list commits (GitHub’s “Contents: Read-only” style scope). Kobbe stores normalized fields such as SHA, message, author name, branch, timestamps, and optional stats — **not** file contents or repository tarball.

Webhook deliveries are verified with `X-Hub-Signature-256` using your configured secret.

## Setup overview

1. **Create a GitHub App** (or use the hosted Kobbe app when available) with:
   - **Webhook** URL pointing to your Worker, e.g. `https://app.kobbe.io/api/webhooks/github`
   - **Webhook secret** — same value as `GITHUB_WEBHOOK_SECRET` in your deployment
   - **Permissions**: repository contents read (for commit history), **Metadata** read, and subscribe to **Installation** and **Push** (or equivalent) events so installs and new commits stay in sync.
2. Generate a **private key** (PKCS#8 PEM works well with the app’s JWT signer). Note the **App ID** and **slug** (for the user-facing install URL).
3. In your Cloudflare Worker / local `.dev.vars`, set:
   - `GITHUB_APP_ID`
   - `GITHUB_APP_SLUG` — short name used in `https://github.com/apps/<slug>/installations/new`
   - `GITHUB_PRIVATE_KEY` — PEM; you may pass newlines as `\n` in env if needed
   - `GITHUB_WEBHOOK_SECRET` — shared with the GitHub App webhook configuration
4. In **Kobbe → Website settings → GitHub**, install the app for your org/user, then **choose the repository** and sync (or rely on webhooks after the first sync).

If these variables are missing, the install flow stays disabled and the app won’t call GitHub’s API.

## Using it in the dashboard

Pick a date range as usual. When commits fall in a chart bucket, you’ll see a **ring marker** on the line. **Hover** for metrics + latest commit preview; **click** the marker to open the commits modal. Use the filter box to narrow by message prefix (e.g. `feat:`), branch name, or author.

Use **Sync now** on the GitHub settings page if webhooks were down or you changed the default branch.

## One repo per site

Each Kobbe site links to **at most one** repository at a time. Disconnecting removes stored commit rows for that link (scoped by site).

## Troubleshooting

- **No markers**: confirm the repo is connected, range includes commits, and a sync completed; push events should upsert new SHAs.
- **Install loop or 403**: verify installation completed and the App ID / private key match the app you installed.
- **Webhook 401/invalid signature**: `GITHUB_WEBHOOK_SECRET` must match GitHub’s webhook settings exactly (timing-safe verification rejects bad signatures).
