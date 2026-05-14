import Features from './Features';
import Hero from './Hero';
import type { Metadata } from "next";
import Sponsors from './Sponsors';
import End from './End';
import Footer from './Footer';
import Info from './Info';

export const metadata: Metadata = {
	openGraph: {
		title: "Reviactyl - Modern, Open & Powerful Panel",
		description: "Reviactyl is a fast, open-source, and powerful alternative to Pterodactyl Panel. Manage your game servers with ease and efficiency.",
		images: [{ url: "/og-banner.png" }],
	},
};

export default function HomePage() {
  return (
    <main className="relative h-full w-full">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10 border border-black/20 dark:border-zinc-800 m-4 rounded-xl">
      <Hero />
      <Info />
      <Features />
      <Sponsors />
      <End />
      </div>
      <Footer />
    </main>
  );
}
