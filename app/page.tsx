import Link from "next/link"
import { posts } from "@/.velite"
import HomeHero from "@/components/home-hero"
import FeaturedPost from "@/components/featured-post"
import QuickStats from "@/components/quick-stats"
import OngoingProjects from "@/components/ongoing-projects"

export default function Home() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const [featured, ...rest] = sorted
  const recent = rest.slice(0, 3)

  const topics = new Set(
    posts.flatMap((p) =>
      p.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []
    )
  )

  return (
    <div>
      <HomeHero />

      <QuickStats
        totalPosts={posts.length}
        totalTopics={topics.size}
      />

      {/* Writing section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">
            Writing
          </h2>
          <Link href="/posts" className="text-xs text-accent hover:text-accent-hover font-medium no-underline">
            All posts →
          </Link>
        </div>

        {featured && <FeaturedPost post={featured} />}

        <div className="flex flex-col gap-1">
          {recent.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
              timeZone: "UTC",
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            const tags = post.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []

            return (
              <Link key={post.slugAsParams} href={post.slug} className="no-underline group">
                <article className="flex items-start gap-4 px-3 py-3 rounded-lg transition-colors hover:bg-white dark:hover:bg-[#121D2F]/60">
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-600 mt-0.5 w-5 shrink-0 select-none">
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors leading-snug mb-1">
                      {post.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-gray-400 dark:text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-xs text-gray-400 dark:text-gray-600 shrink-0 mt-0.5">
                    {formattedDate}
                  </span>
                </article>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Projects section */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">
            Projects
          </h2>
          <a
            href="https://github.com/bylucasqueiroz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:text-accent-hover font-medium no-underline"
          >
            GitHub →
          </a>
        </div>
        <OngoingProjects />
      </section>
    </div>
  )
}
