import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "OK",
    panel: "26.05.0",
    agent: "26.05.0",
    sftp: "1.0.5",
    cli: "2.1.1",
    discord: "https://www.reviactyl.app/discord",
    donations: "https://github.com/sponsors/reviactyl",
  });
}
