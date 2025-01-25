import * as React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

// Below is an example for a post handler for a route

// I need to get the path params to get the post id
// Also reference the lofi academy code cause since this is just vite, I think I can
// use their glob import methods

export interface Workshop {
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
  stackBlitzUrl: string;
}

const getWorkshopDetails = createServerFn({
  method: "GET",
})
  .validator((data: { workshopId: string; sectionId: string }) => data)
  .handler(async (ctx) => {
    // const files = fs.readdirSync(
    //   `content/workshops/${ctx.data.workshopId}/${ctx.data.sectionId}`
    // );
    // console.log(files);

    // const joinFilePath = files.filter((file) => file.includes(""));

    const filePath = path.join(
      `content/workshops/${ctx.data.workshopId}/${ctx.data.sectionId}.md`,
    );

    console.log(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      title: data.title || "",
      slug: ctx.data.workshopId, // use the workshopId as the slug
      published: data.published || "",
      description: data.excerpt || "",
      html: content,
      stackBlitzUrl: data.stackBlitzUrl,
    };
  });

export const Route = createFileRoute("/workshops/$workshopId/$sectionId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const workshop = await getWorkshopDetails({
      data: {
        workshopId: params.workshopId,
        sectionId: params.sectionId,
      },
    });
    return { workshop };
  },
});

// <iframe src="" title="Cybertron Lesson 1 - Code Editor" class="h-full w-full transition-all"></iframe>

function RouteComponent() {
  const { workshop } = Route.useLoaderData();

  return (
    <div className="h-max">
      <div className="left-0 top-0 -z-10 h-full w-full overflow-x-clip">
        <section className="w-full px-6 pt-16 sm:pt-32">
          <header style={{ textWrap: "balance" }}>
            <div className="flex flex-col gap-6 sm:gap-10">
              <h1 className="mx-auto max-w-5xl font-mono text-center text-7xl font-[800] sm:text-[80px] [@media(max-width:500px)]:text-5xl">
                {workshop.title}
              </h1>
              <h2 className="mx-auto max-w-3xl text-center text-xl prose font-medium ">
                {workshop.description}
              </h2>
            </div>
          </header>
        </section>
        <section className="flex w-full gap-14 px-6 sm:pb-16">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-10 lg:flex-nowrap lg:justify-between">
            <div className="prose prose-img:rounded-xl w-full">
              <div>
                <div key={workshop.slug}>
                  <MarkdownRenderer
                    className="prose mb-8"
                    children={workshop.html}
                  />
                  <div className="hidden h-[500px] w-full sm:block xl:h-[750px]">
                    <iframe
                      src={workshop.stackBlitzUrl}
                      title="code editor"
                      className="h-full w-full transition-all"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
