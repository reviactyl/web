import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Info() {
  return (
    <section className="py-5 lg:py-10 rounded-xl bg-gray-950 text-gray-50 border-b border-gray-50/10 text-left">
      <div className="mx-auto w-full max-w-350 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <p className="col-span-full text-2xl md:text-3xl xl:text-4xl leading-snug tracking-tight font-light">
          <span className="font-semibold text-blue-400">
            Reviactyl
          </span>{" "}
          is a modern and open-source{" "}
          <span className="font-semibold text-blue-400">
            game server management panel
          </span>{" "}
          built using Laravel, React, FilamentPHP, Vite, and Go. It focuses on
          security and performance by running every game server inside{" "}
          <span className="font-semibold text-blue-400">
            isolated Docker containers
          </span>{" "}
          while providing users with a{" "}
          <span className="font-semibold text-blue-400">
            clean and intuitive interface
          </span>
          .
        </p>

        <div>
          <Link
            href="https://demo.reviactyl.app/"
            className="flex items-center gap-2 text-xl xl:text-2xl font-semibold tracking-tight text-blue-400"
          >
            Live Demo
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
