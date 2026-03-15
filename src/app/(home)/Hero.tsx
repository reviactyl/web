"use client"
import PanelInstalls from "@/components/PanelInstalls";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowTurnUp } from "react-icons/fa6";

export default function Hero() {
//  const [version, setVersion] = useState("v0");
//
//  useEffect(() => {
//    fetch("/api/v26/get-latest")
//      .then(res => res.json())
//      .then(data => setVersion(data.version_number))
//      .catch(() => setVersion("v0"));
//  }, []);
  return (
    <section className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] rounded-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-10 lg:pt-16 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        <Image
          src="/logo.png"
          alt="Reviactyl Logo"
          width={276}
          height={64}
          priority
          className="mb-3 h-15 hidden dark:block w-auto rounded-full"
        />
        <Image
          src="/logo-darker.png"
          alt="Reviactyl Logo"
          width={276}
          height={64}
          priority
          className="mb-3 h-15 block dark:hidden w-auto rounded-full"
        />
        </motion.div>
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

        <div className="flex flex-col items-center gap-1 mt-8 mb-8">
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
          <div className="inline-flex text-sm items-center gap-1 text-black/50 dark:text-white/50">
            <span className="text-black dark:text-white font-bold"><PanelInstalls />+ panels</span> are using Reviactyl
            <FaArrowTurnUp />
          </div>
        </div>
      </div>
    </section>
  );
}
