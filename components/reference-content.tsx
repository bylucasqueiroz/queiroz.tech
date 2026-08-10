"use client"

import Link from "next/link"
import { useLang } from "./language-provider"

type Lang = "pt" | "en"

const copy: Record<
  Lang,
  {
    title: string
    subtitle: string
    intro: string
    sections: Array<{
      title: string
      items: Array<{
        label: string
        href?: string
        note: string
      }>
    }>
  }
> = {
  pt: {
    title: "Reference",
    subtitle: "Resumo de consulta rápida",
    intro: "Um índice curto para revisar os pontos mais importantes em poucos segundos. A ideia é manter blocos objetivos e fáceis de escanear durante uma conversa.",
    sections: [
      {
        title: "Resiliência",
        items: [
          {
            label: "Retry",
            href: "/posts/systemdesign/resiliency-why-retries-can-bring-down-your-system",
            note: "quando usar, falhas transitórias x permanentes, idempotência",
          },
          {
            label: "Exponential Backoff",
            href: "/posts/systemdesign/resiliency-exponencial-backoff-in-practice",
            note: "intervalo fixo x crescimento exponencial, retry storms, jitter",
          },
          {
            label: "Circuit Breaker",
            note: "item para expandir depois",
          },
        ],
      },
    ],
  },
  en: {
    title: "Reference",
    subtitle: "Quick review summary",
    intro: "A compact index for reviewing the most important points in a few seconds. The goal is to keep the blocks objective and easy to scan during a conversation.",
    sections: [
      {
        title: "Reliability",
        items: [
          {
            label: "Retry",
            href: "/posts/systemdesign/resiliency-why-retries-can-bring-down-your-system-en",
            note: "when to use it, transient vs permanent failures, idempotency",
          },
          {
            label: "Exponential Backoff",
            href: "/posts/systemdesign/resiliency-exponencial-backoff-in-practice-en",
            note: "fixed interval vs exponential growth, retry storms, jitter",
          },
          {
            label: "Circuit Breaker",
            note: "item to expand later",
          },
        ],
      },
    ],
  },
}

export default function ReferenceContent() {
  const { lang } = useLang()
  const data = copy[lang]

  return (
    <div>
      <div className="pt-12 pb-10 mb-10 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-[1.75rem] font-bold tracking-[-0.03em] text-slate-900 dark:text-slate-50 leading-none mb-3">
          {data.title}
        </h1>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
          {data.subtitle}
        </p>
      </div>

      <div className="max-w-[58ch] mb-10">
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-[1.8]">
          {data.intro}
        </p>
      </div>

      <section className="space-y-4">
        {data.sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F131A] p-5"
          >
            <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-gray-400 dark:text-gray-600 mb-4">
              {section.title}
            </h2>

            <ul className="space-y-4">
              {section.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <div className="min-w-0">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-semibold text-slate-900 dark:text-slate-100 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:text-accent transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {item.label}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-[1.7]">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}
