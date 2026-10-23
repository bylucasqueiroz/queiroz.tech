"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface LanguageSwitchProps {
  short: string
  label: string
}

// Every page exists in both languages under the same path, so switching only
// swaps the locale segment.
export default function LanguageSwitch({ short, label }: LanguageSwitchProps) {
  const pathname = usePathname()
  const target = short.toLowerCase()
  const href = pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`)

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={label}
      title={label}
      className="flex h-11 min-w-11 items-center justify-center rounded-lg text-sm font-semibold text-muted transition-colors hover:text-fg"
    >
      {short}
    </Link>
  )
}
