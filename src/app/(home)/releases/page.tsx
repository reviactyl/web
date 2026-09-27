import Image from 'next/image';
import Link from 'next/link';
import { releases } from '@/lib/source';
import Footer from '../Footer';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

const PER_PAGE = 10;

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;

  const posts = releases.getPages().sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const currentPage = Math.min(
    Math.max(Number.parseInt(pageParam || '1', 10) || 1, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + PER_PAGE);

  return (
    <main className="min-h-screen bg-white text-neutral-950 transition-colors dark:bg-[#080910] dark:text-white">
      <div className="mx-auto w-full max-w-4xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        >
          <FaArrowCircleLeft />
          Home
        </Link>

        <div className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Changelog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            New features, improvements, and fixes, released as they ship.
          </p>
        </div>

        <div className="mt-14">
          {paginatedPosts.map((post, i) => (
            <Link
              key={post.url}
              href={post.url}
              className={`group grid grid-cols-1 gap-3 border-t border-neutral-200 py-10 first:border-none sm:grid-cols-[160px_1fr] sm:gap-10 dark:border-neutral-800 ${
                i === 0 ? 'pt-0' : ''
              }`}
            >
              <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                <span className="inline-flex w-fit items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                  {post.data.version}
                </span>

                <time
                  dateTime={new Date(post.data.date).toISOString()}
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                >
                  {new Date(post.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  {post.data.title}
                </h2>

                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {post.data.description}
                </p>

                {post.data.image ? (
                  <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <Image
                      src={post.data.image}
                      alt={post.data.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          {totalPages > 1 ? (
            <div className="flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/changelog?page=${currentPage - 1}`}
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#0d0e15] dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                >
                  ← Previous
                </Link>
              )}

              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/changelog?page=${currentPage + 1}`}
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#0d0e15] dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                >
                  Next →
                </Link>
              )}
            </div>
          ) : null}

          <a
            href='https://github.com/reviactyl/panel/releases'
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#0d0e15] dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
          >
            View Releases on GitHub
            <FaArrowCircleRight className="ml-2" />
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
