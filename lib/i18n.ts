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
    // Timeless on purpose: nothing here should need updating as posts, videos or jobs change.
    code: {
      label: "Lições de produção, em Go",
      pkg: "producao",
      lesson: "Lições de quem já foi acordado por um alerta às 3h.",
      rules: [
        ["Retry", "sempre com backoff e jitter"],
        ["Timeout", "em tudo, inclusive no que nunca falha"],
        ["Deploy", "sexta-feira só com feature flag"],
        ["Logs", "estruturados, antes do incidente"],
      ],
      incident: "incidente",
      incidentType: "Incidente",
      cause: "Causa",
      steps: ["não é o banco de dados", "é o banco de dados", "é DNS"],
      blameless: "sem culpados",
    },
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
      "Olá! Sou Lucas Queiroz, engenheiro de software backend há mais de 8 anos. Trabalho com sistemas distribuídos e infraestrutura financeira em um dos maiores bancos da América Latina, onde ajudei a escalar sistemas que processam mais de 28 milhões de transações por dia.",
      "No dia a dia uso Go, .NET, Kubernetes e AWS para construir serviços cloud-native, arquiteturas orientadas a eventos e integrações seguras com o sistema financeiro nacional, incluindo o Banco Central. Já liderei a modernização de sistemas legados para arquiteturas distribuídas e mentorei engenheiros com foco em confiabilidade e design limpo.",
      "Aqui escrevo sobre o que aprendo nesse caminho: sistemas distribuídos, confiabilidade, Go e .NET. Parte vem de problemas reais do dia a dia; parte sou eu pensando em voz alta.",
      "Se quiser conversar, me encontre no LinkedIn.",
    ],
    experience: "Experiência",
    education: "Formação",
    certifications: "Certificações",
    awards: "Reconhecimentos",
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
    code: {
      label: "Production lessons, in Go",
      pkg: "production",
      lesson: "Lessons from being paged at 3 a.m.",
      rules: [
        ["Retry", "always with backoff and jitter"],
        ["Timeout", "on everything, even what never fails"],
        ["Deploy", "Fridays only behind a feature flag"],
        ["Logs", "structured, before the incident"],
      ],
      incident: "incident",
      incidentType: "Incident",
      cause: "Cause",
      steps: ["it's not the database", "it's the database", "it's DNS"],
      blameless: "blameless",
    },
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
      "Hi! I'm Lucas Queiroz, a backend software engineer with more than 8 years of experience. I work on distributed systems and financial infrastructure at one of the largest banks in Latin America, where I've helped scale systems that process over 28 million transactions a day.",
      "Day to day I use Go, .NET, Kubernetes and AWS to build cloud-native services, event-driven architectures and secure integrations with Brazil's financial system, including the Central Bank. I've led the modernisation of legacy systems into distributed architectures and mentored engineers with a focus on reliability and clean design.",
      "Here I write about what I learn along the way: distributed systems, reliability, Go and .NET. Some of it comes from real day-to-day problems; some is me thinking out loud.",
      "If you'd like to talk, find me on LinkedIn.",
    ],
    experience: "Experience",
    education: "Education",
    certifications: "Certifications",
    awards: "Recognition",
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
