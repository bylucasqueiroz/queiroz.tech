import { notFound } from "next/navigation"
import { posts } from "@/.velite"
import Link from "next/link"
import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import PostHeader from "@/components/post-header"
import LanguageRedirect from "@/components/language-redirect"

type StaticParams = { slug: string[] }
type PageParams = Promise<StaticParams | undefined>

interface PostProps {
  params: PageParams
}

async function getPostFromParams(params: PageParams) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug?.join("/")
  const post = posts.find((entry) => entry.slugAsParams === slug)

  if (!post) {
    notFound()
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata | null> {
  const post = await getPostFromParams(params)

  if (!post) {
    return null
  }

  const { title, description, image, slugAsParams, date } = post
  const baseUrl = "https://queiroz.tech"
  const ogImage = image
    ? `${baseUrl}${image}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/posts/${slugAsParams}`,
      publishedTime: date,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  // Find adjacent posts for prev/next navigation
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const currentIndex = sorted.findIndex((p) => p.slugAsParams === post.slugAsParams)
  const prevPost = sorted[currentIndex + 1] ?? null
  const nextPost = sorted[currentIndex - 1] ?? null

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.date,
            description: post.description,
            image: post.image
              ? `https://queiroz.tech${post.image}`
              : `https://queiroz.tech/og?title=${post.title}`,
            url: `https://queiroz.tech${post.slug}`,
            author: {
              "@type": "Person",
              name: "Lucas Queiroz",
            },
          }),
        }}
      />

      <LanguageRedirect postLang={post.language} translation={post.translation} />
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
        tag={post.tag}
      />

      <article className="prose dark:prose-invert max-w-none">
        <Mdx content={post.content as unknown as string} />
      </article>

      {/* Post footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <div className="flex items-stretch justify-between gap-4 mb-10">
            {prevPost ? (
              <Link
                href={prevPost.slug}
                className="group flex-1 no-underline p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-accent/40 transition-all"
              >
                <span className="block text-xs text-gray-400 dark:text-gray-600 mb-1">← Older</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <Link
                href={nextPost.slug}
                className="group flex-1 no-underline p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-accent/40 transition-all text-right"
              >
                <span className="block text-xs text-gray-400 dark:text-gray-600 mb-1">Newer →</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        )}

        {/* Back to blog */}
        <div className="flex justify-center">
          <Link
            href="/posts"
            className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-accent transition-colors no-underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </>
  )
}
