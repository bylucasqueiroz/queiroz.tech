interface QuickStatsProps {
  totalPosts: number
  totalTopics: number
}

export default function QuickStats({ totalPosts, totalTopics }: QuickStatsProps) {
  const stats = [
    { value: totalPosts, label: "posts" },
    { value: totalTopics, label: "topics" },
  ]

  return (
    <div className="flex items-center gap-6 mb-10">
      {stats.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-6">
          <div>
            <span className="block text-xl font-bold text-accent leading-none">{value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">{label}</span>
          </div>
          {i < stats.length - 1 && (
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
          )}
        </div>
      ))}
    </div>
  )
}
