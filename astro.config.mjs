import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Domínio de produção — alimenta canonical, og:url e o sitemap.
  site: "https://runnas.dev",
  integrations: [tailwind(), icon(), sitemap()],
});
