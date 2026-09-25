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
} from "lucide-react";
import PanelStars from "@/components/PanelStars";
import Tooltip from "@/components/ui/Tooltip";
import { FaDiscord, FaHeart } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";

const mainLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  {
    label: "Extensions",
    href: "https://rextstore.app/",
    external: true,
  },
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

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
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
    mounted && isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-neutral-200/50 dark:border-neutral-800/50 ${
        scrolled
          ? "bg-white/75 backdrop-blur-md dark:bg-neutral-950/75"
          : "bg-white dark:bg-neutral-950"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
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
            {mainLinks.map((link) => {
              const active =
                !link.external && pathname?.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={
                      link.external
                        ? "noreferrer noopener"
                        : undefined
                    }
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
                  <link.icon
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
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
                <Github
                  className="h-4 w-4"
                  aria-hidden="true"
                />

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
                  <Sun
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                ) : (
                  <Moon
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
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

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {mounted && isDark ? (
              <Sun
                className="h-5 w-5"
                aria-hidden="true"
              />
            ) : (
              <Moon
                className="h-5 w-5"
                aria-hidden="true"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {mobileOpen ? (
              <X
                className="h-5 w-5"
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="h-5 w-5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-neutral-200/50 bg-white/95 shadow-lg backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-950/95 lg:hidden">
          <div className="flex flex-col space-y-4 px-4 pb-6 pt-4">
            <ul className="flex flex-col gap-1 border-b border-neutral-200 pb-4 dark:border-neutral-800">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={
                      link.external
                        ? "noreferrer noopener"
                        : undefined
                    }
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-white"
                  >
                    {link.label}

                    {link.external && (
                      <ArrowUpRight
                        className="h-4 w-4 opacity-50"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <a
                href="https://demo.reviactyl.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-all dark:bg-white dark:text-neutral-950"
              >
                Live Demo
              </a>

              <div className="flex items-center justify-center gap-6 pt-2">
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
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`text-neutral-500 transition-colors ${link.hoverColor}`}
                  >
                    <link.icon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
