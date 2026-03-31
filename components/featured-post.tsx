import Link from "next/link"

interface Post {
  title: string
  description?: string
  slug: string
  tag?: string
  date: string
  language?: string
}

export default function FeaturedPost({ post }: { post: Post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const tags = post.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []

  return (
    <Link href={post.slug} className="block no-underline group mb-6">
      <article className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D1117] p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(68,147,248,0.08)]">
        {/* Latest badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-accent">
            Latest
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {post.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-subtle text-accent font-medium"
              >
                {tag}
              </span>
            ))}
            {post.language && (
              <span className="text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-md">
                {post.language}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <span className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</span>
            <span className="text-accent text-sm transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
