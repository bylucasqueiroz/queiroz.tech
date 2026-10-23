import type { Lang } from "@/lib/i18n"
import type { Motif } from "@/lib/motifs"

/**
 * Post covers: the category colour as background, a blueprint grid, and a
 * diagram of the post's subject. The same data renders the web cover
 * (components/cover.tsx) and the Open Graph image (lib/og-cover.tsx).
 *
 * Diagrams live on a 1200×630 canvas; shapes are drawn on the right half so
 * the Open Graph title fits on the left. Cards shift them to the centre.
 */

export const COVER_WIDTH = 1200
export const COVER_HEIGHT = 630
export const CARD_SHIFT = -240

const coverPalette: Record<string, { background: string; accent: string }> = {
  "system-design": { background: "#3730A3", accent: "#C7D2FE" },
  go: { background: "#115E59", accent: "#5EEAD4" },
  dotnet: { background: "#86198F", accent: "#F5D0FE" },
}

export function getCoverPalette(category: string) {
  return coverPalette[category] ?? coverPalette["system-design"]
}

export type CoverLabel = {
  x: number
  y: number
  text: string | Record<Lang, string>
  anchor?: "start" | "middle" | "end"
  size?: number
  accent?: boolean
  opacity?: number
}

type ShapeRefs = { accent: string; arrow: string; arrowAccent: string }

const W = "#FFFFFF"

