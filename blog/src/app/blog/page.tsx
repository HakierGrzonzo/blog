import { Project } from "@/components/Project";
import { getPost, generateStaticParams as getPosts } from "./[post]/page";

export default async function BlogIndex() {
  const posts = await getPosts();
  return (
    <>
      {posts.map(async ({ post }, index) => {
        const { frontmatter } = await getPost(post);
        return (
          <Project
            prefix={2}
            key={index}
            link={`./blog/${post}`}
            title={frontmatter.title}
          >
            {frontmatter.description ?? ""}
          </Project>
        );
      })}
    </>
  );
}
