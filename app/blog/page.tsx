import Header from "@/components/header";
import Posts from "@/components/posts";

export default function Blog() {
  return (
    <div className="prose dark:prose-invert">
      <Header
        title="Blog"
        subtitle="All posts"
      />
      <Posts />
    </div>
  )
}