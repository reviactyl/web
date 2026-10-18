import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono, M_PLUS_Rounded_1c } from "next/font/google";
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
  title: "Reviactyl - Open Source Game Panel",
  description: "Reviactyl is an open-source game management panel for modern hosts, developers, and communities.",
};

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
