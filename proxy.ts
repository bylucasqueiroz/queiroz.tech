import { NextResponse, type NextRequest } from "next/server"
import { defaultLang, isLang, type Lang } from "@/lib/i18n"

// Category folders were renamed when posts moved under /{lang}/blog.
const legacyCategories: Record<string, string> = { systemdesign: "system-design" }

function preferredLang(request: NextRequest): Lang {
  const header = request.headers.get("accept-language") ?? ""
  const languages = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { tag } of languages) {
    const base = tag.split("-")[0]
    if (isLang(base)) return base
  }
  return defaultLang
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [first = "", ...rest] = pathname.split("/").filter(Boolean)

  if (isLang(first)) return NextResponse.next()

  const url = request.nextUrl.clone()

  // Old post URLs: /posts/{category}/{slug} (PT) and /posts/{category}/{slug}-en (EN).
  if (first === "posts") {
    const [category, slug] = rest
    if (category && slug) {
      const lang: Lang = slug.endsWith("-en") ? "en" : "pt"
      url.pathname = `/${lang}/blog/${legacyCategories[category] ?? category}/${slug.replace(/-en$/, "")}`
    } else {
      url.pathname = `/${preferredLang(request)}/blog`
    }
    return NextResponse.redirect(url, 308)
  }

  const lang = preferredLang(request)
  url.pathname = first === "career" ? `/${lang}/about` : `/${lang}${pathname === "/" ? "" : pathname}`
  // 307: the target depends on the visitor's language, so it must not be cached as permanent.
  return NextResponse.redirect(url, first === "career" ? 308 : 307)
}

export const config = {
  // Skip Next internals and any path with a file extension (assets, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next|.*\\..*).*)"],
}
