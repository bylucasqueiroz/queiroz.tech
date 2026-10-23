/**
 * The cover diagrams' blueprint grid as a page backdrop: full height on the home page,
 * a band that fades out under the intro on index pages. Sits behind the header and content
 * (the body is an isolated stacking context), and is never used on posts.
 */
export default function GridBackdrop({ variant }: { variant: "full" | "top" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 bg-blueprint ${
        variant === "full" ? "bottom-0" : "bg-blueprint-fade h-[560px]"
      }`}
    />
  )
}
