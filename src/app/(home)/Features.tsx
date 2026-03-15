import React from "react";
import { FaBatteryFull, FaCodeFork, FaLaravel, FaLock, FaPuzzlePiece, FaReact } from "react-icons/fa6";

const features = [
  {
    icon: <FaPuzzlePiece />,
    title: "Extensions API",
    description:
      "Reviactyl provides a robust Extensions API that allows developers to create and integrate custom functionality seamlessly.",
  },
  {
    icon: <FaLock />,
    title: "Security First",
    description: "Security is a first-class citizen on this platform with bcrypt hashing, AES-256-CBC encryption, and HTTPS support out of the box.",
  },
  {
    icon: <FaReact />,
    title: "Modern Design",
    description: "Save the furious clicking and screaming for Overwatch. Reviactyl's interface is designed so well that even Sukuna would be impressed.",
  },
  {
    icon: <FaLaravel />,
    title: "Modern Tooling",
    description: "Built on a modern stack utilizing the best design practices that make it easy to jump in and make modifications.",
  },
  {
    icon: <FaCodeFork />,
    title: "Open Source",
    description: "Reviactyl is open-source, allowing community contributions and customization to improve server managing experience.",
  },
  {
    icon: <FaBatteryFull />,
    title: "Batteries Included",
    description: "Reviactyl offers top-notch features such as Client-Side Theme Selector, Designify Editor, Server Metrics, and much more.",
  },
];

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2 mb-2">
      <div className="flex w-full items-center justify-center border-x px-2 py-12 md:px-0 md:py-16 lg:py-20">
        <h2 className="text-pretty text-center text-2xl font-bold dark:opacity-90 dark:drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          Why Reviactyl?
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
