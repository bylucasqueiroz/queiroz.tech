"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

interface Post {
  title: string
  description?: string
  slug: string
  slugAsParams: string
  tag?: string
  date: string
  language?: string
}

interface PostsSearchProps {
  posts: Post[]
  allTags: string[]
}

export default function PostsSearch({ posts, allTags }: PostsSearchProps) {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return posts.filter((post) => {
      const matchesTag = activeTag
        ? post.tag?.split(",").map((t) => t.trim()).includes(activeTag)
        : true
      const matchesQuery = q
        ? post.title.toLowerCase().includes(q) ||
          post.description?.toLowerCase().includes(q) ||
          post.tag?.toLowerCase().includes(q)
        : true
      return matchesTag && matchesQuery
    })
  }, [posts, query, activeTag])

  // Group by year only when not searching
  const byYear = useMemo(() => {
    if (query.trim()) return null
    return filtered.reduce<Record<number, Post[]>>((acc, post) => {
      const year = new Date(post.date).getUTCFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    }, {})
  }, [filtered, query])

  const years = byYear
    ? Object.keys(byYear).map(Number).sort((a, b) => b - a)
    : null

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="w-full pl-9 pr-9 py-2.5 text-sm bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-gray-800 rounded-lg text-slate-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 text-xs rounded-full font-medium transition-colors border ${
            !activeTag
              ? "bg-accent text-white border-accent"
              : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent"
          }`}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(activeTag === t ? null : t)}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors border ${
              activeTag === t
                ? "bg-accent text-white border-accent"
                : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
          No posts found{query ? ` for "${query}"` : ""}.
        </p>
      ) : query.trim() ? (
        /* Flat list when searching */
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-col gap-1">
            {filtered.map((post) => (
              <PostRow key={post.slugAsParams} post={post} query={query} />
            ))}
          </div>
        </div>
      ) : (
        /* Grouped by year when browsing */
        <div className="flex flex-col gap-10">
          {years!.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-600 uppercase">
                  {year}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="flex flex-col gap-1">
                {byYear![year].map((post) => (
                  <PostRow key={post.slugAsParams} post={post} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/20 text-accent rounded-sm px-0.5 not-italic font-medium">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function PostRow({ post, query = "" }: { post: Post; query?: string }) {
  const tags = post.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={post.slug} className="no-underline group">
      <article className="flex items-start gap-4 px-3 py-3.5 rounded-lg transition-colors hover:bg-white dark:hover:bg-[#121D2F]/60">
        <span className="text-xs text-gray-400 dark:text-gray-600 font-mono mt-0.5 w-14 shrink-0">
          {formattedDate}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors leading-snug mb-1">
            {highlight(post.title, query)}
          </p>
          {post.description && (
            <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed line-clamp-1">
              {highlight(post.description, query)}
            </p>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-subtle text-accent border border-subtle-border"
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
