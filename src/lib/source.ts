import { docs, blogPosts } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { createMDXSource } from 'fumadocs-mdx';
import { Blueprint, Reviactyl, Development } from '@/components/Logo';
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),

  icon(icon) {
    if (!icon) {
      return;
    }
    switch (icon) {
      case 'reviactyl':
        return Reviactyl();
      case 'blueprint':
        return Blueprint();
      case 'dev':
        return Development()
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});
