"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinksProps {
  label: string
  links: { href: string; label: string }[]
}

export default function NavLinks({ label, links }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className="flex flex-wrap gap-1">
      {links.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`px-3 py-3 text-sm transition-colors ${
              active ? "font-semibold text-fg" : "font-medium text-muted hover:text-fg"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
