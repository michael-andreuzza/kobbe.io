---
title: Your site token, right where you install it
date: 2026-09-06
description: Creating a site now lands you on the install script with your token already filled in, and Kobbe checks before you close without copying it.
image: /images/changelog/site-token-install.webp
imageAlt: Installation settings showing the install script with the site token filled in, and a confirmation asking whether the token was copied before closing.
---

Before, creating a site dropped you on an empty dashboard and the token showed up in a separate banner that was easy to miss. Some of you closed it without copying and had to rotate a token you had held for about two seconds.

Now, creating a site takes you straight to **Installation → Scripts**. The install script already contains your token, so there is nothing to paste together: copy the snippet, drop it in your `<head>`, done. Rotating a token works the same way, with the new value swapped into the script.

If you try to close Settings before copying, Kobbe asks first. Tokens are still shown once and stored only as hashes, so this is the moment to grab it.
