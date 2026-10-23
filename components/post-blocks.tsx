import Image from "next/image"
import Link from "next/link"
import Cover from "./cover"
import GridBackdrop from "./grid-backdrop"
import { getDictionary, type Lang } from "@/lib/i18n"
import { categoryLabel, formatDate, getCategoryCounts, getSeries, type Post } from "@/lib/posts"
import { site } from "@/lib/site"
import profile from "@/public/profile.jpg"

export const categoryText: Record<string, string> = {
  "system-design": "text-cat-sd",
  go: "text-cat-go",
  dotnet: "text-cat-dotnet",
}

const categoryDot: Record<string, string> = {
  "system-design": "bg-cat-sd",
  go: "bg-cat-go",
  dotnet: "bg-cat-dotnet",
}

export function SectionLabel({ id, children, action }: { id?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <h2 id={id} className="text-sm font-semibold text-muted">
        {children}
      </h2>
      <span className="h-px flex-1 bg-line" />
      {action}
    </div>
  )
}

export function CategoryLabel({ category, className = "" }: { category: string; className?: string }) {
  return (
    <span className={`text-sm font-semibold ${categoryText[category] ?? "text-accent"} ${className}`}>
      {categoryLabel(category)}
    </span>
  )
}

const avatarSizes = { sm: 28, md: 40, lg: 56 }

export function Avatar({ size = "md" }: { size?: keyof typeof avatarSizes }) {
  const px = avatarSizes[size]
  // Decorative: the author's name is always rendered next to it.
  return (
    <Image
      src={profile}
      alt=""
      width={px}
      height={px}
      className="shrink-0 rounded-full border border-line object-cover"
      style={{ width: px, height: px }}
    />
  )
}

/** Grid card: cover, category, title, description, date. */
export function PostCard({ post }: { post: Post }) {
  const t = getDictionary(post.lang)
  return (
    <Link href={post.url} className="group flex min-w-0 flex-col gap-3.5">
      <Cover
        motif={post.motif}
        category={post.category}
        lang={post.lang}
        className="rounded-xl border border-line transition-transform duration-300 group-hover:scale-[1.01]"
      />
      <CategoryLabel category={post.category} />
      <span className="text-[21px] font-bold leading-tight tracking-tight text-fg group-hover:text-accent">
        {post.title}
      </span>
      <span className="text-[15px] leading-relaxed text-muted">{post.description}</span>
      <span className="text-[13px] text-muted">
        {formatDate(post.date, post.lang)} · {t.post.readingTime(post.metadata.readingTime)}
      </span>
    </Link>
  )
}

/** Compact row with a small cover, used beside the featured post. */
export function PostRow({ post }: { post: Post }) {
  return (
    <Link href={post.url} className="group flex items-start gap-4 border-b border-line pb-5">
      <div className="w-[136px] shrink-0">
        <Cover motif={post.motif} category={post.category} lang={post.lang} variant="thumb" className="rounded-[10px] border border-line" />
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <CategoryLabel category={post.category} />
        <span className="text-base font-semibold leading-snug tracking-tight text-fg group-hover:text-accent">
          {post.title}
        </span>
        <span className="text-[13px] text-muted">
          {formatDate(post.date, post.lang)} · {post.metadata.readingTime} min
        </span>
      </div>
    </Link>
  )
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-12">
      {posts.map((post) => (
        <PostCard key={post.url} post={post} />
      ))}
    </div>
  )
}

