import * as runtime from "react/jsx-runtime"
import React from "react"
import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import GitHubCode from "./github-code-lazy"
import MermaidDiagram from "./mermaid-diagram"
import type { Lang } from "@/lib/i18n"
import { getImageSize } from "@/lib/image-size"

function Div({ "data-mermaid": chart, ...props }: React.HTMLAttributes<HTMLDivElement> & { "data-mermaid"?: string }) {
  if (chart) return <MermaidDiagram chart={chart} />
  return <div {...props} />
}

interface FigureProps {
  src: string
  alt?: string
  caption?: string
}

const figureImageClass = "my-0 w-full rounded-xl border border-line"

/**
 * Image with an optional caption. Also used for the `<Image>` tag older posts were written with.
 * Local PNG/JPEG files go through next/image (resized, modern formats) at the same rendered size;
 * anything whose dimensions can't be read stays a plain <img>.
 */
async function Figure({ src, alt = "", caption }: FigureProps) {
  const size = await getImageSize(src)
  return (
    <figure className="my-8">
      {size ? (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          quality={90}
          sizes="(min-width: 1024px) 720px, 100vw"
          className={`${figureImageClass} h-auto`}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- dimensions unknown (remote or unsupported format)
        <img src={src} alt={alt} loading="lazy" className={figureImageClass} />
      )}
      {caption && <figcaption className="mt-3 text-sm leading-normal text-muted">{caption}</figcaption>}
    </figure>
  )
}

const calloutTitles = {
  pt: { note: "Nota", tip: "Dica", warning: "Atenção" },
  en: { note: "Note", tip: "Tip", warning: "Warning" },
} as const

type CalloutType = keyof (typeof calloutTitles)["pt"]

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

function Callout({ type = "note", title, lang, children }: CalloutProps & { lang: Lang }) {
  const heading = title ?? calloutTitles[lang][type]
  return (
    <aside className="not-prose my-8 flex gap-3.5 rounded-xl border border-line bg-surface px-[22px] py-5 text-base leading-relaxed">
      <svg aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d={type === "warning" ? "M12 7v6M12 16.5v.5" : "M12 11v6M12 7.5v.5"} />
      </svg>
      <div className="min-w-0 [&_p]:m-0 [&_p+p]:mt-3">
        <strong className="block">{heading}</strong>
        {children}
      </div>
    </aside>
  )
}

function getComponents(lang: Lang) {
  return {
    Image: ({ src, alt }: { src: string; alt?: string }) => <Figure src={src} alt={alt} />,
    Figure,
    Callout: (props: CalloutProps) => <Callout {...props} lang={lang} />,
    GitHubCode,
    div: Div,
    // Figure is an async server component; MDX's types predate those, React renders it fine.
  } as unknown as MDXComponents
}

interface MdxProps {
  content: string
  lang: Lang
}

export function Mdx({ content, lang }: MdxProps) {
  const fn = new Function(content)
  const { default: Component } = fn({ ...runtime }) as {
    default: React.ComponentType<{ components?: MDXComponents }>
  }
  return <Component components={getComponents(lang)} />
}
