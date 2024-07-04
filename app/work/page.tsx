import type { Metadata } from 'next';
import { Work } from '../components/Work';
import roles from 'data/roles.json';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Work',
  description:
    "Now you are into my professional journey and the technologies I currently leverage for coding.",
};

export default function CareerPage() {
  return (
    <section>
      <div className="w-full flex flex-row justify-between">
        <h1 className="font-medium text-2xl mb-2 tracking-tighter">
          work
        </h1>
        <Link
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-8 h-8 bg-gray-200 rounded-lg dark:bg-gray-800 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
          href="/files/resume.pdf"
          target="_blank" 
          download
        >
          <svg 
            className="w-5 h-5 text-gray-800 dark:text-gray-200"
            viewBox="0 0 24 24"
            fill="none" 
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 3V16M12 16L16 11.625M12 16L8 11.625" 
                stroke-width={2}
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
              <path 
                d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" 
                stroke-width={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
        </svg>
        </Link>
      </div>
      <div className="w-full flex flex-row">
        <p className="mt-6 pr-3 text-neutral-400 dark:text-neutral-400 tracking-tight">Current</p>
        <div className="w-full flex flex-col">
          {roles.map((post) => (
            <Work
              startAt={post.startAt}
              endAt={post.endAt}
              company={post.company}
              role={post.role}
              descriptions={post.descriptions}
              skills={post.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
