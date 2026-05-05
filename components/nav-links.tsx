"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLang } from "./language-provider"
import { t } from "@/lib/i18n"

export default function NavLinks() {
  const pathname = usePathname()
  const { lang } = useLang()

  const links = [
    { href: "/", label: t[lang].nav.home },
    { href: "/about", label: t[lang].nav.about },
  ]

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors no-underline ${
              active
                ? "text-accent bg-subtle"
                : "text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-gray-100 dark:hover:bg-gray-800/60"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
