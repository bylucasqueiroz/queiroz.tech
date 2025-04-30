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
                        className="text-sm text-[#4493F8] hover:underline"
                    >
                        Clear filter: {selectedTag}
                    </button>
                )}
            </div>
            {postsToDisplay.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });

                return (
                    <article key={post._id} className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <Link href={post.slug} className="text-lg font-semibold mb-0 text-[#4493F8] transition-colors no-underline hover:underline hover:decoration-[#4493F8]">
                                {post.title}
                            </Link>
                            {/* Language Badge */}
                            {post.language && (
                                <span className="border border-gray-600 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400 rounded-md">
                                {post.language}
                            </span>
                            )}
                        </div>
                        {post.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-1">
                                {post.description}
                            </p>
                        )}
                        {enablePostDetails && (
                            <div className="text-xs flex flex-wrap items-center space-y-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {/* Tags */}
                                {post.tag && (
                                    <div className="flex items-center space-x-1 mr-4 mt-1">
                                        <span>Tags:</span>
                                        <div className="flex flex-wrap space-x-2">
                                            {post.tag.split(",").map((tag) => (
                                                <button
                                                    key={tag.trim()}
                                                    onClick={() => setSelectedTag(tag.trim())}
                                                    className={`px-2 py-1 font-semibold rounded-full bg-gray-200 dark:bg-[#121D2F] dark:text-[#4493F8] dark:hover:text-white dark:hover:bg-[#4493F8] text-[#4493F8] hover:bg-[#4493F8] hover:text-white ${selectedTag === tag.trim() ? "font-semibold" : ""
                                                        }`}
                                                >
                                                    {tag.trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Date */}
                                {post.date && (
                                    <div className="flex items-center space-x-1">
                                        <span>Created on</span>
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
