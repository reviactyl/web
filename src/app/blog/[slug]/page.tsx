import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import { FaArrowLeft, FaClock } from "react-icons/fa6";
import { SITE_URL, cleanSlug, formatDate, getArticle } from "@/lib/blog";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const prose = [
    "text-left text-base leading-relaxed text-gray-400",
    "[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-gray-50",
    "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-50",
    "[&_h2>a]:hidden [&_h3>a]:hidden",
    "[&_p]:my-4",
    "[&_a]:text-gray-50 [&_a]:underline [&_a]:decoration-gray-50/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-gray-50",
    "[&_strong]:text-gray-200",
    "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5",
    "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-50/20 [&_blockquote]:pl-4 [&_blockquote]:text-gray-300",
    "[&_hr]:my-10 [&_hr]:border-gray-50/10",
    "[&_img]:my-6 [&_img]:rounded-xl [&_img]:border [&_img]:border-gray-50/10",
    "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-gray-50/10 [&_pre]:bg-gray-900/80 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-gray-300",
    "[&_code]:font-mono [&_:not(pre)>code]:rounded [&_:not(pre)>code]:border [&_:not(pre)>code]:border-gray-50/10 [&_:not(pre)>code]:bg-gray-900 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-sm [&_:not(pre)>code]:text-gray-300",
    "[&_table]:my-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:text-sm",
    "[&_th]:border [&_th]:border-gray-50/10 [&_th]:bg-gray-900/80 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-gray-50",
    "[&_td]:border [&_td]:border-gray-50/10 [&_td]:px-3 [&_td]:py-2",
].join(" ");

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return { title: "Post not found" };

    const url = `${SITE_URL}/blog/${cleanSlug(article.slug)}`;

    return {
        title: article.title,
        description: article.description,
        keywords: article.tags,
        authors: [{ name: article.user.name }],
        alternates: { canonical: url },
        openGraph: {
            title: article.title,
            description: article.description,
            url,
            siteName: "Reviactyl",
            locale: "en_US",
            type: "article",
            publishedTime: article.published_at,
            modifiedTime: article.edited_at ?? article.published_at,
            authors: [article.user.name],
            tags: article.tags,
            images: [{ url: article.social_image, width: 1200, height: 627 }],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
            images: [article.social_image],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) notFound();

    const url = `${SITE_URL}/blog/${cleanSlug(article.slug)}`;
    const body = article.body_html.replace(/<(\/?)h1/g, "<$1h2");

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: article.social_image,
        datePublished: article.published_at,
        dateModified: article.edited_at ?? article.published_at,
        keywords: article.tags.join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Person", name: article.user.name },
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 rounded-full bg-gray-50/6 blur-3xl" />

            <Navbar />

            <article className="relative z-10 mx-auto flex max-w-3xl flex-col gap-10 px-6 pb-24 pt-36">
                <Link
                    href="/blog"
                    className="flex w-fit items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-50"
                >
                    <FaArrowLeft className="h-3 w-3" /> Back to blog
                </Link>

                <header className="flex flex-col gap-5 text-left">
                    <div className="flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-gray-50/10 bg-gray-50/5 px-2.5 py-0.5 text-xs text-gray-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <img
                                src={article.user.profile_image_90}
                                alt={article.user.name}
                                className="h-6 w-6 rounded-full border border-gray-50/10"
                            />
                            <span className="text-gray-300">{article.user.name}</span>
                        </span>
                        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                        <span className="flex items-center gap-1.5">
                            <FaClock className="h-3 w-3" /> {article.reading_time_minutes} min read
                        </span>
                    </div>
                </header>

                {article.cover_image && (
                    <div className="aspect-video overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50">
                        <img src={article.cover_image} alt={article.title} className="h-full w-full object-cover" />
                    </div>
                )}

                <div className={prose} dangerouslySetInnerHTML={{ __html: body }} />
            </article>
        </main>
    );
}
