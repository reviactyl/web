"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Github,
  Moon,
  Sun,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Bot,
  Hand,
  Hammer,
  Database,
  Boxes,
  Egg,
} from "lucide-react";
import PanelStars from "@/components/PanelStars";
import Tooltip from "@/components/ui/Tooltip";
import { FaDiscord, FaHeart } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";

const mainLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Releases", href: "/releases" },
  {
    label: "Extensions",
    href: "https://rextstore.app/",
    external: true,
  },
];

const docsInstallation = [
  { label: "Panel Installation", icon: Bot, href: "/docs/panel/fresh-installation" },
  { label: "Agent Installation", icon: Hand, href: "/docs/agent/installing-agent" },
];

const docsDevelopment = [
  { label: "Building Extensions", icon: Hammer, href: "/docs/development/extensions" },
  { label: "Building Eggs", icon: Egg, href: "https://pterodactyl.io/community/config/eggs/creating_a_custom_egg.html" },
];

const switchFromTypes = [
  { label: "Pterodactyl Panel", icon: Database, href: "/docs/panel/migrating-from-pterodactyl" },
  { label: "Pterodactyl Wings", icon: Database, href: "/docs/agent/migrating-from-wings" },
];

const actionLinks = [
  {
    label: "Discord",
    href: "/discord",
    icon: FaDiscord,
    hoverColor: "hover:text-[#5865F2]",
  },
  {
    label: "Ko-fi",
    href: "https://ko-fi.com/reviactyl",
    icon: FaCoffee,
    hoverColor: "hover:text-[#FF5E5B]",
  },
  {
    label: "Sponsor",
    href: "https://github.com/sponsors/reviactyl/",
    icon: FaHeart,
    hoverColor: "hover:text-pink-500",
  },
];

