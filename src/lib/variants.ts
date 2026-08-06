import type { Variants } from 'framer-motion';

/** Premium easing — Apple-like, no bounce. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Fade + lift up. The workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, willChange: 'transform, opacity' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Fade in place — for elements that only need opacity. */
export const fade: Variants = {
  hidden: { opacity: 0, willChange: 'opacity' },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/** Cinematic 3D fold up with blur (Apple-like reveal). */
export const cinematicFadeUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(8px)', willChange: 'transform, opacity, filter' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
};

/** Container that staggers its children's reveals. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Subtle lift on hover — for cards. */
export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.4, ease: EASE } },
};
