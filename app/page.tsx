import VideoCard from "./components/video-card";
import Image from 'next/image';

export default function Page() {
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
      <p className="prose prose-neutral dark:prose-invert">
        I'm a software engineer, graduated in Computer Engineer, passionate about technology,
        coding and problem-solving.
      </p>
      <h3 className="font-medium text-xl mb-4 mt-16 tracking-tighter">
        Last Youtube Videos
      </h3>
      <p className="prose prose-neutral dark:prose-invert mb-2">
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
        Watch all videos
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
