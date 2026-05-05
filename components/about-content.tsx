"use client"

import Social from "./social"
import { useLang } from "./language-provider"
import { t } from "@/lib/i18n"

export default function AboutContent() {
  const { lang } = useLang()
  const { subtitle, p1, p2, p3 } = t[lang].about

  return (
    <div>
      <div className="pt-12 pb-10 mb-10 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-[1.75rem] font-bold tracking-[-0.03em] text-slate-900 dark:text-slate-50 leading-none mb-3">
          {lang === "en" ? "About" : "Sobre"}
        </h1>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-5 text-sm text-gray-500 dark:text-gray-400 leading-[1.8] max-w-[52ch] mb-12">
        <p>{p1}</p>
        <p>{p2}</p>
        <p>{p3}</p>
      </div>

      <Social />
    </div>
  )
}
