"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

// The theme script only needs to run in the server HTML, before paint. Switching language
// remounts the [lang] layout on the client, and React warns about any executable <script> it
// creates there, so on the client the tag is rendered as an inert data block instead.
// next-themes already sets suppressHydrationWarning on it, so the type difference is safe.
const scriptProps = { type: typeof window === "undefined" ? "text/javascript" : "application/json" }

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  )
}
