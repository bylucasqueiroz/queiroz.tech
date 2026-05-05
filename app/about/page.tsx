import { Metadata } from "next"
import AboutContent from "@/components/about-content"

export const metadata: Metadata = {
  title: "About — Lucas Queiroz",
  description: "Senior Software Engineer focused on backend, distributed systems, and cloud infrastructure.",
}

export default function AboutPage() {
  return <AboutContent />
}
