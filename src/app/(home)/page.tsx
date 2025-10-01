import Hero from '@/components/Hero';
import type { Metadata } from "next";

export const metadata: Metadata = {
	openGraph: {
		title: "Reviactyl - Free Theme For Pterodactyl",
		description: "Reviactyl is an open, fast, and free pterodactyl theme. It's the first and only open source Pterodactyl Theme to have features that even paid themes don't.",
		images: [{ url: "/banner.png" }],
	},
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
