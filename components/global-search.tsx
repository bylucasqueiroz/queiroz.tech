"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"

export interface SearchPost {
  title: string
  description: string
  url: string
  category: string
  date: string
}

interface GlobalSearchProps {
  lang: string
  posts: SearchPost[]
  labels: {
    button: string
    label: string
    placeholder: string
    empty: string
    noResults: string
    navigate: string
    open: string
    close: string
  }
}

export default function GlobalSearch({ lang, posts, labels }: GlobalSearchProps) {
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
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [posts, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActiveIndex(0)
  }, [])

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

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function go(url: string) {
    router.push(url)
    close()
  }

  function onKeyDownInput(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].url)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.label}
        className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-[10px] border border-line bg-bg text-sm text-muted transition-colors hover:text-fg sm:pl-3 sm:pr-2.5"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">{labels.button}</span>
        <kbd className="hidden rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[11px] sm:inline">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]" onClick={close}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={labels.label}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-bg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <svg aria-hidden="true" className="size-4 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={onKeyDownInput}
                placeholder={labels.placeholder}
                aria-label={labels.label}
                className="flex-1 bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
              />
            </div>

            <div className="max-h-80 overflow-y-auto">
              {query.trim() === "" ? (
                <p className="px-4 py-8 text-center text-xs text-muted">{labels.empty}</p>
              ) : results.length === 0 ? (
                <p className="px-4 py-8 text-center text-xs text-muted">
                  {labels.noResults} <span className="text-fg">&ldquo;{query}&rdquo;</span>
                </p>
              ) : (
                <ul>
                  {results.map((post, i) => (
                    <li key={post.url}>
                      <button
                        type="button"
                        className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left transition-colors ${
                          i === activeIndex ? "bg-surface" : ""
                        }`}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => go(post.url)}
                      >
                        <span className={`text-sm font-semibold leading-snug ${i === activeIndex ? "text-accent" : "text-fg"}`}>
                          {highlight(post.title, query)}
                        </span>
                        <span className="line-clamp-1 text-xs text-muted">{highlight(post.description, query)}</span>
                        <span className="mt-0.5 text-xs text-muted">
                          {post.category} ·{" "}
                          {new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
                            timeZone: "UTC",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {results.length > 0 && (
              <div className="flex items-center gap-3 border-t border-line px-4 py-2 text-[11px] text-muted">
                <span><kbd className="font-mono">↑↓</kbd> {labels.navigate}</span>
                <span><kbd className="font-mono">↵</kbd> {labels.open}</span>
                <span><kbd className="font-mono">esc</kbd> {labels.close}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded-sm bg-accent/20 px-0.5 text-accent">
        {part}
      </mark>
    ) : (
      part
    )
  )
}
