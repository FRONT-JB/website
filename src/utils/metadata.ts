import { source } from "@/app/source";
import { createMetadataImage } from "fumadocs-core/server";

export const metadataImage = createMetadataImage({
  imageRoute: "/docs-og",
  source,
});
