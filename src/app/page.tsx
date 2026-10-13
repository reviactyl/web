"use client"
import Features from '@/components/sections/Features';
import Customization from '@/components/sections/features/Customization';
import Extensive from '@/components/sections/features/Extensive';
import Hero from '@/components/sections/Hero';
import Info from '@/components/sections/Info';
import Sponsors from '@/components/sections/Sponsors';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []); 
  return (
    <>
    <div className="min-h-screen bg-gray-950 flex flex-col text-center">
      <Hero />
      <Info />
      <Features />
      <Customization />
      <Extensive />
      <Sponsors />
    </div>
    </>
  );
}