import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import GridBackdrop from "@/components/grid-backdrop"
import { getDictionary, htmlLang, isLang } from "@/lib/i18n"
import { pageMetadata, personJsonLd } from "@/lib/seo"
import { site } from "@/lib/site"
import profile from "@/public/profile.jpg"

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
    <section className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GridBackdrop variant="full" />
      <Image
        src={profile}
        alt={site.name}
        priority
        placeholder="blur"
        sizes="112px"
        className="mb-8 size-24 rounded-full border border-line object-cover sm:size-28"
      />
      <h1 className="mb-4 text-[clamp(48px,8vw,96px)] font-bold leading-[0.98] tracking-[-0.045em]">{site.name}</h1>
      <p className="mb-5 text-[clamp(20px,2.6vw,30px)] leading-snug text-fg">{t.home.title}</p>
      <p className="mb-10 max-w-[52ch] text-lg leading-relaxed text-muted">{t.home.bio}</p>
      <div className="flex flex-wrap justify-center gap-3">
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
    </section>
  )
}
