import { motion, TargetAndTransition } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;
const hoverSpring = { type: 'spring', stiffness: 400, damping: 25 };

function FloatCard({ 
  children, 
  initial, 
  delay, 
  className, 
  baseZ, 
  floatAnim, 
  hoverAnim, 
  duration,
  innerClassName
}: { children: React.ReactNode, initial: TargetAndTransition, delay: number, className: string, baseZ: number, floatAnim: TargetAndTransition, hoverAnim: TargetAndTransition, duration: number, innerClassName: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
      className={`absolute cursor-pointer ${className}`}
      style={{ zIndex: isHovered ? 100 : baseZ }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? "hover" : "float"}
        variants={{
          float: {
            ...floatAnim,
            transition: { repeat: Infinity, duration, ease: "linear" }
          },
          hover: {
            ...hoverAnim,
            transition: hoverSpring
          }
        }}
        className={innerClassName}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function HeroCards() {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center pointer-events-auto">
      
      {/* Card 1: SaaS Dark Marketing (Image) */}
      <FloatCard
        initial={{ opacity: 0, y: -100, x: 200, scale: 0.5, rotate: 30 }}
        delay={0.5}
        baseZ={10}
        className="right-0 lg:-right-10 top-4 lg:top-10 w-60 md:w-72 hidden sm:block"
        innerClassName="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0A0A0A]"
        duration={12}
        floatAnim={{ x: [0, 15, 0, -15, 0], y: [-15, 0, 15, 0, -15], rotate: [-4, 0, 4, 0, -4] }}
        hoverAnim={{ scale: 1.1, y: -20, x: -10, rotate: 0 }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/5 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <div className="h-2 w-2 rounded-full bg-green-500/80" />
        </div>
        <img 
          src="/images/saas_marketing_dark.png" 
          alt="SaaS Marketing Dark UI" 
          className="w-full h-auto object-cover"
        />
      </FloatCard>

      {/* Card 2: Main Middle SaaS Dashboard (Image) */}
      <FloatCard
        initial={{ opacity: 0, y: -50, x: -200, scale: 0.5, rotate: -30 }}
        delay={0.4}
        baseZ={20}
        className="left-2 lg:-left-12 top-24 lg:top-32 w-[280px] md:w-[340px]"
        innerClassName="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:bg-[#0D0E12]"
        duration={15}
        floatAnim={{ x: [0, -20, 0, 20, 0], y: [20, 0, -20, 0, 20], rotate: [2, 5, 2, -1, 2] }}
        hoverAnim={{ scale: 1.08, y: -15, x: 0, rotate: 0 }}
      >
        <div className="flex items-center gap-1.5 border-b border-line/50 dark:border-white/5 bg-black/5 dark:bg-white/5 px-4 py-2.5">
          <div className="h-2 w-2 rounded-full bg-red-400/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <div className="h-2 w-2 rounded-full bg-green-400/80" />
        </div>
        <img 
          src="/images/saas_dashboard_light.png" 
          alt="SaaS Dashboard Light UI" 
          className="w-full h-auto object-cover"
        />
      </FloatCard>

      {/* Card 3: React Code Snippet (Dark) */}
      <FloatCard
        initial={{ opacity: 0, y: 150, x: 150, scale: 0.5, rotate: 20 }}
        delay={0.7}
        baseZ={30}
        className="bottom-16 lg:bottom-24 right-4 lg:-right-4 w-56 md:w-64"
        innerClassName="overflow-hidden rounded-xl border border-white/10 bg-[#16181D] shadow-2xl"
        duration={10}
        floatAnim={{ x: [-10, 0, 10, 0, -10], y: [0, -15, 0, 15, 0], rotate: [-2, 2, -2, -6, -2] }}
        hoverAnim={{ scale: 1.12, y: -10, x: -5, rotate: 0 }}
      >
        <div className="border-b border-white/10 px-4 py-2 bg-[#1E2128]">
           <span className="text-[10px] font-mono text-white/50 flex items-center gap-2">
             <span className="text-blue-400">⚛</span> App.tsx
           </span>
        </div>
        <div className="p-4 font-mono text-[11px] leading-relaxed">
          <div className="text-blue-400">export default function <span className="text-yellow-200">App</span>() {'{'}</div>
          <div className="pl-4 text-white/70">return (</div>
          <div className="pl-8 text-green-300">&lt;HeroCards /&gt;</div>
          <div className="pl-4 text-white/70">);</div>
          <div className="text-blue-400">{'}'}</div>
        </div>
      </FloatCard>

      {/* Card 4: CSS Tailwind Snippet (Light/Glass) */}
      <FloatCard
        initial={{ opacity: 0, y: 100, x: -150, scale: 0.5, rotate: -20 }}
        delay={0.6}
        baseZ={40}
        className="left-8 lg:left-0 bottom-4 w-48 md:w-56 hidden sm:block"
        innerClassName="overflow-hidden rounded-xl border border-line bg-white/70 backdrop-blur-md shadow-xl dark:bg-black/40 dark:border-white/10"
        duration={11}
        floatAnim={{ x: [10, 0, -10, 0, 10], y: [0, 10, 0, -10, 0], rotate: [8, 4, 8, 12, 8] }}
        hoverAnim={{ scale: 1.15, y: -15, x: 5, rotate: 0 }}
      >
        <div className="p-4 font-mono text-[11px] leading-relaxed">
          <div className="text-pink-500 dark:text-pink-400">.glass-panel {'{'}</div>
          <div className="pl-4 text-ink/70 dark:text-white/70">@apply backdrop-blur-xl;</div>
          <div className="pl-4 text-ink/70 dark:text-white/70">@apply bg-white/10;</div>
          <div className="pl-4 text-ink/70 dark:text-white/70">@apply border-white/20;</div>
          <div className="text-pink-500 dark:text-pink-400">{'}'}</div>
        </div>
      </FloatCard>

      {/* Card 5: Stats Widget */}
      <FloatCard
        initial={{ opacity: 0, scale: 0.2, x: 100, y: 50, rotate: -40 }}
        delay={0.8}
        baseZ={50}
        className="top-1/2 -translate-y-1/2 right-1/4 w-36"
        innerClassName="overflow-hidden rounded-2xl border border-line bg-bg shadow-lg flex flex-col items-center p-4"
        duration={9}
        floatAnim={{ x: [0, 12, 0, -12, 0], y: [-12, 0, 12, 0, -12], rotate: [-10, -5, -10, -15, -10] }}
        hoverAnim={{ scale: 1.2, y: -15, x: 0, rotate: 0 }}
      >
        <span className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-2">Growth</span>
        <div className="text-2xl font-bold text-accent mb-1">+142%</div>
        <div className="h-10 w-full rounded-md bg-gradient-to-t from-accent/20 to-transparent mt-2 flex items-end">
          <svg viewBox="0 0 100 40" className="w-full h-full stroke-accent fill-none stroke-2" preserveAspectRatio="none">
            <path d="M0 40 Q20 30 40 35 T80 20 T100 10" />
          </svg>
        </div>
      </FloatCard>

    </div>
  );
}
