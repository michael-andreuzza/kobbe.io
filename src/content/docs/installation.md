---
title: Installation
description: Deploy Kobbe to your Cloudflare account.
order: 2
---

Kobbe runs on Cloudflare Workers with a D1 database. You need a Cloudflare account and `wrangler` CLI installed.

## 1. Clone the repository

```sh
git clone https://github.com/michael-andreuzza/analytics.git kobbe
cd kobbe
pnpm install
```

## 2. Create a D1 database

```sh
wrangler d1 create analytics
```

Copy the database ID into your `wrangler.toml` under `[[d1_databases]]`.

## 3. Run migrations

```sh
pnpm run db:migrate:local   # local development
pnpm run db:migrate:remote  # production
```

## 4. Deploy

```sh
pnpm run deploy
```

## 5. Add the tracker to your site

Include the tracker script on every page you want to track. Replace `YOUR_KOBBE_URL` with the URL where you deployed Kobbe.

```html
<script
  defer
  data-api="YOUR_KOBBE_URL/api/collect"
  src="YOUR_KOBBE_URL/tracker.js"
></script>
```

That's it — visit your dashboard to see real-time traffic.
