import Link from "next/link"

interface GitHubRepo {
  name: string
  html_url: string
  description: string | null
  topics: string[]
  language: string | null
}

async function fetchRecentRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/bylucasqueiroz/repos?sort=pushed&direction=desc&per_page=2&type=public",
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function OngoingProjects() {
  const repos = await fetchRecentRepos()

  return (
    <div className="flex flex-col gap-3">
      {repos.map((repo) => {
        const stack =
          repo.topics.length > 0
            ? repo.topics.slice(0, 4)
            : repo.language
            ? [repo.language]
            : []

        return (
          <Link
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline group"
          >
            <article className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D1117] p-4 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(68,147,248,0.08)]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50 group-hover:text-accent transition-colors mb-1">
                    {repo.name}
                  </h4>
                  {repo.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      {repo.description}
                    </p>
                  )}
                  {stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-gray-100 dark:bg-[#121D2F] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-gray-400 dark:text-gray-600 group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 shrink-0 mt-0.5 text-sm">
                  →
                </span>
              </div>
            </article>
          </Link>
        )
      })}
    </div>
  )
}
