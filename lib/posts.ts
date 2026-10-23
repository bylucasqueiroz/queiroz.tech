import { posts as allPosts } from "@/.velite"
import { dateLocale, type Lang } from "@/lib/i18n"

export type Post = (typeof allPosts)[number]

/** Drafts (`draft: true`) show up in `bun run dev` only; production builds leave them out. */
export const posts = allPosts.filter((post) => !post.draft || process.env.NODE_ENV !== "production")

export const categories = {
  "system-design": { label: "System Design" },
  go: { label: "Go" },
  dotnet: { label: ".NET" },
} as const

export type Category = keyof typeof categories

export function isCategory(value: string): value is Category {
  return value in categories
}

export function categoryLabel(category: string) {
  return isCategory(category) ? categories[category].label : category
}

export const series = {
  resilience: {
    title: { pt: "Resiliência na prática", en: "Resilience in practice" },
    description: {
      pt: "Como sistemas distribuídos lidam com falhas, de retries a circuit breakers, e quando é hora de parar de insistir.",
      en: "How distributed systems deal with failure, from retries to circuit breakers, and when it is time to stop insisting.",
    },
  },
} as const

export type SeriesId = keyof typeof series

function isSeriesId(value: string | undefined): value is SeriesId {
  return value !== undefined && value in series
}

const byDateDesc = (a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()

export function getPosts(lang: Lang) {
  return posts.filter((post) => post.lang === lang).sort(byDateDesc)
}

export function getPostsByCategory(lang: Lang, category: Category) {
  return getPosts(lang).filter((post) => post.category === category)
}

export function getPost(lang: Lang, category: string, slug: string) {
  return posts.find((post) => post.lang === lang && post.category === category && post.slug === slug)
}

/** Posts are paired across languages by sharing the same category and slug. */
export function getTranslation(post: Post) {
  const other: Lang = post.lang === "pt" ? "en" : "pt"
  return getPost(other, post.category, post.slug)
}

/**
 * Pages in `lang` that have no counterpart in the other language, mapped to the closest page that
 * does: an untranslated post goes to its category (or the blog), a category with no posts there
 * goes to the blog. The language switch uses this instead of sending people to a 404.
 */
export function getLanguageFallbacks(lang: Lang): Record<string, string> {
  const other: Lang = lang === "pt" ? "en" : "pt"
  const hasCategory = (category: Category) => getPostsByCategory(other, category).length > 0
  const fallbacks: Record<string, string> = {}

  for (const category of Object.keys(categories) as Category[]) {
    if (getPostsByCategory(lang, category).length > 0 && !hasCategory(category)) {
      fallbacks[`/${lang}/blog/${category}`] = `/${other}/blog`
    }
  }
  for (const post of getPosts(lang)) {
    if (getTranslation(post)) continue
    fallbacks[post.url] =
      isCategory(post.category) && hasCategory(post.category) ? `/${other}/blog/${post.category}` : `/${other}/blog`
  }
  return fallbacks
}

export function getSeries(lang: Lang, id: string | undefined) {
  if (!isSeriesId(id)) return null
  const items = posts
    .filter((post) => post.lang === lang && post.series === id)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
  return {
    id,
    title: series[id].title[lang],
    description: series[id].description[lang],
    posts: items,
  }
}

export function getAllSeries(lang: Lang) {
  return (Object.keys(series) as SeriesId[])
    .map((id) => getSeries(lang, id))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null && entry.posts.length > 0)
}

/** Same series first, then same category, then everything else, newest first within each group. */
export function getRelated(post: Post, limit = 3) {
  const rank = (candidate: Post) =>
    post.series && candidate.series === post.series ? 0 : candidate.category === post.category ? 1 : 2
  return getPosts(post.lang)
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => rank(a) - rank(b) || byDateDesc(a, b))
    .slice(0, limit)
}

export function getCategoryCounts(lang: Lang) {
  const all = getPosts(lang)
  return (Object.keys(categories) as Category[])
    .map((category) => ({
      category,
      label: categories[category].label,
      count: all.filter((post) => post.category === category).length,
    }))
    .filter((entry) => entry.count > 0)
}

export function formatDate(date: string, lang: Lang, style: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString(dateLocale[lang], {
    timeZone: "UTC",
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  })
}
