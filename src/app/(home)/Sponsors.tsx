import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";

export default function Sponsors() {
  return (
    <section className="bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2 mb-2 overflow-hidden">
      <div className="border-b dark:border-zinc-800">
        <div className="grid items-center divide-y divide-black/20 dark:divide-zinc-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="flex h-full items-center gap-2 p-4 text-pretty text-2xl font-semibold dark:opacity-90 dark:drop-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl">
            <FaHeart />
            <h1>Sponsors</h1>
          </div>
          <p className="p-4">
            <span className="opacity-75">
              Reviactyl is built by community for the community. This means
              Reviactyl is not built to earn profit.
            </span>{" "}
            <Link
              className="text-link"
              href="https://github.com/sponsors/reviactyl"
            >
              Support our work by donating to Reviactyl.
            </Link>
          </p>
        </div>
      </div>
      <div className="flex items-center md:min-h-44">
        <div className="flex w-full flex-col justify-center gap-4 p-4 md:flex-row md:gap-12 md:p-6">
          <span className="flex items-center gap-x-2">
            <Link href="https://tietokettu.net/" className="border border-zinc-800 rounded-xl px-4">
              <Image src={'/sponsor_tietokettu.png'} className="filter grayscale" height="74" width="74" alt={'TieToKettu'} />
            </Link>
            <Link href="https://github.com/sponsors/reviactyl/" className="border border-zinc-800 rounded-xl p-4">
              <LuPlus className="text-4xl text-zinc-800" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
