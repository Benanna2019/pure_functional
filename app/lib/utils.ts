import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "app/content/posts");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getAllMarkdownFiles(dirPath: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dirPath);
  console.log("items", items);

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

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  //Use remark to convert markdown into Html string
  const processedContent = {
    content,
    data,
  };

  // Combine the data with the id
  return {
    id,
    data,
    content,
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    
    return {
      id,
      title: data.title,
      slug: data.slug,
      generatedSlug: id,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      coverWidth: data.coverWidth,
      coverHeight: data.coverHeight,
      published: data.published,
      categories: data.categories || [],
    } as Post;
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.published < b.published) {
      return 1;
    } else {
      return -1;
    }
  });
}

