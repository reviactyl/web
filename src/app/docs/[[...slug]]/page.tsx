import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import Portal from '@/components/Portal';

type Props = {
  params: {
    slug?: string[];
  };
};

export default async function Page({ params }: Props) {
  // render potalr
  if (!params.slug || params.slug.length === 0) {
    return <Portal />;
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Documentation | Reviactyl',
      description: 'Reviactyl documentation portal',
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title + ' | Reviactyl Docs',
    description: page.data.description,
  };
}