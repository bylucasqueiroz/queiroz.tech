"use client"

import { useLang } from "./language-provider"

export default function LanguageToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 font-mono text-[11px] tracking-wide">
      <button
        onClick={() => setLang("pt")}
        className={`transition-colors ${
          lang === "pt"
            ? "text-accent"
            : "text-gray-400 dark:text-gray-600 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        PT
      </button>
      <span className="text-gray-300 dark:text-gray-700">·</span>
      <button
        onClick={() => setLang("en")}
        className={`transition-colors ${
          lang === "en"
            ? "text-accent"
            : "text-gray-400 dark:text-gray-600 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        EN
      </button>
    </div>
  )
}
