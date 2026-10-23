import type { Lang } from "@/lib/i18n"
import type { Motif } from "@/lib/motifs"
import { categoryLabel } from "@/lib/posts"
import {
  CARD_SHIFT,
  COVER_HEIGHT,
  COVER_WIDTH,
  coverSvgBody,
  getCoverPalette,
  labelText,
  motifLabels,
} from "@/lib/covers"

interface CoverProps {
  motif: Motif
  category: string
  lang: Lang
  /** "card" shows the category label; "thumb" is the bare diagram for small sizes. */
  variant?: "card" | "thumb"
  className?: string
}

export default function Cover({ motif, category, lang, variant = "card", className = "" }: CoverProps) {
  const { background, accent } = getCoverPalette(category)
  const { defs, grid, shapes } = coverSvgBody(motif, category)
  const transform = `translate(${CARD_SHIFT} 0)`

  return (
    <div
      className={`@container relative aspect-[1200/630] overflow-hidden text-white ${className}`}
      style={{ background }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${COVER_WIDTH} ${COVER_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g dangerouslySetInnerHTML={{ __html: defs + grid }} />
        <g transform={transform} dangerouslySetInnerHTML={{ __html: shapes }} />
        <g transform={transform} className="font-mono" fill="#FFFFFF">
          {motifLabels[motif].map((label, i) => (
            <text
              key={i}
              x={label.x}
              y={label.y}
              fontSize={label.size ?? 15}
              textAnchor={label.anchor ?? "middle"}
              fill={label.accent ? accent : "#FFFFFF"}
              fillOpacity={label.opacity ?? 1}
            >
              {labelText(label, lang)}
            </text>
          ))}
        </g>
      </svg>
      {variant === "card" && (
        <span className="absolute bottom-[5cqw] left-[5.5cqw] text-[max(11px,2.4cqw)] font-semibold opacity-90">
          {categoryLabel(category)}
        </span>
      )}
    </div>
  )
}
