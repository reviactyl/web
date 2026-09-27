import { notFound } from "next/navigation";
import Link from "next/link";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { releases } from "@/lib/source";
import Footer from "../../Footer";
import { FaArrowCircleLeft } from "react-icons/fa";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = releases.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;
  const date = new Date(page.data.date);

  return (
    <main className="min-h-screen bg-white text-neutral-950 transition-colors dark:bg-[#080910] dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <Link
          href="/releases"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        >
          <FaArrowCircleLeft />
          All releases
        </Link>

        <div className="mt-8 max-w-3xl">
          <span className="inline-flex w-fit items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
            {page.data.version}
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {page.data.title}
          </h1>
          {page.data.description ? (
            <p className="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
              {page.data.description}
            </p>
          ) : null}
        </div>

        <div className="mt-10 border-t border-neutral-200 dark:border-neutral-800" />

        <article className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="prose min-w-0 max-w-3xl flex-1 dark:prose-invert">
            <Mdx components={defaultMdxComponents} />
          </div>

          <aside className="order-first flex flex-col gap-8 text-sm lg:order-last lg:w-64 lg:shrink-0">
            <div>
              <p className="mb-1 text-neutral-500 dark:text-neutral-400">
                Version
              </p>
              <p className="font-medium">{page.data.version}</p>
            </div>
            <div>
              <p className="mb-1 text-neutral-500 dark:text-neutral-400">
                Released
              </p>
              <time dateTime={date.toISOString()} className="font-medium">
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {page.data.toc.length > 0 ? (
              <div className="border-t border-neutral-200 pt-6 dark:border-neutral-800 lg:sticky lg:top-16">
                <p className="mb-3 font-medium">On this page</p>
                <InlineTOC items={page.data.toc} />
              </div>
            ) : null}
          </aside>
        </article>
      </div>
      <Footer />
    </main>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return releases.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = releases.getPage([params.slug]);
  if (!page) notFound();
  return {
    title: page.data.title + " | Reviactyl",
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: [{ url: page.data.image }],
    },
  };
}
