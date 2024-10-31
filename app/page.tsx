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
      <div>
        <h2>Ongoing study projects</h2>
        <div>
          <div>
            <Link href="https://github.com/bylucasqueiroz/queue-server">
              <h3 className="my-2 hover:text-blue-500">Queue Server</h3>
            </Link>
            <p className="m-0 p-0">This project is an in-memory message queue system using gRPC in Go, inspired by AWS SQS.</p>
          </div>
          <div>
            <Link href="https://github.com/bylucasqueiroz/queue-infra"><h3 className="my-2 hover:text-blue-500">Queue Infra</h3></Link>
            <p className="m-0 p-0">That repository is a part of a project that simulate a SQS Queue using Kubernetes Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Social() {
  const links = [
    { name: '@bylucasqueiroz', url: 'https://x.com/bylucasqueiroz' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/bylucasqueiroz' },
    { name: 'youtube', url: 'https://www.youtube.com/@bylucasqueiroz' },
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
