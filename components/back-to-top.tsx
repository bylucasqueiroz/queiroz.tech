"use client"

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="font-mono text-[11px] tracking-wide text-gray-400 dark:text-gray-600 hover:text-accent transition-colors"
    >
      ↑ top
    </button>
  )
}
