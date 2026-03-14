export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GitHubRepo {
  stargazers_count: number;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/reviactyl/panel",
      {
        headers: {
          "User-Agent": "ReviactylFetch",
          "Accept": "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) {
      return Response.json(
        { stars: 0 },
        { status: res.status }
      );
    }

    const repo: GitHubRepo = await res.json();

    return Response.json({
      stars: repo.stargazers_count,
    });
  } catch {
    return Response.json(
      { stars: 0 },
      { status: 500 }
    );
  }
}
