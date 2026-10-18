import { NextResponse } from "next/server";

const CACHE_SECONDS = 300;

export async function GET() {
  try {
    const response = await fetch("https://telemetry.reviactyl.app/stats.json", {
      headers: {
        "User-Agent": "ReviactylFetch",
      },
      next: {
        revalidate: CACHE_SECONDS,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ total_unique_ids: 0 });
    }

    const stats = await response.json();

    return NextResponse.json(
      { total_unique_ids: stats.total_unique_ids },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    );
  } catch {
    return NextResponse.json({ total_unique_ids: 0 });
  }
}
