import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

/**
 * Animates a number from 0 to its target when scrolled into view.
 * Parses a string like "120+", "99.9%", "8" into prefix / number / suffix.
 */
export default function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  // Parse the numeric core and any prefix/suffix.
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? '';
  const decimals = match?.[2].includes('.') ? match[2].split('.')[1].length : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(val) {
        el.textContent = `${prefix}${val.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}0${suffix}`}
    </span>
  );
}
