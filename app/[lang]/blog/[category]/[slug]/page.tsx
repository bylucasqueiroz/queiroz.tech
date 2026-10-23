import "katex/dist/katex.min.css"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Cover from "@/components/cover"
import { Mdx } from "@/components/mdx-components"
import { Avatar, PostGrid, categoryText } from "@/components/post-blocks"
import ShareLinks from "@/components/share-links"
import { getDictionary, htmlLang, isLang, type Lang } from "@/lib/i18n"
import {
  categoryLabel,
  formatDate,
  getPost,
  getRelated,
  getSeries,
  getTranslation,
  posts,
} from "@/lib/posts"
import { personJsonLd, pageMetadata } from "@/lib/seo"
import { absoluteUrl, site } from "@/lib/site"

type Params = PageProps<"/[lang]/blog/[category]/[slug]">["params"]

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ lang: post.lang, category: post.category, slug: post.slug }))
}

async function loadPost(params: Params) {
  const { lang, category, slug } = await params
  if (!isLang(lang)) notFound()
  const post = getPost(lang, category, slug)
  if (!post) notFound()
  return post
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await loadPost(params)
  const translation = getTranslation(post)
  return pageMetadata({
    lang: post.lang,
    path: `/blog/${post.category}/${post.slug}`,
    title: post.title,
    description: post.description,
    available: translation ? [post.lang, translation.lang] : [post.lang],
    openGraph: { type: "article", publishedTime: post.date, authors: [site.name], tags: post.tags },
  })
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await loadPost(params)
  const lang: Lang = post.lang
  const t = getDictionary(lang)
  const translation = getTranslation(post)
  const series = getSeries(lang, post.series)
  const seriesIndex = series ? series.posts.findIndex((entry) => entry.url === post.url) : -1
  const previous = series && seriesIndex > 0 ? series.posts[seriesIndex - 1] : null
  const next = series && seriesIndex < series.posts.length - 1 ? series.posts[seriesIndex + 1] : null
  const related = getRelated(post)
  const toc = post.toc

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: htmlLang[lang],
    url: absoluteUrl(post.url),
    image: absoluteUrl(`${post.url}/opengraph-image`),
    keywords: post.tags.join(", "),
    mainEntityOfPage: absoluteUrl(post.url),
    author: personJsonLd,
    publisher: { "@id": personJsonLd["@id"] },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="pb-8 pt-12">
        <nav aria-label={t.post.breadcrumb} className="mb-6 flex flex-wrap gap-2 text-sm text-muted">
          <Link href={`/${lang}/blog`} className="hover:text-fg">{t.blog.title}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/blog/${post.category}`} className={categoryText[post.category] ?? "text-accent"}>
            {categoryLabel(post.category)}
          </Link>
          {series && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/${lang}/series#${series.id}`} className="hover:text-fg">{series.title}</Link>
            </>
          )}
        </nav>
        <h1 className="mb-[18px] max-w-[900px] text-[clamp(34px,4.6vw,54px)] font-bold leading-[1.06] tracking-[-0.035em]">{post.title}</h1>
        <p className="mb-7 max-w-[62ch] text-xl leading-normal text-muted">{post.description}</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar />
            <div className="flex flex-col gap-0.5">
              <Link href={`/${lang}/about`} className="text-[15px] font-semibold text-fg">{site.name}</Link>
              <span className="text-sm text-muted">
                <time dateTime={post.date}>{formatDate(post.date, lang, "long")}</time> ·{" "}
                {t.post.readingTime(post.metadata.readingTime)}
              </span>
            </div>
          </div>
          <ShareLinks
            url={absoluteUrl(post.url)}
            title={post.title}
            labels={{ share: t.post.share, copyLink: t.post.copyLink, copied: t.post.copied }}
          />
        </div>
      </header>

      <Cover motif={post.motif} category={post.category} lang={lang} variant="thumb" className="mb-14 rounded-[18px] border border-line" />

      <div className="pb-[72px] lg:grid lg:grid-cols-[minmax(0,720px)_260px] lg:justify-between lg:gap-16">
        <div className="min-w-0">
          {toc.length > 0 && (
            <details className="mb-8 rounded-xl border border-line px-4 py-3 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-muted">
                {t.post.onThisPage}
              </summary>
              <TocList items={toc} />
            </details>
          )}

          <div className="prose prose-lg prose-site max-w-none">
            <Mdx content={post.content} lang={lang} />
          </div>

          {post.tags.length > 0 && (
            <div className="mb-8 mt-12 flex flex-wrap gap-2 border-t border-line pt-7">
              <span className="py-1.5 pr-1 text-sm text-muted">{t.post.tags}</span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1.5 text-[13px] text-fg">{tag}</span>
              ))}
            </div>
          )}

          {series && (
            <nav aria-label={series.title} className="mb-8 flex flex-wrap gap-3">
              {previous ? (
                <Link href={previous.url} className="flex flex-[1_1_260px] flex-col gap-1.5 rounded-[14px] border border-line px-5 py-[18px] text-fg hover:border-accent">
                  <span className="text-[13px] text-muted">{t.post.previousInSeries}</span>
                  <span className="text-base font-semibold leading-snug">{previous.title}</span>
                </Link>
              ) : (
                <SeriesNote label={series.title} text={t.post.firstInSeries} />
              )}
              {next ? (
                <Link href={next.url} className="flex flex-[1_1_260px] flex-col gap-1.5 rounded-[14px] border border-line px-5 py-[18px] text-right text-fg hover:border-accent">
                  <span className="text-[13px] text-muted">{t.post.nextInSeries}</span>
                  <span className="text-base font-semibold leading-snug">{next.title}</span>
                </Link>
              ) : (
                <SeriesNote
                  label={series.title}
                  text={`${t.post.lastInSeries} · ${t.series.position(seriesIndex + 1, series.posts.length)}`}
                  alignRight
                />
              )}
            </nav>
          )}

          <section aria-label={t.post.writtenBy} className="flex flex-wrap gap-5 rounded-2xl border border-line p-6">
            <Avatar size="lg" />
            <div className="min-w-0 flex-[1_1_260px]">
              <div className="mb-0.5 text-[13px] text-muted">{t.post.writtenBy}</div>
              <div className="mb-2.5 text-lg font-semibold">{site.name}</div>
              <p className="mb-3 text-[15px] leading-relaxed text-muted">{t.home.bio}</p>
              <div className="flex gap-4 text-sm font-semibold">
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="py-1.5 text-accent">LinkedIn</a>
                <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="py-1.5 text-accent">GitHub</a>
                <Link href={`/${lang}/about`} className="py-1.5 text-accent">{t.nav.about}</Link>
              </div>
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 flex flex-col gap-7">
            {toc.length > 0 && (
              <nav aria-labelledby="toc-title">
                <h2 id="toc-title" className="mb-3.5 text-sm font-semibold text-muted">
                  {t.post.onThisPage}
                </h2>
                <TocList items={toc} />
              </nav>
            )}
            {series && (
              <div className="rounded-[14px] border border-line bg-surface p-5">
                <div className="mb-2 text-sm font-semibold text-cat-sd">
                  {t.series.label} · {t.series.position(seriesIndex + 1, series.posts.length)}
                </div>
                <div className="mb-3 font-semibold">{series.title}</div>
                <ol className="flex flex-col gap-2 text-sm leading-snug">
                  {series.posts.map((entry, i) => (
                    <li key={entry.url}>
                      {entry.url === post.url ? (
                        <span aria-current="page" className="font-semibold text-fg">
                          {String(i + 1).padStart(2, "0")} · {entry.title}
                        </span>
                      ) : (
                        <Link href={entry.url} className="text-muted hover:text-fg">
                          {String(i + 1).padStart(2, "0")} · {entry.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {translation && (
              <Link href={translation.url} hrefLang={translation.lang} className="py-2 text-sm font-semibold text-accent">
                {t.language.otherLabel} →
              </Link>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line pb-20 pt-14">
          <h2 id="related" className="mb-7 text-[26px] font-bold tracking-tight">{t.post.related}</h2>
          <PostGrid posts={related} />
        </section>
      )}
    </article>
  )
}

function TocList({ items }: { items: { title: string; url: string }[] }) {
  return (
    <ol className="mt-2 flex flex-col">
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url} className="flex items-start gap-2.5 py-[7px] text-sm leading-snug text-muted hover:text-fg">
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

function SeriesNote({ label, text, alignRight = false }: { label: string; text: string; alignRight?: boolean }) {
  return (
    <div className={`flex flex-[1_1_260px] flex-col gap-1.5 rounded-[14px] bg-surface px-5 py-[18px] ${alignRight ? "text-right" : ""}`}>
      <span className="text-[13px] text-muted">{label}</span>
      <span className="text-base font-semibold leading-snug">{text}</span>
    </div>
  )
}
