"use client"
import Features from '@/components/sections/Features';
import Hero from '@/components/sections/Hero';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []); 
  return (
    <>
    <div className="min-h-screen bg-gray-950 flex flex-col text-center">
      <Hero />
      <Features />
    </div>
    </>
  );
}