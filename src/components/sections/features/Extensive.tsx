"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShikiHighlighter from "react-shiki";
import Button from "@/components/ui/Button";
import { FaPuzzlePiece } from "react-icons/fa6";

const files = [
    {
        name: "extension.json",
        language: "json",
        code: `
{
    "id": "info",
    "name": "Info Extension",
    "version": "0.1.0",
    "api_version": "RCYL_v26",
    "frontend": {
        "build_strategy": "source",
        "entry_points": [],
        "slots": [
            {
                "name": "dashboard:router:above",
                "module": "frontend/src/info.tsx",
                "export": "default",
                "order": 10
            }
        ],
    }
}
  `,
    },
    {
        name: "info.tsx",
        language: "typescript",
        code: `
import React from "react";
import { FaInfoCircle } from "react-icons/fa6";

const Info: React.FC = () => {
    return (
        <div className='rounded-ui border border-gray-600 bg-gray-700 p-4 mt-4'>

            <h2 className='text-lg font-bold'>Hello Reviactyl!</h2>
            <p className='text-sm text-gray-300'>yipie it works! Injected at dashboard:router:above</p>
            <p className='text-xl text-gray-100 font-bold'>Did you Know?</p>
            <p className='text-sm text-gray-300'>You can build your own extensions for Reviactyl without modifying the core panel!</p>
            <p className='text-sm text-gray-300'>Pretty neet, isn't it?</p>
        
        </div>
    );
};

export default Info;
        `,
    },
];

const Extensive: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeFile = files[activeIndex];

    return (
        <section className="relative overflow-hidden border-gray-50/10 bg-gray-950 text-gray-50">
            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-4 md:grid-cols-2 mb-12 md:gap-16 md:py-2">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4 text-left"
                >
                    <h2 className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                        Extend it <FaPuzzlePiece className="h-14 text-gray-50 inline-flex -rotate-12" /> <br /> without modifying core
                    </h2>
                    <p className="max-w-md text-base leading-relaxed text-gray-400">
                        Build features as self-contained extensions instead of patching the panel through <code className="bg-gray-900 border border-gray-800 font-mono text-gray-300 px-2 py-1 rounded">.rext</code>. Add routes, pages
                        and hooks, ship updates on your own schedule, and upgrade Reviactyl without losing a single
                        change.
                    </p>
                    <div className="flex items-center gap-3">
                        <Button.Primary to="https://docs.reviactyl.app/development/extensions/getting-started" className="w-fit">
                            Read Docs
                        </Button.Primary>

                        <Button.Secondary to="https://rextstore.app/" className="w-fit">
                            Browse Extensions
                        </Button.Secondary>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/80 shadow-2xl backdrop-blur-xl md:order-first"
                >
                    <div className="flex border-b border-gray-50/10">
                        {files.map((file, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={file.name}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative px-5 py-3 font-mono text-xs transition-colors duration-200 ${isActive ? "bg-gray-50/5 text-gray-50" : "text-gray-500 hover:text-gray-300"
                                        }`}
                                >
                                    {file.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="extension-tab"
                                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                            className="absolute inset-x-0 bottom-0 h-px bg-gray-50"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFile.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="min-h-56 overflow-x-auto p-5 text-left text-xs leading-relaxed sm:text-sm [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
                        >
                            <ShikiHighlighter
                                language={activeFile.language}
                                theme="github-dark"
                                showLanguage={false}
                                addDefaultStyles={false}
                            >
                                {activeFile.code}
                            </ShikiHighlighter>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Extensive;
