import Features from './Features';
import Hero from './Hero';
import type { Metadata } from "next";
import Sponsors from './Sponsors';
import Comparison from './Comparison';
import End from './End';
import Footer from './Footer';
import Info from './Info';
import Extensions from './Extensions';

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
      <Hero />
      <Info />
      <Features />
      <Comparison />
      <Extensions />
      <Sponsors />
      <End />
      <Footer />
    </main>
  );
}
