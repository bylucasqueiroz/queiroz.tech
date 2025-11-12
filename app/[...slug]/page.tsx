import "@/lib/react-internals-polyfill"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import Header from "@/components/header"

type StaticParams = { slug: string[] }
type PageParams = Promise<StaticParams | undefined>

interface PageProps {
  params: PageParams
}

async function getPageFromParams(params: PageParams) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug?.join("/")
  const page = allPages.find((entry) => entry.slugAsParams === slug)

  return page || null
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert">
      <Header title={page.title} subtitle={page.description} />
      <Mdx code={page.body.code} />
    </article>
  )
}
