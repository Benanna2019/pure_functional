import deepmerge from "deepmerge";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import Markdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
// @ts-ignore
import linkifyRegex from "remark-linkify-regex";

import { CodeBlock } from "./CodeBlock";

interface RouteLinkProps {
  to:
    | "/"
    | "/workshops"
    | "/workshops/$workshopId"
    | "/workshops/$workshopId/$sectionId"
    | "/posts"
    | "/posts/$postId";
}

function LinkRenderer({ href, ...rest }: any) {
  // auto-link headings
  if (href.startsWith("#")) {
    return <a href={href} {...rest} />;
  }

  try {
    const url = new URL(href);
    if (url.origin === "https://purefunctional.com") {
      return <Link to={href as RouteLinkProps["to"]} {...rest} />;
    }
    return <a target="_blank" rel="noopener" href={href} {...rest} />;
  } catch (e) {
    console.error(e);
    return <a target="_blank" rel="noopener" href={href} {...rest} />;
  }
}

function getComponentsForVariant(variant: "longform" | "comment") {
  // Blog posts
  switch (variant) {
    case "longform": {
      return {
        a: LinkRenderer,
        pre({
          node,
          inline,
          className,
          children,
          ...props
        }: {
          node?: any;
          inline?: boolean;
          className?: string;
          children: React.ReactNode;
        }) {
          const language = /language-(\w+)/.exec(className || "")?.[1];
          return !inline && language ? (
            <CodeBlock
              text={String(children).replace(/\n$/, "")}
              language={language}
              {...props}
            />
          ) : (
            <>{children}</>
          );
        },
        code({
          node,
          inline,
          className,
          children,
          ...props
        }: {
          node?: any;
          inline?: boolean;
          className?: string;
          children: React.ReactNode;
        }) {
          const language = /language-(\w+)/.exec(className || "")?.[1];
          return !inline && language ? (
            <CodeBlock
              text={String(children).replace(/\n$/, "")}
              language={language}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      };
    }
    // Questions, comments, descriptions on bookmarks, etc.
    case "comment": {
      return {
        a: LinkRenderer,
        h1: "p",
        h2: "p",
        h3: "p",
        h4: "p",
        h5: "p",
        h6: "p",
        pre({ children }: { children: React.ReactNode }) {
          return <>{children}</>;
        },
        code({
          node,
          inline,
          className,
          children,
          ...props
        }: {
          node?: any;
          inline?: boolean;
          className?: string;
          children: React.ReactNode;
        }) {
          const language = /language-(\w+)/.exec(className || "")?.[1];
          return !inline && language ? (
            <CodeBlock
              text={String(children).replace(/\n$/, "")}
              language={language}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      };
    }
  }
}

export function MarkdownRenderer(props: any) {
  // variant = 'longform' | 'comment'
  const { children, variant = "longform", ...rest } = props;

  const schema = deepmerge(defaultSchema, {
    tagNames: [...(defaultSchema.tagNames || []), "sup", "sub", "section"],
    attributes: {
      "*": ["className"],
    },
    clobberPrefix: "",
    clobber: ["name", "id"],
  });

  const components = getComponentsForVariant(variant);

  return (
    <Markdown
      {...rest}
      remarkPlugins={[remarkGfm, linkifyRegex(/^(?!.*\bRT\b)(?:.+\s)?@\w+/i)]}
      rehypePlugins={[
        [rehypeSanitize, schema],
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ]}
      components={components}
    >
      {children}
    </Markdown>
  );
}
