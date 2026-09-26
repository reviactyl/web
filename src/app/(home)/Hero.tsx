"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaArrowRight, FaArrowTurnUp } from "react-icons/fa6";
import PanelInstalls from "@/components/PanelInstalls";

const slides = [
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    href: "/#",
    image: "/preview/admin_overview.webp",
  },
  {
    id: "admin-monitoring",
    title: "Node Monitoring",
    href: "/#",
    image: "/preview/admin_monitoring.webp",
  },
  {
    id: "admin-servers",
    title: "Servers Management",
    href: "/#",
    image: "/preview/admin_servers.webp",
  },
  {
    id: "dashboard-overview",
    title: "User Dashboard Overview",
    href: "/#",
    image: "/preview/dashboard_overview.webp",
  },
  {
    id: "dashboard-server",
    title: "User Server Overview",
    href: "/#",
    image: "/preview/dashboard_servers.webp",
  },
  {
    id: "dashboard-account",
    title: "User Account Details",
    href: "/#",
    image: "/preview/dashboard_account.webp",
  },
  {
    id: "dashboard-passkeys",
    title: "User Passkeys",
    href: "/#",
    image: "/preview/dashboard_passkeys.webp",
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, []);

  const previous = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length,
    );
  }, []);

  useEffect(() => {
    const interval = window.setInterval(next, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [next]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previous();
      }

      if (event.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [next, previous]);

  return (
    <section className="relative isolate overflow-hidden bg-white text-neutral-950 transition-colors dark:bg-[#080910] dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-[48%] top-[-300px] h-[700px] w-[700px] rounded-full bg-violet-500/5 blur-[180px] dark:bg-[#343a8f]/10" />
        <div className="absolute right-[-100px] top-[100px] h-[650px] w-[650px] rounded-full bg-blue-500/5 blur-[160px] dark:bg-[#1d245c]/10" />
      </div>

      <div className="relative mx-auto min-h-[700px] max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="relative flex min-h-[700px] items-center">
          <div className="relative z-30 w-full pt-16 text-center lg:w-[54%] lg:pt-0 lg:text-left">
            <h1 className="mx-auto max-w-[600px] text-[42px] font-medium leading-[1.08] tracking-[-0.045em] text-neutral-900 sm:text-[52px] lg:mx-0 lg:text-[58px] xl:text-[62px] dark:text-white">
              <span className="block">
                Your Infrastructure.
              </span>

              <span className="block text-neutral-500 dark:text-[#d8d9e0]">
                Total Control.
              </span>
            </h1>

            <p className="mt-6 max-w-[570px] text-[18px] leading-[1.45] tracking-[-0.01em] text-neutral-600 sm:text-[20px] dark:text-[#9299b5]">
              15x faster than Pterodactyl.
              <br />
              Open-source, secure, and built for the modern hosts.
            </p>

            <div className="mt-8">
              <Link
                href="/docs"
                className="group relative inline-flex h-[56px] cursor-pointer items-center justify-center rounded-full bg-neutral-900 py-1 pl-6 pr-14 text-lg shadow-lg shadow-black/10 transition hover:bg-neutral-800 dark:bg-white/90 dark:shadow-white/5 dark:hover:bg-white"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-white dark:text-black">
                  Get Started

                  <span className="rounded-xl border border-emerald-300 bg-emerald-300/20 px-2 py-1 text-sm font-bold dark:border-emerald-600 dark:bg-emerald-600/20">
                    Free
                  </span>
                </span>

                <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full border border-blue-300 bg-blue-300/20 transition-[width] group-hover:w-[calc(100%-8px)] dark:border-blue-600 dark:bg-blue-600/20">
                  <div className="mr-3.5 flex items-center justify-center">
                    <FaArrowRight className="h-5 w-5 text-white dark:text-black" />
                  </div>
                </div>
              </Link>
            </div>

            <p className="mt-2 inline-flex max-w-[570px] items-center gap-1 text-[13px] leading-[1.8] text-neutral-500 dark:text-[#65708d]">
              <span className="font-bold text-neutral-900 dark:text-white">
                <PanelInstalls />+ panels
              </span>

              <span>are using Reviactyl</span>

              <FaArrowTurnUp className="ml-0.5 h-3 w-3 rotate-90 text-neutral-400 dark:text-neutral-500" />
            </p>
          </div>

          <div className="relative hidden lg:absolute lg:right-[-80px] lg:top-[45px] lg:block lg:h-[610px] lg:w-[875px]">
            <div className="absolute inset-0">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={slide.id}
                    className={[
                      "absolute inset-0 transition-all duration-700 ease-in-out",
                      isActive
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0",
                    ].join(" ")}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="875px"
                      className="object-contain object-left"
                    />
                  </div>
                );
              })}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-[38%] bg-gradient-to-r from-white via-white/70 to-transparent lg:block dark:from-[#080910] dark:via-[#080910]/70"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[40%] bg-gradient-to-t from-white via-white/60 to-transparent dark:from-[#080910] dark:via-[#080910]/60"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[15%] bg-gradient-to-l from-white to-transparent lg:block dark:from-[#080910]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[20%] bg-gradient-to-b from-white/50 to-transparent dark:from-[#080910]/50"
            />
          </div>

          <div className="absolute bottom-[40px] right-[80px] z-40 hidden w-[320px] lg:block">
            <div className="mb-5 h-5 text-center text-[14px] text-neutral-500 dark:text-[#747c98]">
              {slides.map((slide, index) => (
                <Link
                  key={slide.id}
                  href={slide.href}
                  className={[
                    "absolute left-0 right-0 transition-all duration-500",
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0",
                  ].join(" ")}
                >
                  {slide.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous slide"
                className="flex h-[31px] w-[31px] items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-500 backdrop-blur-md transition hover:border-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:border-[#939db8]/20 dark:bg-[#171926]/80 dark:text-[#939db8] dark:hover:border-[#939db8]/40 dark:hover:bg-[#202332] dark:hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-[3px]">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to ${slide.title}`}
                    aria-current={
                      index === activeIndex ? "true" : undefined
                    }
                    className="group flex h-7 items-center px-[5px]"
                  >
                    <span
                      className={[
                        "block rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "h-[6px] w-[6px] bg-neutral-800 dark:bg-[#aeb6d0]"
                          : "h-[6px] w-[6px] bg-neutral-300 group-hover:bg-neutral-500 dark:bg-[#252a3a] dark:group-hover:bg-[#626a83]",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-[31px] w-[31px] items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-500 backdrop-blur-md transition hover:border-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 dark:border-[#939db8]/20 dark:bg-[#171926]/80 dark:text-[#939db8] dark:hover:border-[#939db8]/40 dark:hover:bg-[#202332] dark:hover:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
