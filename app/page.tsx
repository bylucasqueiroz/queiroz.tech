import { posts } from "@/.velite"
import HomeHero from "@/components/home-hero"
import PostsSearch from "@/components/posts-search"

export default function Home() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Canonical posts: PT default (no -en suffix)
  const canonical = sorted.filter((p) => !p.slugAsParams.endsWith("-en"))

  // EN posts indexed by canonical slug (remove -en suffix)
  const enPosts = Object.fromEntries(
    sorted
      .filter((p) => p.slugAsParams.endsWith("-en"))
      .map((p) => [p.slugAsParams.replace(/-en$/, ""), p])
  )

  const allTags = Array.from(
    new Set(canonical.flatMap((p) => p.tag?.split(",").map((t) => t.trim()).filter(Boolean) ?? []))
  ).sort()

  return (
    <div>
      <HomeHero />
      <PostsSearch posts={canonical} enPosts={enPosts} allTags={allTags} />
    </div>
  )
}
