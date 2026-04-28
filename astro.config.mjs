import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://kobbe.io",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
})
