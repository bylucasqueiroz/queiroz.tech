"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLang } from "./language-provider"

interface LanguageRedirectProps {
  postLang?: string
  translation?: string
}

export default function LanguageRedirect({ postLang, translation }: LanguageRedirectProps) {
  const { lang } = useLang()
  const router = useRouter()

  useEffect(() => {
    if (!translation || !postLang) return
    const mismatch =
      (lang === "en" && postLang === "pt") ||
      (lang === "pt" && postLang === "en")
    if (mismatch) {
      router.replace(`/posts/${translation}`)
    }
  }, [lang, postLang, translation, router])

  return null
}
