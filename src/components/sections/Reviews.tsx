"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Button from "@/components/ui/Button";

const summary = { score: "4.0", total: "3" };

const reviews = [
    { name: "Aymen", date: "October 13, 2026", rating: 5, title: "This project can truly be described as..", body: "This project can truly be described as magnificent however i believe it requires more time and a focus on the developers work." },
    { name: "Andrew T", date: "October 12, 2026", rating: 5, title: "Reviactyl is the best panel out there!", body: "(no body)" },
    { name: "customer", date: "October 11, 2026", rating: 5, title: "Best free Pterodactyl alternative", body: "I've been using Reviactyl for over 6 months now, and the experience is incredible. They have constant updates, and the developers are super nice. Their panel is also way better than the default Pterodactyl. Would recommend this to anyone tired of Pterodactyl's shenanigans!" },
];

const Stars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
                <span
                    key={index}
                    className={`flex h-5 w-5 items-center justify-center rounded-xs text-white ${index < rating ? "bg-[#00b67a]" : "bg-gray-700"
                        }`}
                >
                    <FaStar className="h-3 w-3" />
                </span>
            ))}
        </div>
    );
};

const Reviews: React.FC = () => {
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
                        Loved by the community
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
                        <Stars rating={5} />
                        <span>
                            <span className="font-semibold text-gray-50">{summary.score}</span> out of 5 ·{" "}
                            {summary.total} reviews on Trustpilot
                        </span>
                    </div>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                            className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/50 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-50/20 hover:bg-gray-900/80"
                        >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gray-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <Stars rating={review.rating} />

                            <div className="flex flex-col gap-1.5">
                                <h3 className="m-0 p-0 text-base font-semibold leading-snug tracking-tight text-gray-50">
                                    {review.title}
                                </h3>
                                <p className="m-0 p-0 text-sm leading-relaxed text-gray-400">{review.body}</p>
                            </div>

                            <div className="mt-auto flex w-full items-center justify-between border-t border-gray-50/5 pt-4 text-xs text-gray-500">
                                <span className="font-medium text-gray-300">{review.name}</span>
                                <span>{review.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center pb-10"
                >
                    <Button.Secondary to="https://www.trustpilot.com/review/reviactyl.app">
                        Read more on Trustpilot <FaChevronRight className="h-3" />
                    </Button.Secondary>
                </motion.div>
            </div>
        </section>
    );
};

export default Reviews;
