import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const ASSET_PATH = process.env.BASE_URL || "/";

console.log(`----\nASSET_PATH: ${ASSET_PATH}\n${JSON.stringify(import.meta.env)}\n----`);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    assetsPrefix: ASSET_PATH,
  },
});
