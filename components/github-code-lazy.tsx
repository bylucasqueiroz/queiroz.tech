"use client"

import dynamic from "next/dynamic"

// Only a few posts embed GitHub code. Loading the highlighter from a client boundary keeps it in
// its own chunk, fetched just by the posts that render it (a server-side dynamic() doesn't split it).
const GitHubCode = dynamic(() => import("./github-code"), {
  loading: () => <div className="my-6 h-24 animate-pulse rounded-xl border border-line bg-surface" />,
})

export default GitHubCode
