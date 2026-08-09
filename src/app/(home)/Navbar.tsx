"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import PanelStars from "@/components/PanelStars";
import { FaBook, FaRss, FaDiscord, FaStar, FaHeart, FaComputer } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";

const navLinks = [
  { label: "Docs", href: "/docs", icon: FaBook, iconColor: "text-blue-500 dark:text-blue-400" },
  { label: "Blog", href: "/blog", icon: FaRss, iconColor: "text-blue-500 dark:text-blue-400" },
  { label: "Sponsor (Ko-fi)", href: "https://ko-fi.com/reviactyl", external: true, icon: FaCoffee, iconColor: "text-red-500 dark:text-red-400" },
  { label: "Sponsor (GitHub)", href: "https://github.com/sponsors/reviactyl/", external: true, icon: FaHeart, iconColor: "text-red-500 dark:text-red-400" },
  { label: "Live Demo", href: "https://demo.reviactyl.dev/", external: true, icon: FaComputer, iconColor: "text-blue-500 dark:text-blue-400" },
  { label: "Get Help", href: "/discord", icon: FaDiscord, iconColor: "text-blue-800 dark:text-blue-600 w-5", external: true },
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
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
        scrolled
          ? "border-neutral-200/80 bg-white/80 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/80"
          : "border-transparent bg-white dark:bg-neutral-950"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-semibold">
          <Image
            src="/logo-darker.png"
            alt="Reviactyl"
            width={140}
            height={32}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo.png"
            alt="Reviactyl"
            width={140}
            height={32}
            className="hidden h-8 w-auto dark:block"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 px-4 md:flex">
          {navLinks.map((link) => {
            const active = !link.external && pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer noopener" : undefined}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {link.icon && <link.icon className={`h-4 ${link.iconColor}`} aria-hidden="true" />}
                  {link.label}
                  {link.external && <ArrowUpRight className="h-3 w-3" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto hidden items-center gap-2 lg:flex">


          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-neutral-200 p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            {mounted && isDark ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <a
            href="https://github.com/reviactyl/panel"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="flex items-center gap-2 rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
            <p className="font-semibold text-sm">reviacty/panel</p> <span className="font-light text-xs border border-yellow-400/50 bg-yellow-400/20 text-yellow-800 dark:text-yellow-200 p-1 rounded-full flex items-center gap-1"><PanelStars /><FaStar /></span>
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            {mounted && isDark ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
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
        <div className="border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer noopener" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  {link.icon && <link.icon className={`h-4 w-4 ${link.iconColor}`} aria-hidden="true" />}
                  {link.label}
                  {link.external && <ArrowUpRight className="h-3 w-3" aria-hidden="true" />}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/reviactyl/panel"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
