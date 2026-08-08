import { motion } from 'framer-motion';
import {
  Bot,
  Workflow,
  LayoutGrid,
  Globe,
  Smartphone,
  PenTool,
  Cpu,
  Code2,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { useInView } from '@/lib/hooks';
import { cinematicFadeUp, stagger, EASE } from '@/lib/variants';

const SERVICES = [
  {
    icon: Bot,
    title: 'AI Automation',
    desc: 'Intelligent systems that reduce manual workload and unlock new operational capacity.',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    desc: 'Streamlined workflows that connect your tools, teams and data into one flow.',
  },
  {
    icon: LayoutGrid,
    title: 'SaaS Development',
    desc: 'Multi-tenant platforms engineered for scale, reliability and rapid iteration.',
  },

  {
    icon: Code2,
    title: 'Website Development',
    desc: 'High-converting, fast and meticulously crafted marketing sites and platforms.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Native-grade iOS and Android experiences from a single considered codebase.',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    desc: 'Interface systems that feel inevitable — clear, calm and deeply usable.',
  },

];

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="relative bg-alt py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="A full-stack engineering partner"
          subtitle="Six disciplines under one roof. We cover the entire lifecycle — from first prototype to production infrastructure — so you never stitch vendors together."
        />

        <motion.div
          ref={ref}
          variants={stagger(0.06)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 lg:mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] lg:rounded-4xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 lg:mt-16 flex justify-center w-full"
        >
          <a
            href="#contact"
            className="group btn-primary px-8 py-4 text-[14px] lg:text-[15px]"
          >
            <span className="relative z-10">Book Now</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Bot;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={cinematicFadeUp}
      whileHover={{ y: -6, transition: { duration: 0.5, ease: EASE } }}
      className="group relative bg-bg p-6 lg:p-8 transition-colors duration-500 hover:bg-section hover:shadow-soft"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-soft">
        <Icon className="h-5 w-5 text-ink transition-colors duration-500 group-hover:text-accent" />
      </div>
      <h3 className="mb-2 text-[17px] font-bold tracking-tight text-ink transition-transform duration-500 group-hover:scale-105">
        {title}
      </h3>
      <p className="max-w-[28ch] text-[14px] leading-[1.6] text-muted">
        {desc}
      </p>
      <div className="mt-6 h-px w-0 bg-accent transition-all duration-500 group-hover:w-12" />
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      <motion.span
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-accent"
      >
        <span className="h-1 w-6 rounded-full bg-accent" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.1] tracking-[-0.025em] text-ink md:text-[2.25rem] lg:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-4 lg:mt-5 text-[15px] lg:text-[16px] leading-[1.65] text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
