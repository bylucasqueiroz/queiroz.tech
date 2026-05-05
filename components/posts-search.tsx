"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useLang } from "./language-provider"
import { t } from "@/lib/i18n"

interface Post {
  title: string
  description?: string
  slug: string
  slugAsParams: string
  tag?: string
  date: string
}

interface PostsSearchProps {
  posts: Post[]
  enPosts?: Record<string, Post>
  allTags: string[]
}

export default function PostsSearch({ posts, enPosts = {}, allTags }: PostsSearchProps) {
  const { lang } = useLang()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Swap canonical PT posts for their EN version when lang=en
  const displayPosts = useMemo(
    () => posts.map((p) => (lang === "en" && enPosts[p.slugAsParams]) ? enPosts[p.slugAsParams] : p),
    [posts, enPosts, lang]
  )

  const filtered = useMemo(() => {
    if (!activeTag) return displayPosts
    return displayPosts.filter((p) =>
      p.tag?.split(",").map((t) => t.trim()).includes(activeTag)
    )
  }, [displayPosts, activeTag])

  const byYear = useMemo(() =>
    filtered.reduce<Record<number, Post[]>>((acc, post) => {
      const year = new Date(post.date).getUTCFullYear()
      ;(acc[year] ??= []).push(post)
      return acc
    }, {}),
    [filtered]
  )

  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <div className="flex gap-8">
      {/* Post list */}
      <div className="flex-1 min-w-0">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 py-4">{t[lang].posts.noResults}</p>
        ) : (
          <div className="flex flex-col gap-10">
            {years.map((year) => (
              <section key={year}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-gray-400 dark:text-gray-600 shrink-0">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="flex flex-col">
                  {byYear[year].map((post) => {
                    const tag = post.tag?.split(",")[0]?.trim()
                    const date = new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
                      timeZone: "UTC",
                      month: "short",
                      day: "numeric",
                    })
                    return (
                      <Link key={post.slugAsParams} href={post.slug} className="no-underline group">
                        <article className="flex items-start justify-between gap-6 py-3 border-b border-gray-200 dark:border-gray-800/50 last:border-0">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-[0.9375rem] font-semibold text-slate-900 dark:text-slate-100 group-hover:text-accent transition-colors duration-150 leading-snug">
                              {post.title}
                            </span>
                            {post.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-500 leading-snug">
                                {post.description}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 shrink-0 pt-0.5">
                            {tag && (
                              <span className="hidden md:inline font-mono text-[10px] tracking-[0.1em] uppercase text-gray-400 dark:text-gray-600">
                                {tag}
                              </span>
                            )}
                            <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600 tabular-nums">
                              {date}
                            </span>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Tag filter — vertical, right column */}
      <aside className="hidden sm:flex flex-col gap-2 pt-0.5 min-w-[56px]">
        <button
          onClick={() => setActiveTag(null)}
          className={`text-left font-mono text-[11px] tracking-wide transition-colors ${
            !activeTag
              ? "text-accent"
              : "text-gray-400 dark:text-gray-600 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          all
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(activeTag === t ? null : t)}
            className={`text-left font-mono text-[11px] tracking-wide transition-colors ${
              activeTag === t
                ? "text-accent"
                : "text-gray-400 dark:text-gray-600 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </aside>
    </div>
  )
}
