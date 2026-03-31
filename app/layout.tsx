import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import NavLinks from "@/components/nav-links"
import GlobalSearch from "@/components/global-search"
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
          <div className="max-w-2xl mx-auto py-6 px-4">
            <header className="flex items-center justify-between mb-2">
              <ModeToggle />
              <div className="flex items-center gap-3">
                <GlobalSearch posts={postsMeta} />
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />
                <NavLinks />
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
