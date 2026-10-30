/** Site mark: a terminal prompt, "q" and a cursor. Same drawing as app/icon.svg. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <circle cx="11.6" cy="16.2" r="4.4" strokeWidth="2.4" className="stroke-brand-fg" />
      <path d="M16 11.2V26.4" strokeWidth="2.4" className="stroke-brand-fg" />
      <rect x="19.2" y="19.4" width="6.8" height="2.6" rx="0.6" className="fill-brand-cursor" />
    </svg>
  )
}
