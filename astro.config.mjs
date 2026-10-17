import { defineConfig } from "astro/config";

// BASE_URL is set by CI: the production domain on main, a /pull/N/ subpath on PR previews.
const ASSET_PATH = process.env.BASE_URL || "/";

// https://astro.build/config
export default defineConfig({
  site: "https://unicorncatconsulting.com",
  build: {
    assets: "_assets",
    assetsPrefix: ASSET_PATH,
  },
  redirects: {
    "/about-us": "/about",
    "/resources": "/blog",
  },
});
