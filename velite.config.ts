import { defineConfig, defineCollection, s } from "velite"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import type { Root, Element } from "hast"

// Runs BEFORE rehype-pretty-code: converts <pre><code class="language-mermaid">
// into <div data-mermaid="..."> so rehype-pretty-code never touches it.
function rehypeProtectMermaid() {
  return (tree: Root) => {
    function walk(node: Root | Element) {
      if (!("children" in node)) return
      node.children = node.children.map((child) => {
        if (
          child.type === "element" &&
          child.tagName === "pre"
        ) {
          const code = child.children[0]
          if (
            code?.type === "element" &&
            code.tagName === "code" &&
            (code.properties?.className as string[] | undefined)?.includes(
              "language-mermaid"
            )
          ) {
            const raw =
              code.children[0]?.type === "text"
                ? code.children[0].value
                : ""
            return {
              type: "element",
              tagName: "div",
              properties: { "data-mermaid": raw },
              children: [],
            } as Element
          }
        }
        walk(child as Element)
        return child
      })
    }
    walk(tree)
  }
}

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
      translation: s.string().optional(),
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
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeProtectMermaid,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          themes: {
            dark: "github-dark",
            light: "github-light",
          },
        },
      ],
    ],
  },
})
