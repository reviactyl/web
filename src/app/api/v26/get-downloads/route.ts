
import { NextResponse } from "next/server";

const CACHE_SECONDS = 300;

const REPOSITORIES = ["panel", "agent"] as const;

interface GitHubRelease {
  assets: {
    download_count: number;
  }[];
}

export async function GET() {
  try {
    const results = await Promise.all(
      REPOSITORIES.map(async (repo) => {
        const response = await fetch(
          `https://api.github.com/repos/reviactyl/${repo}/releases?per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            next: {
              revalidate: CACHE_SECONDS,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${repo} downloads`);
        }

        const releases: GitHubRelease[] = await response.json();

        const downloads = releases.reduce(
          (total, release) =>
            total +
            release.assets.reduce(
              (sum, asset) => sum + asset.download_count,
              0,
            ),
          0,
        );

        return { repo, downloads };
      }),
    );

    const repositories = Object.fromEntries(
      results.map(({ repo, downloads }) => [repo, downloads]),
    );

    const total = results.reduce(
      (sum, result) => sum + result.downloads,
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
      { error: "Failed to fetch download statitics" },
      { status: 502 },
    );
  }
}
