"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const API_URL = "/api/v26/get-extensions";

interface Extension {
    title: string;
    banner: string;
    link: string;
}

interface ExtensionsResponse {
    resources: Extension[];
}

interface MarqueeRowProps {
    items: Extension[];
    direction: "left" | "right";
    duration: number;
}

const rows: { direction: "left" | "right"; duration: number }[] = [
    { direction: "left", duration: 70 },
    { direction: "right", duration: 80 },
];

const keyframes = `
@keyframes marquee-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}
@keyframes marquee-right {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
}
.marquee-left { animation: marquee-left linear infinite; }
.marquee-right { animation: marquee-right linear infinite; }
@media (prefers-reduced-motion: reduce) {
    .marquee-left, .marquee-right { animation: none; }
}
`;

const decodeEntities = (text: string) =>
    text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

const shuffle = <T,>(list: T[]) => {
    const result = [...list];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, duration }) => {
    const repeat = Math.max(1, Math.ceil(8 / items.length));
    const loop = Array.from({ length: repeat }).flatMap(() => items);

    return (
        <div
            style={{
                maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
            className="group/row flex overflow-hidden"
        >
            <div
                style={{ animationDuration: `${duration}s` }}
                className={`flex w-max shrink-0 group-hover/row:[animation-play-state:paused] ${
                    direction === "left" ? "marquee-left" : "marquee-right"
                }`}
            >
                {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
                        {loop.map((extension, index) => (
                            <a
                                key={`${extension.link}-${index}`}
                                href={extension.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={copy === 1 ? -1 : undefined}
                                className="group/card relative block aspect-video w-52 shrink-0 overflow-hidden rounded-lg border border-gray-50/10 bg-gray-900/50 sm:w-60"
                            >
                                <img
                                    src={extension.banner}
                                    alt={extension.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                />
                                <div className="absolute inset-0 flex items-end justify-between gap-2 bg-linear-to-t from-gray-950/90 via-gray-950/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                                    <span className="text-left text-xs font-semibold leading-snug text-gray-50">
                                        {extension.title}
                                    </span>
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-50/10 bg-gray-50 text-gray-900">
                                        <FaArrowUpRightFromSquare className="h-2.5 w-2.5" />
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Ecosystem: React.FC = () => {
    const [shuffledRows, setShuffledRows] = useState<Extension[][]>([]);
    const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

    useEffect(() => {
        const controller = new AbortController();

        fetch(API_URL, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Request failed");
                return response.json() as Promise<ExtensionsResponse>;
            })
            .then((data) => {
                const extensions = data.resources.map((resource) => ({
                    title: decodeEntities(resource.title),
                    banner: resource.banner,
                    link: resource.link,
                }));
                setShuffledRows(rows.map(() => shuffle(extensions)));
                setStatus("ready");
            })
            .catch((error) => {
                if (error.name !== "AbortError") setStatus("error");
            });

        return () => controller.abort();
    }, []);

    if (status === "error") return null;

    return (
        <section className="relative overflow-hidden border-b border-gray-50/10 bg-gray-950 text-gray-50">
            <style>{keyframes}</style>

            <div className="relative flex flex-col gap-12 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="px-6 text-center"
                >
                    <h2 className="mt-8 bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                        Growing Ecosystem
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-4 pb-10">
                    {status === "loading" &&
                        rows.map((_, index) => (
                            <div key={index} className="flex gap-4 overflow-hidden">
                                {Array.from({ length: 6 }).map((_, item) => (
                                    <div
                                        key={item}
                                        className="aspect-video w-52 shrink-0 animate-pulse rounded-lg border border-gray-50/10 bg-gray-900/50 sm:w-60"
                                    />
                                ))}
                            </div>
                        ))}

                    {status === "ready" &&
                        shuffledRows.map((items, index) => (
                            <MarqueeRow
                                key={index}
                                items={items}
                                direction={rows[index].direction}
                                duration={rows[index].duration}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
