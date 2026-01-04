import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] rounded-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-15 lg:pt-16 lg:px-12 flex flex-col items-center text-center">
        <Link href="#" className="inline-flex items-center mb-2">
          <FaHeart className="text-red-500 text-2xl" />
        </Link>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
            Support the Development
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-1xl">
          Help us continue building and maintaining Reviactyl Project. Your support makes a real difference in keeping this project alive and growing.
        </p>
      </div>
    </section>
  );
}
