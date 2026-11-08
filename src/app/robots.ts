import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site";

// Required for static export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/random", "/transfer"] },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "CCBot",
          "PerplexityBot",
          "anthropic-ai",
          "Claude-Web",
          "ClaudeBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      "https://moringmark.grzegorzkoperwas.site/sitemap.xml",
    ],
  };
}
