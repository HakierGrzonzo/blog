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
      <h1>
        <FancyText prefix={2}>My talks:</FancyText>
      </h1>
      <Project
        external
        link="https://www.youtube.com/live/TrXsNiqJdm4?si=FTVCUiO2fhCKvPq-&t=957"
        title="Streaming responses in FastAPI"
        prefix={"Streaming".length}
      >
        <p>
          Pykonik Tech Talks #78 (30.10.2025): how to stream LLM responses token
          by token, like ChatGPT does, with FastAPI and Server-Sent Events.
        </p>
      </Project>
    </>
  );
}
