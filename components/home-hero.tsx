"use client"

import Social from "./social"
import { useLang } from "./language-provider"
import { t } from "@/lib/i18n"

export default function HomeHero() {
  const { lang } = useLang()
  const { role, bio } = t[lang].hero

  return (
    <section className="pt-10 pb-8 mb-8">
      <h1 className="text-[1.75rem] font-normal tracking-[-0.02em] text-slate-900 dark:text-slate-50 leading-none mb-3">
        Lucas Queiroz
      </h1>

      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-6">
        {role}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-[1.8] max-w-[38ch] mb-8">
        {bio}
      </p>

      <Social />
    </section>
  )
}
