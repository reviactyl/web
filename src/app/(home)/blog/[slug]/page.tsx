import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
import Footer from '../../Footer';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <main className="relative h-full w-full">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10 border border-black/20 dark:border-zinc-800 m-4 rounded-xl">
      <article className="flex flex-col mx-auto w-full lg:flex-row gap-x-2">
        <div className="prose min-w-0 flex-1 gap-y-2">
          <div className="py-12 px-4 bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800">
        <h1 className="mb-2 text-6xl font-semibold">{page.data.title}</h1>
          </div>
          <img className="border-t border-b rounded-xl border-black/20 dark:border-zinc-800" src={page.data.image} alt={page.data.title} />
          <div className="p-4 !pt-0 bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800">
          <Mdx components={defaultMdxComponents} />
          </div>
        </div>
        <div className="flex flex-col gap-4 border-l p-4 text-sm lg:w-[250px] bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800">
          <div>
            <InlineTOC items={page.data.toc} />
          </div>
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">Posted At</p>
            <p className="font-medium">
              {new Date(page.data.date).toDateString()}
            </p>
          </div>
        </div>
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
    title: page.data.title + ' | Reviactyl',
    description: page.data.description,
	  openGraph: {
		  title: page.data.title,
		  description: page.data.description,
		  images: [{ url: page.data.image }],
	  },
  };
}