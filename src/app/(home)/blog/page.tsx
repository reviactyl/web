import Link from 'next/link';
import { blog } from '@/lib/source';
import Footer from '../Footer';

export default function Home() {
  const posts = blog.getPages();

  return (
    <main className="relative h-full w-full">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10 border border-black/20 dark:border-zinc-800 m-4 rounded-xl">
      <div className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] rounded-xl border py-12 md:px-8">
        <h1 className="mb-2 text-3xl font-bold">Latest Blog Posts</h1>
        <p className="mb-4 text-fd-muted-foreground">Our official blogs page.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 border hover:bg-fd-accent h-8 px-3 rounded-xl bg-fd-background"
          >
            <span className="relative flex items-center justify-center gap-2 hover:text-fd-accent-foreground">
              Home
            </span>
          </Link>
      </div>
      <div className="p-2 bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2">
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
      </div>
      </div>
    <Footer />
    </main>
  );
}