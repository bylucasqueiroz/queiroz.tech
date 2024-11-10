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
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                {selectedTag && (
                    <button
                        onClick={() => setSelectedTag(null)}
                        className="text-sm text-indigo-500 hover:underline"
                    >
                        Clear filter: {selectedTag}
                    </button>
                )}
            </div>
            {postsToDisplay.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString("en-US", { timeZone: "UTC" });

                return (
                    <article key={post._id} className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <Link href={post.slug} className="no-underline">
                            <h4 className="text-xl font-semibold mb-1 hover:text-indigo-500 transition-colors">
                                {post.title}
                            </h4>
                        </Link>
                        {post.description && (
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                {post.description}
                            </p>
                        )}
                        {enablePostDetails && (
                            <div className="flex flex-wrap items-center space-y-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {/* Tags */}
                                {post.tag && (
                                    <div className="flex items-center space-x-1 mr-4">
                                        <span>Tags:</span>
                                        <div className="flex flex-wrap space-x-2">
                                            {post.tag.split(",").map((tag) => (
                                                <button
                                                    key={tag.trim()}
                                                    onClick={() => setSelectedTag(tag.trim())}
                                                    className={`px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors ${selectedTag === tag.trim() ? "font-semibold" : ""
                                                        }`}
                                                >
                                                    {tag.trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Language */}
                                {post.language && (
                                    <div className="flex items-center space-x-1 mr-4">
                                        <span>Language:</span>
                                        <p className="text-gray-600 dark:text-gray-400">{post.language}</p>
                                    </div>
                                )}
                                {/* Date */}
                                {post.date && (
                                    <div className="flex items-center space-x-1">
                                        <span>Date:</span>
                                        <p className="text-gray-600 dark:text-gray-400">{formattedDate}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
}
