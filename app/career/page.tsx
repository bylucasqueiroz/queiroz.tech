import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Career — Lucas Queiroz",
  description: "My journey through software engineering.",
}

const experience = [
  {
    company: "Itaú Unibanco",
    role: "Senior Software Engineer",
    period: "2022 — Present",
    bullets: [
      "Designed and implemented critical microservices for banking transactions, ensuring performance and high availability for 28 million financial transactions daily. Stack: C#, .NET, Python, GitHub Actions, DynamoDB, Apache Kafka, SQS, SNS, Terraform.",
      "Responsible for Go-based architectures on AWS within a cell-based model using Kubernetes, Docker, EKS, EC2, Kafka, SQS, and DynamoDB.",
      "Architected scalable internal APIs using API Gateway, AWS Fargate, and Lambda; built worker services for system optimization with C# and Docker.",
      "Led On-Premises to AWS migration initiatives; maintained legacy codebases and managed databases for operational efficiency.",
    ],
    skills: ["Go", "C#", ".NET", "Python", "AWS", "Kubernetes", "Kafka", "DynamoDB", "Terraform", "Docker"],
  },
  {
    company: "BTG Pactual",
    role: "Backend Engineer",
    period: "2021 — 2022",
    bullets: [
      "Implemented worker services processing millions of financial transactions daily with C#, .NET, Python, AWS, Docker, Azure DevOps, and MySQL.",
      "Developed APIs consuming processed transactions and defining inconsistencies using .NET and MySQL, serving frontend financial analysis teams.",
      "Led the creation and maintenance of a frontend in Angular to enhance visualization of processed data.",
    ],
    skills: ["C#", ".NET Core", "Python", "AWS", "Angular", "MySQL", "Azure DevOps", "DynamoDB"],
  },
  {
    company: "Educa Mais Brasil",
    role: "Systems Analyst",
    period: "2020 — 2021",
    bullets: [
      "Developed scalable APIs integrating with external partner systems to consume scholarship data using C#, .NET Core, Entity Framework, ASP.NET Web API, Oracle, and PL/SQL.",
      "Maintained legacy APIs and introduced new features to existing systems in C# and .NET Framework.",
      "Implemented features in Angular sales tools for scholarship management teams, following SOLID, DDD, Clean Architecture principles.",
    ],
    skills: ["C#", ".NET Core", ".NET Framework", "Entity Framework", "Oracle", "Angular", "Clean Architecture"],
  },
  {
    company: "Solutis Tecnologia",
    role: "Systems Analyst",
    period: "2019 — 2020",
    bullets: [
      "Designed and implemented financial data processing APIs for clients in the Water & Sanitation sector using C#, .NET, and IBM DB2, following TDD and CQRS patterns.",
      "Enhanced dashboard features for indicator management with JavaScript and React.",
    ],
    skills: ["C#", ".NET Core", "IBM Db2", "React", "JavaScript", "TDD", "CQRS"],
  },
  {
    company: "Shopping Piedade",
    role: "IT Assistant",
    period: "2018 — 2019",
    bullets: [
      "Streamlined administrative processes by developing invoice delivery systems using C#, .NET Core, Entity Framework, SQL Server, and MVC.",
      "Administered the computer network via Windows Server to regulate internal user access.",
      "Led IT support team, overseeing infrastructure, third-party systems, and SQL Server databases.",
    ],
    skills: ["C#", ".NET Core", "SQL Server", "Entity Framework", "Windows Server"],
  },
  {
    company: "Shopping Piedade",
    role: "IT Intern",
    period: "2017 — 2018",
    bullets: [
      "Maintained IT infrastructure: hardware, software, and application support.",
      "Developed simple internal applications using C#, ASP.NET, and SQL Server.",
    ],
    skills: ["C#", "ASP.NET", "SQL Server"],
  },
]

export default function CareerPage() {
  return (
    <div>
      {/* Page header */}
      <div className="pt-10 pb-8 border-b border-gray-200 dark:border-gray-800 mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-1">
          Career
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {experience.length} roles across{" "}
          <span className="text-accent font-medium">
            {new Date().getFullYear() - 2017}+ years
          </span>{" "}
          of software engineering.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />

        <div className="flex flex-col gap-10">
          {experience.map((job, index) => (
            <div key={`${job.company}-${job.period}`} className="relative pl-6">
              {/* Timeline dot */}
              <div
                className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full border-2 ${
                  index === 0
                    ? "bg-accent border-accent"
                    : "bg-white dark:bg-[#0D1117] border-gray-300 dark:border-gray-600"
                }`}
              />

              {/* Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 mb-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug">
                    {job.company}
                  </h2>
                  <p className="text-sm text-accent font-medium">{job.role}</p>
                </div>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-600 shrink-0">
                  {job.period}
                </span>
              </div>

              {/* Bullets */}
              <ul className="mb-4 space-y-2">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="text-accent mt-1.5 shrink-0 text-[8px]">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-subtle text-accent border border-subtle-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
