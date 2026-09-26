import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter, Fira_Code } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Reviactyl",
  description: "Fast, Open & Powerful alternative to Pterodactyl Panel. Manage your game servers with ease and efficiency.",
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} antialiased`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
