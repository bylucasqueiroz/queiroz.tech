"use client"

import Link from "next/link"
import { useLang } from "./language-provider"
import { t } from "@/lib/i18n"

interface PostHeaderProps {
  title: string
  description?: string
  date: string
  tag?: string
}

export default function PostHeader({ title, description, date, tag }: PostHeaderProps) {
  const { lang } = useLang()
  const formattedDate = new Date(date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const tags = tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []

  return (
    <header className="pt-12 pb-10 border-b border-gray-200 dark:border-gray-800 mb-10 not-prose">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600 hover:text-accent transition-colors no-underline mb-8 group"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span>
        {t[lang].postHeader.back}
      </Link>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-[1.75rem] font-bold tracking-[-0.03em] text-slate-900 dark:text-slate-50 leading-snug mb-3">
        {title}
      </h1>

      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-[1.8] mb-5">
          {description}
        </p>
      )}

      <div className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
        <time dateTime={date}>{formattedDate}</time>
      </div>
    </header>
  )
}
