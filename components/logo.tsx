/** Site mark: a Q whose tail is a diagram connector to a service box. Same drawing as app/icon.svg. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <circle cx="13" cy="12.5" r="6.2" stroke="white" strokeWidth="2.6" />
      <path d="M13 18.7V24H20" stroke="white" strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="21" y="20.5" width="7" height="7" rx="1.6" className="fill-brand-soft" />
    </svg>
  )
}
