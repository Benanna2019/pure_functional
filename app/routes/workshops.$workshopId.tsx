import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import workshops from "../lib/workshops-config";
import { createServerFn } from "@tanstack/start";
import {
  capitalizeFirstLetter,
  getAllMarkdownFiles,
  getPostsFromMarkdownFiles,
} from "../lib/utils";
import {
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { BreadcrumbItem } from "../components/ui/breadcrumb";
import { BreadcrumbList } from "../components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "../components/ui/sidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { AppSidebar } from "../components/app-sidebar";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { FofX } from "../components/Icons";
import React from "react";

const getWorkshopLessons = createServerFn({
  method: "GET",
}).handler(async () => {
  const files = getAllMarkdownFiles("content/workshops");

  const lessons = getPostsFromMarkdownFiles(files);

  return lessons;
});

type Workshop = (typeof workshops)[number];

export const Route = createFileRoute("/workshops/$workshopId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const workshop = workshops.find(
      (workshop) => workshop.id === params.workshopId
    ) as Workshop;

    const lessons = await getWorkshopLessons();

    return { workshop, lessons, data: workshop.data };
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const { pathname } = useRouterState().location;

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((part, index, array) => ({
      label: capitalizeFirstLetter(part),
      path: "/" + array.slice(0, index + 1).join("/"),
    }));

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  <Button variant="ghost" className="text-black" size="icon">
                    <FofX />
                  </Button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.path}>
                  <BreadcrumbItem
                    key={breadcrumb.path}
                    className="hidden md:block"
                  >
                    <BreadcrumbLink href={breadcrumb.path}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator
                      key={index}
                      className="hidden md:block"
                    />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
