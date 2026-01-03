export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/reviactyl/panel/releases",
      {
        headers: {
          "User-Agent": "ReviactylFetch",
          "Accept": "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: "GitHub API error" },
        { status: res.status }
      );
    }

    const releases = await res.json();

    const latestStable = releases.find(
      (r: any) => !r.prerelease && !r.draft
    );

    if (!latestStable) {
      return Response.json({ version: "Unknown" });
    }

    const date = new Date(latestStable.published_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }
    );

    return Response.json({
      version: `${latestStable.tag_name} (${date})`,
    });
  } catch {
    return Response.json(
      { version: "Unavailable" },
      { status: 500 }
    );
  }
}
