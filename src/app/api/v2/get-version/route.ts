import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "OK",
    panel: "2.1.2",
    wings: "1.11.13",
    sftp: "1.0.5",
    cli: "2.1.1",
    discord: "https://reviactyl.dev/discord",
    donations: "https://github.com/sponsors/reviactyl",
  });
}
