import Link from "next/link";
import React from "react";
import { blog } from '@/lib/source';

export default function Blog() {
    const posts = blog.getPages().slice(0, 3);
  return (
      <section className="p-2 bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="block bg-fd-secondary rounded-lg shadow-md overflow-hidden p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
            <p className="text-sm text-fd-muted-foreground mb-2">{post.data.description}</p>
            <p className="text-sm text-fd-muted-foreground">{post.data.author} &bull; {new Date(post.data.date).toDateString()}</p>
          </Link>
        ))}
      </div>
      </section>
  );
}
