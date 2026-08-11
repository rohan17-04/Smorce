'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useScrollDirection, useScrollY } from '@/lib/hooks';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
  { label: 'Legal', href: 'legal' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const scrollY = useScrollY();
  const direction = useScrollDirection();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const scrolled = scrollY > 24;
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hidden = direction === 'down' && scrollY > 280;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        opacity: 1,
      }}
      transition={{ 
        duration: 0.5, 
        ease: EASE, 
        opacity: { delay: 1.5, duration: 0.8 } 
      }}
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-8"
    >
      <motion.nav
        animate={{
          paddingTop: isMobile ? (scrolled ? 8 : 12) : (scrolled ? 10 : 18),
          paddingBottom: isMobile ? (scrolled ? 8 : 12) : (scrolled ? 10 : 18),
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`mx-auto mt-2 sm:mt-3 flex max-w-6xl items-center justify-between rounded-3xl px-3 sm:px-6 transition-colors duration-500 ${
          scrolled ? 'glass-nav-scrolled shadow-nav' : 'glass-nav'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 lg:gap-2.5 group">
          <span className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-lg bg-ink text-bg text-[12px] lg:text-[13px] font-bold tracking-tight transition-transform duration-500 group-hover:scale-105">
            S
          </span>
          <span className="text-[14px] lg:text-[15px] font-bold tracking-[0.02em] text-ink">
            SMORCE
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={isHome ? l.href : `/${l.href}`}
              className="group relative px-3.5 py-2 text-[13.5px] font-medium text-muted transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-400 group-hover:w-4" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
            </Link>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:block">
            <a
              href={isHome ? '#contact' : '/#contact'}
              className="group btn-primary lg:px-5 lg:py-2.5 lg:text-[13px]"
            >
              <span className="relative z-10">Book Call</span>
              <ArrowUpRight className="relative z-10 h-3 w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </a>
          </div>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4 lg:h-5 lg:w-5" /> : <Menu className="h-4 w-4 lg:h-5 lg:w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="glass-nav mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl p-4 shadow-nav lg:hidden"
          >
            <div className="flex flex-col">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={isHome ? l.href : `/${l.href}`}
                  onClick={(e) => {
                    if (isHome && l.href.startsWith('#')) {
                      e.preventDefault();
                      const targetId = l.href.substring(1);
                      const elem = document.getElementById(targetId);
                      if (elem) {
                        const headerOffset = 80;
                        const elementPosition = elem.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        window.history.pushState(null, '', l.href);
                      }
                    }
                    setTimeout(() => setOpen(false), 150);
                  }}
                  className="border-b border-line/60 px-3 py-3.5 text-[15px] font-medium text-ink last:border-0 block"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.04 * i }}
                  >
                    {l.label}
                  </motion.div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
