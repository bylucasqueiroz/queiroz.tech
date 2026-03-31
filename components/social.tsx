export default function Social() {
  const links = [
    { name: "@bylucasqueiroz", url: "https://x.com/bylucasqueiroz" },
    { name: "linkedin", url: "https://www.linkedin.com/in/bylucasqueiroz" },
    { name: "github", url: "https://github.com/bylucasqueiroz" },
  ]

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors no-underline"
        >
          {link.name}
        </a>
      ))}
    </div>
  )
}
