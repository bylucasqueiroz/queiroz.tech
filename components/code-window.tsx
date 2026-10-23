export type CodeToken = { kind: "keyword" | "string" | "type" | "comment" | "plain"; text: string }
export type CodeLine = CodeToken[]

const tokenClass: Record<CodeToken["kind"], string> = {
  keyword: "text-editor-keyword",
  string: "text-editor-string",
  type: "text-editor-type",
  comment: "text-editor-muted",
  plain: "text-editor-fg",
}

interface CodeWindowProps {
  /** Accessible name for the window, e.g. "Introduction in Go". */
  label: string
  file: string
  /** Extra, inactive tab shown next to the file. */
  secondaryFile?: string
  command: string
  status: string
  lines: CodeLine[]
  className?: string
}

/** A static, editor-looking code panel (always dark). Pre-highlighted: no highlighter is shipped. */
export default function CodeWindow({ label, file, secondaryFile, command, status, lines, className = "" }: CodeWindowProps) {
  return (
    <figure
      aria-label={label}
      className={`overflow-hidden rounded-2xl border border-editor-line bg-editor-bg shadow-[0_24px_60px_-24px_rgb(15_20_25/0.45)] ${className}`}
    >
      <div aria-hidden="true" className="flex border-b border-editor-line bg-editor-chrome font-mono text-xs">
        <span className="border-r border-editor-line bg-editor-bg px-[18px] py-3 text-editor-fg shadow-[inset_0_2px_0_var(--color-editor-keyword)]">
          {file}
        </span>
        {secondaryFile && <span className="border-r border-editor-line px-[18px] py-3 text-editor-muted">{secondaryFile}</span>}
      </div>
      <pre className="m-0 overflow-x-auto py-5 font-mono text-[13px] leading-[1.75] sm:text-[13.5px]">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="flex whitespace-pre">
              <span aria-hidden="true" className="w-12 shrink-0 select-none pr-[18px] text-right text-editor-gutter">
                {i + 1}
              </span>
              <span className="pr-6">
                {line.length === 0
                  ? " "
                  : line.map((token, j) => (
                      <span key={j} className={tokenClass[token.kind]}>
                        {token.text}
                      </span>
                    ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
      <div aria-hidden="true" className="flex justify-between gap-4 border-t border-editor-line bg-editor-chrome px-[18px] py-2 font-mono text-[11px] text-editor-muted">
        <span>{command}</span>
        <span>{status}</span>
      </div>
    </figure>
  )
}
