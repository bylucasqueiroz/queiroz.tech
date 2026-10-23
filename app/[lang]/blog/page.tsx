import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CategoryNav,
  FeaturedSection,
  FollowBand,
  PageIntro,
  PostGrid,
  SectionLabel,
  SeriesBand,
} from "@/components/post-blocks"
import { getDictionary, isLang } from "@/lib/i18n"
import { getAllSeries, getPosts } from "@/lib/posts"
import { pageMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata({ lang, path: "/blog", title: t.blog.title, description: t.blog.description })
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  const t = getDictionary(lang)
  const [lead, ...rest] = getPosts(lang)

  return (
    <>
      <PageIntro
        breadcrumb={
          <>
            <Link href={`/${lang}`} className="hover:text-fg">{t.nav.home}</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span className="text-fg">{t.blog.title}</span>
          </>
        }
        title={t.blog.title}
        description={t.blog.description}
      >
        <CategoryNav lang={lang} />
      </PageIntro>

      {lead && <FeaturedSection lead={lead} side={rest.slice(0, 3)} label={t.blog.featured} />}

      {getAllSeries(lang).map((entry) => (
        <SeriesBand key={entry.id} lang={lang} id={entry.id} />
      ))}

      {rest.length > 3 && (
        <section aria-labelledby="more" className="pb-20">
          <SectionLabel id="more">{t.blog.more}</SectionLabel>
          <PostGrid posts={rest.slice(3)} />
        </section>
      )}

      <FollowBand lang={lang} />
    </>
  )
}
