import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import { STANDALONE_DOC_REDIRECTS } from "./src/lib/standalone-docs.ts";

// Changelog entries removed on 2026-09-05 that Search Console still has from
// an older sitemap. Point them at the closest surviving page so the 404s
// clear instead of lingering in the coverage report.
const REMOVED_CHANGELOG_REDIRECTS = [
  ["/changelog/public-demo", "/changelog"],
  ["/changelog/hobby-tier", "/changelog/pricing-v4-and-retention"],
];

const redirects = Object.fromEntries(
  [...STANDALONE_DOC_REDIRECTS, ...REMOVED_CHANGELOG_REDIRECTS].map(
    ([source, destination]) => [source, { status: 301, destination }],
  ),
);

export default defineConfig({
  site: "https://kobbe.io",
  build: { format: "file" },
  prefetch: true,
  trailingSlash: "ignore",
  redirects,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      skipInline: false,
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
