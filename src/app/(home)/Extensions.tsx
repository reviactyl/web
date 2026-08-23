"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
} from "lucide-react";

type Resource = {
  title: string;
  banner: string;
  category_id: number;
  author: string;
  description: string;
  link: string;
};

type ExtensionsResponse = {
  category_id: number;
  resources: Resource[];
};

export default function Extensions() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const response = await fetch("/api/v26/get-extensions", {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch extensions");
        }

        const data: ExtensionsResponse = await response.json();

        setResources(
          data.resources.filter(
            (resource) => resource.category_id === data.category_id
          )
        );
      } catch (error) {
        console.error("Failed to fetch extensions:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchExtensions();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollBy({
      left:
        direction === "right"
          ? container.clientWidth
          : -container.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        mt-2 mb-2
        overflow-hidden
        rounded-xl
        border
        border-black/20
        bg-gradient-to-b
        from-fd-background/80
        to-fd-background
        dark:border-zinc-800
      "
    >
      <div className="flex w-full items-center justify-center border-x px-2 py-8 md:px-0 md:py-12 lg:py-16">
        <h2 className="text-pretty text-center text-2xl font-bold dark:opacity-90 dark:drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          Our Ecosystem
        </h2>
      </div>

      <div className="border-b border-black/10 dark:border-zinc-800">
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
          </div>
        )}

        {error && !loading && (
          <div className="px-6 py-16 text-center">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Failed to load extensions
            </h3>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Please try again later.
            </p>
          </div>
        )}

        {!loading && !error && resources.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No extensions available.
            </p>
          </div>
        )}

        {!loading && !error && resources.length > 0 && (
          <div
            ref={containerRef}
            className="
              flex
              snap-x
              snap-mandatory
              gap-4
              overflow-x-auto
              px-4
              py-5
              scroll-smooth
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              md:px-8
              md:py-8
            "
          >
            {resources.map((resource, index) => (
              <a
                key={`${resource.link}-${index}`}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  min-w-[calc(100%-1rem)]
                  snap-start
                  overflow-hidden
                  rounded-xl
                  border
                  border-zinc-200
                  bg-background
                  transition
                  hover:-translate-y-0.5
                  hover:border-zinc-300
                  hover:shadow-lg
                  hover:shadow-zinc-950/5

                  sm:min-w-[calc((100%-1rem)/2)]

                  lg:min-w-[calc((100%-2rem)/3)]

                  dark:border-zinc-800
                  dark:bg-zinc-950
                  dark:hover:border-zinc-700
                  dark:hover:shadow-black/20
                "
              >
                <div className="relative aspect-[2.2/1] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={resource.banner}
                    alt={resource.title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />

                  <div
                    className="
                      absolute
                      right-3
                      top-3
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/20
                      bg-black/40
                      text-white
                      opacity-0
                      backdrop-blur-md
                      transition
                      group-hover:opacity-100
                    "
                  >
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                    {resource.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                    {resource.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <div
                      className="
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-zinc-100
                        text-[10px]
                        font-semibold
                        uppercase
                        text-zinc-600
                        dark:bg-zinc-800
                        dark:text-zinc-300
                      "
                    >
                      {resource.author.slice(0, 2)}
                    </div>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      by{" "}
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {resource.author}
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {!loading && !error && resources.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            {resources.length} extensions available
          </span>

          <span className="text-xs text-zinc-400 dark:text-zinc-600">
            Scroll to explore
          </span>
        </div>
      )}
    </section>
  );
}
