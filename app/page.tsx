import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {allPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h3>{post.title}</h3>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
