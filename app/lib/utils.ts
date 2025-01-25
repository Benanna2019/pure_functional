import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getAllMarkdownFiles(dirPath: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively get files from subdirectories
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith(".md")) {
      files.push(fullPath);
    }
  });

  return files;
}

export function getPostsFromMarkdownFiles(files: string[]): Post[] {
  const posts = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent) as unknown as {
      data: Post;
      content: string;
    };
    const slug = path.basename(filePath).replace(/\.md$/, "");

    const post = { ...data, generatedSlug: slug };

    return post;
  });

  return posts;
}

export interface Post {
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
}
