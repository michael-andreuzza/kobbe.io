---
title: Smarter bot filtering
date: 2026-08-28
description: Bot filtering now layers user-agent, verified-bot, datacenter network, and behavioral checks to keep scrapers out of your stats.
image: /images/changelog/bot-filtering.webp
imageAlt: Bot filtering breakdown in the Sources card, showing filtered hits by reason such as user-agent, datacenter network, and behavioral signals.
---

Bot filtering now works in layers: user-agent checks, verified-bot detection at the edge, datacenter network (ASN) checks, and behavioral signals. Traffic spikes from scrapers and headless browsers that slipped past user-agent checks alone are now caught and kept out of your stats, on every plan. How it works in [Bot filtering](/docs/bot-filtering).
