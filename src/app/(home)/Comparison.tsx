"use client";

import { useState } from "react";
import { Check, X, Minus, ChevronDown } from "lucide-react";

type CellValue = true | false | "partial" | string;

interface ComparisonRow {
  label: string;
  reviactyl: CellValue;
  pterodactyl: CellValue;
  pelican: CellValue;
}

const VISIBLE_ROW_COUNT = 6;

const rows: ComparisonRow[] = [
  { label: "Open source", reviactyl: true, pterodactyl: true, pelican: true },
  { label: "Extensions System", reviactyl: true, pterodactyl: false, pelican: true },
  { label: "OAuth/SSO Integration", reviactyl: true, pterodactyl: false, pelican: "partial" },
  { label: "Production-ready", reviactyl: true, pterodactyl: true, pelican: "partial" },
  { label: "Modern Stacks", reviactyl: true, pterodactyl: false, pelican: true },
  { label: "Theme/Color Selector", reviactyl: true, pterodactyl: false, pelican: false },
  { label: "Modern admin panel", reviactyl: true, pterodactyl: false, pelican: true },
  { label: "Multi-Editor Support", reviactyl: true, pterodactyl: false, pelican: "partial" },
  { label: "Built-in Theme Customizer", reviactyl: true, pterodactyl: false, pelican: false },
  { label: "Docker Support", reviactyl: true, pterodactyl: true, pelican: true },
  { label: "React Frontend", reviactyl: true, pterodactyl: true, pelican: false },
  { label: "Mature Ecosystem", reviactyl: "partial", pterodactyl: true, pelican: true },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-500/10 text-neutral-400 dark:bg-neutral-400/10 dark:text-neutral-500">
        <X className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="text-sm text-neutral-600 dark:text-neutral-300">{value}</span>
  );
}

export default function Comparison() {
  const [expanded, setExpanded] = useState(false);

  const visibleRows = rows.slice(0, VISIBLE_ROW_COUNT);
  const hiddenRows = rows.slice(VISIBLE_ROW_COUNT);
  const hasHiddenRows = hiddenRows.length > 0;

  return (
    <section className="bg-gradient-to-b from-fd-background/80 to-fd-background border-t border-b rounded-xl border-black/20 dark:border-zinc-800 mt-2 mb-2">
      <div className="flex w-full items-center justify-center border-x px-2 py-12 md:px-0 md:py-16 lg:py-20">
        <h2 className="text-pretty text-center text-2xl font-bold dark:opacity-90 dark:drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          How Reviactyl stacks up
        </h2>
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm dark:border-neutral-800">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-900">
                  <th
                    scope="col"
                    className="px-5 py-4 text-sm font-semibold text-neutral-500 dark:text-neutral-400"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="border-l border-neutral-200 px-3 py-4 text-center text-sm font-bold text-indigo-600 dark:border-neutral-800 dark:text-indigo-400"
                  >
                    Reviactyl
                  </th>
                  <th
                    scope="col"
                    className="border-l border-neutral-200 px-3 py-4 text-center text-sm font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                  >
                    Pterodactyl
                  </th>
                  <th
                    scope="col"
                    className="border-l border-neutral-200 px-3 py-4 text-center text-sm font-semibold text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                  >
                    Pelican
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`${
                      i % 2 === 1
                        ? "bg-neutral-50 dark:bg-neutral-900/40"
                        : "bg-white dark:bg-neutral-950"
                    } border-t border-neutral-200 dark:border-neutral-800`}
                  >
                    <td className="px-5 py-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {row.label}
                    </td>
                    <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                      <Cell value={row.reviactyl} />
                    </td>
                    <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                      <Cell value={row.pterodactyl} />
                    </td>
                    <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                      <Cell value={row.pelican} />
                    </td>
                  </tr>
                ))}

                {/* Hidden rows — blurred when collapsed, revealed when expanded */}
                {expanded &&
                  hiddenRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`${
                        (visibleRows.length + i) % 2 === 1
                          ? "bg-neutral-50 dark:bg-neutral-900/40"
                          : "bg-white dark:bg-neutral-950"
                      } border-t border-neutral-200 transition-opacity duration-500 dark:border-neutral-800`}
                    >
                      <td className="px-5 py-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {row.label}
                      </td>
                      <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                        <Cell value={row.reviactyl} />
                      </td>
                      <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                        <Cell value={row.pterodactyl} />
                      </td>
                      <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                        <Cell value={row.pelican} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {hasHiddenRows && !expanded && (
              <div className="relative -mt-px select-none border-t border-neutral-200 dark:border-neutral-800">
                <table className="w-full border-collapse text-left blur-sm">
                  <tbody>
                    {hiddenRows.slice(0, 3).map((row, i) => (
                      <tr
                        key={row.label}
                        className={
                          i % 2 === 1
                            ? "bg-neutral-50 dark:bg-neutral-900/40"
                            : "bg-white dark:bg-neutral-950"
                        }
                      >
                        <td className="px-5 py-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                          {row.label}
                        </td>
                        <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                          <Cell value={row.reviactyl} />
                        </td>
                        <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                          <Cell value={row.pterodactyl} />
                        </td>
                        <td className="border-l border-neutral-200 px-3 py-4 text-center dark:border-neutral-800">
                          <Cell value={row.pelican} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-neutral-950 dark:via-neutral-950/70" />
              </div>
            )}
          </div>

          {hasHiddenRows && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
              >
                {expanded
                  ? "Show fewer features"
                  : `Show ${hiddenRows.length} more feature${hiddenRows.length === 1 ? "" : "s"}`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            Full support
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <Minus className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            Partial support
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-500/10 text-neutral-400 dark:bg-neutral-400/10 dark:text-neutral-500">
              <X className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            Not supported
          </span>
        </div>
      </div>
    </section>
  );
}
