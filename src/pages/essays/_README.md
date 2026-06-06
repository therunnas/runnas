# Ensaios

Solte um arquivo `.md` nesta pasta e ele aparece automaticamente na home
([`src/pages/index.astro`](../index.astro)), ordenado por `date` (mais recente
primeiro). A rota fica em `/essays/<nome-do-arquivo>`.

> Este arquivo começa com `_` de propósito: o Astro **ignora** arquivos
> prefixados com `_` dentro de `src/pages/`, então ele não vira uma rota nem
> entra na listagem de ensaios. Use o mesmo prefixo pra qualquer rascunho que
> não deva ser publicado.

## Frontmatter esperado

```yaml
---
layout: ../../layouts/EssayLayout.astro
title: Título do ensaio
date: 2026-06-06 # YYYY-MM-DD
description: Resumo curto (opcional, usado na meta tag).
---
```

- **`layout`** é obrigatório — sem ele o ensaio renderiza fora do visual do site.
- **`title`** e **`date`** são usados na listagem da home; `date` precisa ser
  `YYYY-MM-DD` pra ordenar certo.
- O corpo é Markdown normal; a tipografia vem de `.essay-prose`
  ([`EssayLayout.astro`](../../layouts/EssayLayout.astro)).

> O `.gitkeep` mantém a pasta versionada mesmo sem ensaios. A home usa
> `import.meta.glob` (não `Astro.glob`), então uma pasta vazia não quebra o build.
