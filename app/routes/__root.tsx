import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import {
  Outlet,
  ScrollRestoration,
  useRouterState,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

import * as React from "react";
import styles from "../index.css?url";
import Header from "../components/Header";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: styles,
      },
    ],
  }),
  component: RootComponent,
});

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);


function RootComponent() {
  const { pathname } = useRouterState().location;
  const isWorkshopSubpath =
    pathname.startsWith("/workshops/") && pathname !== "/workshops";

  return (
    <RootDocument>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {isWorkshopSubpath ? null : <Header />}
          <Outlet />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <main className="h-max">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
