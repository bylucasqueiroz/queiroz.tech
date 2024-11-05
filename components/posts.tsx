"use client";

import { useState } from "react";
import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

interface PostsProps {
    numberOfPosts?: number;
    enablePostDetails?: boolean;
}

export default function Posts({ numberOfPosts, enablePostDetails }: PostsProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const filteredPosts = selectedTag
        ? sortedPosts.filter(post => post.tag?.split(",").map(tag => tag.trim()).includes(selectedTag))
        : sortedPosts;
    const postsToDisplay = numberOfPosts ? filteredPosts.slice(0, numberOfPosts) : filteredPosts;

    return (
        <div>
            <div className="mb-4">
                {selectedTag && (
                    <button onClick={() => setSelectedTag(null)} className="text-blue-500 hover:underline">
                        Clear filter: {selectedTag}
                    </button>
                )}
            </div>
            {postsToDisplay.map((post) => {
                // const formattedDate = new Date(post.date).toLocaleDateString("en-US", { timeZone: "UTC" });

                return (
                    <article key={post._id}>
                        <Link href={post.slug} className="no-underline">
                            <h3 className="mt-2 m-0 p-0 before:content-['•'] before:mr-2 hover:text-blue-500">
                                {post.title}
                            </h3>
                        </Link>
                        {post.description && <p className="m-0 p-0">{post.description}</p>}
                        {enablePostDetails && <div className="flex space-x-2 tracking-tight">
                            {post.tag && (
                                <div className="m-0 p-0 text-sm text-gray-500 flex space-x-1">
                                    <span>tags:</span>
                                    {post.tag.split(",").map((tag) => (
                                        <button
                                            key={tag.trim()}
                                            onClick={() => setSelectedTag(tag.trim())}
                                            className={`text-blue-500 hover:underline no-underline ${selectedTag === tag.trim() ? "font-bold" : ""
                                                }`}
                                        >
                                            {tag.trim()}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* {post.language && (
                                <p className="m-0 p-0 text-sm text-gray-500">language: {post.language}</p>
                            )}
                            {post.date && (
                                <p className="m-0 p-0 text-sm text-gray-500">date: {formattedDate}</p>
                            )} */}
                        </div>}
                    </article>
                );
            })}
        </div>
    );
}
