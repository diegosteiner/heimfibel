import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import search from "./src/integrations/search";

// https://astro.build/config
export default defineConfig({
  server: { host: true },
  prefetch: true,
  build: {
    format: "file",
  },
  i18n: {
    defaultLocale: "de",
    locales: ["de", "fr", "it"],
    routing: {
      // German keeps its /de/ prefix so existing links stay valid.
      prefixDefaultLocale: true,
      // The root redirect is handled by src/pages/index.md.
      redirectToDefaultLocale: false,
    },
  },
  integrations: [react(), search()],
  vite: {
    plugins: [tailwindcss()],
  },
});
