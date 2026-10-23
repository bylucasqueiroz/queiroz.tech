import Link from "next/link"
import { getDictionary, type Lang } from "@/lib/i18n"
import { site } from "@/lib/site"

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = getDictionary(lang)
  const linkClass = "py-3 text-muted transition-colors hover:text-fg"

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 pb-12 pt-6 text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <nav aria-label={lang === "pt" ? "Rodapé" : "Footer"} className="flex flex-wrap gap-x-5">
          <Link href={`/${lang}/blog`} className={linkClass}>{t.nav.blog}</Link>
          <Link href={`/${lang}/about`} className={linkClass}>{t.nav.about}</Link>
          <a href={`/${lang}/feed.xml`} className={linkClass}>RSS</a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
        </nav>
      </div>
    </footer>
  )
}
