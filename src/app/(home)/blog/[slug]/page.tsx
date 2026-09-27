import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import Footer from "../../Footer";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;
  const date = new Date(page.data.date);
  const initials = page.data.author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-white text-neutral-950 transition-colors dark:bg-[#080910] dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          <span aria-hidden>←</span>
          All posts
        </Link>

        <div className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-fd-foreground sm:text-5xl">
            {page.data.title}
          </h1>
          {page.data.description ? (
            <p className="mt-4 text-lg leading-relaxed text-fd-muted-foreground">
              {page.data.description}
            </p>
          ) : null}
        </div>

        {page.data.image ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-fd-border">
            <Image
              src={page.data.image}
              alt={page.data.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mt-10 border-t border-fd-border" />
        )}

        <article className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="prose min-w-0 max-w-3xl flex-1 dark:prose-invert">
            <Mdx components={defaultMdxComponents} />
          </div>

          <aside className="order-first flex flex-col gap-8 text-sm lg:order-last lg:w-64 lg:shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fd-muted text-xs font-medium text-fd-foreground">
                {initials}
              </div>
              <div>
                <p className="font-medium text-fd-foreground">
                  {page.data.author}
                </p>
                <time
                  dateTime={date.toISOString()}
                  className="text-fd-muted-foreground"
                >
                  {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>

            {page.data.toc.length > 0 ? (
              <div className="border-t border-fd-border pt-6 lg:sticky lg:top-16">
                <p className="mb-3 font-medium text-fd-foreground">
                  On this page
                </p>
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
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
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
