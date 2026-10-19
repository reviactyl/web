"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Button from "@/components/ui/Button";
import { FaChevronRight } from "react-icons/fa";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 text-gray-50">
            <div className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 rounded-full bg-gray-50/6 blur-3xl" />

            <Navbar />

            <div className="relative z-10 flex max-w-2xl flex-col items-center gap-4 px-6 pb-12 pt-32 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="bg-linear-to-b from-gray-50 to-gray-500 bg-clip-text pb-1 text-8xl font-semibold tracking-tight text-transparent sm:text-9xl"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                >
                    Page not found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="max-w-md text-base leading-relaxed text-gray-400 sm:text-lg"
                >
                    The page you are looking for doesn&apos;t exist, was moved, or never made it out of the container.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
                >
                    <Button.Primary to="/">
                        Back to Home <FaChevronRight className="h-3" />
                    </Button.Primary>
                    <Button.Secondary to="/marketplace">Browse Marketplace</Button.Secondary>
                </motion.div>
            </div>
        </main>
    );
}
