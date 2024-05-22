import VideoCard from "./components/video-card";

export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my portfolio</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is your new portfolio.
      </p>
      <h3 className="font-medium text-xl mb-4 mt-16 tracking-tighter">
          Last Youtube Videos
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
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
