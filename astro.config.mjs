import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import { STANDALONE_DOC_REDIRECTS } from "./src/lib/standalone-docs.ts";

const redirects = Object.fromEntries(
  STANDALONE_DOC_REDIRECTS.map(([source, destination]) => [
    source,
    { status: 301, destination },
  ]),
);

export default defineConfig({
  site: "https://kobbe.io",
  build: { format: "file" },
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
