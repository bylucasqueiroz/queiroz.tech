import "../globals.css"
import "katex/dist/katex.min.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Geist, JetBrains_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { getDictionary, htmlLang, isLang, locales } from "@/lib/i18n"
import { categoryLabel, getPosts } from "@/lib/posts"
import { site } from "@/lib/site"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)

  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: t.meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
      types: { "application/rss+xml": `/${lang}/feed.xml` },
    },
    openGraph: { siteName: site.name, locale: htmlLang[lang].replace("-", "_") },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  const searchPosts = getPosts(lang).map((post) => ({
    title: post.title,
    description: post.description,
    url: post.url,
    category: categoryLabel(post.category),
    date: post.date,
  }))

  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <body className={`${geist.variable} ${jetbrainsMono.variable} relative isolate flex min-h-svh flex-col bg-bg font-sans text-fg antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader lang={lang} searchPosts={searchPosts} />
          <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-6">{children}</main>
          <SiteFooter lang={lang} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
