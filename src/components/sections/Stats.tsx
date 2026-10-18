"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import TotalDownloads from "@/components/api/TotalDownloads";
import TotalStars from "@/components/api/TotalStars";
import TotalInstalls from "@/components/api/TotalInstalls";

const CountUp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const source = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [target, setTarget] = useState<number | null>(null);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const element = source.current;
        if (!element) return;

        const read = () => {
            const value = Number((element.textContent ?? "").replace(/,/g, ""));
            setTarget(Number.isFinite(value) && element.textContent?.trim() ? value : null);
        };

        read();
        const observer = new MutationObserver(read);
        observer.observe(element, { childList: true, characterData: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || target === null) return;

        const controls = animate(0, target, {
            duration: 1.6,
            ease: "easeOut",
            onUpdate: (latest) => setDisplay(Math.round(latest)),
        });

        return () => controls.stop();
    }, [inView, target]);

    return (
        <span ref={ref}>
            <span ref={source} hidden>
                {children}
            </span>
            {target === null ? "0" : display.toLocaleString()}
        </span>
    );
};

const stats = [
    { label: "Unique Installations", value: <CountUp><TotalInstalls /></CountUp> },
    { label: "Total Downloads", value: <CountUp><TotalDownloads /></CountUp> },
    { label: "Total Stars", value: <CountUp><TotalStars /></CountUp> },
];

const Stats: React.FC = () => {
    return (
        <section className="relative overflow-hidden border-b border-gray-50/10 bg-gray-950 text-gray-50">
            <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="mt-8 bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                        Let the numbers speak
                    </h2>
                </motion.div>

                <div className="grid gap-4 pb-10 sm:grid-cols-3">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50 p-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-50/20 hover:bg-gray-900/80"
                        >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gray-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gray-50/4 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative flex flex-col gap-1">
                                <span className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent tabular-nums">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-gray-400">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
