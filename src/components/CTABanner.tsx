import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '@/lib/hooks';
import { EASE } from '@/lib/variants';

export default function CTABanner() {
  const { ref, inView } = useInView();

  return (
    <section className="relative bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="glass-ink relative overflow-hidden rounded-4xl px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Subtle animated glow */}
          <motion.div
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={inView ? { opacity: 0.5, scale: 1 } : {}}
            transition={{ duration: 2, ease: EASE }}
            className="pointer-events-none absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
          />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.04]" />

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mx-auto max-w-2xl text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2.75rem]"
            >
              Have a project in mind?
              <br />
              Let&apos;s make it real.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              className="mx-auto mt-5 max-w-md text-[16px] leading-[1.6] text-muted"
            >
              Free 30-minute strategy call. No pressure, no obligation — just a
              clear conversation about what you&apos;re building.
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="group mt-10 btn-primary py-4 px-8"
            >
              <span className="relative z-10">Book Free Strategy Call</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
