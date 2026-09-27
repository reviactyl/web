import {
  defineConfig,
  defineDocs,
  defineCollections,
} from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: pageSchema.extend({
    author: z.string(),
    date: z.iso.date().or(z.date()),
    image: z.string(),
  }),
});

export const releasePosts = defineCollections({
  type: "doc",
  dir: "content/releases",
  schema: pageSchema.extend({
    version: z.string(),
    date: z.iso.date().or(z.date()),
    image: z.string(),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
