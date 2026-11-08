import type { Metadata } from "next";
import { readdir } from "fs/promises";
import path from "path";
import { JSX } from "react/jsx-runtime";
import { baseOpenGraph } from "@/site";
import styles from "./page.module.css";

export async function getPost(post: string) {
  const sanitizedPost = decodeURIComponent(post);
  return (await import(`@/posts/${sanitizedPost}.md`)) as {
    default: () => JSX.Element;
    frontmatter: { title: string; description?: string };
  };
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[post]">): Promise<Metadata> {
  const { post } = await params;
  const { frontmatter } = await getPost(post);
  return {
    title: `${frontmatter.title} - HakierGrzonzo`,
    description: frontmatter.description,
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${post}`,
    },
  };
}

export default async function Page({ params }: PageProps<"/blog/[post]">) {
  const { post } = await params;
  const { default: Post, frontmatter } = await getPost(post);
  return (
    <>
      <h1>{frontmatter.title}</h1>
      <div className={styles.post}>
        <Post />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const files = await readdir("./src/posts");
  return files.map((f) => ({ post: path.parse(f).name }));
}

export const dynamicParams = false;
