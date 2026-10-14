"use client"
import Ecosystem from '@/components/sections/Ecosystem';
import Features from '@/components/sections/Features';
import Customization from '@/components/sections/features/Customization';
import Extensive from '@/components/sections/features/Extensive';
import Integration from '@/components/sections/features/Integration';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Info from '@/components/sections/Info';
import Reviews from '@/components/sections/Reviews';
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
      <Integration />
      <Ecosystem />
      <Sponsors />
      <Reviews />
    </div>
    <Footer />
    </>
  );
}