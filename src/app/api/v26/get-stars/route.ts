import { NextResponse } from "next/server";

const CACHE_SECONDS = 300;

interface GitHubRepo {
  stargazers_count: number;
}

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/repos/reviactyl/panel", {
      headers: {
        "User-Agent": "ReviactylFetch",
        Accept: "application/vnd.github+json",
      },
      next: {
        revalidate: CACHE_SECONDS,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ stars: 0 }, { status: response.status });
    }

    const repo: GitHubRepo = await response.json();

    return NextResponse.json(
      { stars: repo.stargazers_count },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    );
  } catch {
    return NextResponse.json({ stars: 0 }, { status: 500 });
  }
}
