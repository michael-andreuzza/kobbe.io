import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import cloudflare from "@astrojs/cloudflare"

export default defineConfig({
  site: "https://kobbe.io",
  output: "static",
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
})
