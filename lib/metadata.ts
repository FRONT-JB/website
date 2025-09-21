import type { Metadata } from "next/types";

import { createMetadataImage } from "fumadocs-core/server";
import { source } from "@/lib/source";

export const metadataImage = createMetadataImage({
  imageRoute: "/docs-og",
  source,
});

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://fumadocs.dev",
      images: "/banner.png",
      siteName: "Fumadocs",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@money_is_shark",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/banner.png",
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development" ||
  !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