const shapes: Record<Motif, (r: ShapeRefs) => string> = {
  breaker: ({ accent, arrow, arrowAccent }) => `
    <g fill="none" stroke="${W}" stroke-width="2.5">
      <circle cx="640" cy="430" r="62"/>
      <circle cx="840" cy="190" r="62"/>
      <path d="M702 446Q840 540 978 446" marker-end="url(#${arrow})"/>
      <path d="M998 382L884 236" marker-end="url(#${arrow})"/>
      <path d="M796 236L682 382" marker-end="url(#${arrow})"/>
    </g>
    <path d="M902 180Q1100 170 1086 372" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="8 8" marker-end="url(#${arrowAccent})"/>
    <circle cx="1040" cy="430" r="62" fill="rgba(255,255,255,0.12)" stroke="${accent}" stroke-width="3"/>`,

  backoff: ({ accent }) => `
    <path d="M560 540H1140M560 540V100" fill="none" stroke="${W}" stroke-opacity="0.55" stroke-width="2"/>
    <path d="M560 520Q900 520 1140 110" fill="none" stroke="${W}" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="6 8"/>
    <path d="M560 520H620V500H700V460H820V380H980V220H1140" fill="none" stroke="${accent}" stroke-width="3.5"/>
    <g fill="${W}">
      <circle cx="648" cy="494" r="5"/><circle cx="735" cy="452" r="5"/><circle cx="768" cy="466" r="5"/>
      <circle cx="872" cy="370" r="5"/><circle cx="918" cy="388" r="5"/><circle cx="1030" cy="208" r="5"/><circle cx="1088" cy="230" r="5"/>
    </g>`,

  retry: ({ accent, arrow }) => `
    <rect x="560" y="255" width="150" height="120" fill="none" stroke="${W}" stroke-width="2.5"/>
    <rect x="960" y="255" width="170" height="120" fill="rgba(255,255,255,0.12)" stroke="${accent}" stroke-width="3"/>
    <g stroke="${W}" stroke-width="2.5" fill="none">
      <path d="M712 275H952" marker-end="url(#${arrow})"/>
      <path d="M712 300H952" stroke-opacity="0.75" marker-end="url(#${arrow})"/>
      <path d="M712 325H952" stroke-opacity="0.5" marker-end="url(#${arrow})"/>
      <path d="M712 350H952" stroke-opacity="0.3" marker-end="url(#${arrow})"/>
    </g>`,

  buffer: ({ accent, arrow }) => `
    <g stroke="${W}" stroke-width="2.5" fill="none">
      <rect x="590" y="280" width="70" height="70"/><rect x="680" y="280" width="70" height="70"/><rect x="770" y="280" width="70" height="70"/>
      <rect x="860" y="280" width="70" height="70"/><rect x="950" y="280" width="70" height="70"/><rect x="1040" y="280" width="70" height="70"/>
      <path d="M500 315H580" marker-end="url(#${arrow})"/>
      <path d="M1118 315H1184" marker-end="url(#${arrow})"/>
    </g>
    <g fill="${accent}">
      <rect x="600" y="290" width="50" height="50"/><rect x="690" y="290" width="50" height="50"/><rect x="780" y="290" width="50" height="50"/>
    </g>
    <path d="M590 372V384H840V372" fill="none" stroke="${accent}" stroke-width="2"/>`,

  cache: ({ accent, arrow, arrowAccent }) => `
    <rect x="560" y="270" width="120" height="90" fill="none" stroke="${W}" stroke-width="2.5"/>
    <rect x="740" y="200" width="200" height="230" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="3"/>
    <path d="M740 246H940M740 292H940M740 338H940M740 384H940M820 200V430" fill="none" stroke="${W}" stroke-opacity="0.45" stroke-width="1.5"/>
    <rect x="822" y="248" width="116" height="42" fill="${accent}" fill-opacity="0.35"/>
    <ellipse cx="1070" cy="250" rx="60" ry="18" fill="none" stroke="${W}" stroke-width="2.5"/>
    <path d="M1010 250V390A60 18 0 0 0 1130 390V250" fill="none" stroke="${W}" stroke-width="2.5"/>
    <path d="M682 300H734" fill="none" stroke="${accent}" stroke-width="2.5" marker-end="url(#${arrowAccent})"/>
    <path d="M942 340H1004" fill="none" stroke="${W}" stroke-width="2.5" stroke-dasharray="6 6" marker-end="url(#${arrow})"/>`,

  mutex: ({ accent, arrow, arrowAccent }) => `
    <path d="M620 210C700 210 720 300 794 308" fill="none" stroke="${W}" stroke-width="2.5" marker-end="url(#${arrow})"/>
    <g fill="none" stroke="${W}" stroke-width="2.5" stroke-dasharray="7 7" stroke-opacity="0.6">
      <path d="M620 315H794" marker-end="url(#${arrow})"/>
      <path d="M620 420C700 420 720 330 794 322" marker-end="url(#${arrow})"/>
    </g>
    <g fill="${W}"><circle cx="620" cy="210" r="8"/><circle cx="620" cy="315" r="8"/><circle cx="620" cy="420" r="8"/></g>
    <rect x="800" y="270" width="120" height="90" fill="rgba(255,255,255,0.12)" stroke="${accent}" stroke-width="3"/>
    <path d="M922 315H990" fill="none" stroke="${accent}" stroke-width="2.5" marker-end="url(#${arrowAccent})"/>
    <rect x="996" y="265" width="140" height="100" fill="none" stroke="${W}" stroke-width="2.5"/>`,

  scale: ({ accent, arrow, arrowAccent }) => `
    <rect x="560" y="280" width="120" height="70" fill="none" stroke="${W}" stroke-width="2.5"/>
    <g fill="none" stroke="${W}" stroke-width="2.5">
      <rect x="900" y="110" width="180" height="64"/><rect x="900" y="210" width="180" height="64"/><rect x="900" y="310" width="180" height="64"/>
      <path d="M682 305L894 146" marker-end="url(#${arrow})"/>
      <path d="M682 312L894 244" marker-end="url(#${arrow})"/>
      <path d="M682 318L894 340" marker-end="url(#${arrow})"/>
    </g>
    <rect x="900" y="410" width="180" height="64" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="2.5" stroke-dasharray="8 6"/>
    <path d="M682 325L894 436" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="8 6" marker-end="url(#${arrowAccent})"/>`,

  chart: ({ accent }) => `
    <path d="M580 540H1140M580 540V110" fill="none" stroke="${W}" stroke-opacity="0.55" stroke-width="2"/>
    <path d="M580 520C720 300 860 220 1120 200" fill="none" stroke="${W}" stroke-width="3"/>
    <path d="M580 470C820 465 960 450 1020 380S1080 160 1110 120" fill="none" stroke="${accent}" stroke-width="3.5"/>
    <path d="M1020 380V540" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="5 6"/>
    <circle cx="1020" cy="380" r="7" fill="${accent}"/>`,

  pipeline: ({ accent, arrow }) => `
    <g stroke="${W}" stroke-width="2.5" fill="none">
      <rect x="560" y="283" width="110" height="64"/><rect x="700" y="283" width="110" height="64"/><rect x="840" y="283" width="110" height="64"/>
      <path d="M672 315H696" marker-end="url(#${arrow})"/><path d="M812 315H836" marker-end="url(#${arrow})"/><path d="M952 315H976" marker-end="url(#${arrow})"/>
    </g>
    <rect x="980" y="283" width="110" height="64" fill="rgba(255,255,255,0.12)" stroke="${accent}" stroke-width="3"/>`,

  throttle: ({ accent, arrow, arrowAccent }) => `
    <g stroke="${W}" stroke-width="2.5" fill="none">
      <path d="M560 250H742" marker-end="url(#${arrow})"/>
      <path d="M560 285H742" stroke-opacity="0.8" marker-end="url(#${arrow})"/>
      <path d="M560 320H742" stroke-opacity="0.65" marker-end="url(#${arrow})"/>
      <path d="M560 355H742" stroke-opacity="0.5" marker-end="url(#${arrow})"/>
      <path d="M560 390H742" stroke-opacity="0.35" marker-end="url(#${arrow})"/>
      <path d="M892 290H998" marker-end="url(#${arrow})"/>
      <path d="M892 340H998" marker-end="url(#${arrow})"/>
      <rect x="1004" y="255" width="136" height="120"/>
    </g>
    <path d="M820 110V200" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="6 6" marker-end="url(#${arrowAccent})"/>
    <circle cx="820" cy="140" r="9" fill="${accent}"/>
    <path d="M750 210V400H890V210" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="3"/>
    <g fill="${accent}"><circle cx="785" cy="380" r="11"/><circle cx="820" cy="380" r="11"/><circle cx="855" cy="380" r="11"/></g>
    <path d="M892 384C940 400 960 460 1000 468" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="8 6" marker-end="url(#${arrowAccent})"/>`,
}

