# queiroz.tech

Personal site and blog of Lucas Queiroz, built with Next.js (App Router) + Velite + Tailwind CSS v4.

```bash
bun install
bun run dev     # velite --watch + next dev
bun run build   # velite build + next build
```

## Writing a post

Posts live at `content/posts/{lang}/{category}/{slug}.mdx`. A translation is the file with the
same `category/slug` under the other language. That pairing drives the language switch, `hreflang`
and the "Read in English / Ler em português" link.

```mdx
---
title: "Circuit Breaker: quando parar de tentar?"
description: "Entendendo o padrão de resiliência Circuit Breaker e quando utilizá-lo."
date: "2026-08-05"
tags: ["system design"]
motif: "breaker"          # cover diagram, see lib/motifs.ts
series: "resilience"      # optional, see `series` in lib/posts.ts
seriesOrder: 3
---
```

- **Categories**: `system-design`, `go`, `dotnet` (`categories` in `lib/posts.ts`).
- **Covers**: generated from `motif` + category colour (`lib/covers.ts`). The same diagram renders
  the cards and the Open Graph image (`opengraph-image.tsx` next to the post route).
- **MDX components**: `<Figure src alt caption />`, `<Callout type="note|tip|warning">`,
  `<GitHubCode url language />`, and ```` ```mermaid ```` blocks.

## Routing

Every page lives under `/{pt|en}`. `proxy.ts` sends `/` to the visitor's language and redirects the
old `/posts/{category}/{slug}[-en]` URLs to `/{lang}/blog/{category}/{slug}`.
