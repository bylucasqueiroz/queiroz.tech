import type { Lang } from "@/lib/i18n"

// Source: LinkedIn profile export (Oct 2026). Contact details stay off the site on purpose.

export interface Role {
  title: string
  period: string
  highlights: string[]
}

export interface Job {
  company: string
  location: string
  roles: Role[]
}

export interface Career {
  experience: Job[]
  education: { school: string; degree: string; period: string }[]
  certifications: string[]
  awards: string[]
}

export const career: Record<Lang, Career> = {
  pt: {
    experience: [
      {
        company: "Itaú Unibanco",
        location: "Brasil",
        roles: [
          {
            title: "Senior Software Engineer · Plataforma de Limites Transacionais",
            period: "set. 2026 – atual",
            highlights: [
              "Deixei a liderança técnica por escolha própria para voltar ao trabalho técnico como contribuidor individual, num time que constrói a nova plataforma de limites transacionais da infraestrutura de risco do banco.",
              "Defino e documento os padrões de desenvolvimento em Go do time e guio o desenho de um sistema multicelular sobre a arquitetura baseada em células do banco.",
              "Ajudei a arquitetar um fluxo de desenvolvimento com agentes de IA dedicados a desenvolvimento, testes, segurança e code review, para manter os padrões de código e reduzir o contexto necessário por tarefa.",
            ],
          },
          {
            title: "Senior Software Engineer & Tech Lead · Plataforma de Mensageria SPB",
            period: "abr. 2024 – set. 2026",
            highlights: [
              "Microsserviços críticos para transações bancárias, com alta disponibilidade para 28 milhões de transações financeiras por dia.",
              "Arquitetura e aplicações em Go, Kubernetes e Docker numa arquitetura baseada em células na AWS (EKS, Kafka, SQS, SNS, DynamoDB).",
              "APIs escaláveis com API Gateway, Fargate e Lambda para sistemas internos e outras squads, e workers em C# e .NET.",
              "Liderei a migração de projetos on-premises para a AWS.",
            ],
          },
          {
            title: "Software Engineer · Plataforma de Mensageria SPB",
            period: "mar. 2022 – abr. 2024",
            highlights: [],
          },
        ],
      },
      {
        company: "YouTube",
        location: "Brasil",
        roles: [
          {
            title: "Criador de conteúdo",
            period: "ago. 2026 – atual",
            highlights: [
              "Conteúdo técnico sobre engenharia de software, backend, arquitetura e sistemas distribuídos.",
            ],
          },
        ],
      },
      {
        company: "BTG Pactual",
        location: "Brasil",
        roles: [
          {
            title: "Backend Developer",
            period: "abr. 2021 – fev. 2022",
            highlights: [
              "Workers que processavam milhões de transações financeiras por dia, com C#, .NET, Python, AWS, Docker e MySQL.",
              "APIs para identificar inconsistências nas transações processadas, usadas pelos times de análise financeira.",
              "Liderei a criação e manutenção do frontend em Angular para visualizar esses dados.",
            ],
          },
        ],
      },
      {
        company: "Educa Mais Brasil",
        location: "Brasil",
        roles: [
          {
            title: "Analista de Sistemas",
            period: "ago. 2020 – abr. 2021",
            highlights: [
              "APIs de integração com parceiros para dados de bolsas de estudo, com C#, .NET Core, Entity Framework e Oracle.",
              "Evolução de sistemas legados e das ferramentas de vendas em Angular, seguindo SOLID, DDD e Clean Architecture.",
            ],
          },
        ],
      },
      {
        company: "Solutis Tecnologias",
        location: "Salvador, Bahia",
        roles: [
          {
            title: "Programador",
            period: "ago. 2019 – ago. 2020",
            highlights: [
              "APIs de processamento de dados financeiros para clientes do setor de saneamento, com C#, .NET e IBM DB2, usando TDD e CQRS.",
              "Dashboards de indicadores em JavaScript e React.",
            ],
          },
        ],
      },
      {
        company: "Shopping Piedade",
        location: "Salvador, Bahia",
        roles: [
          {
            title: "Assistente de TI",
            period: "dez. 2018 – ago. 2019",
            highlights: [
              "Sistemas internos em C#, .NET Core e SQL Server para automatizar a entrega de faturas, além da rede e do suporte de TI.",
            ],
          },
          {
            title: "Estagiário de TI",
            period: "abr. 2017 – dez. 2018",
            highlights: [],
          },
        ],
      },
    ],
    education: [
      { school: "Wyden Educacional", degree: "Bacharelado em Engenharia de Computação", period: "2016 – 2022" },
    ],
    certifications: ["5x AWS Certified", "Docker", "MySQL", "Scrum Foundation Professional Certificate (SFPC)"],
    awards: ["Programa de Reconhecimento de Alta Performance, 2023 e 2024"],
  },
  en: {
    experience: [
      {
        company: "Itaú Unibanco",
        location: "Brazil",
        roles: [
          {
            title: "Senior Software Engineer · Transactional Limits Platform",
            period: "Sep 2026 – present",
            highlights: [
              "Chose to step back from tech lead to focus on hands-on technical work, joining the team building a new transactional limits platform for the bank's risk infrastructure.",
              "Define and document the team's Go development standards and guide the design of a multi-cell system on the bank's cell-based architecture.",
              "Helped architect an AI-assisted development workflow with dedicated agents for development, QA, security and code review, to enforce coding standards and cut per-task context.",
            ],
          },
          {
            title: "Senior Software Engineer & Tech Lead · SPB Messaging Platform",
            period: "Apr 2024 – Sep 2026",
            highlights: [
              "Critical banking microservices with high availability for 28 million financial transactions a day.",
              "Architecture and services in Go, Kubernetes and Docker on a cell-based architecture on AWS (EKS, Kafka, SQS, SNS, DynamoDB).",
              "Scalable APIs with API Gateway, Fargate and Lambda for internal systems and other squads, plus C#/.NET workers.",
              "Led the migration of on-premises projects to AWS.",
            ],
          },
          {
            title: "Software Engineer · SPB Messaging Platform",
            period: "Mar 2022 – Apr 2024",
            highlights: [],
          },
        ],
      },
      {
        company: "YouTube",
        location: "Brazil",
        roles: [
          {
            title: "Content Creator",
            period: "Aug 2026 – present",
            highlights: ["Technical content on software engineering, backend, architecture and distributed systems."],
          },
        ],
      },
      {
        company: "BTG Pactual",
        location: "Brazil",
        roles: [
          {
            title: "Backend Developer",
            period: "Apr 2021 – Feb 2022",
            highlights: [
              "Workers processing millions of financial transactions a day, with C#, .NET, Python, AWS, Docker and MySQL.",
              "APIs flagging inconsistencies in processed transactions, used by the financial analysis teams.",
              "Led the creation and upkeep of the Angular frontend that visualises that data.",
            ],
          },
        ],
      },
      {
        company: "Educa Mais Brasil",
        location: "Brazil",
        roles: [
          {
            title: "Systems Analyst",
            period: "Aug 2020 – Apr 2021",
            highlights: [
              "Partner integration APIs for scholarship data, with C#, .NET Core, Entity Framework and Oracle.",
              "Evolved legacy systems and the Angular sales tools, following SOLID, DDD and Clean Architecture.",
            ],
          },
        ],
      },
      {
        company: "Solutis Tecnologias",
        location: "Salvador, Bahia",
        roles: [
          {
            title: "Programmer",
            period: "Aug 2019 – Aug 2020",
            highlights: [
              "Financial data processing APIs for water and sanitation clients, with C#, .NET and IBM DB2, using TDD and CQRS.",
              "Indicator dashboards in JavaScript and React.",
            ],
          },
        ],
      },
      {
        company: "Shopping Piedade",
        location: "Salvador, Bahia",
        roles: [
          {
            title: "IT Assistant",
            period: "Dec 2018 – Aug 2019",
            highlights: [
              "Internal systems in C#, .NET Core and SQL Server to automate invoice delivery, plus network and IT support.",
            ],
          },
          {
            title: "IT Intern",
            period: "Apr 2017 – Dec 2018",
            highlights: [],
          },
        ],
      },
    ],
    education: [{ school: "Wyden Educacional", degree: "Bachelor of Engineering, Computer Engineering", period: "2016 – 2022" }],
    certifications: ["5x AWS Certified", "Docker", "MySQL", "Scrum Foundation Professional Certificate (SFPC)"],
    awards: ["High Performance Recognition Program, 2023 and 2024"],
  },
}
