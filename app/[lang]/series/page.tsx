import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageIntro, PostGrid } from "@/components/post-blocks"
import { getDictionary, isLang } from "@/lib/i18n"
import { getAllSeries } from "@/lib/posts"
import { pageMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[lang]/series">): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata({ lang, path: "/series", title: t.series.title, description: t.series.description })
}

export default async function SeriesPage({ params }: PageProps<"/[lang]/series">) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <>
      <PageIntro title={t.series.title} description={t.series.description} />
      {getAllSeries(lang).map((entry) => (
        <section key={entry.id} id={entry.id} aria-labelledby={`${entry.id}-title`} className="scroll-mt-6 border-t border-line pb-20 pt-10">
          <span className="text-sm font-semibold text-cat-sd">
            {t.series.label} · {t.series.articles(entry.posts.length)}
          </span>
          <h2 id={`${entry.id}-title`} className="mb-3 mt-2.5 text-[32px] font-bold leading-tight tracking-tight">
            {entry.title}
          </h2>
          <p className="mb-10 max-w-[60ch] text-[17px] leading-relaxed text-muted">{entry.description}</p>
          <PostGrid posts={entry.posts} />
        </section>
      ))}
    </>
  )
}
