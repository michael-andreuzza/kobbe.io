---
title: Bot filtering
description: How Kobbe detects and drops bots, scrapers, and headless browsers before they touch your stats.
order: 29
category: Tracking
navLabel: Bot filtering
---

Kobbe checks **every collect request** for bot signals before anything is stored. Filtered hits never appear in your dashboard and never count toward your event quota. This is automatic and always on — there is nothing to configure.

Filtered requests still get a success response, so bots have no signal that they were detected and nothing to adapt to.

## What gets filtered

Kobbe layers several independent checks. A request only counts as a visit when it passes all of them:

| Filter                 | What it catches                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Verified crawler**   | Bots verified by the edge network, such as search engine crawlers.                                                                                                                          |
| **Known bot signature** | Anything that declares itself in its user agent: Googlebot, Bingbot, GPTBot, social preview fetchers, uptime monitors, and hundreds more.                                                  |
| **Automated client**   | HTTP tools and automation frameworks: `curl`, `wget`, `python-requests`, Postman, Selenium, Playwright, Puppeteer, and similar.                                                             |
| **Browser automation** | Real browsers driven by automation. The tracker reports the browser's own `navigator.webdriver` flag, which headless Chrome and testing frameworks set — even when the user agent looks like a normal browser. |
| **Datacenter traffic** | Requests originating from cloud server networks (AWS, Google Cloud, Azure, Alibaba, Hetzner, OVH, and others). People do not browse the web from rented servers; scrapers do.               |
| **Referrer spam**      | Fake referrers designed to show up in your reports. Kobbe checks against the community-maintained [Matomo referrer spam list](https://github.com/matomo-org/referrer-spam-list) of 2,300+ domains, including their subdomains. |
| **Missing user agent** | Requests without any user agent at all, which no real browser sends.                                                                                                                        |

Modern scrapers rarely announce themselves: they run real headless Chrome with a stock user agent, execute JavaScript, and rotate IPs. That is why the **browser automation** and **datacenter** checks exist — they catch bots by where they run and how they behave, not by what they claim to be.

## What is not filtered

Real people are never dropped for how they connect:

- **VPN users** count normally. Consumer VPN networks are deliberately excluded from the datacenter check.
- **iCloud Private Relay** users count normally.
- Legitimate visits with unusual browsers count normally — filtering never relies on the user agent alone being unfamiliar.

## Ghost spam cannot happen

A common spam technique against other analytics tools is firing fake hits directly at the analytics API without ever visiting the site ("ghost spam"). This does not work against Kobbe: every event must carry your site token and go through the tracker's collect pipeline, so there is no way to inject visits from the outside.

## See what was filtered

The **Bots** tab on the dashboard's Sources card shows how many hits were kept out of your stats, their share of all requests, and the filter reason for each.

For privacy, Kobbe stores **no per-request bot data** — only a daily count per filter reason. There is no way to inspect individual filtered requests, by design.

## Related

- Per-site rules you control (path, hostname, country, IP): [Filter your visits](/docs/exclude-visits)
- The Sources card and its tabs: [Sources](/docs/dashboard-stats-sources)
- Keeping event volume down: [Reduce usage](/docs/reduce-usage)
