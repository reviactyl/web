import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Info() {
  return (
    <section className="mt-2 mb-2 py-5 lg:py-10 rounded-xl border-t border-b border-black/20 dark:border-zinc-800 bg-gradient-to-b from-fd-background/80 to-fd-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        <p className="col-span-full text-2xl md:text-3xl xl:text-4xl leading-snug tracking-tight font-light">
          <span className="font-semibold text-blue-400 dark:text-blue-200">
            Reviactyl
          </span>{" "}
          is a modern and open-source{" "}
          <span className="font-semibold text-blue-400 dark:text-blue-200">
            game server management panel
          </span>{" "}
          built using Laravel, React, FilamentPHP, Vite, and Go. It focuses on
          security and performance by running every game server inside{" "}
          <span className="font-semibold text-blue-400 dark:text-blue-200">
            isolated Docker containers
          </span>{" "}
          while providing users with a{" "}
          <span className="font-semibold text-blue-400 dark:text-blue-200">
            clean and intuitive interface
          </span>.
        </p>

        <div>
          <Link
            href="https://demo.reviactyl.app/"
            className="inline-flex items-center gap-2 text-xl xl:text-2xl font-semibold tracking-tight text-blue-300"
          >
            Live Demo
            <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}