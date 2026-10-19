import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import { FaClock } from "react-icons/fa6";
import { REVALIDATE, SITE_URL, cleanSlug, formatDate, getArticles } from "@/lib/blog";

export const revalidate = REVALIDATE;

const title = "Blog";
const description =
    "News, release notes and deep dives from the Reviactyl team on game server hosting, Pterodactyl alternatives and open-source panel development.";

export async function generateMetadata(): Promise<Metadata> {
    const articles = await getArticles();
    const image = articles[0]?.social_image;

    return {
        title,
        description,
        alternates: { canonical: `${SITE_URL}/blog` },
        openGraph: {
            title: `${title} - Reviactyl`,
            description,
            url: `${SITE_URL}/blog`,
            siteName: "Reviactyl",
            locale: "en_US",
            type: "website",
            images: image ? [{ url: image, width: 1200, height: 627 }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Reviactyl`,
            description,
            images: image ? [image] : undefined,
        },
    };
}

export default async function BlogPage() {
    const articles = await getArticles();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Reviactyl Blog",
        description,
        url: `${SITE_URL}/blog`,
        blogPost: articles.map((article) => ({
            "@type": "BlogPosting",
            headline: article.title,
            description: article.description,
            image: article.social_image,
            datePublished: article.published_at,
            url: `${SITE_URL}/blog/${cleanSlug(article.slug)}`,
        })),
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 rounded-full bg-gray-50/6 blur-3xl" />

            <Navbar />

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-36">
                <header className="flex flex-col items-center gap-4 text-center">
                    <h1 className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        Blog
                    </h1>
                    <p className="max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                        News, release notes and deep dives from the team behind Reviactyl.
                    </p>
                </header>

                {articles.length === 0 ? (
                    <div className="rounded-2xl border border-gray-50/10 bg-gray-900/50 px-6 py-16 text-center text-gray-400">
                        No posts yet. Check back soon.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${cleanSlug(article.slug)}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-50/20 hover:bg-gray-900/80"
                            >
                                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-gray-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {article.cover_image && (
                                    <div className="aspect-video overflow-hidden border-b border-gray-50/10 bg-gray-800/80">
                                        <img
                                            src={article.cover_image}
                                            alt={article.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-1 flex-col gap-4 p-5">
                                    <div className="flex flex-col gap-1.5">
                                        <h2 className="m-0 p-0 text-base font-semibold leading-snug tracking-tight text-gray-50">
                                            {article.title}
                                        </h2>
                                        <p className="m-0 line-clamp-3 p-0 text-sm leading-relaxed text-gray-400">
                                            {article.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {article.tag_list.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-gray-50/10 bg-gray-50/5 px-2.5 py-0.5 text-xs text-gray-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-gray-50/5 pt-4 text-xs text-gray-500">
                                        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                                        <span className="flex items-center gap-1.5">
                                            <FaClock className="h-3 w-3" /> {article.reading_time_minutes} min read
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
