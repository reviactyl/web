import Hero from '../donate/Hero';
import type { Metadata } from "next";
import Sponsors from '../Sponsors';
import Footer from '../Footer';
import Features from './Features';

export const metadata: Metadata = {
    openGraph: {
        title: "Make Donation to Reviactyl Project",
        description: "Your donations help us dedicate more time to developing new features and improving Reviactyl.",
    },
};

export default function DonatePage() {
  return (
    <main className="relative h-full w-full">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10 border border-black/20 dark:border-zinc-800 m-4 rounded-xl">
      <Hero />
      <Features />
      <Sponsors />
      </div>
      <Footer />
    </main>
  );
}
