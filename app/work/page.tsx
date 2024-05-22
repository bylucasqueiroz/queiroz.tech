import type { Metadata } from 'next';
import { Work } from '../components/work';
import roles from 'data/roles.json';

export const metadata: Metadata = {
  title: 'Work',
  description:
    "Now you are into my professional journey and the technologies I currently leverage for coding.",
};

export default function CareerPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-2 tracking-tighter">
        work
      </h1>
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
