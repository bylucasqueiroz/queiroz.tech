import Link from "next/link"

interface PostHeaderProps {
  title: string
  description?: string
  date: string
  tag?: string
  language?: string
}

export default function PostHeader({ title, description, date, tag, language }: PostHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const tags = tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []

  return (
    <header className="pt-10 pb-8 border-b border-gray-200 dark:border-gray-800 mb-10 not-prose">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors no-underline mb-6 group"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span>
        All posts
      </Link>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <Link
              key={t}
              href={`/posts?tag=${encodeURIComponent(t)}`}
              className="px-2.5 py-1 text-xs font-mono rounded-md bg-subtle text-accent border border-subtle-border hover:bg-accent hover:text-white hover:border-accent transition-colors no-underline"
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-snug mb-3">
        {title}
      </h1>

      {description && (
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          {description}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <time dateTime={date}>{formattedDate}</time>
        {language && (
          <>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <span className="border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-md">
              {language}
            </span>
          </>
        )}
      </div>
    </header>
  )
}
