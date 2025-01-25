import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

// Below is an example for a post handler for a route

// I need to get the path params to get the post id
// Also reference the lofi academy code cause since this is just vite, I think I can
// use their glob import methods

// const getCount = createServerFn({
//   method: "GET",
// }).handler(() => {
//   return readCount();
// });

// const updateCount = createServerFn({ method: "POST" })
//   .validator((d: number) => d)
//   .handler(async ({ data }) => {
//     const count = await readCount();
//     await fs.promises.writeFile(filePath, `${count + data}`);
//   });

export const Route = createFileRoute("/posts/$post")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /posts/$post!";
}
