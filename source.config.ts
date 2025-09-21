import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
    }),
  },
});

export const blog = defineCollections({
  type: "doc",
  schema: frontmatterSchema.extend({
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    authors: z.array(z.string()).default([]),
    date: z.date().or(z.string().transform((s) => new Date(s))),
  }),
  dir: "content/blog",
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    // MDX options
  },
});
