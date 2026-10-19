const API_URL = "https://dev.to/api";
const USERNAME = "bijjuxd";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reviactyl.app";

export interface Article {
    id: number;
    title: string;
    description: string;
    slug: string;
    published_at: string;
    edited_at: string | null;
    reading_time_minutes: number;
    cover_image: string | null;
    social_image: string;
    tag_list: string[];
    user: {
        name: string;
        username: string;
        profile_image_90: string;
    };
}

export interface ArticleDetail extends Omit<Article, "tag_list"> {
    tags: string[];
    body_html: string;
}

export const cleanSlug = (slug: string) => slug.replace(/-[a-z0-9]+$/, "");

export const getArticles = async (): Promise<Article[]> => {
    const response = await fetch(`${API_URL}/articles?username=${USERNAME}&per_page=100`, {
        cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to load articles");

    return response.json();
};

export const getArticle = async (slug: string): Promise<ArticleDetail | undefined> => {
    const articles = await getArticles();
    const match = articles.find((article) => cleanSlug(article.slug) === slug);
    if (!match) return undefined;

    const response = await fetch(`${API_URL}/articles/${match.id}`, {
        cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to load article");

    return response.json();
};

export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
