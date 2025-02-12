import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/docs", "/blog"],
    },
    sitemap: "https://front-jb.vercel.app",
  };
}
