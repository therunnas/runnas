import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Domínio de produção — alimenta canonical, og:url e o sitemap.
  // ⚠️ PROVISÓRIO: domínio ainda não definido. Antes do launch, troque por
  // ele aqui E na linha `Sitemap:` de public/robots.txt.
  site: "https://runnas.dev",
  integrations: [tailwind(), icon(), sitemap()],
});
