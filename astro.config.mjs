import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const ASSET_PATH = process.env.BASE_URL || "/";

console.log(
  `----\nASSET_PATH: ${JSON.stringify({
    build: {
      assets: "_assets",
      assetsPrefix: ASSET_PATH,
    },
  })}\n----`
);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    assets: "_assets",
    assetsPrefix: ASSET_PATH,
  },
});
