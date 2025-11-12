/* eslint react-hooks/static-components: "off", jsx-a11y/alt-text: "off" */
import "@/lib/react-internals-polyfill"
import React from "react"
import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Posts from "./posts"
import { useMDXComponent } from "next-contentlayer/hooks"
import GitHubCode from "./github-code"

const internals = (React as unknown as {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: {
    recentlyCreatedOwnerStacks?: number
  }
}).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE

if (internals && typeof internals.recentlyCreatedOwnerStacks !== "number") {
  internals.recentlyCreatedOwnerStacks = 0
}

const components = {
  Image: (props: React.ComponentProps<typeof Image>) => <Image {...props} />,
  Posts,
  GitHubCode,
} as MDXComponents

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
