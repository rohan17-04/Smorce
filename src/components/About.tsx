import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks';
import { SectionHeading } from './Services';
import { cinematicFadeUp, stagger, EASE } from '@/lib/variants';
import CountUp from './CountUp';

const STATS = [
  { value: '120+', label: 'Projects shipped' },
  { value: '40+', label: 'Engineers & designers' },
  { value: '8', label: 'Years in production' },
  { value: '99.9%', label: 'Avg. uptime delivered' },
];

const CLIENTS = [
  'Startup founders',
  'SaaS companies',
  'Established businesses',
  'Enterprises',
  'Agencies',
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative bg-bg py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + body */}
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A senior team that ships like a product company"
              subtitle="SMORSE is a focused engineering studio. We don't staff juniors on your project and disappear. The people who scope the work are the people who build it."
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-6 text-[16px] leading-[1.7] text-muted"
            >
              We've spent years inside product teams at fast-growing startups
              and large enterprises. That experience shapes how we work: small
              teams, direct communication, and a bias toward shipping software
              that holds up under real load.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-10"
            >
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted/70">
                Who we work with
              </p>
              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-wrap gap-2"
              >
                {CLIENTS.map((c) => (
                  <motion.span
                    key={c}
                    variants={cinematicFadeUp}
                    whileHover={{ y: -3, transition: { duration: 0.3, ease: EASE } }}
                    className="cursor-default rounded-full border border-line bg-card px-4 py-2 text-[13.5px] font-medium text-ink transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                  >
                    {c}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: stats grid */}
          <motion.div
            ref={ref}
            variants={stagger(0.1, 0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl border border-line bg-line"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={cinematicFadeUp}
                whileHover={{ y: -6, transition: { duration: 0.5, ease: EASE } }}
                className="group bg-bg p-8 transition-colors duration-500 hover:bg-section sm:p-10"
              >
                <div className="text-[2.5rem] font-bold tracking-tight text-ink sm:text-[3rem]">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 text-[14px] font-medium text-muted transition-transform duration-500 group-hover:scale-105">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
