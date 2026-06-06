import { defineCollection, z } from "astro:content";

// Vitrine de projetos. Cada projeto é um arquivo YAML em
// src/content/projects/ (sem corpo markdown → data collection).
// `order` controla a posição no carrossel da home (menor = primeiro).
const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    sourceUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
