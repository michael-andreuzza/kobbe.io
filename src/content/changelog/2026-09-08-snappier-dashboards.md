---
title: Snappier dashboards for everyone
date: 2026-09-08
description: We cut the number of database round trips behind every dashboard load. Pages that took a second or two now render in a couple hundred milliseconds.
---

Every dashboard load was making a chain of database round trips one after another, several of them fetching the same thing twice. We reworked that path: session, workspace, and billing lookups now run as a single pass, and nothing is fetched twice. Switching sites, changing the time range, or applying a comparison now responds in a couple hundred milliseconds instead of a second or more.

We also added timing instrumentation to every dashboard load, so if something ever feels slow again we can see exactly where the time went instead of guessing.
