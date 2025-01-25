import { useState } from "react";

interface ContentCardProps {
  post: {
    title: string;
    excerpt: string;
    published: string;
    coverImage: string;
    coverWidth: number;
    coverHeight: number;
    slug: string;
    generatedSlug: string;
  };
}

export default function ContentCard({ post }: ContentCardProps) {
  const {
    title,
    excerpt,
    published,
    coverImage,
    coverWidth,
    coverHeight,
    slug,
    generatedSlug,
  } = post;

  return (
    <a
      className="reveal animate-revealContent group relative flex flex-col overflow-hidden rounded-xl border border-neutral-800 transition-colors duration-300 ease-out hover:cursor-pointer"
      rel="prefetch"
      href={`/posts/${generatedSlug}`}
      style={{ animationDuration: "2s", animationDelay: "1s" }}
    >
      <h3 className="mb-4 mt-6 px-6 text-xl font-semibold">{title}</h3>
      <p className="relative flex max-w-xl grow px-6 text-sm font-normal">
        {excerpt}
      </p>
      <p className="font-regular my-6 px-6 text-xs font-normal opacity-90">
        {published}
      </p>
      <div className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-black opacity-0 transition-opacity sm:group-hover:opacity-100">
        <span className="*:ease-bounce relative flex size-5 items-center justify-center overflow-hidden *:transition-transform *:duration-[400ms]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute -translate-x-5 group-active:translate-x-0 sm:group-hover:translate-x-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
