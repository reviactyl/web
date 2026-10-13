"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

const sponsors = [
    { name: "Cloud-Exa", href: "https://cloudexa-hosting.com/", logo: "/sponsors/cloudexa.webp" },
    { name: "Tietokettu", href: "https://tietokettu.net", logo: "/sponsors/tietokettu.png" },
    { name: "not yet sponsored 0", href: "https://github.com/sponsors/reviactyl", logo: "https://placehold.co/240x80/111827/9ca3af?text=Add+yours" },
    { name: "not yet sponsored 1", href: "https://github.com/sponsors/reviactyl", logo: "https://placehold.co/240x80/111827/9ca3af?text=Add+yours" },
    { name: "not yet sponsored 2", href: "https://github.com/sponsors/reviactyl", logo: "https://placehold.co/240x80/111827/9ca3af?text=Add+yours" },
    { name: "not yet sponsored 3", href: "https://github.com/sponsors/reviactyl", logo: "https://placehold.co/240x80/111827/9ca3af?text=Add+yours" },
    { name: "not yet sponsored 4", href: "https://github.com/sponsors/reviactyl", logo: "https://placehold.co/240x80/111827/9ca3af?text=Add+yours" },
    { name: "not yet sponsored 5", href: "https://github.com/sponsors/reviactyl", logo: "https://placehold.co/240x80/111827/9ca3af?text=Add+yours" },
];

const Sponsors: React.FC = () => {
    return (
        <section className="relative overflow-hidden border-b border-gray-50/10 bg-gray-950 text-gray-50">
            <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-4 text-center"
                >
                    <h2 className="mt-8 bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                        Our Sponsors
                    </h2>
                    <p className="max-w-xl text-base leading-relaxed text-gray-400">
                        Reviactyl is made possible by the people and companies who believe in open-source game server
                        management.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {sponsors.map((sponsor, index) => (
                        <motion.a
                            key={sponsor.name}
                            href={`${sponsor.href}?utm_source=reviactyl&utm_medium=website&utm_campaign=sponsors`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                            className="group relative flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-50/20 hover:bg-gray-900/80"
                        >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gray-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="max-h-10 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                            />
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center pb-10"
                >
                    <Button.Secondary to="https://github.com/sponsors/reviactyl">
                        Become a Sponsor <FaChevronRight className="h-3" />
                    </Button.Secondary>
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
