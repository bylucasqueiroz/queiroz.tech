import Header from "@/components/header";
import OngoingProjects from "@/components/ongoing-projects";
import Posts from "@/components/posts";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <Header
        title="Lucas Queiroz"
        subtitle="Crafting scalable and resilient software solutions using cutting-edge technologies and cloud-based architectures."
        enableSocial
      />
      <div>
        <h2>Last posts</h2>
        <Posts numberOfPosts={3} />
      </div>
      <div>
        <h2>Ongoing study projects</h2>
        <OngoingProjects />
      </div>
    </div>
  )
}
