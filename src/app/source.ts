import { createOpenAPI, attachFile } from "fumadocs-openapi/server";

import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { docs, meta, blog as blogPosts } from "../../.source";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  pageTree: {
    attachFile,
  },
});

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts, meta),
});

export const openapi = createOpenAPI({
  proxyUrl: "/api/proxy",
});
