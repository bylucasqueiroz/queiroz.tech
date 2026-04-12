import * as runtime from "react/jsx-runtime"
import React from "react"
import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Posts from "./posts"
import GitHubCode from "./github-code"
import MermaidDiagram from "./mermaid-diagram"

function Div({ "data-mermaid": chart, ...props }: React.HTMLAttributes<HTMLDivElement> & { "data-mermaid"?: string }) {
  if (chart) return <MermaidDiagram chart={chart} />
  return <div {...props} />
}

const components = {
  Image: (props: React.ComponentProps<typeof Image>) => <Image {...props} />,
  Posts,
  GitHubCode,
  div: Div,
} as MDXComponents

interface MdxProps {
  content: string
}

export function Mdx({ content }: MdxProps) {
  const fn = new Function(content)
  const { default: Component } = fn({ ...runtime }) as {
    default: React.ComponentType<{ components?: MDXComponents }>
  }
  return <Component components={components} />
}
