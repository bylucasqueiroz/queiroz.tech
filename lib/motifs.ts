// Kept free of imports so velite.config.ts can use it for schema validation.
export const MOTIFS = [
  "breaker",
  "backoff",
  "retry",
  "buffer",
  "cache",
  "mutex",
  "scale",
  "chart",
  "pipeline",
  "throttle",
] as const

export type Motif = (typeof MOTIFS)[number]
