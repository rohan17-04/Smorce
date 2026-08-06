import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const scatterProps = [
  { x: -300, y: -200, rotate: -45 }, // S
  { x: -150, y: -350, rotate: 30 },  // M
  { x: 50, y: -400, rotate: -60 },   // O
  { x: 200, y: -300, rotate: 90 },   // R
  { x: 350, y: -150, rotate: -30 },  // C
  { x: 450, y: -50, rotate: 45 },    // E
];

function Letter({ letter, i, scrollYProgress }: { letter: string; i: number; scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [0, 0.25], [0, scatterProps[i].x]);
  const y = useTransform(scrollYProgress, [0, 0.25], [0, scatterProps[i].y]);
  const rotate = useTransform(scrollYProgress, [0, 0.25], [0, scatterProps[i].rotate]);

  return (
    <motion.span
      style={{ x, y, rotate }}
      className="inline-block origin-center"
    >
      {letter}
    </motion.span>
  );
}

export default function BackgroundText() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.94, 1, 1, 1.04],
          filter: ['blur(14px)', 'blur(0px)', 'blur(0px)', 'blur(16px)'],
        }}
        transition={{
          duration: 3.8,
          times: [0, 0.22, 0.65, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex font-black text-[22vw] leading-none tracking-[-0.04em] text-[#111111]/[0.22] dark:text-white/[0.22]"
      >
        {['S', 'M', 'O', 'R', 'C', 'E'].map((letter, i) => (
          <Letter key={i} letter={letter} i={i} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </div>
  );
}

