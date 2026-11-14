import type { Metadata, Viewport } from "next";
import { Poppins, IBM_Plex_Mono, M_PLUS_Rounded_1c } from "next/font/google";
import { SITE_URL } from "@/lib/blog";
import { EMBED_ACCENT, PREVIEW_IMAGE, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/discord-embed";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const kawaiiFont = M_PLUS_Rounded_1c({
    variable: "--font-kawaii",
    subsets: ["latin"],
    weight: ["400", "500", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Reviactyl",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [PREVIEW_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [PREVIEW_IMAGE.url],
  },
};

export const viewport: Viewport = { themeColor: EMBED_ACCENT };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ibmPlexMono.variable} ${kawaiiFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
