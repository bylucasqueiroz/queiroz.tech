# AGENTS.md

Regras para agentes que trabalham neste repositório: o site e blog pessoal de Lucas Queiroz
(queiroz.tech). Leia antes de mudar código, conteúdo ou layout.

## Stack e comandos

Next.js 16 (App Router) + Velite (MDX) + Tailwind CSS v4, com Bun.

```bash
bun install
bun run dev     # velite --watch + next dev
bun run lint    # eslint
bun run build   # velite build + next build (gera também as imagens de compartilhamento)
```

Antes de dar uma tarefa por concluída, rode `bun run lint`, `bunx tsc --noEmit` e `bun run build`.
Mudança visual: confira a página no navegador, em desktop e em celular (390px), no tema claro e
no escuro.

## Estrutura

- `app/[lang]/`: todas as páginas ficam sob `/pt` ou `/en`. O layout raiz é `app/[lang]/layout.tsx`.
  - `page.tsx`: home em tela cheia, só apresentação: nome, frase, bio, botões "Ler o blog" e
    "Sobre mim", card do último vídeo do YouTube (`lib/youtube.ts`, feed público do canal, página
    regenerada 1x por dia), tudo centralizado e sem foto (a foto fica no Sobre). Não coloque
    conteúdo do blog na home.
  - `blog/`: índice com destaque, série e todos os posts. `blog/[category]/` e
    `blog/[category]/[slug]/`.
  - `series/`, `about/`, `feed.xml/`.
- `proxy.ts`: manda `/` para o idioma do navegador e redireciona com 308 as URLs antigas
  (`/posts/{categoria}/{slug}[-en]`, `/career`).
- `lib/i18n.ts`: todos os textos de interface, em `pt` e `en`. Nada de texto fixo nos componentes.
- `lib/posts.ts`: categorias, séries e consultas de posts.
- `lib/covers.ts`, `lib/motifs.ts`, `lib/og-cover.tsx`, `components/cover.tsx`: capas dos posts.
- `lib/seo.ts`: `pageMetadata()` (canonical, hreflang com x-default, Open Graph) e o JSON-LD do autor.
- `components/post-blocks.tsx`: blocos compartilhados (cards, grade de posts, destaque, série,
  `PageIntro`, `Avatar`).

## Posts

Caminho: `content/posts/{pt|en}/{system-design|go|dotnet}/{slug}.mdx`.
A URL é `/{lang}/blog/{categoria}/{slug}`.

A tradução de um post é o arquivo com a mesma categoria e o mesmo slug no outro idioma. É isso que
liga a troca de idioma, o `hreflang` e o link "Read in English / Ler em português". Ao criar ou
renomear um post, mantenha os dois idiomas com o mesmo caminho.
Post sem tradução é permitido: o botão de idioma usa `getLanguageFallbacks()` (`lib/posts.ts`) e
leva para a categoria (ou o blog) no outro idioma, em vez de um 404.

Frontmatter:

```yaml
title: "Circuit Breaker: quando parar de tentar?"
description: "Entendendo o padrão de resiliência Circuit Breaker e quando utilizá-lo."
date: "2026-08-05"
tags: ["system design"]
motif: "breaker"        # obrigatório: desenho da capa (ver Capas)
series: "resilience"    # opcional (ver Séries)
seriesOrder: 3          # posição na série
draft: true             # opcional: rascunho, aparece só no `bun run dev`
```

Rascunhos (`draft: true`) ficam fora do build de produção: sem página, sitemap, feed, busca ou
imagem de compartilhamento. Para publicar, remova a linha `draft` e ajuste `date` para o dia da
publicação. Sempre leia os posts por `posts`/`getPosts()` de `lib/posts.ts`, nunca direto de
`@/.velite`, senão os rascunhos vazam.

