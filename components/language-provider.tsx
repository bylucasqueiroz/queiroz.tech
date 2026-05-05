"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Lang = "pt" | "en"

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
}>({ lang: "pt", setLang: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt")

  useEffect(() => {
    const stored = localStorage.getItem("lang")
    if (stored === "en" || stored === "pt") setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
