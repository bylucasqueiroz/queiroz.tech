import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CategoryNav, FollowBand, PageIntro, PostGrid } from "@/components/post-blocks"
import { getDictionary, isLang, locales } from "@/lib/i18n"
import { categories, getPostsByCategory, isCategory, type Category } from "@/lib/posts"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    (Object.keys(categories) as Category[])
      .filter((category) => getPostsByCategory(lang, category).length > 0)
      .map((category) => ({ lang, category }))
  )
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[category]">): Promise<Metadata> {
  const { lang, category } = await params
  if (!isLang(lang) || !isCategory(category)) return {}
  const label = categories[category].label
  return pageMetadata({
    lang,
    path: `/blog/${category}`,
    title: label,
    description: getDictionary(lang).blog.categoryDescription(label),
    available: locales.filter((entry) => getPostsByCategory(entry, category).length > 0),
  })
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/blog/[category]">) {
  const { lang, category } = await params
  if (!isLang(lang) || !isCategory(category)) notFound()

  const t = getDictionary(lang)

  return (
    <>
      <PageIntro
        breadcrumb={
          <>
            <Link href={`/${lang}/blog`} className="hover:text-fg">{t.blog.title}</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span className="text-fg">{categories[category].label}</span>
          </>
        }
        title={categories[category].label}
      >
        <CategoryNav lang={lang} active={category} />
      </PageIntro>

      <section className="pb-20">
        <PostGrid posts={getPostsByCategory(lang, category)} />
      </section>

      <FollowBand lang={lang} />
    </>
  )
}
