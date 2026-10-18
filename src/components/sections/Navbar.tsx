'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDiscord, FaCoffee, FaShoppingCart } from 'react-icons/fa';
import Button from "@/components/ui/Button";
import { FaBars, FaBook, FaChevronRight, FaGithub, FaX } from 'react-icons/fa6';
import PanelStars from '@/components/api/PanelStars';

const navItems = [
    { href: 'https://docs.reviactyl.app', label: 'Documentation', icon: FaBook },
    { href: '/marketplace', label: 'Marketplace', icon: FaShoppingCart },
    { href: 'https://ko-fi.com/reviactyl', label: 'Donate', icon: FaCoffee },
    { href: 'https://github.com/sponsors/reviactyl', label: 'Sponsor', icon: FaGithub },
    { href: '/discord', label: 'Discord', icon: FaDiscord },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
                <motion.nav
                    initial={{ y: -24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`relative w-full max-w-6xl rounded-full border transition-all duration-300 ${scrolled
                        ? 'border-gray-50/10 bg-gray-900/80 shadow-gray-700 backdrop-blur-xl'
                        : 'border-gray-50/5 bg-gray-900/50 shadow-gray-800 backdrop-blur-md'
                        }`}
                >
                    <div className="flex h-14 items-center justify-between pl-5 pr-2">
                        <Link href="/" className="flex shrink-0 items-center">
                            <span className="kawaii-logo-stack inline-grid">
                                <img src="/logo.png" alt="Reviactyl Logo" className="col-start-1 row-start-1 h-8 w-auto kawaii-logo-normal" />
                                <img src="/kawaii/logo.png" alt="Reviactyl Logo" className="col-start-1 row-start-1 h-8 w-auto kawaii-logo-active" />
                            </span>
                        </Link>

                        <div className="hidden items-center gap-0.5 lg:flex">
                            {navItems.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:bg-gray-50/5 hover:text-gray-50"
                                >
                                    <item.icon className="h-3.5 w-3.5 text-gray-500 transition-colors duration-200 group-hover:text-gray-200" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden items-center gap-2 lg:flex">
                            <div className="relative gap-2 flex">
                                <Button.Secondary className="px-5! py-2! font-mono inline-flex" to="https://github.com/reviactyl/panel">
                                    <FaGithub /> reviactyl/panel <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-gray-50/5 px-2 py-0.5 text-[10px] font-medium text-gray-300"> <PanelStars /> </span>
                                </Button.Secondary>
                                <Button.Primary className="px-5! py-2!" to="https://demo.reviactyl.app/">
                                    Live Demo <FaChevronRight className="h-3" />
                                </Button.Primary>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(v => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50/5 text-gray-300 transition-colors hover:bg-gray-50/10 hover:text-gray-50 lg:hidden"
                        >
                            {isOpen ? (
                                <FaX className="h-3 w-3" />
                            ) : (
                                <FaBars className="h-4" />
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-x-0 top-full mt-3 origin-top overflow-hidden rounded-3xl border border-gray-50/10 bg-gray-900/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
                            >
                                <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-gray-500">
                                    Links
                                </div>
                                <div className="space-y-0.5">
                                    {navItems.map(item => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-50/5 hover:text-gray-50"
                                        >
                                            <item.icon className="h-4 w-4 text-gray-500" />
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="my-3 h-px bg-gray-50/5" />

                                <div className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">
                                    Live Demo
                                </div>
                                <div className="relative gap-2 flex">
                                    <Button.Secondary className="px-5! py-2! font-mono inline-flex" to="https://github.com/reviactyl/panel">
                                        <FaGithub /> reviactyl/panel <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-gray-50/5 px-2 py-0.5 text-[10px] font-medium text-gray-300"> <PanelStars /> </span>
                                    </Button.Secondary>
                                    <Button.Primary className="px-5! py-2!" to="https://demo.reviactyl.app/">
                                        Live Demo <FaChevronRight className="h-3" />
                                    </Button.Primary>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            </header >
        </>
    );
}
