import { SITE_URL } from "./blog";

export const SITE_TITLE = "Reviactyl - Open Source Game Panel";
export const SITE_DESCRIPTION =
  "Reviactyl is an open-source game management panel for modern hosts, developers, and communities.";
export const EMBED_ACCENT = "#60a5fa";
export const DISCORD_EMBED_URL = new URL("/discord-embed.json", SITE_URL).href;
export const PREVIEW_IMAGE = {
  url: new URL("/showcase/1.png", SITE_URL).href,
  width: 1920,
  height: 1080,
  alt: "Reviactyl game server console with server controls and resource monitoring",
};

const linkButton = (label: string, url: string) => ({
  type: 2,
  style: 5,
  label,
  url,
});

// Discord component embeds: https://docs.discord.com/developers/link-previews/component-embeds
export const discordEmbed = {
  component: {
    type: 17,
    accent_color: parseInt(EMBED_ACCENT.slice(1), 16),
    components: [
      {
        type: 9,
        components: [
          {
            type: 10,
            content: `## [Reviactyl](${SITE_URL})\n${SITE_DESCRIPTION}`,
          },
        ],
        accessory: {
          type: 11,
          media: { url: new URL("/icon.png", SITE_URL).href },
          description: "Reviactyl logo",
        },
      },
      {
        type: 12,
        items: [
          { media: { url: PREVIEW_IMAGE.url }, description: PREVIEW_IMAGE.alt },
        ],
      },
      { type: 14, divider: true, spacing: 1 },
      {
        type: 1,
        components: [
          linkButton("Live Demo", "https://demo.reviactyl.app/"),
          linkButton("Documentation", "https://docs.reviactyl.app/"),
          linkButton("Marketplace", new URL("/marketplace", SITE_URL).href),
        ],
      },
      {
        type: 1,
        components: [
          linkButton("GitHub", "https://github.com/reviactyl/panel"),
          linkButton("Discord", new URL("/discord", SITE_URL).href),
        ],
      },
    ],
  },
};
