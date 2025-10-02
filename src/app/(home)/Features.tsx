import React from "react";
import { FaBook, FaBoxesPacking, FaBoxesStacked, FaCodeFork, FaLock, FaPaintRoller } from "react-icons/fa6";

const features = [
  {
    icon: <FaBoxesStacked />,
    title: "Addon Compatibility",
    description:
      "Reviactyl is compatible with almost every addon that was made for Pterodactyl panel.",
  },
  {
    icon: <FaLock />,
    title: "Security First",
    description: "Reviactyl is most secure panel as we actively work on patching vulerabilities. ",
  },
  {
    icon: <FaPaintRoller />,
    title: "Modern Design",
    description: "Reviactyl offers better and more accessible UI design that doesn't feel outdated.",
  },
  {
    icon: <FaBook />,
    title: "User-Friendly Guides",
    description: "We have spent hours refining our user and administration guides. From installation to even about modifying source files.",
  },
  {
    icon: <FaCodeFork />,
    title: "Open Source",
    description: "Reviactyl is open-source, allowing community contributions and customization to improve server managing experience.",
  },
  {
    icon: <FaBoxesPacking />,
    title: "Feature-Packed",
    description: "Reviactyl offers top-notch features such as Client-Side Theme Selector, Designify Theme Editor, Custom Branding, and much more.",
  },
];

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2 mb-2">
      <div className="flex w-full items-center justify-center border-x px-2 py-12 md:px-0 md:py-16 lg:py-20">
        <h2 className="text-pretty text-center text-2xl font-bold dark:opacity-90 dark:drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          Why users
          <br />
          Prefer Reviactyl?
        </h2>
      </div>

      <div>
        <div className="grid w-full grid-cols-1 border-b border-r sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div className="relative" key={index}>
              <div className="h-full border-l border-t px-4 py-5 md:p-8">
                <div className="mb-3 flex flex-row items-center gap-x-2 md:mb-4">
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
