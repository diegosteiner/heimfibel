import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import search from "./src/integrations/search";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  server: { host: true },
  prefetch: true,
  build: {
    format: "file",
  },
  integrations: [react(), tailwindcss(), search()],
});