Componentes MDX: `<Figure src alt caption />`, `<Callout type="note|tip|warning">`,
`<GitHubCode url language />` e blocos ```` ```mermaid ````. Use `alt` descritivo nas imagens,
nunca `alt="post"`.

- Imagens locais (PNG/JPEG em `public/`) passam pelo `next/image` automaticamente: o `Figure` lê as
  dimensões do arquivo no build (`lib/image-size.ts`). Não use `<img>` direto no MDX.
- `<GitHubCode>` só realça as linguagens registradas em `components/github-code.tsx`. Para usar
  outra, registre-a lá (não troque pela versão completa do highlighter: são ~600 KB por post).
- O CSS do KaTeX é importado só na página de post. Não o leve de volta para o layout.

Categorias novas: adicione em `categories` (`lib/posts.ts`), em `coverPalette` (`lib/covers.ts`),
nas cores `--cat-*` (`app/globals.css`) e em `categoryText`/`categoryDot` (`components/post-blocks.tsx`).

## Séries

Uma série tem duas partes:

1. Cadastro em `series` (`lib/posts.ts`), com `title` e `description` em `pt` e `en`.
2. Nos posts, `series: "<id>"` e `seriesOrder: <n>` no frontmatter. Marque os dois idiomas.

`getSeries(lang, id)` junta os posts do idioma com aquele `series`, ordenados por `seriesOrder`.
Daí saem a faixa da série no blog, a página `/series`, o breadcrumb e a lateral do post, e os
links "Anterior/Próximo na série". Série cadastrada sem posts não aparece.

## Capas (ilustrações dos posts)

São diagramas SVG feitos à mão, escolhidos pelo `motif` do frontmatter. Não são gerados por IA nem
a partir do texto do post.

- `lib/motifs.ts`: lista de motifs válidos. O Velite rejeita valores fora dela.
- `lib/covers.ts`:
  - `coverPalette`: cor de fundo e de destaque por categoria.
  - `shapes`: o desenho de cada motif, em SVG, numa tela de 1200×630, ocupando a metade direita.
  - `motifLabels`: os rótulos do desenho; textos que mudam por idioma usam `{ pt, en }`.
- `components/cover.tsx`: capa no site. Desloca o desenho 240px (`CARD_SHIFT`) para centralizar
  no card. `variant="card"` mostra a categoria; `variant="thumb"` é só o desenho.
- `lib/og-cover.tsx` + `opengraph-image.tsx`: PNG de 1200×630 por post, gerado no build, com o
  desenho à direita e o título à esquerda. O gerador não desenha `<text>` dentro de SVG, por isso
  os rótulos são divs posicionadas por cima. As fontes vêm de `assets/fonts/`.
- `app/[lang]/opengraph-image.tsx`: imagem de compartilhamento das páginas que não são post
  (foto, nome e frase).

Novo motif: adicione em `MOTIFS`, escreva `shapes` e `motifLabels`, e use no post. O TypeScript
acusa se faltar alguma parte.

## Regras de design (não quebre)

Direção visual: "modelo C". Estrutura limpa inspirada em blogs de engenharia, com identidade
própria nas capas de diagrama. O canvas de referência é https://claude.ai/artifact/Ro7iSuGAPLfsgHGf2PFBx7
(linhas "Site atual").

- **Tipografia**: Geist para tudo; JetBrains Mono só em código, atalhos de teclado (⌘K) e rótulos
  dentro dos diagramas. Não use Mona Sans, Hubot Sans nem nada da marca GitHub.
- **Rótulos e categorias**: Geist semibold, em caixa normal (`text-sm font-semibold`).
  Nunca monoespaçado em maiúsculas com letras espaçadas: o dono do site considera isso "cara de IA".
- **Cores**: só os tokens de `app/globals.css` (`bg`, `fg`, `muted`, `line`, `surface`, `accent`,
  `cat-sd`, `cat-go`, `cat-dotnet`), com versão clara e escura. Nada de cores soltas nos componentes.
- **Grade blueprint** (`GridBackdrop`, `.bg-blueprint`): página inteira na home; faixa que some
  aos poucos no topo das páginas de entrada (todas que usam `PageIntro`: Blog, categorias, Séries,
  Sobre). Posts não têm grade.
- **Marca**: o símbolo é um prompt de terminal, "q_": um q desenhado em traço (não é fonte) e o
  cursor em verde-água, sobre um quadrado escuro (`--color-brand`, `--color-brand-fg`,
  `--color-brand-cursor`), igual nos dois temas. O mesmo desenho está em `app/icon.svg`
  (favicon), `app/apple-icon.png` (180×180, cantos retos), `components/logo.tsx` (header) e,
  invertido (fundo branco, traço na cor da categoria), em `lib/og-cover.tsx`. Mudou um, mude todos.
- **Header e rodapé**: um só de cada para todas as páginas (`site-header.tsx`, `site-footer.tsx`).
  No celular, logo e ícones ficam na primeira linha e o menu na segunda.
- **Botões**: 44px de altura (`min-h-11`), `rounded-[10px]`, `px-5`, `text-sm font-semibold`.
  Principal `bg-fg text-bg`; secundário `border border-line`.
- **Alvos de toque** de pelo menos 44px.
- **Texto**: não use travessão (—) em textos do site. Prefira dois-pontos, vírgula ou ponto.
- **Dados pessoais**: nome do empregador e cargo não aparecem no site (nem no Sobre, nem na home,
  bio, bloco do autor ou metadados). A experiência profissional fica no LinkedIn.
  Telefone e e-mail nunca vão para o site.
- Mudanças grandes de layout: proponha primeiro no canvas e implemente depois da aprovação.

## Idiomas e SEO

- Todo texto novo entra em `lib/i18n.ts` nos dois idiomas.
- Páginas novas: use `pageMetadata()` de `lib/seo.ts` no `generateMetadata`. Ela já define
  canonical, `hreflang` (com x-default para `pt`) e Open Graph com imagem.
- Inclua a rota em `app/sitemap.ts`.
- Não quebre URLs públicas sem adicionar redirecionamento 308 em `proxy.ts`.

## Git

Não faça commit, push ou PR sem o dono pedir. Mensagens de commit no estilo `feat: …`, `fix: …`,
`post: …`.
