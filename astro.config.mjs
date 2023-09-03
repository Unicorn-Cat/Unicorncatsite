import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sanity({
    projectId: '6o5c8g4q',
    dataset: 'production',
    useCdn: true,
  })]
});