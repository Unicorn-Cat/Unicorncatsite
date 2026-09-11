import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const ASSET_PATH = process.env.BASE_URL || "/";

// https://astro.build/config
export default defineConfig({
  site: "https://unicorncatconsulting.com",
  integrations: [tailwind()],
  build: {
    assets: "_assets",
    assetsPrefix: "/",
  },
});
