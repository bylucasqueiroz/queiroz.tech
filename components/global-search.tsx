"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"

interface PostMeta {
  title: string
  description?: string
  slug: string
  slugAsParams: string
  tag?: string
  date: string
}

interface GlobalSearchProps {
  posts: PostMeta[]
}

export default function GlobalSearch({ posts }: GlobalSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tag?.toLowerCase().includes(q)
    )
  }, [posts, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActiveIndex(0)
  }, [])

  // Keyboard shortcut to open
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [close])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0)
  }, [results])

  function onKeyDownInput(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && results[activeIndex]) {
      router.push(results[activeIndex].slug)
      close()
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search posts"
        className="group flex items-center gap-2 h-8 pl-2.5 pr-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D1117] text-gray-400 dark:text-gray-600 hover:border-accent/50 hover:text-gray-500 dark:hover:text-gray-400 transition-all"
      >
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-600 pr-1">
          Search
        </span>
        <kbd className="hidden sm:inline-flex items-center text-[10px] font-sans px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 leading-none tracking-tight">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Search posts…"
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {query.trim() === "" ? (
                <p className="px-4 py-8 text-center text-xs text-gray-400 dark:text-gray-600">
                  Type to search posts…
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-8 text-center text-xs text-gray-400 dark:text-gray-600">
                  No results for <span className="text-slate-600 dark:text-slate-400">"{query}"</span>
                </p>
              ) : (
                <ul>
                  {results.map((post, i) => {
                    const tags = post.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []
                    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    return (
                      <li key={post.slugAsParams}>
                        <button
                          className={`w-full text-left px-4 py-3 transition-colors flex items-start gap-3 ${
                            i === activeIndex
                              ? "bg-subtle"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/40"
                          }`}
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => { router.push(post.slug); close() }}
                        >
                          <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium leading-snug mb-0.5 ${i === activeIndex ? "text-accent" : "text-slate-800 dark:text-slate-200"}`}>
                              {highlight(post.title, query)}
                            </p>
                            {post.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
                                {highlight(post.description, query)}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {tags.slice(0, 2).map((t) => (
                                <span key={t} className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
                                  #{t}
                                </span>
                              ))}
                              <span className="text-[10px] text-gray-400 dark:text-gray-600">{formattedDate}</span>
                            </div>
                          </div>
                          {i === activeIndex && (
                            <kbd className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 self-center">
                              ↵
                            </kbd>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 text-[10px] text-gray-400 dark:text-gray-600">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> open</span>
                <span><kbd className="font-mono">esc</kbd> close</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const parts = text.split(
    new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  )
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
