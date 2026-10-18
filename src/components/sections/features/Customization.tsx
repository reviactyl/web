"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette } from "react-icons/fa6";

const groups = [
    {
        id: "card",
        title: "Server Card Layout",
        options: ["Row", "Grid"],
    },
    {
        id: "sidebar",
        title: "Navbar & Sidebar Layout",
        options: ["Modern", "Classic", "Compact", "Accent"],
    },
];

const Customization: React.FC = () => {
    const [selected, setSelected] = useState({ group: "sidebar", option: "Modern" });

    const previewKey = `${selected.group}-${selected.option}`;
    const previewSrc = `/designify/${selected.option}.png`;

    return (
        <section className="relative overflow-hidden border-gray-50/10 bg-gray-950 text-gray-50">
            <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-left"
                >
                    <h2 className="mt-8 bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                         Customization <br /> At Peak <FaPalette className="h-10 text-gray-50 inline-flex" />
                    </h2>
                </motion.div>

                <div className="grid items-start gap-8 pb-10 md:grid-cols-2 md:gap-12 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-6 rounded-2xl border border-gray-50/10 bg-gray-900/50 p-6 text-left"
                    >
                        {groups.map((group, index) => (
                            <React.Fragment key={group.id}>
                                {index > 0 && <div className="h-px bg-gray-50/5" />}
                                <div className="flex flex-col gap-3">
                                    <div className="text-sm font-medium tracking-wider text-gray-400">
                                        {group.title}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {group.options.map((option) => {
                                            const isActive =
                                                selected.group === group.id && selected.option === option;
                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setSelected({ group: group.id, option })}
                                                    className={`relative rounded-xl border border-gray-50/10 px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                                                        isActive
                                                            ? "bg-gray-50 text-gray-900 shadow-gray-500 hover:bg-gray-50"
                                                            : "border border-gray-50/10 bg-gray-900/60 text-gray-200 backdrop-blur-md hover:border-gray-50/20 hover:bg-gray-800/70"
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="mx-auto w-full max-w-md"
                    >
                        <div
                            style={{
                                maskImage: "linear-gradient(to right, black 55%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to right, black 55%, transparent 100%)",
                            }}
                            className="relative aspect-4/5 overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={previewKey}
                                    src={previewSrc}
                                    alt={`${selected.option} preview`}
                                    initial={{ opacity: 0, filter: "blur(12px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(12px)" }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                    className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                                />
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Customization;
