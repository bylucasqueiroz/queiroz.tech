import VideoCard from "./components/VideoCard";
import Image from 'next/image';
import BlogPostCard from "./components/BlogPost";
import { getBlogPosts } from "./db/blog";

export default function Page() {
  let allPosts = getBlogPosts()
  const lastThreePosts = allPosts.slice(0, 3);
  return (
    <section>
      <div className="flex flex-col-reverse sm:flex-row items-start">
        <div className="flex flex-col pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
            Lucas Queiroz
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Software Engineer at{' '}
            <span className="font-semibold">Itaú</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-16">
            Crafting scalable and resilient software solutions using cutting-edge technologies and cloud-based architectures.          </p>
        </div>
        <div className="w-[80px] sm:w-[200px] relative mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Lucas"
            height={200}
            width={200}
            src="/avatar.png"
            sizes="30vw"
            priority
            className="rounded-full filter"
          />
        </div>
      </div>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Last Posts
      </h3>
      <div className="flex gap-6 flex-col md:flex-row">
        {lastThreePosts.map((post) => (
          <BlogPostCard
            key={post.slug}
            title={post.metadata.title}
            slug={post.slug}
            gradient="from-[#D3D3D3] to-[#57606F]"
          />
        ))}
      </div>
      <a
        rel="noopener noreferrer"
        href="/blog"
        className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
      >
        Read all
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 ml-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
          />
        </svg>
      </a>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 mt-16 text-black dark:text-white">
        Last Videos
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        I take great pleasure in sharing my knowledge and experiences with others.
        That's why I created this channel. Here are three of my latest videos that
        I hope you'll find informative and enjoyable:
      </p>
      <VideoCard
        index="01"
        href="https://www.youtube.com/watch?v=inWRiyDhejg"
        length="33:54"
        title="Estilo de programação orientado a objeto no Go, é possível?"
      />
      <VideoCard
        index="02"
        href="https://www.youtube.com/watch?v=QNgjmLMzx90"
        length="10:11"
        title="Golang: Entendendo CONCORRÊNCIA e PARALELISMO"
      />
      <VideoCard
        index="03"
        href="https://www.youtube.com/watch?v=K1MzixTyVT8"
        length="06:58"
        title="O futuro da programação com o ChatGPT | O que muda?"
      />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/@bylucasqueiroz"
        className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
      >
        Watch all
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 ml-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
          />
        </svg>
      </a>
    </section>
  );
}
