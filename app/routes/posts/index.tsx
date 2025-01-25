import * as React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { MarkdownRenderer } from "../../components/MarkdownRenderer";

// Below is an example for a post handler for a route

// I need to get the path params to get the post id
// Also reference the lofi academy code cause since this is just vite, I think I can
// use their glob import methods

export interface Essay {
  title: string;
  slug: string;
  generatedSlug: string;
  excerpt: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  published: string;
  updated?: string;
  categories: string[];
  html: string;
}

const getEssays = createServerFn({
  method: "GET",
}).handler(async () => {
  const files = fs.readdirSync("content/posts");

  const posts = files
    .filter((file) => /\.md$/.test(file))
    .map((file) => {
      const filePath = path.join("content/posts", file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.md$/, "");

      return {
        title: data.title || "",
        slug,
        published: data.published || "",
        html: content,
      };
    });

  return posts;
});

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  loader: async () => await getEssays(),
});

function RouteComponent() {
  const state = Route.useLoaderData();
  // would use loader data here
  return (
    <div className="left-0 top-0 -z-10 h-full w-full overflow-x-clip">
      <section className="w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-32">
        <header style={{ textWrap: "balance" }}>
          <div className="flex flex-col gap-6 sm:gap-10">
            <h1 className="mx-auto max-w-5xl text-center text-7xl font-[800] sm:text-[80px] [@media(max-width:500px)]:text-5xl">
              {/* {title} */}
            </h1>
            <h2 className="mx-auto max-w-3xl text-balance text-xl font-medium ">
              {/* {excerpt} */}
            </h2>
          </div>
        </header>
      </section>
      <section className="relative z-10 flex w-full gap-14 px-6 sm:pb-16">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-10 lg:flex-nowrap lg:justify-between">
          <div className="prose  prose-img:rounded-xl z-20 mx-auto w-5/6 max-w-3xl">
            <div>
              {state.map((post) => (
                <div key={post.slug}>
                  <MarkdownRenderer
                    className="prose mt-8"
                    children={post.html}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
