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
  integrations: [react(), search()],
  vite: {
    plugins: [tailwindcss()],
  },
});
