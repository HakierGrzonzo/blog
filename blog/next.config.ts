import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  pageExtensions: ["tsx", "md", "mdx"]
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter'],
  }
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
