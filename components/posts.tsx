import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

interface PostsProps {
    numberOfPosts?: number;
}

export default function Posts({ numberOfPosts }: PostsProps) {
    const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const postsToDisplay = numberOfPosts ? sortedPosts.slice(0, numberOfPosts) : sortedPosts;

    return (
        <div>
            {postsToDisplay.map((post) => (
                <article key={post._id}>
                    <Link href={post.slug} className="no-underline">
                        <h3 className="my-2 before:content-['•'] before:mr-2 hover:text-blue-500">{post.title}</h3>
                    </Link>
                    {post.description && <p className="m-0 p-0">{post.description}</p>}
                </article>
            ))}
        </div>
    );
}