function DocsMenuItem({
  item,
}: {
  item: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group flex min-w-0 items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
    >
      <Icon
        className="h-[18px] w-[18px] shrink-0 stroke-[1.7] text-neutral-400 transition-colors group-hover:text-neutral-700 dark:text-neutral-500 dark:group-hover:text-neutral-200"
        aria-hidden="true"
      />

      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function DocsDropdown() {
  return (
    <div className="absolute left-1/2 ml-10 top-full z-50 w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/5 pt-3">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/10 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/40">
        <div className="grid grid-cols-[1fr_1fr_1fr_1.15fr]">
          <div className="px-9 py-7">
            <h3 className="mb-7 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              Installation
            </h3>

            <div className="space-y-4">
              {docsInstallation.map((item) => (
                <DocsMenuItem key={`installation-${item.label}`} item={item} />
              ))}
            </div>
          </div>

          <div className="px-9 py-7">
            <h3 className="mb-7 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              Development
            </h3>

            <div className="space-y-4">
              {docsDevelopment.map((item) => (
                <DocsMenuItem key={`development-${item.label}`} item={item} />
              ))}
            </div>
          </div>

          <div className="px-9 py-7">
            <h3 className="mb-7 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              Switch From
            </h3>

            <div className="space-y-4">
              {switchFromTypes.map((item) => (
                <DocsMenuItem key={`switch-from-${item.label}`} item={item} />
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-neutral-200 bg-neutral-50 px-9 py-4 dark:border-neutral-800 dark:bg-neutral-900/40">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
          >
            <Boxes className="h-4 w-4" />

            <span>Browse all documentation</span>

            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const dark = stored ? stored === "dark" : prefersDark;

    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;

    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const themeLabel =
    mounted && isDark ? "Switch to light mode" : "Switch to dark mode";

  const docsActive = pathname?.startsWith("/docs");

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-neutral-200/50 transition-all duration-300 dark:border-neutral-800/50 ${
        scrolled
          ? "bg-white/75 backdrop-blur-md dark:bg-neutral-950/75"
          : "bg-white dark:bg-neutral-950"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <Image
              src="/logo-darker.png"
              alt="Reviactyl"
              width={120}
              height={28}
              className="h-9 w-auto dark:hidden"
              priority
            />

            <Image
              src="/logo.png"
              alt="Reviactyl"
              width={120}
              height={28}
              className="hidden h-9 w-auto dark:block"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            <li
              className="relative"
              onMouseEnter={() => setDocsOpen(true)}
              onMouseLeave={() => setDocsOpen(false)}
            >
              <Link
                href="/docs"
                className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  docsActive || docsOpen
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white"
                }`}
                aria-haspopup="true"
                aria-expanded={docsOpen}
              >
                Docs

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    docsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </Link>

              {docsOpen && <DocsDropdown />}
            </li>

            {mainLinks.map((link) => {
              const active =
                !link.external && pathname?.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer noopener" : undefined}
                    className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                      active
                        ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white"
                    }`}
                  >
                    {link.label}

                    {link.external && (
                      <ArrowUpRight
                        className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-1.5 border-r border-neutral-200 pr-2 dark:border-neutral-800">
            {actionLinks.map((link) => (
              <Tooltip key={link.label} label={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`p-2 text-neutral-400 transition-colors dark:text-neutral-500 ${link.hoverColor}`}
                >
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{link.label}</span>
                </a>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Tooltip label="View source on GitHub">
              <a
                href="https://github.com/reviactyl/panel"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-3 pr-1 text-sm font-medium text-neutral-600 transition-all hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />

                <span>reviactyl</span>

                <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-white">
                  <PanelStars />
                </span>
              </a>
            </Tooltip>

            <Tooltip label={themeLabel}>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {mounted && isDark ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </Tooltip>

            <a
              href="https://demo.reviactyl.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-md dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Live Demo
            </a>
          </div>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {mounted && isDark ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((v) => !v);
              setMobileDocsOpen(false);
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-neutral-200/60 bg-white/95 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-950/95 dark:shadow-black/20 lg:hidden">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain px-4 pb-6 pt-3">
            <div className="space-y-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-2 dark:border-neutral-800 dark:bg-neutral-900/40">
                <button
                  type="button"
                  onClick={() => setMobileDocsOpen((v) => !v)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                    docsActive || mobileDocsOpen
                      ? "text-neutral-950 dark:text-white"
                      : "text-neutral-700 dark:text-neutral-200"
                  }`}
                  aria-expanded={mobileDocsOpen}
                >
                  <span className="flex items-center gap-3">
                    <Boxes className="h-[18px] w-[18px] text-neutral-400" />
                    Documentation
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                      mobileDocsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDocsOpen && (
                  <div className="mt-1 border-t border-neutral-200/70 px-1 pb-1 pt-2 dark:border-neutral-800">
                    <Link
                      href="/docs"
                      onClick={() => setMobileOpen(false)}
                      className="mb-3 flex items-center justify-between rounded-xl bg-white px-3 py-3 text-sm font-medium text-neutral-800 shadow-sm ring-1 ring-neutral-200/70 dark:bg-neutral-900 dark:text-white dark:ring-neutral-800"
                    >
                      <span>Documentation Home</span>

                      <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                    </Link>

                    <div className="mb-4">
                      <p className="px-2.5 pb-1.5 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                        Installation
                      </p>

                      <div className="grid grid-cols-2 gap-0.5">
                        {docsInstallation.map((item) => (
                          <DocsMenuItem
                            key={`mobile-skill-${item.label}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="px-2.5 pb-1.5 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                        Development
                      </p>

                      <div className="grid grid-cols-2 gap-0.5">
                        {docsDevelopment.map((item) => (
                          <DocsMenuItem
                            key={`mobile-development-${item.label}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="px-2.5 pb-1.5 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                        Switch From
                      </p>

                      <div className="grid grid-cols-2 gap-0.5">
                        {switchFromTypes.map((item) => (
                          <DocsMenuItem
                            key={`mobile-switch-from-${item.label}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-950">
                {mainLinks.map((link) => (
                  <Link
                    key={`mobile-main-${link.href}`}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer noopener" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-neutral-700 transition-colors active:bg-neutral-100 dark:text-neutral-300 dark:active:bg-neutral-900"
                  >
                    <span>{link.label}</span>

                    {link.external && (
                      <ArrowUpRight
                        className="h-4 w-4 text-neutral-400"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="https://demo.reviactyl.app/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors active:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:active:bg-neutral-200"
                >
                  Live Demo
                </a>

                <div className="mt-4 flex items-center justify-center gap-7">
                  {[
                    ...actionLinks,
                    {
                      label: "GitHub",
                      href: "https://github.com/reviactyl/panel",
                      icon: Github,
                      hoverColor:
                        "hover:text-neutral-900 dark:hover:text-white",
                    },
                  ].map((link) => (
                    <a
                      key={`mobile-action-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`p-1 text-neutral-400 transition-colors dark:text-neutral-500 ${link.hoverColor}`}
                    >
                      <link.icon
                        className="h-[19px] w-[19px]"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
