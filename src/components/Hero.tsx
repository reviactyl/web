import React from "react";
import { FaArrowRight, FaBookMedical, FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <section>
      <div className="max-w-screen-xl px-4 pt-10 mt-5 mx-auto text-center lg:pt-16 lg:px-12 z-1">
        <a href="/docs" className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 mb-8">
          <span className="animate-pulse mr-2 h-2 w-2 bg-orange-600 rounded-full" />
          <span>Install Reviactyl Now! It's Free.</span>
        </a>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
          Pterodactyl <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">Refined.</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-neutral-600 dark:text-neutral-400 text-xl md:text-2xl font-medium md:max-w-3xl leading-relaxed">
          The first and only free pterodactyl theme with features that even paid
          themes on the market don't have.
        </p>
        <div className="mt-8 mb-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://docs.reviactyl.dev/"
            className="group relative font-semibold bg-black dark:bg-white p-4 rounded-full"
          >
            <span className="relative flex items-center justify-center gap-2 text-white dark:text-black">
              <FaBookMedical /> Documentation
            </span>
          </a>
          <a
            href="https://github.com/reviactyl/panel"
            className="group relative font-semibold bg-black dark:bg-white p-4 rounded-full"
          >
            <span className="relative flex items-center justify-center gap-2 text-white dark:text-black">
              <FaGithub /> Star on Github <FaArrowRight className="text-gray-500" />
            </span>
          </a>
        </div>
        <a className="relative inline-block group">
          <img
            className="mx-auto mb-5 lg:mb-8  rounded-lg shadow-xl dark:hidden border-gray-800  z-1"
            src="/dashboard.png"
            alt="preview"
          />
          <img
            className="mx-auto mb-5 lg:mb-8 hidden dark:block rounded-lg shadow-xl  border-gray-800 z-1"
            src="/dashboard-dark.png"
            alt="preview"
          />
        </a>
      </div>
    </section>
  );
}
