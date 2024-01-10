import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const ASSET_PATH = import.meta.env.ASSET_PATH || "/";

console.log(`----\nASSET_PATH: ${ASSET_PATH}\n${JSON.stringify(import.meta.env)}\n----`);
console.log(`${JSON.stringify(process.env)}`);
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    assetsPrefix: ASSET_PATH,
  },
});
