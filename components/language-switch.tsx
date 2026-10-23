"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface LanguageSwitchProps {
  short: string
  label: string
  /** Label used when the current page has no translation and the link goes to `fallbacks` instead. */
  unavailableLabel: string
  /** Pages with no counterpart in the other language → where to send the visitor instead. */
  fallbacks: Record<string, string>
}

// Pages share the same path in both languages, so switching normally only swaps the
// locale segment. Untranslated posts (and categories) use the fallback map instead of a 404.
export default function LanguageSwitch({ short, label, unavailableLabel, fallbacks }: LanguageSwitchProps) {
  const pathname = usePathname()
  const target = short.toLowerCase()
  const fallback = fallbacks[pathname.replace(/\/$/, "")]
  const href = fallback ?? pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`)
  const title = fallback ? unavailableLabel : label

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={title}
      title={title}
      className="flex h-11 min-w-11 items-center justify-center rounded-lg text-sm font-semibold text-muted transition-colors hover:text-fg"
    >
      {short}
    </Link>
  )
}
