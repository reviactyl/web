import Link from "next/link";
import React from "react";

export default function End() {
  return (
    <section className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] border-t rounded-xl border-black/20 dark:border-zinc-800 mt-2 overflow-hidden">
      <div className="flex w-full flex-col items-center justify-center gap-y-4 px-4 py-8 sm:gap-y-8 sm:px-0 md:py-12 lg:py-16">
        <h2 className="text-pretty text-center text-2xl font-extrabold dark:drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          What are you Waiting For?
        </h2>
      <div className="flex flex-row gap-x-2">
          <Link
            href="/docs"
            className="font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-fd-primary to-fd-primary/60 text-fd-primary-foreground shadow-fd-background/20 hover:bg-fd-primary/90 items-center gap-x-3 rounded-full px-6 py-2 text-start md:py-3 hidden sm:flex"
          >
              Get Reviactyl Today
          </Link>
      </div>
      </div>
    </section>
  );
}
