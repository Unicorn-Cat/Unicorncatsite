import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const BASE_URL = import.meta.env.BASE_URL || "/";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    assetsPrefix: BASE_URL,
  },
});
