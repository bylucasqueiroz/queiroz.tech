import Link from "next/link"
import { getDictionary, type Lang } from "@/lib/i18n"
import { site } from "@/lib/site"
import NavLinks from "./nav-links"
import GlobalSearch, { type SearchPost } from "./global-search"
import LanguageSwitch from "./language-switch"
import ThemeToggle from "./theme-toggle"

interface SiteHeaderProps {
  lang: Lang
  searchPosts: SearchPost[]
}

export default function SiteHeader({ lang, searchPosts }: SiteHeaderProps) {
  const t = getDictionary(lang)

  return (
    <header className="relative border-b border-line">
      {/* On phones the menu drops to its own row so logo and tools share the first one. */}
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-1 px-6 py-3.5">
        <Link href={`/${lang}`} className="flex min-h-11 items-center gap-2.5 text-fg">
          <span className="flex size-8 items-center justify-center rounded-lg bg-fg text-xs font-bold text-bg">
            LQ
          </span>
          <span className="text-base font-semibold tracking-tight">{site.name}</span>
        </Link>
        <div className="order-3 -ml-3 w-full sm:order-none sm:ml-0 sm:w-auto">
          <NavLinks
            label={lang === "pt" ? "Principal" : "Main"}
            links={[
              { href: `/${lang}/blog`, label: t.nav.blog },
              { href: `/${lang}/series`, label: t.nav.series },
              { href: `/${lang}/about`, label: t.nav.about },
            ]}
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <GlobalSearch
            lang={lang}
            posts={searchPosts}
            labels={t.search}
          />
          <LanguageSwitch short={t.language.short} label={t.language.otherLabel} />
          <ThemeToggle label={t.theme.toggle} />
        </div>
      </div>
    </header>
  )
}
