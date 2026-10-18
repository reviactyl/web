"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/sections/Navbar";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown, FaMagnifyingGlass, FaUser, FaXmark } from "react-icons/fa6";
import Footer from "@/components/sections/Footer";

const API_URL = "/api/v26/get-extensions";

interface Extension {
    title: string;
    banner: string;
    category_id: number;
    author: string;
    description: string;
    link: string;
}

interface ExtensionsResponse {
    category_id: number;
    resources: Extension[];
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const sortOptions = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "author", label: "Author" },
];

const decodeEntities = (text: string) =>
    text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

const getId = (link: string) => Number(link.match(/\/r\/(\d+)/)?.[1] ?? 0);

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full appearance-none rounded-full border border-gray-50/10 bg-gray-900/50 py-2.5 pl-4 pr-10 text-sm text-gray-300 outline-none transition-colors hover:border-gray-50/20 focus:border-gray-50/30"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-900">
                        {option.label}
                    </option>
                ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default function MarketplacePage() {
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("newest");
    const [author, setAuthor] = useState("all");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setStatus("loading");

        fetch(API_URL, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Request failed");
                return response.json() as Promise<ExtensionsResponse>;
            })
            .then((data) => {
                setExtensions(
                    data.resources.map((resource) => ({
                        ...resource,
                        title: decodeEntities(resource.title),
                        description: decodeEntities(resource.description),
                    }))
                );
                setStatus("ready");
            })
            .catch((error) => {
                if (error.name !== "AbortError") setStatus("error");
            });

        return () => controller.abort();
    }, [attempt]);

    const authors = useMemo(
        () => Array.from(new Set(extensions.map((extension) => extension.author))).sort((a, b) => a.localeCompare(b)),
        [extensions]
    );

    const authorOptions = useMemo(
        () => [{ value: "all", label: "All authors" }, ...authors.map((name) => ({ value: name, label: name }))],
        [authors]
    );

    const filtered = useMemo(() => {
        const search = query.trim().toLowerCase();

        const matches = extensions.filter((extension) => {
            const matchesAuthor = author === "all" || extension.author === author;
            const matchesSearch =
                !search ||
                extension.title.toLowerCase().includes(search) ||
                extension.author.toLowerCase().includes(search) ||
                extension.description.toLowerCase().includes(search);
            return matchesAuthor && matchesSearch;
        });

        return matches.sort((a, b) => {
            switch (sort) {
                case "oldest":
                    return getId(a.link) - getId(b.link);
                case "name-asc":
                    return a.title.localeCompare(b.title);
                case "name-desc":
                    return b.title.localeCompare(a.title);
                case "author":
                    return a.author.localeCompare(b.author) || a.title.localeCompare(b.title);
                default:
                    return getId(b.link) - getId(a.link);
            }
        });
    }, [extensions, query, sort, author]);

    const hasFilters = query !== "" || author !== "all" || sort !== "newest";

    const resetFilters = () => {
        setQuery("");
        setAuthor("all");
        setSort("newest");
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-50">
            <div className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 rounded-full bg-gray-50/6 blur-3xl" />

            <Navbar />

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-36">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-4 text-center"
                >
                    <h1 className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        Extension Marketplace
                    </h1>
                    <p className="max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                        Browse extensions built by the community and add new features to your panel without touching
                        the core.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col gap-3 md:flex-row md:items-center"
                >
                    <div className="relative flex-1">
                        <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search extensions, authors or descriptions"
                            className="w-full rounded-full border border-gray-50/10 bg-gray-900/50 py-2.5 pl-10 pr-4 text-sm text-gray-50 outline-none transition-colors placeholder:text-gray-500 hover:border-gray-50/20 focus:border-gray-50/30"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:flex">
                        <Select value={author} onChange={setAuthor} options={authorOptions} />
                        <Select value={sort} onChange={setSort} options={sortOptions} />
                    </div>
                </motion.div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                        {status === "ready"
                            ? `${filtered.length} ${filtered.length === 1 ? "extension" : "extensions"}`
                            : "\u00a0"}
                    </span>
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-gray-50"
                        >
                            <FaXmark className="h-3 w-3" /> Clear filters
                        </button>
                    )}
                </div>

                {status === "loading" && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-72 animate-pulse rounded-2xl border border-gray-50/10 bg-gray-900/50"
                            />
                        ))}
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-50/10 bg-gray-900/50 px-6 py-16 text-center">
                        <p className="text-gray-400">Couldn&apos;t load extensions right now.</p>
                        <button
                            type="button"
                            onClick={() => setAttempt((prev) => prev + 1)}
                            className="rounded-full border border-gray-50/10 bg-gray-50/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-50/10 hover:text-gray-50"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {status === "ready" && filtered.length === 0 && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-50/10 bg-gray-900/50 px-6 py-16 text-center">
                        <p className="text-gray-50">No extensions found</p>
                        <p className="text-sm text-gray-400">Try a different search or clear your filters.</p>
                    </div>
                )}

                {status === "ready" && filtered.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((extension, index) => (
                            <motion.a
                                key={extension.link}
                                href={extension.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-50/20 hover:bg-gray-900/80"
                            >
                                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-gray-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="aspect-video overflow-hidden border-b border-gray-50/10 bg-gray-800/80">
                                    <img
                                        src={extension.banner}
                                        alt={extension.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-4 p-5">
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="m-0 p-0 text-base font-semibold leading-snug tracking-tight text-gray-50">
                                            {extension.title}
                                        </h3>
                                        <p className="m-0 line-clamp-2 p-0 text-sm leading-relaxed text-gray-400">
                                            {extension.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-gray-50/5 pt-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <FaUser className="h-3 w-3" /> {extension.author}
                                        </span>
                                        <span className="flex items-center gap-1 font-medium text-gray-300 transition-colors group-hover:text-gray-50">
                                            View <FaChevronRight className="h-2.5" />
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
