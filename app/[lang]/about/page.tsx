import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageIntro } from "@/components/post-blocks"
import { getDictionary, isLang } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import profile from "@/public/profile.jpg"

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

  return (
    <>
      <PageIntro title={t.about.title} />

      <section className="mb-20 flex flex-wrap items-start gap-x-16 gap-y-10">
        <div className="flex min-w-0 max-w-[68ch] flex-[1_1_480px] flex-col gap-10">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <nav aria-label="Social">
            <ul className="flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: site.social.linkedin },
                { label: "GitHub", href: site.social.github },
                { label: "X", href: site.social.x },
                { label: "YouTube", href: site.social.youtube },
                { label: "Credly", href: site.social.credly },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2 rounded-[10px] border border-line px-5 text-sm font-semibold text-fg transition-colors hover:border-muted"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-muted">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Image
          src={profile}
          alt={site.name}
          sizes="320px"
          className="aspect-[4/5] w-full min-w-0 max-w-[320px] flex-[0_1_320px] rounded-[20px] border border-line object-cover"
        />
      </section>
    </>
  )
}
