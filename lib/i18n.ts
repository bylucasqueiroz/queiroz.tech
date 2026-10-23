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
  language: { other: "en", otherLabel: "Read in English", short: "EN" },
  home: {
    bio: "Escrevo sobre sistemas distribuídos, confiabilidade e as decisões que importam quando as coisas precisam continuar funcionando.",
    title: "Sistemas distribuídos, na prática.",
    readBlog: "Ler o blog",
    aboutMe: "Sobre mim",
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
    articles: (n: number) => `${n} artigos`,
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
      "Olá! Sou Lucas Queiroz, engenheiro de software trabalhando com sistemas distribuídos em um dos maiores bancos da América Latina.",
      "Escrevo sobre sistemas distribuídos, engenharia de confiabilidade e a realidade operacional de trabalhar em escala. Também escrevo sobre Go, .NET e engenharia de software de um modo geral. Parte do que está aqui vem de problemas do dia a dia; parte é só eu tentando pensar algo em voz alta.",
      "Se quiser entrar em contato, pode me encontrar no LinkedIn.",
    ],
    experience: "Experiência",
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
  language: { other: "pt", otherLabel: "Ler em português", short: "PT" },
  home: {
    bio: "I write about distributed systems, reliability, and the decisions that matter when things need to keep running.",
    title: "Distributed systems, in practice.",
    readBlog: "Read the blog",
    aboutMe: "About me",
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
    articles: (n: number) => `${n} posts`,
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
      "Hi! I'm Lucas Queiroz, a software engineer working on distributed systems at one of the largest banks in Latin America.",
      "I write about distributed systems, reliability engineering, and the operational reality of building things at scale. I also cover Go, .NET, and software engineering more broadly. Some of what's here comes from everyday problems; some is just me working through ideas in writing.",
      "If you'd like to get in touch, you can find me on LinkedIn.",
    ],
    experience: "Experience",
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
