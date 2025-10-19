"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as OutlineIcons from "@revicons/react/outline";
import * as SolidIcons from "@revicons/react/solid";
import Footer from "../Footer";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type IconEntry = {
  name: string;
  Component: IconComponent;
  variant: "outline" | "solid";
};

export default function Page() {
  const [query, setQuery] = useState("");
  const [variant, setVariant] = useState<"outline" | "solid">("outline");
  const [copied, setCopied] = useState<string | null>(null);

  const allIcons: IconEntry[] = useMemo(() => {
    const outlineEntries: IconEntry[] = Object.entries(OutlineIcons).map(
      ([name, Comp]) => ({
        name,
        Component: Comp as IconComponent,
        variant: "outline" as const,
      })
    );

    const solidEntries: IconEntry[] = Object.entries(SolidIcons).map(
      ([name, Comp]) => ({
        name,
        Component: Comp as IconComponent,
        variant: "solid" as const,
      })
    );

    return [...outlineEntries, ...solidEntries];
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allIcons
      .filter((icon) => icon.variant === variant)
      .filter((icon) => {
        if (!q) return true;
        return icon.name.toLowerCase().includes(q);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allIcons, query, variant]);

  async function copyName(name: string) {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = name;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(name);
      } catch (err) {
        console.error("copy failed", err);
      }
      document.body.removeChild(ta);
    }
  }

  return (
    <main className="relative h-full w-full">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative z-10 border border-black/20 dark:border-zinc-800 m-4 rounded-xl">
        <div className="bg-[radial-gradient(125%_125%_at_50%_10%,_#ffffff_40%,_#ffcccc_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,_#000000_40%,_#2b0707_100%)] rounded-xl border py-12 md:px-8">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <h1 className="mb-2 text-3xl font-bold">Revicons</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setVariant("outline")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    variant === "outline"
                      ? "bg-white dark:bg-zinc-700 shadow"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  Outline
                </button>
                <button
                  onClick={() => setVariant("solid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    variant === "solid"
                      ? "bg-white dark:bg-zinc-700 shadow"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  Solid
                </button>
              </div>
            </div>
          </header>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search icons by name - try 'arrow', 'chevron', 'user'..."
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3 pl-4 pr-12 text-sm shadow-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-300 outline-none transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
                {filtered.length} icons
              </div>
            </div>
          </div>
        </div>

        <section className="p-2 bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filtered.map(({ name, Component }) => (
              <div
                key={name}
                className="group relative rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-4 flex flex-col items-center gap-3 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 shadow-sm">
                  <Component
                    className="w-8 h-8 text-zinc-700 dark:text-zinc-100"
                    aria-hidden
                  />
                </div>

                <div className="text-xs text-center text-zinc-600 dark:text-zinc-300 break-words">
                  {name.length > 18 ? name.slice(0, 18) + ".." : name}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyName(name)}
                    className="text-[10px] px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                    aria-label={`Copy ${name}`}
                  >
                    {copied === name ? "Copied" : "Copy name"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center text-zinc-500 dark:text-zinc-400">
              No icons match your search.
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
