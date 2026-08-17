import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "OK",
    panel: "26.08.02",
    agent: "26.08.02",
    sftp: "1.0.5",
    cli: "2.1.1",
    discord: "https://reviactyl.app/discord",
    donations: "https://github.com/sponsors/reviactyl",
  });
}
