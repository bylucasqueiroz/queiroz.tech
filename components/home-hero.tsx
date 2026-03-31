import Social from "./social"

const stack = ["Go", "AWS", "Kubernetes", "gRPC", "Docker", "System Design"]

export default function HomeHero() {
  return (
    <div className="pt-10 pb-8 border-b border-gray-200 dark:border-gray-800 mb-10">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Lucas Queiroz
        </h1>
        <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-500 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          writing
        </span>
      </div>

      <p className="text-sm font-medium text-accent mb-4 tracking-wide">
        Senior Software Engineer
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-lg">
        Building scalable and resilient systems. Writing about backend
        engineering, distributed systems, and cloud infrastructure.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs font-mono rounded-md bg-white dark:bg-[#121D2F] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <Social />
    </div>
  )
}
