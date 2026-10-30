import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import GridBackdrop from "@/components/grid-backdrop"
import { getDictionary, htmlLang, isLang } from "@/lib/i18n"
import { pageMetadata, personJsonLd } from "@/lib/seo"
import { site } from "@/lib/site"
import profile from "@/public/profile.jpg"
import { getYouTubeVideos } from "@/lib/youtube"

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return {
    ...pageMetadata({ lang, path: "", description: t.home.bio, openGraph: { type: "profile" } }),
    title: { absolute: `${site.name} | ${t.home.title.replace(/\.$/, "")}` },
  }
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  const t = getDictionary(lang)
  const [latestVideo] = await getYouTubeVideos()

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: t.home.bio,
        inLanguage: htmlLang[lang],
        author: { "@id": personJsonLd["@id"] },
      },
    ],
  }

  return (
    <section className="flex flex-1 items-center py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GridBackdrop variant="full" />
      <div className="flex w-full flex-wrap items-center gap-x-[72px] gap-y-10">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col">
          <h1 className="mb-4 text-[clamp(44px,6vw,76px)] font-bold leading-[0.98] tracking-[-0.045em]">{site.name}</h1>
          <p className="mb-4 text-[clamp(20px,2.2vw,26px)] leading-snug text-fg">{t.home.title}</p>
          <p className="mb-8 max-w-[48ch] text-[17px] leading-relaxed text-muted">{t.home.bio}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${lang}/blog`} className="flex min-h-11 items-center gap-2 rounded-[10px] bg-fg px-5 text-sm font-semibold text-bg">
              {t.home.readBlog}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href={`/${lang}/about`} className="flex min-h-11 items-center rounded-[10px] border border-line bg-bg px-5 text-sm font-semibold text-fg hover:border-muted">
              {t.home.aboutMe}
            </Link>
          </div>

          <div className="my-8 h-px max-w-[520px] bg-line" />

          {latestVideo ? (
            <a
              href={latestVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex max-w-[520px] items-center gap-4 rounded-[14px] border border-line bg-bg p-2.5 pr-4 transition-colors hover:border-muted"
            >
              <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-black sm:w-40">
                <Image src={latestVideo.thumbnail} alt="" fill sizes="160px" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-[26px] w-9 items-center justify-center rounded-[7px] bg-black/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-[13px] font-semibold text-muted">{t.home.latestVideo}</span>
                <span className="line-clamp-2 text-[15px] font-semibold leading-snug text-fg">{latestVideo.title}</span>
                <span className="text-[13px] font-semibold text-accent">{t.home.watch}</span>
              </span>
            </a>
          ) : (
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent">
              {t.home.youtubeChannel} →
            </a>
          )}
        </div>

        <Image
          src={profile}
          alt={site.name}
          priority
          sizes="(min-width: 960px) 400px, 100vw"
          className="aspect-[4/5] w-full min-w-0 max-w-[400px] flex-[0_1_400px] rounded-[20px] border border-line object-cover"
        />
      </div>
    </section>
  )
}

