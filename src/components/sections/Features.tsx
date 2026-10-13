"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    FaBatteryFull,
    FaCodeFork,
    FaLaravel,
    FaLock,
    FaPuzzlePiece,
    FaReact,
} from "react-icons/fa6";

const features = [
    {
        icon: <FaPuzzlePiece />,
        title: "Extensions API",
        description:
            "Reviactyl provides a robust Extensions API that allows developers to create and integrate custom functionality seamlessly.",
    },
    {
        icon: <FaLock />,
        title: "Security First",
        description:
            "Security is a first-class citizen on this platform with bcrypt hashing, AES-256-CBC encryption, and HTTPS support out of the box.",
    },
    {
        icon: <FaReact />,
        title: "Modern Design",
        description:
            "Save the furious clicking and screaming for Overwatch. Reviactyl's interface is designed so well that even Sukuna would be impressed.",
    },
    {
        icon: <FaLaravel />,
        title: "Modern Tooling",
        description:
            "Built on a modern stack utilizing the best design practices that make it easy to jump in and make modifications.",
    },
    {
        icon: <FaCodeFork />,
        title: "Open Source",
        description:
            "Reviactyl is open-source, allowing community contributions and customization to improve server managing experience.",
    },
    {
        icon: <FaBatteryFull />,
        title: "Batteries Included",
        description:
            "Reviactyl offers top-notch features such as Selector Modes, Advanced Designify Editor, Server Metrics, and much more.",
    },
];

const Features: React.FC = () => {
    return (
        <section className="features relative overflow-hidden bg-gray-950 text-gray-50 border-b border-gray-50/10">
            <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="mt-8 bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                        Why Reviactyl?
                    </h2>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                            className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-50/20 hover:bg-gray-900/80"
                        >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gray-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gray-50/4 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-50/10 bg-gray-800/80 text-gray-50 transition-colors duration-300 group-hover:bg-gray-50 group-hover:text-gray-900">
                                {feature.icon}
                            </div>
                            <div className="relative flex flex-col gap-1.5">
                                <h3 className="m-0 p-0 text-base font-semibold leading-snug tracking-tight text-gray-50">
                                    {feature.title}
                                </h3>
                                <p className="m-0 p-0 text-sm leading-relaxed text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
