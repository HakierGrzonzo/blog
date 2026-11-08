import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Turbopack needs plugins referenced by name with serializable options.
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-math",
    ],
    rehypePlugins: [
      ["rehype-pretty-code", { theme: "github-dark", keepBackground: false }],
      "rehype-katex",
    ],
  },
});

export default withMDX(nextConfig);
