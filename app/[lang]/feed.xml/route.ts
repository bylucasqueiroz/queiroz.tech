import { getDictionary, htmlLang, isLang, locales } from "@/lib/i18n"
import { getPosts } from "@/lib/posts"
import { absoluteUrl, site } from "@/lib/site"

export const dynamic = "force-static"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

export async function GET(_request: Request, { params }: RouteContext<"/[lang]/feed.xml">) {
  const { lang } = await params
  if (!isLang(lang)) return new Response("Not found", { status: 404 })

  const t = getDictionary(lang)
  const posts = getPosts(lang)
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${absoluteUrl(post.url)}</link>
      <guid>${absoluteUrl(post.url)}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${absoluteUrl(`/${lang}/blog`)}</link>
    <description>${escape(t.meta.description)}</description>
    <language>${htmlLang[lang]}</language>
    <atom:link href="${absoluteUrl(`/${lang}/feed.xml`)}" rel="self" type="application/rss+xml"/>
    ${posts[0] ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : ""}${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
