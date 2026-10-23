"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current) return

    let cancelled = false
    const renderId = `mermaid-${Math.random().toString(36).slice(2)}`

    async function render() {
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
      })

      try {
        const { svg } = await mermaid.render(renderId, chart.trim())
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
        }
      } catch {
        // ignore render errors
      }
    }

    render()

    return () => {
      cancelled = true
      document.getElementById(renderId)?.remove()
    }
  }, [chart, resolvedTheme])

  return (
    <div
      ref={ref}
      className="my-8 flex justify-center overflow-x-auto rounded-xl border border-line bg-surface p-4"
    />
  )
}
