import { posts } from "@/.velite"
import Link from "next/link"

export const metadata = {
  title: "Blog — Lucas Queiroz",
  description: "All posts by Lucas Queiroz.",
}

type SearchParams = Promise<{ tag?: string }>

export default async function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  const { tag } = await searchParams

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []))
  ).sort()

  const filtered = tag
    ? sorted.filter((p) => p.tag?.split(",").map((t) => t.trim()).includes(tag))
    : sorted

  const byYear = filtered.reduce<Record<number, typeof filtered>>((acc, post) => {
    const year = new Date(post.date).getUTCFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <div>
      {/* Page header */}
      <div className="pt-10 pb-8 border-b border-gray-200 dark:border-gray-800 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-1">
          Writing
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {posts.length} posts across{" "}
          <span className="text-accent font-medium">{allTags.length} topics</span>
        </p>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/posts"
          className={`px-3 py-1 text-xs rounded-full font-medium transition-colors border ${
            !tag
              ? "bg-accent text-white border-accent"
              : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent"
          }`}
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/posts?tag=${encodeURIComponent(t)}`}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors border ${
              tag === t
                ? "bg-accent text-white border-accent"
                : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      {/* Posts grouped by year */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {years.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-600 uppercase">
                  {year}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="flex flex-col gap-1">
                {byYear[year].map((post) => {
                  const tags = post.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []
                  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                    month: "short",
                    day: "numeric",
                  })
                  return (
                    <Link key={post.slugAsParams} href={post.slug} className="no-underline group">
                      <article className="flex items-start gap-4 px-3 py-3.5 rounded-lg transition-colors hover:bg-white dark:hover:bg-[#121D2F]/60">
                        <span className="text-xs text-gray-400 dark:text-gray-600 font-mono mt-0.5 w-14 shrink-0">
                          {formattedDate}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors leading-snug mb-1">
                            {post.title}
                          </p>
                          {post.description && (
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-1">
                              {post.description}
                            </p>
                          )}
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                          {tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-subtle text-accent border border-subtle-border">
                              {t}
                            </span>
                          ))}
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
