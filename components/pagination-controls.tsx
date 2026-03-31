"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const searchParams = useSearchParams()
  const tag = searchParams.get("tag") ?? ""

  function buildHref(page: number) {
    const params = new URLSearchParams()
    if (tag) params.set("tag", tag)
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    return `/posts${qs ? `?${qs}` : ""}`
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#4493F8] transition-colors no-underline"
        >
          ← Previous
        </Link>
      ) : (
        <span />
      )}

      <span className="text-xs font-mono text-gray-400 dark:text-gray-600">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#4493F8] transition-colors no-underline"
        >
          Next →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
