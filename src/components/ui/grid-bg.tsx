"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GridBg() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 0.03]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--text-dim)]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>
    </div>
  );
}
