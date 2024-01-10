import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const ASSET_PATH = process.env.BASE_URL || "/";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    assets: "_assets",
    assetsPrefix: ASSET_PATH,
  },
});
