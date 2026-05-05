import "./globals.css"
import "katex/dist/katex.min.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import BackToTop from "@/components/back-to-top"
import { Analytics } from "@/components/analytics"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ModeToggle } from "@/components/mode-toggle"
import NavLinks from "@/components/nav-links"
import GlobalSearch from "@/components/global-search"
import LanguageToggle from "@/components/language-toggle"
import { posts } from "@/.velite"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lucas Queiroz",
  description: "Software Engineer and Content Creator",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const postsMeta = posts.map(({ title, description, slug, slugAsParams, tag, date }) => ({
    title,
    description,
    slug,
    slugAsParams,
    tag,
    date,
  }))

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased min-h-screen bg-gray-50 dark:bg-[#0D1117] text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
          <div className="max-w-2xl mx-auto py-6 px-4">
            <header className="flex items-center justify-between mb-2">
              <ModeToggle />
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />
                <GlobalSearch posts={postsMeta} />
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />
                <NavLinks />
              </div>
            </header>
            <main>{children}</main>
            <footer className="mt-16 pb-8 flex items-center gap-8 font-mono text-[11px] text-gray-400 dark:text-gray-600">
              <span className="flex-1">© {new Date().getFullYear()} Lucas Queiroz</span>
              <div className="hidden sm:block min-w-[56px]">
                <BackToTop />
              </div>
            </footer>
          </div>
          <Analytics />
          <SpeedInsights />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
