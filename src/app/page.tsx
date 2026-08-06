'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import IntroLoader from '@/components/IntroLoader';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import Services from '@/components/Services';

const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Process = dynamic(() => import('@/components/Process'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: false });
const CTABanner = dynamic(() => import('@/components/CTABanner'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg">
      <IntroLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Projects />
          <Process />
          <About />
          <Pricing />
          <CTABanner />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
