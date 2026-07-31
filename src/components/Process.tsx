import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from '@/lib/hooks';
import { SectionHeading } from './Services';
import { cinematicFadeUp, stagger } from '@/lib/variants';

const STEPS = [
  {
    n: '01',
    title: 'Discovery & Strategy',
    desc: 'We map your business goals, constraints and success metrics before writing a single line. The output is a shared roadmap with clear scope.',
    detail: '1–2 weeks',
  },
  {
    n: '02',
    title: 'Design & Architecture',
    desc: 'Information architecture, interface systems and technical design happen in parallel — so the product and the code agree from day one.',
    detail: '2–3 weeks',
  },
  {
    n: '03',
    title: 'Build & Iterate',
    desc: 'Weekly deliverables in a staging environment you can touch. No black boxes — you see progress in real time and steer direction.',
    detail: '4–12 weeks',
  },
  {
    n: '04',
    title: 'Launch & Scale',
    desc: 'Zero-downtime deployment, monitoring, and a 90-day support window. We hand over clean documentation and stay on call as you grow.',
    detail: 'Ongoing',
  },
];

export default function Process() {
  const { ref, inView } = useInView();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start center', 'end center'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative bg-alt py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title="A process built for clarity"
          subtitle="No surprises, no scope drift. Four phases, each with a defined deliverable and a decision point."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* Animated vertical line on the left */}
          <div className="pointer-events-none absolute left-[27px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          <motion.div
            ref={ref}
            variants={stagger(0.12)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-px"
          >
            {STEPS.map((s) => (
              <ProcessRow key={s.n} {...s} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessRow({
  n,
  title,
  desc,
  detail,
}: {
  n: string;
  title: string;
  desc: string;
  detail: string;
}) {
  return (
    <motion.div
      variants={cinematicFadeUp}
      className="group relative grid grid-cols-1 gap-4 border-t border-line py-10 sm:grid-cols-12 sm:gap-8"
    >
      <div className="relative sm:col-span-2">
        {/* Dot on the line */}
        <span className="absolute -left-[3px] top-1 hidden h-2.5 w-2.5 rounded-full border-2 border-alt bg-accent sm:block" />
        <span className="ml-9 text-[14px] font-bold tabular-nums text-accent sm:ml-0">
          {n}
        </span>
      </div>
      <div className="sm:col-span-7">
        <h3 className="text-[22px] font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-muted">
          {desc}
        </p>
      </div>
      <div className="flex items-start sm:col-span-3 sm:justify-end">
        <span className="rounded-full border border-line bg-card px-4 py-1.5 text-[12.5px] font-medium text-muted transition-colors duration-300 group-hover:border-accent/30 group-hover:text-ink">
          {detail}
        </span>
      </div>
    </motion.div>
  );
}
