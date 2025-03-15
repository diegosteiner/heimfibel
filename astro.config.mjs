import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import search from "./src/integrations/search";

// https://astro.build/config
export default defineConfig({
  server: { host: true },
  prefetch: true,
  build: {
    format: "file",
  },
  integrations: [react(), tailwind(), search()],
});
