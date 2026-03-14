"use client"
import PanelVersion from "@/components/PanelVersion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  const [version, setVersion] = useState("v0");

  useEffect(() => {
    fetch("/api/v26/get-latest")
      .then(res => res.json())
      .then(data => setVersion(data.version_number))
      .catch(() => setVersion("v0"));
  }, []);
  return (
    <section className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] rounded-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-10 lg:pt-16 lg:px-12 flex flex-col items-center text-center">
        <Link href={`https://github.com/reviactyl/panel/releases/tag/${version}`} className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-300 mb-8">
          <span className="animate-pulse mr-2 h-2 w-2 bg-blue-600 rounded-full" />
          <span>Panel <PanelVersion /> has been released!</span>
        </Link>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-[5.5rem] lg:leading-[1.0]">
          <span className="block md:hidden">
            Pterodactyl<br />
            <span className="bg-gradient-to-r from-neutral-600 to-blue-600 bg-clip-text text-transparent dark:from-neutral-400 dark:to-blue-400">
              Refined.
            </span>
          </span>

          <span className="hidden md:block">
            Manage Game Servers<br />
            <span className="bg-gradient-to-br from-white via-blue-300 to-blue-400 bg-clip-text text-transparent dark:from-neutral-400 dark:to-blue-400">
              Like Never Before!
            </span>
          </span>
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-1xl">
          <span className="md:hidden">
            Manage Game Servers like never before
          </span>
          <span className="hidden md:inline">
            Designed with security in mind, Reviactyl runs all game servers in isolated Docker containers while exposing a beautiful and intuitive UI to end users.
          </span>
        </p>

        <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/docs"
            className="group relative inline-flex h-[calc(48px+8px)] cursor-pointer items-center justify-center rounded-full bg-fd-secondary/70 py-1 pl-6 text-lg shadow-lg pr-14"
          >
            <span className="relative flex items-center justify-center gap-2 text-fd-accent-foreground">
              Get Started <span className="border border-gray-300 dark:border-gray-600 px-2 py-1 rounded-xl text-sm font-bold">Free</span>
            </span>
            <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full border bg-fd-accent transition-[width] group-hover:w-[calc(100%-8px)]">
              <div className="mr-3.5 flex items-center justify-center">
                <FaArrowRight className="h-5 w-5 text-fd-accent-foreground" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
