import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import HeroCards from './HeroCards';
import BackgroundText from './BackgroundText';

import { cinematicFadeUp, stagger, EASE } from '@/lib/variants';

const headlineWords = "Engineering digital products that businesses and people ".split(" ");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const yShift = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      style={{ opacity: fade }}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-white dark:bg-[#15171A]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent opacity-40 dark:from-accent/[0.08] dark:opacity-100" />
      <div className="pointer-events-none absolute inset-0 grid-pattern mask-fade-b opacity-60" />
      <BackgroundText />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[120px] dark:bg-accent/[0.08]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-accent/[0.03] blur-[100px] dark:bg-accent/[0.05]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8">
        {/* Left: copy */}
        <div className="lg:col-span-7">

          <motion.h1
            variants={stagger(0.06, 0.1)}
            initial="hidden"
            animate="visible"
            className="text-balance text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[3.5rem] lg:text-[4.25rem] flex flex-wrap"
          >
            {headlineWords.map((word, i) => (
              <motion.span key={i} variants={cinematicFadeUp} className="mr-[0.3em] inline-block">
                {word}
              </motion.span>
            ))}
            <motion.span variants={cinematicFadeUp} className="relative whitespace-nowrap inline-block">
              <span className="relative z-10">trust.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
                style={{ originX: 0 }}
                className="absolute bottom-1 left-0 z-0 h-3 w-full -skew-x-6 bg-accent/15 sm:h-4"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-muted"
          >
            We help startups and enterprises build premium software, intelligent
            automations and high-converting digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group btn-primary"
            >
              <span className="relative z-10">Book Free Strategy Call</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </a>
            <a
              href="#projects"
              className="group btn-secondary"
            >
              <span className="relative z-10">View Our Work</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted/70">
              Trusted by teams at
            </span>
            {['Nimbus', 'Vantage', 'Orbital', 'Lumen', 'Cortex'].map((b) => (
              <span
                key={b}
                className="text-[15px] font-bold tracking-tight text-ink/35 transition-colors duration-300 hover:text-ink/60"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          style={{ y: yShift }}
          className="relative flex items-center justify-center lg:col-span-5"
        >
          <HeroCards />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted/60">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, ease: EASE, repeat: Infinity }}
          style={{ originY: 0 }}
          className="h-10 w-px bg-gradient-to-b from-line to-transparent"
        />
      </motion.div>
    </motion.section>
  );
}


