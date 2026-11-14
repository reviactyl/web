import { discordEmbed } from "@/lib/discord-embed";

export const dynamic = "force-static";

export function GET() {
  return Response.json(discordEmbed);
}
