export const locales = ["pt", "en"] as const
export type Lang = (typeof locales)[number]
export const defaultLang: Lang = "pt"

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value)
}

export const htmlLang: Record<Lang, string> = { pt: "pt-BR", en: "en" }
export const dateLocale: Record<Lang, string> = { pt: "pt-BR", en: "en-US" }

const pt = {
  meta: {
    description:
      "Sistemas distribuídos, confiabilidade e engenharia de backend: o que acontece quando as coisas precisam continuar de pé.",
  },
  nav: { home: "Início", blog: "Blog", series: "Séries", about: "Sobre" },
  search: {
    button: "Buscar",
    label: "Buscar artigos",
    placeholder: "Buscar artigos…",
    empty: "Digite para buscar artigos…",
    noResults: "Nenhum resultado para",
    navigate: "navegar",
    open: "abrir",
    close: "fechar",
  },
  theme: { toggle: "Alternar tema" },
  language: {
    otherLabel: "Read in English",
    unavailable: "Este artigo ainda não tem versão em inglês: abrir o blog em inglês",
    short: "EN",
  },
  home: {
    bio: "Escrevo sobre sistemas distribuídos, confiabilidade e as decisões que importam quando as coisas precisam continuar funcionando.",
    title: "Sistemas distribuídos, na prática.",
    readBlog: "Ler o blog",
    aboutMe: "Sobre mim",
    latestVideo: "Último vídeo no YouTube",
    watch: "Assistir →",
    youtubeChannel: "Canal no YouTube",
  },
  blog: {
    title: "Blog",
    description:
      "Sistemas distribuídos, confiabilidade e engenharia de backend: o que acontece quando as coisas precisam continuar de pé.",
    all: "Tudo",
    featured: "Destaque",
    more: "Mais artigos",
    categories: "Categorias",
    categoryDescription: (label: string) => `Artigos sobre ${label}: sistemas distribuídos, confiabilidade e engenharia de backend na prática.`,
  },
  series: {
    label: "Série",
    title: "Séries",
    description: "Artigos escritos para serem lidos em sequência.",
    articles: (n: number) => (n === 1 ? "1 artigo" : `${n} artigos`),
    viewAll: (n: number) => `Ver os ${n} artigos`,
    position: (i: number, n: number) => `${i} de ${n}`,
  },
  post: {
    readingTime: (n: number) => `${n} min de leitura`,
    onThisPage: "Neste artigo",
    tags: "Tags",
    share: "Compartilhar",
    copyLink: "Copiar link",
    copied: "Link copiado",
    writtenBy: "Escrito por",
    related: "Relacionados",
    previousInSeries: "← Anterior na série",
    nextInSeries: "Próximo na série →",
    lastInSeries: "Último artigo da série",
    firstInSeries: "Primeiro artigo da série",
    breadcrumb: "Navegação estrutural",
  },
  about: {
    title: "Sobre",
    paragraphs: [
      "Olá! Sou Lucas Queiroz, engenheiro de software com mais de 8 anos de experiência em backend. Trabalho com sistemas distribuídos e gosto da parte do trabalho que vai além do código: arquitetura, confiabilidade e as decisões que sustentam um sistema quando ele cresce.",
      "Este blog é onde organizo o que aprendo nesse caminho. A proposta é falar de sistemas distribuídos na prática, partindo de problemas reais, com explicações claras e sem enrolação. Se quiser conversar, me encontre no LinkedIn.",
    ],
  },
  follow: {
    title: "Acompanhe os próximos artigos",
    description: "Sem newsletter, sem spam: assine o feed ou me siga no LinkedIn.",
    rss: "Feed RSS",
  },
  notFound: { title: "Página não encontrada", back: "Voltar para o blog" },
}

type Dictionary = typeof pt

const en: Dictionary = {
  meta: {
    description:
      "Distributed systems, reliability and backend engineering: what happens when things need to keep running.",
  },
  nav: { home: "Home", blog: "Blog", series: "Series", about: "About" },
  search: {
    button: "Search",
    label: "Search posts",
    placeholder: "Search posts…",
    empty: "Type to search posts…",
    noResults: "No results for",
    navigate: "navigate",
    open: "open",
    close: "close",
  },
  theme: { toggle: "Toggle theme" },
  language: {
    otherLabel: "Ler em português",
    unavailable: "This post has no Portuguese version yet: open the Portuguese blog",
    short: "PT",
  },
  home: {
    bio: "I write about distributed systems, reliability, and the decisions that matter when things need to keep running.",
    title: "Distributed systems, in practice.",
    readBlog: "Read the blog",
    aboutMe: "About me",
    latestVideo: "Latest YouTube video",
    watch: "Watch →",
    youtubeChannel: "YouTube channel",
  },
  blog: {
    title: "Blog",
    description:
      "Distributed systems, reliability and backend engineering: what happens when things need to keep running.",
    all: "All",
    featured: "Featured",
    more: "More posts",
    categories: "Categories",
    categoryDescription: (label: string) => `Posts about ${label}: distributed systems, reliability and backend engineering in practice.`,
  },
  series: {
    label: "Series",
    title: "Series",
    description: "Posts written to be read in sequence.",
    articles: (n: number) => (n === 1 ? "1 post" : `${n} posts`),
    viewAll: (n: number) => `See all ${n} posts`,
    position: (i: number, n: number) => `${i} of ${n}`,
  },
  post: {
    readingTime: (n: number) => `${n} min read`,
    onThisPage: "On this page",
    tags: "Tags",
    share: "Share",
    copyLink: "Copy link",
    copied: "Link copied",
    writtenBy: "Written by",
    related: "Related",
    previousInSeries: "← Previous in series",
    nextInSeries: "Next in series →",
    lastInSeries: "Last post in the series",
    firstInSeries: "First post in the series",
    breadcrumb: "Breadcrumb",
  },
  about: {
    title: "About",
    paragraphs: [
      "Hi! I'm Lucas Queiroz, a software engineer with more than 8 years of backend experience. I work on distributed systems and enjoy the part of the job that goes beyond code: architecture, reliability and the decisions that hold a system together as it grows.",
      "This blog is where I organise what I learn along the way. The idea is to cover distributed systems in practice, starting from real problems, with clear explanations and no fluff. If you'd like to talk, find me on LinkedIn.",
    ],
  },
  follow: {
    title: "Follow upcoming posts",
    description: "No newsletter, no spam: subscribe to the feed or follow me on LinkedIn.",
    rss: "RSS feed",
  },
  notFound: { title: "Page not found", back: "Back to the blog" },
}

const dictionaries: Record<Lang, Dictionary> = { pt, en }

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang]
}
