"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/lib/i18n"

// not-found.tsx receives no params, so the language comes from the URL.
export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname.startsWith("/en") ? "en" : "pt"
  const copy = getDictionary(lang).notFound

  return (
    <section className="py-24">
      <p className="mb-4 text-sm font-semibold text-muted">404</p>
      <h1 className="mb-6 text-[clamp(32px,5vw,48px)] font-bold tracking-tight">{copy.title}</h1>
      <Link href={`/${lang}/blog`} className="font-semibold text-accent">
        {copy.back} →
      </Link>
    </section>
  )
}
