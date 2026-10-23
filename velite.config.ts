import { defineConfig, defineCollection, s } from "velite"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import remarkMath from "remark-math"
import type { Root, Element } from "hast"
import { MOTIFS } from "./lib/motifs"

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
      title: s.string().max(120),
      description: s.string(),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      motif: s.enum(MOTIFS),
      series: s.string().optional(),
      seriesOrder: s.number().optional(),
      draft: s.boolean().default(false),
      toc: s.toc({ maxDepth: 2 }),
      metadata: s.metadata(),
      content: s.mdx(),
    })
    .transform((data, { meta }) => {
      // e.g. content/posts/pt/system-design/latency-vs-throughput.mdx
      const match = meta.path.match(/content\/posts\/(pt|en)\/([^/]+)\/([^/]+)\.mdx$/)
      if (!match) {
        throw new Error(`Post must live at content/posts/{pt|en}/{category}/{slug}.mdx: ${meta.path}`)
      }
      const [, lang, category, slug] = match as unknown as [string, "pt" | "en", string, string]
      return {
        ...data,
        lang,
        category,
        slug,
        url: `/${lang}/blog/${category}/${slug}`,
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
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeProtectMermaid,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
})
