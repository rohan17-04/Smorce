import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { ThemeProvider } from '@/components/ThemeProvider';

const Projects = React.lazy(() => import('@/components/Projects'));
const Process = React.lazy(() => import('@/components/Process'));
const About = React.lazy(() => import('@/components/About'));
const Pricing = React.lazy(() => import('@/components/Pricing'));
const CTABanner = React.lazy(() => import('@/components/CTABanner'));
const Contact = React.lazy(() => import('@/components/Contact'));
const Footer = React.lazy(() => import('@/components/Footer'));

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="smorce-theme">
      <div className="relative min-h-screen bg-bg">
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
    </ThemeProvider>
  );
}
