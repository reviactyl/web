import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "OK",
    panel: "2.0.0",
    wings: "1.11.13",
    sftp: "1.0.5",
    discord: "https://reviactyl.dev/discord",
    donations: "https://github.com/sponsors/bijju089",
  });
}
