import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const BASE_URL = import.meta.env.BASE_URL || "/";

console.log(`----\nBASE_URL: ${BASE_URL}\n----`);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    assetsPrefix: BASE_URL,
  },
});
