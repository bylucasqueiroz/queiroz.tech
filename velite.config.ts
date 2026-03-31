import { defineConfig, defineCollection, s } from "velite"

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string().optional(),
      date: s.isodate(),
      tag: s.string().optional(),
      language: s.string().optional(),
      image: s.string().optional(),
      content: s.mdx(),
    })
    .transform((data, { meta }) => {
      // meta.path is absolute — extract relative path from content/posts/
      const match = meta.path.match(/content\/posts\/(.+)\.mdx$/)
      const slugAsParams = match ? match[1] : ""
      // e.g. "go/unbuffered-vs-buffered"
      return {
        ...data,
        slug: `/posts/${slugAsParams}`,
        slugAsParams,
      }
    }),
})

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string().optional(),
      tag: s.string().optional(),
      language: s.string().optional(),
      content: s.mdx(),
    })
    .transform((data, { meta }) => {
      // meta.path is absolute — extract relative path from content/pages/
      const match = meta.path.match(/content\/pages\/(.+)\.mdx$/)
      const slugAsParams = match ? match[1] : ""
      // e.g. "about"
      return {
        ...data,
        slug: `/${slugAsParams}`,
        slugAsParams,
      }
    }),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:8][extname]",
    clean: true,
  },
  collections: { posts, pages },
})
