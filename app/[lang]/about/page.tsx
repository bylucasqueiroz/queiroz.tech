import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Avatar, PageIntro } from "@/components/post-blocks"
import { getDictionary, isLang } from "@/lib/i18n"
import { career } from "@/lib/career"
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
  const data = career[lang]

  return (
    <>
      <PageIntro title={t.about.title} />

      <section className="flex flex-wrap gap-x-16 gap-y-10 border-b border-line pb-16">
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-5 text-lg leading-relaxed text-muted">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-4 self-start rounded-2xl border border-line p-6">
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

      <section aria-labelledby="experience" className="pb-16 pt-14">
        <h2 id="experience" className="mb-10 text-[32px] font-bold tracking-tight">{t.about.experience}</h2>
        <ol className="flex flex-col">
          {data.experience.map((job) => (
            <li key={job.company} className="grid gap-x-12 gap-y-3 border-t border-line py-8 md:grid-cols-[240px_minmax(0,1fr)]">
              <div>
                <h3 className="text-lg font-semibold">{job.company}</h3>
                <p className="text-sm text-muted">{job.location}</p>
              </div>
              <div className="flex max-w-[760px] flex-col gap-6">
                {job.roles.map((role) => (
                  <div key={role.title}>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="font-semibold">{role.title}</h4>
                      <span className="text-sm tabular-nums text-muted">{role.period}</span>
                    </div>
                    {role.highlights.length > 0 && (
                      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-muted marker:text-line">
                        {role.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-20 grid gap-x-12 gap-y-10 border-t border-line pt-10 md:grid-cols-3">
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted">{t.about.education}</h2>
          {data.education.map((entry) => (
            <div key={entry.school}>
              <div className="font-semibold">{entry.school}</div>
              <div className="text-[15px] text-muted">{entry.degree}</div>
              <div className="text-sm tabular-nums text-muted">{entry.period}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted">{t.about.certifications}</h2>
          <ul className="flex flex-col gap-1 text-[15px]">
            {data.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted">{t.about.awards}</h2>
          <ul className="flex flex-col gap-1 text-[15px]">
            {data.awards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
