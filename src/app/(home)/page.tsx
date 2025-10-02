import Features from './Features';
import Hero from './Hero';
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
    <main className="relative h-full w-full">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10 border bg-black/20 dark:border-zinc-800 m-4 rounded-xl">
      <Hero />
      <Features />
      </div>
    </main>
  );
}
