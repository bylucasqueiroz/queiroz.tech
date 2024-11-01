import Image from "next/image"
import Posts from "./posts"
import { useMDXComponent } from "next-contentlayer/hooks"

const components = {
  Image,
  Posts
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
