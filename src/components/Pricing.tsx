import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { useInView } from '@/lib/hooks';
import { SectionHeading } from './Services';
import { cinematicFadeUp, stagger, EASE } from '@/lib/variants';

const PLANS = [
  {
    name: 'Sprint',
    price: '$8K',
    cadence: 'per project',
    desc: 'For a focused deliverable — a landing page, an integration, or a design system.',
    features: [
      '1 senior engineer + designer',
      '2-week timeline',
      'Up to 3 revision cycles',
      'Staging environment',
      '30-day post-launch support',
    ],
    cta: 'Start a sprint',
    highlighted: false,
  },
  {
    name: 'Product',
    price: '$18K',
    cadence: 'per month',
    desc: 'A dedicated cross-functional team building your product end-to-end.',
    features: [
      'Dedicated squad (3–4 people)',
      'Weekly deliverables',
      'Full-stack: design, build, infra',
      'Direct Slack + Loom access',
      'Quarterly roadmap planning',
      '90-day support window',
    ],
    cta: 'Book a product call',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'tailored scope',
    desc: 'For large organizations needing scale, compliance and long-term partnership.',
    features: [
      'Multiple squads',
      'SOC2 / HIPAA-ready infrastructure',
      'Dedicated tech lead',
      'SLA-backed support',
      'On-site engagement available',
      'Custom contracting',
    ],
    cta: 'Talk to us',
    highlighted: false,
  },
];

export default function Pricing() {
  const { ref, inView } = useInView();

  return (
    <section id="pricing" className="relative bg-alt py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          center
          eyebrow="Engagement models"
          title="Pricing that scales with your needs"
          subtitle="Transparent from the first call. No hidden retainers, no surprise line items. Choose the model that fits your stage."
        />

        <motion.div
          ref={ref}
          variants={stagger(0.12)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {PLANS.map((p) => (
            <PlanCard key={p.name} {...p} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-[13px] text-muted">
          All engagements include a free 30-minute strategy call. No commitment required.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  price,
  cadence,
  desc,
  features,
  cta,
  highlighted,
}: {
  name: string;
  price: string;
  cadence: string;
  desc: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}) {
  return (
    <motion.div
      variants={cinematicFadeUp}
      whileHover={{ y: -6, transition: { duration: 0.5, ease: EASE } }}
      className={`relative flex flex-col rounded-4xl border p-8 transition-shadow duration-500 ${
        highlighted
          ? 'border-accent/40 bg-card text-ink shadow-soft'
          : 'border-line bg-card text-ink hover:shadow-soft'
      }`}
    >
      {highlighted && (
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-semibold text-bg"
        >
          Most popular
        </motion.span>
      )}

      <h3 className="text-[15px] font-bold tracking-tight transition-transform duration-500 group-hover:scale-105 text-ink">
        {name}
      </h3>
      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-[2.75rem] font-bold tracking-tight text-ink">
          {price}
        </span>
        <span className="text-[13px] text-muted">
          {cadence}
        </span>
      </div>
      <p className="mt-4 text-[14px] leading-[1.6] text-muted">
        {desc}
      </p>

      <div className="my-7 h-px bg-line" />

      <ul className="flex-1 space-y-3.5">
        {features.map((f) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-start gap-3"
          >
            <Check className={`mt-0.5 h-4 w-4 shrink-0 text-accent`} />
            <span className="text-[14px] text-muted">
              {f}
            </span>
          </motion.li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`group mt-8 w-full ${highlighted ? 'btn-primary' : 'btn-secondary'}`}
      >
        <span className="relative z-10">{cta}</span>
        {highlighted ? (
          <>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </>
        ) : (
          <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </a>
    </motion.div>
  );
}
