import Link from "next/link";
import React from "react";
import { FaArrowRight, FaBookMedical, FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] rounded-xl">
      <div className="max-w-screen-xl px-4 pt-10 lg:pt-16 lg:px-12 z-1">
        <Link href="/docs/blueprint" className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-300 mb-8">
          <span className="animate-pulse mr-2 h-2 w-2 bg-blue-600 rounded-full" />
          <span>Reviactyl now supports blueprint-addons!</span>
        </Link>
        <div className="block md:hidden">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
          Pterodactyl{" "}
          <span className="bg-gradient-to-r from-neutral-600 to-blue-600 bg-clip-text text-transparent dark:from-neutral-400 dark:to-blue-400">Refined.</span>
        </h1>
        <p className="mt-3 max-w-md  text-neutral-600 dark:text-neutral-400 text-xl md:text-2xl font-medium md:max-w-3xl leading-relaxed">
          Experience Pterodactyl Like Never Before.
        </p>
        </div>
        <div className="hidden md:block">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
          Experience Pterodactyl{" "}
          <span className="bg-gradient-to-r from-neutral-600 to-blue-600 bg-clip-text text-transparent dark:from-neutral-400 dark:to-blue-400">Like Never Before.</span>
        </h1>
        <p className="mt-3 max-w-md  text-neutral-600 dark:text-neutral-400 text-xl md:text-2xl font-medium md:max-w-3xl leading-relaxed">
          Reviactyl is the first and only feature-packed pterodactyl fork.
        </p>
        </div>
        <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-fd-primary to-fd-primary/60 text-fd-primary-foreground shadow-fd-background/20 hover:bg-fd-primary/90 h-11 px-6 rounded-full"
          >
            <span className="relative flex items-center justify-center gap-2 text-white dark:text-black">
              <FaBookMedical /> Documentation
            </span>
          </Link>
          <Link
            href="https://github.com/reviactyl/panel"
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 border hover:bg-fd-accent h-11 px-6 rounded-full bg-fd-background"
          >
            <span className="relative flex items-center justify-center gap-2 hover:text-fd-accent-foreground">
              <FaGithub /> Star on Github <FaArrowRight className="text-gray-500" />
            </span>
          </Link>
        </div>
        <div className="relative inline-block group">
          <img
            className="mx-auto rounded-lg shadow-xl border-gray-800 z-1"
            src="/dashboard.png"
            alt="preview"
          />
        </div>
      </div>
    </section>
  );
}
