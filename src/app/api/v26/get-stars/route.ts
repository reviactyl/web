
import { NextResponse } from "next/server";

const CACHE_SECONDS = 300;

const REPOSITORIES = ["agent", "panel"] as const;

interface GitHubRepo {
  stargazers_count: number;
}

export async function GET() {
  try {
    const results = await Promise.all(
      REPOSITORIES.map(async (repo) => {
        const response = await fetch(
          `https://api.github.com/repos/reviactyl/${repo}`,
          {
            headers: {
              "User-Agent": "ReviactylFetch",
              Accept: "application/vnd.github+json",
            },
            next: {
              revalidate: CACHE_SECONDS,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${repo} stars`);
        }

        const data: GitHubRepo = await response.json();

        return {
          repo,
          stars: data.stargazers_count,
        };
      }),
    );

    const repositories = Object.fromEntries(
      results.map(({ repo, stars }) => [repo, stars]),
    );

    const total = results.reduce(
      (sum, result) => sum + result.stars,
      0,
    );

    return NextResponse.json(
      {
        total,
        repositories,
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`,
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stars" },
      { status: 502 },
    );
  }
}
