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
        <h3 className="text-2xl">Last posts</h3>
        <Posts numberOfPosts={3} />
      </div>
      <div>
        <h3 className="text-2xl">Ongoing study projects</h3>
        <OngoingProjects />
      </div>
    </div>
  )
}
