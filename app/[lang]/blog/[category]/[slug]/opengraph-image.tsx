import { notFound } from "next/navigation"
import { isLang } from "@/lib/i18n"
import { renderOgCover, ogSize } from "@/lib/og-cover"
import { getPost, posts } from "@/lib/posts"

export const size = ogSize
export const contentType = "image/png"
export const alt = "Lucas Queiroz"

export function generateStaticParams() {
  return posts.map((post) => ({ lang: post.lang, category: post.category, slug: post.slug }))
}

export default async function Image({ params }: { params: Promise<{ lang: string; category: string; slug: string }> }) {
  const { lang, category, slug } = await params
  if (!isLang(lang)) notFound()
  const post = getPost(lang, category, slug)
  if (!post) notFound()

  return renderOgCover({ title: post.title, motif: post.motif, category: post.category, lang })
}
