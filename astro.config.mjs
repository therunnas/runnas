import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    // react-icons@4 usa "directory imports" que o Node ESM não resolve no SSR;
    // empacotar evita o erro de resolução durante o build estático.
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
