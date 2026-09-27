import Image from 'next/image';
import Link from 'next/link';
import { blog } from '@/lib/source';

export default function Home() {
  const posts = blog.getPages().sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return (
    <main className="min-h-screen bg-white text-neutral-950 transition-colors dark:bg-[#080910] dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        >
          <span aria-hidden>←</span>
          Home
        </Link>

        <div className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            Notes, updates, and things we&apos;ve learned along the way.
          </p>
        </div>

        <div className="mt-14 border-t border-neutral-200 dark:border-neutral-800" />

        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.url} href={post.url} className="group block">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                <Image
                  src={post.data.image}
                  alt={post.data.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  {post.data.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {post.data.description}
                </p>
                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                  {post.data.author} &middot;{' '}
                  {new Date(post.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
