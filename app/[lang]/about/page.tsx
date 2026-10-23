import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx-components"
import { Avatar, PageIntro } from "@/components/post-blocks"
import { getDictionary, isLang } from "@/lib/i18n"
import { getPage } from "@/lib/posts"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata({
    lang,
    path: "/about",
    title: t.about.title,
    description: t.about.paragraphs[0],
    openGraph: { type: "profile" },
  })
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  const career = getPage("career")

  return (
    <>
      <PageIntro title={t.about.title} />

      <section className="flex flex-wrap gap-x-16 gap-y-10 border-b border-line pb-16">
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-5 text-lg leading-relaxed text-muted">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-4 rounded-2xl border border-line p-6">
          <div className="flex items-center gap-3">
            <Avatar size="lg" />
            <div className="text-lg font-semibold">{site.name}</div>
          </div>
          <nav aria-label="Social" className="flex flex-wrap gap-x-4 text-sm font-semibold">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="py-2 text-accent">LinkedIn</a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="py-2 text-accent">GitHub</a>
            <a href={site.social.x} target="_blank" rel="noopener noreferrer" className="py-2 text-accent">X</a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="py-2 text-accent">YouTube</a>
          </nav>
        </div>
      </section>

      {career && (
        <section aria-labelledby="experience" className="pb-20 pt-14">
          <h2 id="experience" className="mb-8 text-[32px] font-bold tracking-tight">{t.about.experience}</h2>
          <div className="prose prose-site max-w-[760px]">
            <Mdx content={career.content} lang={lang} />
          </div>
        </section>
      )}
    </>
  )
}
