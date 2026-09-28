import { readdir } from "fs/promises";
import { JSX } from "react/jsx-runtime";

export async function getPost(post: string) {
  const sanitizedPost = decodeURIComponent(post);
  return (await import(`@/posts/${sanitizedPost}.md`)) as {
    default: () => JSX.Element;
    frontmatter: { title: string; description?: string };
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;
  const { default: Post } = await getPost(post);
  return <Post />;
}

export async function generateStaticParams() {
  const files = await readdir("./src/posts");
  return files.map((f) => ({ post: f.split(".")[0] }));
}

export const dynamicParams = false;
