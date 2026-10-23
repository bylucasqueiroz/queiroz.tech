"use client"

import { useState } from "react"

interface ShareLinksProps {
  url: string
  title: string
  labels: { share: string; copyLink: string; copied: string }
}

export default function ShareLinks({ url, title, labels }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)
  const linkClass =
    "flex h-10 items-center rounded-[10px] border border-line px-3.5 text-[13px] font-medium text-fg transition-colors hover:border-muted"

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable (permissions, insecure context); the URL is still in the address bar.
    }
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label={labels.share}>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LinkedIn
      </a>
      <a
        href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        X
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? labels.copied : labels.copyLink}
        title={copied ? labels.copied : labels.copyLink}
        className="flex size-10 items-center justify-center rounded-[10px] border border-line text-fg transition-colors hover:border-muted"
      >
        {copied ? (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
        )}
      </button>
      <span aria-live="polite" className="sr-only">{copied ? labels.copied : ""}</span>
    </div>
  )
}
