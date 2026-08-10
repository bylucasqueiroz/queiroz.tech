import { Metadata } from "next"
import ReferenceContent from "@/components/reference-content"

export const metadata: Metadata = {
  title: "Reference — Lucas Queiroz",
  description: "A compact reference page for quick review of reliability topics.",
}

export default function ReferencePage() {
  return <ReferenceContent />
}
