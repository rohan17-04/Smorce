'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(12px)',
            transition: { duration: 0.55, ease: EASE },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-[#0F1012] pointer-events-none select-none overflow-hidden"
        >
          {/* Huge SMORCE spanning page middle exactly like screenshot */}
          <div className="relative flex flex-col items-center justify-center w-full px-4 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full text-[21vw] font-black tracking-[-0.04em] leading-none text-black/[0.12] dark:text-white/[0.12] select-none text-center"
            >
              SMORCE
            </motion.span>

            {/* Razor-thin sharp red laser underline passing quickly across */}
            <div className="relative w-[78vw] h-[1.5px] -mt-1 sm:-mt-3 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ originX: 0 }}
                className="w-full h-full bg-[#EF4444] rounded-full shadow-[0_0_8px_#EF4444]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
