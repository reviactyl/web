import { NextResponse } from "next/server";

const CACHE_SECONDS = 300;

export async function GET() {
  try {
    const response = await fetch(
      "https://rextstore.app/api/v2/resources/1",
      {
        next: {
          revalidate: CACHE_SECONDS,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch extensions" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const resources = (data.resources ?? [])
      .filter(
        (resource: { category_id: number }) =>
          resource.category_id === 1
      )
      .map(
        (resource: {
          title: string;
          banner: string;
          category_id: number;
          description: string;
          link: string;
          author?: {
            name: string;
          };
        }) => ({
          title: resource.title,
          banner: resource.banner,
          category_id: resource.category_id,
          author: resource.author?.name ?? null,
          description: resource.description,
          link: resource.link,
        })
      );

    return NextResponse.json(
      {
        category_id: 1,
        resources,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch extensions" },
      { status: 500 }
    );
  }
}