export const motifLabels: Record<Motif, CoverLabel[]> = {
  breaker: [
    { x: 840, y: 96, text: "state machine", size: 15, opacity: 0.7 },
    { x: 640, y: 436, text: "CLOSED", size: 17 },
    { x: 840, y: 196, text: "HALF-OPEN", size: 15 },
    { x: 1040, y: 436, text: "OPEN", size: 17, accent: true },
    { x: 840, y: 530, text: { pt: "falhas ≥ n", en: "failures ≥ n" }, size: 14, opacity: 0.8 },
    { x: 958, y: 300, text: "timeout", size: 14, anchor: "start", opacity: 0.8 },
    { x: 722, y: 300, text: "ok", size: 14, anchor: "end", opacity: 0.8 },
    { x: 1100, y: 220, text: { pt: "falha", en: "failure" }, size: 14, anchor: "start", accent: true },
  ],
  backoff: [
    { x: 1140, y: 574, text: { pt: "tentativa →", en: "attempt →" }, size: 15, anchor: "end", opacity: 0.75 },
    { x: 572, y: 94, text: { pt: "intervalo", en: "delay" }, size: 15, anchor: "start", opacity: 0.75 },
    { x: 660, y: 250, text: "base · 2ⁿ + jitter", size: 17, anchor: "start", accent: true },
  ],
  retry: [
    { x: 635, y: 321, text: "client", size: 17 },
    { x: 1045, y: 310, text: "service", size: 17 },
    { x: 1045, y: 340, text: "503", size: 17, accent: true },
    { x: 832, y: 236, text: "retry × 4", size: 15, opacity: 0.8 },
    { x: 832, y: 412, text: { pt: "sem backoff", en: "no backoff" }, size: 14, opacity: 0.6 },
  ],
  buffer: [
    { x: 850, y: 250, text: "chan T · cap 6", size: 16, opacity: 0.8 },
    { x: 540, y: 300, text: "send", size: 14, opacity: 0.75 },
    { x: 1150, y: 300, text: "recv", size: 14, opacity: 0.75 },
    { x: 715, y: 410, text: "len 3", size: 15, accent: true },
  ],
  cache: [
    { x: 620, y: 321, text: "app", size: 17 },
    { x: 840, y: 186, text: "cache", size: 15, opacity: 0.8 },
    { x: 780, y: 230, text: "key", size: 13, opacity: 0.7 },
    { x: 880, y: 230, text: "value", size: 13, opacity: 0.7 },
    { x: 708, y: 286, text: "hit", size: 14, accent: true },
    { x: 974, y: 326, text: "miss", size: 14, opacity: 0.8 },
    { x: 1070, y: 330, text: "db", size: 17 },
  ],
  mutex: [
    { x: 600, y: 215, text: "g1", size: 14, anchor: "end" },
    { x: 600, y: 320, text: "g2", size: 14, anchor: "end", opacity: 0.7 },
    { x: 600, y: 425, text: "g3", size: 14, anchor: "end", opacity: 0.7 },
    { x: 860, y: 250, text: "Lock() / Unlock()", size: 14, opacity: 0.8 },
    { x: 860, y: 321, text: "mutex", size: 17, accent: true },
    { x: 1066, y: 321, text: "state", size: 17 },
  ],
  scale: [
    { x: 620, y: 321, text: "LB", size: 17 },
    { x: 990, y: 148, text: "api-1", size: 15 },
    { x: 990, y: 248, text: "api-2", size: 15 },
    { x: 990, y: 348, text: "api-3", size: 15 },
    { x: 990, y: 448, text: "api-4", size: 15, accent: true },
    { x: 990, y: 520, text: "scale out", size: 14, accent: true },
  ],
  chart: [
    { x: 1140, y: 574, text: { pt: "carga →", en: "load →" }, size: 15, anchor: "end", opacity: 0.75 },
    { x: 900, y: 200, text: "throughput", size: 15, anchor: "end" },
    { x: 1090, y: 112, text: { pt: "latência p99", en: "p99 latency" }, size: 15, anchor: "end", accent: true },
  ],
  pipeline: [
    { x: 560, y: 250, text: "on: push → main", size: 15, anchor: "start", opacity: 0.75 },
    { x: 615, y: 321, text: "build", size: 16 },
    { x: 755, y: 321, text: "test", size: 16 },
    { x: 895, y: 321, text: "image", size: 16 },
    { x: 1035, y: 321, text: "deploy", size: 16, accent: true },
    { x: 1035, y: 384, text: "→ prod", size: 14, accent: true },
  ],
  throttle: [
    { x: 650, y: 226, text: { pt: "requisições", en: "requests" }, size: 15, opacity: 0.8 },
    { x: 838, y: 146, text: "+r tokens/s", size: 14, anchor: "start", accent: true },
    { x: 820, y: 436, text: "token bucket", size: 15, opacity: 0.8 },
    { x: 1072, y: 321, text: "service", size: 17 },
    { x: 1012, y: 474, text: "429", size: 17, anchor: "start", accent: true },
  ],
}

