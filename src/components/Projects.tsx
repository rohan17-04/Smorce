import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '@/lib/hooks';
import { SectionHeading } from './Services';
import { cinematicFadeUp, stagger, EASE } from '@/lib/variants';
import { ProjectProps } from '@/types';

const PROJECTS = [
  {
    name: 'Nimbus Analytics',
    category: 'SaaS Platform',
    desc: 'A real-time analytics platform processing 2B+ events monthly for fintech teams.',
    tags: ['React', 'Node', 'Kafka', 'AWS'],
    metric: '2B events/mo',
    gradient: 'from-slate-100 to-slate-200',
  },
  {
    name: 'Vantage AI',
    category: 'AI Automation',
    desc: 'Autonomous support agent resolving 78% of tickets before human touch.',
    tags: ['GPT-4', 'Python', 'Pinecone'],
    metric: '78% auto-resolved',
    gradient: 'from-red-50 to-rose-100',
  },
  {
    name: 'Orbital Pay',
    category: 'Enterprise Web App',
    desc: 'Cross-border payment infrastructure serving 40+ corridors with 99.99% uptime.',
    tags: ['Next.js', 'Go', 'Postgres'],
    metric: '99.99% uptime',
    gradient: 'from-emerald-50 to-teal-100',
  },
  {
    name: 'Lumen Studio',
    category: 'Mobile Application',
    desc: 'A creative tool for designers — 4.9 stars, 200K downloads in first quarter.',
    tags: ['React Native', 'Supabase'],
    metric: '4.9★ App Store',
    gradient: 'from-amber-50 to-orange-100',
  },
];

export default function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="relative bg-bg py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Outcomes, not just deliverables"
            subtitle="A snapshot of recent engagements. Every project is measured against the business metric that actually matters."
          />
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors hover:text-accent"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <motion.div
          ref={ref}
          variants={stagger(0.12)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const ProjectCard = React.memo(function ProjectCard({
  name,
  category,
  desc,
  tags,
  metric,
  gradient,
}: ProjectProps) {
  return (
    <motion.article
      variants={cinematicFadeUp}
      whileHover={{ y: -6, transition: { duration: 0.5, ease: EASE } }}
      className="group relative overflow-hidden rounded-4xl border border-line bg-section p-2 transition-shadow duration-500 hover:shadow-soft"
    >
      {/* Visual top */}
      <div className={`relative h-52 overflow-hidden rounded-3xl bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="text-[28px] font-bold tracking-tight text-[#171717]/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:text-[#171717]/40"
          >
            {name}
          </span>
        </div>
        <div className="absolute right-5 top-5 rounded-full bg-white/40 px-3 py-1 text-[11px] font-semibold text-[#171717] backdrop-blur-md">
          {metric}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {category}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
        <h3 className="mt-3 text-[20px] font-bold tracking-tight text-ink">
          {name}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-muted">{desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-alt px-3 py-1 text-[11.5px] font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
});
