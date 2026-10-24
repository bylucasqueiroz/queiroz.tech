import type { Metadata } from "next"
import { defaultLang, htmlLang, locales, type Lang } from "@/lib/i18n"
import { COVER_HEIGHT, COVER_WIDTH } from "@/lib/covers"
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
  /** Share image; defaults to the profile image at /{lang}/opengraph-image. */
  image?: { url: string; alt: string }
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
  image = { url: `/${lang}/opengraph-image`, alt: site.name },
}: PageMetadataOptions): Metadata {
  const url = `/${lang}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    available.map((entry) => [htmlLang[entry], `/${entry}${path}`])
  )
  languages["x-default"] = `/${available.includes(defaultLang) ? defaultLang : lang}${path}`
  // Next drops file-based share images as soon as a page sets `openGraph`, so the image is always
  // listed explicitly. Posts pass their own opengraph-image route with the title as alt text.
  const images = { images: [{ ...image, width: COVER_WIDTH, height: COVER_HEIGHT, type: "image/png" }] }

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
  sameAs: [site.social.linkedin, site.social.github, site.social.x, site.social.youtube.split("?")[0], site.social.credly],
}
