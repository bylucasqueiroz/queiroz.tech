import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <div>
        <h1 className="mt-6 mb-4">Lucas Queiroz</h1>
        <p className="text-xl my-2">Crafting scalable and resilient software solutions using cutting-edge technologies and cloud-based architectures.</p>
        <Social />
      </div>
      <hr className="mt-4" />
      <div>
        <h2>Last posts</h2>
        {allPosts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post) => (
            <article key={post._id}>
              <Link href={post.slug} >
                <h3 className="my-2 hover:text-blue-500">{post.title}</h3>
              </Link>
              {post.description && <p className="m-0 p-0">{post.description}</p>}
            </article>
          ))}
      </div>
    </div>
  )
}

function Social() {
  const links = [
    { name: '@lqtalk', url: 'https://x.com/lqtalk' },
    { name: 'youtube', url: 'https://www.youtube.com/@bylucasqueiroz' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/bylucasqueiroz' },
    { name: 'github', url: 'https://github.com/bylucasqueiroz' },
  ];

  return (
    <div className="flex space-x-3 tracking-tight">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
