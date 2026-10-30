import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { getDictionary, type Lang } from "@/lib/i18n"
import type { Motif } from "@/lib/motifs"
import { categoryLabel } from "@/lib/posts"
import { site } from "@/lib/site"
import {
  COVER_HEIGHT,
  COVER_WIDTH,
  coverSvgBody,
  getCoverPalette,
  labelText,
  motifLabels,
} from "@/lib/covers"

export const ogSize = { width: COVER_WIDTH, height: COVER_HEIGHT }

// The OG renderer does not draw <text> inside embedded SVG, so the diagram is
// an image and its labels are positioned divs on top of it.
const LABEL_BOX = 320

function loadFonts() {
  return Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Geist-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Medium.ttf")),
  ])
}

interface OgCoverOptions {
  title: string
  motif: Motif
  category: string
  lang: Lang
}

export async function renderOgCover({ title, motif, category, lang }: OgCoverOptions) {
  const { background, accent } = getCoverPalette(category)
  const { defs, grid, shapes } = coverSvgBody(motif, category)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${COVER_WIDTH}" height="${COVER_HEIGHT}" viewBox="0 0 ${COVER_WIDTH} ${COVER_HEIGHT}">${defs}${grid}${shapes}</svg>`
  const diagram = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
  const [geist, mono] = await loadFonts()

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background, color: "#FFFFFF" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={diagram} width={COVER_WIDTH} height={COVER_HEIGHT} alt="" style={{ position: "absolute", left: 0, top: 0 }} />

        {motifLabels[motif].map((label, i) => {
          const size = label.size ?? 15
          const anchor = label.anchor ?? "middle"
          const left =
            anchor === "start" ? label.x : anchor === "end" ? label.x - LABEL_BOX : label.x - LABEL_BOX / 2
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left,
                top: label.y - size,
                width: LABEL_BOX,
                display: "flex",
                justifyContent: anchor === "start" ? "flex-start" : anchor === "end" ? "flex-end" : "center",
                fontFamily: "JetBrains Mono",
                fontSize: size,
                lineHeight: 1.2,
                color: label.accent ? accent : "#FFFFFF",
                opacity: label.opacity ?? 1,
              }}
            >
              {labelText(label, lang)}
            </div>
          )
        })}

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 560,
            height: "100%",
            padding: 66,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Site mark (components/logo.tsx) inverted: white tile, drawing in the category color. */}
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#FFFFFF" />
              <circle cx="11.6" cy="16.2" r="4.4" stroke={background} strokeWidth="2.4" />
              <path d="M16 11.2V26.4" stroke={background} strokeWidth="2.4" />
              <rect x="19.2" y="19.4" width="6.8" height="2.6" rx="0.6" fill={background} fillOpacity="0.45" />
            </svg>
            <div style={{ fontFamily: "Geist", fontSize: 22, opacity: 0.9 }}>
              {categoryLabel(category)}
            </div>
          </div>
          <div style={{ fontFamily: "Geist", fontSize: title.length > 48 ? 46 : 54, lineHeight: 1.08, letterSpacing: -1.5 }}>
            {title}
          </div>
          <div style={{ fontFamily: "Geist", fontSize: 20, opacity: 0.85 }}>
            {`${site.name} · ${new URL(site.url).host}`}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: geist, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  )
}

/** Share image for the non-post pages: photo, name and tagline on the site's dark background. */
export async function renderOgProfile(lang: Lang) {
  const t = getDictionary(lang)
  const [[geist, mono], photo] = await Promise.all([
    loadFonts(),
    readFile(join(process.cwd(), "public/profile.jpg")),
  ])
  const { background, accent } = getCoverPalette("system-design")

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: 88, background, color: "#FFFFFF" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${photo.toString("base64")}`}
          width={360}
          height={360}
          alt=""
          style={{ borderRadius: 32, border: `2px solid ${accent}` }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontFamily: "Geist", fontSize: 76, lineHeight: 1.02, letterSpacing: -2.5 }}>{site.name}</div>
          <div style={{ fontFamily: "Geist", fontSize: 34, lineHeight: 1.2, marginTop: 22, color: accent }}>{t.home.title}</div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 22, marginTop: 56, opacity: 0.8 }}>{new URL(site.url).host}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: geist, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  )
}
