import { docs, blogPosts, releasePosts } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { icons } from "lucide-react";
import { createElement } from "react";
import { Reviactyl, Development } from "@/components/Logo";
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),

  icon(icon) {
    if (!icon) {
      return;
    }
    switch (icon) {
      case "reviactyl":
        return Reviactyl();
      case "dev":
        return Development();
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

export const releases = loader({
  baseUrl: "/releases",
  source: toFumadocsSource(releasePosts, []),
});
