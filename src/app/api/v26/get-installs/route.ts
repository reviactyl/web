export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TelemetryStats {
  total_unique_ids: number;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://telemetry.reviactyl.dev/stats.json",
      {
        headers: {
          "User-Agent": "ReviactylFetch",
        },
      }
    );

    if (!res.ok) {
      return Response.json(
        { total_unique_ids: 0 }
      );
    }

    const stats: TelemetryStats = await res.json();

    return Response.json({
      total_unique_ids: stats.total_unique_ids,
    });
  } catch {
    return Response.json(
      { total_unique_ids: 0 }
    );
  }
}
