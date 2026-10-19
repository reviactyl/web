import type { MetadataRoute } from "next";
import { SITE_URL, cleanSlug, getArticles } from "@/lib/blog";

export const revalidate = 3600;

const staticPages: MetadataRoute.Sitemap = [
    {
        url: SITE_URL,
        changeFrequency: "weekly",
        priority: 1,
    },
    {
        url: `${SITE_URL}/marketplace`,
        changeFrequency: "weekly",
        priority: 0.8,
    },
    {
        url: `${SITE_URL}/discord`,
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${SITE_URL}/blog`,
        changeFrequency: "daily",
        priority: 0.8,
    },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let articles;

    try {
        articles = await getArticles();
    } catch {
        return staticPages;
    }

    return [
        ...staticPages,
        ...articles.map((article) => ({
            url: `${SITE_URL}/blog/${cleanSlug(article.slug)}`,
            lastModified: article.edited_at ?? article.published_at,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];
}
