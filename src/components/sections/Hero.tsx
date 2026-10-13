"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/sections/Navbar";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaShieldAlt, FaBolt, FaChevronRight } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { FaBatteryFull, FaDocker, FaPuzzlePiece, FaStar } from "react-icons/fa6";
import { FeatureBox } from "@/components/ui/FeatureBox";

const slides = [
    { src: "/showcase/1.png", alt: "Slide 1" },
    { src: "/showcase/2.png", alt: "Slide 2" },
    { src: "/showcase/3.png", alt: "Slide 3" },
    { src: "/showcase/4.png", alt: "Slide 4" },
];

const Hero: React.FC = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: carouselRef,
        offset: ["start end", "center center"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

    const words = useMemo(
        () => [
            { text: "community" },
            { text: "customers" },
        ],
        []
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [words.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden border-b border-gray-50/10 bg-gray-950 bg-cover bg-center bg-no-repeat">
            <div className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 rounded-full bg-gray-50/6 blur-3xl" />

            <Navbar />

            <div className="relative z-10 flex min-h-screen max-w-5xl flex-col items-center justify-center gap-4 px-6 pb-24 pt-32 text-center">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
                >
                    <span className="block bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-transparent">
                        The game server panel
                    </span>
                    <span className="block pb-1 text-gray-400">
                        <span className="bg-linear-to-b from-gray-400 to-gray-500 bg-clip-text text-transparent">
                            for your
                        </span>{" "}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[currentWordIndex].text}
                                initial={{ opacity: 0, filter: "blur(12px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(12px)" }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="inline-block bg-linear-to-b from-gray-400 to-gray-500 bg-clip-text text-transparent"
                            >
                                {words[currentWordIndex].text}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl"
                >
                    Open-source, secure, and game management panel built for the modern hosts, developers and communities.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="flex flex-col items-center gap-3 sm:flex-row"
                >
                    <Button.Primary to="https://docs.reviactyl.app/">
                        Get Started <FaChevronRight className="h-3" />
                    </Button.Primary>
                    <Button.Secondary to="https://github.com/reviactyl/panel">
                        <FaStar className="h-3" /> Star on GitHub
                    </Button.Secondary>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-6 flex flex-wrap justify-center gap-3"
                >
                    <FeatureBox icon={<FaPuzzlePiece />} text="Extensions API" />
                    <FeatureBox icon={<FaBatteryFull />} text="Batteries Included" />
                    <FeatureBox icon={<FaShieldAlt />} text="Secure by Default" />
                    <FeatureBox icon={<FaBolt />} text="High Performance" />
                    <FeatureBox icon={<FaDocker />} text="Servers in Container" />
                </motion.div>

                <motion.div
                    ref={carouselRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75 }}
                    style={{ perspective: 1000 }}
                    className="mt-6 hidden w-270 md:block"
                >
                    <motion.div style={{ rotateX, scale }}>
                        <div className="relative aspect-video overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={slides[currentSlide].src}
                                    src={slides[currentSlide].src}
                                    alt={slides[currentSlide].alt}
                                    initial={{ opacity: 0, filter: "blur(12px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(12px)" }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 flex justify-center gap-2">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.src}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}`}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-6 bg-gray-50" : "w-2 bg-gray-50/30"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
