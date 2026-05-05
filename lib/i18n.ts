export const t = {
  pt: {
    hero: {
      role: "Senior Software Engineer",
      bio: "Escrevo sobre sistemas distribuídos, confiabilidade e as decisões que importam quando as coisas precisam continuar funcionando.",
    },
    about: {
      subtitle: "Lucas Queiroz",
      p1: "Olá! Sou Lucas Queiroz, engenheiro de software trabalhando com sistemas distribuídos no Itaú Unibanco, um dos maiores bancos da América Latina.",
      p2: "Escrevo sobre sistemas distribuídos, engenharia de confiabilidade e a realidade operacional de trabalhar em escala. Também escrevo sobre Go, .NET e engenharia de software de um modo geral. Parte do que está aqui vem de problemas do dia a dia; parte é só eu tentando pensar algo em voz alta.",
      p3: "Se quiser entrar em contato, pode me encontrar no LinkedIn.",
    },
    nav: {
      home: "Home",
      about: "Sobre",
    },
    posts: {
      noResults: "Nenhum post encontrado.",
    },
    postHeader: {
      back: "Todos os posts",
    },
  },
  en: {
    hero: {
      role: "Senior Software Engineer",
      bio: "I write about distributed systems, reliability, and the decisions that matter when things need to keep running.",
    },
    about: {
      subtitle: "Lucas Queiroz",
      p1: "Hi! I'm Lucas Queiroz, a software engineer working on distributed systems at Itaú Unibanco, one of the largest banks in Latin America.",
      p2: "I write about distributed systems, reliability engineering, and the operational reality of building things at scale. I also cover Go, .NET, and software engineering more broadly. Some of what's here comes from everyday problems; some is just me working through ideas in writing.",
      p3: "If you'd like to get in touch, you can find me on LinkedIn.",
    },
    nav: {
      home: "Home",
      about: "About",
    },
    posts: {
      noResults: "No posts found.",
    },
    postHeader: {
      back: "All posts",
    },
  },
} as const

export type Lang = keyof typeof t
