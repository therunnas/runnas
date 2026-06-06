# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`packageManager: pnpm@11.5.1`). Dev server runs on port **4321**.

```bash
pnpm dev        # local dev server (astro dev)
pnpm build      # runs `astro check` then `astro build` -> static output in dist/
pnpm preview    # serve the built dist/
pnpm format     # prettier --write . (includes prettier-plugin-astro)
pnpm astro check  # type-check .astro/.ts (this is the only "test" gate; build fails on type errors)
```

There is no test runner, linter, or CI config. `astro check` is the sole quality gate and is wired into `build`. A Nix flake (`flake.nix` + `.envrc`/direnv) provides the dev shell.

## Architecture

Static personal site (Astro 4, output to `dist/`). **No UI framework** — the site is authored entirely in `.astro` + vanilla JS, no `.tsx`/`.jsx` components. Icons come from [astro-icon](https://github.com/natemoo-re/astro-icon) (`<Icon name="set:name" />`), which renders inline SVGs at build with zero client JS. Icon sets are Iconify packages: `@iconify-json/simple-icons` (language/brand logos) and `@iconify-json/feather` (GitHub). To add an icon, reference `set:name` — verify the name exists in the installed set first (icons are not resolved by guessing).

### Two content systems, both auto-discovery via `import.meta.glob`

This is the core pattern to understand — content is added by **dropping files**, not by editing registries:

1. **Essays/blog** — drop a `.md` file in `src/pages/essays/`. [src/pages/index.astro](src/pages/index.astro) globs `./essays/*.md` (`eager: true`) and lists them sorted by `date` desc. Each essay's frontmatter must set `layout: ../../layouts/EssayLayout.astro`, `title`, `date` (`YYYY-MM-DD`), optional `description`. `import.meta.glob` is used deliberately instead of `Astro.glob` because the latter throws when the folder is empty.
2. **Music player** — drop an audio file (`.mp3/.wav/.ogg/.m4a`) in `src/music/`. [src/components/MusicPlayer.astro](src/components/MusicPlayer.astro) globs them with `query: "?url"`; the display title is derived from the filename (`-`/`_` → spaces). With zero files the player renders nothing. See [src/music/README.md](src/music/README.md). The player logic is an `is:inline` vanilla-JS IIFE with track data injected via `define:vars` — no framework, no hydration. It handles play/pause/prev/next/seek/volume, persists volume in `localStorage` (`runnas-vol`), and works around autoplay blocking by starting on first user interaction.

The **`projects`** array, by contrast, is hardcoded in the frontmatter of [src/pages/index.astro](src/pages/index.astro) — edit it there to change the projects carousel.

### Layouts & styling

- [src/layouts/Layout.astro](src/layouts/Layout.astro) is the HTML shell (head, Fira Code from Google Fonts, imports global `src/style.css`). `EssayLayout.astro` wraps it and adds `.essay-prose` typography for markdown.
- Design is intentionally **brutalist**: monospace everywhere (`* { font-family: "Fira Code" !important }`), black-on-white, hard borders, dotted background. Reusable visual primitives are global CSS classes in [src/style.css](src/style.css): `.box-shadow` (offset hard shadow), `.text-highlight` (inverted inline highlight), `.intro-about-grid`. Tailwind is otherwise used inline; `tailwind.config.cjs` has an empty theme (no custom tokens).

### Pages

Only two routes: `/` ([src/pages/index.astro](src/pages/index.astro), the entire single-page site) and `/essays/<slug>` (rendered markdown).

## Deploy

Hospedado na **Vercel**, deploy automático a partir da branch `main`.

- Framework preset **Astro** (auto-detectado pela Vercel). Build: `pnpm build`; output dir: `dist/`.
- Saída **estática** — sem adapter, não precisa de `@astrojs/vercel`.
- Push na `main` → deploy de produção; pushes em outras branches/PRs → preview deploys.
- Sem variáveis de ambiente no momento.
- O domínio de produção precisa bater com `site` em `astro.config.mjs` (de onde saem canonical, `og:url` e o sitemap). Trocar de domínio = atualizar `site` **e** a linha `Sitemap:` em `public/robots.txt`.

## Rules for Claude

- Sempre rode `pnpm astro check` antes de concluir qualquer tarefa.
- Não adicione um framework de UI (React/Vue/etc.) sem confirmar — o site é `.astro` + JS vanilla por opção; ícones via `astro-icon`.
- Copy do site permanece em **pt-BR**.
- Commits seguem **Conventional Commits**, com mensagens em **pt-BR** (ex.: `feat: adiciona seção de deploy`).

## Gotchas

- **`@astrojs/sitemap` is pinned to `3.2.1`** on purpose. Versions `>= 3.6` read routes from the `astro:routes:resolved` hook, which only exists in **Astro 5** — on this Astro 4 project they fail the build with `Cannot read properties of undefined (reading 'reduce')`. Do not bump sitemap (or run a blanket `pnpm update`) until Astro itself is upgraded to 5.
- SEO lives in [src/components/SEO.astro](src/components/SEO.astro), rendered inside `<head>` by `Layout.astro` so every page is covered. It builds absolute canonical/OG/Twitter URLs from `Astro.site` (the `site` value in `astro.config.mjs`, currently `https://runnas.dev` — update if the domain changes). `EssayLayout` passes `type="article"`; the default OG image is `/me.webp`.
- Content and UI copy are in **Brazilian Portuguese** (`lang="pt-BR"`); keep new copy consistent.
- Music files must be your own or royalty-free/CC (see music README) — they ship in the public build.