export function labelText(label: CoverLabel, lang: Lang) {
  return typeof label.text === "string" ? label.text : label.text[lang]
}

/** SVG defs + grid + diagram shapes (no text), keyed so several covers can share a page. */
export function coverSvgBody(motif: Motif, category: string) {
  const { accent } = getCoverPalette(category)
  const key = `${category}-${motif}`
  const refs: ShapeRefs = { accent, arrow: `cv-arrow-${key}`, arrowAccent: `cv-arrow-accent-${key}` }
  const defs = `
    <defs>
      <pattern id="cv-minor-${key}" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M30 0H0V30" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
      </pattern>
      <pattern id="cv-major-${key}" width="150" height="150" patternUnits="userSpaceOnUse">
        <path d="M150 0H0V150" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      </pattern>
      <marker id="${refs.arrow}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="${W}"/>
      </marker>
      <marker id="${refs.arrowAccent}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="${accent}"/>
      </marker>
    </defs>`
  return {
    defs,
    grid: `<rect width="${COVER_WIDTH}" height="${COVER_HEIGHT}" fill="url(#cv-minor-${key})"/><rect width="${COVER_WIDTH}" height="${COVER_HEIGHT}" fill="url(#cv-major-${key})"/>`,
    shapes: shapes[motif](refs),
  }
}
