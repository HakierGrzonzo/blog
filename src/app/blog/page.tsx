import type { Metadata } from "next";
import { FancyText } from "@/components/fancy-text";
import { Project } from "@/components/Project";
import { getPost, generateStaticParams as getPosts } from "./[post]/page";

export const metadata: Metadata = {
  title: "HakierGrzonzo's Blog",
};

export default async function BlogIndex() {
  const posts = await Promise.all(
    (await getPosts()).map(async ({ post }) => ({
      post,
      frontmatter: (await getPost(post)).frontmatter,
    })),
  );
  return (
    <>
      <h1>
        <FancyText prefix={2}>My blog:</FancyText>
      </h1>
      {posts.map(({ post, frontmatter }) => (
        <Project
          key={post}
          prefix={frontmatter.title.indexOf(" ")}
          link={`/blog/${post}`}
          title={frontmatter.title}
        >
          <p>{frontmatter.description ?? ""}</p>
        </Project>
      ))}
    </>
  );
}
