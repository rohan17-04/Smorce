'use client';

import { ArrowUpRight, Instagram, Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const LINKS = {
  Services: ['AI Automation', 'SaaS Development', 'Mobile Apps', 'Cloud Infrastructure'],
  Company: ['About', 'Projects', 'Process', 'Pricing'],
  Connect: [],
};

const LINK_HREFS: Record<string, string> = {
  'AI Automation': '#services',
  'SaaS Development': '#services',
  'Mobile Apps': '#services',
  'Cloud Infrastructure': '#services',
  About: '#about',
  Projects: '#projects',
  Process: '#process',
  Pricing: '#pricing',
  'Book a call': '#contact',
};

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="relative bg-[#0F1012] pt-24 pb-10 text-[#F2EFE9]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl px-6"
      >
        <div className="grid grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-8 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[13px] font-bold text-[#F2EFE9]">
                S
              </span>
              <span className="text-[15px] font-bold tracking-[0.02em] text-[#F2EFE9]">SMORCE</span>
            </div>
            <p className="mt-4 lg:mt-5 max-w-[24ch] text-[14px] leading-[1.7] text-[#8A8C91]">
              Premium software, intelligent automations and high-converting digital products.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading} className={`flex flex-col items-center sm:items-start text-center sm:text-left ${heading === 'Services' ? 'hidden sm:flex' : 'col-span-1'}`}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#F2EFE9]">
                {heading}
              </h4>
              {items.length > 0 && (
                <ul className="mt-5 lg:mt-6 space-y-4 lg:space-y-3.5">
                  {items.map((l) => {
                    const target = LINK_HREFS[l] || '#';
                    const isExternal = target.startsWith('http');
                    const href = isExternal ? target : (isHome ? target : `/${target}`);
                    
                    return (
                      <li key={l}>
                        <a
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="group inline-flex items-center gap-1.5 text-[14px] text-[#B7B8BB] transition-colors duration-300 hover:text-white"
                        >
                          {l}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
              {heading === 'Connect' && (
                <div className="mt-5 flex flex-col items-center gap-5 sm:items-start">
                  <a
                    href="#contact"
                    className="group relative text-[#B7B8BB] transition-all duration-300 hover:text-white hover:scale-110 active:scale-95"
                    aria-label="Book a call"
                  >
                    <Phone className="h-5 w-5" />
                    <ArrowUpRight className="absolute -right-3.5 -top-2 h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                  <a
                    href="mailto:smorce366@gmail.com"
                    className="group relative text-[#B7B8BB] transition-all duration-300 hover:text-white hover:scale-110 active:scale-95"
                    aria-label="Email us"
                  >
                    <Mail className="h-5 w-5" />
                    <ArrowUpRight className="absolute -right-3.5 -top-2 h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                  <a
                    href="https://www.instagram.com/smorce1?igsh=OGlsNWZ1N2x0dzF3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-[#B7B8BB] transition-all duration-300 hover:text-white hover:scale-110 active:scale-95"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                    <ArrowUpRight className="absolute -right-3.5 -top-2 h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                  <a
                    href="https://x.com/SMORCEX1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-[#B7B8BB] transition-all duration-300 hover:text-white hover:scale-110 active:scale-95"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className="h-[18px] w-[18px]"
                    >
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                    <ArrowUpRight className="absolute -right-3.5 -top-2 h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row">
          <p className="text-[13px] text-[#8A8C91] text-center sm:text-left">
            © {new Date().getFullYear()} SMORCE. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <a href="/legal#privacy" className="text-[13px] text-[#8A8C91] transition-colors hover:text-[#F2EFE9]">
              Privacy
            </a>
            <a href="/legal#terms" className="text-[13px] text-[#8A8C91] transition-colors hover:text-[#F2EFE9]">
              Terms
            </a>
            <a href="/legal#security" className="text-[13px] text-[#8A8C91] transition-colors hover:text-[#F2EFE9]">
              Security
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
