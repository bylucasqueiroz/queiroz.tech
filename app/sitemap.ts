import type { MetadataRoute } from "next"
import { posts } from "@/.velite"
import { htmlLang, locales } from "@/lib/i18n"
import { categories, getPostsByCategory, getTranslation, type Category } from "@/lib/posts"
import { absoluteUrl } from "@/lib/site"

function bothLanguages(path: string) {
  return Object.fromEntries(locales.map((lang) => [htmlLang[lang], absoluteUrl(`/${lang}${path}`)]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/blog", "/series", "/about"]
  const categoryPaths = (Object.keys(categories) as Category[])
    .filter((category) => getPostsByCategory("pt", category).length > 0)
    .map((category) => `/blog/${category}`)

  const pages = [...staticPaths, ...categoryPaths].flatMap((path) =>
    locales.map((lang) => ({
      url: absoluteUrl(`/${lang}${path}`),
      alternates: { languages: bothLanguages(path) },
    }))
  )

  const postEntries = posts.map((post) => {
    const translation = getTranslation(post)
    const languages: Record<string, string> = { [htmlLang[post.lang]]: absoluteUrl(post.url) }
    if (translation) languages[htmlLang[translation.lang]] = absoluteUrl(translation.url)
    return { url: absoluteUrl(post.url), lastModified: post.date, alternates: { languages } }
  })

  return [...pages, ...postEntries]
}
