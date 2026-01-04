import React from "react";
import { FaHeadphonesAlt, FaStar } from "react-icons/fa";
import { FaBoltLightning, FaBook, FaBoxesPacking, FaBoxesStacked, FaCodeFork, FaLock, FaPaintRoller } from "react-icons/fa6";

const features = [
  {
    icon: <FaBoltLightning />,
    title: "Continuous Development",
    description:
      "Your donations help us dedicate more time to developing new features and improving Reviactyl.",
  },
  {
    icon: <FaStar />,
    title: "Better Quality",
    description: "Funding allows us to invest in better infrastructure, testing, and quality assurance.",
  },
  {
    icon: <FaHeadphonesAlt />,
    title: "Community Growth",
    description: "Support helps us grow the community and provide better documentation and support.",
  },
];

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2 mb-2">
      <div className="flex w-full items-center justify-center border-x px-2 py-12 md:px-0">
        <h2 className="text-pretty text-center text-4xl font-bold dark:opacity-90 dark:drop-shadow-lg">
          Why Your Support Matters
        </h2>
      </div>

      <div>
        <div className="grid w-full grid-cols-1 border-b border-r sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div className="relative" key={index}>
              <div className="h-full border-l border-t px-4 py-5 md:p-8">
                <div className="mb-3 text-center flex flex-row items-center gap-x-2 md:mb-4 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:border-blue-800/20 dark:bg-blue-900/50 dark:text-neutral-300 backdrop-blur-md">
                   {feature.icon}
                  <h2 className="text-xs font-normal md:text-sm md:font-medium">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-pretty text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