export function FeaturedSection({ lead, side, label }: { lead: Post; side: Post[]; label: string }) {
  const t = getDictionary(lead.lang)
  const leadSeries = getSeries(lead.lang, lead.series)

  return (
    <section aria-labelledby="featured" className="pb-16 pt-2">
      <SectionLabel id="featured">{label}</SectionLabel>
      <div className="flex flex-wrap gap-10">
        <Link href={lead.url} className="group flex min-w-0 flex-[999_1_560px] flex-col gap-5">
          <Cover motif={lead.motif} category={lead.category} lang={lead.lang} className="rounded-2xl border border-line" />
          <div className="flex flex-col gap-3">
            <span className={`text-sm font-semibold ${categoryText[lead.category] ?? "text-accent"}`}>
              {categoryLabel(lead.category)}
              {leadSeries && ` · ${leadSeries.title}`}
            </span>
            <span className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-tight text-fg group-hover:text-accent">
              {lead.title}
            </span>
            <span className="max-w-[60ch] text-[17px] leading-relaxed text-muted">{lead.description}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted">
              <Avatar size="sm" />
              <span className="font-semibold text-fg">{site.name}</span>
              <span>
                {formatDate(lead.date, lead.lang)} · {t.post.readingTime(lead.metadata.readingTime)}
              </span>
            </span>
          </div>
        </Link>
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
          {side.map((post) => (
            <PostRow key={post.url} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function SeriesBand({ lang, id }: { lang: Lang; id: string }) {
  const t = getDictionary(lang)
  const entry = getSeries(lang, id)
  if (!entry || entry.posts.length === 0) return null

  return (
    <section
      aria-labelledby={`series-${id}`}
      className="mb-[72px] flex flex-wrap items-center gap-8 rounded-[20px] border border-line bg-surface p-8"
    >
      <div className="min-w-0 flex-[1_1_280px]">
        <span className="text-sm font-semibold text-cat-sd">
          {t.series.label} · {t.series.articles(entry.posts.length)}
        </span>
        <h2 id={`series-${id}`} className="my-2.5 text-[28px] font-bold leading-tight tracking-tight">
          {entry.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-muted">{entry.description}</p>
      </div>
      <ol className="flex min-w-0 flex-[2_1_520px] flex-wrap gap-3">
        {entry.posts.map((post, i) => (
          <li key={post.url} className="min-w-0 flex-[1_1_180px]">
            <Link
              href={post.url}
              className="flex h-full flex-col gap-2.5 rounded-[14px] border border-line bg-bg p-[18px] text-fg transition-colors hover:border-accent"
            >
              <span className="text-[22px] font-semibold tabular-nums text-cat-sd">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] font-semibold leading-snug">{post.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function CategoryNav({ lang, active }: { lang: Lang; active?: string }) {
  const t = getDictionary(lang)
  const counts = getCategoryCounts(lang)
  const total = counts.reduce((sum, entry) => sum + entry.count, 0)
  const base = "flex min-h-11 items-center gap-2 rounded-full px-[18px] text-sm"
  const on = `${base} bg-fg font-semibold text-bg`
  const off = `${base} border border-line font-medium text-fg hover:border-muted`

  return (
    <nav aria-label={t.blog.categories} className="flex flex-wrap gap-2">
      <Link href={`/${lang}/blog`} aria-current={!active ? "page" : undefined} className={!active ? on : off}>
        {t.blog.all} <span className="text-xs tabular-nums opacity-70">{total}</span>
      </Link>
      {counts.map(({ category, label, count }) => (
        <Link
          key={category}
          href={`/${lang}/blog/${category}`}
          aria-current={active === category ? "page" : undefined}
          className={active === category ? on : off}
        >
          <span aria-hidden="true" className={`size-2 rounded-[2px] ${categoryDot[category] ?? "bg-accent"}`} />
          {label}
          <span className="text-xs tabular-nums opacity-70">{count}</span>
        </Link>
      ))}
    </nav>
  )
}

export function FollowBand({ lang }: { lang: Lang }) {
  const t = getDictionary(lang)
  return (
    <section className="mb-20 flex flex-wrap items-center justify-between gap-6 border-y border-line py-10">
      <div className="min-w-0 flex-[1_1_320px]">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">{t.follow.title}</h2>
        <p className="text-[15px] text-muted">{t.follow.description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={`/${lang}/feed.xml`} className="flex min-h-11 items-center gap-2 rounded-[10px] bg-fg px-5 text-sm font-semibold text-bg">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1.5" />
          </svg>
          {t.follow.rss}
        </a>
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center rounded-[10px] border border-line px-5 text-sm font-semibold text-fg"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export function PageIntro({
  breadcrumb,
  title,
  description,
  children,
}: {
  breadcrumb?: React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <section className="pb-10 pt-14">
      <GridBackdrop variant="top" />
      {breadcrumb && <div className="mb-5 text-sm text-muted">{breadcrumb}</div>}
      <h1 className="mb-4 text-[clamp(40px,6vw,64px)] font-bold leading-none tracking-[-0.035em]">{title}</h1>
      {description && <p className="mb-8 max-w-[60ch] text-lg leading-relaxed text-muted">{description}</p>}
      {children}
    </section>
  )
}
