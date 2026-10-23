export const site = {
  url: "https://queiroz.tech",
  name: "Lucas Queiroz",
  social: {
    linkedin: "https://www.linkedin.com/in/bylucasqueiroz",
    github: "https://github.com/bylucasqueiroz",
    x: "https://x.com/bylucasqueiroz",
    youtube: "https://www.youtube.com/@bylucasqueiroz?sub_confirmation=1",
  },
} as const

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString()
}
