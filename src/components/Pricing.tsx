import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { useInView } from '@/lib/hooks';
import { SectionHeading } from './Services';
import { cinematicFadeUp, stagger, EASE } from '@/lib/variants';

const PLANS = [
  {
    name: 'Starter',
    price: '₹5,000',
    cadence: 'per project',
    desc: 'Perfect for startups, local businesses, portfolios, landing pages, and simple business websites. We discuss your requirements first and recommend the best approach for your goals.',
    features: [
      '1 Developer + 1 Designer',
      '4–5 week timeline',
      'Business websites & landing pages',
      'Responsive design',
      'Up to 3 revision rounds',
      '30-day post-launch support',
    ],
    cta: 'Start Your Project',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₹9,000',
    cadence: 'per project',
    desc: 'Best for growing businesses needing custom websites, SaaS platforms, dashboards, branding, and complete web solutions. Includes every service except mobile applications.',
    features: [
      '2 Developers + 1 Designer',
      '3–4 week timeline',
      'Websites & SaaS dashboards',
      'Custom UI/UX design',
      'Everything except mobile apps',
      'Up to 5 revision rounds',
      '90-day post-launch support',
    ],
    cta: 'Book a Free Call',
    highlighted: true,
  },
  {
    name: 'Custom',
    price: 'Starts at ₹12k',
    cadence: '',
    desc: 'For larger or more complex projects that require custom planning, additional features, or long-term collaboration. Final pricing depends on your project requirements.',
    features: [
      '3 Developers + 2 Designers',
      'Fully custom UI/UX with custom functionality',
      'On-site meetings available (if required)',
      'Multiple planning & discussion sessions',
      'Up to 10 revision rounds within 30 days after launch',
      '90-day technical support for bug fixes and issues',
      'Priority project handling',
    ],
    cta: 'Talk to Us',
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
