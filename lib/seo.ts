import type { Metadata } from "next"
import { defaultLang, htmlLang, locales, type Lang } from "@/lib/i18n"
import { absoluteUrl, site } from "@/lib/site"

interface PageMetadataOptions {
  lang: Lang
  /** Path without the language prefix, e.g. "/blog" or "" for the home page. */
  path: string
  title?: string
  description: string
  /** Languages the page exists in; defaults to every locale. */
  available?: readonly Lang[]
  openGraph?: Metadata["openGraph"]
}

/**
 * Canonical, hreflang (with x-default) and Open Graph for a page. Next replaces
 * `openGraph` wholesale when a page sets it, so siteName/locale/url are filled in here
 * instead of relying on the layout.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
  available = locales,
  openGraph,
}: PageMetadataOptions): Metadata {
  const url = `/${lang}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    available.map((entry) => [htmlLang[entry], `/${entry}${path}`])
  )
  languages["x-default"] = `/${available.includes(defaultLang) ? defaultLang : lang}${path}`
  // Posts ship their own opengraph-image next to the route; every other page shares /{lang}/opengraph-image,
  // which Next drops as soon as a page sets `openGraph`, so it is listed explicitly.
  const isArticle = openGraph && "type" in openGraph && openGraph.type === "article"
  // An `images: undefined` key would also hide the post's own image, so the key is left out entirely.
  const images = isArticle ? {} : { images: [`/${lang}/opengraph-image`] }

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: htmlLang[lang].replace("-", "_"),
      url,
      title: title ?? site.name,
      description,
      ...images,
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title: title ?? site.name, description, ...images },
  }
}

/** schema.org Person for the author, shared by the home page and every post. */
export const personJsonLd = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  image: absoluteUrl("/profile.jpg"),
  sameAs: [site.social.linkedin, site.social.github, site.social.x, site.social.youtube.split("?")[0]],
}
