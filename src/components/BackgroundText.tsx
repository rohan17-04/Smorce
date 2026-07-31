import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const scatterProps = [
  { x: -300, y: -200, rotate: -45 }, // S
  { x: -150, y: -350, rotate: 30 },  // M
  { x: 50, y: -400, rotate: -60 },   // O
  { x: 200, y: -300, rotate: 90 },   // R
  { x: 350, y: -150, rotate: -30 },  // C
  { x: 450, y: -50, rotate: 45 },    // E
];

function Letter({ letter, i, scrollYProgress }: { letter: string, i: number, scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [0, 0.2], [0, scatterProps[i].x]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, scatterProps[i].y]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [0, scatterProps[i].rotate]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.8, 0]);

  return (
    <motion.span
      style={{ x, y, rotate, opacity }}
      className="inline-block origin-center"
    >
      {letter}
    </motion.span>
  );
}

export default function BackgroundText() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden mix-blend-overlay">
      <div className="flex font-black text-[18vw] leading-none tracking-tighter text-ink/[0.04] dark:text-white/[0.03]">
        {['S', 'M', 'O', 'R', 'C', 'E'].map((letter, i) => (
          <Letter key={i} letter={letter} i={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}
