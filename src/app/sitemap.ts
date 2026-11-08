import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site";
import { generateStaticParams as getPosts } from "./blog/[post]/page";

// Required for static export.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/projects", "/blog"];
  const posts = (await getPosts()).map(
    ({ post }) => `/blog/${encodeURIComponent(post)}`,
  );
  return [...pages, ...posts].map((path) => ({ url: `${SITE_URL}${path}` }));
}
