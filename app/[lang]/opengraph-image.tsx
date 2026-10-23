import { notFound } from "next/navigation"
import { isLang, locales } from "@/lib/i18n"
import { ogSize, renderOgProfile } from "@/lib/og-cover"
import { site } from "@/lib/site"

export const size = ogSize
export const contentType = "image/png"
export const alt = site.name

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return renderOgProfile(lang)
}
