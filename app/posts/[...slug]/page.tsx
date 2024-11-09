import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import Header from "@/components/header"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata | null> {
  const post = await getPostFromParams(params);

  if (!post) {
    return null;
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
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.date,
            dateModified: post.date,
            description: post.description,
            image: post.image
              ? `https://queiroz.tech${post.image}`
              : `https://queiroz.tech/og?title=${post.title}`,
            url: `https://queiroz.tech/posts/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Lucas Queiroz',
            },
          }),
        }}
      />
      <Header title={post.title} subtitle={post.description} />
      <Mdx code={post.body.code} />
    </article>
  )
}
